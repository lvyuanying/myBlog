const router = require('koa-router')()
const userInfoController = require('./../controller/user-info')
const uploadController = require('./../controller/upload')
const sectionController = require('./../controller/section')

const routers = router
	.get('/user/getUserInfo',userInfoController.getLoginUserInfo)
	.get('/user/getUserList',userInfoController.getUserList)
	.post('/user/setUserInfo',userInfoController.setUserInfo)
	.post('/user/delUserInfo',userInfoController.delUserInfo)
	.get('/user/getUserInfoById',userInfoController.getUserInfo)

	.post('/file/uploadAvatar',uploadController.uploadAvatar)

	.post('/user/SignIn',userInfoController.signIn)
	.post('/user/SignUp',userInfoController.signUp)

	.post('/section/addNewSection',sectionController.addNewSection)
	.post('/section/deleteSection',sectionController.deleteSection)
	.post('/section/editSection',sectionController.editSeciton)
	.get('/section/findAllSection',sectionController.findAllSection)

	


module.exports = routers