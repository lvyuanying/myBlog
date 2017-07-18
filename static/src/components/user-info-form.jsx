import React from 'react'
import { Input, Layout, Button, Icon, message, Upload, Form, Spin, DatePicker, Radio, Row, Col } from 'antd'
import DropBox from './drop-box.jsx'

import { getUserInfo } from './../api/user'
import { parseRenderContent } from './../utils/parse'
import './../stylesheets/user-info-form.less'

const { Content } = Layout
const FormItem = Form.Item
const RadioGroup = Radio.Group

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
	}

	async componentDidMount(){
		this.getUserInfo()
	}

	getUserInfo = async ()=>{
		let result = await getUserInfo()
		this.setState({
			user : result.data
		})
	}

	setAvatar = (path)=>{
		let user = this.state.user
		user.avatar_path = path
		this.setState({
			user:user
		})
	}

	componentWillUnmount(){
		
	}

	render(){
		const { getFieldDecorator } = this.props.form
		const that = this

		const formItemLayout = {
	    	labelCol: {
		        xs: { span: 8 },
		        sm: { span: 4 },
		      },
		      wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 10 },
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
						<DropBox src={this.state.user.avatar_path} tips="点击上传头像" cb={this.setAvatar}/>
						<div className="right">
							<FormItem>
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
							label="性别"
							{...formItemLayout} >
								{getFieldDecorator('sex', {
									initialValue: this.state.user.sex,
								})(
								<RadioGroup>
									<Radio value={0}>保密</Radio>
									<Radio value={1}>暖男</Radio>
									<Radio value={2}>靓女</Radio>
								</RadioGroup>
								)}
							</FormItem>
							<FormItem
							label="地址"
							{...formItemLayout}  >
								{getFieldDecorator('address', {
									initialValue: this.state.user.address,
								})(
								<Input
									prefix={<Icon type="environment-o" />}
									ref={node => this.addressInput=node} />
								)}
							</FormItem>
							<FormItem
							label="生日"
							{...formItemLayout}  >
								{getFieldDecorator('brithday')(
								<DatePicker />
								)}
							</FormItem>
							<FormItem
							label="个人简介"
							{...formItemLayout} >
								{getFieldDecorator('detailInfo', {
									initialValue: this.state.user.detail_info,
								})(
								<Input type="textarea" placeholder = "个人信息简介" 
								autosize={{ minRows: 2, maxRows: 6 }} />
								)}
							</FormItem>
							<Row>
								<Col xs={{span:"10"}} sm={{span:"6"}} lg={{span:"3"}}>
									<Button type="default" size="large">修改</Button>
								</Col>
								<Col xs={{span:"10"}} sm={{span:"6"}} lg={{span:"3"}}>
									<Button type="primary" size="large">重置密码</Button>	
								</Col>
							</Row>
						</div>
					</Form>
				</Content>
			</Layout>
		)
	}
}

UserInfoForm = Form.create()(UserInfoForm)
export default UserInfoForm