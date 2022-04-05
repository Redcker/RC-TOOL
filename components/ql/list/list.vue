<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view>
			<u-search @change="search" placeholder="请输入搜索内容" v-model="searchContent" :showAction="false"></u-search>
			<view v-for="(item,index) in items" :key="item.id" class="item u-border-bottom" @click="handleClick(index)">
				<view>
					{{item.name}}
					<u-tag class="tag" :text="getStatus(item,0)" :type="getStatus(item,1)" size="mini"></u-tag>
				</view>
			</view>
		</view>
		<u-action-sheet @select="selectClick" @close="show=false" :actions="list" :show="show"
			:closeOnClickOverlay="true"></u-action-sheet>
	</view>
</template>

<script>
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		name: 'crons',
		props: {
			current: {
				type: String,
				default: 'crons'
			}
		},
		watch: {
			current(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.getItems()
				}
			}
		},
		data() {
			return {
				items: [],
				originItems: [],
				show: false,
				cronId: null,
				list: [{
						name: '查看日志',
						index: 0
					},
					{
						name: '编辑',
						index: 1
					}
				],
				index: null,
				searchContent: '',
				loading: true
			}
		},
		mounted() {
			this.getItems()
		},
		methods: {
			getItems() {
				this.items = []
				this.originItems = []
				this.loading = true
				ql.get.list(this.current).then(res => {
					this.items = res
					this.originItems = res
				})
			},
			handleClick(index) {
				if (this.current === 'crons') {
					this.cronId = this.items[index].id
					this.show = true
					this.index = index
				} else {
					uni.navigateTo({
						url: `../../../env_detail/env_detail?envDetail=${JSON.stringify(this.items[index])}`
					})
				}
			},
			selectClick(item) {
				if (!item.index) {
					uni.navigateTo({
						url: `../../../cron_log/cron_log?cronId=${this.cronId}`
					})
				} else {
					uni.navigateTo({
						url: `../../../cron_detail/cron_detail?cronDetail=${JSON.stringify(this.items[this.index])}`
					})
				}
			},
			getStatus(item, index) {
				if (this.current === 'envs') {
					if (index) {
						return item.status ? 'error' : 'success'
					} else {
						return item.status ? '已禁用' : '已启用'
					}
				} else {
					if (index) {
						return item.isDisabled ? 'error' : 'success'
					} else {
						return item.isDisabled ? '已禁用' : '已启用'
					}
				}
			},
			search() {
				if (!this.searchContent) {
					this.items = this.originItems
				} else {
					this.items = this.items.filter(item => item.name.indexOf(this.searchContent) >= 0)
				}
			}
		}
	}
</script>

<style>
	.item {
		padding: 30rpx 0;
	}

	.tag {
		display: inline-block;
		margin-left: 20rpx;
	}

	.loading {
		margin-top: 200rpx;
	}
</style>
