import { createStore, combineReducers, applyMiddleware } from 'readux'
import * as reducer from "../reducer/index"
import thunk from 'redux-thunk'

export default store = createStore(
		combineReducers(reducer),
		applyMiddleware(thunk)
	)