import React from 'react'
import { Layout,Menu} from 'antd'
import { HashRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import SiderBar from './../components/sider-bar.jsx'
import UserTable from './../components/user-table.jsx'
import UserInfoForm from './../components/user-info-form.jsx'

const { content } = Layout

class routerConfig extends React.Component {
	render(){
		return (
			<Router >
				<Layout className="ant-layout-has-sider" style={{height:'100%'}}>
					<SiderBar />
						<Redirect exact from='/' to='/user'/>
						<Route exact path="/user" component={UserTable} />
						<Route path="/myinfo" component={UserInfoForm} />
						<Route path="/test" render={()=><h1>test2</h1>} />
				</Layout>
			</Router> 
		)
	}
}

export default routerConfig