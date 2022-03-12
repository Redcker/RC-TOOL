<template>
	<view class="main">
		<view class="copy-right-area">
			<image :showLoading="true" :src="logo" :radius="18"></image>
			<h3>
				RCJD
			</h3>
			<p>
				本工具完全免费，且不会上传任何用户数据
			</p>
			<p>
				开源地址：<uni-link href="https://github.com/Redcker/RCJD" text="https://github.com/Redcker/RCJD"></uni-link>
			</p>
		</view>
		<u-divider></u-divider>
		<view class="login-area" v-show="!isShowChart">
			<u-button class="btn" type="error" @click="modalShow=true">{{ckBtnText}}cookie</u-button>
			<u-button class="btn" type="warning" @click="loginTipShow=true">获取cookie</u-button>
			<u-button class="btn" type="primary" @click="isShowChart=true" :disabled="!cookie">查看京豆数据</u-button>
		</view>
		<view v-if="isShowChart">
			<Beans />
			<u-button class="btn cancel-btn" type="primary" @click="isShowChart=false">返回</u-button>
		</view>
		<u-modal :show="modalShow" title="请输入cookie" :showCancelButton="true" @confirm="saveCookie"
			@cancel="modalShow=false">
			<u-textarea v-model="$store.state.cookie" placeholder="pt_key=xxx;pt_pin=xxx;"></u-textarea>
		</u-modal>
		<u-modal :show="loginTipShow" :showCancelButton="true" @confirm="goToWebView" @cancel="loginTipShow=false"
			content="请在新页面中使用手机号登录,系统会自动获取cookie并返回,若提示打开京东,请拒绝" title="温馨提示"></u-modal>
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
		watch:{
			ckBtnText(newVal){
				if (newVal){
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
			}
		},
	}
</script>

<style lang="scss">
	.main {
		.copy-right-area {
			margin: 80px auto 40px;
			text-align: center !important;

			image {
				display: block;
				margin: 0 auto;
				width: 70px;
				height: 70px;
				margin-bottom: 20px;
				border-radius: 18px;
			}

			p {
				margin-top: 10px;
			}

		}

		.login-area {
			margin: 40px auto;
			width: 100%;
			text-align: center;
		}

		.btn {
			width: 80%;
			margin-bottom: 10px;
		}

		.cancel-btn {
			margin-top: 10px;
		}
	}
</style>
