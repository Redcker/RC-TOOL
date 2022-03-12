<script>
	export default {
		onLaunch: function() {
			let cookie = uni.getStorageSync('cookie')
			if (cookie) {
				this.$store.commit('setCookie', cookie)
			}
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
</style>
