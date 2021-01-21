<template>
	<view class="content" >
		<image src="/static/image/img/mine-bg.png" class="mine-bg" :style="[{height:(CustomBar + 182) + 'px'}]" mode=""></image>
		<view class="tops">
			<view class="statusBox" :style="[{height:(StatusBar + 10) + 'px'}]"></view>
			<view class="top-title">我的</view>
			<view class="head-wrap">
				<view class="left">
					<image class="headImage" mode="" :src="userData.headimgurl" ></image>
					<view class="coder " v-if="userData.level == 1">
						接码员
					</view>
					<view class="coder coder2" v-if="userData.level == 2">
						码经理
					</view>
					<view class="coder coder3" v-if="userData.level == 3">
						码总监
					</view>
					<view class="center">
						<view class="name top overflow_one">{{userData.nickname}}</view>
						<view class="name bottom overflow_one">ID:{{userData.unique_id || ''}}</view>
					</view>
				</view>
				<!-- <view class="set-btn" @tap="goSet">
					编辑信息
				</view> -->
			</view>
			
			<!-- <view class="back" @tap="backHome">返回首页</view> -->
			<!-- <image class="bottomImage" src="../../static/image/user/bottom.png" mode="" @tap="topImage"></image> -->
			<view class="bottomImage">
				<view class="income-wrap">
					<view class="income">
						<view class="income-price">{{userData.today || 0}}</view>
						<view class="income-txt">今日收益(元)</view>
						
					</view>
					<view class="income">
						<view class="income-price">{{userData.jackpot_price || 0}}</view>
						<view class="income-txt">累计收益(元)</view>
						
					</view>
					<view class="income">
						<view class="income-price">{{userData.available || 0}}</view>
						<view class="income-txt">可提现金额(元)</view>
						
					</view>
				</view>
				<view class="tx-wrap">
					<view class="tx-btn" @tap="txNow">
						立即提现
					</view>
				</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="title">
				<view class="titleName">我的任务</view>
				<view class="right" @tap="orderBtn(0)">查看全部<uni-icons class="icons" type="arrowright" color="#999" size="12"/></view>
			</view>
			<view class="clearBoth"></view>
			<view class="orderBtns">
				<view class="boxs" v-for="(item,index) in orderData" :key="index" @tap="orderBtn(index)" :style=" index == 1 ? {'width':'60%'} : {'width':'20%'} ">
					<image class="images" :src="item.src" mode=""></image>
					<view class="name">{{item.name}}</view>
				</view>
				<view class="clearBoth"></view>
			</view>
		</view>
		<view class="toolsBox">
			<view class="rows" @tap="toolsBtn(6)">
				<view class="">
					<view class="font36 fontBold row-act">我的团队</view>
				</view>
				<uni-icons class="icons" type="arrowright" color="rgb(197,197,197)" size="12"/>
			</view>
			<view class="disFlex" style="flex-wrap: wrap;">
				<view class="rows-warp" v-for="(item,index) in toolsData" :key="index" @tap="toolsBtn(index)">
					<view class="rows-item">
						<image class="iconLefts" :src="item.src" mode=""></image>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>
<style>
	page{background:#F8FCFF;}
	.statusBox{width:100%;}
	.content{position: relative;z-index: 1;}
	.mine-bg{width: 100%;position: absolute;top: 0;left: 0;z-index: -1;}
	.top-title{font-size: 36upx;color: #111111;font-weight: bold;text-align: center;margin-bottom: 16upx;}
	.head-wrap{padding: 50upx 30upx;display: flex;justify-content: center;}
	/* .content .tops{width:100%;height: 520upx;position: relative;background:url(../../static/image/img/mine-bg.png);background-repeat: no-repeat;background-size: 100% 100%;} */
	.content .tops .left{display: flex;align-items: center;flex-direction: column;position: relative;}
	.coder{width: 128upx;height: 36upx;font-size: 24upx;line-height: 36upx;text-align: center;color: #fff;background: #ABAAAC;border-radius: 30upx;position: absolute;top: 116upx;left: 50%;transform: translateX(-50%);z-index: 20;}
	.coder2{background: #56A9E8;}
	.coder3{background: #DD9F47;}
	.content .tops .left .headImage{width:136upx;height:136upx;border-radius: 50%;}
	.content .center{margin-top: 30upx;display: flex;flex-direction: column;justify-content: center;}
	.content .center .name{}
	.content .center .top{font-size: 36upx;font-weight: bold;text-align: center;}
	.content .center .bottom{font-size:26upx;margin-top:10upx;color: #8E8E8E;}
	.head-wrap .set-btn{font-size: 26upx;color: #fff;padding: 14upx 34upx;background: linear-gradient(132deg, #0E1D1A 0%, #418A89 100%);box-shadow: 0px 1px 6px 0px rgba(255, 255, 255, 0.7);border-radius: 100upx 0px 0px 100upx;;}
	.content .back{background: white;color:rgb(78,178,244);padding:0 20upx;border-radius: 100upx;height:50upx;line-height: 50upx;font-size: 12px;margin-left: 3%;margin-top: 20upx;}
	
	.content .bottomImage{padding: 0 30upx 48upx;}
	.content .bottomImage .income-wrap{display: flex;justify-content: space-between;}
	.content .bottomImage .income-wrap .income{text-align: center;min-width: 160upx;}
	.content .bottomImage .income-wrap .income .income-price{font-size: 48upx;color: #409BE0;font-weight: bold;font-family: my-font;}
	.content .bottomImage .income-wrap .income .income-txt{font-size: 24upx;color: #8E8E8E;}
	.content .bottomImage .tx-wrap{margin-top: 40upx;}
	.content .bottomImage .tx-wrap .tx-btn{font-size: 36upx;color: #fff;height: 90upx;line-height: 90upx;text-align: center;background: linear-gradient(0deg, #409BE0 0%, #76B6FF 100%);border-radius: 45upx;}
	
	.content .orderBox{width:90%;padding:2.5%;margin-left: 2.5%;margin-top:20upx;background: white;border-radius: 10upx;}
	.content .orderBox .titleName{float: left;color: #333;font-weight: bold;font-size: 36upx;}
	.content .orderBox .right{float: right;font-size: 30upx;color: #999999;}
	.content .orderBox .right .icons{position: relative;}
	.content .orderBtns{width:100%;display: flex;background: white;margin-top: 20upx;}
	.content .orderBtns .boxs{justify-content: center;margin-top:30upx;text-align: center;}
	.content .orderBtns .boxs .images{width:56upx;height:56upx;}
	.content .orderBtns .boxs .name{font-size: 24upx;}
	.content .toolsBox{width:95%;background:white;border-radius: 10upx;margin-top: 40upx;margin-left: 2.5%;margin-bottom: 60upx;}
	.content .toolsBox .rows{width:95%;padding:4%;padding-left: 5%;display: flex;justify-content: space-between;align-items: center;}
	.rows-warp{width: 33.33%;}
	.content .toolsBox .rows-item{display: flex;flex-direction: column;align-items: center;padding: 30upx 0;}
	.content .toolsBox .rows-item .row-act{font-size: 36upx;color: #333333;font-weight: bold;}
	.content .toolsBox .iconLeft{width:30upx;height:34upx;float: left;position: relative;top:4upx;margin-right:20upx}
	.content .toolsBox .iconLefts{width:48upx;height:48upx;position: relative;top:4upx;}
	.content .toolsBox .name{font-size: 28upx;color: #555555;margin-top: 20upx;}
	.content .toolsBox .icons{margin-right: 2%;margin-top: 8upx;}
	
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				screenHeight:"",
				userData:{},
				orderData:[
					{"src":"../../static/image/img/receive.png","name":"已领取"},
					{"src":"../../static/image/img/dwc.png","name":"待完成"},
					{"src":"../../static/image/img/ywc.png","name":"已完成"},
					
				],
				toolsData:[
					{"src":"../../static/image/img/mine-icon1.png","name":"收益明细"},
					{"src":"../../static/image/img/mine-icon2.png","name":"推广二维码"},
					{"src":"../../static/image/img/mine-icon3.png","name":"我的推荐人"},
					{"src":"../../static/image/img/mine-icon4.png","name":"修改登陆密码"},
					{"src":"../../static/image/img/mine-icon5.png","name":"咨询客服"},
					{"src":"../../static/image/img/mine-icon6.png","name":"退出登录"},
				],
				AjaxData:{},
				_$token:"",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			}
		},
		onShow(){
			var that = this;
			const res = uni.getSystemInfoSync();
			this.screenHeight = res.windowHeight*2 - 100 + 'upx'
			this.getStorage();
			try {
			    uni.removeStorageSync('addrInfo');
			} catch (e) {}
			setTimeout(function(){
				that.AjaxMsg();
			},100)
		},
		methods: {
			getStorage(){
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value;
					}else{
						that._$token = ""
					}
				} catch (e) {}},
			AjaxMsg(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					that.userData = res.data.data
				},error=>{})
			},
			backHome(){uni.navigateTo({url:"../index/index"})},
			topImage(){},
			orderBtn(index){
				if( index == -1 ){
					uni.navigateTo({url:"./order/order?index=0"})
				}else if( index == 0 ){
					uni.navigateTo({url:"./order/order?index=0"})
				}else if( index == 1 ){
					uni.navigateTo({url:"./order/order?index=1"})
				}else if( index == 2 ){
					uni.navigateTo({url:"./order/order?index=2"})
				}
			},
			txNow(){
				uni.navigateTo({url:"./myProceeds/myProceeds?price=" + this.userData.available + '&per=' + this.userData.withdrawal_fee+ '&type=' + this.userData.withdrawal}
			)},
			toolsBtn(index){
				if( index == 0 ){
					uni.navigateTo({url:"/pages/user/myProceeds/details/details?type=1"})
					// uni.navigateTo({url:"./myItem/myItem"})
				}else if( index == 1 ){
					uni.navigateTo({url:"./share/share"})
				}else if( index == 2 ){
					 uni.navigateTo({url:"./myItem/myItem"})
				}else if( index == 3 ){
					uni.navigateTo({url:"./forgetPassWord/forgetPassWord"})
					
				}else if( index == 4 ){
					uni.navigateTo({
						url:'./socket/socket'
					})
					
				}else if( index == 5 ){
					this.outBtn()
				}else if( index == 6 ){
					uni.navigateTo({url:"./myItems/myItem"})
				}
			},
			goSet(){uni.navigateTo({url:"./set/set"})},
			
			outBtn(){
				uni.showModal({
					title:'退出登录',
					content:'确认退出登录吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setStorageSync('token','');
							try {
							    uni.setStorageSync('token','');
							} catch (e) {}
							uni.reLaunch({
								url:"/pages/login/login"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			
			
		}
	}
</script>