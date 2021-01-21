<template>
	<view class="content">
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back-white.png" class="back" ></image>
			</view>
			<view class="title-txt">
				订单详情
			</view>
		</view>
		<image :src="imgUrl + 'lg-order-bg.png'" class="order-bg"></image>
		<view class="head-wrap" :style="[{paddingTop:(CustomBar + 40) + 'px'}]" v-if="info.shouhou != 1">
			<view class="text-white" v-if="type == 1">
				<view class="fontBold font40 order-status" v-if="info.state == 0&&info.order_type == 1">
					待付款
				</view>
				<view class="fontBold font40 order-status" v-if="info.state == 0&&info.order_type == 2">
					待付款定金
				</view>
				<view class="fontBold font40 order-status" v-if="info.state == 1&&info.order_type == 2&&info.check_status == 1">
					待审核
				</view>
				<view class="fontBold font40 order-status" v-if="info.check_status == 2">
					待付款尾款
				</view>
				
				<view class="font26" v-if="info.state == 0 && closePay">
					剩余 {{info.end_time1 || '00:00:00'}} 自动关闭
				</view>
				<view class="font26" v-if="!closePay">
					已关闭
				</view>
				<view class="font26" v-if="info.check_status == 2">
					预约购买,已付定金
				</view>
			</view>
			<view class="text-white" v-if="type == 2">
				
				<view class="fontBold font40 order-status">
					待发货
				</view>
				<view class="font26">
					等待商家发货
				</view>
				<!-- <view class="font26">
					尾款支付完成,待商家发货
				</view> -->
			</view>
			<view class="text-white" v-if="type == 3">
				
				<view class="fontBold font40 order-status">
					待收货
				</view>
				<view class="font26">
					商家已发货
				</view>
			</view>
			<view class="text-white" v-if="type == 4">
				
				<view class="fontBold font40 order-status">
					交易完成
				</view>
				<view class="font26">
					您的交易已完成
				</view>
			</view>
			<view class="text-white" v-if="type == 5">
				
				<view class="fontBold font40 order-status">
					交易关闭
				</view>
			</view>
			<view class="order-icon disCenter" v-if="type == 1">
				<image :src="imgUrl + 'lg-order-dfk.png'" class="order-dfk"></image>
			</view>
			<view class="order-icon disCenter" v-if="type == 2">
				<image :src="imgUrl + 'lg-order-dfh.png'" class="order-dfh"></image>
			</view>
			<view class="order-icon disCenter" v-if="type == 3">
				<image :src="imgUrl + 'lg-order-dsh.png'" class="order-dsh"></image>
			</view>
			<view class="order-icon disCenter" v-if="type == 4 ||type == 5">
				<image :src="imgUrl + 'lg-order-ywc.png'" class="order-ywc"></image>
			</view>
		</view>
		<view class="head-wrap" :style="[{paddingTop:(CustomBar + 40) + 'px'}]" v-else>
			<view class="text-white">
				
				<view class="fontBold font40 order-status">
					售后订单
				</view>
			</view>
			<view class="order-icon disCenter">
				<image :src="imgUrl + 'lg-order-ywc.png'" class="order-ywc"></image>
			</view>
		</view>
		<view class="main-wrap">
			<view class="local-wrap">
				<image :src="imgUrl + 'lg-order-edit.png'" class="lg-order-edit" v-if="type == 1||type == 2" @click="toAddr"></image>
				<view class="disFlex font30 marginBottom20">
					<view class="fontBold">
						{{info.contacts || ''}}
					</view>
					<view class="phone-num">
						{{info.telephone || ''}}
					</view>
				</view>
				<view class="fontBold">
					{{info.address || ''}}
				</view>
			</view>
			
			<view class="goods-wrap">
				<view class="mid-box disFlex">
					<image :src="info.goods.thumb_url" class="goods-img"></image>
					<view class="mid-right">
						<view class="font26 fontBold line2">
							{{info.goods.goods_name || ''}}
						</view>
						<view class="goods-intr disBetween">
							<view class="font22 line1 goods-intr-txt">
								{{info.goods.goods_attr_str || ''}}
							</view>
							<view class="font30">
								*{{info.goods.goods_num || '0'}}
							</view>
						</view>
						<view class="font30 color-pink fontBold">
							￥{{info.goods.price || '0'}}
							<text class=" color-black" v-if="info.goods.unit">/</text>
							<text class="color-black font24" v-if="info.goods.num > 1 && info.goods.unit">{{info.goods.num || ''}}</text>
							<text class="color-black font24">{{info.goods.unit || ''}}</text>
						</view>
					</view>
				</view>
				<view class="price-item disBetween">
					<view class="price-left">
						商品总额
					</view>
					<view class="price-right">
						￥{{info.goods_price || '0'}}
					</view>
				</view>
				<view class="price-item disBetween">
					<view class="price-left">
						商品优惠
					</view>
					<view class="price-right">
						￥{{info.coupon_price || '0.00'}}
					</view>
				</view>
				<view class="price-item disBetween" v-if="info.order_type == 2|| info.order_type == 3">
					<view class="price-left">
						应付定金
					</view>
					<view class="price-right">
						￥{{info.deposit || '0.00'}}
					</view>
				</view>
				<view class="price-item disBetween" v-if="info.order_type == 2|| info.order_type == 3">
					<view class="price-left">
						应付尾款
					</view>
					<view class="price-right">
						￥{{info.balance || '0.00'}}
					</view>
				</view>
				<view class="price-item disBetween">
					<!-- <view class="price-left">
						运费（总重：0.12kg）
					</view> -->
					<view class="price-left">
						运费
					</view>
					<view class="price-right">
						￥{{info.freight || '0.00'}}
					</view>
				</view>
				<view class="price-item disBetween" v-if="info.order_type == 2&&type != 1|| info.order_type == 3&&type != 1">
					<view class="price-left">
						实付定金
					</view>
					<view class="price-right">
						￥{{info.atc_deposit || '0.00'}}
					</view>
				</view>
				<view class="price-item disBetween" v-if="info.order_type == 2&&type != 1|| info.order_type == 3&&type != 1">
					<view class="price-left">
						实付尾款
					</view>
					<view class="price-right">
						￥{{info.atc_balance || '0.00'}}
					</view>
				</view>
				<view class="price-item-all disBetween" v-if="info.order_type == 2 || info.order_type == 3">
					<view class="price-left fontBold">
						实付总额
					</view>
					<view class="price-right color-pink">
						￥{{info.atc_total_price || '0.00'}}
					</view>
				</view>
				<view  v-else>
					<view class="price-item-all disBetween" v-if="type == 1">
						<view class="price-left fontBold">
							待付金额
						</view>
						<view class="price-right color-pink">
							￥{{info.total_price || '0.00'}}
						</view>
					</view>
					<view class="price-item-all disBetween" v-else>
						<view class="price-left fontBold">
							实付金额
						</view>
						<view class="price-right color-pink">
							￥{{info.atc_total_price || '0.00'}}
						</view>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="order-msg"> 
				
				<view class="order-item disFlex">
					<view class="order-item-title">
						订单编号
					</view>
					<view class="">
						{{info.ordernumber || ''}}
					</view>
					<view class="copy" @click="copy(info.ordernumber)">
						复制
					</view>
				</view>
				<view class="order-item disFlex">
					<view class="order-item-title">
						下单时间
					</view>
					<view class="">
						{{info.addtime || ''}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="type != 1&&type != 5&&info.order_type != 4">
					<view class="order-item-title">
						支付方式
					</view>
					<view class="">
						微信支付
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.pay_time &&info.order_type != 1&&info.order_type != 4">
					<view class="order-item-title">
						定金支付时间
					</view>
					<view class="">
						{{info.pay_time || ''}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.balance_time &&info.order_type != 1&&info.order_type != 4">
					<view class="order-item-title">
						尾款支付时间
					</view>
					<view class="">
						{{info.balance_time || ''}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.pay_time&&info.order_type != 4">
					<view class="order-item-title">
						支付时间
					</view>
					<view class="">
						{{info.pay_time}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.fh_time">
					<view class="order-item-title">
						发货时间
					</view>
					<view class="">
						{{info.fh_time}}
					</view>
				</view>
				<view class="order-item disFlex" v-if="info.coll_time">
					<view class="order-item-title">
						收货时间
					</view>
					<view class="">
						{{info.coll_time}}
					</view>
				</view>
			</view>
			<view class="order-msg" v-if="info.fh_time"> 
				<view class="order-item disFlex">
					<view class="order-item-title">
						物流公司
					</view>
					<view class="">
						{{info.logistics_name}}
					</view>
				</view>
				<view class="order-item disFlex">
					<view class="order-item-title">
						快递单号
					</view>
					<view class="">
						{{info.logistics_num || ''}}
					</view>
					<view class="copy" @click="copy(info.logistics_num)">
						复制
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="blank"></view>
			<view class="btn-box">
				<view class="btn disCenter font26 btn-border" @click="show('QSCustomer')">
					联系客服
				</view>
				<view class="disFlex" v-if="info.shouhou != 1">
					<view class="btn disCenter font26 btn-gray" v-if="type == 1&&info.state == 0" @click="cancelOrder(info,1)">
						取消订单
					</view>
					<view class="btn disCenter font26 btn-red" v-if="type == 1&&info.order_type==1&&info.state == 0" @click="pay">
						去支付
					</view>
					<view class="btn disCenter font26 btn-red" v-if="type == 1&&info.order_type==2&&info.state == 0" @click="pay">
						支付定金
					</view>
					<view class="btn disCenter font26 btn-red" v-if="type == 1&&info.check_status == 2&&info.order_type==3" @click="pay">
						支付尾款
					</view>
					<view class="btn disCenter font26 btn-red" v-if="info.order_type==1&&type != 1&&type != 5 && info.shouhou == 0 &&info.shouhou_time == 1" @click="toApplySale(info)">
						申请售后
					</view>
					
					<view class="btn disCenter font26 btn-border" v-if="info.order_type!=2&&type == 3" @click="cancelOrder(info,3)">
						确认收货
					</view>
					<view class="btn disCenter font26 btn-gray" v-if="type == 4||type == 5" @click="cancelOrder(info,6)">
						删除订单
					</view>
				</view>
				
			</view>
		</view>
		<QSPopup ref="QSCustomer">
			<view class="cus-wrap">
				<view class="cus-item disBetween" v-for="(item,index) in customerList" :key="index" @click="phoneCall(item.phone)" >
					<view class="font30 fontBold" @longpress.stop="copy(item.phone)">
						{{item.name}}
					</view>
					<view class="" @longpress.stop="copy(item.phone)">
						{{item.phone}}
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	const app = getApp()
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				type:1,// 1待付款  2待发货  3待收货  4已完成  5已关闭
				id:0,
				info:{},
				closePay:true,
				addr:{},
				customerList:[],//客服列表
				hr:0,
				min:0,
				sec:0,
				endTime:0,     //结束时间戳
				timeData: '',    //存放每条数据的处理好的倒计时
				timer: '',    //用来清除定时器
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		onShow() {
			let addr = this.$store.state.address
			if(addr.id){
				this.addr = addr
				this.changeAddr()
			}
		},
		onUnload(){   //卸载页面清除定时器
			clearInterval(this.timer)  
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			// 复制
			copy(num){
				let that = this
				uni.setClipboardData({
				    data: num,
				    success: function () {
				        console.log('success');
						that.$util.showToast('复制成功')
				    }
				});
			},
			changeAddr(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					order_id:this.id,
					address_id:this.addr.id
				}
				http('/api/users/change_address', 'post',data).then(res => {
					if(res.code == 200){
						this.getInfo()
					}
				})
			},
			getInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.id
				}
				http('/api/users/order_detail', 'post',data).then(res => {
					if(res.code == 200){
						let that = this
						that.info = res.data
						that.type = that.info.status
						that.customerList = that.info.sys_phone
						
						var timer = setInterval(function () {
							that.getTimeList()
						}, 1000)
						that.timer = timer
						console.log(that.info)
					}
				})
			},
			getTimeList(){
				let that = this
				// that.list.forEach((item) =>{
				  var nowdate = new Date().getTime()   //获取当前时间毫秒数
				  // var time = item.productExpiredTime.replace(new RegExp("-", "gm"), "/") //ios不能识别日期格式中的 "-" ； .productExpiredTime是接口返回的名称
				  // var timesp = time.split('.')[0]    //此处是因为我们接口返回的时间格式是这样："2019-12-31 11:00:00.0"
				  // var enddate = new Date(timesp).getTime()    //处理好格式之后获取结束时间的毫秒数
				  var enddate = that.info.time_out * 1000
				  var totaltime = enddate - nowdate      //获取时间差
				  that.totaltime(totaltime)   //这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
				  that.info.end_time1 = that.timeData  //处理好的单个时间安排到item上（重要）
				// })
				that.info = that.info   //全部处理好的数据重新赋值
			},
			totaltime(a){   //计算单个剩余时间
			  let totaltime = a
				let that = this
				  var h, m, s, d
				  function test(num) {
					  if (num < 10) {
						  num = "0" + num    
					  }
					  return num
				  }
				  
				if (totaltime > 0) {
					d = Math.floor(totaltime / 1000 / 60 / 60 / 24) * 24
					h = Math.floor(totaltime / 1000 / 60 / 60 % 24)
					m = Math.floor(totaltime / 1000 / 60 % 60)
					s = Math.floor(totaltime / 1000 % 60)
					//获取时分秒
					h = d + h
					h = test(h)
					m = test(m)
					s = test(s)
					
					this.timeData =`${h} : ${m} : ${s}`   // 每个时间的显示格式
				   
				} else {
					
					this.timeData = `00 : 00 : 00`  
				   
				}
			},
			toAddr(){
				uni.navigateTo({
					url:'/pages/mine/address?type=2'
				})
			},
			toApplySale(item){
				let type = 1
				if(item.status == 3||item.status == 4){
					type = 2
				}
				uni.navigateTo({
					url:'/pages/mine/applySale?orderid=' + item.id + '&type=' + type
				})
			},
			pay(){
				this.$util.showLoading()
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					ordernum:this.info.ordernumber,
					pay_address:2
				}
				http('/api/order/pay_order', 'post',data).then(res => {
					if(res.code == 200){
						
						this.jumpPaysmall(res.data)
					}else{
						this.$util.hideLoading()
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
				
			},
			jumpPaysmall(resdata){   // 微信 小程序支付
				console.log(resdata)
			
				let that = this
				wx.requestPayment({
					'timeStamp': resdata.time,
					'nonceStr': resdata.nonce_str,
					'package': resdata.package,
					'signType': 'MD5',
					'paySign': resdata.sign,
					success:function(res){
						that.$util.hideLoading()
						
						setTimeout(()=>{
							that.getInfo()
						},1200)
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
			cancelOrder(item,type){
				let title,content
				//type1为取消订单 3为确认收货 4为评价订单 6为删除订单
				if(type == 1){
					title = '取消订单'
					content = '您确定要取消订单吗,取消后无法恢复'
				}else if(type == 3){
					title = '确认收货'
					content = '是否确认收货?'
				}else{
					title = '删除订单'
					content = '确定要删除该订单?'
				}
				let that = this
				uni.showModal({
				    title:title,
				    content: content,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							that.cancelOrderDone(item,type)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							
				        }
				    }
				});
			},
			cancelOrderDone(item,type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:type,
					order_id:item.id
				}
				http('/api/users/operation_order', 'post',data).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
						this.getInfo()
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #000;	
		padding-left: 24upx;
		/* #ifdef MP-WEIXIN */
		padding-right: 220upx;
		/* #endif */
		.back-wrap{
			width: 40upx;
			height: 40upx;
			.back{
				width: 18upx;
				height: 32upx;
			}
		}
		.title-txt{
			font-size: 32upx;
			width: 60%;
			text-align: center;
			color: #fff;
			font-weight: bold;
		}
	}
	.order-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 515upx;
	}
	.head-wrap{
		padding-left: 72upx;
		padding-right: 80upx;
		padding-bottom: 76upx;
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 50;
	}
	.order-status{
		margin-bottom: 25upx;
	}
	.order-icon{
		
		.order-dfk{
			width: 176upx;
			height: 104upx;
		}
		.order-dfh{
			width: 146upx;
			height: 148upx;
		}
		.order-dsh{
			width: 161upx;
			height: 113upx;
		}
		.order-ywc{
			width: 146upx;
			height: 148upx;
		}
	}
	.main-wrap{
		padding: 0 26upx 40upx;
		position: relative;
		z-index: 50;
		
	}
	.local-wrap{
		position: relative;
		padding: 38upx 30upx;
		border-radius: 20upx;
		background-color: #fff;
		color: #434343;
		margin-bottom: 30upx;
		.lg-order-edit{
			width: 36upx;
			height: 37upx;
			position: absolute;
			right: 30upx;
			top: 38upx;
		}
		.phone-num{
			color: #A1A1A1;
			margin-left: 65upx;
			
		}
	}
	.goods-wrap{
		padding: 0 24upx 15upx;
		border-radius: 20upx;
		background-color: #fff;
		margin-bottom: 30upx;
		.mid-box{
			padding: 28upx 0 60upx;
			.goods-img{
				width: 188upx;
				height: 188upx;
				flex: none;
				border-radius: 10upx;
			}
			.mid-right{
				color: #161616;
				width: 100%;
				padding: 2upx 0 2upx 24upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.goods-intr{
					color: #9E9E9E;
					.goods-intr-txt{
						padding-right: 40upx;
					}
				}
			}
		}
	}
	.price-item{
		color: #A5A5A5;
		margin-bottom: 25upx;
	}
	.price-item-all{
		color: #3C3C3C;
		margin-bottom: 25upx;
	}
	
	.order-msg{
		padding:10upx 30upx 40upx;
		background-color: #fff;
		margin-bottom: 30upx;
		.order-item{
			margin-top: 24upx;
			position: relative;
			color: #424242;
			.order-item-title{
				width: 210upx;
				
			}
			.copy{
				color: #EC7A8E;
				position: absolute;
				z-index: 10;
				right: 0;
				top: -2upx;
				z-index: 10;
				background-color: #fff;
			}
		}
	}
	
	.blank{
		height: 150upx;
	}
	.btn-box{
		width: 100%;
		height: 116upx;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding-right: 30upx;
		padding-top: 30upx;
		.btn{
			margin-left: 20upx;
			min-width: 180upx;
			padding: 0 20upx;
			height: 66upx;
			line-height: 66upx;
			border-radius: 60upx;
			margin-bottom: 30upx;
		}
		.btn-border{
			color: #EC7A8E;
			border: 1px solid #EC7A8E;
		}
		.btn-red{
			background-color: #EC7A8E;
			color: #fff;
		}
		.btn-gray{
			background-color: #e5e5e5;
			color: #fff;
		}
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
</style>
