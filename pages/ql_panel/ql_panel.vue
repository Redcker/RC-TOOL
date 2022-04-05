<template>
	<view class="main">
		<u-navbar :title="title" class="navbar" leftIcon="">
			<view class="u-nav-slot" slot="left">
				<u-icon class="navbarIcon" name="plus-circle" size="19" @click="add"></u-icon>
				<u-icon class="navbarIcon" name="reload" size="20" @click="refresh"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">
				<u-icon class="navbarIcon" name="list" size="20" @click="show=true"></u-icon>
			</view>
		</u-navbar>
		<List v-if="QLInfo.token" ref="list" class="list" :current="current" />
		<view v-else class="login-tip">
			右上角登录后即可管理青龙面板
		</view>
		<u-action-sheet :closeOnClickOverlay="true" :actions="list" @close="show=false" :show="show"
			@select="selectClick"></u-action-sheet>
	</view>
</template>

<script>
	import List from '../../components/ql/list/list.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: '定时任务',
				current: 'crons',
				list: [{
						name: '定时任务',
						current: 'crons'
					},
					{
						name: '环境变量',
						current: 'envs'
					},
					{
						name: '配置文件',
						current: 'config'
					},
					{
						name: '登录青龙',
						current: 'relogin'
					}
				],
				show: false
			}
		},
		components: {
			List
		},
		onShow() {
			// this.refresh()
		},
		onLoad() {
			if (!this.QLInfo.token) {
				uni.navigateTo({
					url: '../ql_login/ql_login'
				})
			}
		},
		computed: {
			...mapState(['QLInfo'])
		},
		methods: {
			selectClick(item) {
				const arr = ['crons', 'envs']
				if (arr.indexOf(item.current) > -1) {
					this.current = item.current
					this.title = item.name
				} else {
					if (item.current === 'config') {
						uni.navigateTo({
							url: './config/config'
						})
					} else {
						uni.navigateTo({
							url: './login/login'
						})
					}

				}
				this.show = false
			},
			refresh() {
				try {
					this.$refs.list.getItems()
				} catch {}
			},
			add() {
				if (this.current === 'crons') {
					uni.navigateTo({
						url: `cron_detail/cron_detail?isAdd=${!0}`,
					})
				} else {
					uni.navigateTo({
						url: `env_detail/env_detail?isAdd=${!0}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.list {
		margin-top: 30rpx;
	}

	.navbarIcon {
		margin: 0 20rpx;
		display: inline-block !important;
	}

	.login-tip {
		margin-top: 288px;
		text-align: center;
		color: $u-tips-color
	}
</style>
