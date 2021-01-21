<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" :isBack="true"><block slot="backText"></block><block slot="content">商品详情</block></cu-custom>
		<view class="swiper-wrap">
			<swiper class="swiper-top-box" @change="change" autoplay="true" circular="true" >
				<swiper-item v-for="(item ,index) in bannerList" :key="index" @click="prevImg">
					<view class="swiper-index-top">
						<!-- <image :src="item.img_url" class="banner"></image> -->
						<image :src="item" class="banner"></image>
						
					</view>
				</swiper-item>
			</swiper>
			<view class="current-box" @click="prevImg">
				{{current + 1}}/{{bannerList.length}}
			</view>
		</view>
		
		<view class="top-box">
			<view class="count-wrap">
				<view class="count-img-wrap disAlignCenter">
					<image src="/static/countdown.png" class="count-img"></image>
					<text v-if="info.time_type == 2">距截团仅剩</text>
					<text v-else>距开团还有</text>
				</view>
				<view class="count-item-wrap disCenter">
					<view class="count-item disCenter">
						{{hr}}
					</view>
					<view class="count-symbol">
						:
					</view>
					<view class="count-item disCenter">
						{{min}}
					</view>
					<view class="count-symbol">
						:
					</view>
					<view class="count-item disCenter">
						{{sec}}
					</view>
				</view>
			</view>
			<view class="price-wrap disAlignCenter">
				<view class="price-box">
					<view class="" v-if="info.config.price_type == 1 || info.config.price_type == 3">
						<text class="font22 fontIta color-grayPrice">定金价：</text>
						<text class="font24 fontBold color-pink ">￥</text>
						<text class="font30 fontBold color-pink ">{{info.deposit_price || 0}}</text>
					</view>
					<view class="" v-if="info.config.price_type == 2 || info.config.price_type == 3">
						<text class="font22 fontIta color-grayPrice">入仓价：</text>
						<text class="font24 fontBold color-pink ">￥</text>
						<text class="font30 fontBold color-pink ">{{info.warehousing_price || 0}}</text>
						<text class="font30 fontBold color-pink " v-if="info.warehousing_price_unit">/</text>
						<text class="font30 fontBold color-pink " v-if="info.warehousing_price_num > 1&& info.warehousing_price_unit">{{info.warehousing_price_num || ''}}</text>
						<text class="font30 fontBold color-pink ">{{info.warehousing_price_unit || ''}}</text>
					</view>
				</view>
				<view class="fontBold text-line color-grayPrice" v-if="parseFloat(info.old_price)">
					￥{{info.old_price || 0}}
					<text v-if="info.old_price_unit">/</text>
					<text v-if="info.old_price_num > 1 && info.old_price_unit">{{info.old_price_num || ''}}</text>
					<text>{{info.old_price_unit || ''}}</text>
				</view>
			</view>
			<view class="percent-wrap disAlignCenter">
				
				<view class="progress-box">
					<view class="botline">
						<view class="topline" :style="{width:info.ratio + '%'}"></view>
					</view>
				</view>
				<view class="font22 color-pink">
					已售：{{info.sales || 0}}
				</view>
			</view>
			<view class="goods-title-wrap">
				<view class="goods-title line1">
					{{info.good_name || ''}}
				</view>
				<image :src="imgUrl + 'lg-share-pink.png'" class="lg-share-pink" @click="isLog(4,0)"></image>
			</view>
			<view class="goods-intr color-pink">
				{{info.desc || '默认规格'}}
			</view>
		</view>
		<view class="lines"></view>
		<view class="dec-wrap">
			<view class="dec-item scale-1px-bottom" v-if="normList.length > 0 &&info.time_type == 2&&info.num_stock_left > 0" @click="isLog(0,1)">
				<view class=" disAlignCenter">
					<view class="dec-img-wrap disCenter">
						<image :src="imgUrl + 'lg-selected.png'" class="lg-selected"></image>
					</view>
					<view class="font30 fontBold">
						已选
					</view>
				</view>
				<view class="dec-txt-wrap disBetween" >
					<view class="dec-txt line1">
						{{selectNorm || '请选择'}}
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
			</view>
			<view class="dec-item" v-if="service.length > 0">
				<view class=" disAlignCenter">
					<view class="dec-img-wrap disCenter">
						<image :src="imgUrl + 'lg-service.png'" class="lg-service"></image>
					</view>
					<view class="font30 fontBold">
						服务保障
					</view>
				</view>
				<view class="dec-txt-wrap disBetween">
					<view class="dec-txt dec-txt-service disFlex">
						<view class="margingRight20 marginBottom15" v-for="(item,index) in service" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-detail">
			<view class="goods-detail-line"></view>
			<view class="goods-detail-txt">
				商品详情
			</view>
			<view class="goods-detail-line"></view>
		</view>
		<view class="" v-html="info.content">
			
		</view>
		<view class="bot-data">
			我是有底线的~~
		</view>
		
		<view class="blank"></view>
		<view class="bot-bar disBetween">
			<view class="disAlignCenter marginTop10">
				<image :src="imgUrl + 'lg-d-index.png'" class="lg-bot-img" @click="toIndex"></image>
				<image :src="imgUrl + 'lg-d-customer.png'" class="lg-bot-img" @click="show('QSCustomer')"></image>
			</view>
			<view class="disAlignCenter" v-if="info.sell_status == 1  &&info.num_stock_left > 0">
				<view class="font30 fontBold disCenter bot-btn" :class="info.config.is_normal == 2?'bot-only':''" @click="isLog(2,2)" v-if="info.config.open_deposit == 1">
					{{info.config.is_normal == 2?'定金购买':'定金模式'}}
				</view>
				<view class="font30 fontBold disCenter bot-btn bot-btn-r" :class="info.config.open_deposit == 2?'bot-only':''" @click="isLog(1,2)" v-if="info.config.is_normal == 1">
					{{info.config.open_deposit == 2?'入仓购买':'入仓模式'}}
				</view>
			</view>
			<view class="disAlignCenter" v-else>
				<view class="font30 fontBold disCenter bot-btn bot-btn-no" :class="info.config.is_normal == 2?'bot-only':''" v-if="info.config.open_deposit == 1" @click="allSale">
					{{info.config.is_normal == 2?'定金购买':'定金模式'}}
				</view>
				<view class="font30 fontBold disCenter bot-btn bot-btn-no" :class="info.config.open_deposit == 2?'bot-only':''" v-if="info.config.is_normal == 1" @click="allSale">
					{{info.config.open_deposit == 2?'入仓购买':'入仓模式'}}
				</view>
			</view>
		</view>
		
		<QSPopup ref="QSNorm" type="fadeInUp">
			<view class="norm-wrap">
				<view class="norm-top">
					<view class="norm-price-wrap disFlex">
						<view class="norm-img-wrap disCenter">
							<image :src="info.goods_pic" class="norm-img"></image>
						</view>
						<view class="norm-price">
							<view class="color-pink fontBold marginBottom20">
								<text class="font22">￥</text>
								<text class="font40">{{price}}</text>
								<text class=" color-black" v-if="priceUnit">/</text>
								<text class="color-black font24" v-if="priceNumShow > 1 && priceUnit">{{priceNumShow || ''}}</text>
								<text class="color-black font24" v-if="priceUnit">{{priceUnit || ''}}</text>
							</view>
							<view class="font26" v-if="info.show_stock != 2">
								库存：{{stock || 0}}
							</view>
						</view>
					</view>
					<view class="norm-item-wrap">
						<view class="norm-item-parent" v-for="(norm,n) in normList" :key="n">
							<view class="norm-item-title">
								{{norm.para_name}}
							</view>
							<view class="norm-item-box">
								<view class="norm-item" v-for="(item,index) in norm.child_attr" :class="[item.isShow?'':'norm-none',subIndex[n] == index?'norm-act':'']" @click="specificationBtn(item.id,n,$event,index,item)">
									{{item.para_name}}
								</view>
							</view>
						</view>
					</view>
					<view class="num-wrap disBetween">
						<view class="num-txt">
							数量：
						</view>
						<view class="disAlignCenter">
							<view class="add-wrap disCenter" @click="jian">
								<image src="/static/jian.png" class="add-jian"></image>
							</view>
							<view class="nums disCenter">
								<input type="number" v-model="num" class="inputs" @blur="blur"/>
							</view>
							<view class="add-wrap disCenter" @click="add">
								<image src="/static/jia.png" class="add-jia"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="norm-bot" :class="info.config.open_deposit == 2||info.config.is_normal==2?'disCenter':'disBetween'" v-if="typeStatus == 1">
					<view class="font34 fontBold disCenter norm-btn" :class="info.config.is_normal==2?'norm-only':''" @click="toComfirm(2)" v-if="info.config.open_deposit == 1">
						{{info.config.is_normal == 2?'定金购买':'定金模式'}}
					</view>
					<view class="font34 fontBold disCenter norm-btn norm-btn-r" :class="info.config.open_deposit==2?'norm-only':''" @click="toComfirm(1)" v-if="info.config.is_normal == 1">
						{{info.config.open_deposit == 2?'入仓购买':'入仓模式'}}
					</view>
				</view>
				<view class="norm-bot-sure" v-if="typeStatus == 2">
					<view class="norm-btn-sure font34 fontBold disCenter" @click="toComfirm(type)">
						确 定
					</view>
				</view>
			</view>
		</QSPopup>
		
		<QSPopup ref="QSCustomer">
			<view class="cus-wrap">
				<view class="cus-item disBetween" v-for="(item,index) in customerList" :key="index" @click="phoneCall(item.phone)" >
					<view class="font30 fontBold" @longpress.stop="longtap(item.phone)">
						{{item.name}}
					</view>
					<view class="" @longpress.stop="longtap(item.phone)">
						{{item.phone}}
					</view>
				</view>
			</view>
		</QSPopup>
		<QSPopup ref="QSPopupShare" type="fadeInUp">
			<view class="share-order disFlex">
				<view class="share-item scale-1px-bottom" >
					<button open-type="share" class="share-button">
						立即分享
					</button>
				</view>
				<view class="share-item" @click="shareFcBefore">
					生成海报
				</view>
				<view class="sure-btn" @tap="hides('QSPopupShare')">
					取消
				</view>
			</view>
		</QSPopup>
		
		<!-- 图片展示由自己实现 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" class="saveBtn" @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>
		</view>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
		
		<QSPopup ref="QSpopUser" :tapMaskHide="false">
			<view class="user-content disCenter">
				{{tipMsg || '该账号已被冻结'}}
			</view>
		</QSPopup>
		
		<image src="/static/back-top.png" class="back-top" mode="" v-if="backTopShow" @click="backTop"></image>
	</view>
</template>

<script>
	const app = getApp()
	let timer = ''
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import _app from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	import http from '@/api/http.js'
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				currents:1,//1今日团品  2明日   从首页进来才有的字段
				info:{},
				current:0,//轮播图下标
				bannerList:[],
				num:1,//数量
				priceNum:1,//数量/单位  
				priceNumShow:1,//展示值  数量/单位  
				priceUnit:'',//数量/单位  
				num_start:1,//起售量
				customerList:[],//客服列表
				price:0,//价格
				priceFixed:0,//参与计算价格  单价
				
				normList:[],//规格列表
				normPriceList:{},//存放要和选中的值进行匹配的数据
				selectArr:[],//存放被选中的值
				subIndex:[],//是否选中
				selectNorm:'请选择',//已选中展示
				selectAttr:'',//选中规格
				stock:0,//库存
				
				goodsid:0,
				service:[],//服务保障
				type:1,//1入仓订单2定金订单
				typeStatus:1,//1点击详情弹出  2点击底部模式弹出  规格
				hr:0,
				min:0,
				sec:0,
				endTime:0,     //结束时间戳
				userId:0,//上级id
				mineId:0,//自己id
				tipMsg:'',
				// 海报
				posterData:{},
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				codeImg:'',
				//滚动高度
				backTopShow:false,
				backTopHeight:0,
			}
		},
		onShareAppMessage(e) {
			console.log(e)
			let that = this
			that.hides('QSPopupShare')
			if (e.from === 'button') {// 来自页面内分享按钮
				console.log(e.target)
			}
			return {
				title: 'TOPT优选',
				path: '/pages/index/detail?id=' + that.goodsid + '&userid=' + that.mineId,
				success(res){
					console.log(res)
				},
				
			}
		},
		onLoad(option) {
			this.goodsid = option.id
			this.backTopHeight = uni.getSystemInfoSync().windowHeight * 3;
			// if(option.current){
			// 	this.currents = option.current
			// }
			console.log(option)
			if(option.userid){
				this.userId = option.userid
				uni.setStorageSync('otherid',this.userId)
			}
			if(option.scene){
				let scene = decodeURIComponent(option.scene)//参数二维码传递过来的参数
				this.goodsid = scene.split('&')[0].split('=')[1]
				this.userId = scene.split('&')[1].split('=')[1]
				uni.setStorageSync('otherid',this.userId)
				console.log(scene)
			}
			if(option.q){
				let q = decodeURIComponent(option.q)//参数二维码传递过来的参数
				console.log(q)
				this.goodsid = q.split('&')[0].split('=')[1]
				this.userId = q.split('&')[1].split('=')[1]
				uni.setStorageSync('otherid',this.userId)
			}
			console.log(this.userId)
			wx.uma.trackEvent('1', { 'goodsid':this.goodsid })
			this.getInfo()
			timer = setInterval(()=>{
				this.countdown()
			},1000)
		},
		onShow() {
			let mineid = uni.getStorageSync('user_id')
			if(mineid){
				this.mineId = mineid
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > this.backTopHeight){
				this.backTopShow = true
			}else{
				this.backTopShow = false
			}
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
			change(e) {
				this.current = e.detail.current;
			},
			
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			isLog(type,typeStatus){
				let that = this
				let data = {
					user_token:uni.getStorageSync('token'),
					user_id:uni.getStorageSync('user_id')
				}
				http('/api/users/get_userinfo','post',data).then( (res) => {
					console.log(res)
					if(res.code == 200){
						if(type == 4){
							
							that.show('QSPopupShare')
						}else{
							that.showPutOrder(type,typeStatus)
						}
					}else if(res.code == 4001){
						that.tipMsg = res.msg
						that.show('QSpopUser')
					}else{
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
									
						        }
						    }
						});
					}
				})
			},
			countdown(){
				const end = this.endTime *1000
				const now = Date.parse(new Date())
				const msec = end - now;
				
				if (msec <= 0) {
					this.hr = 0
					this.min = 0
					this.sec = 0
					clearInterval(timer)
					this.getInfo()
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
			prevImg(){
				uni.previewImage({
					current:this.current,
					urls:this.bannerList
				})
			},
			allSale(){
				if(this.info.time_type == 2){
					this.$util.showToast('商品已售罄')
				}else{
					this.$util.showToast('商品还未开售')
				}
			},
			getInfo(){
				let data = {
					goods_id:this.goodsid,
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token')
				}
				http('/api/index/goods_detail', 'post',data).then(res => {
					console.log(res)
					if(res.code == 200){
						this.info = res.data
						this.bannerList = this.info.banner
						this.service = this.info.service
						this.num = this.info.num_start
						this.num_start = this.info.num_start
						this.normList = this.info.attr
						this.normPriceList = this.info.attr_price
						
						this.stock = this.info.num_stock_left
						
						this.customerList = this.info.sys_phone
						this.endTime = this.info.time
						if(this.info.content){
							let reg = new RegExp('<img','gi')
							this.info.content = this.info.content.replace(reg,'<img style="width:100%;vertical-align: top;"')
						}
						if(this.normList.length > 0){
							this.checkItem()
						}else{
							this.stock = this.info.default_attr.num_stock_left
							this.selectAttr = this.info.default_attr.goods_id
						}
					}
				})
			},
			specificationBtn: function (item, n, event, index,items) {
				console.log(this.selectArr)
				var self = this;
				if(!items.isShow){
					return
				}
				if (self.selectArr[n] != item) {
					self.selectArr[n] = item;
					self.subIndex[n] = index;
				} else {
					self.selectArr[n] = "";
					self.subIndex[n] = -1; //去掉选中的颜色
					self.selectAttr = '';
					self.selectNorm = '请选择'
				}
				self.checkItem();
			},
			checkItem: function () {
				var self = this;
				var option = self.normList;
				var result = [];  //定义数组存储被选中的值
				let selectNorm = [];
				for (var i in option) {
					result[i] = self.selectArr[i] ? self.selectArr[i] : '';
				}
				for (var i in option) {
					var last = result[i];  //把选中的值存放到字符串last去
					for (var k in option[i].child_attr) {
						result[i] = option[i].child_attr[k].id; //赋值，存在直接覆盖，不存在往里面添加name值
						option[i].child_attr[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
					}
					result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
				}
				let resu = result.join(',')
				console.log(self.normPriceList[resu])
				console.log(self.type)
				if(self.normPriceList[resu]){
					if(self.type == 1){
						self.price = parseFloat(self.normPriceList[resu].warehousing_price)
						self.priceFixed = parseFloat(self.normPriceList[resu].warehousing_price)
						self.stock = parseFloat(self.normPriceList[resu].num_stock_left)
						self.priceNum = self.normPriceList[resu].warehousing_price_num
						self.priceUnit = self.normPriceList[resu].warehousing_price_unit
						console.log(self.price,self.stock)
					}else if(self.type == 2){
						self.price = parseFloat(self.normPriceList[resu].deposit_price)
						self.priceFixed = parseFloat(self.normPriceList[resu].deposit_price)
						self.stock = parseFloat(self.normPriceList[resu].num_stock_left)
						self.priceNum = self.normPriceList[resu].deposit_price_num
						self.priceUnit = self.normPriceList[resu].deposit_price_unit
					}else{
						// self.price = parseFloat(self.info.old_price)
						// self.priceFixed = parseFloat(self.info.old_price)
						// self.stock = parseFloat(self.info.num_stock_left)
						self.price = parseFloat(self.normPriceList[resu].warehousing_price)
						self.priceFixed = parseFloat(self.normPriceList[resu].warehousing_price)
						self.stock = parseFloat(self.normPriceList[resu].num_stock_left)
						self.priceNum = self.normPriceList[resu].warehousing_price_num
						self.priceUnit = self.normPriceList[resu].warehousing_price_unit
					}
					self.selectNorm = self.normPriceList[resu].sku_name
					self.selectAttr = resu
					console.log(self.num,self.stock,self.priceNumShow)
					self.subPrice()
					if(self.num > self.stock || self.priceNumShow > self.stock){
						self.num = self.stock
						if(self.priceNumShow){
							self.num = Math.floor(self.stock/self.priceNum)
						}
						self.subPrice()
					}
					
				}
				console.log(result)
				self.$forceUpdate(); //重绘
			},
			isMay: function (result) {
				for (var i in result) { 
					if (result[i] == '') {
						return true; //如果数组里有为空的值，那直接返回true
					}
				}
				return this.normPriceList[result].num_stock_left <= 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
			},
			showPutOrder(type,typeStatus){
				this.type = type
				this.typeStatus = typeStatus
				if(type == 1){
					if(this.normList.length > 0){
						this.price =parseFloat(this.info.warehousing_price)
						this.priceFixed =parseFloat(this.info.warehousing_price) 
						this.priceNum = this.info.warehousing_price_num
						this.priceUnit = this.info.warehousing_price_unit
					}else{
						this.price =parseFloat(this.info.default_attr.warehousing_price)
						this.priceFixed =parseFloat(this.info.default_attr.warehousing_price) 
						this.priceNum = this.info.default_attr.warehousing_price_num
						this.priceUnit = this.info.default_attr.warehousing_price_unit
					}
				}else if(type == 2){
					if(this.normList.length > 0){
						this.price =parseFloat(this.info.deposit_price)
						this.priceFixed =parseFloat(this.info.deposit_price) 
						this.priceNum = this.info.deposit_price_num
						this.priceUnit = this.info.deposit_price_unit
					}else{
						this.price =parseFloat(this.info.default_attr.deposit_price)
						this.priceFixed =parseFloat(this.info.default_attr.deposit_price) 
						this.priceNum = this.info.default_attr.deposit_price_num
						this.priceUnit = this.info.default_attr.deposit_price_unit
					}
				}else{
					// this.price =parseFloat(this.info.old_price)
					// this.priceFixed =parseFloat(this.info.old_price) 
					if(this.normList.length > 0){
						this.price =parseFloat(this.info.warehousing_price)
						this.priceFixed =parseFloat(this.info.warehousing_price) 
						this.priceNum = this.info.warehousing_price_num
						this.priceUnit = this.info.warehousing_price_unit
					}else{
						this.price =parseFloat(this.info.default_attr.warehousing_price)
						this.priceFixed =parseFloat(this.info.default_attr.warehousing_price) 
						this.priceNum = this.info.default_attr.warehousing_price_num
						this.priceUnit = this.info.default_attr.warehousing_price_unit
					}
				}
				this.subPrice()
				this.show('QSNorm')
			},
			toComfirm(type){
				this.type = type
				console.log(this.type)
				if(this.selectAttr == ''){
					uni.showToast({
						title:'请先选择规格',
						icon:'none',
						duration:1300
					})
					return
				}
				this.$util.showLoading('下单中')
				let datas = [{goods_id:this.goodsid,goods_num:this.num,goods_attr:this.selectAttr}]
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					data:JSON.stringify(datas),
					type: this.type
				}
				http('/api/order/place_order', 'post',data).then(res => {
					console.log(res)
					this.$util.hideLoading()
					if(res.code == 200 || res.code == 1){
						let ordernum = res.data.ordernum
						uni.navigateTo({
							url:'/pages/index/confirmOrder?ordernum=' + ordernum + '&type=' + this.type
						})
					}else{
						this.$util.showToast(res.msg)
					}
					
				})
			},
			blur(){
				this.num = parseInt(this.num) 
				// this.num = this.num.replace(/[^/d]/g,1)
				this.subPrice()
				console.log(this.num)
				if(this.num < this.num_start){
					this.$util.showToast('输入数量不能小于起售数量')
					this.num = this.num_start
					this.subPrice()
				}else if(this.num > this.stock || this.priceNumShow > this.stock){
					this.$util.showToast('输入数量不能超过购买上限')
					this.num = this.stock
					if(this.priceNumShow){
						this.num = Math.floor(this.stock/this.priceNum)
					}
					this.subPrice()
				}else if(isNaN(this.num)){
					this.num = 1
					this.subPrice()
				}else{
					this.subPrice()
				}
			},
			subPrice(){
				let price = parseFloat(this.priceFixed)
				let num = parseInt(this.num)
				let priceNum = parseInt(this.priceNum)
				this.priceNumShow = priceNum * num
				this.price = (price * num).toFixed(2)
			},
			add(){
				this.num += 1
				this.subPrice()
				if(this.num > this.stock || this.priceNumShow >this.stock){
					this.num--
					this.subPrice()
					this.$util.showToast('已是最大购买数')
				}
			},
			jian(){
				if(this.num <= this.num_start){
					// this.$util.showToast('已是最小购买数')
					return
				}
				this.num -= 1
				this.subPrice()
			},
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			longtap(num){
				let that = this
				uni.setClipboardData({
				    data: num,
				    success: function () {
				        console.log('success');
						that.$util.showToast('复制成功')
				    }
				});
			},
			shareFcBefore(){
				this.$util.showLoading('请稍候')
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.goodsid
				}
				http('/api/users/createwxaqrcode','post',data).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$util.hideLoading()
						this.codeImg = res.data.url;
						this.hides('QSPopupShare')
						setTimeout(()=>{
							this.shareFc()
						},100)
					}else{
						this.$util.hideLoading()
					}
				})
			},
			// 生成海报
			async shareFc() {
				
				try {
					_app.log('准备生成:' + new Date())
					let good_name = this.info.good_name
					if(good_name.length > 23){
						good_name = good_name.substring(0,23) + '...'
					}
					let service = this.info.service.join(' ')
					if(service.length > 34){
						service = service.substring(0,33) + '...'
					}
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1120,
							height: 1800,
							backgroundColor: '#fff'
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									
									{
										type: 'text',
										fontWeight: 'bold',
										text: '发现一个好物,推荐给你呀',
										size: 50,
										color: '#222222',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: 15,
												dy: 80
											}
										}
									},
									{
										type: 'image',
										url: this.info.goods_pic,
										dx:15,
										dy:160,
										infoCallBack(imageInfo) {
											// let scale = bgObj.width * 0.2 / imageInfo.height;
											return {
												dWidth: bgObj.width * 0.98,
												dHeight: bgObj.height * 0.56,
												
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: good_name,
										size: 50,
										color: '#222222',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: 15,
												dy: bgObj.height * 0.56 + 220
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: '入仓价',
										size: 40,
										color: '#df1f36',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: 14,
												dy: bgObj.height * 0.56 + 306
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: '￥' + this.info.warehousing_price,
										size: 60,
										color: '#df1f36',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: 150,
												dy: bgObj.height * 0.56 + 300
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: '￥' + this.info.old_price,
										lineThrough:{
											
										},
										size: 40,
										color: '#9f9f9f',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width * 0.45,
												dy: bgObj.height * 0.56 + 306
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: service,
										size: 40,
										color: '#9f9f9f',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: 15,
												dy: bgObj.height * 0.56 + 376
											}
										}
									},
									{
										type: 'image',
										url: this.codeImg,
										dx:60,
										dy:bgObj.height * 0.8,
										infoCallBack(imageInfo) {
											return {
												dWidth: 320,
												dHeight:320
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: '长按识别小程序码',
										size: 70,
										color: '#333333',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width * 0.4,
												dy: bgObj.height * 0.86
											}
										}
									},
									{
										type: 'text',
										fontWeight: 'bold',
										text: '超值好货一起拼',
										size: 40,
										color: '#9f9f9f',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx: bgObj.width * 0.4,
												dy: bgObj.height * 0.91
											}
										}
									},
									// {
									// 	type: 'qrcode',
									// 	text: '你好，我是取舍',
									// 	size: bgObj.width * 0.2,
									// 	dx: bgObj.width*0.05,
									// 	dy: bgObj.height - bgObj.width*0.25
									// }
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				let that = this
				uni.saveImageToPhotosAlbum({
					filePath: that.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
						that.qrShow = false;
					},
					fail: function(err){
					 // #ifdef MP-WEIXIN
					 if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
					 	 wx.showModal({
							title: '提示',
							content: '需要您授权保存相册',
							showCancel: false,
							success:modalSuccess=>{
							  wx.openSetting({
								success(settingdata) {
								  console.log("settingdata", settingdata)
								  if (settingdata.authSetting['scope.writePhotosAlbum']) {
									wx.showModal({
									  title: '提示',
									  content: '获取权限成功,再次点击图片即可保存',
									  showCancel: false,
									  success:(res)=>{
										  if(res.confirm){
											
										  }
									  }
									})
								  } else {
									wx.showModal({
									  title: '提示',
									  content: '获取权限失败，将无法保存到相册哦~',
									  showCancel: false,
									  success:(res)=>{
										  if(res.confirm){
											 
										  }
									  }
									})
								  }
								},
								fail(failData) {
								  console.log("failData",failData)
								},
								complete(finishData) {
								  console.log("finishData", finishData)
								}
							  })
							}
						  })
					 }else{
					  uni.showToast({
					   title:'保存失败',
					   icon:'none'
					  });
					  setTimeout(()=>{
						this.qrShow = false  
					  },1000)
					 }
					 // #endif
					 console.log(err);
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style lang="less">
	.lines{
		background-color: #f3f3f3;
		height: 12upx;
	}
	.swiper-wrap{
		width: 100%;
		height: 685upx;
		position: relative;
		.swiper-top-box{
			height: 685upx;
		}
		.banner{
			width: 100%;
			height: 685upx;
		}
		.current-box{
			padding: 6upx 24upx;
			background: rgba(0,0,0,0.5);
			color: #fff;
			position: absolute;
			right: 40upx;
			bottom: 40upx;
			z-index: 50;
			border-radius: 30upx;
		}
	}
	.top-box{
		padding: 40upx 20upx;
		position: relative;
		.price-wrap{
			min-height: 80upx;
		}
		.price-box{
			margin-right: 32upx;
		}
		.percent-wrap{
			margin-top: 20upx;
		}
		.progress-box{
			width: 252upx;
			margin-right: 20upx;
			
			.botline{
				width: 100%;
				height: 18upx;
				background-color: #eee;
				border-radius: 20upx;
				.topline{
					height: 18upx;
					background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
					border-radius: 20upx;
				}
			}
		}
		.goods-title-wrap{
			position: relative;
			padding: 50upx 90upx 16upx 0;
			.goods-title{
				color: #323232;
				font-size: 30upx;
				font-weight: bold;
			}
			.lg-share-pink{
				width: 44upx;
				height: 44upx;
				position: absolute;
				right: 20upx;
				top: 50upx;
			}
		}
		.goods-intr{
			font-size: 24upx;
			// color: #535353;
			padding-right: 20upx;
		}
		.count-wrap{
			position: absolute;
			right: 20upx;
			top: 40upx;
			.count-img-wrap{
				font-size: 22upx;
				color: #EB7A8D;
				.count-img{
					width: 22upx;
					height: 22upx;
					margin-right: 10upx;
				}
			}
			.count-item-wrap{
				margin-top: 20upx;
			}
			.count-item{
				// padding: 2upx 6upx;
				width: 32upx;
				height: 32upx;
				color: #fff;
				background-color: #EB7A8D;
				font-size: 18upx;
				border-radius: 6upx;
			}
			.count-symbol{
				font-weight: bold;
				margin: 0 6upx;
				font-size: 18upx;
				color: #EB7A8D;
			}
		}
	}
	.dec-wrap{
		padding: 0 30upx;
		.dec-item{
			padding: 30upx 0 34upx;
			.dec-img-wrap{
				width: 40upx;
				height: 40upx;
				margin-right: 20upx;
			}
			.lg-selected{
				width: 35upx;
				height: 35upx;
			}
			.lg-service{
				width: 34upx;
				height: 37upx;
			}
			.right-gray{
				width: 15upx;
				height: 26upx;
			}
			.dec-txt-wrap{
				margin-top: 14upx;
				.dec-txt{
					padding-left: 60upx;
					color: #949494;
					width: 90%;
				}
				.dec-txt-service{
					flex-wrap: wrap;
				}
			}
		}
	}
	
	.goods-detail{
		height: 100upx;
		background-color: #f4f4f4;
		display: flex;
		justify-content: center;
		align-items: center;
		.goods-detail-line{
			width: 62upx;
			height: 2upx;
			background-color: #949494;
		}
		.goods-detail-txt{
			color: #434343;
			font-size: 26upx;
			margin: 0 20upx;
		}
	}
	.bot-data{
		padding: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #BFBFBF;
		font-size: 24upx;
	}
	.blank{
		height: 140upx;
	}
	.bot-bar{
		width: 100%;
		height: 140upx;
		background-color: #fff8f9;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		.lg-bot-img{
			width: 124upx;
			height: 124upx;
		}
		.bot-btn{
			width: 210upx;
			height: 66upx;
			border-radius: 60upx;
			color:#fff;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			margin-right: 30upx;
			
		}
		.bot-btn-r{
			background: linear-gradient(90deg,#ffb19b 0%,#ff99dd 100%);
		}
		.bot-btn-no{
			background: #aaa;
		}
		.bot-only{
			width: 420upx;
		}
	}
	
	.norm-wrap{
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
		width: 750upx;
		.norm-top{
			padding: 0 30upx;
			border-bottom: 1px solid #f2f2f2;
			.norm-price-wrap{
				padding: 40upx 0 60upx;
				.norm-img-wrap{
					width: 188upx;
					height: 188upx;
					background-color: #c7c7c7;
					border-radius: 10upx;
					.norm-img{
						width: 184upx;
						height: 184upx;
						border-radius: 10upx;
					}
				}
				.norm-price{
					margin-left: 24upx;
					align-self: flex-end;
				}
			}
			.norm-item-wrap{
				// max-height: 470upx;
				max-height: 434upx;
				overflow: auto;
				.norm-item-parent{
					
					.norm-item-title{
						font-size: 30upx;
						margin-bottom: 20upx;
						font-weight: bold;
					}
				}
				.norm-item-box{
					display: flex;
					flex-wrap: wrap;
				}
				.norm-item{
					padding: 14upx 30upx;
					background-color: #f4f4f4;
					border-radius: 50upx;
					font-size: 26upx;
					color: #181818;
					text-align: center;
					margin-right: 24upx;
					margin-bottom: 24upx;
					min-width: 200upx;
					
				}
				.norm-act{
					color: #EC7A8E;
					background-color: #fff;
					border: 1px solid #EC7A8E;
				}
				.norm-none{
					color: #A0A0A0;
				}
			}
			.num-wrap{
				padding: 20upx 30upx 40upx 0;
				.num-txt{
					font-size: 26upx;
					color: #8A8A8A;
					
				}
				.add-wrap{
					width: 68upx;
					height: 62upx;
					.add-jian{
						width: 28upx;
						height: 4upx;
					}
					.add-jia{
						width: 28upx;
						height: 28upx;
					}
				}
				.nums{
					width: 100upx;
					height: 62upx;
					padding: 0 20upx;
					background-color: #f4f4f4;
					border-radius: 10upx;
					.inputs{
						text-align: center;
						width: 100%;
						font-size: 34upx;
						font-weight: bold;
						color: #1B1B1B;
					}
				}
			}
		}
		.norm-bot{
			padding: 40upx 70upx;
			.norm-btn{
				width: 250upx;
				height: 80upx;
				border-radius: 80upx;
				color:#fff;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			}
			.norm-btn-r{
				background: linear-gradient(90deg,#ffb19b 0%,#ff99dd 100%);
			}
			.norm-only{
				width: 100%;
				height: 80upx;
				border-radius: 80upx;
				color:#fff;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			}
		}
		.norm-bot-sure{
			padding: 40upx 80upx;
			.norm-btn-sure{
				width: 100%;
				height: 80upx;
				border-radius: 80upx;
				color:#fff;
				background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
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
	.cus-wrap{
		width: 500upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 20upx 70upx;
		.cus-item{
			padding: 20upx 0;
		}
	}
	
	.share-wrap{
		margin-right: 30rpx;
		.share-img{
			width: 50rpx;
			height: 46rpx;
		}
		.word{
			text-align: center;
			font-size:18rpx;
			color:rgba(153,153,153,1);
		}
	}
	//分享按钮弹出层
	.share-order{
		width: 750upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		
		box-sizing: border-box;
		justify-content: center;
		flex-direction: column;
		.share-item{
			padding: 40upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30upx;
			.share-button{
				border: none;
				padding: 0;
				width: 100%;
				background: transparent;
				font-size: 30upx;
				line-height: 30upx;
			}
			.share-button::after{
				border: none;
			}
		}
		.sure-btn{
			width: 100%;
			height: 100upx;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			font-size: 40upx;
			color: #ffffff;
			line-height: 100upx;
			text-align: center
		}
	}
	
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	.saveBtn{
		background:#ff99dd !important;
		color: #fff;
		font-size: 28rpx;
		
	}
	
	.back-top{
		width: 80upx;
		height: 80upx;
		position: fixed;
		right: 30upx;
		bottom: 150upx;
		z-index: 110;
		background: #fff;
		border-radius: 50%;
	}
</style>
