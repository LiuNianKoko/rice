<template>
	<view class="detail-wraps">
		<!-- 商品信息存在 -->
		<view class="detail-wrap1" v-if="goodsStatus">
			<view class="detail-head" >
				<view class="detail-head-img">
					<!-- <image class="detail-banner" src="/static/detail-img.png"></image> -->
					<!-- 视频  轮播图 -->
					<view class="detail-banner">
						
						<swiper class="screen-swiper" :hidden="!autoplay" v-if="goods.video">
							<swiper-item>
								<video id="myVideo" :src="goods.video"
							 autoplay="false" loop muted show-play-btn controls objectFit="cover" @pause="ZhanTing" @ended="ZhanTing"></video>
							</swiper-item>
						</swiper>
						<!-- :autoplay="!autoplay"  :hidden="autoplay" -->
						<swiper  class="screen-swiper" :hidden="autoplay" indicator-dots="true" circular="true" :autoplay="!autoplay"
						  interval="3500" duration="500">
							<swiper-item @tap="BoFang" v-for="(item2,index) in goods.banner_arr" :key="index">
								<!-- 播放 按钮 -->
								<image class="playImg" @tap="BoFang" src="/static/play.png" v-if="index==0&&goods.video"></image>
								<image :src="item2"></image>
							</swiper-item>
						</swiper>
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<!-- 分享按钮 -->
					<view class="share">
						<!-- <navigator open-type="navigateBack">
							<image class="to-left-btn" src="/static/to-left.png"></image>
						</navigator> -->
						
						<image class="share-btn" src="/static/share-img.png" @tap="show('QSPopupShare')"></image>
						<text class="share-btn-text">分享</text>
					</view>
					<!-- #endif -->
				</view>
				<view class="detail-text">
					<view class="detail-title">
						{{goods.goods_name||''}}
					</view>
					<!-- 拼团 信息 -->
				<!-- 	<view class="advance">
						预售现在付款预计2019年10月1日发货
					</view> -->
					<!-- <view class="advance">
						现在付款定金20元，请于2019年9月30日前支付尾款 <br> 尾款支付完成后两天内发货
					</view> -->
					
					<view class="advance">
						{{goods.valid_hour||''}}小时后恢复原价￥{{goods.price||''}}起
					</view>
					<!-- 拼团信息 完 -->
					<view class="detail-intr">
						{{goods.desc||''}}
					</view>
					<text class="detail-cost-price">￥{{goods.price||''}}</text>
					<view class="detail-price">
						<view class="detail-vip-price">
							<text class="symbol">￥</text>
							{{goods.reveal_price || ''}}
							<image class="x2-img" src="/static/member-man3.png"></image>
						</view>
						<!-- <text class="detail-vip-price margingLeft20">拼团价￥{{goods.reveal_price||''}}</text> -->
						<!-- <view class="detail-num">仅剩 {{goods.purchase_num||0}} 件</view> -->
						<view class="detail-num">仅剩 {{goods.stock||0}} 件</view>
					</view>
				</view>
			</view>
			<view class="blanks"></view>
			<!-- 拼团 -->
			<view class="spell-wrap">
				<view class="spell">
					<view class="spell-text disFlex scale-1px-bottom">
						<view class="spell-title">
							{{goods.recordsCount}}人正在拼单，可直接参与
						</view>
						<view class="spell-more" @click="show('QSPopupSpell')">
							查看全部
							<image class="look-more" src="/static/more-r.png"></image>
						</view>
					</view>
					<view class="spell-item scale-1px-bottom" v-for="item in group_buy_record" :key="item.id">
						<view class="align-center">
							<view class="spell-pic">
								<image :src="item.headimgurl?item.headimgurl:'/static/noperson.png'" mode="aspectFill"></image>
							</view>
							<view class="spell-name" v-if="item.nickname">
								{{item.nickname}}
							</view>
						</view>
						<view class="align-center">
							<view class="spell-time">
								还差 <text>{{item.difference}} 人</text> 拼成 <br>剩余{{item.downtime}}
							</view>
							<view class="spell-btn" @click="toSpellDetail(item.id,item.group_buy_id)">
								去拼单
							</view>
						</view>
					</view>
					
				</view>
				<view class="blanks"></view>
			</view>
			<!-- 详情 tab-->
			<view class="detail-main">
				<view>
					<!-- tab 切换组件 -->
					<segmented-control
					  id="tabbar"
					  :values="items"
					  :stickyTop="100"
					  :current="current"
					  @clickItem="onClickItem"
					></segmented-control>
				</view>
				<view class="list marginTop20" id="list">
					<view class="info-img" v-show="current==0">
						<!-- <image class="marginBottom10" src="/static/detail-img.png"></image> -->
						<view v-html="goods.details"></view>
					</view>
					
					<view class="info-norms" v-show="current==1">
						<view class="info-norms-item" v-if="goods.produce_permit">
							<text class="info-norms-l">生产许可证编号 </text>
							<text class="info-norms-r">{{goods.produce_permit}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.factory_name">
							<text class="info-norms-l">厂名</text>
							<text class="info-norms-r">{{goods.factory_name}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.address">
							<text class="info-norms-l">厂址</text>
							<text class="info-norms-r">{{goods.address}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.phone">
							<text class="info-norms-l">厂家联系方式</text>
							<text class="info-norms-r">{{goods.phone}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.shelf_life">
							<text class="info-norms-l">保质期</text>
							<text class="info-norms-r">{{goods.shelf_life}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.brand">
							<text class="info-norms-l">品牌</text>
							<text class="info-norms-r">{{goods.brand}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.norms">
							<text class="info-norms-l">规格</text>
							<text class="info-norms-r">{{goods.norms}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.producing_area">
							<text class="info-norms-l">产地</text>
							<text class="info-norms-r">{{goods.producing_area}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.province">
							<text class="info-norms-l">省份</text>
							<text class="info-norms-r">{{goods.province}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.kind">
							<text class="info-norms-l">种类</text>
							<text class="info-norms-r">{{goods.kind}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.net_weight">
							<text class="info-norms-l">净含量</text>
							<text class="info-norms-r">{{goods.net_weight}}</text>
						</view>
						<view class="info-norms-item" v-if="goods.packing">
							<text class="info-norms-l">包装方式</text>
							<text class="info-norms-r">{{goods.packing}}</text>
						</view>
					</view>
					<view class="info-comment" v-show="current==2">
						<view class="info-comment-item marginBottom20" v-for="(item,index) in comment" :key="index">
							<view class="comment-person">
								<view class="person-pic">
									<image :src="item.headimgurl"></image>
									<!-- <image src="/static/commentpic.png"></image> -->
									
								</view>
								<view class="person-msg">
									<view class="person-name line1">
										{{item.nickname}}
									</view>
									<view class="person-star disFlex">
										<image src="/static/star-red.png" v-if="item.grade >= 1"></image>
										<image src="/static/star-gray.png" v-else></image>
										<image src="/static/star-red.png" v-if="item.grade >= 2"></image>
										<image src="/static/star-gray.png" v-else></image>
										<image src="/static/star-red.png" v-if="item.grade >= 3"></image>
										<image src="/static/star-gray.png" v-else></image>
										<image src="/static/star-red.png" v-if="item.grade >= 4"></image>
										<image src="/static/star-gray.png" v-else></image>
										<image src="/static/star-red.png" v-if="item.grade >= 5"></image>
										<image src="/static/star-gray.png" v-else></image>
									</view>
								</view>
								<view class="person-time">
									{{item.time}}
								</view>
							</view>
							<view class="comment-text">
								{{item.content}}
							</view>
							<view class="comment-img" v-for="(item2,index) in item.pics_arr" :key="index">
								<image :src="item2"></image>
							</view>
						</view>
						
					</view>
				</view> 
			</view>
				<!-- 底部栏 -->
			<view class="detail-footer">
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="contact" class="footer-kefu footer-common">
					<image src="/static/customer.png"></image>
					联系客服
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="footer-kefu footer-common" @click="callPhone">
					<image src="/static/customer.png"></image>
					联系客服
				</view>
				<!-- #endif -->
				<view class="footer-collect footer-common" @tap="joinColl">
					<image src="/static/collect.png" v-if="goods.is_Collection == 0"></image>
					<!-- <image src="/static/collect.png" v-else></image> -->
					<image src="/static/star-red.png" v-if="goods.is_Collection == 1"></image>
					
					收藏
				</view>
				<view class="footer-add-wrap">
					<!-- <view class="footer-add" @tap="show('QSPopup2',1)">
						加入购物车
					</view> -->
					<view class="footer-add" @tap="show('QSPopup2',1)">
						单独购买
					</view>
					<!-- <view class="footer-buy" @tap="show('QSPopup2',2)">
						立即购买
					</view> -->
					<!-- <view class="footer-buy" >
						即将开抢
					</view> -->
					<view class="footer-buy" @click="show('QSPopup2',2)">
						发起拼单
					</view>
				</view>
			</view>
		</view>
		<!-- 商品信息不存在 -->
		<view class="detail-wrap2" v-if="!goodsStatus">
			<view class="detail-msg">
				{{goods.msg}}
			</view>
		</view>
		<!-- 拼团弹窗 -->
		<QSPopup ref="QSPopupSpell">
			<view class="spell-window">
				<image class="close" src="/static/out.png" @click="hides('QSPopupSpell')"></image>
				<view class="spell-intr scale-1px-bottom">
					{{goods.recordsCount}}人正在拼单，可直接参与
				</view>
				<view class="spell-item scale-1px-bottom" v-for="item in groupRecord" :key="item.id">
					<view class="align-center">
						<view class="spell-pic">
							<!-- <image src="/static/item-img.png"></image> -->
							<image :src="item.headimgurl?item.headimgurl:'/static/noperson.png'" mode="aspectFill"></image>
						</view>
						<view class="spell-name" v-if="item.nickname">
							{{item.nickname}}
						</view>
					</view>
					<view class="align-center">
						<view class="spell-time">
							还差 <text>{{item.difference}} 人</text> 拼成 <br>剩余{{item.downtime}}
						</view>
						<view class="spell-btn" @click="toSpellDetail(item.id,item.group_buy_id)">
							去拼单
						</view>
					</view>
				</view>
				
			</view>
		</QSPopup>
		<!-- 购买 购物车 弹窗-->
		<QSPopup ref="QSPopup2" type="fadeInUp">
			<view class="content">
				<view class="content-main" >
					<view class="content-text disFlex scale-1px-bottom paddingBottom20">
						<view>
							<image class="content-img" :src="goods.cover"></image>
						</view>
						<view class="content-intr">
							<view class="content-price">
								<text class="content-cost-price">
									<text class="cost-symbol">￥</text>
									{{price}}
								</text>
							</view>
							<view class="content-have">
								库存{{stock}}件
							</view>
						</view>
						<image class="content-out" src="/static/out.png" @tap="hideCar"></image>
					</view>
					<!-- 发起拼单 -->
					<view class="content-norm scale-1px-bottom disFlex paddingBottom20 paddingTop20" v-if="type==2">
						
						<view class="norm-text " v-for="(item,index) in goods.group_buy" :key="index" >
							<view class="norm-item" :class="[normInGroup==index?'norm-active':'']" @click="normGroup(item,index)">
								{{item[0]}}人团{{item[1]}}元
							</view>
						</view>
						
					</view>
					<!-- 单独购买 -->
					<view class="content-norm scale-1px-bottom paddingBottom20 paddingTop20" v-for="(item2,index2) in goods.choose_norms" :key="index2" v-if="type==1">
						<view class="norm-title">
							{{item2.name}}
						</view>
						<view class="norm-text">
							<view class="norm-item" :class="[normIn2==item3.id?'norm-active':'',normIn3==item3.id?'norm-active':'']" v-for="(item3,index3) in item2.son_norms_arr" :key="index3" @tap="normTap(index2,index3,item3.id)">{{item3.name}}</view>
						</view>
					</view>
					<view class="content-num scale-1px-bottom paddingBottom20 paddingTop20">
						<view class="num-title">
							购买数量<!-- <text class="num-text">(每人限购5件)</text> -->
						</view>
						<view class="num-computed">
							<view class="num-jian num-common" @tap="jianNum">
								-
							</view>
							<view class="num-total num-common">
								{{buyNum}}
							</view>
							<view class="num-add num-common" @tap="addNum">
								+
							</view>
						</view>
					</view>
				</view>
				<view class="sure-btn" @tap="isLogon">
					确定
				</view>
			</view>
		</QSPopup>
		<!-- 分享按钮弹窗 -->
		<QSPopup ref="QSPopupShare" type="fadeInUp">
			<view class="share-order disFlex">
				<view class="share-item" @click="shareWeixin">
					<image src="/static/wxfriend.png"></image>
					微信好友
				</view>
				<view class="share-item" @click="shareCircleWeixin">
					<image src="/static/friendcircle.png"></image>
					朋友圈
				</view>
				<!-- <view class="share-item" @tap="showCreate"> -->
				<view class="share-item" @click="shareFc">	
					<image src="/static/poster.png"></image>
					生成海报
				</view>
				<view class="sure-btn" @tap="hides('QSPopupShare')">
					取消
				</view>
			</view>
		</QSPopup>
		
	
		
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
					<view class="del-btn-no" @tap="hidepop">
						取消
					</view>
					<view class="del-btn-yes" @tap="toLogin">
						去登录
					</view>
				</view>
			</view>
		</QSPopup>
		<!-- 生成图片 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				</view>
			</view>
			<view class="download" @click="saveImage()">
				<view class="download-save">
					<image src="/static/download.png"></image>
					<text>保存图片</text>
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
		    <canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import segmentedControl from '@/components/segmented-control.vue';
	import getSharePoster from '@/components/QS-SharePoster/QS-SharePoster.js'
	let timer 
	let timer2 
	export default {
		components: {segmentedControl,QSPopup},
		data() {
			return {
				detailimgtxt:'',
				phone:'',
				items: ['图文详情', '商品参数', '客户评价'],
				current: 0,  //tab 切换对应
				goods:{},//商品信息
				chooseNorms:[],//规格列表
				goodsStatus:true,  // 请求到商品信息时显示状态
				autoplay:false,  //
				normIn2:0,  // 规格选择 对应
				normIn3:0,
				buyNum:1  ,// 购买商品数量
				groupBuyId:0,   //团购商品id
				goodsId:0,  //商品id
				type:1,   //1 加入购物车   2 立即购买
				price:0,  //普通价
				prices:0,
				memberPrice:0,  //会员价
				stock:0,  //库存
				skuId:0,  //库存 id
				comment:[],  //评论
				normType:2,		// 2 一规格  3 两规格
				groupRecord:[],   //拼单列表
				group_buy_record:[],
				endTime:0,     //结束时间戳
			    hr: 0,
			    min: 0,
				sec: 0,
				normNumber:0,//团购人数
				normInGroup:0,
				poster: {},		//canvas需要  起
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				codeImg:'',
				coverImg:'',
				goodsName:'',
				actPrice:0,
				goodsDesc:'',//canvas需要  结
				domain_name:'',//域名
				spread_user_id:0,//推广人id
				userId:0,//分享到小程序自己的id
			}
		},
		onLoad(option) {
			console.log(option)
			
			this.groupBuyId = option.groupid
			if(option.spread_user_id){
				this.spread_user_id = option.spread_user_id
			}
			if(option.scene){
				let scene = decodeURIComponent(option.scene)//参数二维码传递过来的参数
				this.groupBuyId = scene.split("=")[1]
				console.log(scene)
			}
			if(option.q){
				let q = decodeURIComponent(option.q)//参数二维码传递过来的参数
				console.log(q)
				let arr = q.split('?');
				let arr2 = arr[1].split('&')
				let goodsid = arr2[0].split('=')[1];
				let user_id = arr2[1].split('=')[1];
				this.groupBuyId = goodsid
				this.spread_user_id = user_id
				// this.groupBuyId = q.split("?")[1].split("=")[1]
			}
			if(this.spread_user_id){
				uni.setStorageSync('spread_user_id',this.spread_user_id)
			}else{
				uni.setStorageSync('spread_user_id',0)
			}
			this.getPhone()
			this.getdomainName()
			this.getUserId()
		},
		onShareAppMessage(option) {
			let that = this
			return {
			    title: that.goodsName,
			    path: '/pages/index/gorupBuy?groupid='+this.groupBuyId+ '&spread_user_id=' + this.userId,
				imageUrl:that.coverImg
			   }
		},
		onShow() {
			this.getInfo()
			this.getGroupRecord()
		},
		destroyed() {
			clearInterval(timer)
			timer = null
			clearInterval(timer2)
			timer2 = null
		},
		onHide() {
			this.hides('QSPopupSpell')
			this.hideCar()
			clearInterval(timer)
			timer = null
			clearInterval(timer2)
			timer2 = null
		},
		onReady: function(res) {
					// #ifndef MP-ALIPAY
					this.videoContext = uni.createVideoContext('myVideo')
					// #endif
				},
		methods:{
			getUserId(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.userId = res.data.data.id
					}
				})
			},
			hidepop(){
				this.hides('QSPopuplogin')
				this.hides('QSPopup2')
			},
			toLogin(){
				if(this.spread_user_id){
					uni.navigateTo({
						url:'/pages/index/logon/logon?islogon=5&id='+this.groupBuyId+'&spread_user_id=' + this.spread_user_id
					})
				}else{
					uni.navigateTo({
						url:'/pages/index/logon/logon'
					})
				}
				this.hides('QSPopuplogin')
			},
			show(ref,type) {
				this.$refs[ref].show();
				if(type == 1){
					this.type = 1
					if(this.chooseNorms.length>0){
						let that = this
						let normArr = []
						if(that.chooseNorms.length == 1){
							that.normIn2 = that.chooseNorms[0].son_norms_arr[0].id
						}
						if(that.chooseNorms.length == 2){
							that.normIn2 = that.chooseNorms[0].son_norms_arr[0].id
							that.normIn3 = that.chooseNorms[1].son_norms_arr[0].id
						}
						if(that.chooseNorms.length == 1){
							that.normType = 2
							normArr.push(that.normIn2)
							that.buyNum = 1
						}
						if(that.chooseNorms.length == 2){
							that.normType = 3
							if(that.normIn2 == 0 ||that.normIn3 ==0){
								return
							}
							normArr.push(that.normIn2,that.normIn3)
							that.buyNum = 1
						}
						let data = {
							token:uni.getStorageSync('token'),
							type:that.normType,
							goods_id:that.goodsId,
							norms_id:normArr.join(',')
						}
						http('/api/Goods/getNormsInfo','post',data).then(res=>{
							if(res.data.status == '200'){
								that.price =parseFloat(res.data.data.price) 
								// that.prices =parseFloat(this.goods.price) 
								that.memberPrice = res.data.data.member_price
								that.stock = res.data.data.stock
								that.skuId = res.data.data.sku_id
							}else{
								uni.showToast({
									title:res.data.message,
									icon:'none'
								})
							}
							console.log(res)
						})
					}
				}else if(type == 2){
					this.type = 2	
					
				}
				if(this.goods){
					// this.price =parseFloat(this.goods.price) 
					this.price =parseFloat(this.goods.group_buy[0][1]) 
					this.normNumber = this.goods.group_buy[0][0]
					// this.prices =parseFloat(this.goods.price) 
					this.memberPrice = this.goods.member_price
					this.stock = this.goods.stock
					this.skuId = this.goods.sku_id
				}
				
			},
			showCreate(){
				this.show('QSPopupCreate')
				this.hides('QSPopupShare')
			},
			hideCar(){
				this.hides('QSPopup2')
				this.normIn2 = 0
				this.normIn3 = 0
				this.normInGroup = 0
			},
			hides(ref){
				this.$refs[ref].hide()
				this.price = 0
				this.memberPrice = 0
				this.stock = 0
				this.buyNum = 1
			},
			onClickItem(index) {
				  if (this.current !== index) {
					this.current = index;
				  }
			},
			toSpellDetail(id,groupid){
				
				uni.navigateTo({
					url:'/pages/mine/spellDetail?id='+id+'&groupid='+groupid
				})
			},
			countdown2(){
				// const end = this.endTime *1000
				// const now = Date.parse(new Date())
				// const msec = end - now;
				// if (msec <= 0) {
				//         return;
				//      }
				clearInterval(timer2)
				let that = this
				timer2 = setInterval(()=>{
					for(let i = 0;i < that.groupRecord.length;i++){
						let end = (that.groupRecord[i].expire_time) *1000
						let now = Date.parse(new Date())
						let msec = end - now;
						if(msec > 0){
							let day = parseInt(msec / 1000 / 60 / 60 / 24);
							let hr = parseInt((msec / 1000 / 60 / 60) % 24);
							let min = parseInt((msec / 1000 / 60) % 60);
							let sec = parseInt((msec / 1000) % 60);
							hr = hr > 9 ? hr : '0' + hr;
							min = min > 9 ? min : '0' + min;
							sec = sec > 9 ? sec : '0' + sec;
							let format = ''
							format = `${hr}:${min}:${sec}`
							// that.groupRecord[i].downtime = format
							that.$set(that.groupRecord[i],'downtime',format)
							console.log(that.groupRecord[i].downtime)
						}else{
							
							let format = '00:00:00'
							that.groupRecord[i].downtime = format
						}
					}
				},1000)
			},
			countdown(){
				// const end = this.endTime *1000
				// const now = Date.parse(new Date())
				// const msec = end - now;
				// if (msec <= 0) {
				//         return;
				//      }
				clearInterval(timer)
				let that = this
				timer = setInterval(()=>{
					for(let i = 0;i < that.group_buy_record.length;i++){
						let end = (that.group_buy_record[i].expire_time) *1000
						let now = Date.parse(new Date())
						let msec = end - now;
						if(msec > 0){
							let day = parseInt(msec / 1000 / 60 / 60 / 24);
							let hr = parseInt((msec / 1000 / 60 / 60) % 24);
							let min = parseInt((msec / 1000 / 60) % 60);
							let sec = parseInt((msec / 1000) % 60);
							hr = hr > 9 ? hr : '0' + hr;
							min = min > 9 ? min : '0' + min;
							sec = sec > 9 ? sec : '0' + sec;
							let format = ''
							format = `${hr}:${min}:${sec}`
							// that.groupRecord[i].downtime = format
							that.$set(that.group_buy_record[i],'downtime',format)
							console.log(that.group_buy_record[i].downtime)
						}else{
							
							let format = '00:00:00'
							that.group_buy_record[i].downtime = format
						}
					}
				},1000)
			},
			getGroupRecord(){
				let data = {
					token:uni.getStorageSync('token'),
					group_buy_id:this.groupBuyId
				}
				http('/api/GroupBuy/groupBuyRecord','post',data).then(res=>{
					if(res.data.status == '200'){
						this.groupRecord = res.data.data.group_buy_record
						// if(res.data.data.group_buy_record.length > 0){	
						// 	this.endTime = res.data.data.group_buy_record[0].expire_time
							
						// }
						this.countdown2()
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
					
					console.log(res)
				})
			},
			getInfo(){
				
				let data = {
						token:uni.getStorageSync('token'),
						group_buy_id:this.groupBuyId
					}
				http('/api/GroupBuy/GroupBuyInfo','post',data).then(res=>{
					if(res.data.status =='200'){
						
						this.goods= res.data.data.groupBuyInfo
						if(res.data.data.groupBuyInfo.choose_norms){
							this.chooseNorms = res.data.data.groupBuyInfo.choose_norms
						}
						this.comment = res.data.data.comment
						this.goodsId = res.data.data.groupBuyInfo.goods_id
						this.skuId = res.data.data.groupBuyInfo.sku_id
						console.log(res)
						this.goodsStatus = true
						if(this.goods.details){
							let reg = new RegExp('<img', 'gi');
							this.goods.details = this.goods.details.replace(reg, `<img style="width: 100%;vertical-align:top;"`);
						}
						
						if(res.data.data.groupBuyInfo.group_buy_record.length > 0){
							this.group_buy_record = res.data.data.groupBuyInfo.group_buy_record
							this.countdown()
						}
						this.prices = res.data.data.groupBuyInfo.price
						this.actPrice = res.data.data.groupBuyInfo.reveal_price
						this.goodsName = res.data.data.groupBuyInfo.goods_name
						this.coverImg = res.data.data.groupBuyInfo.cover
						this.codeImg = res.data.data.groupBuyInfo.qr_code
						this.goodsDesc = res.data.data.groupBuyInfo.desc
					}else if(res.data.status == '400'){
						this.goods = res.data
						this.goodsStatus = false
					}
					
					console.log(res)
				})
			},
			BoFang(){
				if(this.autoplay==false&&this.goods.video){
					this.autoplay=true;
					this.videoContext.play();
				}
			},
			ZhanTing(){
				if(this.autoplay==true){
					this.autoplay=false
				}
			},
			joinColl(){
				let data = {
					token:uni.getStorageSync('token'),
					goods_id:this.goodsId,
					type:2,
					activity_id:this.groupBuyId
				}
				http('/api/User/coll_goods','post',data).then(res=>{
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					console.log(res)
				})
				setTimeout(()=>{
					this.getInfo()
				},50)
			},
			normGroup(item,index){
				let that = this
				that.normInGroup = index
				that.normNumber = item[0]
				that.price = item[1]
				that.buyNum = 1
				// let data = {
				// 	token:uni.getStorageSync('token'), 
				// 	group_buy_id:that.groupBuyId,
				// 	num:that.buyNum
				// }
				// http('/api/GroupBuy/ajaxCheckGroupBuy','post',data).then(res=>{
				// 	if(res.data.status == '200'){
						
				// 	}else{
				// 		// this.$util.showToast(res.data.msg)
				// 		// return
				// 	}
					
				// 	console.log(res)
				// })
			},
			normTap(index2,index3,id){
				let that = this
				let normArr = []
				
				if(index2 == 0){
					that.normIn2 = id
				}
				if(index2 == 1){
					that.normIn3 = id
				}
				if(that.goods.choose_norms.length == 1){
					that.normType = 2
					normArr.push(id)
					that.buyNum = 1
				}
				if(that.goods.choose_norms.length == 2){
					that.normType = 3
					if(that.normIn2 == 0 ||that.normIn3 ==0){
						return
					}
					normArr.push(that.normIn2,that.normIn3)
					that.buyNum = 1
				}
			
				let data = {
					token:uni.getStorageSync('token'),
					type:that.normType,
					goods_id:that.goodsId,
					norms_id:normArr.join(',')
				}
				http('/api/Goods/getNormsInfo','post',data).then(res=>{
					if(res.data.status == '200'){
						that.price =parseFloat(res.data.data.price) 
						that.prices =parseFloat(that.goods.price) 
						that.memberPrice = res.data.data.member_price
						that.stock = res.data.data.stock
						that.skuId = res.data.data.sku_id
					}else if(res.data.status == '400'){
						that.$util.showToast(res.data.msg)
					}
					console.log(res.data.data)
				})
			},
			isLogon(){
				if(uni.getStorageSync('token')){
					let data = {
						token:uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo','get',data).then(res=>{
						if(res.data.status == '200'){
							this.toPay()
						}else{
							this.$util.showToast('登录信息已过期，请重新登录')
							let that = this
							setTimeout(()=>{
								if(that.spread_user_id){
									uni.navigateTo({
										url:'/pages/index/logon/logon?islogon=5&id='+that.presaleId+'&spread_user_id=' + that.spread_user_id
									})
								}else{
									uni.navigateTo({
										url:'/pages/index/logon/logon'
									})
								}
							},1500)
							return
						}
						
						console.log(res)
					})
				}else{
					this.show('QSPopuplogin')
				}
			},
			toPay(){
					if(this.type == 1){
						if(this.stock > 0 && this.stock >= this.buyNum){
							//#ifndef MP-WEIXIN
							this.$util.setStorage('orderdata',{
								token:uni.getStorageSync('token'),
								type:1,
								goods_id:this.goodsId,
								attr_id:this.skuId,
								number:this.buyNum
							})
							//#endif
							//#ifdef MP-WEIXIN
							wx.setStorageSync('orderdata',{
								token:uni.getStorageSync('token'),
								type:1,
								goods_id:this.goodsId,
								attr_id:this.skuId,
								number:this.buyNum
							})
							//#endif
							uni.navigateTo({
								url:'/pages/index/pay/pay'
							})
							
						}else{
							uni.showToast({
								title:'未选择规格或库存不足',
								icon:'none'
							})
							return
						}
					}else if(this.type == 2){
						// if(this.normInGroup == -1){
						// 	uni.showToast({
						// 		title:'未选择规格',
						// 		icon:'none'
						// 	})
						// 	return
						// }
						
						let data = {
							token:uni.getStorageSync('token'), 
							group_buy_id:this.groupBuyId,
							num:this.buyNum
						}
						http('/api/GroupBuy/ajaxCheckGroupBuy','post',data).then(res=>{
							if(res.data.status == '200'){
								//#ifndef MP-WEIXIN
								this.$util.setStorage('groupOrderdata',{
									token:uni.getStorageSync('token'),
									condition_number:this.normNumber,
									group_buy_id:this.groupBuyId,
									number:this.buyNum,
									goods_id:this.goodsId,
									type:1,
									attr_id:this.skuId
								})
								//#endif
								//#ifdef MP-WEIXIN
								wx.setStorageSync('groupOrderdata',{
									token:uni.getStorageSync('token'),
									condition_number:this.normNumber,
									group_buy_id:this.groupBuyId,
									number:this.buyNum,
									goods_id:this.goodsId,
									type:1,
									attr_id:this.skuId
								})
								//#endif
								uni.navigateTo({
									url:'/pages/index/pay/groupPay'
								})
							}else{
								this.$util.showToast(res.data.msg)
								return
							}
							
							console.log(res)
						})
						// if(this.stock > 0 && this.stock >= this.buyNum ){
							
						// 	this.$util.setStorage('groupOrderdata',{
						// 		token:uni.getStorageSync('token'),
						// 		condition_number:this.normNumber,
						// 		group_buy_id:this.groupBuyId,
						// 		number:this.buyNum,
						// 		goods_id:this.goodsId,
						// 		type:1,
						// 		attr_id:this.skuId
						// 	})
							
						// 	uni.navigateTo({
						// 		url:'/pages/index/pay/groupPay'
						// 	})
						// }
					}
				
				
			},
			addNum(){
				// this.price = this.price*(this.buyNum+1);
				let prices = 0
				if(this.buyNum){
					this.buyNum += 1
					
					prices = (this.price * this.buyNum / (this.buyNum - 1)).toFixed(2)
					// console.log(prices)
					this.price = prices
				}
				
				// if(this.buyNum >= 5){
				// 	return
				// }
				// if(this.buyNum < 5){      //定义一个 初始价格
				// 	this.buyNum += 1
				// 	this.price = this.prices * this.buyNum
				// }
			},
			jianNum(){
				let prices = 0
				if(this.buyNum > 1){
					this.buyNum -= 1
					
					prices = (this.price * this.buyNum / (this.buyNum + 1)).toFixed(2)
					// console.log(prices)
					this.price = prices
				}
				if(this.buyNum <= 1){
					return
				}
			},
			getPhone(){
				http('/api/Setting/servicePhone','post').then(res=>{
					if(res.data.status == '200'){
						this.phone = res.data.data.service_phone
					}
					console.log(res)
				})
			},
			callPhone(){
				// let that = this
				// uni.makePhoneCall({
				 	
				//  	// 手机号
				//     phoneNumber:that.phone, 
				
				// 	// 成功回调
				// 	success: (res) => {
				// 		console.log('调用成功!')	
				// 	},
				
				// 	// 失败回调
				// 	fail: (res) => {
				// 		console.log('调用失败!')
				// 	}
					
				//   })
				//   that.hides('QSPopupkefu')
				uni.navigateTo({
					url: '/pages/index/totalList?kefu=kefu'
				}) 
			},
			getdomainName(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.domain_name = res.data.data.domain_name
					
				})
			},
			shareWeixin(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.domain_name+"/#/pages/index/gorupBuy?groupid="+this.groupBuyId+ '&spread_user_id=' + this.userId,
				    title: '我在棋特买菜发现一个宝贝',
				    summary: this.goodsName,
				    imageUrl: this.coverImg,
				   // provider: 'weixin',
				   // scene: "WXSceneSession",
				   // type: 5,
				   // imageUrl:this.coverImg,
				   // title: this.goodsName,
				   // miniProgram: {
				   // 	id: 'gh_921dd6574e02',
				   // 	path: 'pages/index/gorupBuy?groupid='+this.groupBuyId+ '&spread_user_id=' + this.userId,
				   // 	type: 0,
				   // 	webUrl: this.domain_name+"/#/pages/index/gorupBuy?groupid="+this.groupBuyId+ '&spread_user_id=' + this.userId
				   // },
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				})
			},
			shareCircleWeixin(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: this.domain_name+"/#/pages/index/gorupBuy?groupid="+this.groupBuyId+ '&spread_user_id=' + this.userId,
				    title: '我在棋特买菜发现一个宝贝',
				    summary: this.goodsName,
				    imageUrl: this.coverImg,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				})
			},
			async shareFc() {
				let that = this
				let goodsName1=''
				let goodsName2=''
				if(that.goodsName.length<=11){
					goodsName1 = that.goodsName
				}else if(that.goodsName.length>11&&that.goodsName.length<21){
					goodsName1 = that.goodsName.substring(0,11)
					goodsName2 = that.goodsName.substring(11,that.goodsName.length)
				}else{
					goodsName1 = that.goodsName.substring(0,11)
					goodsName2 = that.goodsName.substring(11,21) + '...'
				}
				let memprice = ''
				if(that.actPrice.length <= 5){
					memprice = that.actPrice
				}else{
					memprice = that.actPrice.substring(0,5)
				}
				console.log(goodsName1,goodsName2)
				console.log(that.actPrice)
				try {
					if (!that.poster.finalPath) {
						const d = await getSharePoster({
							type:'ShareType2',
							background:{
								width:750,
								height:1200,
								backgroundColor:'white'
							},
							posterCanvasId: that.canvasId,
							qrCodeArray: ({bgObj, type, bgScale}) => {
								return [{
									text: '',
									size: bgObj.width*0.01,
									dx: bgObj.width*0.1 - 999,
									dy: bgObj.height - bgObj.width*0.1
								}]
							},
							imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
								const dx = bgObj.width*0.04; 
								return [{
									url: that.coverImg,
									dx,
									dy: bgObj.width*0.04,
									dWidth:530,
									dHeight:530,
									// dy: bgObj.height * 0.5,
									// infoCallBack(imageInfo) {
									// 	let scale = bgObj.width*0.2 / imageInfo.height;
									// 	return {
									// 		dWidth: bgObj.width*0.4,	
									// 		dHeight: bgObj.width*0.4,
									// 	}
									// }
								},
								{
									url: that.codeImg,
									dx:bgObj.width*0.03,
									dy:bgObj.height *0.78,
									dWidth:170,
									dHeight:170,
								},
								{
									url: 'http://ricepic.sayyin.com/9d8b7e8203135040532dd03853a9cb8.png',
									dx:bgObj.width*0.88,
									dy:bgObj.height *0.704,
									dWidth:66,
									dHeight:27,
								},
								{
									url: 'http://applet.qitemc.com/static/logo.png',
									dx:bgObj.width*0.77,
									dy:bgObj.height *0.82,
									dWidth:120,
									dHeight:100,
								},
								{
									url: 'http://ricepic.sayyin.com/vertical_line.png',
									dx:bgObj.width*0.59,
									dy:bgObj.height *0.654,
									dWidth:60,
									dHeight:78,
								},
								]
							},
							textArray: ({bgObj, type, bgScale}) => {
								const fontSize = bgObj.width*0.08;
								const lineHeight = bgObj.height*0.04;
								return [{
									text: goodsName1,
									size: 30,
									color: '#4e4e4e',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.03,
											dy: bgObj.height *0.674
										}
									}
								},
								{
									text: goodsName2,
									size: 30,
									color: '#4e4e4e',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.03,
											dy: bgObj.height *0.72
										}
									}
								},
								{
									text:'￥' + that.prices,
									fontWeight:'bold',
									size: 26,
									color: 'black',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.66,
											dy: bgObj.height *0.674
										}
									}
								},
								{
									text:'￥',
									fontWeight:'bold',
									size: 26,
									color: '#ec614a',
									alpha: .8,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.66,
											dy: bgObj.height *0.72
										}
									}
								},
								{
									text:memprice,
									fontWeight:'bold',
									size: 38,
									color: '#ec614a',
									alpha: .8,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.7,
											dy: bgObj.height *0.718
										}
									}
								},
								{
									text: '点击识别图中二维码',
									size: 16,
									color: 'black',
									alpha: .8,
									textAlign: 'left',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										return {
											dx: bgObj.width *0.35,
											dy: bgObj.height *0.88
										}
									}
								},
								]
							},
							setCanvasWH: ({bgObj, type, bgScale}) => { // 为动态设置画布宽高的方法，
								console.log(bgObj, type, bgScale)
								that.poster = bgObj ;
								
							},
							// setDraw: ({Context, bgObj, type, bgScale}) => {
							// 	Context.setFillStyle('black');
							// 	Context.setGlobalAlpha(0.3);
							// 	Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
							// }
						});
						console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
						that.poster.finalPath = d.poster.tempFilePath;
					}
					that.qrShow = true;
					that.hides('QSPopupShare')
				} catch (e) {
					
					that.$util.hideLoading();
					that.$util.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				let that = this
				uni.saveImageToPhotosAlbum({
					filePath: that.poster.finalPath,
					// filePath: that.base64,
					success(res) {
						that.$util.showToast('保存成功');
						that.qrShow = false;
					},
					fail(rej) {
						that.$util.showToast('保存失败');
					}
				})
				
				// // #ifdef H5
				// this.$util.showToast('保存了');
				// // #endif
			},
			
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style lang="less">
	.detail-wraps{
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 100upx;
		left: 0;
		overflow-y: auto;
	}
	
	.detail-head{
		padding-top: 100upx;
		.detail-head-img{
			position: relative;
			//秒杀图标
			.seckill{
				border-radius:40upx;
				position: absolute;
				left: 30upx;
				bottom: 124upx;
				color: #FFFFFF;
				
				.seckill-r{
					font-size: 24upx;
					width:320upx;
					height:80upx;
					opacity:0.6;
					border-radius:40upx;
					background:rgba(248,73,73,1);
					position: absolute;
					top: 0;
					left: 0;
					line-height: 80upx;
					text-align: right;
					padding-right: 20upx;
					box-sizing: border-box;
					z-index: 2;
				}
				.seckill-l{
					width:80upx;
					height:80upx;
					font-size: 40upx;
					line-height: 80upx;
					text-align: center;
					background:rgba(248,73,73,1);
					border-radius:40upx;
					position: relative;
					z-index: 3;
				}
			}
			// 分享
			.share{
				width: 100%;
				height:80upx;
				position: absolute;
				right: 0;
				top: 30upx;
				.share-btn{
				width: 80upx;
				height: 80upx;
				position: absolute;
				right: 30upx;
				top: 0;
				}
				.share-btn-text{
					position: absolute;
					right: 42upx;
					top: 80upx;
					opacity: 0.8;
				}
				.to-left-btn{
					width: 80upx;
					height: 80upx;
					position: absolute;
					left: 30upx;
					top: 0;
				}
			}
			
			.detail-banner{
				width: 100%;
				height: 750upx;
				.screen-swiper {
						height: 750upx;
						.playImg{
							width: 120upx;
							height: 120upx;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							z-index: 10;
						}
					}
				.screen-swiper image,
				.screen-swiper video{
					width: 100%;
					display: block;
					height: 750upx;
					margin: 0;
					pointer-events: none;
				}
				
			}
		}
		.detail-text{
			width: 100%;
			// height: 350upx;
			padding: 30upx;
			box-sizing: border-box;
			.advance{
				color: #F84949;
			}
			.detail-title{
				// height:110upx;
				// padding-bottom: 30upx;
				margin-bottom: 6upx;
				font-size:36upx;
				font-weight:bold;
				line-height:40upx;
				color: #333;
			}
			.detail-intr{
				// height:34upx;
				color:#939393;
				margin-top: 10upx;
				margin-bottom: 40upx;
			}
			.detail-cost-price{
				font-size:26upx;
				font-weight:bold;
				line-height: 26upx;
				// color:rgba(248,73,73,1);
			}
			.detail-price{
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				margin-top: 2upx;
				.detail-vip-price{
					position: relative;
					font-size:38upx;
					line-height: 38upx;
					color:#ec614a;
					font-weight: bold;
					.symbol{
						font-size: 24upx;
						line-height: 24upx;
					}
					.x2-img{
						width: 66upx;
						height: 30upx;
						position: absolute;
						top: 6upx;
						right: -66upx;
					}
				}
				.detail-num{
					font-size:26upx;
					color:rgba(187,187,187,1);
					// margin-left: 100upx;
					// position: absolute;
					// right: 20upx;
					// bottom: 0;
				}
			}
		}
	}
	.blanks{
		width: 100%;
		height: 20upx;
		background-color:#f2f2f5 ;
	}
	.detail-main{
		width: 100%;
		.info-img{
			width: 100%;
			// height: 100%;
			overflow: hidden;
			image{
				width: 750upx;
			}
			img{
				width: 750upx;
			}
		}
		.info-norms{
			padding: 30upx;
			box-sizing: border-box;
			.info-norms-item{
				display: flex;
				height: 80upx;
				.info-norms-l{
					flex:0 240upx;
					color:rgba(187,187,187,1);
				}
				.info-norms-r{
					flex: 1;
				}
			}
		}
		.info-comment{
			padding: 30upx;
			.info-comment-item{
				
				.comment-person{
					position: relative;
					display: flex;
					height: 100upx;
					width: 100%;
					.person-pic{
						flex: 0 100upx;
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
						image{
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}
					.person-msg{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 90upx;
						margin-left: 30upx;
						.person-name{
							width:280upx;
							// height:38upx;
							font-size:32upx;
							font-weight:bold;
							margin-top: -4upx;
						}
						.person-star{
							image{
								width: 28upx;
								height: 28upx;
							}
						}
					}
					.person-time{
						position: absolute;
						right: 8upx;
						top: 8upx;
						width:148upx;
						height:30upx;
						font-size:24upx;
						color:rgba(170,170,170,1);
					}
				}
				.comment-text{
					margin-top: 30upx;
					margin-bottom: 30upx;
				}
				.comment-img{
					display: flex;
					// justify-content: space-between;
					flex-wrap: wrap;
					image{
						width: 218upx;
						height: 150upx;
						margin-right: 12upx;
						margin-bottom: 18upx;
					}
				}
			}
		}
	}
	// 底部栏  加入购物车
	.detail-footer{
		position: fixed;
		z-index: 20;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		padding-left: 20upx;
		box-sizing: border-box;
		box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		justify-content: space-between;
		.footer-kefu{
			padding: 0;
			margin: 0;
			background-color: #fff;
			padding-left: 20upx;
			box-sizing: border-box;
		}
		.footer-kefu::after{
			border: none;
		}
		.footer-common{
			font-size:16upx;
			color:rgba(187,187,187,1);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 44upx;
				height: 44upx;
				align-self: center;
				margin-bottom: 5upx;
			}
		}
		.footer-add-wrap{
			display: flex;
			.footer-add{
				width:260upx;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				background:#ffecec;
				font-size:32upx;
				color:rgba(251,65,66,1);
			}
			.footer-buy{
				width:260upx;
				height:100upx;
				background:rgba(251,65,66,1);
				line-height: 100upx;
				text-align: center;
				font-size:32upx;
				color:rgba(255,255,255,1);
			}
		}
		
	}
	// 规格选择 弹出层
	.content{
		width: 750upx;
		height: 900upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		overflow-y: auto;
		.content-main{
			padding: 40upx;
			width: 100%;
			height: 800upx;
			box-sizing: border-box;
			overflow-y: auto;
			.content-text{
				position: relative;
				align-items: flex-end;
				.content-img{
					width: 200upx;
					height: 200upx;
				}
				.content-intr{
					margin-left: 30upx;
					.content-cost-price{
						font-size: 40upx;
						color:#ec614a;
						font-weight: bold;
						.cost-symbol{
							font-size: 24upx;
						}
					}
					.content-vip-price{
						color:#ec614a;
						margin-left: 15upx;
					}
					.content-have{
						color: #bbbbbb;
						margin-top: -10upx;
					}
				}
				
				.content-out{
					position: absolute;
					right: 0;
					top: 0;
					width: 40upx;
					height: 40upx;
				}
			}
			.content-norm{
				.norm-title{
					font-size: 32upx;
				}
				.norm-text{
					display: flex;
					flex-wrap: wrap;
					.norm-item{
						padding: 10upx 20upx;
						font-size: 24upx;
						min-width:180upx;
						// height:60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #BBBBBB;
						background:rgba(247,248,252,1);
						border-radius:30upx;
						text-align: center;
						margin-right: 20upx;
						margin-top: 30upx;
					}
					.norm-active{
						padding: 10upx 20upx;
						min-width:180upx;
						// height:60upx;
						color: #FB4142;
						background:#FFF9F9;
						border:1px solid #FB4142;
						border-radius:30upx;
					}
				}
			}
			.content-num{
				display: flex;
				height: 80upx;
				align-items: center;
				.num-title{
					font-size: 32upx;
					.num-text{
						font-size: 24upx;
						color: #BBBBBB;
						margin-left: 25upx;
					}
				}
				.num-computed{
					display: flex;
					margin-left: 90upx;
					.num-common{
						font-size: 32upx;
						width:60upx;
						height:60upx;
						line-height: 60upx;
						text-align: center;
						background:rgba(247,248,252,1);
						border-radius:10upx;
						margin-left: 10upx;
					}
					.num-total{
						width: 120upx;
						font-size: 28upx;
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
		z-index: 100;
		font-size: 40upx;
		color: #ffffff;
		line-height: 100upx;
		text-align: center
	}
	// 商品信息不存在
	.detail-msg{
		font-size: 36upx;
		margin-top: 50%;
		text-align: center;
		color: #ff0000;
	}
	//分享按钮弹出层
	.share-order{
		width: 750upx;
		height: 430upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		padding: 100upx 70upx;
		box-sizing: border-box;
		justify-content: space-between;
		.share-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 80upx;
				height: 80upx;
				margin-bottom: 20upx;
			}
		}
	}
	// 生成海报
	.create-poster{
		.poster-main{
			height: 840upx;
			width: 620upx;
			background-color: white;
			border-radius: 10upx;
			margin-left: 65upx;
			margin-bottom: 100upx;
			padding: 30upx;
			box-sizing: border-box;
			.poster-img{
				image{
					width: 560upx;
					height: 560upx;
				}
			}
			.poster-text{
				display: flex;
				justify-content: space-between;
				margin-top: 40upx;
				.poster-intr{
					width: 330upx;
					.poster-price{
						color: #F84949;
						margin-top: 30upx;
						.poster-cost-price{
							font-size: 48upx;
						}
						.poster-vip-price{
							font-size: 24upx;
							margin-left: 24upx;
						}
					}
				}
				.poster-twocode{
					image{
						width: 160upx;
						height: 160upx;
					}
				}
			}
		}
		
	}
	.download{
		width: 750upx;
		height: 120upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background:#ffffff;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.download-save{
			width:360upx;
			height:90upx;
			background:rgba(251,65,66,1);
			border-radius:45upx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 48upx;
				height: 48upx;
			}
			text{
				font-size: 36upx;
				color: #ffffff;
				margin-left: 20upx;
			}
		}
	}
	// 拼团
	.spell{
		padding: 0 30upx;
		box-sizing: border-box;
		.spell-text{
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			.spell-more{
				display: flex;
				align-items: center;
				color: #BBBBBB;
				font-size: 24upx;
				.look-more{
					width: 28upx;
					height: 28upx;
					margin-left: 10upx;
					// margin-top: 4upx;
				}
			}
		}
		
	}
	.spell-item{
		padding: 26upx 0;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.align-center{
			display: flex;
			align-items: center;
		}
		
		.spell-pic{
			margin-right: 20upx;
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.spell-time{
			font-size: 24upx;
			margin-right: 20upx;
			text{
				color: #FB4142;
				font-size: 24upx;
			}
		}
		.spell-btn{
			width:140upx;
			height:54upx;
			background:rgba(248,73,73,1);
			box-shadow:0px 10upx 10upx 0px rgba(248, 73, 73, 0.35);
			border-radius:27upx;
			line-height: 54upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 24upx;
		}
	}
	// 拼团弹出层
	
	.spell-window{
		width:690upx;
		height:900upx;
		background:rgba(255,255,255,1);
		border-radius:20upx;
		position: relative;
		z-index: 2;
		padding: 20upx;
		box-sizing: border-box;
		overflow-y: auto;
		.close{
			width: 34upx;
			height: 34upx;
			position: absolute;
			top: 26upx;
			right: 26upx;
			z-index: 5;
		}
		.spell-intr{
			padding: 20upx 0;
			text-align: center;
			
		}
	}
	// 海报插件css
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
		transform: scale(3);
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
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	// 客服弹窗
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

