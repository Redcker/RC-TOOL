<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="config" v-html="config" v-show="!isEdit">
		</view>
		<view v-show="isEdit" class="textarea">
			<u-textarea :adjustPosition="false" style="padding: 10rpx 30rpx;" v-model="config" :autoHeight="true"
				height="100%" :maxlength="-1">
			</u-textarea>
		</view>
		<view class="bottom">
			<u-button v-if="!isEdit" type="primary" class="btn" @click="isEdit=true">编辑配置文件</u-button>
			<u-button v-if="isEdit" type="primary" class="btn" @click="saveConfig" :loading="loading">保存
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				config: '',
				isEdit: false,
				loading: false
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
			},
			saveConfig() {
				this.loading = true
				ql.post.config({
					content: this.config,
					name: 'config.sh'
				}).then(res => {
					this.loading = false
					this.$refs.uToast.show({
						type: 'success',
						message: '修改成功'
					})
					this.isEdit = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.config {
		white-space: pre-wrap;
		padding: 10rpx 30rpx;
		padding-bottom: 100px;
		font-size: 30rpx;
	}

	.textarea {
		padding-bottom: 350px;
	}

	.bottom {
		position: fixed;
		bottom: 40px;
		width: 100%;

		.btn {
			width: 50%
		}
	}
</style>
