import * as user_api from './../../api/user'
import * as action from './../const/config'

//正在请求用户信息
const requestPostsUserInfo = () =>{
	return {
		type: action.REQUEST_POSTS_USERINFO
	}
}

//正在请求用户列表
const requestPostsUserList = () =>{
	return {
		type: action.REQUEST_POSTS_USERLIST
	}
}

//接收请求
const receivePost = () =>{
	return {
		type: RECEIVE_POSTS,
	}
}

//存储用户个人信息
const saveUserInfo = json =>{
	return {
		type: action.SAVA_USERINFO,
		json
	}
}

//存储用户列表数据
const saveUserList = json =>{
	return {
		type: action.SAVA_USERLIST,
		json
	}
}

//更新分页内容总数
const updatePaginationTotal = total =>{
	return {
		type: action.UPDATA_PAGINATION_STATE,
		total
	}
}


//首次进入页面加载用户信息
export const getUserInfo = () =>{
	return dispatch =>{
		dispatch(requestPostsUserInfo())
		user_api.getUserInfo().then( reponse =>{
			dispatch(saveUserInfo(reponse))
		}).catch(error => console.log(error))
	}
}

//获得用户列表
export const getUserList = (params)=>{
	return dispatch =>{
		dispatch(requestPostsUserList())
		user_api.getUserList(params).then( reponse =>{
			dispatch(savaUserList(reponse))
			dispatch(updatePaginationTotal(reponse.total))
		}).catch(error => console.log(error))
	}
}