import React from 'react'
import ReactDOM from 'react-dom'
import { Router,HashRouter, BrowserRouter, MemoryRouter, Route, Control } from 'react-keeper'

class Home extends React.Component{
	render(){
		return (
			<div>test</div>
		)
	}
}

class App extends React.Component{
	render(){
		return (
			<HashRouter>
	      		<div>
	        		<Route cache component={ Home } path="/"/>
	      		</div>
    		</HashRouter>
		)
	}
}

export default App