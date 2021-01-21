<template>
	<view class="content">
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back-white.png" class="back" ></image>
			</view>
			<view class="title-txt">
				退款详情
			</view>
		</view>
		<image :src="imgUrl + 'lg-order-bg.png'" class="order-bg"></image>
		<view class="head-wrap" :style="[{paddingTop:(CustomBar + 40) + 'px'}]">
			<view class="text-white" v-if="info.status == 1 || info.status == 2">
				<view class="fontBold font40 order-status" v-if="info.status == 1">
					待客服处理
				</view>
				<view class="font26" v-if="info.status == 1">
					如长时间未处理您可联系人工客服
				</view>
				<view class="fontBold font40 order-status" v-if="info.status == 2">
					审核未通过
				</view>
			</view>
			<view class="text-white" v-if="info.type != 3&&info.status == 7">
				
				<view class="fontBold font40 order-status">
					退款成功
				</view>
				<view class="font26">
					退款成功！<br>
					退回{{info.price}}元到您的支付账户
				</view>
			</view>
			<view class="text-white" v-if="info.type == 3&&info.status == 7">
				
				<view class="fontBold font40 order-status">
					成功
				</view>
			</view>
			<view class="text-white" v-if="info.status != 1 && info.status != 2">
				
				<view class="fontBold font40 order-status"  v-if="info.status == 3">
					待退货入库
				</view>
				<view class="fontBold font40 order-status"  v-if="info.status == 4">
					待换货出库
				</view>
				<view class="fontBold font40 order-status"  v-if="info.status == 5">
					换货出库
				</view>
				<view class="fontBold font40 order-status"  v-if="info.status == 6">
					待收货
				</view>
				<view class="fontBold font40 order-status"  v-if="info.status == 8">
					待退款
				</view>
				<view class="fontBold font40 order-status"  v-if="info.status == 9">
					退款中
				</view>
				<!-- <view class="fontBold font40 order-status"  v-if="info.status == 10">
					已终止
				</view> -->
				<view class="fontBold font40 order-status"  v-if="info.status == 0">
					已撤销
				</view>
			</view>
			<view class="text-white" v-if="info.type == 2&&info.status == 10 || info.type == 3&&info.status == 10">
				
				<view class="fontBold font40 order-status">
					已终止
				</view>
				<view class="font26" v-if="info.type == 2">
					商品已破损，不支持退货退款
				</view>
				<view class="font26" v-if="info.type == 3">
					商品已破损，不支持退货换货
				</view>
			</view>
			
			<view class="order-icon disCenter" v-if="info.status == 1 || info.status == 2">
				<image :src="imgUrl + 'lg-sale-dcl.png'" class="lg-sale-dcl"></image>
			</view>
			<view class="order-icon disCenter" v-if="info.status != 1 && info.status != 2">
				<image :src="imgUrl + 'lg-sale-yes.png'" class="lg-sale-yes"></image>
			</view>
			<!-- <view class="order-icon disCenter" v-if="type == 3">
				<image :src="imgUrl + 'lg-sale-no.png'" class="lg-sale-no"></image>
			</view> -->
		</view>
		<view class="main-wrap">
			
			
			<view class="goods-wrap">
				<view class="mid-box disFlex">
					<image :src="info.goods.thumb_url" class="goods-img"></image>
					<view class="mid-right">
						<view class="font26 fontBold line2">
							{{info.goods.goods_name || ''}}
						</view>
						<view class="goods-intr disBetween">
							<view class="font22 line1 goods-intr-txt">
								{{info.goods.goods_attr_str || ''}}
							</view>
							<view class="font30">
								*{{info.goods.goods_num || ''}}
							</view>
						</view>
						<view class="font30 color-pink fontBold">
							￥{{info.goods.price || ''}}
							<text class=" color-black" v-if="info.goods.unit">/</text>
							<text class="color-black font24" v-if="info.goods.num > 1 && info.goods.unit">{{info.goods.num || ''}}</text>
							<text class="color-black font24">{{info.goods.unit || ''}}</text>
						</view>
					</view>
				</view>
				<view class="price-item disFlex">
					<view class="price-left">
						退款类型
					</view>
					<view class="price-right" v-if="info.type == 1">
						仅退款
					</view>
					<view class="price-right" v-if="info.type == 2">
						退款退货
					</view>
					<view class="price-right" v-if="info.type == 3">
						退货换货
					</view>
				</view>
				<view class="price-item disFlex">
					<view class="price-left" v-if="info.type != 3">
						退款原因
					</view>
					<view class="price-left" v-else>
						换货原因
					</view>
					<view class="price-right">
						{{info.thmess.mess}}
					</view>
				</view>
				<view class="price-item disFlex" v-if="info.type != 3">
					<view class="price-left">
						退款金额
					</view>
					<view class="price-right">
						￥{{info.price}}
					</view>
				</view>
			
				
			</view>
			<!-- 订单信息 -->
			<view class="order-msg"> 
				<view class="order-item disFlex">
					<view class="order-item-title">
						申请时间
					</view>
					<view class="">
						{{info.create_time || ''}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.ordernumber">
					<view class="order-item-title" v-if="info.type != 3">
						退款编号
					</view>
					<view class="order-item-title" v-else>
						换货编号
					</view>
					<view class="">
						{{info.ordernumber || ''}}
					</view>
				</view>
				<view class="order-item disFlex">
					<view class="order-item-title">
						订单编号
					</view>
					<view class="">
						{{info.order_num || ''}}
					</view>
					<view class="copy" @click="copy(info.order_num)">
						复制
					</view>
				</view>
				
				<view class="order-item disFlex" v-if="info.zb_num">
					<view class="order-item-title">
						直播单号
					</view>
					<view class="">
						{{info.zb_num}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.fh_name">
					<view class="order-item-title">
						物流公司
					</view>
					<view class="">
						{{info.fh_name}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.fh_num">
					<view class="order-item-title">
						物流单号
					</view>
					<view class="">
						{{info.fh_num}}
					</view>
					<view class="copy" @click="copy(info.fh_num)">
						复制
					</view>
				</view>
			</view>
			<view class="order-msg" v-if="info.return_name && info.type == 2">
				<view class="order-item disFlex">
					<view class="order-item-title">
						物流公司
					</view>
					<view class="">
						{{info.return_name}}
					</view>
				</view>
				<view class="order-item disFlex">
					<view class="order-item-title">
						快递单号
					</view>
					<view class="">
						{{info.return_num || ''}}
					</view>
					<view class="copy" @click="copy(info.return_num)">
						复制
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="blank"></view>
			<view class="btn-box">
				<!-- status售后状态 1待审核 2审核未通过 3待退货入库 4待换货出库 5换货出库 6待收货 7成功 8待退款 9退款中 0已撤销 -->
				<view class="btn disCenter font26 btn-border" @click="show('QSCustomer')">
					联系客服
				</view>
				<view class="btn disCenter font26 btn-red" v-if="info.status == 1" @click="toApplySale(info)">
					修改申请
				</view>
				<view class="btn disCenter font26 btn-gray" v-if="info.status == 1" @click="revoke(info)">
					撤销申请
				</view>
				<view class="btn disCenter font26 btn-red" v-if="info.status == 3 && info.show_after == 2" @click="show('QSpop')">
					填写快递单号
				</view>
				<view class="btn disCenter font26 btn-red" v-if="info.type == 3 &&info.status == 6 " @click="cancelOrder(info)">
					确认收货
				</view>
				<view class="btn disCenter font26 btn-red" v-if="info.type != 3 &&info.status == 7 " @click="toSaleMoney(info)">
					钱款去向
				</view>
				
			</view>
		</view>
		
		<QSPopup ref="QSpop">
			<view class="fill-mail">
				<view class="inputs-wrap">
					<input type="text" class="inputs" v-model="expressCompany" placeholder="请输入快递公司名称"/>
				</view>
				<view class="inputs-wrap">
					<input type="text" class="inputs" v-model="expressNum" placeholder="请输入快递单号"/>
				</view>
				<view class="disBetween mail-btn-wrap">
					<view class="mail-btn" @click="hides('QSpop')">
						取 消
					</view>
					<view class="mail-btn mail-btn-r" @click="writeMail">
						确 认
					</view>
				</view>
			</view>
		</QSPopup>
		
		<QSPopup ref="QSCustomer">
			<view class="cus-wrap">
				<view class="cus-item disBetween" v-for="(item,index) in customerList" :key="index" @click="phoneCall(item.phone)" >
					<view class="font30 fontBold" @longpress.stop="copy(item.phone)">
						{{item.name}}
					</view>
					<view class="" @longpress.stop="copy(item.phone)">
						{{item.phone}}
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	const app = getApp()
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				type:1,//  1待处理 2退款成功  3退款失败
				info:{},
				id:'',
				expressCompany:'',
				expressNum:'',
				customerList:[],//客服列表
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.id = option.id
			
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			// 复制
			copy(num){
				let that = this
				uni.setClipboardData({
				    data: num,
				    success: function () {
				        console.log('success');
						that.$util.showToast('复制成功')
				    }
				});
			},
			toSaleMoney(info){
				uni.navigateTo({
					url:'/pages/mine/saleMoney?id=' + info.id
				})
			},
			toApplySale(item){
				let type = 1
				if(item.thmess.cate_id != 1){
					type = 2
				}
				uni.navigateTo({
					url:'/pages/mine/applySale?orderid='+item.order_id + '&saleid=' + item.id + '&type=' + type
				})
			},
			getInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id
				}
				http('/api/users/after_detail', 'post',data).then(res => {
					if(res.code == 200){
						this.info = res.data
						this.customerList = this.info.sys_phone
					}
				})
			},
			// 撤销
			revoke(){
				let that = this
				uni.showModal({
				    title:'撤销',
				    content: '您将撤销本次申请,如果问题未解决,您还可以再次发起',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							that.revokeDone()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							
				        }
				    }
				});
			},
			revokeDone(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id,
					type:1
				}
				http('/api/users/operation_after', 'post',data).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
						this.getInfo()
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
			writeMail(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id,
					type:2,
					name:this.expressCompany,
					num:this.expressNum
				}
				http('/api/users/operation_after', 'post',data).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
						this.hides('QSpop')
						this.getInfo()
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			cancelOrder(item){
				let that = this
				uni.showModal({
				    title:'确认收货',
				    content: '是否确认收货?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							that.cancelOrderDone(item)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							
				        }
				    }
				});
			},
			cancelOrderDone(item,type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id,
					type:3
				}
				http('/api/users/operation_after', 'post',data).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
						this.getInfo()
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #000;	
		padding-left: 24upx;
		/* #ifdef MP-WEIXIN */
		padding-right: 220upx;
		/* #endif */
		.back-wrap{
			width: 40upx;
			height: 40upx;
			.back{
				width: 18upx;
				height: 32upx;
			}
		}
		.title-txt{
			font-size: 32upx;
			width: 60%;
			text-align: center;
			color: #fff;
			font-weight: bold;
		}
	}
	.order-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 515upx;
	}
	.head-wrap{
		padding-left: 72upx;
		padding-right: 80upx;
		padding-bottom: 76upx;
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 50;
	}
	.order-status{
		margin-bottom: 25upx;
	}
	.order-icon{
		
		.lg-sale-dcl{
			width: 116upx;
			height: 126upx;
		}
		.lg-sale-yes{
			width: 177upx;
			height: 126upx;
		}
		.lg-sale-no{
			width: 177upx;
			height: 126upx;
		}
		
	}
	.main-wrap{
		padding: 0 26upx 40upx;
		position: relative;
		z-index: 50;
		
	}
	.local-wrap{
		position: relative;
		padding: 38upx 30upx;
		border-radius: 20upx;
		background-color: #fff;
		color: #434343;
		margin-bottom: 30upx;
		.lg-order-edit{
			width: 36upx;
			height: 37upx;
			position: absolute;
			right: 30upx;
			top: 38upx;
		}
		.phone-num{
			color: #A1A1A1;
			margin-left: 65upx;
			
		}
	}
	.goods-wrap{
		padding: 0 24upx 15upx;
		border-radius: 20upx;
		background-color: #fff;
		margin-bottom: 30upx;
		.mid-box{
			padding: 28upx 0 60upx;
			.goods-img{
				width: 188upx;
				height: 188upx;
				flex: none;
				border-radius: 10upx;
			}
			.mid-right{
				color: #161616;
				width: 100%;
				padding: 2upx 0 2upx 24upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.goods-intr{
					color: #9E9E9E;
					.goods-intr-txt{
						padding-right: 40upx;
					}
				}
			}
		}
	}
	.price-item{
		color: #A5A5A5;
		margin-bottom: 25upx;
		.price-left{
			width: 216upx;
			flex: none;
		}
	}
	
	
	.order-msg{
		padding:10upx 30upx 40upx;
		background-color: #fff;
		margin-bottom: 30upx;
		.order-item{
			margin-top: 24upx;
			position: relative;
			color: #424242;
			.order-item-title{
				width: 210upx;
				
			}
			.copy{
				color: #EC7A8E;
				position: absolute;
				z-index: 10;
				right: 0;
				top: -2upx;
				z-index: 10;
				background-color: #fff;
			}
		}
	}
	
	.blank{
		height: 150upx;
	}
	.btn-box{
		width: 100%;
		height: 116upx;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding-right: 30upx;
		padding-top: 30upx;
		.btn{
			margin-left: 20upx;
			min-width: 180upx;
			padding: 0 20upx;
			height: 66upx;
			border-radius: 60upx;
			margin-bottom: 30upx;
		}
		.btn-border{
			color: #EC7A8E;
			border: 1px solid #EC7A8E;
		}
		.btn-red{
			background-color: #EC7A8E;
			color: #fff;
		}
		.btn-gray{
			background-color: #e5e5e5;
			color: #fff;
		}
	}
	
	.fill-mail{
		width: 660upx;
		border-radius: 20upx;
		background-color: #fff;
		padding: 70upx 30upx;
		.inputs-wrap{
			border: 1px solid #DCDCDC;
			padding: 24upx 30upx;
			border-radius: 20upx;
			margin-bottom: 30upx;
			.inputs{
				
			}
		}
		.mail-btn-wrap{
			margin-top: 88upx;
			.mail-btn{
				width: 250upx;
				height: 90upx;
				text-align: center;
				line-height: 90upx;
				color: #fff;
				font-size: 38upx;
				background-color: #d1d1d1;
				border-radius: 12upx;
			}
			.mail-btn-r{
				background-color: #EC7A8E;
			}
		}
	}
	.cus-wrap{
		width: 500upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 20upx 70upx;
		.cus-item{
			padding: 20upx 0;
		}
	}
</style>
