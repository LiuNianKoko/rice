<template>
	<view class="content">
		<cu-custom bgColor="bgF4" :isBack="true"><block slot="backText"></block><block slot="content">支付完成</block></cu-custom>
		
		<view class="pay-wrap disCenter">
			<image :src="imgUrl +'lg-pay-success.png'" class="lg-pay" v-if="pay"></image>
			<image :src="imgUrl +'lg-pay-fail.png'" class="lg-pay" v-if="!pay"></image>
			<view class="font40 fontBold" v-if="pay">
				支付成功
			</view>
			<view class="font40 fontBold" v-if="!pay">
				支付失败
			</view>
		</view>
		<view class="disBetween btn-wrap">
			<view class="btn" @click="toOrderDetail">
				查看订单
			</view>
			<view class="btn" @click="toIndex">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				pay:true,
				id:''
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			toOrderDetail(){
				uni.redirectTo({
					url:'/pages/mine/orderDetail?id=' + this.id
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.lg-pay{
		width: 177upx;
		height: 183upx;
		margin-left: 36upx;
	}
	.pay-wrap{
		padding-top: 130upx;
		flex-direction: column;
	}
	.btn-wrap{
		padding: 94upx 124upx;
		.btn{
			font-size: 26upx;
			color: #EC7A8E;
			font-weight: bold;
			border: 1px solid #EC7A8E;
			border-radius: 40upx;
			width: 180upx;
			height: 56upx;
			text-align: center;
			line-height: 56upx;
		}
	}
</style>
