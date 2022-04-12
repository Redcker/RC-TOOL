<template>
	<view class="main">
		<template>
			<view class="content">
				<u-avatar class="logo" :src="user.userInfo.headImageUrl" size="55"></u-avatar>
				<view class="desc">
					<view class="nickName">{{user.userInfo.nickname}}
						<u-tag shape="circle" style="display: inline-block;margin-left: 10rpx;"
							:text="user.userInfo.levelName" plain size="mini" type="warning"></u-tag>
					</view>
					<view class="score">小白信用分：{{user.userInfo.xbScore}}</view>
				</view>
				<view class="info">
					<view>
						京豆：<text class="bean-num">{{beanInfo.jingbean || '加载中...'}}</text>
					</view>
					<view>
						喜豆：<text class="red-pkg">{{beanInfo.xibean || '加载中...'}}</text>
					</view>
				</view>
			</view>
			<view class="charts-box" v-if="isLogin">
				<qiun-data-charts type="line" :chartData="chartData" background="none" :ontouch="true" />
				<view class="title" v-if="!isContinue">七天京豆收入统计</view>
			</view>
			<view v-else>
				<view class="no-login">cookie已失效</view>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		getUserInfoFromCookie
	} from '../../utils/jd.js'
	import {
		jx
	} from '../../utils/api.js'
	export default {
		name: 'Beans',
		props: {
			user: {
				type: Object
			}
		},
		data() {
			return {
				beanData: [],
				beanObj: {},
				isContinue: true,
				chartData: {
					"categories": [],
					"series": []
				},
				isLogin: true,
				beanInfo: {}
			}
		},
		computed: {

		},
		mounted() {
			this.computeBeans()
			jx.get.beanCount(this.user.cookie).then(res => {
				let data = JSON.parse(res.match(new RegExp(/\((.*);*/))[1])
				this.beanInfo = data.data
			})
		},
		methods: {
			async computeBeans() {
				let page = 1
				while (this.isContinue && this.isLogin) {
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
				this.chartData.series[0] = {
					"name": "京豆收入",
					"data": []
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
							'Cookie': this.user.cookie
						},
						method: 'POST',
						data: {
							page
						},
						dataType: 'json',
						success: (res) => {
							if (res.code && res.data.code !== '0') {
								this.isLogin = false
							}
							this.beanData = res.data['jingDetailList'] || []
							if (!res.data['jingDetailList']) {
								this.isContinue = false
							}
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
		margin: 20rpx 0;

		.charts-box {
			width: 100%;
			height: 100%;
			background: #FFFFFF;
		}

		.title {
			margin-bottom: 20rpx;
			font-size: 26rpx;
			color: $u-tips-color;
		}

		.content {
			width: 100%;
			background-color: white;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			position: relative;

			.logo {
				margin-right: 20rpx;
			}

			.info {
				position: absolute;
				top: 50%;
				transform: translate(0, -50%);
				right: 0;
				font-size: 26rpx;
				text-align: left;
				color: $u-main-color;

				.red-pkg {
					color: $u-error-dark;
					font-weight: bold;
				}

				.bean-num {
					color: $u-primary-dark;
					font-weight: bold;
				}
			}

			.desc {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.nickName {
					text-align: left;
				}

				.score {
					color: $u-tips-color;
					font-size: 26rpx;
					text-align: left;
				}
			}
		}

		.no-login {
			margin-bottom: 20rpx;
		}
	}
</style>
