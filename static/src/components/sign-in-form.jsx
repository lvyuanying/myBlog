import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import Request from './../utils/request'
import { signInApi, signInForm } from './../api/sign-in'
import { parseRenderContent } from './../utils/parse'

const FormItem = Form.Item
let renderContent

class SignInForm extends React.Component {
	componentWillMount(){
		renderContent = parseRenderContent(render_content)
	}
	render() {
	    const { getFieldDecorator } = this.props.form
	    const that = this
	    async function handleSubmit(e) {
	    	e.preventDefault()
	    	let values = await getFormValues()

	    	if ( values ) {
	    		let result = await signInApi( values )
	    		if ( result && result.success === true ) {
	    			message.success( '登录成功！' )
	    			signInForm( values )
	    		} else if ( result && result.message ){
	    			message.error( result.message )
	    		}
	    	} else {
	    		message.error( '系统繁忙，稍后再试！' )
	    	}
	    }

	    function  getFormValues() {
	    	return new Promise((resolve, reject) => {
	    		that.props.form.validateFields((err, values) => {
	    			if (!err) {
	    				resolve( values )
	    			} else {
	    				reject( false )
	    			}
	    		})
	    	})
	    }

	    function LoginButton(){
	    	if(that.props.type == 'admin'){
	    		return (
	    			<FormItem>
			            <Button type="primary" htmlType="submit" className="login-form-button full" size="large">
			              确定
			            </Button>
	          		</FormItem>
	          	)
	    	}else{
	    		return (
	    			<FormItem>
			            {getFieldDecorator('remember', {
			              valuePropName: 'checked',
			              initialValue: true,
			            })(
			              <Checkbox>记住登录</Checkbox>
			            )}
			            <a className="login-form-forgot">忘记密码</a><br/>
			            <Button type="primary" htmlType="submit" className="login-form-button">
			              确定
			            </Button>
	          		</FormItem>
	          	)
	    	}
	    }

	    function Title(props){
	    	return (
	    		<div className="title">
	    			{props.name}
	    		</div>
	    	)
	    }


	    return (
	      <div style={{ width: "65%", margin: "0 auto" }}>
	        <Form onSubmit={handleSubmit} className="login-form">
	        	<FormItem>
	        		<Title name={renderContent.title}/>
	        	</FormItem>
	         	<FormItem>
		            {getFieldDecorator('userName', {
		              rules: [{ required: true, message: '请您输入账号名称！' }],
		            })(
		              <Input addonBefore={<Icon type="user" />} placeholder="请您输入用户名称！" />
		            )}
	          	</FormItem>
	          	<FormItem>
		            {getFieldDecorator('password', {
		              rules: [{ required: true, message: '请您输入账号密码！' }],
		            })(
		              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请您输入账号密码" />
		            )}
	          	</FormItem>
	          	<LoginButton />
	        </Form>
	      </div>
	    )
	}
}

SignInForm = Form.create()(SignInForm)
export default SignInForm