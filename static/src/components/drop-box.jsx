import React from 'react'
import { Layout, Button, message } from 'antd'
import ReactCrop from 'react-image-crop'

import { findDOMNode } from 'react-dom';

import './../stylesheets/ReactCrop.css'
import './../stylesheets/drop-box.less'

import { dataURLtoBlob } from './../utils/handleDataURL'
import { uploadUserAvatar } from './../api/user'
import { parseRenderContent } from './../utils/parse'

const { Content } = Layout
const imageType = /^image\//
let uploadInput


class DropBox extends React.Component {

	state = {
		imageUrl : '',
		avatar_style: 'avatar_hidden',
		reviewUrl :'',
		avatarPath: '',
		nWidth: '',
		nHeight: '',
		crop: {
			x: 0,
			y: 0,
			width: 300,
			height: 300,
			aspect: 1,
			avatarWith: 300
		}
	}

	avatarShowButtonHandle = (e)=>{
		// let result = this.state.avatar_style == 'avatar_hidden'?'avatar_show':'avatar_hidden'		
		this.setState({
			avatar_style: 'avatar_show'
		})
	}

	avatarHiddenButtonHandle = (e)=>{
		this.setState({
			avatar_style: 'avatar_hidden'
		})
	}
	loadEditView = (dataUrl)=>{
		let oCanvas = document.createElement('canvas')
		let oImg= new Image()
		let oCtx = oCanvas.getContext("2d")
		oImg.src = dataUrl

		oImg.onload = (e)=>{
			let img = document.querySelector('.ReactCrop')
			let nWidth = img.offsetWidth
			let nHeight = 300*( img.offsetWidth / 480 )
			oCanvas.width = nWidth
			oCanvas.height = nHeight

			oCtx.drawImage(oImg,0, 0, 480, 300, 0, 0,nWidth, nHeight)
			let imageUrl = oCanvas.toDataURL('image/jpeg')
			this.setState({
				imageUrl
			})
			oCtx.clearRect(0, 0, nWidth, nHeight)
		}
	}

	onImageLoaded = (crop)=>{
		this.cropHandle(crop)
	}

	cropHandle = (crop)=>{
		let aImag = document.getElementsByClassName('ReactCrop__image-copy')[0]
		let oCanvas = document.createElement('canvas')
      	let oCtx = oCanvas.getContext('2d')
      	let nWidth = aImag.offsetWidth
		let nHeight = aImag.offsetHeight

    	oCanvas.width = crop.avatarWith
    	oCanvas.height = crop.avatarWith

    	oCtx.drawImage(aImag, crop.x*nWidth/100, crop.y*nHeight/100, crop.width*nWidth/100, crop.height*nHeight/100, 0, 0, crop.avatarWith, crop.avatarWith)
    	let dataUrl = oCanvas.toDataURL('image/jpeg')
    	this.setState({
    		reviewUrl : dataUrl,
    		crop
    	})
    	oCtx.clearRect(0, 0, nWidth, nHeight)
	}

	selectPictureHandle(e){
		uploadInput.click()
	}

	onloadPic = async (e)=>{
		let blob = dataURLtoBlob(this.state.reviewUrl)
		let result = await uploadUserAvatar({
			avatar: blob
		})

		if(result.success){
			message.success('上传头像成功')
			this.setState({
				avatarPath: result.data.path
			})
			this.avatarHiddenButtonHandle()
		}else{
			message.error('上传头像失败')
		}
	}

	setUserInfo = async (options)=>{
		let user = this.state.user
		for(let key in options){
			if(typeof user[key] != 'undefind'){
				user[key] = options[key]
			}else{
				break
			}
		}
		this.setState({
			user
		})
	}

	componentDidMount(){
		uploadInput = document.querySelector('#file-picker')
		uploadInput.addEventListener('change', (e) => {
			const file = e.target.files.item(0)

			if (!file || !imageType.test(file.type)) {
				message.error('非常规图片格式')
				return
			}

			const reader = new FileReader()

			reader.onload = (e) => {
				this.avatarShowButtonHandle()
				this.loadEditView(e.target.result)
			}

			reader.readAsDataURL(file)
		})

		let imgButton = document.querySelector('.avatar')
		imgButton.addEventListener('click',(e)=>{
			this.selectPictureHandle()
		})

	}

	componentWillReceiveProps =  (nextProps)=>{
		this.setState({
			avatarPath: nextProps.src
		})
    }

	render() {
		return (
			<Layout id='dropBox'>
				<Content>
					<div className="avatar">
						<img src={this.state.avatarPath}/>
						<div className="tips">
							<h1>{this.props.tips || '点击上传图片'}</h1>
						</div>
					</div>
					<input type="file" id="file-picker" style={{display:'none'}}/>
					<div className={this.state.avatar_style}>
						<div className="cropBox">
							<ReactCrop src={this.state.imageUrl} crop={this.state.crop} 
							onComplete={crop => this.cropHandle(crop)}
							onImageLoaded={crop => this.onImageLoaded(crop)}/>
							<div className="right">
								<img className="review" src={this.state.reviewUrl} />
								<Button className="selectPicture" onClick={this.selectPictureHandle}>选择图片</Button>
								<Button onClick={this.onloadPic}>确定</Button>
								<Button className="close" type="primary" 
								shape="circle" icon="close"
								onClick={this.avatarHiddenButtonHandle}/>
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default DropBox