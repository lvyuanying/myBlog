const dbUtils = require('./../utils/db-util')

const article = {

	async create(module){
		let result = await dbUtils.insertData('article',module)
		return result
	},

	async findAllArticle(){
		let result = await dbUtils.select('article','*')
		return result
	},

	async findArticleByAutor(autor){
		let result = await dbUtils.query('SELECT * FROM ?? WHERE autor = ?',['article',autor])
		if(Array.isArray(result) && result.length < 1 ){
			result = null
		}
		return result
	},

	async deleteArticleById(id){
		let result = await dbUtils.deleteDataById('article',id)
		return result
	}

}