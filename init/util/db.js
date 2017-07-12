const mysql = require('mysql')

const pool = mysql.createPool({ //建立数据库连接
	host : '127.0.0.1',
	user : 'blogadmin',
	password : '15767958731',
	database : 'myBlog'
})

const query = (sql,values) =>{ //封装暴露mysql查询方法
	return new Promise((resolve, reject) => {
		pool.getConnection((err,connection)=>{//获得连接
			if(err){
				reject(err)
			}else{
				connection.query(sql,values,(err,rows)=>{
					if(err){
						reject(err)
					}else{
						resolve(rows)
					}
					connection.release() //释放常驻连接
				})
			}
		})	
	})
}

module.exports = {query}