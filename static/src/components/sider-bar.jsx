import React from 'react'
import { Layout, Menu , Icon } from 'antd'
import { parseRenderContent } from './../utils/parse'
import { Link, Route } from 'react-router-dom'
import './../stylesheets/siderBar.less'

const { Sider } = Layout
const { SubMenu,Item} = Menu
let renderContent = parseRenderContent(render_content)

class SiderBar extends React.Component {
	componentWillMount(){
		// renderContent = parseRenderContent(render_content)
	}

	state={
		collapsed: false,
		mode : 'inline',
		// breakpoint : 'lg',
		collapsedWidth : '60',
		onCollapse:(collapsed)=>{
			this.setState({
				collapsed,
      			mode: collapsed ? 'vertical' : 'inline',
			})
		},
		defaultSelectedKeys:(roots)=>{
			const key = roots.map((root)=>{
				if(window.location.hash.indexOf(root.url) > 1){
					return root.url
				}
			})
			return key
			// return parseRenderContent(render_content).key
		}
	}

	render(){

		let ListItem = (props)=>{
			const Items = props.roots.map((root)=>(
					<Item key={root.key}>
						<Link to={root.url} className="link">
							<Icon type={root.icon} />
							<span className="nav-text">{root.name}</span>
						</Link>
					</Item>
				)
			)
			return (
				<Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys(renderContent.roots)}>
					{Items}
				</Menu>
			)
		}

		return(
			<Sider
			id= "siderBar"
			collapsible
			collapsed= {this.state.collapsed}
			breakpoint= {this.state.breakpoint}
			collapsedWidth= {this.state.collapsedWidth}
			onCollapse={this.state.onCollapse}>
				<div className="logo"></div>
				<ListItem roots={renderContent.roots} />
			</Sider>
		)
	}
}

export default SiderBar