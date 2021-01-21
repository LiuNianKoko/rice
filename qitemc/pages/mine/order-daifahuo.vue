<template>
	<view class="pay-wraps">
		<view class="pay-main">
			<!-- 订单页地址 -->
			<view class="pay-location disFlex">
				<view class="location-img">
					<!-- 定位 logo -->
					<image src="/static/location.png"></image>
				</view>
				<view class="location-main">
					<view class="location-person">
						{{orderinfo.address_name}}<text class="location-phone">{{orderinfo.address_phone}}</text>
					</view>
					<view class="location-text marginTop20">
						{{orderinfo.address}}{{orderinfo.address_detail}}
					</view>
				</view>
				
			</view>
			<!-- 订单项 -->
			<view class="pay-item">
				<view class="pay-title">
					订单信息
				</view>
				<view class="pay-text" v-for="(data,index) in orderinfo.goods_data" :key="index">
					<view class="text-img">
						<image :src="data.cover"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name line2">
							{{data.goods_name}}
						</view>
						<view class="intr-norm">
							<view class="intr-norm1">
								规格:{{data.goods_attr_name}}
							</view>
						</view>
					</view>
					<view class="text-price">
						<!-- {{goodsMoney}} -->
						<text class="symbol">￥</text>{{data.goods_price}}
						<view class="text-num">
							x{{data.goods_num}}
						</view>
					</view>
				</view>
				<!-- 运费 -->
				<view class="pay-fare pay-common">
					<view class="pay-left-common">运费</view>
					<view class="pay-right-common">总计 ￥{{orderinfo.freightprice}}</view>
				</view>
				<view class="pay-card pay-common" >
					<view class="pay-left-common">现金券</view>
					<!-- <view class="pay-right-common" :class="[orderinfo.order_type==3&&orderinfo.is_tail_money==0?'pay-right-witch':'']">现金券抵扣{{cashMoney}}元</view> -->
					<view class="pay-right-common">现金券抵扣{{cashMoney}}元</view>
				<!-- 	<image src="/static/to-right.png" @tap="show('QSPopupTicket')" v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0"></image> -->
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">订单编号</view>
					<view class="pay-right-common">{{orderinfo.ordernum}}</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.buycontent">
					<view class="pay-left-common">备注</view>
					<!-- <view class="pay-right-common" v-if="orderinfo.buycontent">{{orderinfo.buycontent}}</view> -->
					<view class="pay-right-common" v-html="orderinfo.buycontent"></view>
				</view>
				<!-- <view v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0">
					<view class="pay-subtotal">
						<text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text>
						<text>已付定金：</text>
						<text class="subtotal-price"><text class="symbol">￥</text>{{readyMoney}}</text>
					</view>
					<view class="pay-subtotal">
						<text>尾款金额：</text>
						<text class="subtotal-price"><text class="symbol">￥</text>{{tailMoney}}</text>
					</view>
				</view> -->
				<view>
					<view class="pay-subtotal">
						<!-- <text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text> -->
						<text>小计：</text>
						<text class="subtotal-price"><text class="symbol">￥</text>{{orderinfo.totalprice}}</text>
					</view>
				</view>
				
			</view>
			<!-- <view class="order-tips" v-if="orderinfo.order_type==3 &&orderinfo.is_tail_money==0">
				请于{{orderinfo.createtime}}前支付尾款，否则订单将取消
			</view> -->
		</view>
		
		<!-- <view class="pay-ffooter" v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0" @tap="show('QSPopupChoose')">
			支付尾款
		</view> -->
		<view class="pay-ffooter" @click="tipSend">
			提醒发货
		</view>
		<!-- 优惠券弹出 -->
		<QSPopup ref="QSPopupTicket" type="fadeInUp">
			<view class="ticket">
				<view class="ticket-main" v-if="cashList.length > 0">
					<view class="ticket-title">
						优惠券
						<image class="close-out" src="/static/out.png" @tap="hides('QSPopupTicket')"></image>
					</view>
					<view class="ticket-item" v-for="(item,i) in cashList" :key="i">
						<view class="ticket-space">
							<view class="ticket-price">
								￥<text>{{item.money}}</text>现金券
							</view>
							<text class="ticket-intr">
								订单金额满 {{item.at_least}} 可使用  \n  有效期{{item.start_time}} -- {{item.end_time}}
							</text>
						</view>
						<view class="ticket-select">
							<!-- <image class="select-img" :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image> -->
							<image class="select-img" :src="selectImg" @tap="selectedCash(item,i)" v-if="item.checked"></image>
							<image class="select-img" :src="unSelectImg" @tap="selectedCash(item,i)" v-else></image>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无优惠券~</view>
				<view class="sure-btn" @click="useCash">    
					确定
				</view>
			</view>
		</QSPopup>
		<!-- 选择支付 -->
		<QSPopup ref="QSPopupChoose" type="fadeInUp">
			<view class="choosepay">
				<view class="choose-title">
					支付订单
					<image src="/static/out.png" @tap="hides('QSPopupChoose')"></image>
				</view>
				<view class="choose-price">
					￥<text>{{tailMoney}}</text>
				</view>
				<view class="choose-item" v-for="(item,index) in chooseList" :key="index" @tap="choose(item,index)">
					<view class="choose-item-l">
						<image :src="item.src"></image>
						{{item.name}}
					</view>
					<view class="choose-item-r">
						<image class="select-img" :src="item.checked ? selectImg : unSelectImg" @tap="choose(item,index)"></image>
					</view>
				</view>
				<!-- <view class="choose-ye ">
					余额剩余
					<text class="choose-ye-price">
						￥<text>{{balances}}</text>
					</text>
				</view> -->
				<view class="sure-btn" @click="payOrder">
					确认支付
				</view>
			</view>
		</QSPopup>
		<!-- 支付成功 弹窗 -->
		<QSPopup ref="QSPopupSuccess">
			<view class="success">
				<image src="/static/pay-success.png"></image>
				支付成功
			</view>
		</QSPopup>
		<KeyboardPay v-if="isPay" :payMoney="tailMoney" :payTitle="cashTitle" :source="source" @payCode="getPayCode" @closeModal="closePayModal"></KeyboardPay>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import KeyboardPay from '@/components/pwdpay.vue';
	export default {
		components: {QSPopup,KeyboardPay},
		data() {
			return {
				payType:1,
				orderinfo:{},
				pointSelect:false,
				orderid:'',
				ordernum:'',
				chooseList:[
					{name:'微信支付',src:'/static/wx.png',type:1},
					{name:'支付宝支付',src:'/static/zfb.png',type:2},
					{name:'银联云闪付',src:'/static/ysf.png',type:3},
					// {name:'余额支付',src:'/static/ye.png',type:4},
				],
				cashTitle:'余额支付',
				balances:0,   // 余额
				source:'2',    // 1 提现   2 订单余额支付
				isSetPay:0,   // 0 未设置支付密码   1  设置了
				tailMoney:0,	//尾款
				goodsMoney:0,	//商品单价
				readyMoney:0,	//已支付
				isPay:false,
				couponId:0, 	// 优惠券id
				cashList:[],	// 优惠券
				cashMoney:0,	//
				num:0,
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				
			}
		},
		onLoad(option) {
			this.chooseSel();
			this.orderid = option.id;
			this.getorder(this.orderid);
			this.getCash()
		},
		methods:{
			closePayModal(){
				this.isPay = false;
			},
			
			getorder(orderid){
				let data = {
					order_id:orderid,
					token:uni.getStorageSync('token'),
				};
				this.$util.showLoading('请稍后');
				http('/api/Order/orderInfo','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					this.orderinfo = res.data.data;
					if(this.orderinfo.buycontent){
						let reg = new RegExp('\r','gi')
						this.orderinfo.buycontent = this.orderinfo.buycontent.replace(reg,'<br>')
					}
					this.ordernum = res.data.data.ordernum;
					let freightprice =parseFloat(res.data.data.freightprice) 
					// let totalMoney2 =parseFloat(res.data.data.goods_data[0].totalprice) 
					let tailPrice =parseFloat(res.data.data.goods_data[0].tail_price) //数据的   尾款
					let goodsPrice =parseFloat(res.data.data.goods_data[0].goods_price) //  已支付
					let num = parseInt(res.data.data.goods_data[0].goods_num) 	//数量
					this.goodsMoney = (tailPrice + goodsPrice).toFixed(2)
					this.readyMoney = (goodsPrice * num + freightprice ).toFixed(2)
					this.tailMoney = (tailPrice * num - this.cashMoney).toFixed(2)
					// this.tailMoney = (totalMoney2   - this.cashMoney).toFixed(2)
					// this.totalMoney = res.data.data.totalprice
					this.balances = res.data.data.userBalance
					console.log(this.orderinfo);
					this.$util.hideLoading();
				})
			},
			getCash(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/getCouponList','get',data).then(res=>{
					if(res.data.status == '200'){
						this.cashList = res.data.data.couponList
					}else{
						this.$util.showToast(res.data.message)
						return
					}
					console.log(res)
				})
			},
			useCash(){
				this.hides('QSPopupTicket')
				
			},
			selectedCash(item,i){
				let that = this
				let cartList = that.cashList.map((items, index) => {
					items.checked = false;
					
					if (i == index) {
						that.couponId = items.coupon_id
						that.cashMoney = parseFloat(items.money) 
						items.checked = true;
					}
					return items;
				});
				that.cashList = cartList;
				that.getorder(this.orderid)
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			// pointSelectTap(){
			// 	this.pointSelect = !this.pointSelect
			// },
			tipSend(){
					//type: 1提醒发货 2确认收货
				let data = {
					type: 1,
					token: uni.getStorageSync('token'),
					ordernum: this.orderinfo.ordernum
				};
				http('/api/user/deliverGoodsStatus','post',data).then(res => {  
					// console.log(res.data.data.bannerList.data)
					this.$util.showToast('提醒成功');
					
				});
				
			},
			choose(type, indexs) {
				let that = this
				let cartList = that.chooseList.map((item, index) => {
					item.checked = false;
					
					if (indexs == index) {
						this.payType = item.type
						item.checked = true;
					}
					return item;
				});
				that.chooseList = cartList;
			},
			chooseSel(){
				let cartList = this.chooseList.map((item, index) => {
					item.checked = false;
					if (index == 0) {
						item.checked = true;
					}
					return item;
				});
			}
		}
	}
</script>

<style lang="less">
	.order-tips{
		color: #FB4142;
		font-size: 30upx;
		text-align: center;
		margin-top: 60upx;
	}
	.pay-wraps{
		position: absolute;
		width: 100%;
		height: 92%;
		bottom: 100upx;
		background-color: #F2F2F5;
		overflow-y: auto;
	}
	.symbol{
		font-size: 24upx;
	}
	.pay-main{
		padding: 30upx;
		.pay-location{
			height:200upx;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			margin-bottom: 26upx;
			padding: 30upx 25upx;
			box-sizing: border-box;
			.location-img{
				image{
					width: 40upx;
					height: 40upx;
				}
			}
			.location-main{
				margin-left: 30upx;
				height: 130upx;
				.location-person{
					font-size: 32upx;
					.location-phone{
						font-size: 32upx;
						color: #aaa;
						margin-left: 32upx;
					}
				}
				.location-text{
					width: 380upx;
					font-size: 24upx;
				}
			}
			.location-edit{
				image{
					width: 26upx;
					height: 26upx;
				}
			}
		}
		.pay-item{
			background:rgba(255,255,255,1);
			border-radius:20upx;
			padding: 40upx 30upx;
			box-sizing: border-box;
			margin-bottom: 20upx;
			.pay-title{
				font-size: 32upx;
				margin-bottom: 40upx;
			}
			.pay-text{
				display: flex;
				justify-content: space-between;
				margin-bottom: 72upx;
				.text-img{
					image{
						width: 180upx;
						height: 180upx;
					}
				}
				.text-intr{
					width: 240upx;
					margin-left: -30upx;
					.intr-name{
						font-size: 24upx;
					}
					.intr-norm{
						color: #aaaaaa;
						margin-top: 26upx;
						
						.intr-norm1{
							font-size: 24upx;
						}
						.intr-norm2{
							font-size: 24upx;
						}
					}
				}
				.text-price{
					color: #FB4142;
					.text-num{
						font-size: 24upx;
						color: #aaaaaa;
						text-align: right;
						letter-spacing: 5upx;
					}
				}
			}
			.pay-point{
				image{
					width: 36upx;
					height: 36upx;
					position: absolute;
					right: 2upx;
					top: 16upx;
				}
			}
			.pay-card{
				image{
					width: 24upx;
					height: 24upx;
					position: absolute;
					right:6upx;
					top: 22upx;
				}
			}
			.pay-common{
				display: flex;
				// height: 66upx;
				margin-top: 30upx;
				align-items: flex-start;
				position: relative;
				.pay-left-common{
					font-size: 24upx;
					// text-align: right;
					flex: 0 180upx;
				}
				.pay-right-common{
					font-size: 24upx;
					color: #aaaaaa;
					text-align: right;
					flex: 1;
					// margin-left: 30upx;
				}
				.pay-right-witch{
					margin-right: 60upx;
				}
			}
			.pay-subtotal{
				margin-top: 30upx;
				text-align: right;
				.subtotal-num{
					font-size: 24upx;
					color: #aaaaaa;
				}
				.subtotal-price{
					color: #FB4142;
				}
			}
		}
	}
	
	.pay-ffooter{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index:5;
		background-color: #FB4142;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
	}
	// 优惠券
	.ticket{
		width: 750upx;
		height: 900upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		position: relative;
		.ticket-main{
			padding: 40upx;
			padding-top: 100upx;
			box-sizing: border-box;
			position: absolute;
			top: 0;
			left: 0;
			overflow-y: auto;
			height: 800upx;
			width: 100%;
			.ticket-title{
				font-size: 40upx;
				text-align: center;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 1001;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				background-color: #fff;
				.close-out{
					position: absolute;
					right: 40upx;
					top: 34upx;
					width: 30upx;
					height: 30upx;
				}
			}
			.ticket-item{
				margin-bottom: 26upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.ticket-space{
					width:600upx;
					height:240upx;
					background:linear-gradient(90deg,rgba(251,65,66,1) 0%,rgba(255,110,76,1) 100%);
					border-radius:10upx;
					padding:20upx 40upx 30upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.ticket-price{
						color: #FCF2B2;
						font-size: 40upx;
						text{
							font-size: 72upx;
						}
					}
					.ticket-intr{
						color: #FCF2B2;
						font-size: 24upx;
					}
				}
				.ticket-select{
					position: relative;
					.select-img{
						width: 34upx;
						height: 34upx;
						position: absolute;
						right: 2upx;
						top: 2upx;
					}
				}
			}
		}
	}
	
	.sure-btn{
		width: 100%;
		height: 100upx;
		background:rgba(251,65,66,1);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		font-size: 40upx;
		color: #ffffff;
		line-height: 100upx;
		text-align: center
	}
	// 选择支付
	.choosepay{
		width: 750upx;
		height: 900upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		padding: 40upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
		position: relative;
		.choose-title{
			height: 50upx;
			font-size: 40upx;
			text-align: center;
			line-height: 50upx;
			position: relative;
			image{
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 0;
				top: 12upx;
			}
		}
		.choose-price{
			font-size: 40upx;
			text-align: center;
			height: 200upx;
			line-height: 200upx;
			text{
				font-size: 60upx;
			}
		}
		.choose-item{
			height: 120upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #f2f2f5;
			.choose-item-l{
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #aaaaaa;
				image{
					width: 56upx;
					height: 56upx;
					margin-right: 32upx;
				}
			}
			.choose-item-r{
				.select-img{
					width: 34upx;
					height: 34upx;
				}
				
			}
		}
		.choose-ye{
			position: absolute;
			top: 692upx;
			right: 120upx;
			font-size: 24upx;
			.choose-ye-price{
				color: #FB4142;
				text{
					font-size: 32upx;
				}
			}
		
		}
	}
	
	
	// 支付成功
	.success{
		width: 500upx;
		height: 300upx;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx;
		box-sizing: border-box;
		font-size: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		image{
			width: 56upx;
			height: 56upx;
			margin-right: 22upx;
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
</style>