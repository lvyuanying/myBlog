const fs = require('fs')
const walkFile = require('./walk-file')

/*
 *获取sql目录下的文件目录数据
*/

const getSqlMap = ()=>{
	let basePath = __dirname //获得根目录信息
	bassPath = basePath.replace(/\\/g,'\/') //正则匹配，替换符号

	let pathArr = basePath.split('\/') //把目录分割成数组
	pathArr = pathArr.splice(0,pathArr.length-1) //最后的目录名称
	basePath = pathArr.join('/')+'/sql/' //加入sql目录

	let fileList = walkFile(basePath, 'sql') //遍历sql目录
	return fileList
}

module.exports = getSqlMap
