const sectionService = require('./../services/section')
const sectionCode = require('./../codes/section')

module.exports = {

	async addNewSection(ctx){

		let formData = ctx.request.body
		let result = {
			success: false,
			data: null,
			code:'',
			message: ''
		}

		let validatorResult = sectionService.validatorSectionInfo(formData)

		if(!validatorResult.success){
			result = validatorResult
			ctx.body = result
			return
		}

		let existOne = await sectionService.ExistOne(formData)

		if(existOne){
			result.message = sectionCode.FAIL_SECTION_NAME_IS_EXIST
			result.code = 'FAIL_SECTION_NAME_IS_EXIST'
			ctx.body = result
			return
		}

		let sectionResult = await sectionService.create(formData)
		console.log(sectionResult)

		if(sectionResult && sectionResult.insertId*1>0){
			result.success = true
			result.code = 'SUCCESS_SECTION_ADD'
			result.message = sectionCode.SUCCESS_SECTION_ADD
		}else{
			result.code = 'ERROR_SYS'
			result.message = sectionCode.ERROR_SYS
		}

		ctx.body = result
	},

	async deleteSection(ctx){
		let formData = ctx.request.body
		let result = {
			success : false,
			message : '',
			code : '',
			data : null
		}

		let deleteResult = await sectionService.deleteSection(formData.id)

		if(deleteResult && deleteResult.affectedRows*1>0){
			result.success = true
			result.code = 'SUCCESS_SECTION_DELETE'
			result.message = sectionCode.SUCCESS_SECTION_DELETE
		}else if(deleteResult.affectedRows*1 == 0){
			result.code = 'FAIL_SECTION_DELETE'
			result.message = sectionCode.FAIL_SECTION_DELETE
		}else{
			result.code = 'ERROR_SYS'
			result.message = sectionCode.ERROR_SYS
		}

		ctx.body = result
	},

	async findAllSection(ctx) {
		let formData = ctx.request.body
		let result = {
			success : false,
			message : '',
			code : '',
			data: null 
		}

		let findAllResult = await sectionService.getAllSection()

		if(findAllResult){
			result.success = true
			result.code = 'SUCCESS_SECTION_SELECT'
			result.message = sectionCode.SUCCESS_SECTION_SELECT
			result.data = findAllResult
		}else if(result == null){
			result.code = 'FAIL_SECTION_IS_NONE'
			result.message = sectionCode.FAIL_SECTION_IS_NONE
		}else{
			result.code = 'ERROR_SYS'
			result.message = sectionCode.ERROR_SYS
		}

		ctx.body = result
	},

	async editSeciton(ctx){
		let formData = ctx.request.body
		let result = {
			success : false,
			message : '',
			code : '',
			data : null
		}

		let editResult = await sectionService.editSection(formData, formData.id)
		console.log(editResult)

		if(editResult && editResult.affectedRows*1 > 0){
			result.success = true
			result.code = 'SUCCESS_SECTION_UPDATE'
			result.message = sectionCode.SUCCESS_SECTION_UPDATE
		}else if(editResult.affectedRows*1 == 0){
			result.code = 'FAIL_SECTION_IS_NONE'
			result.message = sectionCode.FAIL_SECTION_IS_NONE
		}else{
			result.code = 'ERROR_SYS'
			result.message = sectionCode.ERROR_SYS
		}

		ctx.body = result
	}


}	