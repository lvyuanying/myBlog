module.exports = async(ctx)=>{
	const render_content = {
		name : '笔走字',
		title : '登录'
	}
	await ctx.render('index',{
		render_content
	})
}