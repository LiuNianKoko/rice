<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" borderBottom="#e5e5e5" :isBack="true"><block slot="backText"></block><block slot="content">优惠券</block></cu-custom>
		<view class="tab-wrap">
			<view class="tab-item" :class="tab==1?'act':''" @click="changeTab(1)">
				领券中心
			</view>
			<view class="tab-item" :class="tab==2?'act':''" @click="changeTab(2)">
				未使用
			</view>
			<view class="tab-item" :class="tab==3?'act':''" @click="changeTab(3)">
				已使用/失效
			</view>
		</view>
		<view class="blank"></view>
		<view class="coupon-wrap" v-if="tab == 1">
			<view class="" v-if="list.length > 0">
				<view class="coupon-item" v-for="(item,index) in list" :key="index" @click="receiveCoupon(item)">
					<image :src="imgUrl + 'lg-coupon-1.png'" class="lg-coupon-bg"></image>
					<view class="coupon-main disBetween">
						<view class="price-wrap disCenter">
							<view class="price">
								{{item.price_desc}}
								<view class="symbol">
									{{item.price_type == 1 ?'￥':'折'}}
								</view>
							</view>
							
						</view>
						<view class="coupon-line">
							
						</view>
						<view class="coupon-txt">
							<view class="line1">
								{{item.tips}}
							</view>
							<view class="">
								{{item.use_desc}}
							</view>
							<view class="font18 coupon-txt-and">
								未付款与退款订单不做返还
							</view>
						</view>
					</view>
					<view class="btn">
						点击领取
					</view>
				</view>
			</view>
			<view class="nodata" v-else>
				您的优惠券空空如也
			</view>
		</view>
		<view class="coupon-wrap" v-if="tab == 2">
			<view class="" v-if="list.length > 0">
				<view class="coupon-item" v-for="(item,index) in list" :key="index" @click="toIndex">
					<image :src="imgUrl + 'lg-coupon-1.png'" class="lg-coupon-bg"></image>
					<view class="coupon-main disBetween">
						<view class="price-wrap disCenter">
							<view class="price">
								{{item.price_desc}}
								<view class="symbol">
									{{item.price_type == 1 ?'￥':'折'}}
								</view>
							</view>
							
						</view>
						<view class="coupon-line">
							
						</view>
						<view class="coupon-txt">
							<view class="line1">
								{{item.tips}}
							</view>
							<view class="">
								{{item.use_desc}}
							</view>
							<view class="font18 coupon-txt-and">
								未付款与退款订单不做返还
							</view>
						</view>
					</view>
					<view class="btn">
						立刻使用
					</view>
				</view>
			</view>
			<view class="nodata" v-else>
				您的优惠券空空如也
			</view>
		</view>
		<view class="coupon-wrap" v-if="tab == 3">
			<view class="" v-if="list.length > 0" >
				<view class="coupon-item" v-for="(item,index) in list" :key="index">
					<image :src="imgUrl + 'lg-coupon-2.png'" class="lg-coupon-bg"></image>
					<view class="coupon-main disBetween">
						<view class="price-wrap color-gr disCenter">
							<view class="price">
								{{item.price_desc}}
								<view class="symbol">
									{{item.price_type == 1 ?'￥':'折'}}
								</view>
							</view>
							
						</view>
						<view class="coupon-line">
							
						</view>
						<view class="coupon-txt color-gr">
							<view class="line1">
								{{item.tips}}
							</view>
							<view class="">
								{{item.use_desc}}
							</view>
							<view class="font18 coupon-txt-other">
								未付款与退款订单不做返还
							</view>
						</view>
					</view>
					<view class="btn">
						{{item.status ==0?'已失效':'已使用'}}
					</view>
				</view>
			</view>
			<view class="nodata" v-else>
				您的优惠券空空如也
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tab:1,
				page:1,
				list:[],
				
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.page = 1
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			changeTab(type){
				this.page = 1
				this.list = []
				this.tab = type
				this.getList()
			},
			receiveCoupon(item){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					coupon_id:item.id
				}
				http('/api/index/receive_coupon', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200){
						uni.showToast({
							icon:'none',
							title:res.mess
						})
						this.getList()
					}
				})
			},
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			getList(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:this.tab,
					page:1
				}
				http('/api/users/user_coupon','post',data).then(res=>{
					if(res.code == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:this.tab,
					page:this.page+1
				}
				http('/api/users/user_coupon','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data
						
						this.list = this.list.concat(newList)
						this.page++
					}
					
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.blank{
		height: 90upx;
	}
	.tab-wrap{
		display: flex;
		justify-content: space-between;
		height: 90upx;
		padding: 0 50upx;
		width: 100%;
		position: fixed;
		left: 0;
		z-index: 100;
		background-color: #fff;
		
		.tab-item{
			// width: 50%;
			height: 90upx;
			line-height: 110upx;
			// text-align: center;
			font-size: 30upx;
			font-weight: bold;
			color: #272727;
		}
		.act{
			color: #EC7A8E;
			position: relative;
			background-color: #fff;
			border: none;
		}
		.act::after{
			content: '';
			width: 76upx;
			height: 6upx;
			border-radius: 6upx;
			background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.coupon-wrap{
		padding: 46upx 23upx;
		.coupon-item{
			height: 184upx;
			position: relative;
			margin-bottom: 16upx;
			.lg-coupon-bg{
				width: 100%;
				height: 184upx;
				position: absolute;
				top: 0;
				left: 0;
			}
			.coupon-main{
				position: relative;
				z-index: 10;
				width: 85%;
				height: 184upx;
				.price-wrap{
					
					width: 48%;
					color: #EC7A8E;
					.price{
						font-size: 106upx;
						font-weight: bold;
						position: relative;
					}
					.symbol{
						font-size: 32upx;
						font-weight: bold;
						position: absolute;
						right: -32upx;
						top: 20upx;
					}
				}
				
				.coupon-line{
					width: 2upx;
					height: 104upx;
					background-color: #E5E5E5;
				}
				.coupon-txt{
					color: #99939A;
					font-size: 26upx;
					width: 52%;
					padding-left: 40upx;
					padding-right: 25upx;
				}
				.coupon-txt-other{
					color: #d4d4d4;
				}
				.coupon-txt-and{
					color: #b9b9b9;
				}
				.color-gr{
					color: #BEBEBE;
				}
			}
			
			.btn{
				font-size: 24upx;
				color: #fff;
				position: absolute;
				z-index: 10;
				right: 6%;
				top: 50%;
				width: 24upx;
				transform: translateY(-50%);
				line-height: 24upx;
			}
		}
	}
</style>
