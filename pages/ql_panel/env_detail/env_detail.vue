<template>
	<view class="main">
		<u-toast ref="uToast"></u-toast>
		<u-form :model="envDetail" :labelWidth="70" labelPosition="top">
			<u-form-item label="名称" prop="envDetail.name" ref="name">
				<u-input v-model="envDetail.name" :disabled="isDisabled"></u-input>
			</u-form-item>
			<u-form-item label="值" prop="envDetail.value" ref="value">
				<u-textarea v-model="envDetail.value" autoHeight :disabled="isDisabled"></u-textarea>
			</u-form-item>
			<u-form-item label="备注" prop="envDetail.remarks" ref="remarks">
				<u-textarea v-model="envDetail.remarks" autoHeight :disabled="isDisabled"></u-textarea>
			</u-form-item>
<!-- 			<u-form-item v-if="!isAdd" label="更新时间" prop="envDetail.updatedAt" ref="updatedAt">
				<u-input v-model="envDetail.updatedAt" :disabled="true"></u-input>
			</u-form-item> -->
			<u-form-item v-if="!isAdd" label="状态" prop="envDetail.status" ref="status">
				<u-switch v-model="envDetail.status===1?false:true" activeColor="#5ac725" inactiveColor="#f56c6c"
					:disabled="true"></u-switch>
				<span class="status">{{envDetail.status?'已禁用':'已启用'}}</span>
			</u-form-item>
		</u-form>
		<template v-if="!isAdd">
			<u-button type="primary" @click="editEnv">{{editText}}</u-button>
			<u-button type="warning" @click="updateStatus">{{envDetail.status?'启用':'禁用'}}</u-button>
			<u-button type="error" @click="show=true">删除</u-button>
		</template>
		<template v-else>
			<u-button type="primary" @click="addEnv">确认添加</u-button>
		</template>
		<u-modal :show="show" title="温馨提示" :content="`确认删除变量${envDetail.name}吗？`" :showCancelButton="true"
			@cancel="show=false" @confirm="deleteEnv"></u-modal>
	</view>
</template>

<script>
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				envDetail: {},
				isDisabled: true,
				editText: '解锁编辑',
				show: false,
				isAdd: false
			}
		},
		onLoad(option) {
			if (option.isAdd) {
				this.isAdd = true
				this.isDisabled = false
			} else {
				this.envDetail = JSON.parse(option.envDetail)
			}

		},
		methods: {
			editEnv() {
				if (this.isDisabled) {
					this.isDisabled = !this.isDisabled
					this.editText = this.isDisabled ? '解锁编辑' : '确定提交'
				} else {
					let info = {
						id: this.envDetail.id,
						name: this.envDetail.name,
						remarks: this.envDetail.remarks,
						value: this.envDetail.value
					}
					ql.put.item(info, 'envs').then(res => {
						this.$refs.uToast.show({
							type: 'success',
							message: '修改成功'
						})
						this.isDisabled = !this.isDisabled
						this.editText = this.isDisabled ? '解锁编辑' : '确定提交'
					})
				}
			},
			updateStatus() {
				ql.put.status(this.envDetail.id, 'crons', this.envDetail.status ? 'enable' : 'disable').then(res => {
					this.$refs.uToast.show({
						type: 'success',
						message: (this.envDetail.status === 1 ? '启用' : '禁用') + '成功'
					})
					this.envDetail.status = this.envDetail.status === 1 ? 0 : 1
				})
			},
			deleteEnv() {
				this.show = false
				ql.delete.item([this.envDetail.id], 'envs').then(res => {
					this.$refs.uToast.show({
						type: 'success',
						message: '删除成功'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 700)
				})
			},
			addEnv() {
				ql.post.item([this.envDetail], 'envs').then(res => {
					this.$refs.uToast.show({
						type: 'success',
						message: '添加成功'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 700)
				})
			}
		}
	}
</script>

<style>
	.msg {
		margin: 10rpx;
	}

	.status {
		margin-left: 20rpx;
	}

	.value {
		margin: 20rpx 0;
	}

	button {
		margin-bottom: 20rpx;
	}
</style>
