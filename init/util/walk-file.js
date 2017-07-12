const fs = require('fs')

/*
 *遍历目录下面的文件目录
 *@param {stirng} pathResolve 需要进行遍历的目录
 *@param {string} mime 需要遍历的文件后缀名
 *@return {object} fileList 返回遍历过后的目录结果
*/

const walkFile = function(pathResolve, mime){
	let files = fs.readdirSync(pathResolve)
	let fileList = {}

	for (let [i,item] of files.entries()){
		let itemArr = item.split('\.')

		let itemMime  = itemArr.length >1 ? itemArr[itemArr.length -1]:'undefined'
		if(mime == itemMime){
			fileList[item] = pathResolve + item
		}

	}

	console.log(fileList)
	return fileList
}

// let path = __dirname.split('\/')
// path = path.splice(0,path.length-1)
// path = path.join('/')+'/sql/'
// console.log(path)

// walkFile(path,'sql')

module.exports = walkFile