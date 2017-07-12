const dbUtils  = require('./../utils/db-util')

const user = {

	/**
	*数据库创建用户
	*@param  {object} model 用户数据模型
	*@return {object} 		mysql执行结果
	*/
	async create (model){
		let result = await dbUtils.insertData('user-info',model)
		return result
	},

	/**
	*查找一个存在的用户
	*@param  {object} 		options 查找条件参数
	*@return {object|null} 			查找结果
	*/
	async getExistOne(options){
		let _sql = `
		SELECT * FROM user_info 
		WHERE email = "${options.email}" or name = "${options.name}"
		LIMIT 1`
		let result = await dbUtils.query(_sql)
		if(Array.isArray(result) && result.length > 0){
			result = result[0]
		}else{
			result = null
		}
		return result
	},

	/**
	 * 根据用户名和密码查找用户
	 * @param    {object}   	options 查找条件参数
	 * @return   {object|null} 			查找结果
	 */
	async getOneByUserNameAndPassword(options){
		let _sql = `
		SELECT * FROM user_info
			WHERE password = "${options.password}" and name = "${options.name}"
			limit 1`
		let result = await dbUtils.query(_sql)
		if(Array.isArray(result) && result.length >0){
			result = result[0]
		}else{
			result = null
		}
		return result
	},


	/**
	 * [getUserInfo description]
	 * @param  {object} options 查找参数
	 *                          page 页码
	 *                          results 返回结果数目
	 *                          filter 过滤条件
	 * @return {[type]}         [description]
	 */
	async getUserList(options){
		let filter = 'WHERE '
		let length = 1
		if(options.filter){
			for(let key in options.filter){
				if(length > 1){
					filter += ` and ${key} = '${options.filter[key]}'`
				}else{
					filter += `${key} = '${options.filter[key]}'`
				}
				length++
			}
		}else{
			filter = ''
		}
		let start = (options.page-1)*options.results
		let end = options.page*options.results
		let _sql = `SELECT ?? FROM user_info ${filter} LIMIT ?,?`
		let result = await dbUtils.query(_sql,[['id','email','name','create_time','modified_time','identified'],start,end])
		if(Array.isArray(result) && result.length<1){
			result = null
		}
		return result
	},

	async setUserInfo(options){
		let result = await dbUtils.updateData('user_info',options.edit,options.id)
		return result
	},

	async getUserTotal(){
		let result = await dbUtils.count('user_info')
		return result
	},

	async deleteUserById(id){
		let _sql = 'id in ('
		if(Array.isArray(id)){
			for(let key in id){
				_sql += `${id[key]}`
				if(key != id.length-1){
					_sql += ','
				}else{
					_sql +=')'
				}
			}
		}else{
			_sql = `id = ${id}`
		}

		console.log(_sql)
		let result = await dbUtils.query(`delete from user_info where ${_sql}`)
		return result
	},

	async deleteDataByInfo(options){
		let result = await dbUtils.deleteDataByInfo('user_info',options)
		return result
	},

	async getUserInfoBySID(Sid){
		let _sql = `select data from _mysql_session_store where id = "USER_SID:${Sid}"`
		let result = await dbUtils.query(_sql)
		if(Array.isArray(result) && result.length > 0){
			result = result[0]
		}else{
			result = null
		}
		return result
	},

	async getUserInfoByUserName(userName){
		let result = await dbUtils.selectByInfo('user_info','*',{name:userName})
		if(Array.isArray(result) && result.length >0){
			result = result[0]
		}else{
			result = null
		}
		return result
	},

	async getUserInfoById(id){
		let result = await dbUtils.findDataById('user_info',id)
		if(Array.isArray(result) && result.length > 0){
			result = result[0]
		}else{
			result = null
		}
		return result
	}
}

module.exports = user