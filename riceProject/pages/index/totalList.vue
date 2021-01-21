<template>
	<view class="totalList-wraps">
		
		<web-view  :src="src"></web-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				src:'',
				kefu:''
			}
		},
		onLoad(option) {
			console.log(option)
			if(option.src){
				this.src = option.src
			}
			if(option.kefu){
				this.kefu = option.kefu
				this.src = 'http://pdt.zoosnet.net/LR/Chatpre.aspx?id=PDT42101061&lng=cn'
				uni.setNavigationBarTitle({
				    title: '客服消息'
				})
			}
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	
	.recomon{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		.recomon-main{
			margin-top: 30upx;
			justify-content: space-between;
			flex-wrap: wrap;
			.recomon-item{
				width:335upx;
				height:540upx;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:10upx;
				image{
					width: 335upx;
					height: 335upx;
				}
				.recomon-text{
					padding: 25upx 20upx;
					.recomon-title{
					width:279upx;
					height:36upx;
					font-size:28upx;
					font-weight:bold;
					color:rgba(0,0,0,1);
					}
					.recomon-intr{
						width:259upx;
						height:30upx;
						font-size:20upx;
						font-weight:500;
						color:rgba(187,187,187,1);
					}
					.recomon-price{
						width:100upx;
						height:32upx;
						font-size:30upx;
						font-weight:bold;
						// color:rgba(248,73,73,1);
					}
					.recomon-lowprice{
						justify-content: space-between;
						.recomon-price-x{
						width:120upx;
						height:26upx;
						font-size:20upx;
						color:rgba(248,73,73,1);
						}
						.recomon-num{
							width:110upx;
							height:26upx;
							font-size:20upx;
							color:rgba(187,187,187,1);
						}
					}
				}
			}
		}
	}
</style>

