<template>
	<view class="main">
		<u-toast ref="uToast"></u-toast>
		<u-alert title="仅在青龙面板V2.11.0测试通过,其他版本请自行测试" type="warning"></u-alert>
		<u-form labelPosition="top" :model="userInfo" ref="form" :labelWidth="200">
			<u-form-item label="服务地址" prop="serverUrl" ref="serverUrl">
				<u-input @blur="setUrl" v-model="serverUrl" placeholder="http://xxx.xxx.xxx.xxx:5700,结尾不带/"></u-input>
			</u-form-item>
			<u-form-item label="用户名" prop="userInfo.username" ref="username">
				<u-input v-model="userInfo.username"></u-input>
			</u-form-item>
			<u-form-item label="密码" prop="userInfo.password" ref="password">
				<u-input v-model="userInfo.password" :password="true"></u-input>
			</u-form-item>
			<u-form-item v-if="needCode" label="验证码(二步验证)" prop="userInfo.code" ref="code">
				<u-input v-model="userInfo.code"></u-input>
			</u-form-item>
			<u-form-item prop="isRemember" ref="isRemember">
				<u-switch activeColor="#5ac725" v-model="isRemember"></u-switch>
				<span class="remember-tip">
					记住登录信息，并在登录过期后自动登录
				</span>
			</u-form-item>
		</u-form>
		<u-button @click="login" type="primary" loadingText="登录中">登录</u-button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				userInfo: {
					username: '',
					password: ''
				},
				serverUrl: '',
				isRemember: true,
				needCode: false
			}
		},
		computed: {
			...mapState(['QLInfo'])
		},
		onLoad() {
			if (Object.keys(this.QLInfo).length) {
				this.serverUrl = this.QLInfo.serverUrl
			}
			let userInfo = uni.getStorageSync('QLUserInfo')
			if (Object.keys(userInfo).length) {
				this.userInfo = JSON.parse(userInfo)
			}
		},
		methods: {
			setUrl() {
				this.$store.commit('setQLServerUrl', this.serverUrl)
			},
			login() {
				if (!this.needCode) {
					ql.post.login(this.userInfo).then(res => {
						this.$store.commit('setQLInfo', {
							token: res.token,
							serverUrl: this.serverUrl
						})
						if (this.isRemember) {
							uni.setStorageSync('QLUserInfo', JSON.stringify(this.userInfo))
						}
						this.$refs.uToast.show({
							type: 'success',
							message: '登录成功'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '../ql_panel'
							})
						}, 700)
					}).catch(err => {
						if (err.code === 420) {
							this.needCode = true
						}
					})
				} else {
					ql.put.two_step_login(this.userInfo).then(res => {
						this.$store.commit('setQLInfo', {
							token: res.token,
							serverUrl: this.serverUrl
						})
						if (this.isRemember) {
							uni.setStorageSync('QLUserInfo', JSON.stringify(this.userInfo))
						}
						this.$refs.uToast.show({
							type: 'success',
							message: '登录成功'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '../ql_panel'
							})
						}, 700)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 40rpx;

		.remember-tip {
			margin-left: 20rpx;
		}

		button {
			margin-top: 40rpx;
		}
	}
</style>
