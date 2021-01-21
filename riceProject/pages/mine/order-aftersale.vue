<template>
	<view class="pay-wraps">
		<view class="header-wrap">
			<view class="index-header">
				售后
				<!-- <image class="back-icon" src="/static/back-black.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-black.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		
		<view class="aftersale">
			<view class="tkbt">
				<!--//1申请中 2退款中 3已退款 4退款成功 5退款失败 -1删除-->
				<text v-if="orderinfo.status==1">申请中</text>
				<text v-if="orderinfo.status==2">退款中</text>
				<text v-if="orderinfo.status==3">已退款</text>
				<text v-if="orderinfo.status==4">退款成功</text>
				<text v-if="orderinfo.status==5">退款失败</text>
			</view>
			<view class="paytime">
				{{orderinfo.create_time}}
			</view>
		</view>
		<view class="pay-main">
			<view class="tuijine boxsizing">
				<view class="pitem" :class="{'border_bottom':orderinfo.status==4}">
					<view class="left">
						退款金额
					</view>
					<view class="right" style="color: #ec614a;">
						<text style="font-size: 24upx;">￥</text>{{orderinfo.totalprice}}
					</view>
				</view>
				<view class="pitem" v-if="orderinfo.status==4">
					<view class="left">
						退回到微信账户
					</view>
					<view class="right" style="color: #ec614a;">
						<text style="font-size: 24upx;">￥</text>{{orderinfo.totalprice}}
					</view>
				</view>
			</view>
			<!-- 订单项 -->
			<view class="pay-item">
				<view class="pay-title">
					订单信息
				</view>
				<view class="pay-text">
					<view class="text-img">
						<image :src="orderinfo.cover"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name line1">
							{{orderinfo.goods_name}}
						</view>
						<view class="intr-norm">
							<view class="intr-norm1 line1">
								规格:{{orderinfo.goods_attr_name}}
							</view>
						</view>
						<view class="text-prices">
							<text style="font-size: 24upx;">￥</text>{{orderinfo.goods_price}}
						</view>
					</view>
					<view class="text-price">
						
						<view class="text-num">
							x{{orderinfo.goods_num}}
						</view>
					</view>
				</view>
				<!-- 运费 -->
				<view class="pay-fare pay-common">
					<view class="pay-left-common">运费</view>
					<view class="pay-right-common">总计 ￥{{orderinfo.freightprice}}</view>
				</view>
				<!-- <view class="pay-point pay-common">
					<view class="pay-left-common">使用积分</view>
					<view class="pay-right-common">使用积分抵扣2元</view>
					<image :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image>
				</view> -->
				<view class="pay-card pay-common" v-if="orderinfo.order_type==1||orderinfo.order_type==3">
					<view class="pay-left-common">优惠券</view>
					<view class="pay-right-common">{{orderinfo.couprice}}</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.type==1">
					<view class="pay-left-common">退款方式</view>
					<view class="pay-right-common">退货退款</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.type==2">
					<view class="pay-left-common">退款方式</view>
					<view class="pay-right-common">仅退款</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">退款原因</view>
					<view class="pay-right-common">{{orderinfo.reason}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">申请时间</view>
					<view class="pay-right-common">{{orderinfo.create_time}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">订单编号</view>
					<view class="pay-right-common">{{orderinfo.ordernum}}</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.return_goods_num">
					<view class="pay-left-common">物流订单</view>
					<view class="pay-right-common">{{orderinfo.return_goods_num}}</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.explain">
					<view class="pay-left-common">备注</view>
					<view class="pay-right-common" v-if="orderinfo.explain">{{orderinfo.explain}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">商家态度</view>
					<view class="pay-right-common" v-if="orderinfo.store_manner==0">等待商家回复</view>
					<view class="pay-right-common" v-if="orderinfo.store_manner==1">商家已同意</view>
					<view class="pay-right-common" v-if="orderinfo.store_manner== -1">商家未同意</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.store_manner== -1">
					<view class="pay-left-common">原因</view>
					<view class="pay-right-common">{{orderinfo.store_cause}}</view>
				</view>
				<!--申请状态为退货和退款中-->
				<view class="pay-remarks pay-common" v-if="orderinfo.type==1&&orderinfo.status==2">
					<view class="pay-left-common">退款物流单号</view>
					<view class="pay-right-common"><input type="text" v-model="return_num" placeholder="请输入物流订单" value="" /></view>
				</view>
				<view class="pay-subtotal">
					
					<text class="subtotal-num margingRight20">共{{orderinfo.goods_num || 1}}件</text>
					<text>小计：</text>
					<!-- actprice -->
					<text class="subtotal-price">￥{{orderinfo.totalprice}}</text>
				</view>
			</view>
			
		</view>
		<!--申请状态为退货 type==1 和  退款中status==2-->
		<!-- status   1申请中 2退款中 3已退款 4退款成功 5退款失败 -1删除 -->
		<view class="pay-ffooter" @click="putwuliuorder" v-if="orderinfo.type==1&&orderinfo.status==2">
			确认
		</view>
		<!--申请状态为退款 type==2 和  已退款status==3 -->
		<view class="pay-ffooter" @click="sureorder" v-if="orderinfo.type==2&&orderinfo.status==3">
			确认
		</view>
		<view class="pay-ffooter" @click="deleteOrder"  v-if="orderinfo.status==4">
			删除订单
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components: {QSPopup},
		data() {
			return {
				//  `status` int(1) DEFAULT '1' COMMENT '1申请中 2退款中 3已退款 4退款成功 5退款失败 -1删除',
				orderinfo:{},
				pointSelect:false,
				service_id:'',
				return_num:'',
				chooseList:[
					{name:'支付宝支付',src:'/static/zfb.png'},
					{name:'微信支付',src:'/static/wx.png'},
					{name:'银联云闪付',src:'/static/ysf.png'},
					{name:'余额支付',src:'/static/ye.png'},
				],
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png'
			}
		},
		onLoad(option) {
			this.service_id = option.service_id;
			this.getorder(this.service_id);
		},
		// onBackPress() {
		// 	uni.navigateTo({
		// 		url:'/pages/mine/myorderlist?type=6'
		// 	})
		// },
		methods:{
			toMine(){
				uni.navigateTo({
						url:'/pages/mine/myorderlist?type=6'
					})
			},
			deleteOrder(){
				let data = {
					service_id:this.service_id,
					token:uni.getStorageSync('token')
				};
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除订单',
					success: function (res) {
						if (res.confirm) {
							http('/api/AfterSale/delService','post',data).then(res=>{
								if(res.data.status==200){
									that.$util.hideLoading();
									that.$util.showToast('删除成功!');
									setTimeout(()=>{
										uni.navigateTo({
											url:'/pages/mine/myorderlist?type=6'
										})
									},1400)
								}else{
									this.$util.showToast(res.data.msg);
								}
							})
							
						}else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			sureorder(){
				let data = {
					service_id:this.service_id,
					token:uni.getStorageSync('token')
				};
				http('/api/AfterSale/userDetermine','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					if(res.data.status==200){
						this.$util.hideLoading();
						this.$util.showToast('确认成功!');
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/mine/myorderlist?type=6'
							})
						},1400)
					}else{
						this.$util.showToast(res.data.msg);
					}
				})
			},
			putwuliuorder(){
				if(this.return_num.length==0){
					this.$util.showToast('请填写物流订单');
					return false;
				}
				let data = {
					service_id:this.service_id,
					token:uni.getStorageSync('token'),
					return_num:this.return_num
				};
				this.$util.showLoading('请稍后');
				http('/api/AfterSale/returnGoodsNum','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					if(res.data.status==200){
						this.$util.hideLoading();
						this.$util.showToast('确认成功!');
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/mine/myorderlist?type=6'
							})
						},1400)
					}else{
						this.$util.showToast(res.data.msg);
					}
					
				})
			},
			getorder(service_id){
				let data = {
					service_id:service_id,
					token:uni.getStorageSync('token'),
				};
				this.$util.showLoading('请稍后');
				http('/api/AfterSale/serviceInfo','get',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					this.orderinfo = res.data.data.service;
					console.log(this.orderinfo);
					this.$util.hideLoading();
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref){
				this.$refs[ref].hide()
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
			toAddress(){
				uni.navigateTo({
					url:'/pages/index/address/address'
				})
			},
			toChooseAddress(){
				uni.navigateTo({
					url:'/pages/index/address/chooseAddress'
				})
			}
		}
	}
</script>
<style lang="scss">
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
	.tuijine{
		margin-top: -100upx;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 5px;
		padding:10upx 24upx;
		margin-bottom: 40upx;
		.pitem{
			overflow: hidden;
			height: 80upx;
			line-height: 80upx;
		}
	}
	.aftersale{
		width:100%;
		height:297upx;
		background:linear-gradient(90deg,rgba(251,65,66,1) 0%,rgba(255,110,76,1) 100%);
		.tkbt{
			font-size: 36upx;
			color: #FEFEFE;
			padding-top: 50upx;
			margin-left: 40upx;
		}
		.paytime{
			font-size: 28upx;
			color: #FEFEFE;
			padding-top: 20upx;
			margin-left: 40upx;
		}
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
		height: 100%;
		bottom: 0;
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
			margin-bottom: 70upx;
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
					margin-left: -100upx;
					position: relative;
					.intr-name{
						font-size: 32upx;
					}
					.intr-norm{
						color: #aaaaaa;
						margin-top: -2upx;
						
						.intr-norm1{
							font-size: 24upx;
						}
						.intr-norm2{
							font-size: 24upx;
						}
					}
				}
				.text-price{
					
					.text-num{
						font-size: 24upx;
						color: #aaaaaa;
						text-align: right;
						letter-spacing: 5upx;
					}
				}
				.text-prices{
					color: #ec614a;
					position: absolute;
					left: 0;
					bottom: 0;
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
				height: 66upx;
				align-items: center;
				position: relative;
				.pay-left-common{
					font-size: 24upx;
					text-align: right;
					flex: 0 180upx;
				}
				.pay-right-common{
					font-size: 24upx;
					color: #aaaaaa;
					margin-left: 30upx;
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
</style>