/**
 * User table
 */
const CONFIG = require('../../config/constant')
const USER_TABLE = 'user'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(CONFIG.DBPATH)

/**
 * @Service: 创建用户
 *
 * @param {String} username, 用户名
 * @param {String} password, 密码
 * @param {String} profile, 用户头像，暂未开放
 * @param {Number} role, 权限，未开放，对应 0，1，2
 */
exports.create = (params) => {
  let promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      const CREATE_SQL = `CREATE TABLE IF NOT EXISTS ${USER_TABLE} (ID INTEGER PRIMARY KEY,
                          USERNAME TEXT, PASSWORD TEXT, PROFILE TEXT, ROLE INT,
                          CREATE_TIME TEXT, MODIFY_TIME TEXT,
                          UNIQUE(USERNAME))`
      db.run(CREATE_SQL)
      const { username, password } = params
      const currentTime = (new Date()).getTime()

      const data = {
        $username: username,
        $password: password,
        // 暂时默认字段
        $profile: '',
        $role: 1,
        $create_time: currentTime,
        $modify_time: currentTime
      }

      const INSERT_SQL = `INSERT INTO ${USER_TABLE} VALUES ($id,
                                      $username, $password, $profile, $role,
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
 * @Service: 更新用户信息
 *
 * @param {Number} id, 用户 id
 * @param {String} username, 用户名
 * @param {String} password, 密码
 * @param {String} profile, 用户头像
 * @param {Number} role, 用户权限，对应 0，1，2
 */
exports.update = (id, params) => {
  let promise = new Promise((resolve, reject) => {
    db.serialize(() => {
      const {username, password, profile, role} = params
      const currentTime = (new Date()).getTime()

      if (typeof (id) === 'undefined') {
        reject('miss param id')
      }
      let sqlArr = params.keys().length > 0 ? [`MODIFY_TIME='${currentTime}'`] : []

      Object.entries(params).map((item, key) => {
        switch (item[0]) {
          case 'username':
            sqlArr.push(`USERNAME='${username}'`)
            break
          case 'password':
            sqlArr.push(`PASSWORD='${password}'`)
            break
          case 'profile':
            sqlArr.push(`PROFILE='${profile}'`)
            break
          case 'role':
            sqlArr.push(`ROLE='${role}'`)
            break
        }
      })
      const SQL = `SELECT * FROM ${USER_TABLE} SET ${sqlArr.join(' AND ')} WHERE ID='${id}'`

      console.log('RUNSQL: ', SQL)
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
 * @Service: 取用户列表
 */
exports.list = (params) => {
  let sqlArr = []

  const SQL = `SELECT * FROM ${USER_TABLE} ${sqlArr.length > 0 ? 'WHERE ' + sqlArr.join(' AND ') : ''} ORDER BY MODIFY_TIME`
  let promise = new Promise((resolve, reject) => {
    console.log('RUN SQL: ', SQL)
    db.all(SQL, (err, rows) => {
      if (err) {
        reject(new Error(err))
      }
      let data = rows.map((item) => {
        return {
          id: item.ID,
          username: item.USERNAME,
          profile: item.PROFILE,
          role: item.ROLE,
          createTime: item.CREATE_TIME,
          modifyTime: item.MODIFY_TIME
        }
      }) || []
      resolve(data)
    })
  })

  return promise
}

/**
 * @Service: 用户是否存在
 *
 * @param {Number} id, 用户 id
 * @param {String} username, 用户名
 * @param {String} password, 密码
 */
exports.isExist = (params) => {
  const {username, id, password} = params
  let sqlArr = []

  Object.entries(params).map((item, key) => {
    switch (item[0]) {
      case 'id':
        sqlArr.push(`id='${id}'`)
        break
      case 'username':
        sqlArr.push(`USERNAME='${username}'`)
        break
      case 'password':
        sqlArr.push(`password='${password}'`)
        break
    }
  })

  const SQL = `SELECT * FROM ${USER_TABLE} WHERE ${sqlArr.join(' AND ')}`

  let promise = new Promise((resolve, reject) => {
    console.log('RUNSQL: ', SQL)
    db.get(SQL, (err, row) => {
      if (err) {
        resolve([])
        return false
      }
      let data = row ? [{
        id: row.ID,
        username: row.USERNAME,
        password: row.PASSWORD,
        profile: row.PROFILE,
        role: row.ROLE,
        createTime: row.CREATE_TIME,
        modifyTime: row.MODIFY_TIME
      }] : []

      resolve(data)
    })
  })

  return promise
}
