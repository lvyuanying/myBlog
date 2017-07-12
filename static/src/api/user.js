import Request from './../utils/request'

const getUserList = async(params)=>{
	let result = await Request.get({
		url: '/api/user/getUserList',
		data: params
	})
	return result
}

const delUser = async(id)=>{
	let result = await Request.post({
		url: '/api/user/delUserInfo',
		data: id
	})
	return result
}

const setUserIdentified = async(options)=>{
	let result = await Request.post({
		url:'/api/user/setUserInfo',
		data:{
			id:options.id,
			identified:options.identified
		}
	})
	return result
}

const uploadUserAvatar = async(obj) =>{
	let result = await Request.upload({
		url: '/api/file/uploadAvatar',
		data: {
			avatar: obj.avatar,
			userid: obj.userid,
			source : 'file'
		}
	})
	return result
}

const getUserInfo = async(obj) =>{
	let result = await Request.get({
		url: '/api/user/getUserInfo'
	})

	return result
}

export { getUserList, delUser, setUserIdentified, uploadUserAvatar, getUserInfo }