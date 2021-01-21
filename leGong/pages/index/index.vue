<template>
	<view class="content">
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<image :src="imgUrl + 'lg-logo.png'" class="logo"></image>
		</view>
		<view class="top-content" :style="[{height:CustomBar + 'px'}]"></view>
		<view class="logo-wrap disCenter">
			<!-- <image :src="imgUrl +'lg-logo-bg.png'" class="logo-bg"></image>
			<image :src="imgUrl + 'lg-logo-white.png'" class="logo-white"></image> -->
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="">
						<image :src="item.img" class="logo-item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="search-wrap">
			<view class="search disAlignCenter" @click="toSearch">
				<image :src="imgUrl +'lg-search-gray.png'" class="search-gray"></image>
				<view class="search-txt">
					搜索你想要的产品
				</view>
			</view>
		</view>
		<view v-if="onSec && onNow&& mainList.length > 0 || onSec && onNow&& list.length > 0">
			<view style="height: 70upx;" v-if="imbibition"></view>
			<view class="group-tab-im disFlex" :style="[{top:CustomBar + 'px'}]" v-if="imbibition">
				<view class="tab-im" :class="current == 1?'act-im':''" @click="changeCurrent(1)">
					<view class="font32 fontBold">
						今日团品
					</view>
					<view class="group-line" v-if="current == 1"></view>
				</view>
				<view class="tab-im" :class="current == 2?'act-im':''" @click="changeCurrent(2)">
					<view class="font32 fontBold">
						限时秒杀
					</view>
					<view class="group-line" v-if="current == 2"></view>
				</view>
			</view>
		</view>
		
		<view class="group-wrap">
			<view class="group-tab" v-if="mainList.length > 0 || list.length > 0">
				<view v-if="onSec && onNow">
					<view class="disFlex width100" v-if="!imbibition">
						<view class="group-tab-item" :class="current == 1?'act':''" @click="changeCurrent(1)">
							<view class="font32 fontBold">
								今日团品
							</view>
							<view class="font24 color-gray marginBottom5 marginTop5">
								抢到赚到
							</view>
							<view class="group-line" v-if="current == 1">
								
							</view>
						</view>
						<view class="group-tab-item" :class="current == 2?'act':''" @click="changeCurrent(2)">
							<view class="font32 fontBold">
								限时秒杀
							</view>
							<view class="font24 color-gray marginBottom5 marginTop5">
								不容错过
							</view>
							<view class="group-line" v-if="current == 2">
								
							</view>
						</view>
					</view>
				</view>
				<view class="today-group-wrap" v-if="!onSec || !onNow">
					<view class="font36 today-group fontBold">
						{{current == 1?'今日团品':'限时秒杀'}}
						<view class="today-group-line"></view>
					</view>
					<view class="font24 color-gray marginBottom10 marginTop15">
						{{current == 1?'抢 到 赚 到':'不 容 错 过'}}
					</view>
				</view>
				<view class="today-wrap disBetween" >
					<view class="disCenter">
						<!-- <image :src="imgUrl +'lg-today.png'" class="today-img"></image> -->
						<view class="today-txt-left">
							{{current==1?'今日主推':'限时秒杀'}}
						</view>
					</view>
					<view class="today-txt font26 text-white">
						距结束：{{hr}}:{{min}}:{{sec}}
					</view>
				</view>
			</view>
			<!-- 团品商品 -->
			<view class="group-goods scale-1px-bottom" v-for="(item,index) in mainList" :key="index" @click="toDetail(item)">
				<view class="group-goods-intr">
					<view class="goods-title font24 fontBold line2">
						{{item.good_name || ''}}
					</view>
					<view class="goods-intr-box">
						<image :src="imgUrl +'lg-intr-img.png'" class="intr-img"></image>
						<view class="goods-intr line2">
							{{item.desc || '默认规格'}}
						</view>
					</view>
					
					<view class="font20" v-if="sysData.price_type == 1|| sysData.price_type == 3">
						<text class="fontIta">定金价：</text>
						<text class="color-pink fontBold font-ware">{{item.deposit_price || 0}}</text>
					</view>
					<view class="font20" v-if="sysData.price_type == 2|| sysData.price_type == 3">
						<text class="fontIta">入仓价：</text>
						<text class="color-pink fontBold font-ware">{{item.warehousing_price || 0}}</text>
					</view>
					<!-- <view class="font22 text-line color-grayPrice old-price">
						￥{{item.old_price || 0}}
					</view> -->
					<view class="font20 marginBottom5 disFlex" v-if="parseFloat(item.old_price)">
						<text class="fontIta" style="visibility: hidden;">原价格：</text>
						<text class="text-line font22 color-grayPrice">￥{{item.old_price || 0}}</text>
					</view>
					<view class="font22 color-grayNum">
						已售：{{item.sales || 0}}
					</view>
					<!-- <view class="font22 color-pink">
						剩余：{{parseInt(item.num_stock_left) > 0?item.num_stock_left:0}}
					</view> -->
				</view>
				<view class="banner-box disCenter">
					<image :src="item.goods_pic" class="banner"></image>
					<view class="img-no" v-if="item.sell_status == 0">
						已售罄
					</view>
				</view>
				<!-- <view class="rush-now-wrap ">
					<view class="font24 text-white">
						立即抢购
					</view>
					<image :src="imgUrl +'lg-right-white.png'" class="right-white"></image>
				</view>
				<view class="group-goods-line">
					
				</view> -->
				
			</view>
			
		</view>
		
		<!-- 商品列表 -->
		<view class="wares-wrap">
			<view class="wares-item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="img-wrap">
					<image :src="item.goods_pic" class="imgs"></image>
					<view class="img-no" v-if="item.sell_status == 0">
						已售罄
					</view>
				</view>
				<view class="wares-txt">
					<view class="wares-title fontBold line1" :class="item.sell_status == 0?'color-gray':''">
						{{item.good_name || ''}}
					</view>
					<view class="wares-intr-box">
						<image :src="imgUrl +'lg-intr-img-yes.png'" class="wares-intr-img" v-if="item.sell_status == 1"></image>
						<image :src="imgUrl +'lg-intr-img-no.png'" class="wares-intr-img" v-if="item.sell_status == 0"></image>
						<view class="wares-intr line1">
							{{item.desc || '默认规格'}}
						</view>
					</view>
					<view class="price-wrap" :class="item.sell_status == 0?'color-gray':''">
						<view class="font24" v-if="sysData.price_type == 1|| sysData.price_type == 3">
							<text>定金价：</text>
							<text class=" fontBold">￥{{item.deposit_price || 0}}</text>
						</view>
						<view class="font24" v-if="sysData.price_type == 2|| sysData.price_type == 3">
							<text>入仓价：</text>
							<text class=" fontBold">￥{{item.warehousing_price || 0}}</text>
						</view>
						<view class="line-price" v-if="parseFloat(item.old_price)">
							￥{{item.old_price || 0}}
						</view>
					</view>
					<view class="font24 marginBottom20">
						<text class="color-gray">已售：{{item.sales || 0}}</text> 
						<!-- <text class="color-pink margingLeft20" :class="item.sell_status == 0?'color-gray':''">剩余：{{parseInt(item.num_stock_left) > 0?item.num_stock_left:0}}</text> -->
					</view>
					<view class="rush-now-btn" :class="item.sell_status == 0?'rush-act':''">
						立即抢购
					</view>
				</view>
			</view>
		</view>
		<view class="bot-data" v-if="current == 1&&mainList.length > 0 || current == 1 && list.length > 0 ||current == 2&&mainList.length > 0 || current == 2 && list.length > 0">
			我是有底线的~~
		</view>
		<view class="bot-data" v-if="current == 1 &&mainList.length == 0 && list.length == 0 || current == 2 &&mainList.length == 0 && list.length == 0">
			商品暂未开卖~请耐心等待
		</view>
		
		<view class="coupon-wrap" v-if="couponList.length > 0 && coupon">
			<view class="coupon-box" @click="show('QSpop')">
				<image :src="imgUrl +'lg-index-coupon.png'" class="coupon-bg"></image>
				<view class="rob">
					抢
				</view>
				<view class="coupon">
					优惠券
				</view>
			</view>
			<image :src="imgUrl +'lg-close.png'" class="lg-close" @click="hidCoupon"></image>
		</view>
		
		<QSPopup ref="QSpop">
			<view class="cou-wrap">
				<image :src="imgUrl +'lg-cou-bg.png'" class="lg-cou-bg"></image>
				<view class="cou-title">
					恭喜获得
				</view>
				<view class="cou-item-wrap">
					<scroll-view scroll-x="true" class="cou-item-scroll">
						<!-- :class="couponList.length > 1?'disFlex':'disCenter'" -->
						<view class="cou-item-box disFlex" v-if="couponList.length > 1">
							<view class="cou-item" :class="couponList.length > 1?'margingRight20':''" v-for="(item,index) in couponList" :key="index">
								<image :src="imgUrl +'lg-cou-price.png'" class="cou-item-bg"></image>
								<view class="item-main color-pink fontBold">
									<view class="">
										<!-- <text style="font-size: 36upx;">￥</text> -->
										<text style="font-size: 96upx;line-height: 96upx;">{{item.price_desc}}</text>
									</view>
									<view class="font40 paddingTop5 paddingBottom5">
										优惠券
									</view>
									<view class="font24">
										{{item.use_desc}}
									</view>
								</view>
							</view>
						</view>
						<view class="cou-item-box disCenter" v-else>
							<view class="cou-item" :class="couponList.length > 1?'margingRight20':''" v-for="(item,index) in couponList" :key="index">
								<image :src="imgUrl +'lg-cou-price.png'" class="cou-item-bg"></image>
								<view class="item-main color-pink fontBold">
									<view class="">
										<!-- <text style="font-size: 36upx;">￥</text> -->
										<text style="font-size: 96upx;line-height: 96upx;">{{item.price_desc}}</text>
									</view>
									<view class="font40 paddingTop5 paddingBottom5">
										优惠券
									</view>
									<view class="font24">
										{{item.use_desc}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<image :src="imgUrl +'lg-cou-bgbot.png'" class="lg-cou-bgbot"></image>
				
				<view class="lg-rece-box" @click="toCoupon">
					<image :src="imgUrl +'lg-rece-bg.png'" class="lg-rece-bg"></image>
					<image :src="imgUrl +'lg-rece.png'" class="lg-rece"></image>
				</view>
				
				<image :src="imgUrl +'lg-money-s.png'" class="lg-money-s"></image>
				<image :src="imgUrl +'lg-money-l.png'" class="lg-money-l"></image>
				<image :src="imgUrl +'lg-money-xl.png'" class="lg-money-xl"></image>
				
				<image :src="imgUrl +'lg-close-w.png'" class="lg-close-w" @click.stop="hides('QSpop')"></image>
			</view>
		</QSPopup>
		
		<image src="/static/back-top.png" class="back-top" mode="" v-if="backTopShow" @click="backTop"></image>
	</view>
</template>

<script>
	const app = getApp()
	let timer = ''
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import http from '@/api/http.js'
	export default {
		components:{QSPopup},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				current:1,//1今日团品  2限时秒杀
				imgUrl:app.globalData.imgUrl,
				sysData:{},//顶部数据   
				mainList:[],//团品
				list:[],//商品
				coupon:true,//显示优惠券
				couponList:[],//优惠券
				imbibition:false,//吸顶tab
				onSec:false,//限时秒杀是否开启
				onNow:false,//今日团品是否有数据
				hr:0,
				min:0,
				sec:0,
				endTime:0,//结束时间戳
				page:1,
				userId:0,//上级id
				mineId:0,//自己id
				backTopShow:false,
				backTopHeight:0,
				
				bannerList:[],
			}
		},
		onLoad(option) {
			// uni.showLoading({
			// 	title:'加载中'
			// })
			console.log(this.imgUrl)
			this.backTopHeight = uni.getSystemInfoSync().windowHeight * 3;
			if(option.userid){
				this.userId = option.userid
				uni.setStorageSync('otherid',this.userId)
			}
			// this.getTomoDate()
			this.getIndex()
			this.getCoupon()
			this.getBanner()
			timer = setInterval(()=>{
				this.countdown()
			},1000)
		},
		onShow() {
			let mineid = uni.getStorageSync('user_id')
			if(mineid){
				this.mineId = mineid
			}
			this.getIndex()
		},
		onPullDownRefresh() {
			console.log('refresh');
			
			setTimeout( ()=> {
				this.page = 1
				this.current = 1
				// this.getTomoDate()
				this.getIndex()
				this.getCoupon()
				this.getBanner()
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		onShareAppMessage(e) {
			console.log(e)
			let that = this
			if (e.from === 'button') {// 来自页面内分享按钮
				console.log(e.target)
			}
			return {
				title: '优选',
				path: '/pages/index/index?userid=' + that.mineId
			}
		},
		onPageScroll(e) {
			// let heightBar = this.CustomBar + 206
			if(e.scrollTop >= 206){
				this.imbibition = true
			}else{
				this.imbibition = false
			}
			if(e.scrollTop > this.backTopHeight){
				this.backTopShow = true
			}else{
				this.backTopShow = false
			}
		},
		onReachBottom() {
			this.getNew()
		},
		onUnload() {
			clearInterval(timer)
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			backTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			getTomoDate(){
				let today = new Date().getTime()
				let todayTxt = new Date()
				let tomorrow = today + (60 * 60 * 24 * 1000)
				let tomoCount = new Date(tomorrow)
				// 明天中午12点
				let tomoDay = tomoCount.getFullYear() + '/' + (tomoCount.getMonth() + 1) + '/' + tomoCount.getDate() + ' ' + '12:00:00'
				// 当天中午12点
				let todayCount = todayTxt.getFullYear() + '/' + (todayTxt.getMonth() + 1) + '/' + todayTxt.getDate() + ' ' + '12:00:00'
				let todayEnd = new Date(todayCount).getTime()
				if(this.current == 1){
					if(today < todayEnd){
						this.endTime = todayEnd
					}else{
						this.endTime = new Date(tomoDay).getTime()
					}
				}else{
					this.endTime = new Date(tomoDay).getTime()
				}
				console.log(this.endTime)
			},
			countdown(){
				const end = this.endTime * 1000
				const now = Date.parse(new Date())
				const msec = end - now;
				
				if (msec <= 0) {
					this.hr = 0
					this.min = 0
					this.sec = 0
					clearInterval(timer)
					this.getIndex()
					return;
				}
				let day = parseInt(msec / 1000 / 60 / 60 / 24) * 24;
				let hr = parseInt((msec / 1000 / 60 / 60) % 24);
				let min = parseInt((msec / 1000 / 60) % 60);
				let sec = parseInt((msec / 1000) % 60);
				let allHr = day + hr
				this.hr = allHr > 9 ? allHr : '0' + allHr;
				// this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
			},
			changeCurrent(type){
				this.page = 1
				this.current = type
				// uni.showLoading({
				// 	title:'加载中'
				// })
				// this.getTomoDate()
				this.getIndex()
				// if(this.current == 2){
				// 	if(this.mainList.length == 0){
				// 		this.onSec = false
				// 		this.current = 1
				// 		this.getIndex()
				// 	}else{
				// 		this.onSec = true
				// 	}
				// }
				
				clearInterval(timer)
				timer = setInterval(()=>{
					this.countdown()
				},1000)
				
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/index/detail?id=' + item.id + '&current=' + this.current
				})
			},
			hidCoupon(){
				this.coupon = false
			},
			toCoupon(){
				// uni.navigateTo({
				// 	url:'/pages/mine/coupon'
				// })
				let couponId = ''
				this.couponList.map(item=>{
					couponId += item.id + ','
				})
				couponId = couponId.substring(0,couponId.length - 1)
				console.log(couponId)
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					coupon_id:couponId
				}
				http('/api/index/receive_coupon', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200){
						uni.showToast({
							icon:'none',
							title:res.mess
						})
						this.hides('QSpop')
						this.getCoupon()
					}
				})
			},
			//获取优惠券
			getCoupon(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token')
				}
				http('/api/index/coupon_list', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200){
						this.couponList = res.data
					}
				})
			},
			// 获取轮播图
			getBanner(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token')
				}
				http('/api/banner/index', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200 || res.status == 200){
						this.bannerList = res.data
					}
				})
			},
			getIndex(){
				let data = {
					type:this.current,
					page:1,
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token')
				}
				http('/api/index/index', 'post',data).then(res => {
					console.log(res)
					// uni.hideLoading()
					if(res.code == 200){
						this.sysData = res.data.sys_set
						this.mainList = res.data.top_data
						this.list = res.data.goods_list
						if(this.mainList.length > 0){
							this.endTime = this.mainList[0].time_end
						}else if(this.list.length > 0){
							this.endTime = this.list[0].time_end
						}
						if(this.current == 1){
							if(this.mainList.length > 0 || this.list.length > 0){
								this.onNow = true
							}else{
								this.onNow = false
							}
						}
						if(res.data.has_seckill == 0){
							this.onSec = false
						}else{
							if(this.current == 1&&this.mainList.length == 0&&this.list.length == 0){
								this.current = 2
								this.getIndex()
							}else{
								this.onSec = true
							}
						}
						
						if(this.current == 2){
							if(res.data.has_seckill == 0){
								this.onSec = false
								this.current = 1
								this.getIndex()
							}else{
								this.onSec = true
							}
						}
					}
				})
			},
			getNew(){
				let newList = []
				let data = {
					type:this.current,
					page:this.page + 1,
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token')
				}
				http('/api/index/index', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200){
						newList = res.data.goods_list
						this.list = this.list.concat(newList)
						this.page++
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
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #000000;	
		padding-left: 32upx;
		background-color: #fff;
		.logo{
			width: 110upx;
			height: 34upx;
		}
	}
	.logo-wrap{
		width: 100%;
		height: 300upx;
		position: relative;
		.swiper{
			width: 100%;
			height: 300upx;
		}
		.logo-item{
			width: 100%;
			height: 300upx;
		}
		.logo-bg{
			width: 100%;
			height: 300upx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.logo-white{
			width: 370upx;
			height: 156upx;
		}
		
	}
	.search-wrap{
		padding: 20upx 32upx 26upx;
		.search{
			background-color: #fff;
			padding: 15upx 28upx;
			border-radius: 50upx;
			.search-gray{
				width: 34upx;
				height: 34upx;
			}
			.search-txt{
				margin-left: 22upx;
				color: #878787;
			}
		}
	}
	
	.today-group-wrap{
		text-align: center;
		padding: 10upx 10upx 40upx;
		.today-group{
			position: relative;
			letter-spacing: 2upx;
			.today-group-line{
				width: 50upx;
				height: 6upx;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
				border-radius: 8upx;
				position: absolute;
				left: 50%;
				bottom: -5upx;
				transform: translateX(-50%);
			}
		}
	}
	.group-tab-im{
		position: fixed;
		left: 0;
		width: 100%;
		height: 70upx;
		z-index: 100;
		background-color: #fff;
		
		.tab-im{
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #7d7d7d;
		}
		.act-im{
			color: #303030;
		}
	}
	.group-line{
		width: 128upx;
		height: 8upx;
		background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
		border-radius: 8upx;
	}
	.group-wrap{
		padding: 0 10upx 50upx;
		
		.group-tab{
			position: relative;
			// display: flex;
			padding-bottom: 65upx;
			.group-tab-item{
				width: 50%;
				background-color: #f4f4f4;
				flex-direction: column;
				padding: 20upx 0 30upx;
				border: 1px solid #eaeaea;
				border-radius: 20upx 20upx 0 0;
				display: flex;
				align-items: center;
				color: #7d7d7d;
			}
			.act{
				color: #303030;
				background-color: #fff;
				box-shadow: 2upx 0upx 2upx 0upx #ddd;
				border-radius: 20upx 20upx 0 0;
			}
			.today-wrap{
				width: 100%;
				height: 80upx;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 10;
				border-radius: 20upx 20upx 0 0;
				padding: 0 30upx;
				.today-img{
					width: 118upx;
					height: 30upx;
				}
				.today-txt-left{
					font-weight: bold;
					color: #fff;
					font-style: italic;
				}
			}
		}
		.group-goods{
			// padding: 50upx 10upx 90upx;
			padding: 30upx 10upx;
			background-color: #fff;
			position: relative;
			display: flex;
			// align-items: flex-end;
			// flex-direction: column;
			.banner-box{
				width: 480upx;
				height: 350upx;
				background-color: #ffa6bc;
				position: relative;
				z-index: 10;
				.banner{
					width: 476upx;
					height: 346upx;
				}
				.img-no{
					width: 172upx;
					height: 172upx;
					color: #fff;
					background-color: #000;
					opacity: 0.5;
					font-size: 40upx;
					border-radius: 50%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					z-index: 10;
					// font-weight: bold;
					text-align: center;
					line-height: 172upx;
				}
			}
			.rush-now-wrap{
				width: 534upx;
				height: 50upx;
				padding-right: 23upx;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
				display: flex;
				justify-content: flex-end;
				align-items: center;
				position: relative;
				z-index: 10;
				.right-white{
					width: 12upx;
					height: 21upx;
					margin-left: 14upx;
				}
			}
			.group-goods-line{
				background-color: #f7ccdd;
				width: 50%;
				height: 6upx;
				position: absolute;
				top: 134upx;
				left: 10upx;
				z-index: 1;
			}
			.group-goods-intr{
				width: 250upx;
				height: 350upx;
				padding: 20upx;
				border: 1px solid #ffbece;
				background-color: #fff9fb;
				// position: absolute;
				// top: 154upx;
				// left: 10upx;
				// z-index: 20;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.goods-intr-box{
					position: relative;
					background-color: #f4f4f4;
					padding: 10upx 6upx 10upx 14upx;
					margin-top: 18upx;
					margin-bottom: 10upx;
					.intr-img{
						width: 40upx;
						height: 84upx;
						position: absolute;
						left: -14upx;
						top: -10upx;
						z-index: 10;
					}
				}
				.font-ware{
					font-size: 32upx;
					font-family: 'SimHei';
				}
				.goods-intr{
					font-size: 20upx;
					color: #c1c1c1;
				}
				.old-price{
					padding-left: 88upx;
					margin-bottom: 6upx;
				}
			}
		}
		
	}
	.wares-wrap{
		padding: 0 10upx 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.wares-item{
			border-radius: 20upx;
			background-color: #fff;
			margin-bottom: 38upx;
			width: 355upx;
			.img-wrap{
				position: relative;
				width: 355upx;
				height: 351upx;
				.imgs{
					width: 355upx;
					height: 351upx;
					border-radius: 20upx 20upx 0 0;
				}
				.img-no{
					width: 172upx;
					height: 172upx;
					color: #fff;
					background-color: #000;
					opacity: 0.5;
					font-size: 40upx;
					border-radius: 50%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					z-index: 10;
					// font-weight: bold;
					text-align: center;
					line-height: 172upx;
				}
			}
			.wares-txt{
				padding: 10upx 20upx 28upx;
				
				.wares-intr-box{
					position: relative;
					background-color: #f4f4f4;
					padding: 10upx 6upx 10upx 14upx;
					margin-top: 18upx;
					margin-bottom: 12upx;
					.wares-intr-img{
						width: 35upx;
						height: 50upx;
						position: absolute;
						left: -10upx;
						top: -6upx;
						z-index: 10;
					}
					.wares-intr{
						font-size: 20upx;
						color: #c1c1c1;
					}
				}
				.price-wrap{
					position: relative;
					min-height: 64upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.line-price{
						font-size: 24upx;
						color: #B4B4B4;
						text-decoration: line-through;
						position: absolute;
						right: -4upx;
						top: 20upx;
					}
				}
				.rush-now-btn{
					font-size: 20upx;
					color: #fff;
					width: 144upx;
					height: 46upx;
					text-align: center;
					line-height: 46upx;
					background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
					border-radius: 50upx;
					margin: 0 auto;
				}
				.rush-act{
					background: #aaa;
				}
			}
		}
	}
	.bot-data{
		padding-bottom: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #BFBFBF;
		font-size: 24upx;
	}
	
	.coupon-wrap{
		position: fixed;
		right: 0upx;
		top: 40%;
		z-index: 100;
		.coupon-box{
			position: relative;
			width: 104upx;
			height: 104upx;
			.coupon-bg{
				width: 104upx;
				height: 104upx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
			.rob{
				position: absolute;
				top: 12upx;
				left: 50%;
				transform: translateX(-50%);
				z-index: 10;
				font-size: 24upx;
				color: #DF57A5;
			}
			.coupon{
				position: absolute;
				top: 56upx;
				left:21upx;
				z-index: 10;
				font-size: 20upx;
				color: #fff;
			}
		}
		.lg-close{
			width: 26upx;
			height: 26upx;
			margin-top: 20upx;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
	.cou-wrap{
		width: 600upx;
		height: 520upx;
		padding: 0 53upx;
		position: relative;
		.lg-cou-bg{
			width: 600upx;
			height: 520upx;
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
		}
		.lg-cou-bgbot{
			width: 600upx;
			height: 236upx;
			position: absolute;
			z-index: 11;
			bottom: 0;
			left: 0;
		}
		.lg-rece-box{
			width: 275upx;
			height: 69upx;
			position: absolute;
			z-index: 12;
			bottom: 42upx;
			left: 161upx;
		}
		.lg-rece-bg{
			width: 275upx;
			height: 69upx;
			position: absolute;
			z-index: 12;
			bottom: 0;
			left: 0;
		}
		.lg-rece{
			width: 154upx;
			height: 43upx;
			position: absolute;
			z-index: 13;
			bottom: 12upx;
			left: 61upx;
		}
		.lg-money-s{
			width: 40upx;
			height: 40upx;
			position: absolute;
			z-index: 15;
			top: 68upx;
			right: 14upx;
		}
		.lg-money-l{
			width: 54upx;
			height: 54upx;
			position: absolute;
			z-index: 15;
			bottom: 160upx;
			left: 53upx;
		}
		.lg-money-xl{
			width: 69upx;
			height: 64upx;
			position: absolute;
			z-index: 15;
			bottom: 138upx;
			right: 107upx;
		}
		.cou-title{
			position: relative;
			z-index: 10;
			font-size: 40upx;
			color: #fff;
			font-weight: bold;
			padding: 30upx 0;
			text-align: center;
		}
		
		.lg-close-w{
			width: 64upx;
			height: 64upx;
			position: absolute;
			z-index: 15;
			bottom: -100upx;
			left: 50%;
			transform: translateX(-50%);
		}
		.cou-item-wrap{
			
			.cou-item-scroll{
				height: 284upx;
				.cou-item-box{
					box-shadow: inset 0px 0px 2px 1px #e7cde2; 
				}
				.cou-item{
					width: 292upx;
					height: 284upx;
					position: relative;
					flex: none;
					.cou-item-bg{
						width: 292upx;
						height: 284upx;
						position: absolute;
						z-index: 9;
						top: 0;
						left: 0;
					}
					.item-main{
						position: relative;
						z-index: 10;
						padding: 26upx 20upx;
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}
			}
		}
	}
	
	.back-top{
		width: 80upx;
		height: 80upx;
		position: fixed;
		right: 30upx;
		bottom: 100upx;
		z-index: 110;
		background: #fff;
		border-radius: 50%;
	}
</style>
