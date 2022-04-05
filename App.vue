<script>
	import {checkQLLogin} from 'utils/ql.js'
	export default {
		onLaunch: function() {
			let cookie = uni.getStorageSync('cookie')
			if (cookie) {
				this.$store.commit('setCookie', cookie)
			}
			let QLInfo = uni.getStorageSync('QLInfo')
			if (QLInfo) {
				this.$store.commit('setQLInfo', JSON.parse(QLInfo))
			}
			checkQLLogin()
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	.main {
		padding: 0 30rpx;
	}

	.navbar {
		margin-bottom: 88px;
	}
</style>
