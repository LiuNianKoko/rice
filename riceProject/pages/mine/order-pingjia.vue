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
			</view>
			<!-- 订单项 -->
			<view class="pay-item">
				<view class="pay-title">
					订单信息
				</view>
				<view class="pay-text" >
					<view class="text-img">
						<image :src="orderinfo.cover"></image>
					</view>
					<view class="text-intr">
						<view class="intr-name line2">
							{{orderinfo.goods_name}}
						</view>
						<view class="intr-norm">
							<view class="intr-norm1 line1">
								规格:{{orderinfo.goods_attr_name}}
							</view>
						</view>
						<view class="text-prices">
							<text class="symbol">￥</text>{{orderinfo.goods_price}}
						</view>
					</view>
					<view class="text-price">
						
						<view class="text-num">
							x{{orderinfo.goods_num}}
						</view>
					</view>
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
				<view class="pay-card pay-common" v-if="orderinfo.couprice">
					<view class="pay-left-common">现金券</view>
					<view class="pay-right-common">现金券抵扣{{orderinfo.couprice}}元</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">订单编号</view>
					<view class="pay-right-common">{{orderinfo.ordernum}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">物流订单</view>
					<view class="pay-right-common">{{orderinfo.disordernum}}</view>
				</view>
				<view class="pay-remarks pay-common" v-if="orderinfo.buycontent">
					<view class="pay-left-common">备注</view>
					<view class="pay-right-common" >{{orderinfo.buycontent}}</view>
				</view>
				<view class="pay-remarks pay-common">
					<view class="pay-left-common">评价</view>
					<view class="pay-right-common">
						<view class="start">
							<view class="startbox"  v-for="(i,index) in list" :key="index" @click="clickStars(index)">
							    <image class="startimg" :src="xing>index?stara:starb"/></image>
							</view>
						</view>
					</view>
				</view>
				<view class="pay-remarks pay-common" style="height: auto;" >
					<view class="pay-left-common">评论</view>
					<view class="pay-right-common">
						<textarea class="pingj-txtare" v-model="content" value="" placeholder="请输入评价" />
					</view>
				</view>
				<view class="pay-remarks pay-common" style="height: auto;" >
					<view class="pay-left-common">上传凭证</view>
					<view class="pay-right-common" style="width: calc(100% - 210upx);">
						<view class="upload">
							<view class="shopimg" v-for="(data,index) in imgpathArr" :key="index">
								<image class="spimg" :src="data" mode="aspectFill"></image>
								<view class="deltimg"  @click="deleteimg(index)">✕</view>
							</view>						
							<view class="uploadbtn" @click="didPressChooseImage">
								<image src="/static/zhangh.png" mode=""></image>
								<view class="txt">
									上传凭证<br/>
									(最多3张)            
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="pay-subtotal">
					<text class="subtotal-num margingRight20">共{{orderinfo.goods_num}}件</text>
					<text>小计：</text>
					<text class="subtotal-price"><text class="symbol">￥</text>{{orderinfo.totalprice}}</text>
				</view>
				<!-- <view style="overflow: hidden;">
					<view class="pay-shouh" @click="gosale">
						售后
					</view>
				</view> -->
				<!-- #ifdef MP-WEIXIN -->
				
					<view style="overflow: hidden;">
						<button open-type="contact" class="pay-shouh">
							联系客服
						</button>
					</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view style="overflow: hidden;">
					<view class="pay-shouh" @click="callPhone">
						联系客服
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="pay-ffooter" @click="putPinglun">
			确认评价
		</view>
	</view>
</template>
<script>
	import qiniuUploader from '../../common/qiniuUploader.js'
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components: {QSPopup},
		data() {
			return {
				uptoken:'',
				imgpathArr:[],
				imgpathArr2:[],
				content:'',
				stara:'/static/star-red.png',//亮星星
				list:[0,1,2,3,4],
				starb:'/static/star-gray.png',//暗星星
				pointSelect:false,
				xing:0,
				orderinfo:{},
				chooseList:[
					{name:'支付宝支付',src:'/static/zfb.png'},
					{name:'微信支付',src:'/static/wx.png'},
					{name:'银联云闪付',src:'/static/ysf.png'},
					{name:'余额支付',src:'/static/ye.png'},
				],
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				goodid:0,
				ordernum:'',
				phone:''
			}
		},
		onLoad(option) {
			this.chooseSel();
			this.gettutoken();
			this.ordernum = option.ordernum;
			this.goodid = option.good_id;
			this.getorder();
			this.getPhone()
		},
		methods:{
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
				// uni.showModal({
				//     title: '联系客服',
				//     content: '是否确认拨打客服电话',
				// 	cancelColor:'#bbbbbb',
				// 	confirmColor:'#FB4142',
				//     success: function (res) {
				//         if (res.confirm) {
				//             console.log('用户点击确定');
				// 			uni.makePhoneCall({
							 	
				// 			 	// 手机号
				// 			    phoneNumber:that.phone, 
							
				// 				// 成功回调
				// 				success: (res) => {
				// 					console.log('调用成功!')	
				// 				},
							
				// 				// 失败回调
				// 				fail: (res) => {
				// 					console.log('调用失败!')
				// 				}
								
				// 			  })
							
				//         } else if (res.cancel) {
				//             console.log('用户点击取消');
				//         }
				//     }
				// });
				uni.navigateTo({
					url: '/pages/index/totalList?kefu=kefu'
				})
			},
			// gosale(){
			// 	uni.navigateTo({
			// 		url:'/pages/mine/applysale?orderid='+this.orderinfo.order_id+'&good_id='+this.orderinfo.goods_id
			// 	})
			// },
			deleteimg(index){
				console.log(index);
				
				let a = this.imgpathArr2.splice(0,index);
				this.imgpathArr2 = a;
				
				let b = this.imgpathArr.splice(0,index);
				console.log(b);
				console.log(this.imgpathArr);
				this.imgpathArr = b;
			},
			putPinglun(){
				let data = {
					ordernum:this.orderinfo.ordernum,
					content:this.content,
					goods_id:this.goodid,
					grade:this.xing,
					image:this.imgpathArr2.join(','),
					token:uni.getStorageSync('token')
				};
				http('/api/User/commentOrder','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					if(res.data.status==200){
						this.$util.showToast(res.data.message);
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/mine/myorderlist?type=1'
							})
						},1500)
					}else{
						this.$util.showToast(res.data.msg);
						return
					}
					
				})
			},
			gettutoken(){
				let data = {
					token:uni.getStorageSync('token')
				};
				http('/api/Setting/getQinToken','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					console.log(res.data.data.token);
					this.uptoken = res.data.data.token;
				})
			},
			didPressChooseImage(){
				if(this.imgpathArr.length==3){
					this.$util.showToast('只能上传三张~');
					return false;
				}
				let that = this;
				console.log(that.uptoken);
				let imgpathArr = [];
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						that.$util.showLoading('请稍后');
						let key = new Date().getTime()+Math.random().toString(36).substr(2);
						const filePath = res.tempFilePaths[0];
						// this.avtorsrc = res.tempFilePaths[0];
						that.imgpathArr.push( res.tempFilePaths[0]);
						
						qiniuUploader.upload(filePath, (res) => {
							let path ='/'+res.key;
							this.imgpathArr2.push(path);
							console.log(that.imgpathArr)
							console.log(that.imgpathArr2)
							that.$util.hideLoading();
						}, (error) => {
						  console.log('error: ' + error);
						  that.$util.hideLoading();
						},{
						  key: key+'.jpg',
						  region: 'SCN',
						  domain: 'clothpic.sayyin.com', 
						  uptoken: that.uptoken
						}, (res) => {
						}, () => {
						  // 取消上传
						}, () => {
						  // `before` 上传前执行的操作
						}, (err) => {
						  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
						});
					}
				});
			},
			getorder(orderid){
				let data = {
					ordernum:this.ordernum,
					good_id:this.goodid,
					token:uni.getStorageSync('token'),
				};
				http('/api/user/getOrderInfo','post',data).then(res=>{
					console.log(res)
					// console.log(res.data.data.bannerList.data)
					this.orderinfo = res.data.data[0];
					console.log(this.orderinfo);
					console.log(res)
				})
			},
			clickStars(i){
			     
			      this.xing = i+1;
				  console.log(this.xing);
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref){
				this.$refs[ref].hide()
			},
			pointSelectTap(){
				this.pointSelect = !this.pointSelect
			},
			choose(type, indexs) {
				let that = this
				let cartList = that.chooseList.map((item, index) => {
					item.checked = false;
					
					if (indexs == index) {
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
			}
		}
	}
</script>
<style lang="less" scoped>
	.shopimg{
		float: left;
		margin-top: 30upx;
		position: relative;
		.deltimg{
			position: absolute;
			width: 36upx;
			height: 36upx;
			text-align: center;
			color: #fff;
			right: 0;
			top: -20upx;
			background-color: rgba(0,0,0,.4);
			border-radius: 50%;
		}
		.spimg{
			width:125upx;
			height: 130upx;
			float: left;
			margin-right: 14upx;
		}
	}
	.uploadbtn{
		float: left;
		border:1px dashed #AAAAAA;
		width: 125upx;
		height: 130upx;
		margin-top: 30upx;
		image{
			width: 38upx;
			height: 34upx;
			display: block;
			margin:0 auto;
			margin-top: 28upx;
		}
		.txt{
			font-size: 24upx;
			text-align: center;
			-webkit-transform: scale(0.7);
			transform: scale(0.7);
		}
	}
	.pingj-txtare{
		width:100%;
		height: 200upx;
		background-color: #F2F2F5;
		width: 300upx;
		padding:20upx;
		font-size:30upx
	}
	.pay-remarks{
		overflow: hidden;
	}
	.startbox{
		float: left;
		.startimg{
			width:36upx;
			height: 36upx;
			display: inline-block;
			margin:0 10upx
		}
	}
	
	.pay-shouh{
		width:180upx;
		margin-top: 30upx;
		height:66upx;
		line-height: 64upx;
		background:rgba(255,255,255,1);
		border:2px solid rgba(187,187,187,1);
		border-radius:33px;
		text-align: center;
		color: #BBBBBB;
		font-size: 28upx;
		float: right;
	}
	.order-tips{
		color: #FB4142;
		font-size: 30upx;
		text-align: center;
		margin-top: 60upx;
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
			.location-img{
				image{
					width: 40upx;
					height: 40upx;
				}
			}
			.location-main{
				margin-left: 30upx;
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
					width: 360upx;
					// margin-left: -100upx;
					position: relative;
					.intr-name{
						font-size: 30upx;
					}
					.intr-norm{
						color: #aaaaaa;
						margin-top: -4upx;
						
						.intr-norm1{
							font-size: 24upx;
						}
						.intr-norm2{
							font-size: 24upx;
						}
					}
				}
				.text-price{
					
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
				
				height: 66upx;
			
				position: relative;
				.pay-left-common{
					font-size: 24upx;
					text-align: right;
					width: 180upx;
					display: inline-block;
					vertical-align: top;
				}
				.pay-right-common{
					font-size: 24upx;
					color: #aaaaaa;
					display: inline-block;
					margin-left: 30upx;
				}
			}
			.pay-subtotal{
				margin-top: 30upx;
				text-align: right;
				.subtotal-num{
					font-size: 24upx;
					color: #aaaaaa;
				}
				.subtotal-price{
					color: #ec614a;
				}
			}
		}
	}
	
	.pay-ffooter{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-color: #FB4142;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		box-shadow:0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
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
				.ticket-select{
					position: relative;
					.select-img{
						width: 34upx;
						height: 34upx;
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
		z-index: 1000;
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
				width: 30upx;
				height: 30upx;
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
					width: 30upx;
					height: 30upx;
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
	.symbol{
		font-size: 24upx;
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
</style>