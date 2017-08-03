import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './../redux/store/store'
import Route from './../router/router-config.jsx'

class App extends React.Component{

	render(){
		return (
			<Provider store={store}>
				<Route />
			</Provider>
		)
	}
}

export default App