const userInfoService = require('./../services/user-info')
const userCode = require('./../codes/user')

module.exports = {

	async signIn( ctx,next ){
		let formData = ctx.request.body
		let result = {
			success: false,
			message: '',
			data: null,
			code: '',
		}

		let userResult = await userInfoService.signIn(formData)

		if(userResult){
			result.success = true
		}else{
			result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
			result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
		}

		if(formData.source === 'form' && result.success === true){

			userInfoService.setSession( ctx,userResult ).then((response,error)=>{
				if(response.userName && response.userIdentified > 1){
					ctx.state.login = true
					ctx.redirect('/work/')
				}else{
					ctx.redirect('/error/')
				}
			})
		}else{
			ctx.body = result
		}
	},

	async signUp(ctx){
		let formData = ctx.request.body
		let result = {
			success: false,
			message: '',
			data: null
		}

		let validateResult = userInfoService.validatorSignUp(formData)

		if(validateResult.success === false){
			result = validateResult
			ctx.body = result
			return
		}
		let existOne = await userInfoService.getExistOne(formData)
		console.log(existOne)

		if(existOne) {
			if(existOne.name === formData.userName){
				result.message = userCode.FAIL_USER_NAME_IS_EXIST
				ctx.body = result
				return
			}
			if(existOne.email === formData.email){
				result.message = userCode.FAIL_EMAIL_IS_EXIST
				ctx.body = result
				return
			}
		}

		let userResult = await userInfoService.create({
			email: formData.email,
			password: formData.password,
			name: formData.userName,
			create_time: new Date().getTime(),
			level:1,
		})

		if(userResult && userResult.insertId*1>0){
			result.success = true
		}else{
			result.message = userCode.ERROR_SYS
		}

		ctx.body = result
	},

	async getLoginUserInfo(ctx){
		let session = ctx.session
		let isLogin = session.isLogin
		let userName = session.userName

		// console.log('session=', session)

		let result = {
			success: false,
			message: userCode.FAIL_USER_NO_EXIST,
			data: null,
		}
		if(isLogin === true && userName){
			let userInfo = await userInfoService.getUserInfoByUserName(userName)
			if(userInfo) {
				result.data = userInfo
				result.message = userCode.SUCCESS_USER
				result.success = true
			}
		}else{
			result.message = userCode.FAIL_USER_NO_LOGIN
		}

		ctx.body = result
	},

	async getUserList(ctx){
		let result = {
			success: false,
			message: userCode.FAIL_USER_NO_EXIST,
			data: null,
			code: 'FAIL_USER_NO_EXIST'
		}
		let params = ctx.request.query

		let resultList = await userInfoService.getUserList(params)
		let total = await userInfoService.getUserTotal()

		if(resultList){
			result.success = true
			result.message = userCode.SUCCESS_USER
			result.code = 'SUCCESS_USER'
			result.data = resultList
			result.total = total[0].total_count
		}

		ctx.body = result
	},

	async setUserInfo(ctx){
		let result = {
			success: false,
			message: userCode.FAIL_EDIT,
			data:null,
			code: 'FAIL_EDIT'
		}

		if(!ctx.session.userIdentified || ctx.session.userIdentified < 2){
			result.message = userCode.FAIL_USER_NO_ROOT
			result.code = 'FAIL_USER_NO_ROOT'
			ctx.body = result
			return
		}

		let formData = ctx.request.body
		let resultData = await userInfoService.setUserInfo(formData)

		if(resultData && resultData.affectedRows*1> 0){
			result.success = true
			result.message = userCode.SUCCESS_EDIT
			result.code = 'SUCCESS_EDIT'
		}

		ctx.body = result
		return
	},

	async delUserInfo(ctx){

		console.info('session',ctx.session)

		let result = {
			success: false,
			message: userCode.FAIL_EDIT,
			data:null,
			code: 'FAIL_EDIT'
		}

		if(!ctx.session.userIdentified || ctx.session.userIdentified < 2){
			result.message = userCode.FAIL_USER_NO_ROOT
			result.code = 'FAIL_USER_NO_ROOT'
			ctx.body = result
			return
		}

		let formData = ctx.request.body
		let resultData = await userInfoService.deleteUserById(formData)

		if(resultData && resultData.affectedRows*1> 0){
			result.success = true
			result.message = userCode.SUCCESS_EDIT
			result.code = 'SUCCESS_EDIT'
		}

		ctx.body = result
		return
	},

	async getUserInfo(ctx){
		let result = {
			success: false,
			message: userCode.FAIL_USER_NO_EXIST,
			code: 'FAIL_USER_NO_EXIST'
		}

		let id = ctx.session.userId
		let userResult = await userInfoService.getUserInfoById(id)

		if(userResult){
			result.success=  true,
			result.message= userCode.SUCCESS_USER,
			result.code= 'SUCCESS_USER'
		}
		ctx.body = result
	},

	validateLogin(ctx){
		let result = {
			success: false,
			message: userCode.FAIL_USER_NO_LOGIN,
			data: null,
			code: 'FAIL_USER_NO_LOGIN'
		}

		let session = ctx.session
		if(session && session.isLogin === true){
			result.success = true
			result.message = ''
			result.code = ''
		}

		ctx.body = result
	},


}