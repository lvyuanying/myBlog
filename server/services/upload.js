const { uploadFile } = require('./../utils/upload')
const userServer = require('./user-info')

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
		console.log(results)

		return {
			path: uploadResult.staticPath,
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