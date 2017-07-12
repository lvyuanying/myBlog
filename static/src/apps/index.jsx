import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import FormGroup from './../components/form-group.jsx'
import SignInForm from './../components/sign-in-form.jsx'

import './../stylesheets/index.less'

const { Header, Content, Footer } = Layout

class App extends React.Component{
	render() {
		return (
			<Layout className="layout">
				<Content className="content">
					<SignInForm type="admin"/>
				</Content>
			</Layout>
		)
	}
}

export default App