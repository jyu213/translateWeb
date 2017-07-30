/**
 * article table 数据操作
 */
const CONFIG = require('../../config/constant')
const ARTICLES_TABLE = 'articles'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

/**
 * @Service: 创建单列表条目
 *
 * @param {String} userId, 用户 ID
 * @param {String} title, 项目标题
 * @param {String} link, 项目外部链接
 * @param {String} author, 项目指派作者，默认为空
 * @param {String} description, 项目描述
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
                          PROJECT_DESCRIPTION TEXT, PROJECT_TAGS TEXT, PROJECT_CONTENT TEXT, CREATE_TIME TEXT, MODIFY_TIME TEXT)`
      db.run(CREATE_SQL)
      const { userId, title, link, author, description, tags } = params
      const currentTime = (new Date()).getTime()
      const data = {
        $user_id: userId,
        $project_title: title,
        $project_link: link,
        $project_author: author,
        $project_description: description,
        $project_tags: tags,
        // 留空字段
        $project_content: '',
        $create_time: currentTime,
        $modify_time: currentTime
      }

      console.log(data, 'the data')
      const INSERT_SQL = `INSERT INTO ${ARTICLES_TABLE} VALUES ($id,
                                      $user_id, $project_title, $project_link, $project_author,
                                      $project_description, $project_tags, $project_content,
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
      let sqlArr = params.keys().length > 0 ? [`MODIFY_TIME='${currentTime}'`] : []

      Object.entries(params).map((item, key) => {
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
          case 'tags':
            sqlArr.push(`TAGS='${tags}'`)
            break
        }
      })
      const SQL = `SELECT * FROM ${ARTICLES_TABLE} SET ${sqlArr.join(' AND ')} WHERE ID='${id}'`

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
  const SQL = `SELECT * FROM ${ARTICLES_TABLE} ${sqlArr.length > 0 ? 'WHERE ' + sqlArr.join(' AND ') : ''} ORDER BY MODIFY_TIME`
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
