const mysql = require('mysql')
const { Store } = require('koa-session2')

const CREATE_STATEMENT = 'CREATE  TABLE IF NOT EXISTS `_mysql_session_store` (`id` VARCHAR(255) NOT NULL, `expires` BIGINT NULL, `data` TEXT NULL, PRIMARY KEY (`id`), KEY `_mysql_session_store__expires` (`expires`));'
    , GET_STATEMENT = 'SELECT * FROM `_mysql_session_store` WHERE id  = ? AND expires > ?'
    , SET_STATEMENT ='INSERT INTO _mysql_session_store(id, expires, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE expires=?, data =?'
    , DELETE_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE id  = ?'
    , CLEANUP_STATEMENT = 'DELETE FROM `_mysql_session_store` WHERE expires  < ?' ;

const FORTY_FIVE_MINUTES = 45 * 60 * 1000

const getExpiresOn = function(session, ttl){
    let expiresOn = null ;
    ttl = ttl || FORTY_FIVE_MINUTES

    if(session && session.cookie && session.cookie.expires) {
        if (session.cookie.expires instanceof Date) {
            expiresOn = session.cookie.expires
        } else {
            expiresOn = new Date(session.cookie.expires)
        }
    } else {
        let now = new Date() ;
        expiresOn = new Date(now.getTime() + ttl) ;
    }
    return expiresOn
}

function getQuery(config){
	let pool = mysql.createPool({
		host : config.host,
		user : config.user,
		password : config.password,
		database : config.database
	})

	let query = function( sql , values){
		return new Promise((resolve, reject) => {
			pool.getConnection((err,connection)=>{
				if(err){
					reject(err)
				}else{
					connection.query( sql, values, ( err,rows )=>{
						if(err){
							reject(err)
						}else{
							resolve(rows)
						}
						connection.release()
					})
				}
			})	
		})
	}

	return query
}

class mySqlStore extends Store {

	constructor(config){
		super(config)
		this.query = getQuery(config)
		this.query(CREATE_STATEMENT)
		// let now = new Date().getTime()
  //       let results = this.query(CLEANUP_STATEMENT, [now])
	}

	async get(sid){
		let results = await this.query(GET_STATEMENT, [sid, Date.now()])
        let session = null
	    if(results && results[0] && results[0].data){
	        session = JSON.parse(results[0].data)
	    }
	    return session
	}

	async set(session) {
		let sid = this.getID(24)
		let expires = getExpiresOn(session).valueOf()
	    let data = JSON.stringify(session)
        try {
            await this.query(SET_STATEMENT, [sid, expires, data, expires, data])
        } catch (e) {}
        return sid
    }

    async destroy(sid) {
        let results = this.query(DELETE_STATEMENT, [sid])
        return results
    }
}

module.exports = mySqlStore