/**
 * 用户业务操作
 */

const validator = require('validator')
const os = require('os')
const userModel = require('./../modules/user-info')
const userCode  = require('./../codes/user')
const getIPAdress = require('./../utils/getIPAdress')
const port = require('./../../config').port

const user = {

	async create(user){
		let result = await userModel.create(user)
		return result
	},

	async getExistOne(formData){
		let resultData = await userModel.getExistOne({
			'email' : formData.email,
			'name' : formData.userName
		})
		return resultData
	},

	async signIn(formData){
		let resultData = await userModel.getOneByUserNameAndPassword({
			'password' : formData.password,
			'name' : formData.userName
		})
		return resultData
	},

	async getUserInfoByUserName(userName){

		let resultData = await userModel.getUserInfoByUserName(userName) || {}
		let {id,...userInfo} = resultData
		let ipAdress = getIPAdress()
		userInfo.avatar_path = `http://${ipAdress}:${port}/${userInfo.avatar_path}`
		// let userInfo = {
		// 	email: resultData.eamil,
		// 	userName : resultData.name,
		// 	detailInfo: resultData.detail_info,
		// }
		return userInfo
	},

	async getUserList(params){
		let filter = {}
		let length = 0
		for(let key in params){
			if(key!='page' && key!='results'){
				filter[key] = params[key] 
			}
			length++ 
		}
		filter = length > 2 ?filter:null
		let users = await userModel.getUserList({
			page: parseInt(params.page) || 1,
			results: parseInt(params.results),
			filter: filter
		})

		let userList = users.map((user,index)=>{
			return {
				key: index,
				id: user.id,
				userName: user.name,
				email: user.email,
				create_time: user.create_time,
				modified_time: user.modified_time,
				identified: user.identified+''
			}
		})
		return userList
	},

	async getUserTotal(){
		let total = await userModel.getUserTotal()
		return total
	},

	async setUserInfo(formData){
		let edit = {}
		for(let key in formData){
			if(key != 'id'){
				edit[key] = formData[key]
			}
		}
		let resultData = await userModel.setUserInfo({
			id: formData.id,
			edit: edit
		})
		return resultData
	},

	async deleteUserById(formData){
		let resultData = await userModel.deleteUserById(formData.id)
		return resultData
	},

	validatorSignUp(userInfo){
		let result = {
			success: false,
			message: '',
		}

		if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
			result.message = userCode.ERROR_USER_NAME
			return result
		}
		if(!validator.isEmail(userInfo.email)){
			result.message = userCode.ERROR_USER_NAME
			return result
		}
		if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
	      	result.message = userCode.ERROR_PASSWORD
	      	return result
    	}
    	if(userInfo.password !== userInfo.confirmPassword){
    		result.message = userCode.ERROR_PASSWORD_CONFORM
    		return result
    	}

    	result.success = true

    	return result
	},

	setSession: ( ctx,results)=>{
		return new Promise((resolve, reject) => {
			let session = ctx.session
			session.isLogin = true
			session.userName = results.name
			session.userId = results.id
			session.userIdentified = results.identified
			if(session){
				resolve(session)
			}else{
				reject(null)
			}
		})
	},

	async getUserSessionBySid(sid){
		let result = await userModel.getUserInfoBySID(sid)
		return result
	},

	async getUserInfoById(id){
		let result = await userModel.getUserInfoById(id)
		return result
	}
}

module.exports = user