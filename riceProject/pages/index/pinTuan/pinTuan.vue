<template>
	<view class="pinTuan-wraps">
		<view class="header-wrap">
			<view class="index-header">
				拼团抢购
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toIndex"></image> -->
				<view class="back-icon-wrap" @click="toIndex">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="pinTuan-main">
			<view class="spell" v-if="groupList.length>0">
				<view class="spell-main marginTop20">
					<view class="spell-item marginBottom20 disFlex" v-for="item in groupList" :key="item.id" @click="toGroupBuy(item.id)">
						<image :src="item.cover" alt=""></image>
						<view class="spell-text">
							<view class="spell-title line1 marginBottom5">
								{{item.goods_name}}
							</view>
							<view class=" spell-intr line1 marginBottom5">
								{{item.desc}}
							</view>
							<view class="seckill-speed marginBottom10 w-100">
								<view class="seckill-bar">
									<view class="progress-box">
										<progress :percent="item.contrast" activeColor="#F84949" active stroke-width="6" />
									</view>
								</view>
								<view class="seckill-bar-num">已抢{{item.surplus_num}}件 还剩<text class="seckill-bar-save">{{item.stock}}</text>件</view>
							</view>
							<view class="immed-wrap disFlex">
								<view class="spell-vip-price ">￥{{item.price}}</view>
								<view class="spell-immed common-immed">
									<text>拼团</text>
								</view>
							</view>
							<view class="spell-price disFlex">
								<view class="spell-price-x disFlex">
									<text class="symbol">￥</text>
									<text class="spell-cost-price">{{item.reveal_price}}</text>
									<image class="recomon-price-img" src="/static/member-man3.png" ></image>
								</view>
								
								<view class="spell-status">
									<!-- {{item.end_time_date}}结束 -->
								</view>
							</view>
							
							
						</view>
						
					</view>
				</view>
			</view>
			<view class="nodata" v-else>暂无数据~</view>
		</view>
		
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				groupList:[],
				page:1
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			toGroupBuy(id){
				uni.navigateTo({
					url:'/pages/index/gorupBuy?groupid='+id
				})
			},
			getList(){
				let that = this
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/GroupBuy/GroupBuyLists','post',data).then(res=>{
					if(res.data.status == '200'){
						that.groupList = res.data.data.groupBuyList.data
					}
					if(res.data.status == '400'){
						this.$util.showToast(res.data.msg)
						return
					}
					console.log(res)
				})
			},
			getNewList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/GroupBuy/GroupBuyLists','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.groupBuyList.last_page){
						this.$util.showToast('没有更多了')
						return
					}
					this.page++
					this.groupList = this.groupList.concat(res.data.data.groupBuyList.data)
				})
			},
		}
		
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		// background:linear-gradient(90deg,rgba(69,180,67,1) 0%,rgba(122,205,121,1) 100%);
		background:linear-gradient(90deg,#00a0e9 0%,#61c2ef 100%);
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
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
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
	.common-immed{
		position: absolute;
		right: 14upx;
		bottom: 22upx;
		width:140upx;
		height:45upx;
		line-height: 45upx;
		background:#00a0e9;
		// box-shadow:0px 10upx 10upx 0px #00a0e9;
		border-radius:27upx;
		text-align: center;
		text{
			font-size:24upx;
			color:rgba(255,255,255,1);
		}
	}
	.spell{
		padding: 0 30upx;
		.spell-item{
			position: relative;
			image{
				width: 254upx;
				height: 254upx;
			}
			.spell-immed{
			// 	right: 10upx;
			// 	bottom: 10upx;
				text{
					letter-spacing: 12upx;
				}
			}
			.spell-text{
				width: 410upx;
				// height: 280upx;
				padding-left: 20upx;
				.spell-title{
					width:383upx;
					font-size:32upx;
					// font-weight:bold;
					color:#333;
				}
				.spell-intr{
					width:311upx;
					font-size:24upx;
					color:#939393;
				}
				.spell-price{
					color: #ec614a;
					// margin-bottom: 10upx;
					.spell-price-x{
						align-items: flex-end;
						line-height: 32upx;
					}
					.spell-cost-price{
						font-size:36upx;
						font-weight:bold;
						// color:rgba(248,73,73,1);
					}
					.symbol{
						font-size: 24upx;
						line-height: 24upx;
					}
					.recomon-price-img{
						width: 68upx;
						height: 30upx;
						margin-left: 4upx;
						
					}
				}
				.immed-wrap{
					justify-content: space-between;
					align-items: center;
					margin-bottom: 6upx;
					.spell-vip-price{
						font-size:24upx;
						font-weight: bold;
						// color:rgba(248,73,73,1);
						// background-color: #dadada;
						// border-radius: 20upx;
						// padding: 4upx 12upx;
					}
				}
				
				.spell-status{
					color: #fc1313;
					
				}
			}
		}
	}
	.nodata {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #aaaaaa;
		font-size: 30upx;
	}
	.seckill-speed {
		margin-bottom: 22upx;
		.seckill-bar {
			width: 280upx;
			height: 12upx;
			background: rgba(242, 242, 245, 1);
			border-radius: 6upx;
			margin: 20upx 12upx 0 0;
		}
	
		.seckill-bar-num {
			// width:190upx;
			/* #ifdef APP-PLUS */
			height: 20upx;
			font-size: 20upx;
			/* #endif */
			height: 24upx;
			line-height: 24upx;
			font-size: 24upx;
			color: rgba(187, 187, 187, 1);
			margin-top: 6upx;
			.seckill-bar-save{
				font-size: 26upx;
				color: #ec614a;	
				font-weight: bold;
				// margin: 0 10upx;
			}
		}
	}
</style>
