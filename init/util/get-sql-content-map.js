const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/*
 *读取sql内容
 *@param {string} filename 文件名
 *@param {string} path 文件路径
 *return {string} content 脚本文件内容
*/

function getSqlContent(filename, path){
	let content = fs.readFileSync(path,'binary')
	sqlContentMap[filename] = content
}


/*
 *封装所有脚本内容
 *@return {object} sqlContentMap 
*/
function getSqlContentMap(){
	let sqlMap = getSqlMap()
	console.log(sqlMap)
	for(let key in sqlMap){
		getSqlContent(key ,sqlMap[key])
	}

	return sqlContentMap
}

module.exports = getSqlContentMap