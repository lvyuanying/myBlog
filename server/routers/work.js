/**
*工作台子路由
*/

const router = require('koa-router')()
const work = require('./../controller/work')

const routers = router.get('/',work.indexPage)

module.exports = routers