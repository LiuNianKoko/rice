<template>
	<view class="content" :style="{'height':screenHeight}">
		<view class="splite"></view>
		<!-- <view class="addrBox" @tap="btnAddr">
			<image class="icon" src="../../../static/image/user/addr/icon_3.png" mode=""></image>
			<view class="nameBox" v-if="addrData.name">
				<view class="name overflow_one">{{addrData.name}}</view>
				<view class="addr overflow_one">{{addrData.addr}}</view>
			</view>
			<view class="nameBox" v-if="addrData.name==''">
				<view class="name overflow_one">请先选择收货地址</view>
				<view class="addr overflow_one">请先选择收货地址</view>
			</view>
			<uni-icons class="icons" type="arrowright" color="rgb(197,197,197)" size="12"/>
			<view class="clearBoth"></view>
		</view> -->
		<view class="addrBox" @tap="inSells" style="background: white;">
			<image class="sellImage" :src="sellData.image" mode=""></image>
			<view class="right">
				<view class="sellName overflow_one fontSize13">{{sellData.name}}</view>
				<!-- <view class="sellIntroduction overflow_two fontSize12">{{sellData.Introduction}}</view> -->
				<view class="sellIntroduction overflow_two fontSize12">{{goods_attr_str}}</view>
				<view class="iconBoxes">
					<view class="priceIcon fontSize12">￥</view>
					<view class="price">{{sellData.priceNow}}</view>
					<!-- <s class="del fontSize12">￥{{sellData.priceBefore}}</s> -->
					<view class="num">*{{sellData.num}}</view>
				</view>
			</view>
			<view class="clearBoth"></view>
			<view class="youhui-wrap" v-if="sellData.youhui_price && sellData.youhui_price > 0">
				<view class="youhui">
					优惠金额
				</view>
				<view class="youhui ">
					￥{{sellData.youhui_price}}
				</view>
			</view>
		</view>
		
		<view class="title">支付方式</view>
		
		<view class="addrBox">
			<!-- <view class="rowsBox" @tap="choosePayWay(1)">
				<image class="icon_pay" src="../../../static/image/user/addr/icon_vx.png" mode=""></image>
				<view class="icon_name fontSize14">微信支付</view>
				<image class="icon_use" :src=" payWay == 1 ? '../../../static/image/user/addr/icon_2.png' : '../../../static/image/user/addr/icon_1.png' " mode="w"></image>
				<view class="clearBoth"></view>
			</view> -->
			<!-- <view class="splites"></view> -->
			<view class="rowsBox" @tap="choosePayWay(2)">
				<image class="icon_pays" src="../../../static/image/user/addr/icon_zfb.png" mode=""></image>
				<view class="icon_name fontSize14">支付宝</view>
				<image class="icon_use" :src=" payWay == 2 ? '../../../static/image/user/addr/icon_2.png' : '../../../static/image/user/addr/icon_1.png' " mode="w"></image>
				<view class="clearBoth"></view>
			</view>
		</view>
		
		<view class="title">订单备注</view>
		
		<textarea class="textArea fontSize14" placeholder="选填"  @input="getValue"/>
		
		<view class="footer">
			<view class="btn" @tap="btnOrder">提交订单</view>
			<view class="money">{{sellData.lastPrice}}</view>
			<view class="icon">￥</view>
			<view class="name">总计：</view>
		</view>
		
	</view>
</template>
<style>
	.content{width:100%;background: rgb(244,244,244);}
	.content .splite{width:100%;height:20upx;background: rgb(244,244,244);}
	.content .addrBox{width:90%;margin-left: 2.5%;padding:4% 2.5%;background: white;border-radius: 10upx;;margin-bottom: 20upx;}
	.content .addrBox .icon{float: left;width:52upx;height:52upx;position: relative;top:20upx}
	.content .addrBox .nameBox{float: left;width:80%;margin-left: 20upx;}
	.content .addrBox .name{width:100%;font-size: 16px;;}
	.content .addrBox .addr{width:100%;font-size: 12px;margin-top: 10upx;}
	.content .addrBox .icons{float: right;position: relative;top:30upx}
	.content .addrBox .sellImage{float: left;margin-right:5%;width:190upx;height:190upx;border-radius: 10upx;}
	.content .addrBox .right{float: left;width:65%;position: relative;}
	.content .addrBox .right .sellName{}
	.content .addrBox .right .sellIntroduction{color:#989898;margin:20upx 0;}
	/* .content .addrBox .right .iconBoxes{width:100%;position: absolute;right:0;bottom:-88upx;} */
	.content .addrBox .right .iconBoxes{width:100%;position: absolute;right:0;bottom:-50upx;}
	.content .addrBox .right .priceIcon{float:left;color:#DA0F17;font-weight: bold}
	.content .addrBox .right .price{float:left;color:#DA0F17;font-weight: bold;font-size: 17px;}
	.content .addrBox .right .del{float:left;margin-left:40upx;color:#909090;position: relative;top:10upx}
	.content .addrBox .right .num{float:right;color:#3C3C3C}
	.content .title{font-size: 16px;color:#000000;margin:40upx 0 40upx 2.5%}
	.youhui-wrap{display: flex;justify-content: space-between;margin-top: 20upx;}
	.youhui{font-size: 26upx;width: 50%;text-align: right;}
	.content .addrBox .rowsBox{width:100%;padding:10upx 0;}
	.content .addrBox .rowsBox .icon_pay{width:44upx;height:38upx;float: left;}
	.content .addrBox .rowsBox .icon_pays{width:42upx;height:42upx;float: left;}
	.content .addrBox .rowsBox .icon_name{float: left;margin-left: 20upx;}
	.content .addrBox .rowsBox .icon_use{width: 40upx;height: 40upx;float: right;}
	.content .addrBox .splites{width:100%;height:2upx;background: rgba(0,0,0,0.1);margin:20upx 0;}
	.content .textArea{width:90%;padding:2.5%;height:180upx;;margin-left:2.5%;background: white;}
	.content .uni-textarea-placeholder,
	.content .textarea-placeholder{font-size: 14px;}
	.content .footer{width: 100%;height:106upx;line-height: 106upx;background: white;position: absolute;left:0;bottom:0;z-index: 2;}
	.content .footer .name{float:right;font-size: 14px;;}
	.content .footer .icon{float:right;font-size: 12px;color:rgb(223,18,30);margin-left: 20upx;}
	.content .footer .money{float:right;color:rgb(223,18,30);margin-right: 10upx;}
	.content .footer .btn{font-size: 15px;;height:53upx;line-height: 53upx;padding:6.5upx 40upx;float:right;background:rgb(223,18,30);margin:0 20upx;color:white;border-radius: 100upx;margin-top: 20.5upx;}
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import permision from "@/common/permission.js"
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				screenHeight:"",
				addrData:{
					"id":"",
					"name":"",
					"addr":"",
				},
				sellData:{
					"image":"",
					"name":"",
					"Introduction":"",
					"priceNow":"",
					"priceBefore":"",
					"num":"",
					"lastPrice":"",
					"youhui_price":"",
				},
				payWay:2,
				remake:"",
				goodsId:"",
				goodsNum:"",
				goods_attr:"",
				goods_attr_str:"",
				_$token:"",
			}
		},
		onLoad(e){
			var that = this;
			const res = uni.getSystemInfoSync();
			this.goodsId = e.id
			this.goodsNum = e.num
			this.goods_attr = e.goods_attr
			this.screenHeight = res.windowHeight*2 + 'upx'
			
			this.getStorage()
		},
		onShow(){
			var that = this;
			try {
			    const value = uni.getStorageSync('addrInfo');
			    if (value) {
					that.AjaxLoad(1,value);
					this.addrData.id   = value.id
					this.addrData.name = value.name
					this.addrData.addr = value.addr
			    }else{
					that.AjaxLoad(0,value);
					this.addrData.name = ""
				}
			} catch (e) {}
			
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(indexs,values){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"goods_id":this.goodsId,
					"num":this.goodsNum,
					"goods_attr":this.goods_attr
				};
				this._$InitRequest.request('order/sure_order', param).then(res => {
					
					if( indexs == 0 ){
						if( res.data.data.address.length !== 0 ){
							this.addrData.id = res.data.data.address.id
							this.addrData.name = res.data.data.address.username
							this.addrData.addr = res.data.data.address.address
						}else{
							this.addrData.name = ""
						}
					}else if( indexs == 1 ){
						values = values.addrInfo
						this.addrData.id   = values.id
						this.addrData.name = values.name
						this.addrData.addr = values.addr
					}
					this.sellData.image = res.data.data.goods.thumb_url
					this.sellData.name = res.data.data.goods.goods_name
					this.sellData.Introduction = res.data.data.goods.desc
					this.sellData.priceNow = res.data.data.goods.shop_price
					this.sellData.priceBefore = res.data.data.goods.market_price
					this.sellData.num = res.data.data.goods.num
					this.sellData.lastPrice = res.data.data.price.total_price
					this.sellData.youhui_price = res.data.data.price.youhui_price
					this.goods_attr_str = res.data.data.goods.goods_attr_str
				},error=>{})
			},
			btnAddr(){uni.navigateTo({url:"../myAddr/myAddr?from=buy"})},
			choosePayWay(index){
				if( index == 1 ){
					this.payWay = 1
				}else if( index == 2 ){
					this.payWay = 2
				}
			},
			getValue(e){this.remake = e.target.value},
			inSells(){
				// uni.navigateTo({url:"../../index/details/details?id=" + this.goodsId})
				},
			btnOrder(){
				var that = this;
				uni.showLoading()
				// if( this.addrData.name == "" ){
				// 	uni.showToast({icon:"none",title:"请选择收货地址"})
				// 	return;
				// }else if( this.payWay == 0 ){
				// 	uni.showToast({icon:"none",title:"请选择支付方式"})
				// 	return;
				// }else{
					let param={
						"user_id":that._$token.id,
						"user_token":that._$token.token,
						"goods_id":that.goodsId,
						"num":that.goodsNum,
						"pay_type":that.payWay,
						"total_price":that.sellData.lastPrice,
						"youhui_price":that.sellData.youhui_price,
						"desc":that.remake,
						// "address_id":that.addrData.id,
						"goods_attr":that.goods_attr
					};
					this._$InitRequest.request('order/pay_order', param).then(res => {
						console.log( res );
						uni.hideLoading()
						if( res.data.code !== 200 ){
							uni.showToast({icon:"none",title:res.data.mess})
							return;
						}else{
							if( that.payWay == 1 ){
								uni.requestPayment({
								    provider: 'wxpay',
									orderInfo:{
										"appid": res.data.data.appid,
										"noncestr": res.data.data.nonce_str,
										"package": res.data.data.package,
										"partnerid": res.data.data.partnerid,
										"prepayid": res.data.data.prepay_id,
										"timestamp": res.data.data.time,
										"sign": res.data.data.sign
									},
									success: (e) => {
										uni.showToast({icon:"none",title:"支付成功"})
										that.showShadow = false
										setTimeout(function(){
											uni.switchTab({
												url:'/pages/user/user'
											})
										},1000)
									},
									fail: (e) => {
										uni.showToast({icon:"none",title:"支付失败"})
										that.showShadow = false
										setTimeout(function(){
											uni.switchTab({
												url:'/pages/user/user'
											})
										},1000)
									},
								});
							}else if( this.payWay == 2 ){
								uni.requestPayment({
								    provider: 'alipay',
									orderInfo:res.data.data,
									success: function (res) {
									  uni.showToast({icon:"none",title:"支付成功"})
									  that.showShadow = false
									  setTimeout(function(){
									  	uni.switchTab({
									  		url:'/pages/user/user'
									  	})
									  },1000)
									},
									fail: function (err) {
										uni.showToast({icon:"none",title:"支付失败"})
										that.showShadow = false
										setTimeout(function(){
											uni.switchTab({
												url:'/pages/user/user'
											})
										},1000)
									}
								});
							}
						}
					},error=>{})
				// }
			},
		}
	}
</script>