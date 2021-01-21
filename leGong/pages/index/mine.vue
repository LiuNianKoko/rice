<template>
	<view class="content">
		<!-- <cu-custom bgColor="bgWhite" :isBack="true"><block slot="backText"></block><block slot="content">我的</block></cu-custom> -->
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter">
				<!-- <image src="/static/back-white.png" class="back"></image> -->
			</view>
			<view class="title-txt">
				我 的
			</view>
		</view>
		<image :src="imgUrl + 'lg-mine-bg.png'" class="mine-bg"></image>
		<view class="head-wrap" :style="[{paddingTop:(CustomBar + 5) + 'px'}]">
			<view class="head-left disFlex">
				<view class="headimg-wrap">
					<image :src="userInfo.head_img" class="headimg"></image>
				</view>
				<view class="text-white">
					<view class="font32 fontBold name-wrap line1">
						{{userInfo.nickname || ''}}
					</view>
					<view class="">
						{{userInfo.phone || ''}}
					</view>
					<view class="member-grade " :class="[addColor(userInfo.user_role)]">
						<view class="member-grade-txt font24">
							{{userInfo.member_grade || ''}}
						</view>
					</view>
				</view>
			</view>
			<view class="disFlex right-img-wrap">
				<image :src="imgUrl + 'lg-refresh.png'" class="right-img" @click="reLog"></image>
				<button open-type="share" class="share-button" >
					<image :src="imgUrl + 'lg-share.png'" class="right-img"></image>
				</button>
			</view>
		</view>
		
		<view class="my-order-wrap">
			<view class="my-order">
				<view class="disBetween paddingLeft10">
					<view class="font32 fontBold">
						我的订单
					</view>
					<view class="disAlignCenter all-order" @click="jumpOrder(1)">
						全部订单
						<image src="/static/right-gray.png" class="all-right"></image>
					</view>
				</view>
				<view class="order-img-wrap disBetween">
					<view class="order-item" @click="jumpOrder(2)">
						<image src="/static/lg-dfk.png" class="order-img"></image>
						<text class="font26 paddingTop15">待付款</text>
					</view>
					<view class="order-item" @click="jumpOrder(3)">
						<image src="/static/lg-dfh.png" class="order-img"></image>
						<text class="font26 paddingTop15">待发货</text>
					</view>
					<view class="order-item" @click="jumpOrder(4)">
						<image src="/static/lg-dsh.png" class="order-img"></image>
						<text class="font26 paddingTop15">待收货</text>
					</view>
					<view class="order-item" @click="jumpOrder(5)">
						<image src="/static/lg-ywc.png" class="order-img"></image>
						<text class="font26 paddingTop15">已完成</text>
					</view>
					<view class="order-item" @click="jumpOrder(6)">
						<image src="/static/lg-sale.png" class="order-img"></image>
						<text class="font26 paddingTop15">售后/退款</text>
					</view>
				</view>
				
			</view>
			<view class="ach-wrap disBetween" v-if="userInfo.user_role > 0">
				<view class="ach-item disBetween" @click="toAch">
					<view class="disCenter my-ach-wrap">
						<image src="/static/lg-my-ach.png" class="my-ach" mode=""></image>
					</view>
					<view class="ach-line"></view>
					<view class="ach-txt-wrap">
						<view class="ach-txt">
							顾客业绩
						</view>
						<view class="ach-price">
							{{userInfo.user_achievement || '0.00'}}
						</view>
					</view>
				</view>
				<view class="ach-item disBetween" @click="toFlow">
					<view class="disCenter my-ach-wrap">
						<image src="/static/lg-my-ach3.png" class="my-ach3" mode=""></image>
					</view>
					<view class="ach-line"></view>
					<view class="ach-txt-wrap">
						<view class="ach-txt">
							个人消费
						</view>
						<view class="ach-price">
							{{userInfo.user_price || '0.00'}}
						</view>
					</view>
				</view>
				<view class="ach-item disBetween" @click="toGroup">
					<view class="disCenter my-ach-wrap">
						<image src="/static/lg-my-ach2.png" class="my-ach2" mode=""></image>
					</view>
					<view class="ach-line"></view>
					<view class="ach-txt-wrap">
						<view class="ach-txt">
							代言业绩
						</view>
						<view class="ach-price">
							{{userInfo.endor_achievement || '0.00'}}
						</view>
					</view>
				</view>
			</view>
			<view class="mine-item-wap">
				<view class="mine-item disBetween scale-1px-bottom" @click="toGroup" >
					<view class="disAlignCenter">
						<view class="mien-item-img disCenter">
							<image :src="imgUrl + 'lg-my-group.png'" class="lg-my-group"></image>
						</view>
						<view class="">
							我的代言团
						</view>
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
				<view class="mine-item scale-1px-bottom disBetween" @click="toCoupon">
					<view class="disAlignCenter">
						<view class="mien-item-img disCenter">
							<image :src="imgUrl + 'lg-my-coupon.png'" class="lg-my-coupon"></image>
						</view>
						<view class="">
							优惠券
						</view>
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
				<view class="mine-item disBetween scale-1px-bottom" @click="toMsg">
					<view class="disAlignCenter">
						<view class="mien-item-img disCenter">
							<image :src="imgUrl + 'lg-msg.png'" class="lg-msg"></image>
						</view>
						<view class="">
							信息中心
						</view>
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
				<!-- toAddr -->
				<view class="mine-item disBetween" @click="toAddr">
					<view class="disAlignCenter">
						<view class="mien-item-img disCenter">
							<image :src="imgUrl + 'lg-local.png'" class="lg-local"></image>
						</view>
						<view class="">
							收货地址
						</view>
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
			</view>
			
		</view>
		<QSPopup ref="QSpopUser" :tapMaskHide="false">
			<view class="user-content disCenter">
				{{tipMsg || '该账号已被冻结'}}
			</view>
		</QSPopup>
	</view>
</template>

<script>
	const app = getApp()
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import http from '@/api/http.js'
	export default {
		components:{QSPopup},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				imgUrl:app.globalData.imgUrl,
				userInfo:null,
				hr:0,
				min:0,
				sec:0,
				endTime:0,
				userId:0,//上级id
				mineId:0,//自己id
				tipMsg:''
			}
		},
		onShareAppMessage(e) {
			console.log(e)
			let that = this
			if (e.from === 'button') {// 来自页面内分享按钮
				console.log(e.target)
			}
			return {
				title: '优选',
				path: '/pages/index/mine?userid=' + that.mineId
			}
		},
		onLoad(option) {
			
			if(option.userid){
				this.userId = option.userid
				uni.setStorageSync('otherid',this.userId)
			}
		},
		onShow() {
			let mineid = uni.getStorageSync('user_id')
			if(mineid){
				this.mineId = mineid
			}
			this.isLog()
		},
		methods: {
			addColor(col){
				let className = ''
				if(col == 0 || col == 1){
					className = 'member1'
				}else if(col == 2 || col == 3){
					className = 'member2'
				}else{
					className = 'member3'
				}
				return className
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			
			toMsg(){
				uni.navigateTo({
					url:'/pages/mine/message'
				})
			},
			toAddr(){
				uni.navigateTo({
					url:'/pages/mine/address'
				})
			},
			toAch(){
				uni.navigateTo({
					url:'/pages/mine/achievement'
				})
			},
			toFlow(){
				uni.navigateTo({
					url:'/pages/mine/flowRecord?id=' + this.userInfo.id
				})
			},
			toGroup(){
				uni.navigateTo({
					url:'/pages/mine/myGroup'
				})
				
				// uni.navigateTo({
				// 	url:'/pages/index/addPhone'
				// })
			},
			toCoupon(){
				uni.navigateTo({
					url:'/pages/mine/coupon'
				})
			},
			// 订单
			jumpOrder(type){
				// 1全部  2待付款  3待发货  4待收货  5评价  6售后
				if (type == 6) {
					uni.navigateTo({
						url:'/pages/mine/sale'
					})
				} else {
					uni.navigateTo({
						url:'/pages/mine/myOrder?type=' + type
					})
				}
			},
			reLog(){
				uni.navigateTo({
					url:'/pages/mine/myAuthor?userid=' + this.userId
				})
			},
			isLog(){
				let data = {
					user_token:uni.getStorageSync('token'),
					user_id:uni.getStorageSync('user_id')
				}
				http('/api/users/get_userinfo','post',data).then( (res) => {
					console.log(res)
					if(res.code == 200){
						this.userInfo = res.data
					}else if(res.code == 4001){
						this.tipMsg = res.msg
						this.show('QSpopUser')
					}else{
						let that = this
						uni.showModal({
						    title: '暂未登录',
						    content: '是否前往登录？',
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
									uni.navigateTo({
										url:'/pages/mine/myAuthor?userid=' + that.userId
									})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
									uni.switchTab({
										url:'/pages/index/index'
									})
						        }
						    }
						});
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
			font-size: 36upx;
			width: 60%;
			text-align: center;
			color: #fff;
			font-weight: bold;
		}
	}
	.mine-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 410upx;
	}
	.head-wrap{
		padding-left: 30upx;
		padding-right: 30upx;
		padding-bottom: 55upx;
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 50;
		.head-left{
			
			.headimg-wrap{
				margin-right: 24upx;
			}
			.headimg{
				width: 145upx;
				height: 145upx;
				border-radius: 50%;
			}
			.name-wrap{
				margin-top: 20upx;
				margin-bottom: 15upx;
				max-width: 300upx;
			}
			.member-grade{
				margin-top: 6upx;
				display: flex;
				.member-grade-txt{
					background-color: #fff;
					border-radius: 6upx;
					padding: 6upx 10upx;
				}
			}
			.member1{
				color: #e38093;
			}
			.member2{
				color: #ff4341;
			}
			.member3{
				color: #ff9608;
			}
		}
		.right-img-wrap{
			margin-top: 20upx;
		}
		.share-button{
			width: 50upx;
			height: 56upx;
			border: none;
			padding: 0;
			margin-left: 26upx;
			background: transparent;
			margin-top: -4upx;
		}
		.share-button::after{
			border: none;
		}
		.right-img{
			width: 50upx;
			height: 56upx;
			
		}
	}
	
	.my-order-wrap{
		padding: 0 28upx;
		// margin-top: -30upx;
		position: relative;
		z-index: 60;
		.my-order{
			background-color: #fff;
			border-radius: 20upx;
			padding: 40upx 20upx 50upx;
			margin-bottom: 30upx;
			.all-order{
				color: #bbb;
				font-size: 26upx;
				.all-right{
					width: 10upx;
					height: 17upx;
					margin-left: 12upx;
				}
			}
		}
		.order-img-wrap{
			padding: 50upx 10upx 0;
			.order-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				.order-img{
					width: 42upx;
					height: 39upx;
				}
			}
		}
		.ach-wrap{
			margin-bottom: 30upx;
			.ach-item{
				width: 32.5%;
				padding: 20upx 10upx;
				background-color: #fff;
				border-radius: 20upx;
				.my-ach-wrap{
					width: 38%;
					height: 100upx;
					.my-ach{
						width: 95upx;
						height: 100upx;
						flex: none;
					}
					.my-ach2{
						width: 110upx;
						height: 100upx;
						flex: none;
					}
					.my-ach3{
						width: 55upx;
						height: 60upx;
						flex: none;
					}
				}
				.ach-line{
					height: 66upx;
					width: 2upx;
					background-color: #e5e5e5;
				}
				.ach-txt-wrap{	
					width:60%;
					padding-left: 10upx;
				}
				.ach-txt{
					color: #626262;
					font-size: 22upx;
				}
				.ach-price{
					font-size: 34upx;
					font-weight: bold;
					color: #ec7a8e;
				}
			}
		}
		.mine-item-wap{
			padding: 0 30upx;
			background-color: #fff;
			border-radius: 20upx;
			margin-bottom: 30upx;
			.mine-item{
				padding: 32upx 0;
				.mien-item-img{
					width: 40upx;
					height: 40upx;
					margin-right: 18upx;
				}
				.lg-msg{
					width: 34upx;
					height: 34upx;
				}
				.lg-local{
					width: 29upx;
					height: 37upx;
				}
				.lg-my-group{
					width: 32upx;
					height: 37upx;
				}
				.lg-my-coupon{
					width: 36upx;
					height: 30upx;
				}
				.right-gray{
					width: 16upx;
					height: 28upx;
				}
			}
		}
	}
	.user-content{
		width: 400upx;
		height: 200upx;
		background-color: #fff;
		border-radius: 20upx;
		font-size: 30upx;
	}
</style>
