const { uploadFile } = require('./../utils/upload')
const userServer = require('./user-info')
const getIPAdress = require('./../utils/getIPAdress')
const port = require('./../../config').port

/**
 * uploadAvatar
 * @param  {object} ctx  传入koa2的上下文，供upload插件读取
 * @return {object}      返回头像存放路径
 */
const uploadAvatar = async (ctx)=>{
	try{
		let uploadResult = await uploadFile( ctx,{
			path: './../../static/' + '/file'
		})

		let results = await userServer.setUserInfo({
			id: ctx.session.userId, 
			avatar_path: uploadResult.staticPath
		})
		let ip = getIPAdress()

		return {
			path: `http://${ip}:${port}/${uploadResult.staticPath}`,
			type: uploadResult.fileType,
			name: uploadResult.fileName
		}
	}catch(err){
		return err
	}
}

module.exports =  {
	uploadAvatar
}