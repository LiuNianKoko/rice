<template>
	<view>
		<view class="money-wraps">
			<view class="money-total">
				<navigator url="/pages/viper/monthPri">
					<view class="money-grand">
						<!-- 累计收益(元) -->
						今日收益(元)
					</view>
				</navigator>
				<view class="money-add">
					<!-- ￥{{moneyInfo.goods_profit}} -->
					<text class="symbol">￥</text>{{moneyInfo.yesterday|| 0}}
				</view>
				<view class="money-yesterday">
					累计收益<text class="symbol">￥</text><text>{{moneyInfo.goods_profit || 0}}</text>
					<!-- 今日收益￥{{moneyInfo.yesterday}} -->
				</view>
				<view class="money-add-box">
					<view class="add-item">
						<view class="add-text">
							待确认收益
						</view>
						<view class="add-price">
							<text class="symbol">￥</text>{{moneyInfo.stay_profit || 0}}
						</view>
						
					</view>
					<view class="add-line"></view>
					<view class="add-item">
						<view class="add-text">
							可提现收益
						</view>
						<view class="add-price">
							<text class="symbol">￥</text>{{moneyInfo.surplus_profit || 0}}
						</view>
						
					</view>
					<view class="add-line"></view>
					<view class="add-item">
						<view class="add-text">
							已提现
						</view>
						<view class="add-price">
							<text class="symbol">￥</text>{{moneyInfo.withdrawals || 0}}
						</view>
						
					</view>
				</view>
			</view>
			<view class="money-item-wrap">
				<view class="money-income">
					会员推广收益：<text class="symbol">￥</text><text>{{moneyInfo.profit_money || 0}}</text>
				</view>
				<view v-if="list.length>0">
					<view class="money-item" v-for="item in list" :key="item.id">
						<view class="money-top">
							<view class="headimg">
								<image :src="item.headimgurl?item.headimgurl:'/static/vip-head-pic.png'" mode="aspectFill"></image>
							</view>
							<view class="money-text">
								<view class="money-box">
									<view class="money-name">
										{{item.nickname}}
									</view>
									<view class="money-num">
										收益：<text class="symbol">￥</text><text>{{item.profit_stay_profit || 0}}</text>
									</view>
								</view>
								<view class="money-status" v-if="item.vip==3">
									<image src="/static/vip-logo.png"></image>会员
								</view>
								<view class="money-status" v-if="item.vip==2">
									<image src="/static/vip-xiao.png"></image>会员
								</view>
								<view class="money-status" v-if="item.vip < 2">
									<image src="/static/vip-putong.png"></image>普通用户
								</view>
							</view>
						</view>
						<view class="money-bottom">
							<view class="money-sub">
								<text class="money-sub-l line1">商品编码：{{item.goods_number}}</text>
								<text class="money-sub-r" v-if="item.rake_back">
									<text class="money-sub-r2">商品返佣率：</text>
									{{item.rake_back * 100}}%
								</text>
								<text class="money-sub-r" v-else>
									<text class="money-sub-r2">支付金额：</text>
									<text class="symbol">￥</text>
									{{item.profit_tail_price}}
								</text>
								
							</view>
							<!-- <view class="money-time"> -->
							<view class="money-sub">
								<text class="money-sub-l">确认时间：{{item.confirmtime}}</text>
								<text class="money-sub-r" v-if="item.rake_back">
									<text class="money-sub-r2">支付金额：</text>
									<text class="symbol">￥</text>
									{{item.profit_tail_price}}
								</text>
								
							</view>
							<view class="money-nember">
								订单编号：{{item.ordernum}}
							</view>
							<view class="money-nember">
								商品名称：{{item.goods_name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				moneyInfo:{},
				list:[],
				page:1
			}
		},
		onLoad() {
			this.getMoney()
			
		},
		onShow() {
			this.getMoney()
		},
		onReachBottom() {
			this.getNewList()
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({  
			  url: '/pages/mine/cashdrawal?tixType=2'  
			});  
		},
		methods:{
			getMoney(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/Api/user/myIncome','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.moneyInfo = res.data.data.user
						this.list = res.data.data.user.profit_user.data
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
				})
			},
			getNewList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1,
				}
				http('/Api/user/myIncome','post',data).then(res=>{
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page >= res.data.data.user.profit_user.last_page){
						// this.$util.showToast('没有更多了')	
						return false
					}
					this.page++
					this.list = this.list.concat(res.data.data.user.profit_user.data)
				})
			}
		}
	}
</script>

<style lang="less">
	.symbol{
		font-size: 24upx;
		margin-top: -2upx;
	}
	.money-wraps{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color:#f2f2f5 ;
	}
	.money-total{
		border-top: 2upx solid #f2f2f5;
		height: 480upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		.money-grand{
			font-size: 24upx;
			margin-top: 60upx;
			border: 1px solid #eeeeee;
			border-radius: 20upx;
			padding:5upx 20upx;
			
		}
		.money-add{
			font-size:60upx;
			font-weight: bold;
			margin-top: 20upx;
			color: #ec614a;
			.symbol{
				font-size: 32upx;
			}
		}
		.money-yesterday{
			width:240upx;
			height:58upx;
			background:rgba(242,242,245,1);
			border-radius:25upx;
			font-size: 24upx;
			color: #bbbbbb;
			text-align: center;
			line-height: 58upx;
			margin-top: 20upx;
			text{
				color: #ec614a;
			}
		}
		.money-add-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 70upx;
			box-sizing: border-box;
			margin-top: 60upx;
			.add-item{
				font-size: 32upx;
				font-weight: bold;
				display: flex;
				flex-direction: column;
				align-items: center;
				.add-text{
					font-size: 24upx;
					color: #bbbbbb;
					font-weight: normal;
					margin-bottom: 12upx;
				}
				.add-price{
					font-size: 28upx;
					line-height: 28upx;
					display: flex;
					align-items: flex-end;
					color: #ec614a;
				}
			}
			.add-line{
				width:2upx;
				height:40upx;
				background:#f2f2f5;
			}
		}
	}
	.money-item-wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 26upx;
		.money-income{
			width:690upx;
			height:100upx;
			background:rgba(255,255,255,1);
			border-radius:10upx;
			font-size: 32upx;
			line-height: 100upx;
			padding-left: 30upx;
			box-sizing: border-box;
			text{
				font-weight: bold;
				font-size: 32upx;
				color: #ec614a;
			}
			.symbol{
				font-size: 24upx;
			}
		}
		.money-item{
			margin-top: 26upx;
			width:690upx;
			// height:292upx;
			background:rgba(255,255,255,1);
			border-radius:10upx;
			padding: 30upx 20upx;
			box-sizing: border-box;
			.money-top{
				height: 90upx;
				margin-bottom: 30upx;
				display: flex;
				.headimg{
					image{
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}
				}
				.money-text{
					margin-left: 20upx;
					flex: 1;
					.money-box{
						display: flex;
						justify-content: space-between;
						.money-num{
							font-size: 24upx;
							text{
								font-weight: bold;
								color: #ec614a;
							}
						}
					}
					.money-status{
						display: flex;
						margin-top: 10upx;
						image{
							width: 36upx;
							height: 36upx;
						}
					}
				}
			}
			.money-bottom{
				.money-sub{
					display: flex;
					justify-content: space-between;
					margin-top: 12upx;
					.money-sub-l{
						// width: 232upx;
					}
					.money-sub-r{
						color: #ec614a;
					}
					.money-sub-r2{
						color: #000;
					}
					text{
						font-size: 24upx;
						line-height: 30upx;
					}
				}
				.money-time{
					margin-top: 8upx;
					font-size: 24upx;
				}
				.money-nember{
					margin-top: 12upx;
					font-size: 24upx;
				}
			}
		}
	}
</style>
