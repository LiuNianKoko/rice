<template>
	<view class="content">
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter"  @click="back">
				<image src="/static/back-white.png" class="back"></image>
			</view>
			<view class="title-txt">
				退款去向
			</view>
		</view>
		<image :src="imgUrl + 'lg-order-bg.png'" class="order-bg"></image>
		<view class="head-wrap" :style="[{paddingTop:(CustomBar + 30) + 'px'}]">
			<view class="text-white fontBold">
				<view class="marginBottom10 text-center">
					退款金额
				</view>
				<view class="tk-price">
					￥{{info.price || ''}}
				</view>
			</view>
		</view>
		<view class="tk-wrap">
			<view class="tk-box">
				<view class="font26 disFlex tk-item">
					<view class="tk-left">
						退回账号
					</view>
					<view class="tk-right">
						微信
					</view>
				</view>
				<view class="font26 disFlex tk-item">
					<view class="tk-left">
						通过审核时间
					</view>
					<view class="tk-right">
						{{info.check_time || ''}}
					</view>
				</view>
				<view class="font26 disFlex tk-item">
					<view class="tk-left">
						到账时间
					</view>
					<view class="tk-right">
						款项已于{{info.accounting_time || ''}}到账
					</view>
				</view>
				
				<view class="tk-intr">
					退款会原路返回您的支付账户，微信会在2小时内到账，银行卡将于1-3个工作日到账。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp()
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				imgUrl:app.globalData.imgUrl,
				id:'',
				info:{}
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id
				}
				http('/api/users/after_detail', 'post',data).then(res => {
					if(res.code == 200){
						this.info = res.data
					}
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
		height: 100%;
	}
	.content{
		height: 100%;
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #000;	
		padding-left: 24upx;
		/* #ifdef MP-WEIXIN */
		padding-right: 220upx;
		/* #endif */
		.back-wrap{
			width: 40upx;
			height: 40upx;
			.back{
				width: 18upx;
				height: 32upx;
			}
		}
		.title-txt{
			font-size: 32upx;
			width: 60%;
			text-align: center;
			color: #fff;
			font-weight: bold;
		}
	}
	.order-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 515upx;
	}
	.head-wrap{
		padding-left: 100upx;
		padding-right: 100upx;
		padding-bottom: 80upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 50;
		.tk-price{
			font-size: 58upx;
		}
	}
	.tk-wrap{
		padding: 0 30upx;
		position: relative;
		z-index: 50;
		height: calc(100% - 197px);
		.tk-box{
			padding: 40upx 30upx 0;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			height: 100%;
			.tk-item{
				padding: 18upx 0;
				.tk-left{
					color: #434343;
					width: 220upx;
				}
				.tk-right{
					color: #A0A0A0;
				}
			}
			
			.tk-intr{
				color: #BEBEBE;
				font-size: 24upx;
				padding-top: 34upx;
				border-top: 1px solid #DBDBDB;
				margin-top: 55upx;
			}
		}
	}
</style>
