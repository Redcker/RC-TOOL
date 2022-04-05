import store from '../store/index.js'

function checkQLLogin() {
	let QLUserInfo = uni.getStorageSync('QLUserInfo')
	if (!QLUserInfo) {
		return
	}
	// 拉取用户信息，测试token是否过期
	uni.request({
		url: `${store.state.QLInfo.serverUrl}/api/user`,
		header: {
			'Authorization': `Bearer ${store.state.QLInfo.token}`
		},
		success: (res) => {
			// 青龙登录失效，自动登录
			if (res.statusCode !== 200) {
				uni.request({
					url: `${store.state.QLInfo.serverUrl}/api/user/login`,
					method: 'POST',
					dataType: 'json',
					data: QLUserInfo,
					success: (res) => {
						store.commit('updateQLToken',res.data.data.token)
					}
				})
			}
		},
		fail: () => {
			uni.$u.toast('青龙链接失败')
		}
	})
}
export {
	checkQLLogin
}
