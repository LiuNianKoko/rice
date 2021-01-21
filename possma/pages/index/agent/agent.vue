<template>
	<view class="content">
		<view class="topBox" @tap="next">
			<view class="tip">欢迎加入我们</view>
			<view class="tips">叮叮挪车期待您的加入</view>
		</view>
		<view class="splites"></view>
		<view class="title">
			<view class="titleName">{{titleName}}</view>
			<view class="splite"></view>
		</view>
		
		<view class="html" v-html="html"></view>
		<!-- <view class="littleTitle fontSize14">¥{{money}}一次付费终身有效</view>
		<view class="rows" v-for="(item,index) in rowsData" :key="index">
			<image class="icon" :src="item.src" mode="widthFix"></image>
			<view class="right">
				<view class="name">{{item.name}}<view class="names">{{item.names}}</view><view class="contents">{{item.contents}}</view></view>
				<view class="clearBoth"></view>
			</view>
		</view>
		<view class="isTrue" v-if="isAgent">
			<image class="icon" src="../../../static/image/index/icon_12.png" mode=""></image>
			<view class="name fontSize14">随时退款</view>
		</view> -->
		
		
		<view class="next fontSize15" @tap="next" v-if="showBtn">{{sureContent}}</view>
		
		<view class="shaDow" v-if="showShadow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="box" @tap="payWay(0)">
					<image class="image" src="../../../static/image/user/set/myProceeds/icon_1.png" mode=""></image>
					<view class="names">支付宝</view>
				</view>
				<view class="box" @tap="payWay(1)">
					<image class="image" src="../../../static/image/user/addr/icon_vx.png" mode=""></image>
					<view class="names">微信</view>
				</view>
				<view class="clearBoth"></view>
				<view class="false" @tap="close">取消</view>
			</view>
		</view>
		
		
	</view>
</template>
<style>
	.content .isTrue{width:95%;margin-left: 5%;}
	.content .isTrue .icon{width:28upx;height:28upx;float: left;position: relative;top:6upx}
	.content .isTrue .name{float: left;color:#535353;margin-left: 20upx;}
	
	.content .topBox{width:100%;height:330upx;position: relative;background-image: url(../../../static/image/user/agent/icon_1.png);background-repeat: no-repeat;background-size: 100% 100%;}
	.content .topBox .tip{width:50%;background: rgb(138,179,255);color:white;border-radius: 10upx;text-align: center;padding:10upx 0;position: absolute;top:30%;right:10%}
	.content .topBox .tips{width:50%;color: rgb(138,179,255);border-radius: 10upx;text-align: center;padding:10upx 0;position: absolute;top:50%;right:10%;font-size: 13px;}
	.content .splites{width:100%;height:20upx;background: rgb(244,244,244);}
	.content .title{width:90%;padding:3% 2.5%;margin-left: 2.5%;position: relative;}
	.content .title .titleName{font-weight:bold;}
	.content .littleTitle{color:#535353;margin:20upx 0;margin-left: 5%;}
	.content .title .splite{width:40upx;height:4upx;background: rgb(78,178,244);margin-top:10upx;border-radius: 20upx;}
	.content .rows{width:90%;padding:3% 2.5%;margin-bottom: 80upx;margin-left: 2.5%;}
	.content .rows .icon{width:25upx;height:25upx;float: left;position: relative;top:10upx}
	.content .rows .right{width:85%;margin-left:3%;float: left;display:flex;}
	.content .rows .right .name{text-align:left;font-size:13px;color:#4CA6D5;display: inline;}
	.content .rows .right .names{text-align:left;font-size:13px;color:#434343;display: inline;}
	.content .rows .right .contents{text-align:left;font-size: 13px !important;color:#7D7D7D;display: inline;}
	.content .next{width:90%;padding:3% 2.5%;margin-bottom: 80upx;margin-left: 2.5%;text-align: center;color: white;background: rgb(78,178,244);border-radius: 100upx;}
	.content .shaDow{width:100%;height:100%;position: fixed;top:0;left:0}
	.content .shaDow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .shaDow .bg_white{width:60%;padding:5%;position: fixed;top:40%;left:15%;background:white;border-radius: 10upx;}
	.content .shaDow .bg_white .box{width:50%;text-align: center;float: left;}
	.content .shaDow .bg_white .box .image{width:50upx;height: 50upx;}
	.content .shaDow .bg_white .box .names{margin-top:10upx;font-size:15px;}
	.content .shaDow .bg_white .false{letter-spacing: 4upx;border-top:1px solid rgb(229,229,229);padding-top: 20upx;text-align: center;color:#959595;font-size:17px;margin-top: 70upx;}
	.content .html{width:90%;padding:2.5%;margin-left: 2.5%;}
</style>
<script>
	export default {
		data() {
			return {
				rowsData:[
					{'src':'../../../static/image/index/icon_11.png','contents':'一次性批发50个17.9元的挪车贴15.9元，100个 13.9元。'},
					{'src':'../../../static/image/index/icon_11.png','contents':'一次性批发10～30个29.8元的挪车贴26.8元50～ 80个24.8元。80～100个23.8元。'},
				],
				sureContent:"",
				titleName:"",
				showShadow:false,
				isAgent:false,
				money:"",
				html:"",
				_$token:"",
				showBtn:false,
			}
		},
		onLoad(){
			var that = this;
			this.getStorage();
			setTimeout(function(){
				that.AjaxIsAgent();
				that.AjaxLoad()
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxIsAgent(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res =>{
					if( res.data.data.is_dealer == 1 ){
						this.titleName = "加入我们的好处"
						this.showBtn = true
						this.isAgent = false
					}else{
						this.isAgent = true
						if(  res.data.data.can_tuikuan == 1 ){
							this.showBtn = true
						}else if( res.data.data.can_tuikuan == 0 ){
							this.showBtn = false
						}
						this.sureContent = "立即退款"
						this.titleName = "您的权益"
					}
				},error=>{})
			},
			AjaxLoad(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":1
				};
				this._$InitRequest.request('User/get_rechargePrice', param).then(res =>{
					this.money = res.data.data
					if( this.isAgent == false ){
						this.sureContent = "¥"+ res.data.data +"立刻加入我们"
					}
				},error=>{})
				
				let params={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":5
				};
				this._$InitRequest.request('User/sys_text', params).then(res =>{
					this.html = res.data.data.content
				},error=>{})
				
			},
			next(){
				if( this.isAgent == false ){
					this.showShadow = true
				}else{
					uni.navigateTo({url:"../refund/refund"})
				}
			},
			close(){this.showShadow = false},
			payWay(index){
				if( index == 0 ){
					this.payFunc(2);
				}else{
					this.payFunc(1);
				}
			},
			payFunc(e){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"price":this.money,
					"pay_type":e,
				};
				this._$InitRequest.request('User/buy_distributor', param).then(res => {
					var packages = "prepay_id="+res.data.data.prepay_id
					if( res.data.code !== 200 ){
						uni.showToast({icon:"none",title:res.data.mess})
						return; 
					}else{
						if( e == 2 ){
							uni.requestPayment({
							    provider: 'alipay',
							    orderInfo:res.data.data,
							    success: function (res) {
							       uni.showToast({icon:"none",title:"支付成功"})
								   that.showShadow = false
								   setTimeout(function(){
										uni.navigateTo({url:"../index"})
								   },1000)
							    },
							    fail: function (err) {
									uni.showToast({icon:"none",title:"支付失败"})
							    }
							});
						}else if( e == 1 ){
							uni.requestPayment({
							    provider: 'wxpay',
								orderInfo:{
									"appid": res.data.data.appid,
									"noncestr": res.data.data.nonce_str,
									"package": res.data.data.package,
									"partnerid": res.data.data.partnerid,
									"prepayid": res.data.data.prepay_id,
									"timestamp": res.data.data.time,
									"sign": res.data.data.sign,
								},
							    success: (e) => {
									setTimeout(function(){
										uni.navigateTo({url:"../index"})
									},1000)
							    },
							    fail: (e) => {
									uni.showToast({icon:"none",title:"支付失败"})
							    },
							})
						}
					}
				},error=>{})
			},
			
		}
	}
</script>
<style lang="scss" scoped>
.content .html{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>