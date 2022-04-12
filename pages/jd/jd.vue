<template>
	<view class="main">
		<u-navbar title="京东助手" class="navbar" leftIcon="">
			<view class="u-nav-slot" slot="left">
				<u-icon class="navbarIcon" name="plus-circle" size="19" @click="sheetShow=true"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">
				<u-icon class="navbarIcon" name="setting" size="20" @click="goToSetting"></u-icon>
			</view>
		</u-navbar>
		<view>
			<view v-if="jdUsers.length">
				<Beans v-for="item in jdUsers" :key="item.cookie" :user="item" />
			</view>
			<template v-else>
				<view class="tip">
					添加cookie后即可查看京东收入统计
				</view>
			</template>
		</view>
		<u-modal :show="updateShow" title="更新提示" :content='newVersionText' @cancel="updateShow=false"
			@confirm="goToLink" :showCancelButton="true" cancelText="暂不更新" confirmText="前往更新"></u-modal>
		<u-action-sheet :actions="list" :show="sheetShow" @select="selectClick" :closeOnClickOverlay="true"
			@close="sheetShow=false"></u-action-sheet>
		<u-modal :show="modalShow" title="请输入cookie" :showCancelButton="true" @confirm="saveCookie"
			@cancel="modalShow=false">
			<u-textarea v-model="cookie" placeholder="pt_key=xxx;pt_pin=xxx;"></u-textarea>
		</u-modal>
		<u-modal :show="loginTipShow" :showCancelButton="true" @confirm="goToWebView" @cancel="loginTipShow=false"
			content="请在新页面中使用手机号登录,系统会自动获取cookie,若提示打开京东,请拒绝" title="温馨提示"></u-modal>
		<u-toast ref="uToast"></u-toast>
		<u-modal :showCancelButton="true" @confirm="saveCookie(jdck)" @cancel="copyCookie" :show="saveCKModalShow"
			title="CK操作提示" content='已成功获取cookie,请选择下一步操作' cancelText="复制" confirmText="保存本地"></u-modal>
	</view>
</template>

<script>
	import Beans from '../../components/Beans/Beans.vue'
	import {
		mapState
	} from 'vuex'
	import {
		getUserInfoFromCookie
	} from '../../utils/jd.js'
	import {
		app
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				modalShow: false,
				loginTipShow: false,
				logo: '/static/logo.png',
				ckBtnText: '手动输入',
				isShowChart: false,
				sheetShow: false,
				list: [{
						name: '登录获取',
						index: 0
					},
					{
						name: '手动填写',
						index: 1
					}
				],
				cookie: '',
				newVersionText: '',
				updateShow: false,
				versionUrl: '',
				saveCKModalShow: false
			}
		},
		computed: {
			...mapState(['jdUsers', 'jdck'])
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
		onLoad() {
			this.checkUpdate()
		},
		onShow() {
			if (this.jdck) {
				this.saveCKModalShow = true
			}
		},
		methods: {
			async saveCookie(ck) {
				let cookie = ck || this.cookie
				let userInfo = await getUserInfoFromCookie(cookie)
				this.$store.commit('setJDUser', {
					cookie: cookie,
					userInfo: userInfo
				})
				uni.setStorageSync('jdUsers', this.$store.state.jdUsers)
				this.modalShow = false
				this.$refs.uToast.show({
					type: 'success',
					message: '保存成功'
				})
				this.cookie = ''
				if (this.jdck) {
					this.$store.commit('setCK', '')
				}
				this.saveCKModalShow = false
			},
			goToWebView() {
				this.loginTipShow = false
				uni.navigateTo({
					url: './login/login'
				})
			},
			selectClick(item) {
				this.sheetShow = false
				if (!item.index) {
					this.loginTipShow = true
				} else {
					this.modalShow = true
				}
			},
			goToSetting() {
				uni.navigateTo({
					url: 'setting/setting'
				})
			},
			checkUpdate() {
				const appVersion = plus.runtime.version
				app.get.checkUpdate().then(res => {
					let current = res[0]
					const currentVersion = current.tag_name.slice(1, current.tag_name.length)
					if (currentVersion > appVersion) {
						this.updateShow = true
						this.newVersionText = `新版本 ${currentVersion} 发布啦~`
						this.versionUrl = current.html_url
					}
				})
			},
			goToLink() {
				plus.runtime.openURL(this.versionUrl)
			},
			copyCookie() {
				uni.setClipboardData({
					data: this.jdck,
					success() {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
				this.$store.commit('setCK', '')
				this.saveCKModalShow = false
			}
		},
	}
</script>

<style lang="scss">
	.main {

		.tip {
			color: $u-tips-color;
			margin-top: 200px;
			text-align: center;
		}

		.navbar {
			.navbarIcon {
				display: inline-block;
			}
		}
	}
</style>
