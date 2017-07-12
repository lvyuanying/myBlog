const parseRenderContent = (str) => {
	let arry = str.replace(/&#34;/g,'\"')
	let obj = JSON.parse(arry)
	return obj
}

export { parseRenderContent }