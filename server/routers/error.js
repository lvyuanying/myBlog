/**
 *错误页面子路由
 */
const router = require('koa-router')()
const error = require('./../controller/error')

router.get('/', error.indexPage)

module.exports = router