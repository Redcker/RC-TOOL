<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				wv: null
			}
		},
		methods: {
			getCookie() {
				let timer = setInterval(() => {
					let cookies = plus.navigator.getCookie('https://m.jd.com')
					let pt_key = ''
					let pt_pin = ''
					let ptKeyIndex = cookies.search(/pt_key=.*?;/)
					let ptPinIndex = cookies.search(/pt_pin=.*?;/)
					if (ptKeyIndex > -1) {
						for (let i = ptKeyIndex; i < cookies.length; i++) {
							pt_key += cookies[i]
							if (cookies[i] === ';') {
								break
							}
						}
						for (let i = ptPinIndex; i < cookies.length; i++) {
							pt_pin += cookies[i]
							if (cookies[i] === ';') {
								break
							}
						}
						this.$store.commit('setCookie', pt_key + pt_pin)
						uni.setStorageSync('cookie', pt_key + pt_pin)
						this.wv.evalJS('alert("cookie获取成功，请返回");')
						clearInterval(timer)
					}
				}, 1000)
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.navigator.removeAllCookie()
			this.wv = plus.webview.create('', 'custom-webview', {
				plusrequire: 'none',
				'uni-app': 'none',
				top: uni.getSystemInfoSync().statusBarHeight,
			})
			this.wv.loadURL('https://plogin.m.jd.com/login/login?appid=300')
			let currentWebview = this.$mp.page.$getAppWebview()
			currentWebview.append(this.wv)
			this.wv.overrideUrlLoading({
				mode: 'reject',
				match: 'openapp.jdmobile://.*'
			}, function() {

			})
			setTimeout(() => {
				this.getCookie()
			}, 500)
			// #endif
		}
	}
</script>

<style>

</style>
