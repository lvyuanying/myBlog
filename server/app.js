const path = require('path')
const Koa = require('koa') //koa的主控件
const convert = require('koa-convert') //使用Generator模式
const views = require('koa-views') //koa的视图插件
const koaStatic  = require('koa-static') //koa静态资源插件
const bodyParser = require('koa-bodyparser') //koa的请求分析
const koaLogger = require('koa-logger') //koa的控制台日志中间件
// const session  =  require('koa-session-minimal') //koa的session管理工具
const session = require('koa-session2')
//const MysqlStore = require('koa-mysql-session') //koa session存储mysql工具
const MysqlStore = require('./utils/store')
const config = require('./../config')
const routers  = require('./routers')

const app = new Koa()

const sessionMysqlConfig = {
	user: config.database.user,
	password : config.database.password,
	database : config.database.database,
	host : config.database.host
}

//配置session中间件
app.use(session({
	key: 'USER_SID',
	store: new MysqlStore(sessionMysqlConfig),
	httpOnly: false,
})) 

//配置控制台日志中间件
app.use(convert(koaLogger()))

//配置ctx.body解析中间件
app.use(bodyParser())

//配置静态加载中间件
app.use(convert(koaStatic(
	path.join(__dirname, './../static/')
)))

//初始化服务端模板渲染引擎中间件
app.use(views(
	path.join(__dirname,'./views'),{
		extension: 'ejs'
	}
))

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

//启动监听端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)