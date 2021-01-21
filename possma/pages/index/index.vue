<template>
	<view class="content">
		
		<view class="statusBox" :style="[{height:StatusBar + 'px'}]" :class="isBg?'bg_co':''">
			
		</view>

		<view class="bg_title" :style="[{top:StatusBar+ 'px'}]" :class="isBg?'bg_co':''">
			<image class="QR_icon" src="/static/image/img/msg.png" mode="" @tap.stop="btnQR"></image>
			<image class="User_icon" src="/static/image/img/set.png" mode="" @tap.stop="goUser"></image>
			<view class="titleNames">首页</view>
		</view>
		<view class="index_bg">
			<image src="/static/image/img/index-bg.png" class="bg" mode=""></image>
			<!-- <view class="index_box">
				<image src="/static/image/img/index-title.png" class="index_title" mode=""></image>
				<view class="icon_wrap">
					<image src="/static/image/img/index-icon1.png" class="icon" mode=""></image>
					<image src="/static/image/img/index-icon2.png" class="icon" mode=""></image>
					<image src="/static/image/img/index-icon3.png" class="icon" mode=""></image>
				</view>
			</view> -->
		</view>
		<view class="main_box">
			<view class="coupon-box" @tap="toDailyTask">
				<image src='/static/image/img/qiangma.png' class="coupon" mode=""></image>
			</view>
			<view class="goods-wrap">
				<view class="goods_box" v-for="(item,index) in list" @tap="inSells(item.id,2)" :key="index">
					<image :src="item.thumb_url" class="goods_img" mode=""></image>
					<view class="text_box txt">
						<view class="goods_name line2">
							{{item.goods_name || ''}}
						</view>
						<view class="goods_price_box paddingBottom10">
							<view class="goods_price">
								<view style="font-size: 24upx;">￥</view>
								<view style="font-size: 28upx;">{{item.shop_price || 0}}</view>
							</view>
							<view class="goods_btn">
								立即购买
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="goods_box" @tap="toQuestion">
				<image :src="info.wenjuan_pic" class="goods_img" mode=""></image>
				<view class="text_box">
					<image src="/static/image/img/question.png" class="question" mode=""></image>
				</view>
			</view> -->
			<view class="">
				<image src="/static/image/img/yimatianxia.png" class="yimatianxia" mode=""></image>
			</view>
		</view>
		
		<view class="hids" v-if="hids">
			
		</view>
		<view class="hids-main" v-if="hids">
			<view class="disBetween tips-con scale-1px-bottom">
				<view class="font28">
					温馨提示
				</view>
				<view class="disCenter" @click="hidsClick">
					<image src="/static/image/img/close.png" class="close-hids" mode=""></image>
				</view>
			</view>
			<view class="tips-main">
				<view v-html="tipsContent"></view>
			</view>
			<view class="tips-con disBetween">
				<view>
					
				</view>
				<view class="hids-btn" @click="hidsClick">
					知道啦
				</view>
			</view>
			
		</view>
	</view>
</template>
<style>
	page{
		background: #032456;
	}
	.hids-main{
		width: 80%;
		height: 66%;
		background: #fff;
		border-radius: 8upx;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 200;
		padding: 10upx 30upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.close-hids{
		width: 30upx;
		height: 30upx;
	}
	.tips-con{
		width: 100%;
		height: 80upx;
		flex: none;
		color: #333;
	}
	.tips-main{
		flex: 1;
		overflow: auto;
		padding: 20upx 0;
	}
	.hids-btn{
		padding: 10upx 30upx;
		background: #409BE0;
		color: #fff;
		font-size: 30upx;
		border-radius: 6upx;
	}
	.statusBox {
		width: 100%;
		height: 90upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
	}
	.bg_co{
		background: #032456;
	}
	.content {
		width: 100%;
		padding: 0;
		overflow-x: hidden;
		/* margin-top: 90upx; */
	}

	.content .bg_title {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		position: fixed;
		left: 0;
		z-index: 100;
	}

	.content .QR_icon {
		width: 44upx;
		height: 44upx;
		position: absolute;
		top: 30upx;
		left: 5%;
		z-index: 20;
	}

	.content .titleNames {
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 40upx;
		position: absolute;
		top: 0;
		left: 0%;
		z-index: 2;
		color: #fff
	}

	.content .User_icon {
		width: 44upx;
		height: 44upx;
		position: absolute;
		top: 26upx;
		right: 5%;
		z-index: 20;
	}

	.content .Agent_icon {
		width: 150upx;
		height: 150upx;
		position: fixed;
		top: 85%;
		right: 5%;
		z-index: 4;
	}
	.index_bg{
		height: 580upx;
		position: relative;
	}
	.index_bg .bg{
		width: 100%;
		height: 580upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}
	.index_bg .index_box{
		padding: 210upx 50upx 100upx;
	}
	.index_bg .index_box .index_title{
		width: 100%;
		height: 166upx;
	}
	.index_bg .index_box .icon_wrap{
		margin-top: 80upx;
		display: flex;
		justify-content: space-between;
	}
	.index_bg .index_box .icon_wrap .icon{
		width: 190upx;
		height: 110upx;
	}
	.main_box{
		padding: 30upx;
		position: relative;
	}
	.coupon-box{
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}
	.coupon{
		width: 100%;
		height: 280upx;
	}
	.goods-wrap{
		display: flex;
		justify-content: space-between;
	}
	.goods_box{
		border-radius: 10upx;
		/* border: 2upx solid #F5D1AF; */
		margin-bottom: 30upx;
		width: 32%;
	}
	 .goods_box .goods_img{
		width: 100%;
		height: 220upx;
		border-radius: 10upx 10upx 0 0;
		vertical-align: middle;
	}
	 .goods_box .text_box{
		/* border-top: 2upx solid #F5D1AF; */
		border-radius: 0 0 10upx 10upx;
	}
	 .goods_box .text_box .question{
		/* height: 270upx; */
		width: 100%;
		border-radius: 0 0 14upx 14upx;
		vertical-align: middle;
	}
	 .goods_box .txt{
		/* padding: 30upx; */
		background: #fff;
		
	}
	 .goods_box .txt .goods_name{
		color: #262626;
		font-size: 28upx;
		font-weight: bold;
		max-height: 76upx;
	}
	 .goods_box .txt .goods_price_box{
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	 .goods_box .txt .goods_price_box .goods_price{
		color: #DF3400;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	 .goods_box .txt .goods_price_box .goods_btn{
		/* width: 100upx; */
		height: 36upx;
		line-height: 36upx;
		text-align: center;
		background: #409BE0;
		border-radius: 30upx;
		color: #fff;
		font-size: 24upx;
	}
	.yimatianxia{
		width: 100%;
		height: 220upx;
	}
</style>
<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isBg:false,
				list:[],
				info:{},
				_$token:'',
				hids:false,//提示
				tipsContent:''
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > 100){
				this.isBg = true
			}else{
				this.isBg = false
			}
		},
		onShow() {
			console.log(uni.getStorageSync('token'))
			var that = this;
			that.getStorage()
			setTimeout(function() {
				that.AjaxHome();
				that.AjaxGetPro();
			}, 100)
		},
		onLoad() {
			var that = this;
			that.getTips()
			let hid = uni.getStorageSync('hids')
			if(hid && hid == 1){
				that.hids = true
			}
			try {
				const value = uni.getStorageSync('token');
				if (value) {
					that._$token = value
				} else {
					try {
						uni.setStorageSync('userInfo', {
							"token": ""
						});
						that._$token = {
							id:0,
							token:''
						}
					} catch (e) {}
				}
			} catch (e) {}
			
		},
		onPullDownRefresh() {
			var that = this;
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1200)
			that.AjaxHome();
			that.AjaxGetPro();
			
		},
		methods: {
			getStorage() {
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					} 
				} catch (e) {}

			},
			// 跳转  每日任务
			toDailyTask(){
				uni.navigateTo({
					url:'/pages/user/dailyTask/robCode'
				})
			},
			getTips(){
				let that = this;
				let param={
					"user_id":"",
					"user_token":"",
					type:8
				};
				this._$InitRequest.request('User/sys_text', param).then(res => {
					that.tipsContent = res.data.data.content
					if(that.tipsContent){
						let reg = new RegExp('<img','gi')
						that.tipsContent = that.tipsContent.replace(reg,'<img style="width:100%;"')
					}
					console.log( res );
				},error=>{})
			},
			hidsClick(){
				this.hids = false
				uni.setStorageSync('hids',2)
			},
			AjaxHome() {
				
				let param = {
					"user_id": this._$token.id,
					"user_token": this._$token.token,
				};
				this._$InitRequest.request('Index/index', param).then(res => {
					// this.list = res.data.data.goods
					this.info = res.data.data
					console.log(this.list)
				}, error => {})
			},
			AjaxGetPro() {
				var that = this;
				var list = []
				that.scroolBoxs = []
				let param = {
					"user_id": this._$token.id,
					"user_token": this._$token.token,
				};
				this._$InitRequest.request('Index/goods_list', param).then(res => {

					that.list = res.data.data

				}, error => {})
			},
			inSells(id,type) {
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					if(res.data.code == 200){
						if(type == 1){
							if(this.info.member_card != 0){
								uni.showToast({
									title:'您已购买!',
									icon:'none'
								})
								return
							}
							uni.showLoading({
								title:'下单中'
							})
							uni.navigateTo({
								url:"/pages/user/sureOrder/sureOrder?num=1&id=" + id + "&goods_attr="
							})
							uni.hideLoading()
						}else{
							uni.navigateTo({
								url: "./details/details?id=" + id
							})
						}
					}else{
						this.isLog()
					}
				},error=>{})
				
			},
			isLog(){
				uni.showModal({
					title:'您暂未登录',
					content:'是否前往登录!',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.reLaunch({
								url:'/pages/login/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			toQuestion(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					if(res.data.code == 200){
						// if(this.info.wenjuan != 0){
						// 	uni.showToast({
						// 		title:'您已填写过问卷!',
						// 		icon:'none'
						// 	})
						// 	return
						// }
						uni.navigateTo({
							url:'/pages/index/question/question?type=' + this.info.wenjuan
						})
					}else{
						this.isLog()
					}
				},error=>{})
				
			},
			btnQR() {
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					if(res.data.code == 200){
						uni.navigateTo({
							url: "/pages/index/msg/msgList"
						})
					}else{
						this.isLog()
					}
				},error=>{})
			},
			goUser() {
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					if(res.data.code == 200){
						uni.navigateTo({
							url: "/pages/user/set/set"
						})
					}else{
						this.isLog()
					}
				},error=>{})
				
			},
			clickFlase() {
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				} else {
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				}
			},
			clickSure() {
				try {
					uni.setStorageSync('agreeMent', '1');
				} catch (e) {}
				this.showBeginShadow = false
			},
			jumps(e) {
				if (e == 0) {
					uni.navigateTo({
						url: "/pages/user/set/about/agree/agree?id=2"
					})
				} else if (e == 1) {
					uni.navigateTo({
						url: "/pages/user/set/about/agree/agree?id=3"
					})
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content .lasts {
		::v-deep {
			img {
				width: 100%;
			}
		}
	}
</style>
