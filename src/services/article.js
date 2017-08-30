/**
 * article table 数据操作
 */
const CONFIG = require('../../config/constant')
const ARTICLES_TABLE = 'articles'
const USER_TABLE = 'user'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

function formateDate (date) {
  date = date * 1
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/**
 * @Service: 创建单列表条目
 *
 * @param {String} userId, 用户 ID
 * @param {String} title, 项目标题
 * @param {String} link, 项目外部链接
 * @param {String} author, 项目指派作者，默认为空
 * @param {String} description, 项目描述
 * @param {String} status, 项目状态, ON 待认领/PREVIEW 审核/GOING 进行中/DONE 已完成
 * @param {String} tags, 项目关联标题？？  tag1,tag2 ??
 *
 * @param {String} createTime, 项目创建时间, 非传值？？
 * @param {String} modifyTime, 项目修改时间，初始值同创建时间， 非传值？？
 */
exports.create = (params) => {
  let promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      const CREATE_SQL = `CREATE TABLE IF NOT EXISTS ${ARTICLES_TABLE} (ID INTEGER PRIMARY KEY,
                          USER_ID TEXT, PROJECT_TITLE TEXT, PROJECT_LINK TEXT, PROJECT_AUTHOR TEXT,
                          PROJECT_DESCRIPTION TEXT, PROJECT_TAGS TEXT, PROJECT_STATUS TEXT,
                          PROJECT_CONTENT TEXT, CREATE_TIME TEXT, MODIFY_TIME TEXT)`
      db.run(CREATE_SQL)
      const { userId, title, link, author, description, tags, status = 'ON' } = params
      const currentTime = (new Date()).getTime()
      const data = {
        $user_id: userId,
        $project_title: title,
        $project_link: link,
        $project_author: author,
        $project_description: description,
        $project_tags: tags,
        $project_status: status,
        // 留空字段
        $project_content: '',
        $create_time: currentTime,
        $modify_time: currentTime
      }

      const INSERT_SQL = `INSERT INTO ${ARTICLES_TABLE} VALUES ($id,
                                      $user_id, $project_title, $project_link, $project_author,
                                      $project_description, $project_tags, $project_status, $project_content,
                                      $create_time, $modify_time)`

      console.log('RUNSQL: ', INSERT_SQL)
      db.run(INSERT_SQL, data, (err) => {
        if (err) {
          reject(err)
        }
        resolve('success')
      })
    })
  })

  return promise
}

/**
 * @Service: 删除单列表条目
 *
 * @param {String} id, 项目 ID
 */
exports.delete = (id) => {
  const DELETE_SQL = `delete from ${ARTICLES_TABLE} where id=${id}`
  let promise = new Promise((resolve, reject) => {
    if (typeof id === 'undefined') {
      reject('miss param id')
    }
    db.serialize(() => {
      db.run(DELETE_SQL, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })

  return promise
}

/**
 * @Service: 更新单列表条目
 *
 * @param {String} title, 项目标题
 * @param {String} link, 项目外部链接
 * @param {String} author, 项目指派作者，默认为空
 * @param {String} description, 项目描述
 * @param {String} status, 项目状态
 * @param {String} tags, 项目关联标题？？  tag1,tag2 ??
 */
exports.update = (id, params) => {
  let promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      const {title, link, author, description, tags, status} = params
      const currentTime = (new Date()).getTime()

      if (typeof id === 'undefined') {
        console.log('bbb')
        reject('miss param id')
      }

      let sqlArr = Object.keys(params).length > 0 ? [`MODIFY_TIME='${currentTime}'`] : []

      console.log('aaa', sqlArr)
      Object.entries(params).map((item, key) => {
        console.log(item[0])
        switch (item[0]) {
          case 'title':
            sqlArr.push(`PROJECT_TITLE='${title}'`)
            break
          case 'link':
            sqlArr.push(`PROJECT_LINK='${link}'`)
            break
          case 'author':
            sqlArr.push(`PROJECT_AUTHOR='${author}'`)
            break
          case 'description':
            sqlArr.push(`PROJECT_DESCRIPTION='${description}'`)
            break
          case 'status':
            sqlArr.push(`PROJECT_STATUS='${status}'`)
            break
          case 'tags':
            sqlArr.push(`TAGS='${tags}'`)
            break
        }
      })
      const SQL = `UPDATE ${ARTICLES_TABLE} SET ${sqlArr.join(', ')} WHERE ID='${id}'`

      console.log('RUN SQL: ', SQL)
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
        params[key] && sqlArr.push(`USER_ID='${params[key]}'`)
        break;
    }
  }
  const SQL = `SELECT *, a.ID as AID, u.ID as UID, USERNAME FROM ${ARTICLES_TABLE} as a LEFT OUTER JOIN ${USER_TABLE} as u ON
              a.PROJECT_AUTHOR=u.ID
              ${sqlArr.length > 0 ? 'WHERE ' + sqlArr.join(' AND ') : ''} ORDER BY CREATE_TIME`
  let promise = new Promise((resolve, reject) => {
    console.log('RUN SQL: ', SQL)
    db.all(SQL, (err, rows) => {
      if (err) {
        reject(new Error(err))
      }
      let data = rows.map((item) => {
        return {
          id: item.AID,
          userId: item.UID,
          title: item.PROJECT_TITLE,
          // author: item.PROJECT_AUTHOR,
          author: item.USERNAME,
          link: item.PROJECT_LINK,
          description: item.PROJECT_DESCRIPTION,
          status: item.PROJECT_STATUS,
          tags: item.TAGS,
          createTime: formateDate(item.CREATE_TIME),
          modifyTime: formateDate(item.MODIFY_TIME)
        }
      }) || []
      resolve(data)
    })
  })

  return promise
}
