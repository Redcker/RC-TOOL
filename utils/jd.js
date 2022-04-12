import { jd } from "./api.js"
async function getUserInfoFromCookie(cookie) {
	let result = null
	await jd.get.info(cookie).then(res=>{
		result = res
	})
	let userInfo = result.userInfo.baseInfo
	userInfo['xbKeepScore'] = result.userInfo.xbKeepScore
	userInfo['xbScore'] = result.userInfo.xbScore
	userInfo['beanNum'] = result.assetInfo.beanNum
	userInfo['redBalance'] = result.assetInfo.redBalance
	return userInfo
}
export {
	getUserInfoFromCookie
}
