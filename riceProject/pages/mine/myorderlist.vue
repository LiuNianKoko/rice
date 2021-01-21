<template>
	<view class="">
		<view class="header-wrap">
			<view class="index-header">
				我的订单
				<!-- <image class="back-icon" src="/static/back-black.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-black.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="myorder-wrap">
			<view class="ordertab-fill"></view>
			<view class="ordertab disflex">
				<view class="tab-item " @click="loadOrder(1)" :class="{ active: orderType == 1 }"><text>全部</text></view>
				<view class="tab-item " @click="loadOrder(2)" :class="{ active: orderType == 2 }"><text>待付款</text></view>
				<view class="tab-item " @click="loadOrder(3)" :class="{ active: orderType == 3 }"><text>待发货</text></view>
				<view class="tab-item " @click="loadOrder(4)" :class="{ active: orderType == 4 }"><text>待收货</text></view>
				<view class="tab-item " @click="loadOrder(5)" :class="{ active: orderType == 5 }"><text>待评价</text></view>
				<view class="tab-item " @click="loadOrder(6)" :class="{ active: orderType == 6 }"><text>售后</text></view>
			</view>
			<!--待付款，待发货，待评价，待收货-->
			<!-- order_type  订单类型 1普通 2团购 3预定 4秒杀 5特权商品 6充值 7会员商城 8礼包商品 -->
			<view class="orderxq-wrap" v-if="orderType != 6">
				<view v-if="orderlist.length > 0">
					<view class="order-item boxsizing" v-for="(data, index) in orderlist" :key="index">
						<view class="timest">
							<view class="left time">{{ data.createtime }}</view>
							<view class="right status">
								<text v-if="data.order_status == 1">待付款</text>
								<text v-if="data.order_status == 2">待发货</text>
								<text v-if="data.order_status == 3">待确认</text>
								<text v-if="data.order_status == 4">待评价</text>
								<text v-if="data.order_status == 5">已完成</text>
								<text v-if="data.order_status == 6">退款中</text>
								<text v-if="data.order_status == 7">已退款</text>
								<text v-if="data.order_status == 8">退货中</text>
								<text v-if="data.order_status == 9">已退货</text>
							</view>
						</view>

						<view class="disflex orditem" v-for="(item, i) in data.goods_data" :key="i">
							<view class="simgb"><image class="shopimg" :src="item.cover" mode=""></image></view>
							<view class="shopintro boxsizing flxe-1">
								<view class="shocon disflex">
									<view class="shopname line1">{{ item.goods_name }}</view>
									<view class="">
										<!-- <view class="prices"><text class="symbol">￥</text>{{ item.goods_price }}</view> -->
										<view class="saleNum">
											<text class="fhao">x</text>
											{{ item.goods_num }}
										</view>
									</view>
								</view>
								<view class="guige">
									<view class="left bti line1" v-if="item.goods_attr_name">规格：{{item.goods_attr_name}}</view>
									<view class="right btn" v-if="data.order_status == 4" @click="jumporderdetail(data, item.goods_id)">去评价</view>
									<view class="btn right" @click="tosale(data, item.goods_id)" v-if="data.order_status == 2 || data.order_status == 3">售后</view>
								</view>
								<view class="goods-type" v-if="data.order_type==3">
									预售
								</view>
								<view class="goods-type" v-if="data.order_type==4">
									秒杀
								</view>
								<view class="goods-type" v-if="data.order_type==2">
									拼团
								</view>
								<view class="prices"><text class="symbol">￥</text>{{ item.goods_price }}</view>
							</view>
						</view>

						<view class="calcAllpr disflex">
							<view class="yunfei">运费：<text class="symbol">￥</text> <text class="yunfeiprice">{{ data.freightprice }}</text></view>
							<!-- 
							<view class="have-tail disFlex" v-if="orderType == 3 && data.order_type == 3 && data.is_tail_money == 0">
								<view>
									<view>
										<text class="heji">已付定金:</text>
										<text class="price">￥{{ readyMoney}}</text>
									</view>
									<view>
										<text class="heji">尾款:</text>
										<text class="price">￥{{ tailMoney }}</text>
									</view>
								</view>
								
							</view> -->
							<view>
								<!-- <text class="num" v-if="data.goods_data">共{{ data.goods_data.length}}种商品</text> -->
								<text class="heji">合计:</text>
								<text class="price"><text class="symbol">￥</text>{{ data.totalprice }}</text>
								
							</view>
						</view>
						
						<view class="useropart">
							<view class="btn right active" @click="jumporderdetail(data)" v-if="data.order_status == 1&&data.paytype != 2">去付款</view>
							<view class="btn right active" @click="tiSureorder(data, 1)" v-if="data.order_status == 2 ">提醒发货</view>
							<view class="btn right active" @click="tiSureorder(data, 1)" v-else-if="data.order_status == 2&&data.order_type == 3 ">提醒发货</view>
							<view class="btn right active" @click="show('QSPopupshow',data)" v-if="data.order_status == 3">确认收货</view>
							<view class="btn right" @click="jumporderwuliu(data)" v-if="data.order_status == 3">查看物流</view>
							<view class="btn right active" @click="jumporderdetail(data)" v-if="orderType == 2&&data.paytype==2 && data.order_type == 3 && data.is_tail_money == 0">支付尾款</view>
							<view class="btn right" @click="calceOrder(data)" v-if="data.order_status == 1">取消订单</view>
							<view class="btn right" @click="jumporderdetail(data)" v-if="data.order_status == 2||data.order_status == 3">查看详情</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无数据~</view>
			</view>
			<!--售后-->
			<view class="orderxq-wrap" v-if="orderType == 6">
				<view v-if="serviceLists.length > 0">
					<view class="order-item boxsizing" v-for="(data, index) in serviceLists" :key="index">
						<view class="timest">
							<view class="left time">{{ data.create_time }}</view>
							<view class="right status">
								<view v-if="data.status == 3" class="redcircle"></view>
								<text v-if="data.store_manner == 0">等待商家的回复</text>
								<text v-if="data.store_manner == 1">商家同意售后</text>
								<text v-if="data.store_manner == -1">商家不同意售后</text>
							</view>
						</view>
						<view class="disflex orditem">
							<view class="simgb"><image class="shopimg" :src="data.cover" mode=""></image></view>
							<view class="shopintro boxsizing flxe-1">
								<view class="shocon disflex">
									<view class=" shopname line1">{{ data.goods_name }}</view>
									<view class="">
										<view class="prices"><text class="symbol">￥</text>{{ data.goods_price }}</view>
										<view class="saleNum">
											<text class="fhao">x</text>
											{{ data.goods_num }}
										</view>
									</view>
								</view>
								<view class="guige">
									<view class="left guige-txt line1">规格：{{ data.goods_attr_name }}</view>
								</view>
								<!-- <view class="yunfei" >
									<view class="left">
										运费
									</view>
									<view class="right yufeip">
										￥0
									</view>
								</view> -->
							</view>
						</view>
						<view class="calcAllpr disflex">
							<view class="yunfei">运费：<text class="symbol">￥</text><text class="yunfeiprice">{{ data.freightprice }}</text></view>
							<view>
								<!-- <text class="num" v-if="data.goods_num">共{{data.goods_num}}件商品</text> -->
								
								<text class="heji">合计:</text>
								<text class="price"><text class="symbol">￥</text>{{ data.totalprice }}</text>
							</view>
						</view>
						<view class="useropart">
							<view class="btn right active" v-if="data.status == 1" @click="jumpSale(data)">申请中</view>
							<view class="btn right active" v-if="data.status == 2" @click="jumpSale(data)">退款中</view>
							<view class="btn right active" v-if="data.status == 3" @click="jumpSale(data)">已退款</view>
							<view class="btn right active" v-if="data.status == 4" @click="jumpSale(data)">退款成功</view>
							<view class="btn right active" v-if="data.status == 5" @click="jumpSale(data)">退款失败</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无数据~</view>
			</view>
		 </view>
		 <!-- 确认收货弹窗 -->
		 <QSPopup ref="QSPopupshow">
		 	<view class="content-del">
		 		<view class="del-text scale-1px-bottom">
		 			<view class="del-text2">
		 				是否确认收货？
		 			</view>
		 			
		 		</view>
		 		<view class="del-btn">
		 			<view class="del-btn-no" @tap="hides('QSPopupshow')">
		 				取消
		 			</view>
		 			<view class="del-btn-yes" @tap="showBtn">
		 				确认
		 			</view>
		 		</view>
		 	</view>
		 </QSPopup>
	</view>
</template>
<script>
import http from '@/api/http.js';
import QSPopup from '@/components/QS-popup/QS-popup.vue';
export default {
	components: {QSPopup},
	data() {
		return {
			orderType: 1,
			page:1,//普通列表
			page2:1,//售后列表
			orderlist: [],
			serviceLists: [],
			orderdata:{}
		};
	},
	onLoad(option) {
		this.orderType = option.type;
		this.loadOrder(this.orderType);
	},
	onShow() {
		this.loadOrder(this.orderType);
	},
	onReachBottom() {
		if (this.orderType == 6) {
			this.getNewSale()
			
		} else {
			this.getNewList(this.orderType)
		}
	},
	methods: {
		show(ref,data) {
			this.$refs[ref].show();
			this.orderdata = data
		},
		hides(ref){
			this.$refs[ref].hide()
		},
		showBtn(){
			let data = this.orderdata
			this.hides('QSPopupshow')
			this.tiSureorder(data, 2)
		},
		toMine(){
			uni.switchTab({
				url:'/pages/mine/mine'
			})
		},
		jumpSale(data) {
			uni.navigateTo({
				url: '/pages/mine/order-aftersale?service_id=' + data.id 
			});
		},
		tosale(item, good_id) {
			if (item.order_status == 2 || item.order_status == 3) {
				uni.navigateTo({
					url: '/pages/mine/applysale?orderid=' + item.id + '&good_id=' + good_id
				});
			}
		},
		jumporderwuliu(item){
			uni.navigateTo({
				url: '/pages/mine/order-daishouh?id=' + item.id + '&wuliu=1' + '&ordernum=' + item.ordernum
			});
		},
		jumporderdetail(item, good_id) {
			//1为待付款 2为待发货 3为待确认收货 4为待评价（已完成） 5为已评价（已完成）  6为退款中
			//7为已退款（用户确认退款成功后对应待评价或已完成）
			//8为退货中  9为已退货  （后台确认退货成功后对应退款中）
			if (item.order_status == 1) {
				
				uni.navigateTo({
					url: '/pages/mine/order-daifuk?id=' + item.id
				});
			} else if (item.order_status == 2) {
				uni.navigateTo({
					url: '/pages/mine/order-daifahuo?id=' + item.id
				});
			} else if (item.order_status == 3) {
				
				uni.navigateTo({
					url: '/pages/mine/order-daishouh?id=' + item.id
				});
			} else if (item.order_status == 4) {
				uni.navigateTo({
					url: '/pages/mine/order-pingjia?ordernum=' + item.ordernum + '&good_id=' + good_id
				});
			} else if (item.order_status == 6) {
				uni.navigateTo({
					url: '/pages/mine/order-aftersale?id=' + item.id
				});
			}
		},
		//取消订单
		calceOrder(item) {
			let data = {
				token: uni.getStorageSync('token'),
				order_id:item.id
			};
			let that = this;
			uni.showModal({
				title: '提示',
				content: '是否取消订单?',
				success(re) {
					 if (re.confirm) {
						console.log('用户点击确定');
						http('/api/Order/delOrder', 'post', data).then(res => {
							if(res.data.status== '200'){
								that.$util.showToast('删除成功!');
								that.loadOrder(2);
								
							}else{
								that.$util.showToast(res.data.msg);
							}
						});
					} else if (re.cancel) {
						console.log('用户点击取消');
						
					}
					// http('/api/Order/delOrder', 'post', data).then(res => {
					// 	if(res.data.msg==200){
					// 		that.$util.showToast('删除成功!');
					// 		that.loadOrder(2);
					// 	}else{
					// 		console.log(res.data.msg);
					// 		that.$util.showToast(res.data.msg);
					// 	}
					// });
				}
			});
		},
		//1提醒发货 2确认收货
		tiSureorder(item, type) {
			//type: 1提醒发货 2确认收货
			let that = this
			let data = {
				type: type,
				token: uni.getStorageSync('token'),
				ordernum: item.ordernum
			};
			http('/api/user/deliverGoodsStatus ', 'post', data).then(res => {  
				// console.log(res.data.data.bannerList.data)
				if (type == 1) {
					that.$util.showToast('提醒成功');
				} else if (type == 2) {
					that.$util.showToast('确认收货');
					setTimeout(()=>{
						that.loadOrder(4);
					},1000)
				}
			});
		},
		loadOrder(type) {
			this.orderType = type;
			this.page =1
			if (type == 6) {
				this.getsale();
				
			} else {
				this.getorderList(type);
			}
		},
		//获取售后列表
		getsale() {
			let data = {
				token: uni.getStorageSync('token'),
				page:1
			};
			this.$util.showLoading('请稍后');
			this.orderlist = [];
			this.serviceLists = [];
			http('/api/AfterSale/serviceLists', 'get', data).then(res => {
				// console.log(res.data.data.bannerList.data)
				this.serviceLists = res.data.data.serviceLists.data;
				this.$util.hideLoading();
				console.log(this.serviceLists)
			});
		},
		getorderList(type) {
			let data = {
				type: type,
				token: uni.getStorageSync('token'),
				page:1
			};
			this.$util.showLoading('请稍后');
			this.orderlist = [];
			this.serviceLists = [];
			http('/api/Order/order_list', 'post', data).then(res => {
				// console.log(res.data.data.bannerList.data)
				this.orderlist = res.data.data.data;
				
				console.log(res);
				this.$util.hideLoading();
			});
		},
		getNewList(type){
			let data = {
				token:uni.getStorageSync('token'),
				page:this.page+1,
				type:type
			}
			http('/api/Order/order_list','post',data).then(res=>{
				
				if(res.data.status=='400'){
					this.$util.showToast(res.data.msg)
					return
				}
				
				if(this.page > res.data.data.last_page){
					// this.$util.showToast('没有更多了')
					return false
				}
				this.page++
				this.orderlist = this.orderlist.concat(res.data.data.data)
			})
		},
		getNewSale(){
			let data = {
				token:uni.getStorageSync('token'),
				page:this.page2+1
			}
			http('/api/AfterSale/serviceLists','post',data).then(res=>{
				
				if(res.data.status=='400'){
					this.$util.showToast(res.data.msg)
					return
				}
				
				if(this.page2 > res.data.data.serviceLists.last_page){
					// this.$util.showToast('没有更多了')
					return false
				}
				this.page2++
				this.serviceLists = this.serviceLists.concat(res.data.data.serviceLists.data)
			})
		},
	}
};
</script>

<style lang="scss">
page {
	background-color: #f2f2f5;
}
.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background:#fff;
		.index-header {
			height: 146upx;
			padding: 0 30upx;
			padding-top: 70upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #000;
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
				top: 80upx;
			}
		}
	}
	.blank {
		width: 100%;
		height: 146upx;
	}
	.ordertab-fill{
		position: fixed;
		width: 100%;
		left: 0;
		top: 146upx;
		height:46upx ;
		background-color: #f2f2f5;
		z-index: 7;
	}
.ordertab {
	padding: 0 30upx;
	box-sizing: border-box;
	position: fixed;
	width: 100%;
	left: 0;
	top: 176upx;
	// #ifdef APP-PLUS */
	// top: 0;
	// /* #endif
	background-color: #f2f2f5;
	z-index: 7;
	justify-content: space-between;
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

.useropart {
	clear: both;
	overflow: hidden;
	.btn {
		width: 160upx;
		margin: 0 20upx;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		border-radius: 18px;
		border: 1px solid #bbbbbb;
		color: #bbbbbb;
		margin-top: 30upx;
		&.active {
			color: #fb4142;
			border-color: #fb4142;
		}
	}
}
.calcAllpr {
	overflow: hidden;
	justify-content: space-between;
	align-items: flex-end;
	.yunfei {
		font-size: 28upx;
		color: #000000;
		
		.yunfeiprice{
			font-weight: bold;
		}
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
		font-size: 32upx;
		font-weight: bold;
	}
	.have-tail{
		
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
		margin-bottom: 20upx;
	}
	.yunfei {
		.yufeip {
			color: #aaaaaa;
			font-size: 30upx;
		}
		.yunfeiprice{
			font-weight: bold;
		}
	}
	.shopintro {
		padding-left: 26upx;
		position: relative;
	}
	.goods-type{
		position: absolute;
		left: 28upx;
		top: 35%;
		font-size: 24upx;
		color: #00a0e9;
		border: 1px solid #00a0e9;
		display: inline-block;
		padding: 0 6upx;
		margin-top: 8upx;
	}
	.guige {
		color: #939393;
		font-size: 22upx;
		overflow: hidden;
		margin-top: -4upx;
		.bti {
			font-size: 24upx;
			width: 300upx;
			color: #939393;
		}
		.btn {
			padding: 0 20upx;
			height: 50upx;
			border: 1px solid #fb4142;
			border-radius: 20px;
			line-height: 50upx;
			color: #fb4142;
			border-color: #fb4142;
			margin-top: 88upx;
		}
	}
	.guige-txt{
		font-size: 24upx;
		color: #939393;
		width: 300upx;
	}
	.prices {
		color: #000000;
		font-size: 28upx;
		line-height: 28upx;
		position: absolute;
		left: 26upx;
		bottom: 0;
		font-weight: bold;
	}
	.symbol{
		font-size: 24upx;
		font-weight: bold;
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
		color: #333;
		font-size: 32upx;
		width: 300upx;
		height: 32upx;
		line-height: 32upx;
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
		position: relative;
	}
	.redcircle{
		width: 16upx;
		height: 16upx;
		border-radius: 50%;
		background-color:  #fb4142;
		position: absolute;
		left: -40upx;
		top: 12upx;
	}
}
.myorder-wrap {
	padding: 30upx;
	margin-top: 60upx;
	.tab-item {
		text-align: center;
		height: 90upx;
		line-height: 90upx;
		text {
			border-bottom: 1px solid #f2f2f5;
			padding-bottom: 12upx;
			font-size: 28upx;
		}
		&.active {
			color: #fb4142;

			text {
				border-color: #fb4142;
				font-size: 30upx;
			}
		}
	}
}
.content-del{
			height: 300upx;
			width: 670upx;
			background-color: white;
			border-radius: 20upx;
			.del-text{
				padding:60upx 20upx;
				height: 200upx;
				box-sizing: border-box;
				.del-text2{
					font-size: 36upx;
					text-align: center;
					margin-top: 20upx;
					color: #333;
				}
				.del-text3{
					color: #999;
					text-align: center;
					margin-top: 20upx;
					
				}
			}
			.del-btn{
				display: flex;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				.del-btn-no{
					border-right: 1px solid #e5e5e5;
					color: #333;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
				.del-btn-yes{
					color: #fb4142;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
			}
		}
</style>
