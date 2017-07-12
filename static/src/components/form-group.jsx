import React from 'react'
import { Tabs } from 'antd'
import SignInForm from './../components/sign-in-form.jsx'

const TabPane = Tabs.TabPane

class FormGroup extends React.Component {

	render() {
		return (
			<div>
		        <Tabs defaultActiveKey="1" size="small">
		          <TabPane tab="登录" key="1">
		            <SignInForm />
		          </TabPane>
		          <TabPane tab="注册" key="2">
		          </TabPane>
		        </Tabs>
     		</div>
		)
	}
}

export default FormGroup