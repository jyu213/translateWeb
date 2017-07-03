const CONFIG = require('../../config/constant')
const TRANSLATE_LIST_TABLE = 'translate_list'

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
      const CREATE_SQL = `CREATE TABLE IF NOT EXISTS ${TRANSLATE_LIST_TABLE} (ID INTEGER PRIMARY KEY,
                          USER_ID TEXT, PROJECT_TITLE TEXT, PROJECT_LINK TEXT, PROJECT_AUTHOR TEXT,
                          PROJECT_DESCRIPTION TEXT, PROJECT_TAGS TEXT, CREATE_TIME TEXT, MODIFY_TIME TEXT)`
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
        $create_time: currentTime,
        $modify_time: currentTime
      }

      console.log(data, 'the data')
      const INSERT_SQL = `INSERT INTO ${TRANSLATE_LIST_TABLE} VALUES ($id,
                                      $user_id, $project_title, $project_link,
                                      $project_author, $project_description, $project_tags,
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
