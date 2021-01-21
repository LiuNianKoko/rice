<template>
	<view class="cutPrice-wraps">
		<view class="header-wrap">
			<view class="index-header">
				降价促销
				<navigator animation-type="pop-out" animation-duration="300" open-type="navigateBack" >
					<image class="back-icon" src="/static/back-icon.png"></image>
				</navigator>
			</view>
		</view>
		<view class="blank"></view>
		<view class="cut-sort">
			<view class="cut-sort-title" :class="[cut==1?'cut-active':'']" @click="changeCut(1)">
				综合排序
			</view>
			<view class="cut-sort-title" :class="[cut==2?'cut-active':'']" @click="changeCut(2)">
				销量优先
			</view>
			<view class="cut-sort-title" :class="[cut==3?'cut-active':'']" @click="changeCut(3)">
				新品
			</view>
			<view class="cut-sort-title sort-price" :class="[cut==4?'cut-active':'']" @click="changeCut(4)">
				价格
				<view class="sort-position">
					<image src="/static/up1.png" v-if="upStatus"></image>
					<image src="/static/up2.png" v-else></image>
					<image src="/static/down1.png" v-if="!upStatus"></image>
					<image src="/static/down2.png" v-else></image>
				</view>
			</view>
		</view>
		<view class="cut-main">
			
			<view class="recomon">
				<view class="recomon-main disFlex">
					<view class="recomon-item marginBottom20">
						<image src="/static/recomon.png" alt=""></image>
						<view class="recomon-text">
							<view class="recomon-title line1 marginBottom10">
								商品标题商品标题商品标题商品标题
							</view>
							<view class=" recomon-intr line1 marginBottom15">
								商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍
							</view>
							<view class="recomon-price marginBottom10">
								￥368
							</view>
							<view class="recomon-lowprice disFlex">
								<text class="recomon-price-x">农户价328</text>
								<text class="recomon-num">月销1000</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cut:1,
				upStatus:true
			}
		},
		methods:{
			toDetail(){
				uni.navigateTo({
					url:'/pages/index/detail'
				})
			},
			changeCut(cut){
				this.cut = cut
				if(cut == 4){
					this.upStatus = !this.upStatus
				}
			}
		}
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background:linear-gradient(90deg,rgba(69,180,67,1) 0%,rgba(122,205,121,1) 100%);
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #fff;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	.cut-active{
		color: #F84949;
	}
	.cut-sort{
		padding: 0 30upx;
		display: flex;
		align-items: center;
		height: 100upx;
		.cut-sort-title{
			font-size: 32upx;
			margin-right: 60upx;
		}
		.sort-price{
			display: flex;
			.sort-position{
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 14upx;
				image{
					width: 22upx;
					height: 22upx;
				}
			}
		}
	}
	
	.recomon{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		.recomon-main{
			margin-top: 10upx;
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
						font-size:32upx;
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

