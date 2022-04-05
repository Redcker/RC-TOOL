<template>
	<view class="config">
		{{config}}
	</view>
</template>

<script>
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				config: ''
			}
		},
		onLoad() {
			this.getConfig()
		},
		methods: {
			getConfig() {
				ql.get.config().then(res => {
					this.config = res
				})
			}
		}
	}
</script>

<style>
	.config {
		white-space: pre-wrap;
		padding: 30rpx;
	}
</style>
