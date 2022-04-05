<template>
	<view class="main log">
		{{log}}
	</view>
</template>

<script>
	import {ql} from '../../../utils/api.js'
	export default {
		data() {
			return {
				log: ''
			}
		},
		onLoad(option) {
			this.getLog(option.cronId)
		},
		methods: {
			getLog(cronId) {
				ql.get.cronLog(cronId).then(res=>{
					this.log = res
				})
			},
		}
	}
</script>

<style lang="scss">
	.log {
		white-space: pre-wrap;
		padding: 50rpx 30rpx;
	}
</style>
