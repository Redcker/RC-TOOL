<template>
	<view class="main">
		<view class="copy-right-area">
			<image :showLoading="true" :src="logo" :radius="18"></image>
			<h3>
				RC-TOOL
			</h3>
			<p>
				本工具完全免费，且不会上传任何用户数据
			</p>
			<p>
				开源地址：<uni-link href="https://github.com/Redcker/RC-TOOL" text="https://github.com/Redcker/RC-TOOL">
				</uni-link>
			</p>
		</view>
		<u-divider></u-divider>
		<u-cell-group>
			<u-cell icon="chat-fill" title="反馈交流" value="点击跳转TG群组" @click="goToLink('https://t.me/+DOIPC-ME89BlZWE9')">
			</u-cell>
			<u-cell icon="integral-fill" title="检查更新" :value="newVersion" clickable @click="goToLink(versionUrl)">
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		app
	} from '../../utils/api.js'
	// import {
	// 	mapState
	// } from 'vuex'
	export default {
		data() {
			return {
				logo: '/static/logo.png',
				newVersion: '检查更新中...',
				versionUrl: ''
			}
		},
		computed: {

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
			this.checkUpdate()
		},
		methods: {
			checkUpdate() {
				const appVersion = plus.runtime.version
				app.get.checkUpdate().then(res => {
					let current = res[0]
					const currentVersion = current.tag_name.slice(1, current.tag_name.length)
					if (currentVersion > appVersion) {
						this.versionUrl = current.html_url
						this.newVersion = `新版本 ${currentVersion} 发布啦~`
					} else {
						this.newVersion = '已是最新版本'
					}
				})
			},
			goToLink(url) {
				if (!url) {
					return
				}
				plus.runtime.openURL(url)
			}
		},
	}
</script>

<style lang="scss">
	.main {
		.copy-right-area {
			margin: 20px auto 40px;
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
