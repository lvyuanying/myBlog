module.exports = {
	async indexPage (ctx){
		await ctx.render('error',{
			error_message: 'Not exisit session'
		})
	}
}