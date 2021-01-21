<template>
	<view>
		<view class="header-wrap">
			<view class="index-header">
				我的拼团
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="myorder-wrap">
			<view class="orderxq-wrap" v-if="spellList.length > 0">
				<view class="order-item boxsizing" v-for="item in spellList" :key="item.id">
					<view class="timest">
						<view class="left time">{{item.create_time}}</view>
						<view class="right status">
							<text v-if="item.is_group == 1">已拼成</text>
							<text v-if="item.is_group == -1">未拼成，钱款已退回</text>
							<text v-if="item.is_group == 0">拼团中</text>
						</view>
					</view>

					<!-- <view class="disflex orditem" v-for="(item, i) in data.goods_data" :key="i"> -->
					<view class="disflex orditem">
						<view class="simgb"><image class="shopimg" :src="item.cover" mode=""></image></view>
						<view class="shopintro boxsizing flxe-1">
							<view class="shocon disflex">
								<view class=" shopname line1">{{item.goods_name}}</view>
								<view class="">
									
									<view class="saleNum">
										<text class="fhao">x</text>
										 {{item.number}}
									</view>
								</view>
							</view>
							<view class="guige">
								<!-- <view class="left bti" v-if="item.goods_attr_name">规格：{{item.goods_attr_name}}</view> -->
								<view class="left bti">{{item.sku_name}}</view>
							</view>
							<view class="prices"><text class="symbol">￥</text>{{item.price}} </view>
						</view>
					</view>
					<view class="calcAllpr disflex">
						<view class="yunfei">运费： <text class="symbol">￥</text>{{item.freightprice}} </view>
						<view>
							<!-- <text class="num" v-if="data.goods_data">共{{ data.goods_data.length }}件商品</text> -->
							<text class="num">共{{item.number}}件商品</text>
							<text class="heji">合计</text>
							<text class="price"><text class="symbol">￥</text>{{item.totalprice}}</text>
						</view>
					</view>
					<view class="useropart disFlex">
						<view class=" btn" @click="lookWuliu(item)" v-if="item.is_group == 1">查看物流</view>
						<view class="btn right" @click="toSpellDetail(item.id)">查看拼团详情</view>
						
					</view>
				</view>
			</view>
			<view class="nodata" v-else>暂无数据~</view>
		</view>
		
	</view>
</template>
<script>
import http from '@/api/http.js';
export default {
	data() {
		return {
			spellList:[],
			page:1
		};
	},
	onLoad() {
		this.getList()
	},
	onShow() {
		this.getList()
	},
	onReachBottom() {
		this.getNewList()
	},
	methods: {
		lookWuliu(item){
			uni.navigateTo({
				url:'/pages/mine/order-daishouh?id=' + item.order_id + '&wuliu=1' + '&ordernum=' + item.ordernum
			})
		},
		getList(){
			let data = {
				token:uni.getStorageSync('token')
			}
			http('/api/GroupBuy/getUserGroupBuy','post',data).then(res=>{
				if(res.data.status == '200'){
					this.spellList = res.data.data.recordsLists.data
				}
				console.log(res)
			})
		},
		toSpellDetail(id){
			uni.navigateTo({
				url:'/pages/mine/spellDetail?id='+id
			})
		},
		getNewList(){
			let data = {
				token:uni.getStorageSync('token'),
				page:this.page+1
			}
			http('/api/GroupBuy/getUserGroupBuy','post',data).then(res=>{
				
				if(res.data.status=='400'){
					this.$util.showToast(res.data.msg)
					return
				}
				
				if(this.page > res.data.data.recordsLists.last_page){
					// this.$util.showToast('没有更多了')
					return false
				}
				this.page++
				this.spellList = this.spellList.concat(res.data.data.recordsLists.data)
			})
		},
		toMine(){
			uni.switchTab({
				url:'/pages/mine/mine'
			})
			// uni.navigateBack({
			// 	delta:1
			// })
		}
	}
};
</script>

<style lang="scss">
.header-wrap {
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 999;
	background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
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
page {
	background-color: #f2f2f5;
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
.symbol{
	font-size: 24upx;
}
.useropart {
	// clear: both;
	// overflow: hidden;
	justify-content: flex-end;
	
	.btn {
		width: 240upx;
		margin: 0 20upx;
		height: 66upx;
		line-height: 66upx;
		text-align: center;
		border-radius: 18px;
		border: 1px solid #FB4142;
		color: #FB4142;
		margin-top: 30upx;
		&.active {
			color: #fb4142;
			border-color: #fb4142;
		}
	}
}
.calcAllpr {
	overflow: hidden;
	// margin-top: 50upx;
	justify-content: space-between;
	.yunfei {
		// font-size: 24upx;
		color: #000000;
	}
	.num {
		color: #aaaaaa;
		font-size: 24upx;
	}
	.heji {
		color: #000000;
		// font-size: 32upx;
		margin: 0 20upx;
	}
	.price {
		color: #ec614a;
		font-weight: bold;
		// font-size: 32upx;
	}
}
.orderxq-wrap {
	.order-item {
		background-color: #ffffff;
		padding: 30upx;
		margin-top: 30upx;
		border-radius: 6px;
	}
	.orditem {
		margin-bottom: 30upx;
	}
	.yunfei {
		.yufeip {
			color: #aaaaaa;
			font-size: 30upx;
		}
	}
	.shopintro {
		padding-left: 26upx;
		position: relative;
	}
	.guige {
		color: #aaaaaa;
		font-size: 22upx;
		overflow: hidden;
		margin-top: -4upx;
		.bti {
			font-size: 24upx;
		}
		.btn {
			padding: 0 20upx;
			height: 50upx;
			border: 1px solid #fb4142;
			border-radius: 20px;
			line-height: 50upx;
			color: #fb4142;
			border-color: #fb4142;
			margin-top: 20upx;
		}
	}
	.prices {
		color: #000000;
		font-size: 28upx;
		// text-align: right;
		line-height: 28upx;
		position: absolute;
		left: 26upx;
		bottom: 0;
	}
	.saleNum {
		color: #aaaaaa;
		font-size: 28upx;
		text-align: right;
		.fhao {
			font-size: 11px;
		}
	}
	.shopname {
		color: #000000;
		font-size: 29upx;
		width: 300upx;
		// height: 40upx;
	}
	.shocon {
		overflow: hidden;
		justify-content: space-between;
	}
	.simgb,
	.shopimg {
		width: 180upx;
		height: 180upx;
	}
	.timest {
		overflow: hidden;
		margin-bottom: 30upx;
	}
	.time {
		color: #000000;
		font-size: 28upx;
	}
	.status {
		color: #fb4142;
		font-size: 28upx;
	}
}
.myorder-wrap {
	padding: 30upx;
	.tab-item {
		text-align: center;
		height: 90upx;
		line-height: 90upx;
		text {
			border-bottom: 1px solid #f2f2f5;
			padding-bottom: 12upx;
			font-size: 30upx;
		}
		&.active {
			color: #fb4142;

			text {
				border-color: #fb4142;
				font-size: 34upx;
			}
		}
	}
}
</style>

