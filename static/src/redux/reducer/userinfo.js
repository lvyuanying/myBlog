import Immutable from 'immutable'
import * as config from './../const/config'
import { getUserInfo, getUserList} from './../action'

const defaultState = Immutable.fromJS({data: {}, isFetching:false})

//自动拉取用户信息
export const UserInfo = ( state = defaultState, action = {}) =>{
	switch(action.type) {
		case config.REQUEST_POSTS_USERINFO:
			return state.set('isFetching',true)
		case config.SAVA_USERINFO:
			let data = action.json
			if(data.success){
				let map = Immutable.Map({'data': data ,'isFetching':false})
				return Immutable.Map({'data': data ,'isFetching':false})
			}else{
				return Immutable.Map({'error': data.message ,'isFetching':false})
			}
		default:
			return state
	}
}

//自动拉取用户列表
export const UserList = ( state = defaultState, action = {})=>{
	switch(action.type) {
		case config.REQUEST_POSTS_USERLIST:
			return state.set('isFetching', true)
		case config.SAVA_USERLIST:
			let data = action.json
			if(data.success){
				return Immutable.Map({'data': data ,'isFetching':false})
			}else{
				return Immutable.Map({'error': data.message ,'isFetching':false})
			}
		default:
			return state
	}
}

