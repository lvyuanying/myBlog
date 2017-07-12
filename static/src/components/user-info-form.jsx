import React from 'react'
import { Input, Layout, Button, Icon, message, Upload, Form, Spin, DatePicker } from 'antd'
import DropBox from './drop-box.jsx'

import { getUserInfo } from './../api/user'
import { parseRenderContent } from './../utils/parse'
import './../stylesheets/user-info-form.less'

const { Content } = Layout
const FormItem = Form.Item

class UserInfoForm extends React.Component {
	state = {
		update : true,
		user: {
			avatar_path: './file/jpeg/display.jpg'
		}
	}

	validator(type){
		let rules = [{
			required: true,
			message: '此项不能为空'
		}]
		switch(type) {
			case 'userName':
				let array = [{
					max: 16,
					message: '用户名长度不能大于16位'
				},{
					min: 3,
					message: '用户名长度不能小于3位'
				}]
				rules = rules.concat(array)
				break;
			case 'email':
				rules.push({
					type: 'email',
					message: '邮箱格式不规范'
				})
				break;
			default :
				break;
		}
		return rules
	}

	constructor(props){
		super(props)
		const { match, location, history } = this.props
		console.log( location )
	}

	async componentDidMount(){
		this.setPic()
	}

	setPic = async ()=>{
		let result = await getUserInfo()
		this.setState({
			user : result.data
		})
	}

	componentWillUnmount(){
		
	}

	render(){
		const { getFieldDecorator } = this.props.form
		const that = this

		const formItemLayout = {
	    	labelCol: {
		        xs: { span: 6 },
		        sm: { span: 2 },
		      },
		      wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 14 },
		      },
		    }
	    const tailFormItemLayout = {
	     	wrapperCol: {
		        xs: {
		          span: 24,
		          offset: 0,
		        },
		        sm: {
		          span: 14,
		          offset: 6,
		        },
		      },
		    }

		return(
			<Layout id="user-info-form">
				<Content className="table-content">
					<Form>
						<DropBox src={this.state.user.avatar_path} tips="点击上传头像" />
						<div className="right">
							<FormItem >
							 	<h1>{this.state.user.name}信息修改</h1>
							</FormItem>
							<FormItem 
							label="昵称"
							{...formItemLayout} 
							hasFeedback >
								{getFieldDecorator('userName', {
									initialValue: this.state.user.nick,
									rules: this.validator('userName')
								})(
								<Input 
									prefix={<Icon type="user"/>}
									ref={node => this.nickInput=node} />
								)}
							</FormItem>
							<FormItem
							label="E-mail"
							{...formItemLayout} 
							hasFeedback >
								{getFieldDecorator('email', {
									initialValue: this.state.user.email,
									rules: this.validator('email')
								})(
								<Input
									prefix={<Icon type="mail"/>}
									ref={node => this.emailInput=node} />
								)}
							</FormItem>
							<FormItem
							label="地址"
							{...formItemLayout}  >
								{getFieldDecorator('address', {
									initialValue: this.state.user.address,
								})(
								<Input
									prefix={<Icon type="mail"/>}
									ref={node => this.addressInput=node} />
								)}
							</FormItem>
							<FormItem
							label="生日"
							{...formItemLayout}  >
								{getFieldDecorator('brithday', {
									initialValue: this.state.user.brithday,
								})(
								<DatePicker />
								)}
							</FormItem>
							<Input type="textarea" placeholder = "个人信息简介" 
							autosize={{ minRows: 2, maxRows: 6 }} />
						</div>
					</Form>
				</Content>
			</Layout>
		)
	}
}

UserInfoForm = Form.create()(UserInfoForm)
export default UserInfoForm