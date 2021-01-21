<template>
	<view class="content">
		<cu-custom bgColor="bgF4" :isBack="true"><block slot="backText"></block><block slot="content">提交订单</block></cu-custom>
		<view class="wrap">
			<view class="addr-wrap disBetween" @click="toAddr">
				<image :src="imgUrl + 'lg-local-white.png'" class="local-y"></image>
				<view class="addr-main flex1 fontBold" v-if="address">
					
					<view class="font26 marginTop10">
						{{address}}
					</view>
				</view>
				<view class="addr-main flex1 fontBold" v-else>
					<view class="font30">
						请添加收货地址
					</view>
				</view>
				<image src="/static/right-white.png" class="right-gr"></image>
			</view>
			
			<view class="goods-wrap">
				<view class="goods-shopping disBetween">
					<view class="font26 fontBold">
						购物清单
					</view>
					<image src="/static/right-gray.png" class="title-right"></image>
				</view>
				<view class="goods disFlex" v-for="(item,index) in info.goods_order" :key="index">
					<view class="goods-img-box">
						<image :src="item.thumb_url" class="goods-img"></image>
					</view>
					<view class="goods-text">
						<view class="font26 fontBold line2">
							{{item.good_name || ''}}
						</view>
						<view class="line2 font22 color-gray">
							{{item.goods_attr_str || ''}}
						</view>
						<view class="disBetween paddingRight20">
							<view class="color-pink fontBold">
								<text class="font24">￥</text>
								<text class="font34">{{item.price || ''}}</text>
								<text class=" color-black" v-if="item.unit">/</text>
								<text class="color-black font24" v-if="item.num > 1 && item.unit">{{item.num || ''}}</text>
								<text class="color-black font24">{{item.unit || ''}}</text>
							</view>
							<view class="fontBold">
								<text>*</text>
								<text class="font30">{{item.goods_num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="pay-wrap">
				<view class="pay-item disBetween">
					<view class="font32 fontBold">
						支付方式
					</view>
					<view class="disAlignCenter">
						<view class="pay-intr">
							微信支付
						</view>
						<image src="/static/right-gray.png" class="pay-right"></image>
					</view>
				</view>
				<view class="pay-item disBetween">
					<view class="font32 fontBold">
						配送方式：<text style="color: #313131;font-weight: normal;">普通配送</text>
					</view>
					<view class="disAlignCenter">
						<view class="pay-intr" v-if="type == 1">
							物流 包邮
						</view>
						<view class="pay-intr" v-if="type == 2">
							快递 包邮
						</view>
						<image src="/static/right-gray.png" class="pay-right"></image>
					</view>
				</view>
				<view class="pay-item disBetween" @click="show('QSPop')" v-if="couponList.length > 0">
					<view class="font32 fontBold">
						优惠券
					</view>
					<view class="disAlignCenter">
						<view class="pay-intr">
							{{couponIntr || ''}}
						</view>
						<image src="/static/right-gray.png" class="pay-right"></image>
					</view>
				</view>
			</view>
			<view class="font32 fontBold marginBottom15">
				订单备注
			</view>
			<view class="remark-wrap">
				<textarea class="remark" placeholder="选填，请先与商家协商" v-model="remark" :focus="!showMark" @blur="showMarkCan" v-if="!showMark"/>
				<view class="remark" v-if="showMark" @click="showMarkCan">
					{{remark || '选填，请先与商家协商'}}
				</view>
			</view>
			<view class="disBetween price-desc fontBold">
				<view class="font32 ">
					商品金额
				</view>
				<view class="">
					<text class="font22">￥</text>
					<text class="font30">{{info.goods_price}}</text>
				</view>
			</view>
			<view class="disBetween price-desc fontBold">
				<view class="font32 ">
					运费
				</view>
				<view class="">
					<text class="font22">￥</text>
					<text class="font30">{{info.freight}}</text>
				</view>
			</view>
			<view class="disBetween price-desc fontBold" v-if="info.coupon_price">
				<view class="font32 ">
					优惠金额
				</view>
				<view class="">
					<text class="font22">￥</text>
					<text class="font30">{{info.coupon_price}}</text>
				</view>
			</view>
			<view class="disBetween price-desc fontBold" v-if="type == 2">
				<view class="font32 ">
					应付定金
				</view>
				<view class="">
					<text class="font22">￥</text>
					<text class="font30">{{info.deposit}}</text>
				</view>
			</view>
			<view class="disBetween price-desc fontBold" v-if="type == 2">
				<view class="font32 ">
					应付尾款
				</view>
				<view class="">
					<text class="font22">￥</text>
					<text class="font30">{{info.balance}}</text>
				</view>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="bot-bar">
			<view class="total-price" v-if="type == 1">
				<text>总计：</text>
				<text class="font24 color-pink fontBold">￥</text>
				<text class="font36 color-pink fontBold">{{info.total_price}}</text>
			</view>
			<view class="total-price" v-else>
				<text>支付金额：</text>
				<text class="font24 color-pink fontBold">￥</text>
				<text class="font36 color-pink fontBold">{{info.deposit}}</text>
			</view>
			<view class="bot-btn disCenter" @click="toPayStatus">
				提交订单
			</view>
		</view>
		
		<QSPopup ref="QSPop" type="fadeInUp">
			<view class="coupon-choose">
				<view class="color-pink fontBold coupon-title">
					可使用优惠
				</view>
				<view class="coupon-wrap" v-if="couponList.length > 0">
					<scroll-view scroll-y="true" class="coupon-scroll">
						<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
							<image :src="imgUrl + 'lg-coupon-1.png'" class="lg-coupon-bg"></image>
							<view class="coupon-main disBetween">
								<view class="price-wrap disCenter">
									<view class="price" v-if="item.coupon.type != 2">
										{{parseFloat(item.coupon.dec_price)}}
										<view class="symbol" >
											￥
										</view>
									</view>
									<view class="price" v-else>
										{{item.coupon.discount}}
										<view class="symbol">
											折
										</view>
									</view>
								</view>
								<view class="coupon-line">
									
								</view>
								<view class="coupon-txt">
									<view class="line1">
										{{item.tips}}
									</view>
									<view class="">
										{{item.use_desc}}
									</view>
									<view class="font18 coupon-txt-and">
										未付款与退款订单不做返还
									</view>
								</view>
							</view>
							<view class="btn" @click="chooseCoupon(item)">
								<image :src="imgUrl + 'lg-sel-w.png'" class="lg-sel-w" v-if="couponId != item.id"></image>
								<image :src="imgUrl + 'lg-seled-w.png'" class="lg-sel-w" v-if="couponId == item.id"></image>
							</view>
						</view>
					</scroll-view>
					
					<view class="disAlignCenter paddingTop20 paddingBottom20 use-coupon" @click="changeUse">
						<image :src="imgUrl + 'lg-sel.png'" class="lg-sel" v-if="useCoupon"></image>
						<image :src="imgUrl + 'lg-seled.png'" class="lg-sel" v-if="!useCoupon"></image>
						<view class="">
							不使用优惠券
						</view>
					</view>
				</view>
				
				<view class="">
					
				</view>
				<view class="coupon-intr">
					优惠券不可叠加使用
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp()
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				address:'',
				addr:{},
				info:{},
				remark:'',//备注
				showMark:true,
				useCoupon:true,//是否使用优惠券
				couponList:[],
				couponId:0,
				couponIntr:'',//优惠券介绍
				ordernum:'',
				id:'',//订单id
				type:1,//1入仓模式   2定金模式
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.type = option.type
			this.ordernum = option.ordernum
			this.getInfo()
		},
		onShow() {
			let addr = this.$store.state.address
			if(addr.id){
				this.addr = addr
				this.address = this.addr.province_city_district + this.addr.address
			}
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			showMarkCan(){
				this.showMark = !this.showMark
			},
			
			toPayStatus(){
				if(this.address == ''){
					this.$util.showToast('请填写收货信息')
					return
				}
				this.$util.showLoading('正在获取订单')
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					desc:this.remark,
					ordernum:this.ordernum,
					address_id:this.addr.id,
					pay_address:1
				}
				http('/api/order/pay_order', 'post',data).then(res => {
					this.$util.hideLoading()
					if(res.code == 200){
						uni.showToast({
							title:'生成订单成功',
							icon:'none',
							duration:800
						})
						this.jumpPaysmall(res.data)
						// setTimeout(()=>{
						// 	uni.redirectTo({
						// 		url:'/pages/index/payStatus'
						// 	})
						// },1500)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1000
						})
					}
				})
				
			},
			jumpPaysmall(resdata){   // 微信 小程序支付
				console.log(resdata)
				
				let that = this
				that.$util.showLoading()
				wx.requestPayment({
					'timeStamp': resdata.time,
					'nonceStr': resdata.nonce_str,
					'package': resdata.package,
					'signType': 'MD5',
					'paySign': resdata.sign,
					success:function(res){
						that.$util.hideLoading()
						
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/index/payStatus?id=' + that.id
							})
						},800)
					},
					fail:function(res){
						console.log(111);
						console.log(res);
						that.$util.hideLoading()
						// that.$util.showToast('支付失败!');
						uni.showModal({
						    title: '友情提示',
						    content: '订单未支付',
							showCancel:false,
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
									uni.navigateTo({
										url:'/pages/mine/myOrder?type=1'
									})
						        }
						    }
						});
					},
					complete:function(res){}
				}) 
			
			},
			chooseCoupon(item){
				if(!this.useCoupon){
					return
				}
				this.couponId = item.id
				this.couponIntr = item.use_desc
				this.hides('QSPop')
				this.getInfo()
			},
			changeUse(){
				this.useCoupon = !this.useCoupon
				if(!this.useCoupon){
					this.couponId = '-1'
					this.couponIntr = ''
					this.getInfo()
				}
			},
			toAddr(){
				uni.navigateTo({
					url:'/pages/mine/address?type=2'
				})
			},
			getInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					address_type:1,
					ordernum:this.ordernum,
					user_coupon_id: this.couponId
				}
				http('/api/order/sett_detail', 'post',data).then(res => {
					console.log(res)
					this.addr = res.data.user_address
					
					if(this.addr){
						this.address = this.addr.province_city_district + this.addr.address
					}
					this.info = res.data.order
					this.id = res.data.order.id
					this.couponList = res.data.user_coupon
					this.couponIntr = res.data.order.coupon_str
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
		
	}
	.wrap{
		padding: 30upx;
	}
	.addr-wrap{
		padding: 40upx 30upx;
		border-radius: 10upx;
		margin-bottom: 40upx;
		min-height: 170upx;
		color: #fff;
		background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
		.local-y{
			width: 36upx;
			height: 44upx;
		}
		.addr-main{
			padding: 0 30upx;
		}
		.right-gr{
			width: 20upx;
			height: 34upx;
		}
	}
	.goods-wrap{
		background-color: #fff;
		padding: 0 30upx;
		border-radius: 10upx;
		margin-bottom: 32upx;
		.goods-shopping{
			padding: 23upx 0;
			border-bottom: 1px solid #eee;
			.title-right{
				width: 15upx;
				height: 26upx;
			}
		}
		.goods{
			padding: 26upx 0 40upx;
			.goods-img-box{
				margin-right: 20upx;
				width: 190upx;
				height: 190upx;
				.goods-img{
					width: 190upx;
					height: 190upx;
					border-radius: 10upx;
				}
			}
			.goods-text{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
	.pay-wrap{
		background-color: #fff;
		padding: 0 24upx;
		border-radius: 10upx;
		margin-bottom: 50upx;
		.pay-item{
			padding: 30upx 0;
			border-bottom: 1px solid #eee;
			.pay-intr{
				color: #7D7D7D;
				margin-right: 34upx;
			}
			.pay-right{
				width: 18upx;
				height: 32upx;
			}
		}
	}
	.remark-wrap{
		height: 140upx;
		background-color: #fff;
		border-radius: 10upx;
		padding: 30upx 20upx;
		margin-bottom: 60upx;
		.remark{
			width: 100%;
			height: 100%;
			font-size: 30upx;
			color: #808080;
		}
	}
	.price-desc{
		margin-bottom: 30upx;
	}
	
	
	.blank{
		height: 106upx;
	}
	.bot-bar{
		width: 100%;
		height: 106upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: flex-end;
		padding: 10upx;
		align-items: center;
		.total-price{
			margin-right: 50upx;
		}
		.bot-btn{
			width: 230upx;
			height: 75upx;
			border-radius: 70upx;
			font-size: 30upx;
			color: #fff;
			font-weight: bold;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
		}
	}
	
	.coupon-choose{
		width: 750upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		.coupon-title{
			padding: 32upx;
			text-align: center;
		}
		.coupon-wrap{
			padding: 0 23upx;
			.coupon-scroll{
				height: 410upx;
			}
			.coupon-item{
				height: 184upx;
				position: relative;
				margin-bottom: 26upx;
				border-radius: 20upx;
				.lg-coupon-bg{
					width: 100%;
					height: 184upx;
					position: absolute;
					top: 0;
					left: 0;
					box-shadow: 0px 1px 10px 1px rgba(66,66,66,0.1);
					border-radius: 20upx;
				}
				.coupon-main{
					position: relative;
					z-index: 10;
					width: 85%;
					height: 184upx;
					.price-wrap{
						
						width: 48%;
						color: #EC7A8E;
						.price{
							font-size: 106upx;
							font-weight: bold;
							position: relative;
						}
						.symbol{
							font-size: 32upx;
							font-weight: bold;
							position: absolute;
							right: -32upx;
							top: 20upx;
						}
					}
					
					.coupon-line{
						width: 2upx;
						height: 104upx;
						background-color: #E5E5E5;
					}
					.coupon-txt{
						color: #99939A;
						font-size: 26upx;
						width: 52%;
						padding-left: 55upx;
						padding-right: 25upx;
					}
					.coupon-txt-and{
						color: #b9b9b9;
					}
					.color-gr{
						color: #BEBEBE;
					}
				}
				
				.btn{
					font-size: 24upx;
					color: #fff;
					position: absolute;
					z-index: 10;
					right: 5%;
					top: 50%;
					transform: translateY(-50%);
					line-height: 24upx;
					.lg-sel-w{
						width: 34upx;
						height: 34upx;
					}
				}
			}
			.use-coupon{
				color: #434343;
			}
			.lg-sel{
				width: 28upx;
				height: 28upx;
				margin-right: 23upx;
			}
		}
		
		.coupon-intr{
			color: #B5B5B5;
			font-size: 22upx;
			padding: 160upx 34upx 34upx;
			text-align: center;
		}
	}
</style>
