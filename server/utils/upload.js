const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

let oFile = {
  userid : '',
  fileType: '',
  fileUrl : '',
  fileName : '',
  filePath : '',
  staticPath: '',
}

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = { 
      success: false,
      message: '',
      data: null
    }

    
    
    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('文件解析中')

      let SuffixName = mimetype.split('\/')[1]
      let serverFilePath = path.join(__dirname, options.path)

      // 获取类型
      oFile.fileType = options.fileType || SuffixName
      oFile.filePath = path.join( serverFilePath,  oFile.fileType)

      let mkdirResult = mkdirsSync( oFile.filePath )

      oFile.fileName = Math.random().toString(16).substr(2) + '.' + SuffixName

      let _uploadFilePath = path.join( oFile.filePath, oFile.fileName )
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        oFile.fileUrl = `//${ctx.host}/file/${oFile.fileType}/${oFile.fileName}`
        oFile.staticPath = `file/${oFile.fileType}/${oFile.fileName}`
        console.log('文件上传成功！')
      })
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      // console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val))
      if(fieldname == 'userid'){
        oFile.userid = inspect(val)
      }
    })

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve({
          success: true,
          ...oFile
        })
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject({
        success: false,
        ...err
      })
    })

    req.pipe(busboy)
  })

} 

module.exports =  {
  uploadFile
}