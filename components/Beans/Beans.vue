<template>
	<view class="main">
		<template v-if="isContinue">
			<u-loading-icon :show="true" text="疯狂拉取数据中..."></u-loading-icon>
		</template>
		<template v-else>
			<h4>七天京豆收入统计</h4>
			<view class="charts-box">
				<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true" />
			</view>
		</template>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'Beans',
		data() {
			return {
				beanData: [],
				beanObj: {},
				isContinue: true,
				chartData: {
					"categories": [],
					"series": [{
						"name": "京豆收入",
						"data": []
					}]
				},
			}
		},
		computed: {
			...mapState(['cookie'])
		},
		mounted() {
			this.computeBeans()
		},
		methods: {
			async computeBeans() {
				let page = 1
				while (this.isContinue) {
					await this.fetchBeansData(page)
					for (let i in this.beanData) {
						let bean = this.beanData[i]
						let date = bean['date']
						let beanCount = parseInt(bean['amount'])
						if (beanCount < 0) {
							continue
						}
						let YMD = date.split(" ")[0]
						let MD = YMD.slice(5, YMD.length)
						if (Object.keys(this.beanObj).length === 8 && !this.beanObj[MD]) {
							this.isContinue = false
							break
						}
						if (this.beanObj[MD]) { // 若日期存在
							this.beanObj[MD] += beanCount
						} else {
							this.beanObj[MD] = beanCount
						}
					}
					page += 1
				}
				this.chartData.categories = Object.keys(this.beanObj)
				this.chartData.series[0].data = Object.values(this.beanObj).map(String)
			},
			fetchBeansData(page) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'https://bean.m.jd.com/beanDetail/detail.json',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Cookie': this.cookie
						},
						method: 'POST',
						data: {
							page
						},
						dataType: 'json',
						success: (res) => {
							// console.log(res)
							this.beanData = res.data['jingDetailList']
							resolve()
						},
						fail: (err) => {
							rejectr(err)
						}
					})
				})

			}
		}
	}
</script>

<style lang="scss">
	.main {
		text-align: center;

		.charts-box {
			width: 100%;
			background: #FFFFFF;
			margin-bottom: 20rpx;
		}

		h4 {
			margin-bottom: 10px;
		}
	}
</style>
