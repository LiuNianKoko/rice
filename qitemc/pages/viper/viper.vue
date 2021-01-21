<template>
	<view class="viper-wraps">
		<!-- 普通用户 -->
		<view class="viper-no" v-if="isVip == 1">
			<view class="viper-header1">
				<image class="vip-bg1" :src='imag+"vip-bg2.png"'></image>
				<!-- <view class="vip-bg1"></view> -->
				<view class="header-title">
					<image class="vip-horn" :src='imag+"vip-horn.png"'></image>
					会员中心 · 享最丰富的权益
				</view>
				<view class="header-intr">
					<view class="intr-item">
						<image class="intr-img intr-img1" :src='imag+"vip-01.png"'></image>
						省钱
					</view>
					 <view class="intr-item">
					 	<image class="intr-img" :src='imag+"vip-02.png"'></image>
					 	专享
					 </view>
					 <view class="intr-item">
					 	<image class="intr-img" :src='imag+"vip-03.png"'></image>
					 	赚钱 
					 </view>
					 <view class="intr-item">
					 	<image class="intr-img" :src='imag+"vip-04.png"'></image>
					 	服务
					 </view>
				</view>
			</view>
			<view class="vip-main">
				<view class="vip-logo">
					<image :src='imag+"vip-logo01.png"'></image>
					<text>会员</text>
				</view>
				<view class="vip-power">
					<!-- <text class="vip-power-l">加入我们，尊享特权>></text> -->
					<text class="vip-power-l"></text>
					<navigator url="/pages/viper/priDetail">
						<text class="vip-power-r">查看权益详情></text>
					</navigator>
					
				</view>
				<view class="vip-itemize">
					<view class="vip-items">
						<image :src='imag+"vip-img01.png"'></image>
						<view class="vip-text">
							甄选礼品
						</view>
					</view>
					<view class="vip-items">
						<image :src='imag+"vip-img02.png"'></image>
						<view class="vip-text">
							会员专享价
						</view>
					</view>
					<view class="vip-items">
						<image :src='imag+"vip-img03.png"'></image>
						<view class="vip-text">
							特权商品
						</view>
					</view>
					<view class="vip-items">
						<image :src='imag+"vip-img04.png"'></image>
						<view class="vip-text">
							服务特权
						</view>
					</view>
				</view>
			</view>
			<view class="vip-apply">
				
				<view class="vip-btn" @click="toBecomeVip">
					申请成为会员
				</view>
				
				<view class="vip-intr">
					加入即可享受权益
				</view>
				<view class="vip-title">
					有你相伴 · 一起前行
				</view>
				<view class="vip-img">
					<image src='http://ricepic.sayyin.com/b4e99202012181522267729.jpg'></image>
				</view>
			</view>
		</view>
		<!-- vip -->
		<view class="viper-yes" v-if="isVip == 2">
			<view class="viper-header2">
				<image class="vip-bg2" :src='imag+"vip-bg2.png"'></image>
				<!-- <view class="vip-bg2"></view> -->
				<view class="headerline">
					享最丰富的权益
				</view>
				<view class="header-main">
					<view class="header-mains">
						<view class="header-pic">
							<!-- <image src="/static/vip-head-pic.png"></image> -->
							<image :src="userInfo.headimgurl" mode="aspectFill"></image>
						</view>
						<view class="header-person">
							<view class="header-name">
								{{userInfo.nickname}}
							</view>
							<view class="header-time" v-if="userInfo.expire_time">
								会员{{userInfo.expire_time}}到期
							</view>
							
						</view>
					</view>
					
					<view class="header-state" v-if="userInfo.vip==3">
						<image :src='imag+"vip-logo2.png"'></image>
						会员
					</view>
					<view class="header-state" v-if="userInfo.vip==2">
						<image :src='imag+"vip-logo2.png"'></image>
						会员
					</view>
				</view>
			</view>
			<view class="vip-bg-box"></view>
			<view class="vip-box">
				<view class="vip-data">
					<navigator url="/pages/viper/myextend">
						<view class="data-item">
							<view class="data-num" v-if="userInfo.spread_num">
								{{userInfo.spread_num}}
							</view>
							<view class="data-num" v-else>0</view>
							<view class="data-text">
								我的推广
							</view>
						</view>
					</navigator>
					
					<view class="data-line"></view>
					<navigator url="/pages/viper/mymoney">
						<view class="data-item">
							<view class="data-num data-num2">
								<text>￥</text>{{totalMoney}}
							</view>
							<view class="data-text">
								我的收益
							</view>
						</view>
					</navigator>
					
					<view class="data-line"></view>
					<navigator url="/pages/mine/mycash">
						<view class="data-item">
							<view class="data-num"  v-if="userInfo.coupon_num">
								<!-- <text>￥</text> -->{{userInfo.coupon_num}}
							</view>
							<view class="data-num" v-else>0</view>
							<view class="data-text">
								现金券(张)
							</view>
						</view>
					</navigator>
				</view>
				<view class="viper-order">
					<navigator url="/pages/viper/vipGoods">
						<view class="viper-item scale-1px-bottom">
							<view class="viper-title">
								我的特权商品
							</view>
							<image src="/static/huijt.png"></image>
						</view>
					</navigator>
					<navigator url="/pages/viper/shareCode">
						<view class="viper-item">
							<view class="viper-title">
								分享推广
							</view>
							<image src="/static/huijt.png"></image>
						</view>
					</navigator>
					
				</view>
				<!-- <view class="viper-order">
					<navigator url="/pages/viper/library">
						<view class="viper-item">
							<view class="viper-title">
								基地风采
							</view>
							<image src="/static/huijt.png"></image>
						</view>
					</navigator>
				</view> -->
				<view class="vip-img2">
					<image src='http://ricepic.sayyin.com/b4e99202012181522267729.jpg'></image>
				</view>
			</view>
		</view>
		<!-- 登录确认弹窗 -->
		<QSPopup ref="QSPopuplogin">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					<view class="del-text2">
						您暂未登录
					</view>
					<view class="del-text3">
						登录发现更多精彩
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="hides('QSPopuplogin')">
						取消
					</view>
					<view class="del-btn-yes" @tap="toLogin">
						去登录
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	const app = getApp();
	export default {
		components:{QSPopup},
		data() {
			return {
				imag: app.globalData.imag,
				isVip:1,  // 1 是普通用户界面  2是vip用户界面
				userInfo:{},
				endTime:'',
				endStatus:false,
				totalMoney:0
			}
		},
		onLoad() {
			this.getUserInfo()
			// this.getvip()
			
		},
		onShow() {
			this.getUserInfo()
			if(this.isVip == 2){
				this.isLogon()
			}
		},
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			isLogon(){
				if(!uni.getStorageSync('token')){
					this.show('QSPopuplogin')
				}
				if(uni.getStorageSync('token')){
					let data = {
						token:uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo','get',data).then(res=>{
						if(res.data.status == '200'){
							
						}else{
							this.$util.showToast('登录信息已过期，请重新登录')
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/index/logon/logon'
								})
							},1500)
						}
						console.log(res)
					})
				}
			},
			toBecomeVip(){
				if(uni.getStorageSync('token')){
					let data = {
						token:uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo','get',data).then(res=>{
						if(res.data.status == '200'){
							uni.navigateTo({
								url:'/pages/viper/becomeVip'
							})
						}else{
							this.$util.showToast('登录信息已过期，请重新登录')
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/index/logon/logon'
								})
							},1500)
						}
						console.log(res)
					})
				}else{
					this.show('QSPopuplogin')
				}
			},
			
			toLogin(){
				uni.navigateTo({
					url:'/pages/index/logon/logon'
				})
				this.hides('QSPopuplogin')
			},
			getUserInfo(){
				let data = {
						token:uni.getStorageSync('token')
					}
				http('/api/User/get_userinfo','post',data).then(res=>{
					if(res.data.status == '200'){
						this.userInfo = res.data.data
						this.endTime =res.data.data.expire_time
						let money1 =parseFloat(res.data.data.goods_profit) 
						let money2 =parseFloat(res.data.data.profit_money) 
						this.totalMoney = (money1 + money2).toFixed(2)
					}
					
					if(!this.endTime){
						return
					}
					let now = Math.round(new Date() / 1000)
					let end = (Date.parse(this.endTime))/1000
					
					if(now > end){
						this.endStatus = false
					}else{
						this.endStatus = true
					}
					console.log(this.endStatus)
					let viper = res.data.data.vip
					if(viper<=1 || this.endStatus == false){
						this.isVip = 1
					}else if(viper>1 &&this.endStatus == true){
						this.isVip = 2
					}
					console.log(res)
				})
			},
			// getvip(){
			// 	let viper = uni.getStorageSync('vip')
			// 	console.log(this.endStatus)
			// 	if(viper==1 || this.endStatus == false){
			// 		this.isVip = 1
			// 	}else if(viper>1 &&this.endStatus == true){
			// 		this.isVip = 2
			// 	}
			// }
		}
	}
</script>

<style lang="less">
	// 普通用户
	.viper-wraps{
		background-color: #f2f2f5;
	}
	
	.viper-header1{
		width: 100%;
		.vip-bg1{
			width: 100%;
			height: 454upx;
			position: absolute;
			top: 0;
			left: 0;
			// background:linear-gradient(180deg,#00a0e9 0%,#61c2ef 100%);
		}
		.header-title{
			font-size:36upx;
			color:rgba(255,255,255,1);
			// color: #00a0e9;
			// text-align: center;
			padding-top: 100upx;
			opacity:0.9;
			display: flex;
			justify-content: center;
			align-items: center;
			.vip-horn{
				width: 48upx;
				height: 40upx;
				margin-right: 30upx;
			}
		}
		.header-intr{
			font-size:28upx;
			color:rgba(255,255,255,1);
			padding: 0 40upx;
			box-sizing: border-box;
			// color: #00a0e9;
			opacity:0.9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 28upx;
			.intr-item{
				display: flex;
				align-items: center;
				.intr-img{
					width: 48upx;
					height: 46upx;
					margin-right: 20upx;
				}
				.intr-img1{
					width: 50upx;
					height: 58upx;
				}
			}
		}
	}
	.vip-main{
		width:690upx;
		height:352upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 10upx 10upx 0px rgba(0,160,233,0.1);;
		border-radius:20upx;
		position: relative;
		z-index: 1;
		margin-left: 30upx;
		margin-top: 46upx;
		padding: 40upx;
		box-sizing: border-box;
		.vip-logo{
			display: flex;
			image{
				width: 42upx;
				height: 42upx;
			}
			text{
				// color: #45B443;
				color: #00a0e9;
				font-size: 40upx;
				font-weight: bold;
				margin-left: 10upx;
			}
		}
		.vip-power{
			display: flex;
			justify-content: space-between;
			margin-top: 18upx;
			.vip-power-l{
				// color: #45B443;
				color: #00a0e9;
				opacity:0.6;
			}
			.vip-power-r{
				// color: #45B443;
				color: #00a0e9;
			}
		}
		.vip-itemize{
			margin-top: 40upx;
			display: flex;
			justify-content: space-between;
			.vip-items{
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 80upx;
					height: 80upx;
					margin-bottom: 10upx;
				}
				.vip-text{
					font-size: 24upx;
					// color: #45B443;
					// color: #00a0e9;
					color: #000;
					// opacity: 0.6;
				}
			}
		}
	}
	.vip-apply{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 50upx;
		.vip-btn{
			height:100upx;
			// background:rgba(69,180,67,1);
			// background: #00a0e9;
			background-color: #4b93d1;
			// box-shadow:0px 10upx 10upx 0px #00a0e9;
			border-radius:50upx;
			line-height: 100upx;
			font-size: 40upx;
			color: #fff;
			font-weight: bold;
			text-align: center;
		}
		.vip-intr{
			// color:#45B443;
			// color:#00a0e9;
			color:#999;
			text-align: center;
			margin-top: 20upx;
		}
		.vip-title{
			// color: #45B443;
			// color:#00a0e9;
			color:#333;
			font-size: 36upx;
			font-weight: bold;
			margin-top: 90upx;
			margin-bottom: 30upx;
		}
		.vip-img{
			margin-bottom: 30upx;
			image{
				width: 690upx;
				height: 460upx;
			}
		}
	}
	.vip-img2{
		margin-top: 30upx;
		padding-bottom: 30upx;
		image{
			width: 690upx;
			height: 460upx;
		}
	}
	// vip
	.viper-header2{
		.vip-bg2{
			width: 100%;
			height: 528upx;
			position: absolute;
			top: 0;
			left: 0;
			// background:linear-gradient(180deg,#00a0e9 0%,#61c2ef 100%);
		}
		.headerline{
			font-size: 40upx;
			color: #ffffff;
			font-weight: bold;
			letter-spacing: 4upx;
			text-align: center;
			padding-top: 113upx;
			position: relative;
			z-index: 1;
		}
		.header-main{
			display: flex;
			justify-content: space-between;
			padding-left: 30upx;
			padding-right: 40upx;
			margin-top: 60upx;
			position: relative;
			z-index: 1;
			.header-mains{
				display: flex;
			}
			.header-pic{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.header-person{
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 20upx;
				.header-name{
					font-size: 36upx;
					color: #ffffff;
				}
				.header-time{
					font-size: 32upx;
					color: #ec614a;
					margin-top: 10upx;
				}
			}
			.header-state{
				font-weight: bold;
				color: #ffffff;
				display: flex;
				margin-left: 20upx;
				margin-top: 20upx;
				image{
					width: 44upx;
					height: 44upx;
				}
			}
		}
	}
	.vip-bg-box{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: #f2f2f5;
	}
	.vip-box{
		margin-top: 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
		.vip-data{
			width: 690upx;
			background-color: #FFFFFF;
			height: 176upx;
			padding: 10upx 70upx;
			box-sizing: border-box;
			border-radius:10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.data-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.data-num{
					// color: #45B443;
					color:#00a0e9 ;
					font-size:48upx;
					font-weight:bold;
					text{
						font-size:32upx;
					}
				}
				.data-num2{
					color: #ec614a;
				}
				.data-text{
					font-size: 24upx;
					color: #333333;
				}
			}
			.data-line{
				width:2upx;
				height:60upx;
				background:rgba(242,242,245,1);
			}
		}
		.viper-order{
			background:#FFFFFF;
			border-radius:10upx;
			margin-top: 20upx;
			padding: 0 30upx;
			box-sizing: border-box;
			.viper-item{
				padding: 40upx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				image{
					width: 26upx;
					height: 26upx;
				}
			}
		}
	}
	.content-del{
			height: 360upx;
			width: 670upx;
			background-color: white;
			border-radius: 20upx;
			.del-text{
				padding:60upx 20upx;
				height: 259upx;
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
					color: #999;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
				.del-btn-yes{
					color: #FB4142;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
			}
		}
</style>

