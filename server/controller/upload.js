const uploadCode = require('./../codes/upload')
const uploadService = require('./../services/upload')

module.exports = {

	async uploadAvatar( ctx,next ){

		const result = {
			success : false,
			message : '',
			data: null
		}

		let uploadResult = await uploadService.uploadAvatar(ctx)
		ctx.session.avatarPath = uploadResult.path

		if(uploadResult.path){
			result.success = true
			result.message = uploadCode.SUCCESS_FILE_UPLOAD
			result.code = 'SUCCESS_FILE_UPLOAD'
			result.data = uploadResult
		}else{
			result.message = uploadCode.FAIL_FILE_UPLOAD
			result.code = 'FAIL_FILE_UPLOAD'
			result.error = uploadResult
		}

		ctx.body = result
	}

}

