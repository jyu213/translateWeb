const CONFIG = require('../../config/constant')
const TRANSLATE_LIST_TABLE = 'translate_list'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

/**
 * @Service: 取所有列表条目
 *
 * @TODO: 筛选、翻页
 */
exports.list = (params) => {
  let sqlArr = []
  for (let key in params) {
    switch (key) {
      case 'userId':
        params[key] && sqlArr.push(`USER_ID=${params[key]}`)
        break;
    }
  }
  const SQL = `SELECT * FROM ${TRANSLATE_LIST_TABLE} ${sqlArr.length > 0 ? 'WHERE ' + sqlArr.join(' AND ') : ''} ORDER BY MODIFY_TIME`
  let promise = new Promise((resolve, reject) => {
    console.log('RUN SQL: ', SQL)
    db.all(SQL, (err, rows) => {
      if (err) {
        reject(new Error(err))
      }
      let data = rows.map((item) => {
        return {
          id: item.ID,
          userId: item.USER_ID,
          title: item.PROJECT_TITLE,
          link: item.PROJECT_LINK,
          description: item.PROJECT_DESCRIPTION,
          tags: item.TAGS,
          createTime: item.CREATE_TIME,
          modifyTime: item.MODIFY_TIME
        }
      }) || []
      resolve(data)
    })
  })

  return promise
}
