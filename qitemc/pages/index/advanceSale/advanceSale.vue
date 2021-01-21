<template>
	<view class="advance-wraps">
		<view class="header-wrap">
			<view class="index-header">
				预售商品
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toIndex"></image> -->
				<view class="back-icon-wrap" @click="toIndex">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="advance-main" v-if="advanceList.length >0">
			<view class="open">
				<view class="open-main marginTop20">
					<view class="open-item marginBottom20 disFlex" v-for="item in advanceList" :key="item.id" @click="toAdvanceBuy(item.id)">
						<image :src="item.cover" alt=""></image>
						<view class="open-text">
							<view class="open-title line1 marginBottom5">
								{{item.goods_name}}
							</view>
							<view class=" open-intr line1 marginBottom5">
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
							<!-- <view class="open-status disFlex">
								<text class="open-status02">{{item.end_time}}结束</text>
								<text class="open-status03 line1" v-if="item.remark">{{item.remark}}</text>
							</view> -->
							<view class="immed-wrap disFlex">
								<view class="open-vip-price">￥{{item.price}}</view>
								<view class="open-immed common-immed">
									<text>马上抢</text>
								</view>
							</view>
							<view class="open-price disFlex">
								<!-- <text class="open-cost-price">￥{{item.reveal_price}}</text> -->
								<view class="spell-price-x disFlex">
									<text class="symbol">￥</text>
									<text class="spell-cost-price">{{item.reveal_price}}</text>
									<image class="recomon-price-img" src="/static/member-man4.png" ></image>
								</view>
								<view class="open-have">
									<!-- 剩余<text>{{item.stock}}</text>件 -->
								</view>
							</view>
							
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-else>暂无数据~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				advanceList:[],
				page:1
			}
		},
		onLoad(){
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
			toAdvanceBuy(id){
				uni.navigateTo({
					url:'/pages/index/advanceBuy?presaleid='+id
				})
			},
			getList(){
				let that = this
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/Presale/presaleLists','post',data).then(res=>{
					if(res.data.status == '200'){
						that.advanceList = res.data.data.spikeLists.data
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
				http('/api/Presale/presaleLists','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.spikeLists.last_page){
						this.$util.showToast('没有更多了')
						return
					}
					this.page++
					this.advanceList = this.advanceList.concat(res.data.data.spikeLists.data)
				})
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
	.open{
		padding: 0 30upx;
		.open-item{
			position: relative;
			image{
				width: 254upx;
				height: 254upx;
			}
			// .open-immed{
			// 	right: 10upx;
			// 	bottom: 10upx;
			// }
			.open-text{
				width: 410upx;
				// height: 280upx;
				padding-left: 20upx;
				.open-title{
					width:383upx;
					font-size:32upx;
					// font-weight:bold;
					color:#333;
				}
				.open-intr{
					width:311upx;
					font-size:24upx;
					color:#939393;
				}
				.open-price{
					color:#ec614a;
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
						// vertical-align: bottom;
					}
					
				}
				.immed-wrap{
					justify-content: space-between;
					align-items: center;
					margin-bottom: 6upx;
					.open-vip-price{
						font-size:24upx;
						font-weight: bold;
						// color:rgba(248,73,73,1);
						// background-color: #dadada;
						// border-radius: 20upx;
						// padding: 4upx 12upx;
					}
				}
				.open-have{
					color:rgba(187,187,187,1);
					text{
						color: #F84949;
					}
				}
				.open-status{
					height:50upx;
					margin-top: 20upx;
					color:rgba(187,187,187,1);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.open-status03{
						width: 30upx;
					}
					.open-status02{
						color: #fc1313;
						margin-top: 8upx;
						// font-size:18upx;
					}
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

