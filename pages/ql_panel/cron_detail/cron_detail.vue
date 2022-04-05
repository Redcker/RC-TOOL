<template>
	<view class="main">
		<u-toast ref="uToast"></u-toast>
		<u-form :model="cronDetail" :labelWidth="70" labelPosition="top">
			<u-form-item label="任务名" prop="cronDetail.name" ref="name">
				<u-input v-model="cronDetail.name" :disabled="isDisabled"></u-input>
			</u-form-item>
			<u-form-item label="任务" prop="cronDetail.command" ref="command">
				<u-textarea v-model="cronDetail.command" autoHeight :disabled="isDisabled"></u-textarea>
			</u-form-item>
			<u-form-item label="任务定时" prop="cronDetail.schedule" ref="schedule">
				<u-textarea v-model="cronDetail.schedule" autoHeight :disabled="isDisabled"></u-textarea>
			</u-form-item>
			<u-form-item v-if="!isAdd" label="状态" prop="cronDetail.status" ref="status">
				<template v-if="!cronDetail.isDisabled">
					<u-loading-icon v-if="!cronDetail.status" mode="circle" text="运行中"></u-loading-icon>
					<u-icon v-else name="clock" label="空闲中"></u-icon>
				</template>
				<template v-else>
					<u-icon name="close-circle" label="已禁用"></u-icon>
				</template>
			</u-form-item>
		</u-form>
		<template v-if="!isAdd">
			<u-button type="primary" @click="editcron">{{editText}}</u-button>
			<u-button type="warning" @click="updateStatus">{{cronDetail.isDisabled?'启用':'禁用'}}</u-button>
			<u-button type="error" @click="show=true">删除</u-button>
		</template>
		<template v-else>
			<u-button type="primary" @click="addcron">确认添加</u-button>
		</template>
		<u-modal :show="show" title="温馨提示" :content="`确认删除任务 ${cronDetail.name} 吗？`" :showCancelButton="true"
			@cancel="show=false" @confirm="deletecron"></u-modal>
	</view>
</template>

<script>
	import {
		ql
	} from '../../../utils/api.js'
	export default {
		data() {
			return {
				cronDetail: {},
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
				this.cronDetail = JSON.parse(option.cronDetail)
			}
		},
		methods: {
			editcron() {
				if (this.isDisabled) {
					this.isDisabled = !this.isDisabled
					this.editText = this.isDisabled ? '解锁编辑' : '确定提交'
				} else {
					let info = {
						id: this.cronDetail.id,
						name: this.cronDetail.name,
						schedule: this.cronDetail.schedule,
						command: this.cronDetail.command
					}
					ql.put.item(info, 'crons').then(res => {
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
				ql.put.status(this.cronDetail.id, 'crons', this.cronDetail.isDisabled ? 'enable' : 'disable').then(res => {
					this.$refs.uToast.show({
						type: 'success',
						message: (this.cronDetail.isDisabled === 1 ? '禁用' : '启用') + '成功'
					})
					this.cronDetail.isDisabled = this.cronDetail.isDisabled === 1 ? 0 : 1
				})
			},
			deletecron() {
				this.show = false
				ql.delete.item([this.cronDetail.id], 'crons').then(res => {
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
			addcron() {
				ql.post.item(this.cronDetail, 'crons').then(res => {
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
