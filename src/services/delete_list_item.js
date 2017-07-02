const CONFIG = require('../../config/constant')
const TRANSLATE_LIST_TABLE = 'translate_list'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

/**
 * @Service: 删除单列表条目
 *
 * @param {String} id, 项目 ID
 */
exports.delete = (id) => {
  const DELETE_SQL = `delete from ${TRANSLATE_LIST_TABLE} where id=${id}`
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
