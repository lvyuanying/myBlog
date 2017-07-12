const { getUserSessionBySid } = require('./../services/user-info')

module.exports = {
	indexPage : async ( ctx, next )=>{
		const getUserSession = async ( obj )=>{ 
			let session = obj.session && obj.session.isLogin ? obj.session : null

			return new Promise(async (resolve, reject) => {
				if(session){
					resolve({
						// id: obj.session.userId,
						avatarPath: obj.session.avatarPath,
						name: obj.session.userName,
						identified: obj.session.userIdentified
					})
				}else{
					reject('session is not exisit')
				}
			})
		}

		try{
			let user = await getUserSession(ctx)
			const roots = [
				{key:'user',name:'用户组',icon:"team",url:'user'},
				{key:'myinfo',name:'个人信息',icon:'user',url:'myinfo'},
				{key:'section',name:'版块管理',icon:"switcher",url:'section'},
				{key:'article',name:'文章管理',icon:"file-text",url:'article'},
				{key:'count',name:'数据统计',icon:"area-chart",url:'count'},
				{key:'leave',name:'站内留言',icon:"mail",url:'leave'},
				{key:'logout',name:'退出',icon:"logout",url:'logout'},
			]

			const render_content = {
				name : '行码',
				title : '工作间',
				roots : roots,
				user
			}

			await ctx.render('work',{
				render_content
			})
		}catch(err){
			ctx.redirect('/error/')
		}
	},
}