<template>
	<view class="main">
		<view>
			<Beans v-if="cookie" />
			<template v-else>
				<view class="tip">
					登录后即可查看京东收入统计
				</view>
			</template>
		</view>
		<view class="login-area">
			<u-button class="btn" type="error" @click="modalShow=true">{{ckBtnText}}cookie</u-button>
			<u-button class="btn" type="warning" @click="loginTipShow=true">获取cookie</u-button>
		</view>
		<u-modal :show="modalShow" title="请输入cookie" :showCancelButton="true" @confirm="saveCookie"
			@cancel="modalShow=false">
			<u-textarea v-model="$store.state.cookie" placeholder="pt_key=xxx;pt_pin=xxx;"></u-textarea>
		</u-modal>
		<u-modal :show="loginTipShow" :showCancelButton="true" @confirm="goToWebView" @cancel="loginTipShow=false"
			content="请在新页面中使用手机号登录,系统会自动获取cookie,若提示打开京东,请拒绝" title="温馨提示"></u-modal>
		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	import Beans from '../../components/Beans/Beans.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				modalShow: false,
				loginTipShow: false,
				logo: '/static/logo.png',
				ckBtnText: '手动输入',
				isShowChart: false
			}
		},
		computed: {
			...mapState(['cookie'])
		},
		components: {
			Beans
		},
		watch: {
			ckBtnText(newVal) {
				if (newVal) {
					this.ckBtnText = '查看'
				}
			}
		},
		onShow() {
			if (this.cookie) {
				this.ckBtnText = '查看'
			}
		},
		methods: {
			saveCookie() {
				uni.setStorageSync('cookie', this.cookie)
				this.modalShow = false
				this.$refs.uToast.show({
					type: 'success',
					message: '保存成功'
				})
			},
			goToWebView() {
				this.loginTipShow = false
				uni.navigateTo({
					url: '../login/login'
				})
			},
			goToLoginQL() {
				uni.navigateTo({
					url: '../ql_panel/ql_panel'
				})
			}
		},
	}
</script>

<style lang="scss">
	.main {
		padding-top: 20rpx;

		.login-area {
			position: absolute;
			text-align: center;
			bottom: 40rpx;
			left: 0;
			right: 0;
		}

		.btn {
			width: 80%;
			margin-bottom: 10px;
		}

		.cancel-btn {
			margin-top: 10px;
		}
		
		.tip {
			color: $u-tips-color;
			margin-top: 200px;
			text-align: center;
		}
	}
</style>
