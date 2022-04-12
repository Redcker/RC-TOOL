<script>
	import {checkQLLogin} from 'utils/ql.js'
	export default {
		onLaunch: function() {
			let jdUsers = uni.getStorageSync('jdUsers')
			if (jdUsers) {
				this.$store.state.jdUsers = jdUsers
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
