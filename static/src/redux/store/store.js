import { createStore, applyMiddleware } from 'redux'
import rootReducer from "../reducer/index"
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as action from './../action'

const loggerMiddleware = createLogger()

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)

const store = createStore(rootReducer, middleware)

export default store 