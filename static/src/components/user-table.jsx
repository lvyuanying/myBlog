import React from 'react'
import { Layout, Table, Icon, Button, Select, message } from 'antd'
import { getUserList, delUser, setUserIdentified } from './../api/user'

const { Content } = Layout
const { Option } = Select

class UserTable extends React.Component {

	state = {
		data: [],
		pagination: {
			pageSize: 10,
			current: 1
		},
		loading: false,
	}

	columns = [{
		key: 'userName',
		title: '用户名',
		dataIndex: 'userName',
		render: text => <a href="#">{text}</a>,
	}, {
		key: 'email',
		title: '邮箱',
		dataIndex: 'email',
	}, {
		key: 'create_time',
		title: '创建时间',
		dataIndex: 'create_time',
	}, {
		key: 'modified_time',
		title: '修改时间',
		dataIndex: 'modified_time',
	},{
		key: 'action',
		title: '操作',
		render: (text, record) => (
			<span>
				<Select defaultValue={record.identified} onChange={this.handleSelectChange.bind(this,record.id)}>
					<Option value = '0'>游客</Option>
					<Option value = '1'>博主</Option>
					<Option value = '2'>管理员</Option>
					<Option value = '3'>超级管理员</Option>
				</Select>
				<span className="ant-divider" />
				<Button type="danger" size='default' onClick={this.deleteUserButton.bind(this,record.id)}>删除</Button>
			</span>
			),
	}]

	handleSelectChange = (id,value,event)=>{
		setUserIdentified({id:id,identified:value}).then((repsone,err)=>{
			if(repsone.success){
				message.success('修改成功')
				this.fetch({
					results: this.state.pagination.pageSize,
					page : this.state.pagination.current
				})
			}else{
				message.error('修改失败')
			}
		})
	}	

	deleteUserButton = (id,event) =>{
		delUser({id:id}).then((repsone,err)=>{
			if(repsone.success){
				message.success('删除成功')
				this.fetch({
					results: this.state.pagination.pageSize,
					page: this.state.pagination.current
				})
			}else{
				message.error('删除失败')
			}
		})
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination }
		pager.current = pagination.current

		this.setState({
			pagination: pager,
		});
		this.fetch({
			results: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters,
		})
	}

	fetch = (params = {}) => {
		this.setState({ loading: true });

		getUserList({results: 10,...params}).then((repsone)=>{
			const pagination = { ...this.state.pagination }
      		pagination.total = repsone.total
      		this.setState({
      			loading: false,
      			data: repsone.data,
      			pagination,
      		})
		})
	}

	componentDidMount() {
		this.fetch()
	}

	render(){
		return (
			<Layout>
				<Content className="table-content">
					<Table columns={this.columns}
				        rowKey={record=>record.id}
				        dataSource={this.state.data}
				        pagination={this.state.pagination}
				        loading={this.state.loading}
				        onChange={this.handleTableChange}
				     />
				</Content>
			</Layout>
		)
	}
}

export default UserTable