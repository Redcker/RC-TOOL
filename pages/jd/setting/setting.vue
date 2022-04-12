<template>
	<view>
		<u-collapse>
			<u-collapse-item v-for="(item,index) in jdUsers" :key="index" :title="item.userInfo.nickname">
				<u-textarea v-model="item.cookie"></u-textarea>
				<u-button class="btn" type="primary" @click="copyCookie(item.cookie)">一键复制</u-button>
				<u-button class="btn" type="error" @click="deleteCookie(index)">删除cookie</u-button>
			</u-collapse-item>
		</u-collapse>
		<u-modal @cancel="back" @confirm="saveCK" :showCancelButton="true" :show="show" title="温馨提示"
			content="你刚才修改了cookie,是否同步至本地存储？若点击取消,则修改仅APP本次运行期间生效"></u-modal>
	</view>
</template>

<script>
	import {
		jd
	} from '../../../utils/api.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				originJDUsers: [],
				show: false
			}
		},
		computed: {
			...mapState(['jdUsers'])
		},
		onLoad() {
			this.originJDUsers = uni.$u.deepClone(this.jdUsers)
		},
		onBackPress() {
			if (this.show) {
				this.show = false
				return false
			}
			if (JSON.stringify(this.originJDUsers) != JSON.stringify(this.jdUsers)) {
				this.show = true
				return true
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			saveCK() {
				uni.setStorageSync('jdUsers', this.jdUsers)
				this.back()
			},
			copyCookie(ck){
				uni.setClipboardData({
					data:ck,
					success: () => {
						uni.showToast({
							title:'复制成功'
						})
					}
				})
			},
			deleteCookie(index){
				this.jsUsers = this.jdUsers.splice(index,1)
			}
			
		}
	}
</script>

<style>
.btn{
	margin-top: 20rpx;
}
</style>
