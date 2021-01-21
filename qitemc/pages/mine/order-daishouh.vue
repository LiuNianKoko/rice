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
						{{orderinfo.address}} {{orderinfo.address_detail}}
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
							<view class="intr-norm1 line1">
								规格:{{data.goods_attr_name}}
							</view>
						</view>
					</view>
					<view class="text-price">
						<text class="symbol">￥</text>{{data.goods_price}}
						<view class="text-num">
							x{{data.goods_num}}
						</view>
					</view>
				</view>
				<view v-if="wuliu==1">
					<view v-if="logistics.length>0">
						<view class="logistics" v-for="(item,index) in logistics" :key="index">
							<view class="logistics-top">
								<view class="logistics-time">{{item.time}}</view>
								<view class="logistics-status">{{item.status}}</view>
							</view>
							<view>
								<view class="logistics-content">{{item.context}}</view>
							</view>
						</view>
					</view>
					<view v-else>
						<view class="wait-msg">
							等待信息更新
						</view>
					</view>
				</view>
				<!-- 运费 -->
				<view v-else>
					<view class="pay-fare pay-common">
						<view class="pay-left-common">运费</view>
						<view class="pay-right-common">总计 ￥{{orderinfo.freightprice}}</view>
					</view>
					<!-- <view class="pay-point pay-common">
						<view class="pay-left-common">使用积分</view>
						<view class="pay-right-common">使用积分抵扣2元</view>
						<image :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image>
					</view> -->
					<view class="pay-card pay-common" v-if="orderinfo.couprice">
						<view class="pay-left-common">现金券</view>
						<view class="pay-right-common">现金券抵扣{{orderinfo.couprice}}元</view>
					</view>
					<view class="pay-remarks pay-common">
						<view class="pay-left-common">订单编号</view>
						<view class="pay-right-common">{{orderinfo.ordernum}}</view>
					</view>
					<view class="pay-remarks pay-common">
						<view class="pay-left-common">物流订单</view>
						<view class="pay-right-common">{{orderinfo.disordernum}}</view>
					</view>
					<view class="pay-remarks pay-common" v-if="orderinfo.buycontent">
						<view class="pay-left-common">备注</view>
						<!-- <view class="pay-right-common" v-if="orderinfo.buycontent">{{orderinfo.buycontent}}</view> -->
						<view class="pay-right-common" v-html="orderinfo.buycontent"></view>
					</view>
					
					<view class="pay-subtotal">
						<!-- <text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text> -->
						<text>小计：</text>
						<text class="subtotal-price"><text class="symbol">￥</text>{{orderinfo.totalprice}}</text>
					</view>
					<view style="overflow: hidden;">
						<view class="pay-shouh" @click="tosale" >
							售后
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="pay-ffooter" @click="show('QSPopupshow')" v-if="wuliu==0">
			确认收货
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
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components: {QSPopup},
		data() {
			return {
				orderinfo:{},
				pointSelect:false,
				chooseList:[
					{name:'微信支付',src:'/static/wx.png',type:1},
					{name:'支付宝支付',src:'/static/zfb.png',type:2},
					{name:'银联云闪付',src:'/static/ysf.png',type:3},
					{name:'余额支付',src:'/static/ye.png',type:4},
				],
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				ordernum:'',
				goods_id:0,
				orderid:0,
				wuliu:0,	//1查看物流   0详情
				logistics:[],	//物流
			}
		},
		onLoad(option) {
			this.chooseSel();
			this.orderid = option.id;
			this.getorder(this.orderid);
			if(option.wuliu){
				this.wuliu = option.wuliu
				this.ordernum = option.ordernum
			}
		},
		onShow() {
			if(this.wuliu==1){
				setTimeout(()=>{
					this.getlogistics()
				})
			}
			
		},
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			showBtn(){
				this.hides('QSPopupshow')
				this.tiSureorder()
			},
			getorder(orderid){
				let data = {
					order_id:orderid,
					token:uni.getStorageSync('token'),
				};
				http('/api/Order/orderInfo','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					this.orderinfo = res.data.data;
					if(this.orderinfo.buycontent){
						let reg = new RegExp('\r','gi')
						this.orderinfo.buycontent = this.orderinfo.buycontent.replace(reg,'<br>')
					}
					this.ordernum = res.data.data.ordernum
					this.goods_id = res.data.data.goods_data[0].goods_id
					console.log(this.orderinfo);
				})
			},
			tiSureorder() {
				//type: 1提醒发货 2确认收货
				let that = this
				let data = {
					type: 2,
					token: uni.getStorageSync('token'),
					ordernum: that.ordernum
				};
				http('/api/user/deliverGoodsStatus','post',data).then(res => {
					
					that.$util.showToast('确认收货');
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/mine/mine'
						})
					},1000)
				});
			},
			tosale(){
				uni.navigateTo({
					url: '/pages/mine/applysale?orderid=' + this.orderid+ '&good_id=' + this.goods_id
				});
			},
			pointSelectTap(){
				this.pointSelect = !this.pointSelect
			},
			choose(type, indexs) {
				let that = this
				let cartList = that.chooseList.map((item, index) => {
					item.checked = false;
					
					if (indexs == index) {
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
			},
			getlogistics(){
				let that = this
				let data = {
					// num:"2019121010248995",
					num:that.ordernum
				}
				http('/api/Express/express','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						that.logistics = res.data.data
					}
				})
			}
		}
	}
</script>
<style lang="less">
	page{
		background-color: #F2F2F5;
	}
	.pay-shouh{
		width:180upx;
		margin-top: 30upx;
		height:66upx;
		line-height: 66upx;
		background:rgba(255,255,255,1);
		border:2px solid rgba(187,187,187,1);
		border-radius:33px;
		text-align: center;
		color: #BBBBBB;
		font-size: 28upx;
		float: right;
	}
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
						font-size: 28upx;
						margin-top: 2upx;
					}
					.intr-norm{
						color: #aaaaaa;
						margin-top: 2upx;
						
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
				// align-items: center;
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
	// 物流
	.wait-msg{
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.logistics{
		margin-top: 26upx;
		.logistics-top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12upx;
			.logistics-time{
				font-size: 24upx;
			}
			.logistics-status{
				font-size: 24upx;
				color: #aaaaaa;
			}
		}
		.logistics-content{
			font-size: 24upx;
		}
	}
	.pay-ffooter{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
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
					width: 30upx;
					height: 30upx;
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
	.symbol{
		font-size: 24upx;
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