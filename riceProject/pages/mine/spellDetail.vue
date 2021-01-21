<template>
	<view>
		<view class="blank"></view>
		<view class="spell-wraps">
			<!-- 拼团状态 -->
			<view class="spell-status scale-1px-bottom">
				<view class="status-title" v-if="groupIndex == 0">
					正在拼团
				</view>
				<view class="status-title" v-if="groupIndex == -1">
					拼团未成功
				</view>
				<view class="status-title" v-if="groupIndex == 1">
					拼团成功
				</view>
				<view class="status-time disFlex" v-if="groupIndex == 0">
					<text>剩余</text>
					<view class="time-item">{{hr}}</view>:
					<view class="time-item">{{min}}</view>:
					<view class="time-item">{{sec}}</view>
				</view>
				<view class="status-time disFlex" v-if="groupIndex == -1">
					<text>再接再厉！</text>
				</view>	
				<view class="status-time disFlex" v-if="groupIndex == 1">
					<text>恭喜您拼团成功！</text>
				</view>
				<view class="status-people disFlex">
					<view class="people-item" v-for="item in groupRecord" :key="item.id">
						<view class="commander" v-if="item.is_creator==1">团长</view>
						<image :src="item.headimgurl?item.headimgurl:'/static/noperson.png'" mode="aspectFill"></image>
					</view>
					<view class="people-item" v-for="(item2,index2) in peopleNum" :key="index2">
						<image src="/static/noperson.png"></image>
					</view>
				</view>
				<view v-if="groupIndex == 0">
					<view class="status-btn" @click="share" v-if="goods.is_partake==1">
						<text>分  享</text>
					</view>
					<view class="status-btn" @click="joinPart" v-if="goods.is_partake==0">
						<text>参与拼团</text>
					</view>
				</view>
				<view class="status-btn" v-if="groupIndex == -1" @click="tOther">
					<text>逛逛别的吧</text>
				</view>
				<view class="status-btn" v-if="groupIndex == 1" @click="tOrderGroup">
					<text>查看订单详情</text>
				</view>
				<view v-if="goodstatus != 1&& this.groupIndex == 0">
					该商品已下架，请等待钱款退回!
				</view>
			</view>
			<!-- 拼团规则 -->
			<view class="spell-ruler scale-1px-bottom">
				<view class="ruler-title">
					拼团规则
				</view>
				<view class="ruler-name">
					<view class="ruler-line"></view>
					团长
				</view>
				<view class="ruler-intr">
					团长是该团第一位购买并支付成功的人；
				</view>
				<view class="ruler-name">
					<view class="ruler-line"></view>
					如何邀请好友参团
				</view>
				<view class="ruler-intr">
					团长开团后可以将团链接分享给好友，好友也购买该商品即为参团。参团的团员也可以分享团链接邀请更多好友参加；
				</view>
			</view>
			<!-- 图文详情 -->
			<view class="spell-detail">
				<view class="detail-title">
					图文详情
				</view>
				<view class="info-img">
					<!-- <image src="/static/detail-img.png"></image> -->
					<view v-html="goods.details"></view>
				</view>
				
			</view>
		</view>
		<!-- 参与拼团 -->
		<QSPopup ref="QSPopup2" type="fadeInUp">
			<view class="content">
				<view class="content-main" >
					<view class="content-text disFlex scale-1px-bottom paddingBottom20">
						<view>
							<image class="content-img" :src="goods.cover"></image>
						</view>
						<view class="content-intr">
							<view class="content-price marginBottom15">
								<text class="content-cost-price">￥{{price}}</text>
							</view>
							<!-- <view class="content-have">
								库存{{stock}}件
							</view> -->
						</view>
						<image class="content-out" src="/static/out.png" @tap="hideCar"></image>
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
				<view class="sure-btn" @tap="toPay">
					确定
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default{
		components: {QSPopup},
		data(){
			return{
				spellId:0,		// 团购记录id
				groupId:0,		
				group_buy_id:0,// 团购id
				endTime:0,
				hr: 0,
				min: 0,
				sec: 0,
				groupRecord:[],
				groupIndex:0,//拼团状态
				goods:{},
				peopleNum:0,	//头像为未知
				interval:'',	//定时器
				price:0,
				buyNum:1,
				normNumber:0,//规格
				group_buy_records_id:0,//团长id
				orderId:0,		//订单id
				goodstatus:0,	//商品状态  不为1  就是下架或删除 不能购买
				goodsDesc:'',	//分享需要   商品简介
				goodsName:'',	//分享需要   商品名
				coverImg:'',	//分享需要   商品封面
				domain_name:'',//域名
			}
		},
		onLoad(option) {
			this.spellId = option.id
			if(option.groupid){
				this.groupId = option.groupid
			}
			this.getdomainName()
			this.getSpellDetail()
		},
		onShow() {
			this.interval = setInterval(()=>{
				this.countdown()
			},1000)
			// this.getSpellDetail()
		},
		onHide() {
			clearInterval(this.interval)
		},
		methods:{
			getdomainName(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.domain_name = res.data.data.domain_name
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hideCar(){
				this.hides('QSPopup2')
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			
			share(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.domain_name+"/#/pages/mine/spellDetail?id="+this.spellId,
				    title: this.goodsName,
				    summary: this.goodsDesc,
				    imageUrl: this.coverImg,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				})
			},
			tOrderGroup(){
				uni.navigateTo({
					url:'/pages/index/pinTuan/order-group?id='+ this.orderId
				})
			},
			tOther(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			joinPart(){
				this.show('QSPopup2')
			},
			checkNorm(){
				let data = {
					token:uni.getStorageSync('token'), 
					group_buy_id:this.group_buy_id,
					num:this.buyNum
				}
				http('/api/GroupBuy/ajaxCheckGroupBuy','post',data).then(res=>{
					if(res.data.status == '200'){
						this.$util.setStorage('groupOrderdata',{
							token:uni.getStorageSync('token'),
							condition_number:this.normNumber,
							group_buy_id:this.group_buy_id,
							number:this.buyNum,
							goods_id:this.goodsId,
							type:1,
							attr_id:this.skuId
						})
						uni.navigateTo({
							url:'/pages/index/pay/groupPay?recordid='+this.group_buy_records_id
						})
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
				})
			},
			toPay(){
				
				if(uni.getStorageSync('token')){
					let data = {
						token:uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo','get',data).then(res=>{
						if(res.data.status == '200'){
							this.checkNorm()
						}else{
							this.$util.showToast('登录信息已过期，请重新登录')
							let that = this
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/index/logon/logon?islogon=2&id='+that.spellId
								})
							},1500)
						}
						console.log(res)
					})
				}else{
				
					uni.showModal({
						title: '您暂未登录',
						content: '登录发现更多精彩',
						cancelColor:'#bbbbbb',
						confirmColor:'#FB4142',
						confirmText:'去登陆',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								let that = this
								uni.navigateTo({
									url:'/pages/index/logon/logon?islogon=2&id='+that.spellId
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			addNum(){
				
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
			getSpellDetail(){
				if(uni.getStorageSync('token')){
					let data = {
						token:uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo','get',data).then(res=>{
						if(res.data.status == '200'){
							
						}else{
							let that = this
							that.$util.showToast('登录信息已过期，请重新登录')
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/index/logon/logon?islogon=2&id='+that.spellId
								})
							},1500)
						}
						console.log(res)
					})
				}
				let data = {
					token:uni.getStorageSync('token'),
					records_id:this.spellId
				}
				http('/api/GroupBuy/groupBuyDetails','post',data).then(res=>{
					if(res.data.status == '200'){
						this.groupRecord = res.data.data.fatherRecord
						this.groupIndex = res.data.data.fatherRecord[0].is_group
						this.endTime = res.data.data.fatherRecord[0].expire_time
						this.group_buy_id = res.data.data.fatherRecord[0].group_buy_id
						this.goods = res.data.data.goods
						this.orderId = res.data.data.goods.order_id
						this.price = res.data.data.goods.group_buy_price
						this.peopleNum = parseInt(res.data.data.number) - res.data.data.fatherRecord.length	//空头像
						this.normNumber = res.data.data.number
						this.goodstatus = res.data.data.goods.status
						this.goodsDesc = res.data.data.goods.desc			//分享需要   商品简介
						this.goodsName = res.data.data.goods.goods_name		//分享需要   商品名
						this.coverImg = res.data.data.goods.cover			//分享需要   商品封面
						if(res.data.data.fatherRecord[0]){
							this.group_buy_records_id = res.data.data.fatherRecord[0].id
						}
						if(this.goods.details){
							let reg = new RegExp('<img', 'gi');
							this.goods.details = this.goods.details.replace(reg, `<img style="width: 100%"`);
						}
						if(this.goodstatus != 1 && this.groupIndex == 0){
							this.$util.showToast('该商品已下架')
						}
					}else if(res.data.status == '201'){
						let that = this
						that.$util.showToast('登录信息已过期，请重新登录')
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/index/logon/logon?islogon=2&id='+that.spellId
							})
						},1500)
					}else{
						this.$util.showToast(res.data.message)
						return
					}
					
					
					console.log(res)
				})
				
			},
			countdown(){
				const end = this.endTime *1000
				const now = Date.parse(new Date())
				const msec = end - now;
				if (msec <= 0) {
				        return;
				     }
				let day = parseInt(msec / 1000 / 60 / 60 / 24);
				let hr = parseInt((msec / 1000 / 60 / 60) % 24);
				let min = parseInt((msec / 1000 / 60) % 60);
				let sec = parseInt((msec / 1000) % 60);
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : '0' + min;
				this.sec = sec > 9 ? sec : '0' + sec;
				// console.log(msec)
				if(this.hr=== '00' && this.min==='00'&& this.sec ==='00'){
				    console.log(1234566)
				    return
				}
				
			},
		}
	}
</script>

<style lang="less">
	.blank{
		position: fixed;
		top: 88upx;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #f2f2f5;
		/* #ifdef APP-PLUS */
			top: 0;
		/* #endif */
	}
	.spell-wraps{
		padding:0 30upx;
		box-sizing: border-box;
	}
	.spell-status{
		padding: 40upx 50upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		.status-title{
			font-size:32upx;
			font-weight:bold;
		}
		.status-time{
			margin-top: 26upx;
			font-weight: bold;
			font-size: 24upx;
			align-items: center;
			.time-item{
				width:40upx;
				height:40upx;
				background:rgba(51,51,51,1);
				border-radius:6upx;
				color: #FFFFFF;
				font-size: 24upx;
				line-height: 40upx;
				text-align: center;
				margin: 0 12upx;
			}
			text{
				font-weight: normal;
				font-size: 24upx;
				margin-right: 20upx;
			}
		}
		.status-people{
			margin-top: 32upx;
			padding: 0 10upx;
			box-sizing: border-box;
			width: 100%;
			flex-wrap: wrap;
			justify-content: center;
			.people-item{
				position: relative;
				margin-right: 34upx;
				margin-bottom: 20upx;
				.commander{
					width: 56upx;
					height: 24upx;
					line-height: 24upx;
					text-align: center;
					color: #FFFFFF;
					font-size: 24upx;
					/* #ifdef APP-PLUS */
					font-size: 20upx;
					/* #endif */
					position: absolute;
					right: -14upx;
					top: 0;
					background-color: #F84949;
					z-index: 1;
					border-radius: 10upx;
				}
			}
			image{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.status-btn{
			margin-top: 32upx;
			width:200upx;
			height:54upx;
			background:rgba(248,73,73,1);
			box-shadow:0px 10upx 10upx 0px rgba(248, 73, 73, 0.35);
			border-radius:27upx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				color: #FFFFFF;
				font-size: 24upx;
			}
			
		}
	}
	.spell-ruler{
		padding: 40upx 0;
		box-sizing: border-box;
		.ruler-title{
			font-size:32upx;
			font-weight:bold;
		}
		.ruler-name{
			display: flex;
			font-weight:bold;
			align-items: center;
			margin-top: 30upx;
			.ruler-line{
				width:4upx;
				height:30upx;
				background:#F84949;
				margin-right: 16upx;
			}
		}
		.ruler-intr{
			font-size: 24upx;
			margin-top: 18upx;
			font-weight:500;
		}
	}
	.spell-detail{
		padding: 40upx 0;
		box-sizing: border-box;
		.detail-title{
			font-size:32upx;
			font-weight:bold;
			margin-bottom: 20upx;
		}
		.info-img{
			width: 100%;
		}
	}
	
	.content{
		width: 750upx;
		height: 600upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		overflow-y: auto;
		.content-main{
			padding: 40upx;
			width: 100%;
			height: 600upx;
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
						color: #FB4142;
					}
					.content-vip-price{
						color: #FB4142;
						margin-left: 15upx;
					}
					.content-have{
						color: #bbbbbb;
					}
				}
				
				.content-out{
					position: absolute;
					right: 0;
					top: 0;
					width: 30upx;
					height: 30upx;
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
						padding: 10upx 0;
						font-size: 24upx;
						width:180upx;
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
						width:180upx;
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
</style>
