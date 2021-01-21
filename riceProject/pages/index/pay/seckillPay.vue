<template>
	<view class="pay-wraps">
		
		<view class="pay-main">
			<!-- 订单页地址 -->
			<view class="pay-location disFlex"  @tap="toAddress" v-if="haveAddress">
				<view class="location-img">
					<!-- 定位 logo -->
					<image src="/static/location.png"></image>
				</view>
				<view class="location-main">
					<view class="location-person">
						{{address.username}} <text class="location-phone">{{address.phone}}</text>
					</view>
					<view class="location-text">
						{{address.address}} {{address.detail_address}}
					</view>
				</view>
				<view class="location-edit">
					<!-- 向右 logo 选择地址-->
					<image src="/static/to-right.png"></image>
				</view>
			</view>
			<view class="pay-location disFlex"  @tap="toAddress" v-if="!haveAddress">
				<view class="location-img">
					<!-- 定位 logo -->
					<image src="/static/location.png"></image>
				</view>
				<view class="location-main2">
					请选择地址
				</view>
				<view class="location-edit">
					<!-- 向右 logo 选择地址-->
					<image src="/static/to-right.png"></image>
				</view>
			</view>
			<!-- 订单项 -->
			<view class="pay-item">
				<view class="pay-title" v-if="payList.length>0">
					订单信息
				</view>
				<view class="pay-text" v-for="(item,i) in payList" :key="i">
					<view class="text-img">
						<image :src="item.cover"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name">
							{{item.goods_name}}
						</view>
						<view class="intr-norm" v-if="item.norms_name">
							<view class="intr-norm1 line1">
								{{item.norms_name}}
							</view>
							<view class="intr-norm2">
								
							</view>
						</view>
						<view class="text-prices">
							<view>
								<text class="symbol">￥</text>{{item.group_buy_price}}
							</view>
							<view class="text-freight" v-if="item.freight">
								运费￥{{item.freight || 0}}
							</view>
						</view>
					</view>
					<view class="text-price">
						
						<view class="text-num">
							x{{item.number}}
						</view>
					</view>
				</view>
				<!-- 无效商品 -->
				<view class="invalid" v-if="outPayList.length>0">
					失效商品
				</view>
				<view class="pay-text" v-for="(item,i) in outPayList" :key="i">
					<view class="text-img">
						<image :src="item.cover" class="text-img2"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name intr-name2">
							{{item.goods_name}}
						</view>
						<view class="intr-norm " v-if="item.norms_name || item.sku_name">
							<view class="intr-norm1 line1">
								{{item.norms_name || item.sku_name}}
							</view>
							<view class="intr-norm2">
								
							</view>
						</view>
						<view class="text-prices text-invalid">
							<!-- <text class="symbol">￥</text>{{item.price}} -->
							此商品该地区不支持配送！
						</view>
					</view>
					<view class="text-price">
						
						
						<view class="text-num">
							x{{item.number}}
						</view>
					</view>
				</view>
				<!-- 运费 -->
				<view class="pay-fare pay-common">
					<view class="pay-left-common">运费</view>
					<view class="pay-right-common">总计 <text class="symbol">￥</text>{{totalFreight}}</view>
				</view>
				<!-- <view class="pay-point pay-common">
					<view class="pay-left-common">使用积分</view>
					<view class="pay-right-common pay-right-witch">使用积分抵扣2元</view>
					<image :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image>
				</view> -->
			<!-- 	<view class="pay-card pay-common">
					<view class="pay-left-common">现金券</view>
					<view class="pay-right-common">现金券抵扣{{cashMoney}}元</view>
					<image src="/static/to-right.png" @tap="useCard"></image>
				</view> -->
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">发票</view>
					<view class="pay-right-common">
						<input type="text" v-model="buycontent" placeholder="需要发票请联系客服" disabled/>
					</view>
				</view>
				<view class="pay-subtotal">
					<text class="subtotal-num margingRight20">共{{num}}件</text>
					<text>小计：</text>
					<text class="subtotal-price"><text class="symbol">￥</text>{{totalMoney}}</text>
				</view>
			</view>
		</view>
		<view class="pay-footer">
			<view class="pay-text">
				实付金额：<text class="pay-price"><text class="symbol">￥</text>{{totalMoney}}</text>
			</view>
			<view class="pay-btn" @tap="isOuts">
				支付订单
			</view>
		</view>
		
		<view class="blank"></view>
		<!-- 优惠券弹出 -->
		<!-- <QSPopup ref="QSPopupTicket" type="fadeInUp">
			<view class="ticket">
				<view class="ticket-main" v-if="cashList.length > 0">
					<view class="ticket-title">
						优惠券
						<image class="close-out" src="/static/out.png" @tap="hides('QSPopupTicket')"></image>
					</view>
					<view class="ticket-item" v-for="(item,i) in cashList" :key="i">
						<view class="ticket-space">
							<view class="ticket-price">
								￥<text>{{item.money}}</text>现金券
							</view>
							<text class="ticket-intr">
								订单金额满 {{item.at_least}} 可使用  \n  有效期{{item.start_time}} -- {{item.end_time}}
							</text>
						</view>
						<view class="ticket-select"> -->
							<!-- <image class="select-img" :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image> -->
					<!-- 		<image class="select-img" :src="selectImg" @tap="selectedCash(item,i)" v-if="item.checked"></image>
							<image class="select-img" :src="unSelectImg" @tap="selectedCash(item,i)" v-else></image>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无优惠券~</view>
				<view class="sure-btn" @click="hideCash">    
					确定
				</view>
			</view>
		</QSPopup> -->
		<!-- 选择支付 -->
		<QSPopup ref="QSPopupChoose" type="fadeInUp">
			<view class="choosepay">
				<view class="choose-title">
					支付订单
					<image src="/static/out.png" @tap="hides('QSPopupChoose')"></image>
				</view>
				<view class="choose-price">
					￥<text>{{totalMoney}}</text>
				</view>
				<view class="choose-item" v-for="(item,index) in chooseList" :key="index" @tap="choose(item,index)">
					<view class="choose-item-l">
						<image :src="item.src"></image>
						{{item.name}}
					</view>
					<view class="choose-item-r">
						<image class="select-img" :src="item.checked ? selectImg : unSelectImg" @tap="choose(item,index)"></image>
					</view>
				</view>
				<!-- <view class="choose-ye ">
					余额剩余
					<text class="choose-ye-price">
						￥<text>{{balances}}</text>
						
					</text>
				</view> -->
				<view class="sure-btn" @tap="putorder">
					确认支付
				</view>
			</view>
		</QSPopup>
		
		<!-- 支付成功 弹窗 -->
		<QSPopup ref="QSPopupSuccess">
			<view class="success">
				<image src="/static/pay-success.png"></image>
				支付成功
			</view>
		</QSPopup>
		<KeyboardPay v-if="isPay" :payMoney="totalMoney" :payTitle="cashTitle" :source="source" @payCode="getPayCode" @closeModal="closePayModal"></KeyboardPay>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import md5 from '@/common/md5.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import KeyboardPay from '@/components/pwdpay.vue';
	export default {
		components: {KeyboardPay,QSPopup},
		data() {
			return {
				payType:1,
				pointSelect:false,
				//#ifndef MP-WEIXIN
				chooseList:[
					{name:'微信支付',src:'/static/wx.png',type:1},
					{name:'支付宝支付',src:'/static/zfb.png',type:2},
					{name:'银联云闪付',src:'/static/ysf.png',type:3},
					// {name:'余额支付',src:'/static/ye.png',type:4},
				],
				//#endif
				//#ifdef MP-WEIXIN
				chooseList:[
					{name:'微信支付',src:'/static/wx.png',type:1}
				],
				//#endif
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				payList:[],
				outPayList:[],//无效商品
				goodsId:0,  // 商品id
				normsId:0, //规格id
				num:0,     // 购买数量
				totalMoney:0,  
				ordertype:0,  // 1为正常下单 2为从购物车下单 3会员商品下单
				address:{},   
				addressId:0,  //地址id
				haveAddress:false,
				balances:0,   // 余额
				isSetPay:0,   // 0 未设置支付密码   1  设置了
				isPay:false,
				// tixMoney:'',
				cashTitle:'余额支付',
				source:'2',    // 1 提现   2 订单余额支付
				couponId:0, 	// 优惠券id
				cashList:[],	// 优惠券
				cashMoney:0,	// 
				totalFreight:0,   //运费
				member:'',	//是否会员商品
				seckillid:0,//秒杀id
				buycontent:'',	//备注
				md5:'',//md5加密
				uid:'',//用户id
				status:true,// 频繁操作状态,
				sec:3,
				domain_name:'',//域名
				isOut:0,//该地区是否支持配送  1不支持 
			}
		},
		onLoad(option) {
			console.log(option)
			//#ifndef MP-WEIXIN
			let orderdata = this.$util.getStorage('secOrderdata')
			//#endif
			
			//#ifdef MP-WEIXIN
			let orderdata = wx.getStorageSync('secOrderdata')
			//#endif
			// let orderdata = this.$util.getStorage('secOrderdata');
			this.seckillid = orderdata.spike_id
			this.ordertype = orderdata.type;
			if(option.member){
				this.member = option.member
			}
			if(option.addressid){
				this.addressId = option.addressid;
			}else{
				this.addressId = 0
			}
			this.getdomainName()
			this.chooseSel()
			this.getPayList()
			this.getAddress()
			this.getCash()
			this.getMd5()
		},
		onShow() {
			this.getAddress()
			this.getPayList()
			this.getCash()
		},
		methods:{
			isOuts(){
				// if(this.isOut == 1){
				if(this.payList.length == 0){
					uni.showToast({
						title:'存在该地区不支持配送的商品！',
						icon:'none'
					})
					return
				}else{
					this.show('QSPopupChoose')
				}
			},
			getMd5(){
				let timestap = new Date().getTime()
				this.md5 = md5(timestap + this.uid)
				console.log(this.md5)
			},
			closePayModal(){
				this.isPay = false;
			},
			getdomainName(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.domain_name = res.data.data.domain_name
				})
			},
			useCard(){
				if(this.member == 'member'){
					this.$util.showToast('会员商品不支持使用优惠券')
					return
				}
				if(this.member == ''){
					this.show('QSPopupTicket')
				}
			},
			getCash(){		//优惠券
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/getCouponList','get',data).then(res=>{
					if(res.data.status == '200'){
						this.cashList = res.data.data.couponList
					}
					console.log(res)
				})
			},
			hideCash(){
				this.hides('QSPopupTicket')
				
			},
			selectedCash(item,i){  //优惠券
				let that = this
				let cartList = that.cashList.map((items, index) => {
					items.checked = false;
					
					if (i == index) {
						that.couponId = items.coupon_id
						that.cashMoney = parseFloat(items.money) 
						items.checked = true;
					}
					return items;
				});
				that.cashList = cartList;
				that.getPayList()
			},
			getPayCode(code){   // 余额支付
				let shoplist = [];
				this.payList.forEach(function (item, index) {
					shoplist.push({
						goods_id:item.id,
						attr_id:item.sku_id,
						number:item.number
					})
				})
				let payArr = [
					'WeChat',
					'Alipay',
					'cloudFlash',
					'balance'
				]
				if(!this.addressId){
					this.$util.showToast('请选择地址!');
					return false;
				}
				console.log(this.couponId )
				let data = {
					token:uni.getStorageSync('token'),
					type:this.ordertype,			//	1为正常下单 2为从购物车下单 3会员商品下单
					data:JSON.stringify(shoplist),
					payment_type:payArr[this.payType-1],	//WeChat 微信 Alipay 支付宝 balance 余额 cloudFlash 云闪付
					address_id:this.addressId,
					payment_password:code,		//余额支付 时候 支付密码
					order_type:4,    //订单类型 1普通 2团购 3预定 4秒杀 5会员商城
					// coupon_id:this.couponId  //	优惠券 
					spike_id:this.seckillid,
					buycontent:this.buycontent
				}
				http('/api/Order/pay_place_order','post',data).then(res=>{
					if(res.data.status == '200'){
						this.closePayModal()
						this.show('QSPopupSuccess');
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/mine/mine'
							})
						},1500)
					}else if(res.data.status == '400'){
						this.$util.showToast(res.data.msg)
						this.closePayModal()
					}
					console.log(res)
				})
			},
			putorder(){			//生成普通订单
				let that = this;
				let timer = ''
				clearInterval(timer);
				timer = setInterval(() => {
				    that.sec--;
				    if ( that.sec <= 0) {
						that.status = true
				        clearInterval(timer);
						that.sec = 3
				    }else{
						that.status = false
					}
				}, 1000)
				if(that.status == false){
					that.$util.showToast('请勿频繁操作!');
					return
				}
				let shoplist = [];
				that.payList.forEach(function (item, index) {
					shoplist.push({
						goods_id:item.id,
						attr_id:item.sku_id,
						number:item.number
					})
				})
				let payArr = [
					'WeChat',
					'Alipay',
					'cloudFlash',
					'balance'
				]
				if(!this.addressId){
					this.$util.showToast('请选择地址!');
					return false;
				}
				console.log(payArr[this.payType-1]);
				
				//#ifdef MP-WEIXIN
				let data = {
					token:uni.getStorageSync('token'),
					type:this.ordertype,			//	1为正常下单 2为从购物车下单 3会员商品下单
					data:JSON.stringify(shoplist),
					payment_type:'Small_WeChat',	//WeChat 微信 Alipay 支付宝 balance 余额 cloudFlash 云闪付
					address_id:this.addressId,
					// payment_password:this.payPassword,		//余额支付 时候 支付密码
					order_type:4,    //订单类型 1普通 2团购 3预定 4秒杀 5会员商城
					// coupon_id:this.couponId      //	优惠券id
					spike_id:this.seckillid,
					buycontent:this.buycontent,
					unique_number:this.md5,
					openid:wx.getStorageSync('openid'),
					spread_user_id:uni.getStorageSync('spread_user_id')
				}
				http('/api/Order/pay_place_order','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.jumpPaysmall(res.data.data.payment);
						
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
					console.log(res)
				})
				// #endif 
				//#ifndef MP-WEIXIN
				if(this.payType==1|| this.payType==2){
					let data = {
						token:uni.getStorageSync('token'),
						type:this.ordertype,			//	1为正常下单 2为从购物车下单 3会员商品下单
						data:JSON.stringify(shoplist),
						payment_type:payArr[this.payType-1],	//WeChat 微信 Alipay 支付宝 balance 余额 cloudFlash 云闪付
						address_id:this.addressId,
						// payment_password:this.payPassword,		//余额支付 时候 支付密码
						order_type:4,    //订单类型 1普通 2团购 3预定 4秒杀 5会员商城
						// coupon_id:this.couponId      //	优惠券id
						spike_id:this.seckillid,
						buycontent:this.buycontent,
						unique_number:this.md5,
						spread_user_id:uni.getStorageSync('spread_user_id')
					}
					http('/api/Order/pay_place_order','post',data).then(res=>{
						if(res.data.status == '200'){
							this.jumpPay(res.data.data.payment);
							// #ifdef APP-PLUS
							this.$util.showLoading('请稍候...')
							// #endif
							// #ifdef H5
							this.$util.showToast('请打开APP完成支付')
							// #endif
						}else{
							this.$util.showToast(res.data.msg)
							return
						}
						console.log(res)
					})
				}else if(this.payType==3){
					// this.$util.showToast('暂未开通此支付方式')
					let token = uni.getStorageSync('token')
					let data2 = JSON.stringify(shoplist)
					let userid = uni.getStorageSync('spread_user_id')
					let data = {
						token:uni.getStorageSync('token'),
						type:this.ordertype,			//	1为正常下单 2为从购物车下单 3会员商品下单
						data:JSON.stringify(shoplist),
						payment_type:payArr[this.payType-1],	//WeChat 微信 Alipay 支付宝 balance 余额 cloudFlash 云闪付
						address_id:this.addressId,
						// payment_password:this.payPassword,		//余额支付 时候 支付密码
						order_type:4,    //订单类型 1普通 2团购 3预定 4秒杀 5会员商城
						// coupon_id:this.couponId      //	优惠券id
						spike_id:this.seckillid,
						buycontent:this.buycontent,
						unique_number:this.md5,
						spread_user_id:uni.getStorageSync('spread_user_id')
					}
					http('/api/order/pay_bank_order','get',data).then(res=>{
						console.log(res)
						if(res.data.status == '200'){
							let url = ''
							// /api/Order/pay_place_order
							if(!this.buycontent){
								url = this.domain_name + '/api/Order/pay_place_order/address_id/'+this.addressId+'/type/'+this.ordertype+'/payment_type/cloudFlash/order_type/4/token/'+token+'/spread_user_id/'+userid+'/spike_id/'+this.seckillid+'/unique_number/'+this.md5+'/data/'+data2;
							}else{
								url = this.domain_name + '/api/Order/pay_place_order/address_id/'+this.addressId+'/type/'+this.ordertype+'/payment_type/cloudFlash/order_type/4/token/'+token+'/spread_user_id/'+userid+'/spike_id/'+this.seckillid+'/buycontent/'+this.buycontent+'/unique_number/'+this.md5+'/data/'+data2;
							}
							
							// url = this.domain_name + '/api/Order/pay_place_order/address_id/'+this.addressId+'/type/'+this.types+'/payment_type/cloudFlash/order_type/'+this.tequan+'/token/'+token+'/coupon_id/'+this.couponId+'/unique_number/'+this.md5+'/data/'+data2;
							console.log(url);
							this.$util.setStorage('yinhkanurl',url);
							uni.navigateTo({
								url:'/pages/index/pay/yinhkaPay'
							})
						}else{
							this.$util.showToast(res.data.msg)
							return
						}
					})
					return
				}else if(this.payType==4){
					if(this.isSetPay == 0){
						this.$util.showToast('请先设置支付密码')
						return
					}else if(this.isSetPay == 1){
						this.hides('QSPopupChoose');
						this.isPay = true
					}
				}
				// #endif
			},
			jumpPaysmall(resdata){   // 微信 小程序支付
			// appid: "wxbaad9d5bda14b2f6"
			// mch_id: "1560965051"
			// nonce_str: "mvKXAH4CBj8beIDr"
			// package: "prepay_id=wx2617483936509833767334cb1212287400"
			// prepay_id: "wx2617483936509833767334cb1212287400"
			// result_code: "SUCCESS"
			// return_code: "SUCCESS"
			// return_msg: "OK"
			// sign: "694C7D9C00B5478F01F32C6DD7B9397A"
			// time: "1582710519"
			// trade_type: "JSAPI"
				let that = this
				wx.requestPayment({
					'timeStamp': resdata.time,
					'nonceStr': resdata.nonce_str,
					'package': resdata.package,
					'signType': 'MD5',
					'paySign': resdata.sign,
					success:function(res){
						that.$util.hideLoading()
						that.show('QSPopupSuccess');
						that.hides('QSPopupChoose');
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/mine/mine'
							})
						},1500)
					},
					fail:function(res){
						console.log(111);
						console.log(res);
						that.$util.hideLoading()
						that.$util.showToast('支付失败!');
					},
					complete:function(res){}
				}) 
			
			},
			jumpPay(resdata){		// 微信  支付宝支付
				console.log(resdata);
				if(this.payType==1){
					console.log(1);
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo:{
							"appid":resdata.appid,
							"noncestr":resdata.nonce_str,
							"package":resdata.package,
							"partnerid":resdata.partnerid,
							"prepayid":resdata.prepay_id,
							"timestamp":parseInt(resdata.time),
							"sign":resdata.sign
						},
						"appid":resdata.appid,
						"noncestr":resdata.nonce_str,
						"package":resdata.package,
						"partnerid":resdata.partnerid,
						"prepayid":resdata.prepay_id,
						"timestamp":parseInt(resdata.time),
						"sign":resdata.sign,
						success: (res) => {
							this.$util.hideLoading()
							this.show('QSPopupSuccess');
							this.hides('QSPopupChoose');
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/mine/mine'
								})
							},1500)
							
					    },
					    fail: (res) => {
							console.log(111);
							console.log(res);
							this.$util.showToast('支付失败!');
							this.$util.hideLoading()
					    }, 
					    complete: () => {
					    }
					})
				}else if(this.payType==2){
					console.log(resdata);
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: resdata,
					    success: (res) => {
							this.$util.showToast('支付成功!');
							this.$util.hideLoading()
							this.show('QSPopupSuccess');
							this.hides('QSPopupChoose');
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/mine/mine'
								})
							},1500)
					    },
					    fail: (res) => {
							console.log(res);
							this.$util.showToast('支付失败!');
							this.$util.hideLoading()
					    },
					    complete: () => {
					    }
					})
				}
				
			},
			getAddress(){			// 获取地址
				let data = {
					token:uni.getStorageSync('token'),
					address_id:this.addressId
				}
				http('/api/user/getUserAddress','post',data).then(res=>{
					if(res.data.status == '200'){
						this.address = res.data.data.address;
						this.addressId = res.data.data.address.id;
						this.uid = res.data.data.user.id
						this.balances = res.data.data.user.balance
						this.isSetPay = res.data.data.user.is_payment_pass
						
					}
					if(this.address == null){
						this.haveAddress = false
					}else{
						this.haveAddress = true
					}
					console.log(res)
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			pointSelectTap(){
				// this.pointSelect = !this.pointSelect
				this.pointSelect =false
				this.$util.showToast('暂不支持使用积分')
				return
			},
			getPayList(){	
				let that = this;
				//#ifndef MP-WEIXIN
				let data = that.$util.getStorage('secOrderdata')
				data = {
					...data,
					address_id:this.addressId,
				}
				//#endif
				
				//#ifdef MP-WEIXIN
				let data = wx.getStorageSync('secOrderdata')
				data = {
					...data,
					address_id:this.addressId,
				}
				//#endif
				// let data = that.$util.getStorage('secOrderdata')
				console.log(that.$util.getStorage('secOrderdata'))
				http('/Api/Spike/spikeOrder','post',data).then(res=>{
					console.log(res)
					// that.payList = res.data.data.goods
					that.payList = res.data.data.goods.goods_in_city
					that.outPayList = res.data.data.goods.goods_out_city
					that.isOut = res.data.data.is_out
					that.totalFreight = res.data.data.total_freight
					that.totalMoney = 0
					that.num = 0
					let totalMoneys = 0
					that.payList.forEach(function (item, index) {
						// parseFloat()  parseInt()
						totalMoneys += ((parseFloat(item.number) * (parseFloat(item.group_buy_price)*100))/100)
						that.totalMoney = (totalMoneys + that.totalFreight - that.cashMoney).toFixed(2)
						that.num += parseInt(item.number) 
					})
				})
				
			},
			choose(type, indexs) {		//选择支付方式
				let that = this
				let cartList = that.chooseList.map((item, index) => {
					item.checked = false;
					
					if (indexs == index) {
						this.payType = item.type
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
					url:'/pages/index/address/address?changeType=3'
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F2F2F5;
	}
	.pay-wraps{
		// position: absolute;
		// width: 100%;
		// height: 92%;
		// bottom: 100upx;
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
			justify-content: space-between;
			align-items: center;
			.location-img{
				image{
					width: 40upx;
					height: 40upx;
				}
			}
			.location-main{
				margin-left: -70upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 120upx;
				.location-person{
					font-size: 32upx;
					color: #aaa;
					.location-phone{
						font-size: 32upx;
						color: #aaa;
						margin-left: 32upx;
					}
				}
				.location-text{
					width: 440upx;
					font-size: 30upx;
					margin-top: 10upx;
				}
			}
			.location-main2{
				margin-left: -120upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 120upx;
				font-size: 40upx;
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
			margin-bottom: 40upx;
			.invalid{
				font-size: 32upx;
				font-weight: bold;
				margin: 20upx 0 30upx;
			}
			.pay-title{
				font-size: 32upx;
				font-weight: bold;
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
					.text-img2{
						width: 150upx;
						height: 150upx;
					}
				}
				.text-intr{
					width: 380upx;
					// margin-left: -120upx;
					position: relative;
					.intr-name{
						font-size: 30upx;
						// color: #333;
					}
					.intr-name2{
						font-size: 26upx;
						color: #939393;
					}
					.intr-norm{
						color: #939393;
						// margin-top: 2upx;
						
						.intr-norm1{
							font-size: 24upx;
							margin-top: -4upx;
						}
						.intr-norm2{
							font-size: 24upx;
						}
					}
				}
				.text-price{
					// color: #FB4142;
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
					display: flex;
					justify-content: space-between;
					width: 100%;
					.text-freight{
						color: #939393;
						margin-right: -40upx;
					}
				}
				.text-invalid{
					color: #ff0000;
					font-size: 26upx;
					font-weight: bold;
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
					font-size: 28upx;
					// text-align: right;
					flex: 0 180upx;
				}
				.pay-right-common{
					font-size: 28upx;
					text-align: right;
					color: #939393;
					margin-left: 30upx;
					flex: 1;
					input{
						font-size: 28upx;
						margin-left: -80upx;
					}
				}
				.pay-right-witch{
					margin-right: 60upx;
				}
			}
			.pay-subtotal{
				margin-top: 60upx;
				text-align: right;
				.subtotal-num{
					font-size: 24upx;
					color: #aaaaaa;
				}
				.subtotal-price{
					color: #ec614a;
					font-weight: bold;
					font-size: 38upx;
				}
			}
		}
	}
	.symbol{
		font-size: 24upx;
	}
	.pay-footer{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 30;
		background-color: #fff;
		height: 100upx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		.pay-text{
			font-size: 32upx;
			margin-right: 38upx;
			.pay-price{
				font-size: 38upx;
				color:#ec614a;
				font-weight: bold;
			}
		}
		.pay-btn{
			width:200upx;
			height:78upx;
			background:rgba(251,65,66,1);
			border-radius:39upx;
			line-height: 78upx;
			text-align: center;
			color: #fff;
			margin-right: 30upx;
		}
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
				z-index: 30;
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
						width: 40upx;
						height: 40upx;
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
		z-index: 30;
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
				width: 40upx;
				height: 40upx;
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
					width: 40upx;
					height: 40upx;
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
	
	.nodata {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #aaaaaa;
		font-size: 30upx;
	}
</style>