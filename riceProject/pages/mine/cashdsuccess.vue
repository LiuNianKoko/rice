<template>
	<view>
		<view class="success">
			<image class="suc-bg" :src='imag+"txbg.jpg"'></image>
			<view class="suc-wrap">
				<view class="suc-img-wrap">
					<image class="suc-img" :src='imag+"txsuccess.png"'></image>
				</view>
				<view class="suc-title">
					提现申请提交成功
				</view>
				<view class="suc-intr">
					我们将在三个工作日内处理您的提现申请
				</view>
				
				<view class="suc-line">
					<!-- <view class="suc-line-l suc-cir">
						
					</view>
					<view class="suc-line-r suc-cir">
						
					</view> -->
				</view>
				
				<view class="suc-item">
					<view class="item-title">
						收款账户
					</view>
					<view class="item-txt" v-if="current==1">
						<image class="item-img" :src='imag+"txzfb.png"'></image>
						 支付宝({{num2}})
					</view>
					<view class="item-txt" v-if="current==2">
						<image class="item-img" :src='imag+"txbank.png"'></image>
						 银行卡({{num2}})
					</view>
				</view>
				<view class="suc-item">
					<view class="item-title">
						提现金额
					</view>
					<view class="item-txt">
						{{price}} 元
					</view>
				</view>
			</view>
			<view class="sure-btn" @click="tomymoney">
				确定({{timers}})
			</view>
		</view>
		
	</view>
</template>

<script>
	let timer = '';
	const app = getApp();
	export default{
		data(){
			return{
				imag: app.globalData.imag,
				timers:3,
				current:1,
				price:0,
				num:'',
				num2:''
			}
		},
		onLoad(option) {
			this.current = option.current
			this.price = option.price
			this.num = option.num
			this.getNum()
			this.countdown()
		},
		methods:{
			tomymoney(){
				clearInterval(timer);
				uni.redirectTo({
					url: '/pages/viper/mymoney'
				})
			},
			getNum(){
				if(this.num.length >= 4){
					this.num2 = this.num.substring(this.num.length - 4)
				}else if(this.num.length == 3){
					this.num2 = '*'+ this.num
				}else if(this.num.length == 2){
					this.num2 = '**'+ this.num
				}else if(this.num.length == 1){
					this.num2 = '***'+ this.num
				}else{
					this.num2 = '****'
				}
			},
			countdown(){
				clearInterval(timer);
				timer = setInterval(() => {
					this.timers--;
					if (this.timers <= 0) {
						uni.redirectTo({
							url: '/pages/viper/mymoney'
						})
						clearInterval(timer);
					}
				}, 1000)
			}
		}
	}
	
</script>

<style lang="less">
	page{
		// background-color: #f9f9f9;
		padding: 0 20upx;
	}
	.success{
		padding: 60upx 30upx 0;
		position: relative;
		.suc-bg{
			width: 100%;
			height: 644upx;
			position: absolute;
			top: 68upx;
			left: 0;
		}
	}
	.suc-wrap{
		position: relative;
		// background-color: #fff;
		// border-radius: 80upx;
		// box-shadow: 0px 0px 10upx -2upx #999;
		padding: 36upx 12upx;
		.suc-img-wrap{
			display: flex;
			justify-content: center;
			.suc-img{
				width: 180upx;
				height: 180upx;
			}
			
		}
		.suc-title{
			text-align: center;
			font-size: 52upx;
			margin-top: 10upx;
		}
		.suc-intr{
			text-align: center;
			font-size: 32upx;
			color: #888;
			margin-top:30upx;
		}
		.suc-line{
			position: relative;
			// background-color: #888;
			height: 1px;
			margin: 56upx 0;
			// .suc-cir{
			// 	width: 70upx;
			// 	height: 70upx;
			// 	background-color: #f9f9f9;
				
			// 	box-shadow: 0px 0px 10upx -2upx #999;
			// 	position: absolute;
			// 	z-index: 2;
			// }
			// .suc-line-l{
			// 	border-radius:0 140upx 140upx 0;
			// 	width: 36upx;
			// 	top: -48upx;
			// 	left: -76upx;
			// }
			// .suc-line-r{
			// 	top: 0;
			// 	right: 0;
			// }
		}
		.suc-item{
			display: flex;
			justify-content: space-between;
			margin-bottom: 20upx;
			.item-title{
				font-size: 32upx;
			}
			.item-txt{
				display: flex;
				color: #888;
				align-items: center;
				font-size: 30upx;
				.item-img{
					width: 44upx;
					height: 44upx;
					margin-right: 8upx;
				}
			}
		}
	}
	.sure-btn{
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 32upx;
		background-color: #00a0e9;
		color: #fff;
		border-radius: 60upx;
		margin-top: 120upx;
	}
</style>
