<template>
	<view class="pay-wraps">
		<view class="pay-main">
			<!-- 订单页地址 -->
			<view class="pay-location disFlex">
				<view class="location-img">
					<!-- 定位 logo -->
					<image src="/static/location.png"></image>
				</view>
				<view class="location-main">
					<view class="location-person">
						{{orderinfo.address_name}}<text class="location-phone">{{orderinfo.address_phone}}</text>
					</view>
					<view class="location-text marginTop20">
						{{orderinfo.address}} {{orderinfo.address_detail}}
					</view>
				</view>
				<view class="location-edit">
					
				</view>
			</view>
			<!-- 订单项 -->
			<view class="pay-item">
				<view class="pay-title">
					订单信息
				</view>
				<view class="pay-text" v-for="(data,index) in orderinfo.goods_data" :key="index">
					<view class="text-img">
						<image :src="data.cover"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name line2">
							{{data.goods_name}}
						</view>
						<view class="intr-norm">
							<view class="intr-norm1">
								规格:{{data.goods_attr_name}}
							</view>
						</view>
					</view>
					<view class="text-price" v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0">
						<text class="symbol">￥</text>{{goodsMoney}}
						<view class="text-num">
							x{{data.goods_num}}
						</view>
					</view>
					<view class="text-price" v-else>
						<text class="symbol">￥</text>{{data.goods_price}}
						<view class="text-num">
							x{{data.goods_num}}
						</view>
					</view>
				</view>
				<view class="pay-status" v-if="orderinfo.order_type==3 && orderinfo.paytype==2 && nowtime < tailstart">
					<view class="status-title">
						等待尾款支付开始
					</view>
					<view class="status-intr">
						尾款：{{orderinfo.tail_starttime}} - {{orderinfo.tail_endtime}}
					</view>
				</view>
				<view class="pay-status" v-if="orderinfo.order_type==3 && orderinfo.paytype==2 && nowtime >= tailstart && nowtime <= tailend">
					<view class="status-title">
						等待买家付尾款
					</view>
					<view class="status-intr">
						请于{{day}}天{{hr}}时{{min}}分{{sec}}秒内付尾款，超时订单将自动关闭
					</view>
				</view>
				<view class="pay-fare pay-common" v-if="orderinfo.order_type==3 ">
					<view class="pay-left-common">发货时间</view>
					<view class="pay-right-common" v-if="orderinfo.delivery_type==1">{{orderinfo.delivery_time}}开始发货</view>
					<view class="pay-right-common" v-if="orderinfo.delivery_type==2">{{orderinfo.delivery_day}}内发货</view>
				</view>
				<!-- 运费 -->
				<view class="pay-fare pay-common">
					<view class="pay-left-common">运费</view>
					<view class="pay-right-common">总计 ￥{{orderinfo.freightprice}}</view>
				</view>
				<!-- <view class="pay-point pay-common">
					<view class="pay-left-common">使用积分</view>
					<view class="pay-right-common">使用积分抵扣2元</view>
					<image :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image>
				</view> -->
				<view class="pay-card pay-common" v-if="orderinfo.order_type==1 " >
					<view class="pay-left-common">现金券</view>
					<view class="pay-right-common pay-right-witch">现金券抵扣{{cashMoney || 0}}元</view>
					<image src="/static/to-right.png" @tap="show('QSPopupTicket')"></image>
				</view>
				<view class="pay-card pay-common" v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0&&orderinfo.paytype==2" >
					<view class="pay-left-common">现金券</view>
					<view class="pay-right-common pay-right-witch">现金券抵扣{{cashMoney || 0}}元</view>
					<image src="/static/to-right.png" @tap="show('QSPopupTicket')"></image>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">订单编号</view>
					<view class="pay-right-common">{{orderinfo.ordernum}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">备注</view>
					<view class="pay-right-common">
						<input type="text" v-model="buycontent" placeholder="选填，请先和商家协商一致"/>
					</view>
				</view>
				<view v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0">
					<view class="" v-if="orderinfo.paytype==2">
						<view class="pay-subtotal pay-subtotal-advance">
							<!-- <text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text> -->
							<text>阶段1：定金<text class="pay-intr">(已付)</text></text>
							<text class="subtotal-price"><text class="symbol">￥</text>{{readyMoney}}</text>
						</view>
						<view class="pay-subtotal pay-subtotal-advance">
							<text v-if="nowtime < tailstart">阶段2：尾款<text class="pay-intr">(未开始)</text></text>
							<text v-if="nowtime >= tailstart && nowtime <= tailend">阶段2：尾款<text class="pay-intr">(等待支付)</text></text>
							<text v-if=" nowtime > tailend">阶段2：尾款<text class="pay-intr">(已超时)</text></text>
							<text class="subtotal-price"><text class="symbol">￥</text>{{tailMoney}}</text>
						</view>
					</view>
					<view class="" v-else>
						<view class="pay-subtotal pay-subtotal-advance">
							<!-- <text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text> -->
							<text>阶段1：定金</text>
							<text class="subtotal-price"><text class="symbol">￥</text>{{readyMoney}}</text>
						</view>
						<view class="pay-subtotal pay-subtotal-advance">
							<text>阶段2：尾款</text>
							<text class="subtotal-price"><text class="symbol">￥</text>{{tailMoney}}</text>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="pay-subtotal">
						<!-- <text class="subtotal-num margingRight20">共{{orderinfo.goods_data.length}}种</text> -->
						<text>小计：</text>
						<text class="subtotal-price"><text class="symbol">￥</text>{{orderinfo.totalprice}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pay-ffooter-up" v-if="orderinfo.order_type==3 && orderinfo.paytype==2 && nowtime < tailstart">
			尾款时间：{{orderinfo.tail_starttime}} - {{orderinfo.tail_endtime}}
		</view>
		<view class="pay-ffooter-up" v-if="orderinfo.order_type==3 && orderinfo.paytype==2 && nowtime >= tailstart && nowtime <= tailend">
			请于{{day}}天{{hr}}时{{min}}分{{sec}}秒内付尾款，超时订单将自动关闭
		</view>
		<view class="pay-ffooter" v-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0&&orderinfo.paytype==2&&nowtime >= tailstart && nowtime <= tailend" @tap="show('QSPopupChoose',4)">
			支付尾款
		</view>
		<view class="pay-ffooter pay-ffooter-gray" v-else-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0&&orderinfo.paytype==2&&nowtime < tailstart">
			支付尾款
		</view>
		<view class="pay-ffooter pay-ffooter-gray" v-else-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0&&orderinfo.paytype==2&&nowtime > tailend">
			支付尾款
		</view>
		<view class="pay-footer" v-else-if="orderinfo.order_type==3&&orderinfo.is_tail_money==0">
			<view class="pay-footer-l" @tap="show('QSPopupChoose',1)">
				支付定金
			</view>
			<view class="pay-footer-r" @tap="show('QSPopupChoose',2)">
				全款购买
			</view>
		</view>
		
		<view class="pay-footer" v-else>
			<view class="pay-text">
				实付金额：<text class="pay-price"><text class="symbol">￥</text>{{totalMoneys}}</text>
			</view>
			<view class="pay-btn" @tap="show('QSPopupChoose',2)">
				支付订单
			</view>
		</view>
		
		<!-- 优惠券弹出 -->
		<QSPopup ref="QSPopupTicket" type="fadeInUp">
			<view class="ticket">
				<view class="ticket-main" v-if="cashList.length > 0">
					<view class="ticket-title">
						优惠券
						<image class="close-out" src="/static/out.png" @tap="hides('QSPopupTicket')"></image>
					</view>
					<view class="ticket-item" v-for="(item,i) in cashList" :key="i">
						<view :class="['ticket-space',item.is_available==0?'ticket-gray':'']">
							<view class="ticket-price">
								￥<text>{{item.money}}</text>现金券
							</view>
							<text class="ticket-intr">
								订单金额满 {{item.at_least}} 可使用  \n  有效期{{item.start_time}} -- {{item.end_time}}
							</text>
						</view>
						<view class="ticket-select" v-if="item.is_available==1">
							<!-- <image class="select-img" :src="pointSelect ? selectImg : unSelectImg" @tap="pointSelectTap"></image> -->
							<image class="select-img" :src="selectImg" @tap="selectedCash(item,i)" v-if="item.checked"></image>
							<image class="select-img" :src="unSelectImg" @tap="selectedCash(item,i)" v-else></image>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无优惠券~</view>
				<view class="sure-btn" @click="useCash">    
					确定
				</view>
			</view>
		</QSPopup>
		<!-- 选择支付 -->
		<QSPopup ref="QSPopupChoose" type="fadeInUp">
			<view class="choosepay">
				<view class="choose-title">
					支付订单
					<image src="/static/out.png" @tap="hides('QSPopupChoose')"></image>
				</view>
				<view class="choose-price">
					<text class="symbol">￥</text><text>{{totalMoney}}</text>
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
				<view class="sure-btn" @tap="payOrder">
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
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import http from '@/api/http.js';
	import KeyboardPay from '@/components/pwdpay.vue';
	export default {
		components: {QSPopup,KeyboardPay},
		data() {
			return {
				payType:1,
				uptoken:'',
				orderid:'',
				pointSelect:false,
				orderinfo:{},
				//#ifndef MP-WEIXIN
				chooseList:[
					{name:'微信支付',src:'/static/wx.png',type:1},
					{name:'支付宝支付',src:'/static/zfb.png',type:2},
					// {name:'银联云闪付',src:'/static/ysf.png',type:3},
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
				cashTitle:'余额支付',
				balances:0,   // 余额
				isSetPay:0,   // 0 未设置支付密码   1  设置了
				source:'2',    // 1 提现   2 订单余额支付
				couponId:0, 	// 优惠券id
				cashList:[],	// 优惠券
				cashMoney:0,	//	
				couponType:0,//优惠券是否使用 0否 1是    选择的优惠券过期时
				totalFreight:0,   //运费
				addressId:0,
				num:0,
				totalMoney:0,//传给子组的总价
				totalMoney2:0,//显示的总价
				totalMoneys:0,// 显示的减了优惠券的总价
				isPay:false,
				tailMoney:0,	//尾款
				goodsMoney:0,	//商品单价
				readyMoney:0,	//定金   传给子组的定金价
				// readyMoneys:0,	//定金   显示的定金价
				presaleType:0,//预售 0定金购买 1全款购买
				buycontent:'',//备注
				tailType:0,//支付   2尾款    1全款或定金
				tailstart:0,//尾款支付开始时间
				tailend:0,//尾款支付结束时间
				nowtime:0,//当前时间
				day:0,
				hr: 0,
				min: 0,
				sec: 0,
				domain_name:'',//域名
				coupon:[]
			}
		},
		onLoad(option) {
			this.nowtime = new Date().getTime()
			console.log(this.nowtime)
			this.chooseSel();
			this.orderid = option.id;
			this.getorder(this.orderid);
			
			this.getdomainName()
		},
		onShow() {
			// this.getCash()
			setInterval(() => {
				this.countdown()
			}, 1000)
		},
		methods:{
			getdomainName(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.domain_name = res.data.data.domain_name
				})
			},
			closePayModal(){
				this.isPay = false;
			},
			countdown() {
				let that = this
				const end = that.tailend
				const now =  Date.parse(new Date())
				const msec = end - now
				if (msec <= 0) {
					return
				}
				let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt((msec / 1000 / 60 / 60) % 24)
				let min = parseInt((msec / 1000 / 60) % 60)
				let sec = parseInt((msec / 1000) % 60)
				that.day = day
				that.hr = hr > 9 ? hr : '0' + hr
				that.min = min > 9 ? min : '0' + min
				that.sec = sec > 9 ? sec : '0' + sec
			},
			getPayCode(code){
				let payArr = [
					'WeChat',
					'Alipay',
					'cloudFlash',
					'balance'
				]
				console.log(this.couponId )
				let data = {
					payment_password:code,		//余额支付 时候 支付密码
					ordernum:this.orderinfo.ordernum,
					payment_type:payArr[this.payType-1],  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
					token:uni.getStorageSync('token'),
					// address_id:this.addressId
					coupon_id:this.couponId,
					couponType:this.couponType,//优惠券是否使用 0否 1是
					presaleType:this.presaleType,//预售 0定金购买 1全款购买
					buycontent:this.buycontent
				}
				http('/api/order/pay_order','post',data).then(res=>{
					if(res.data.status=='201'){
						uni.showModal({
						    title: '该优惠券已过期',
						    content: '是否继续支付',
							cancelColor:'#bbbbbb',
							confirmColor:'#FB4142',
							confirmText:'继续支付',
						    success: (res)=> {
						        if (res.confirm) {
						            console.log('用户点击确定');
									this.couponType = 1
									// this.totalMoney = (this.totalMoneys + this.cashMoney).toFixed(2)
									this.closePayModal()
									this.show('QSPopupChoose',3)
						        } else if (res.cancel) {
						            console.log('用户点击取消');
									this.couponType = 0
									this.hides('QSPopupChoose')
									this.closePayModal()
						        }
						    }
						});
					}
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
			payOrder(){
				let payArr = [
					'WeChat',
					'Alipay',
					'cloudFlash',
					'balance'
				]
				//#ifdef MP-WEIXIN
				if(this.tailType==1){
					let data = {
						ordernum:this.orderinfo.ordernum,
						payment_type:'Small_WeChat',  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
						token:uni.getStorageSync('token'),
						// address_id:this.addressId
						coupon_id:this.couponId,
						couponType:this.couponType,//优惠券是否使用 0否 1是
						presaleType:this.presaleType,//预售 0定金购买 1全款购买
						buycontent:this.buycontent,
						openid:wx.getStorageSync('openid')
					}
					http('/api/order/pay_order','post',data).then(res=>{
						console.log(res)
						if(res.data.status=='201'){
							uni.showModal({
							    title: '该优惠券已过期',
							    content: '是否继续支付',
								cancelColor:'#bbbbbb',
								confirmColor:'#FB4142',
								confirmText:'继续支付',
							    success: (res)=> {
							        if (res.confirm) {
							            console.log('用户点击确定');
										this.couponType = 1
										// this.totalMoney = (this.totalMoneys + this.cashMoney).toFixed(2)
										this.closePayModal()
										this.show('QSPopupChoose',3)
							        } else if (res.cancel) {
							            console.log('用户点击取消');
										this.couponType = 0
										this.hides('QSPopupChoose')
										this.closePayModal()
							        }
							    }
							});
						}
						if(res.data.status == '200'){
							this.jumpPaysmall(res.data.data.payment);
						}else{
							this.$util.showToast(res.data.msg)
							return
						}
						
						console.log(res)
					})
				}else if(this.tailType==2){
					let data = {
						ordernum:this.orderinfo.ordernum,
						payment_type:'Small_WeChat',  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
						token:uni.getStorageSync('token'),
						// address_id:this.addressId
						coupon_id:this.couponId,
						openid:wx.getStorageSync('openid')
					};
					console.log(data)
					http('/api/Order/payTailPrice','post',data).then(res=>{
						console.log(res);
						if(res.data.status=='200'){
							this.jumpPaysmall(res.data.data.payment);
						}else{
							this.$util.showToast(res.data.msg)
							return
						}
						
						console.log(res)
					})
				}
				// #endif 
				//#ifndef MP-WEIXIN
				if(this.payType==1|| this.payType==2){
					if(this.tailType==1){
						let data = {
							ordernum:this.orderinfo.ordernum,
							payment_type:payArr[this.payType-1],  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
							token:uni.getStorageSync('token'),
							// address_id:this.addressId
							coupon_id:this.couponId,
							couponType:this.couponType,//优惠券是否使用 0否 1是
							presaleType:this.presaleType,//预售 0定金购买 1全款购买
							buycontent:this.buycontent
						};
						http('/api/order/pay_order','post',data).then(res=>{
							if(res.data.status=='201'){
								uni.showModal({
								    title: '该优惠券已过期',
								    content: '是否继续支付',
									cancelColor:'#bbbbbb',
									confirmColor:'#FB4142',
									confirmText:'继续支付',
								    success: (res)=> {
								        if (res.confirm) {
								            console.log('用户点击确定');
											this.couponType = 1
											// this.totalMoney = (this.totalMoneys + this.cashMoney).toFixed(2)
											this.closePayModal()
											this.show('QSPopupChoose',3)
								        } else if (res.cancel) {
								            console.log('用户点击取消');
											this.couponType = 0
											this.hides('QSPopupChoose')
											this.closePayModal()
								        }
								    }
								});
							}
							if(res.data.status == '200'){
								this.jumpPay(res.data.data.payment);
							}else{
								this.$util.showToast(res.data.msg)
								return
							}
							console.log(res)
						})
					}else if(this.tailType==2){
						let data = {
							ordernum:this.orderinfo.ordernum,
							payment_type:payArr[this.payType-1],  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
							token:uni.getStorageSync('token'),
							// address_id:this.addressId
							coupon_id:this.couponId,
						};
						console.log(data)
						http('/api/Order/payTailPrice','post',data).then(res=>{
							console.log(res);
							if(res.data.status=='200'){
								this.jumpPay(res.data.data.payment);
							}else{
								this.$util.showToast(res.data.msg)
								return
							}
							
							console.log(res)
						})
					}
					
				}else if(this.payType==3){
					// this.$util.showToast('暂未开通此支付方式')
					let token = uni.getStorageSync('token')
					if(this.tailType==1){
						let data = {
							ordernum:this.orderinfo.ordernum,
							payment_type:payArr[this.payType-1],  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
							token:uni.getStorageSync('token'),
							// address_id:this.addressId
							coupon_id:this.couponId,
							couponType:this.couponType,//优惠券是否使用 0否 1是
							presaleType:this.presaleType,//预售 0定金购买 1全款购买
							buycontent:this.buycontent
						}
						http('/api/order/pay_bank_order1','get',data).then(res=>{
							if(res.data.status=='201'){
								uni.showModal({
								    title: '该优惠券已过期',
								    content: '是否继续支付',
									cancelColor:'#bbbbbb',
									confirmColor:'#FB4142',
									confirmText:'继续支付',
								    success: (res)=> {
								        if (res.confirm) {
								            console.log('用户点击确定');
											this.couponType = 1
											// this.totalMoney = (this.totalMoneys + this.cashMoney).toFixed(2)
											this.closePayModal()
											this.show('QSPopupChoose',3)
								        } else if (res.cancel) {
								            console.log('用户点击取消');
											this.couponType = 0
											this.hides('QSPopupChoose')
											this.closePayModal()
								        }
								    }
								});
							}
							if(res.data.status == '200'){
								let url = ''
								// /api/Order/pay_place_order
								if(!this.buycontent){
									url = this.domain_name + '/api/order/pay_order/ordernum/'+this.orderinfo.ordernum+'/payment_type/cloudFlash/couponType/'+this.couponType+'/token/'+token+'/coupon_id/'+this.couponId+'/presaleType/'+this.presaleType;
								}else{
									url = this.domain_name + '/api/order/pay_order/ordernum/'+this.orderinfo.ordernum+'/payment_type/cloudFlash/couponType/'+this.couponType+'/token/'+token+'/coupon_id/'+this.couponId+'/presaleType/'+this.presaleType+'/buycontent/'+this.buycontent;
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
						
					}else if(this.tailType==2){
						let data = {
							ordernum:this.orderinfo.ordernum,
							payment_type:payArr[this.payType-1],  //支付方式 1为微信支付   2 支付宝   3云闪 4余额
							token:uni.getStorageSync('token'),
							// address_id:this.addressId
							coupon_id:this.couponId,
						};
						console.log(data)
						http('/api/order/pay_bank_order2','get',data).then(res=>{
							if(res.data.status=='201'){
								uni.showModal({
								    title: '该优惠券已过期',
								    content: '是否继续支付',
									cancelColor:'#bbbbbb',
									confirmColor:'#FB4142',
									confirmText:'继续支付',
								    success: (res)=> {
								        if (res.confirm) {
								            console.log('用户点击确定');
											this.couponType = 1
											// this.totalMoney = (this.totalMoneys + this.cashMoney).toFixed(2)
											this.closePayModal()
											this.show('QSPopupChoose',3)
								        } else if (res.cancel) {
								            console.log('用户点击取消');
											this.couponType = 0
											this.hides('QSPopupChoose')
											this.closePayModal()
								        }
								    }
								});
							}
							if(res.data.status == '200'){
								
								let url = this.domain_name + '/api/Order/payTailPrice/ordernum/'+this.orderinfo.ordernum+'/payment_type/cloudFlash/token/'+token+'/coupon_id/'+this.couponId;
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
					}
					return
				}else if(this.payType==4){
					this.hides('QSPopupChoose');
					this.isPay = true
				}
				// http('/api/Order/pay_order','post',data).then(res=>{
					
				// 	this.$util.showToast(res.data.msg);
				// 	setTimeout(()=>{
				// 		uni.navigateTo({
				// 			url:'/pages/mine/myorderlist?type=1'
				// 		})
				// 	},1500)
				// })
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
			jumpPay(resdata){
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
					    },
					    complete: () => {
					    }
					})
				}
				
			},
			getorder(orderid){
				// let totalMoney2 = 0
				
				let data = {
					order_id:orderid,
					token:uni.getStorageSync('token'),
				};
				this.$util.showLoading('请稍后');
				http('/api/Order/orderInfo','post',data).then(res=>{
					this.orderinfo = res.data.data;
					this.balances = res.data.data.userBalance
					// this.cashMoney = parseFloat(res.data.data.couprice)
					this.totalMoney2 = parseFloat(res.data.data.totalprice) 
					let totalMoney3 =parseFloat(res.data.data.totalprice) 
					// this.totalMoneys = (totalMoney3 - this.cashMoney).toFixed(2)
					this.totalMoneys = res.data.data.totalprice
					let goods_data = res.data.data.goods_data
					
					goods_data.forEach((item)=>{
						this.coupon.push({goods_id:item.goods_id,price:item.totalprice})
					})
					
					//预售
					let freightprice =parseFloat(res.data.data.freightprice)
					// let totalMoney2 =parseFloat(res.data.data.goods_data[0].totalprice) 
					let tailPrice =parseFloat(res.data.data.goods_data[0].tail_price) //数据的   尾款
					let goodsPrice =parseFloat(res.data.data.goods_data[0].goods_price) //  已支付
					let num = parseInt(res.data.data.goods_data[0].goods_num) 	//数量
					this.goodsMoney = (tailPrice + goodsPrice).toFixed(2)
					// this.readyMoneys = (goodsPrice * num ).toFixed(2)
					this.readyMoney = (goodsPrice * num + freightprice).toFixed(2)
					this.tailMoney = (tailPrice * num).toFixed(2)
					
					
					// this.tailstart = new Date(res.data.data.tail_starttime).getTime()
					// this.tailend = new Date(res.data.data.tail_endtime).getTime()
					this.tailstart = new Date(res.data.data.tail_starttime.replace(/-/g, '/')).getTime()
					this.tailend = new Date(res.data.data.tail_endtime.replace(/-/g, '/')).getTime()
					// this.nowtime = new Date().getTime()
					console.log(this.tailstart,this.tailend,this.nowtime)
					this.$util.hideLoading();
					console.log(res)
					console.log(this.coupon)
					this.getCash()
				})
			},
			getCash(){
				let data = {
					token:uni.getStorageSync('token'),
					coupon_data:JSON.stringify(this.coupon)
				}
				http('/api/User/getCouponList','post',data).then(res=>{
					if(res.data.status == '200'){
						this.cashList = res.data.data.couponList
					}else{
						this.$util.showToast(res.data.message)
						return
					}
					console.log(res)
				})
			},
			useCash(){
				this.hides('QSPopupTicket')
			},
			selectedCash(item,i){
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
				this.totalMoneys = (parseFloat(this.totalMoneys) - this.cashMoney).toFixed(2)
				this.tailMoney = (this.totalMoneys - this.cashMoney).toFixed(2)
			},
			show(ref,type) {
				console.log(type)
				this.$refs[ref].show();
				// 定金
				if(type==1){
					this.totalMoney = this.readyMoney
					this.presaleType = 0
					this.tailType = 1
				}
				// 全款
				if(type==2){
					this.totalMoney = this.totalMoneys
					this.presaleType = 1
					this.tailType = 1
				}
				// 余额
				if(type==3){
					this.totalMoney = this.totalMoney2
					this.presaleType = 1
					this.tailType = 1
				}
				// 尾款
				if(type==4){
					this.totalMoney = this.tailMoney
					this.tailType = 2
				}
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			// pointSelectTap(){
			// 	this.pointSelect = !this.pointSelect
			// },
			choose(type, indexs) {
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
				console.log(this.payType)
			},
			chooseSel(){
				let cartList = this.chooseList.map((item, index) => {
					item.checked = false;
					if (index == 0) {
						item.checked = true;
					}
					return item;
				});
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F2F2F5;
	}
	.pay-wraps{
		position: absolute;
		width: 100%;
		height: 92%;
		bottom: 100upx;
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
				margin-left: -120upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 130upx;
				.location-person{
					font-size: 32upx;
					.location-phone{
						font-size: 32upx;
						color: #aaa;
						margin-left: 32upx;
					}
				}
				.location-text{
					width: 380upx;
					font-size: 24upx;
				}
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
			margin-bottom: 20upx;
			.pay-title{
				font-size: 32upx;
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
				}
				.text-intr{
					width: 240upx;
					margin-left: -30upx;
					.intr-name{
						font-size: 24upx;
					}
					.intr-norm{
						color: #aaaaaa;
						margin-top: 26upx;
						
						.intr-norm1{
							font-size: 24upx;
						}
						.intr-norm2{
							font-size: 24upx;
						}
					}
				}
				.text-price{
					color: #FB4142;
					.text-num{
						font-size: 24upx;
						color: #aaaaaa;
						text-align: right;
						letter-spacing: 5upx;
					}
				}
			}
			.pay-status{
				margin-bottom: 20upx;
				.status-title{
					font-size: 30upx;
				}
				.status-intr{
					font-size: 24upx;
					color: #999;
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
					font-size: 24upx;
					// text-align: right;
					flex: 0 180upx;
				}
				.pay-right-common{
					font-size: 24upx;
					color: #aaaaaa;
					margin-left: 30upx;
					text-align: right;
					flex: 1;
					input{
						font-size: 24upx;
						margin-left: -80upx;
					}
				}
				.pay-right-witch{
					margin-right: 60upx;
				}
			}
			
			.pay-subtotal{
				// margin-top: 60upx;
				text-align: right;
				.subtotal-num{
					font-size: 24upx;
					color: #aaaaaa;
				}
				.subtotal-price{
					color: #FB4142;
				}
				.pay-intr{
					color: #999;
				}
			}
			.pay-subtotal-advance{
				margin-top: 20upx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	
	.pay-footer{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
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
				font-size: 32upx;
				color: #FF0000;
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
		.pay-footer-l{
			flex: 1;
			text-align: center;
			background:#ffecec;
			color: #FB4142;
			font-size: 32upx;
			height: 100upx;
			line-height: 100upx;
		}
		.pay-footer-r{
			flex: 1;
			font-size: 32upx;
			background:rgba(251,65,66,1);
			text-align: center;
			color: #fff;
			height: 100upx;
			line-height: 100upx;
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
				z-index: 1001;
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
				.ticket-gray{
					background:linear-gradient(90deg, #6b6a6a 0%,#868686 100%);
				}
				.ticket-select{
					position: relative;
					.select-img{
						width: 46upx;
						height: 46upx;
						position: absolute;
						right: 2upx;
						top: -10upx;
					}
				}
			}
		}
	}
	.symbol{
		font-size: 24upx;
	}
	.sure-btn{
		width: 100%;
		height: 100upx;
		background:rgba(251,65,66,1);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		font-size: 40upx;
		color: #ffffff;
		line-height: 100upx;
		text-align: center
	}
	.pay-ffooter-up{
		position: fixed;
		bottom: 100upx;
		left: 0;
		z-index:5;
		background-color: #fef7e3;
		height: 50upx;
		line-height: 50upx;
		width: 100%;
		color: #f49049;
		font-size: 24upx;
		padding-left: 20upx;
	}
	.pay-ffooter{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index:5;
		background-color: #FB4142;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
	}
	.pay-ffooter-gray{
		background-color: #999;
		
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
			.symbol{
				font-size: 40upx;
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