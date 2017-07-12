const dbUtils = require('./../utils/db-util')

const section = {

	/**
	 * [create description]
	 * @param  {object} module 用户数据模型
	 * @return {object}        sql返回结果
	 */
	
	async create (module){
		let result = await dbUtils.insertData('section',module)
		return result
	},

	async deleteSectionById (id){
		let result = await dbUtils.deleteDataById('section',id)
		return result
	},

	async updateSectionById(values,id){
		let result = await dbUtils.updateData('section',values,id)
		return result
	},

	async getAllSection (){
		let result = await dbUtils.select('section','*')
		if(result.length < 0){
			result = null
		}
		return result
	},

	async ExistOneByName (name){
		let result = await dbUtils.query('SELECT * FROM ?? WHERE name = ? LIMIT 1',['section',name])
		if(Array.isArray(result) && result.length >0){
			result = result[0]
		}else{
			result = null
		}
		return result
	}
}

module.exports = section