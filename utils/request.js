// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.dataType = 'json';
		config.timeout = 6000;
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.header = {
			...config.header,
		}
		config.data = config.data || {}
		const custom = config.custom
		if (!custom.noloading) {
			uni.showLoading({
				title: '请求中...'
			})
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		uni.hideLoading()
		const data = response.data || response
		// 自定义参数
		const custom = response.config?.custom
		if (data.code && data.code !== 200) {
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				return new Promise(() => {})
			}
		}
		return data.data || data
	}, (response) => {
		uni.hideLoading()
		uni.$u.toast(response.data.message || '服务器错误')
		return Promise.reject(response)
	})
}
