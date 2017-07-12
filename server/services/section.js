/**
 * 用户业务操作
 */

const validator = require('validator')
const sectionModule = require('./../modules/section')
const sectionCode = require('./../codes/section')

const section = {

	async create (section){
		let result = await sectionModule.create({
			name: section.name,
			detail_info: section.detailInfo 
		})
		return result
	},

	async editSection(section,id){
		let result = await sectionModule.updateSectionById({
			name : section.name,
			detail_info: section.detailInfo
		},id)
		return result
	},

	async deleteSection(id){
		let result = await sectionModule.deleteSectionById(id)
		return result
	},

	async getAllSection(){
		let SectionData = await sectionModule.getAllSection()
		// let result = new Array()
		// if(SectionData){
		// 	for(let key in SectionData){
		// 		result[key] = {
		// 			name: SectionData[key].name,
		// 			detailInfo: SectionData[key].detail_info
		// 		}
		// 	}
		// }
		return SectionData
	},

	async ExistOne(section){
		let result = await sectionModule.ExistOneByName(section.name)
		return result
	},

	validatorSectionInfo(sectionInfo){
		let result = {
			success: false,
			message: ''
		}
		let pattern = new RegExp("[\"`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：'。，、？]")

		if(pattern.test(sectionInfo.name)){
			result.message = sectionCode.ERROR_SECTION_NAME_NO_NORAML
			return result
		}

		if(sectionInfo.name == undefined){
			result.message = sectionCode.ERROR_SECTION_NAME_IS_NULL
			return result
		}else if(sectionInfo.name.replace(/\s/g,'').length < 1){
			result.message = sectionCode.ERROR_SECTION_NAME_IS_NULL
			return result
		}

		result.success = true
		return result
	}
}

module.exports = section

