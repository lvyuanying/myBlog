import * as user_api from './../../api/user'
import * action from './../const/const'

//存储用户个人信息
const saveUserInfo = json =>{
	return {
		type: action.SAVA_USERINOF,
		...json
	}
}

//存储用户列表数据
const saveUserList = json =>{
	return {
		type: action.SAVA_USERLIST,
		json
	}
}

//首次进入页面加载用户信息
export const getUserInfo = async () =>{
	return dispath =>{
		user_api.getUserInfo().then( reponse =>{
			dispath(saveUserInfo(reponse))
		}).catch(error => console.log(error))
	}
}

export const getUserList = async ()=>{
	return dispath =>{
		user_api.getUserList().then( reponse =>{
			user_api.getUserList
		})
	}
}

