const CONFIG = require('../../config/constant')
const TRANSLATE_LIST_TABLE = 'translate_list'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

/**
 * @Service: 更新单列表条目
 *
 * @param {String} title, 项目标题
 * @param {String} link, 项目外部链接
 * @param {String} author, 项目指派作者，默认为空
 * @param {String} description, 项目描述
 * @param {String} tags, 项目关联标题？？  tag1,tag2 ??
 */
exports.update = (id, params) => {
  let promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      const {title, link, author, description, tags} = params
      const currentTime = (new Date()).getTime()

      if (typeof (id) === 'undefined') {
        reject('miss param id')
      }
      let sqlArr = params.keys().length > 0 ? [`MODIFY_TIME=${currentTime}`] : []

      Object.entries(params).map((item, key) => {
        switch (item[0]) {
          case 'title':
            sqlArr.push(`PROJECT_TITLE=${title}`)
            break
          case 'link':
            sqlArr.push(`PROJECT_LINK=${link}`)
            break
          case 'author':
            sqlArr.push(`PROJECT_AUTHOR=${author}`)
            break
          case 'description':
            sqlArr.push(`PROJECT_DESCRIPTION=${description}`)
            break
          case 'tags':
            sqlArr.push(`TAGS=${tags}`)
            break
        }
      })
      const SQL = `SELECT * FROM ${TRANSLATE_LIST_TABLE} SET ${sqlArr.join(' AND ')} WHERE ID=${id}`

      db.run(SQL, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })

  return promise
}
