/**
*主页子路由
*/

const router = require('koa-router')()
const admin = require('./../controller/admin')

module.exports = router.get('/',admin)
