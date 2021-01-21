<template>
	<view class="content">
		<view class="title" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back.png" class="back" ></image>
				
			</view>
			<view class="title-txt">
				我的订单
			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="search-wrap" :style="[{top:CustomBar + 'px'}]">
			<view class="search-box">
				<image :src="imgUrl + 'lg-search.png'" class="search"></image>
				<input type="text" class="inputs" placeholder="请输入搜索关键词" v-model="search" confirm-type="search" @confirm="searchClick"/>
				<image src="/static/close.png" class="close" v-if="search" @click="clearSearch"></image>
			</view>
			<view class="color-pinkB" @click="searchClick">
				搜索
			</view>
		</view>
		<view style="height: 106upx;"></view>
		<view class="disBetween ordertab">
			<view class="tab-item " @click="loadOrder(1)" :class="{ active: orderType == 1 }"><text>全部</text></view>
			<view class="tab-item " @click="loadOrder(2)" :class="{ active: orderType == 2 }"><text>待付款</text></view>
			<view class="tab-item " @click="loadOrder(3)" :class="{ active: orderType == 3 }"><text>待发货</text></view>
			<view class="tab-item " @click="loadOrder(4)" :class="{ active: orderType == 4 }"><text>待收货</text></view>
			<view class="tab-item " @click="loadOrder(5)" :class="{ active: orderType == 5 }"><text>已完成</text></view>
			<view class="tab-item " @click="loadOrder(6)" :class="{ active: orderType == 6 }"><text>售后/退款</text></view>
		</view>
		<view style="height: 100upx;"></view>
		
		<view class="order-wrap" v-if="list.length > 0">
			<view class="order-item" v-for="(item,index) in list" :key="index">
				<view class="top-box disBetween" v-if="item.shouhou != 1">
					<view class="disAlignCenter">
						<view class=""  v-if="item.status == 1 ">
							待付款
						</view>
						<view class=""  v-if="item.status == 2 ">
							待发货
						</view>
						<view class=""  v-if="item.status == 3">
							已发货
						</view>
						<view class=""  v-if="item.status == 4 ">
							交易完成
						</view>
						<view class=""  v-if="item.status == 5 ">
							交易关闭
						</view>
						<view class="copy" @click="copy(item.ordernumber)" v-if="item.order_type == 2&&item.status != 5 || item.order_type == 3&&item.status != 5">
							复制单号
						</view>
					</view>
					
					
					<view class="" v-if="item.order_type == 1 && item.status != 1">
						{{item.addtime}}
					</view>
					<view class="" v-if="item.order_type == 2">
						定金订单
					</view>
					<view class="" v-if="item.order_type == 3">
						商品订单
					</view>
					<view class="" v-if="item.order_type == 4">
						样品订单
					</view>
					<view class="" v-if="item.order_type == 5">
						直播订单
					</view>
					<view class="" v-if="item.status == 1 && item.order_type == 1">
						剩 <text class="color-pinkB">{{item.end_time1  || '00:00:00'}}</text> 自动关闭
					</view>
				</view>
				<view class="top-box disBetween" v-if="item.shouhou == 1">
					<view class="disAlignCenter">
					<!--	after_status 售后状态1待审核 2为已审核 3为审核未通过 -->
					<!-- 	type  1仅退款 2退款退货 3退货换货 -->
					<!-- 	status  售后状态 1待审核 2审核未通过 3待退货入库 4待换货出库 5换货出库 6待收货 7成功 8待退款 9退款中 0已撤销 -->
						<view class=""  v-if="item.after.status == 1 ">
							待审核
						</view>
						<view class=""  v-if="item.after.status == 2">
							审核未通过
						</view>
						<view class=""  v-if="item.after.status == 3">
							待退货入库
						</view>
						<view class=""  v-if="item.after.status == 4">
							待换货出库
						</view>
						<view class=""  v-if="item.after.status == 5">
							换货出库
						</view>
						<view class=""  v-if="item.after.status == 6">
							待收货
						</view>
						<view class=""  v-if="item.after.status == 7">
							成功
						</view>
						<view class=""  v-if="item.after.status == 8">
							待退款
						</view>
						<view class=""  v-if="item.after.status == 9">
							退款中
						</view>
						<view class=""  v-if="item.after.status == 10">
							已终止
						</view>
						<view class=""  v-if="item.after.status == 0">
							已撤销
						</view>
					</view>
					
					<view class="">
						{{item.after.create_time}}
					</view>
				</view>
				<view class="mid-box disFlex" @click="toOrderDetail(item)">
					<image :src="item.goods.thumb_url" class="imgs"></image>
					<view class="mid-right">
						<view class="goods-num fontBold">
							*{{item.goods.goods_num}}
						</view>
						<view class="line2 fontBold mid-title">
							{{item.goods.goods_name}}
						</view>
						<view class="font24 color-gray line1">
							{{item.goods.goods_attr_str}}
						</view>
						<view class="disBetween">
							<view class=" order-price">
								<text class="font22 fontBold">￥</text>
								<text class="fontBold font30">{{item.goods.price || 0}}</text>
								<text class="fontBold" v-if="item.goods.unit">/</text>
								<text class="fontBold font24" v-if="item.goods.num > 1 && item.goods.unit">{{item.goods.num || ''}}</text>
								<text class="fontBold font24">{{item.goods.unit || ''}}</text>
							</view>
							<view v-if="item.shouhou != 1">
								<view class="fontBold color-red" v-if="item.state == 0&&item.status == 1&&item.order_type == 1 ||item.status == 1&&item.state == 0&&item.order_type == 2">
									待付款
								</view>
								<view class="fontBold color-red" v-if="item.state == 1&&item.order_type == 2&&item.status == 1">
									已付定金
								</view>
								<view class="fontBold color-red" v-if="item.status != 1&&item.status != 5 &&item.order_type == 1">
									已支付
								</view>
								<view class="fontBold color-red" v-if="item.status != 1&&item.order_type == 2&&item.status != 5">
									已付尾款
								</view>
								<!-- <view class="fontBold color-red" v-if="item.status == 5">
									交易关闭
								</view> -->
							</view>
							<view v-if="item.shouhou == 1">
								<view class="fontBold color-red">
									售后
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="price-box" v-if="item.order_type == 1 || item.order_type == 4|| item.order_type == 5">
					共{{item.goods_num}}件 合计:￥{{item.total_price}}
				</view>
				<view class="price-box-more font26" v-if="item.order_type == 2 || item.order_type == 3">
					<view class="price-box-item">
						共{{item.goods_num}}件   合计：￥{{item.total_price}} 
					</view>
					<view class="price-box-item disBetween" v-if="item.state == 0 &&item.order_type == 2&&item.status==1">
						<view class="">
							剩 <text class="color-pinkB">{{item.end_time1 || '00:00:00'}}</text> 自动关闭
						</view>
						<view class="">
							应付定金： <text class="color-pinkB">￥{{item.deposit}}</text>
						</view>
					</view>
					<view class="price-box-item disAlignCenter" v-if="item.state != 0">
						<view class="width50">
							应付定金：￥{{item.deposit}}
						</view>
						<view class="width50">
							实付定金： <text class="color-pinkB">￥{{item.atc_deposit}}</text>
						</view>
					</view>
					<view class="price-box-item disAlignCenter" v-if="item.state != 0">
						<view class="width50">
							应付尾款：￥{{item.balance}}
						</view>
						<view class="width50" v-if="item.balance_time">
							实付尾款： <text class="color-pinkB">￥{{item.atc_balance}}</text>
						</view>
					</view>
					<!-- <view class="price-box-item">
						应付尾款： <text class="color-pinkB">￥5555.00</text>
					</view>
					<view class="price-box-item">
						实付尾款： <text class="color-pinkB">￥5555.00</text>
					</view> -->
				</view>
				<view class="btn-box" v-if="item.shouhou != 1">
					<!-- <view class="btn disCenter font26 btn-red" v-if="item.status == 2" @click="toSaleMoney()">
						退款去向
					</view> -->
					
					<view class="btn disCenter font26 btn-gray" v-if="item.status == 1&&item.state == 0" @click="cancelOrder(item,1)">
						取消订单
					</view>
					<view class="btn disCenter font26 btn-red" v-if="item.status == 1&&item.state == 0&&item.order_type == 1" @click="toOrderDetail(item)">
						去支付
					</view>
					<view class="btn disCenter font26 btn-red" v-if="item.status == 1&&item.state == 0&&item.order_type == 2" @click="toOrderDetail(item)">
						支付定金
					</view>
					<view class="btn disCenter font26 btn-red" v-if="item.order_type == 1&&item.status != 1&&item.status != 5 && item.shouhou == 0 && item.shouhou_time == 1" @click="toApplySale(item)">
						申请售后
					</view>
					<view class="btn disCenter font26 btn-border" v-if="item.order_type != 2&&item.status == 3" @click="cancelOrder(item,3)">
						确认收货
					</view>
					
					<view class="btn disCenter font26 btn-border" v-if="item.status == 1&&item.check_status == 2&&item.order_type == 3" @click="toOrderDetail(item)">
						支付尾款
					</view>
					<view class="btn disCenter font26 btn-gray" v-if="item.status == 4||item.status == 5" @click="cancelOrder(item,6)">
						删除订单
					</view>
				</view>
				<view class="btn-box" v-if="item.shouhou == 1">
					<view class="btn disCenter font26 btn-border" @click="toSaleDetail(item)">
						查看详情
					</view>
				</view>
			</view>
		</view>
		<view class="no-order" v-else>
			<image :src="imgUrl + 'lg-no-order.png'" class="lg-no-order"></image>
			<view class="marginBottom20">
				暂无相关订单
			</view>
			<view class="">
				先给自己定个小目标，先下一单
			</view>
		</view>
		
		<image src="/static/back-top.png" class="back-top" mode="" v-if="backTopShow" @click="backTop"></image>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp()
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				search:'',
				orderType:1,// 1全部  2待付款  3待发货  4待收货  5评价  6售后
				page:1,
				list:[],//status订单状态 1待付款2待发货3待收货4已完成5已关闭  order_type订单类型1:入仓订单 2:定金订单 3商品订单4样品订单5直播订单
				timeData: '',    //存放每条数据的处理好的倒计时
				timer: '',    //用来清除定时器
				
				backTopShow:false,
				backTopHeight:0,
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.page = 1
			this.backTopHeight = uni.getSystemInfoSync().windowHeight * 3;
			this.orderType = option.type
			this.loadOrder(this.orderType)
		},
		onPageScroll(e) {
			if(e.scrollTop > this.backTopHeight){
				this.backTopShow = true
			}else{
				this.backTopShow = false
			}
		},
		onShow() {
			this.loadOrder(this.orderType)
		},
		onReachBottom() {
			this.getNeworderList(this.orderType)
		},
		onUnload(){   //卸载页面清除定时器
			clearInterval(this.timer)  
		},
		methods: {
			back(){
				uni.switchTab({
					url:'/pages/index/mine'
				})
			},
			backTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			clearSearch(){
				this.search = ''
				this.loadOrder(this.orderType)
			},
			searchClick(){
				if(this.search == ''){
					this.$util.showToast('请输入搜索关键字')
					return
				}
				this.loadOrder(this.orderType)
			},
			toSaleDetail(item){
				uni.navigateTo({
					url:'/pages/mine/saleDetail?id=' + item.after.id
				})
			},
			loadOrder(type) {
				if (type == 6) {
					uni.navigateTo({
						url:'/pages/mine/sale'
					})
				} else {
					this.orderType = type;
					this.page =1
					this.list = []
					this.getorderList(type);
				}
			},
			getorderList(type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					order_type:type,
					page:1,
					search:this.search
				}
				http('/api/users/user_order', 'post',data).then(res => {
					if(res.code == 200){
						let that = this
						that.list = res.data
						if(that.orderType == 1 || that.orderType == 2){
							var timer = setInterval(function () {
								that.getTimeList()
							}, 1000)
							that.timer = timer
						}
						console.log(that.list)
					}
				})
			},
			getNeworderList(type){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					order_type:type,
					page:this.page+1,
					search:this.search
				}
				http('/api/users/user_order', 'post',data).then(res => {
					newList = res.data
					this.list = this.list.concat(newList)
					this.page++
				})
			},
			toOrderDetail(item){
				if(item.shouhou == 1)return
				uni.navigateTo({
					url:'/pages/mine/orderDetail?id=' + item.id
				})
			},
			// toSaleMoney(){
			// 	uni.navigateTo({
			// 		url:'/pages/mine/saleMoney'
			// 	})
			// },
			toApplySale(item){
				let type = 1
				if(item.status == 3||item.status == 4){
					type = 2
				}
				uni.navigateTo({
					url:'/pages/mine/applySale?orderid=' + item.id + '&type=' + type
				})
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
						this.getorderList(this.orderType)
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
			getTimeList(){ 
				let that = this
				that.list.forEach((item) =>{
				  var nowdate = new Date().getTime()   //获取当前时间毫秒数
				  // var time = item.productExpiredTime.replace(new RegExp("-", "gm"), "/") //ios不能识别日期格式中的 "-" ； .productExpiredTime是接口返回的名称
				  // var timesp = time.split('.')[0]    //此处是因为我们接口返回的时间格式是这样："2019-12-31 11:00:00.0"
				  // var enddate = new Date(timesp).getTime()    //处理好格式之后获取结束时间的毫秒数
				  var enddate = item.time_out * 1000
				  var totaltime = enddate - nowdate      //获取时间差
				  that.totaltime(totaltime)   //这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
				  item.end_time1 = that.timeData  //处理好的单个时间安排到item上（重要）
				})
				that.list = that.list   //全部处理好的数据重新赋值
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
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.width50{
		width: 50%;
	}
	.title{
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #000;	
		padding-left: 24upx;
		border-bottom: 2upx solid #f4f4f4;
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
			font-weight: bold;
		}
	}
	.search-wrap{
		padding: 14upx 30upx 22upx;
		height: 106upx;
		background-color: #fff;
		position: fixed;
		left: 0;
		z-index: 100;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.search-box{
			display: flex;
			align-items: center;
			border-radius: 50upx;
			border: 1px solid #d4d4d4;
			width: 86%;
			padding: 0 28upx;
			height: 70upx;
			position: relative;
			.close{
				width: 34upx;
				height: 34upx;
				position: absolute;
				right: 30upx;
				top: 16upx;
			}
			.search{
				width: 33upx;
				height: 34upx;
				margin-right: 20upx;
			}
			.inputs{
				width: 80%;
			}
		}
	}
	.ordertab{
		height: 100upx;
		padding: 0 10upx;
		width: 100%;
		background-color: #f4f4f4;
		position: fixed;
		z-index: 100;
		left: 0;
		.tab-item {
			text-align: center;
			height: 100upx;
			line-height: 100upx;
			min-width: 84upx;
			text-align: center;
			text {
				// padding-bottom: 12upx;
				font-size: 26upx;
			}
			
			
		}
		.active {
			color: #EB798D;
			
			position: relative;
			
			text {
				border-color: #EB798D;
				font-size: 26upx;
			}
		}
		.active::after{
			content: '';
			width: 66upx;
			height: 6upx;
			background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
			border-radius: 6upx;
			position: absolute;
			bottom: 22upx;
			left: 10upx;
		}
	}
	.order-wrap{
		padding: 0 10upx;
	}
	.order-item{
		padding: 0 20upx;
		background-color: #fff;
		margin-bottom: 28upx;
		border-radius: 20upx;
		
		.top-box{
			padding: 30upx 0;
			border-bottom: 1px solid #F3F3F3;
			
			.copy{
				font-size: 24upx;
				color: #EC7A8E;
				padding: 10upx 20upx;
				border: 2upx solid #EC7A8E;
				border-radius: 30upx;
				margin-left: 34upx;
			}
		}
		.mid-box{
			padding: 24upx 0 30upx;
			border-bottom: 1px solid #F3F3F3;
			.imgs{
				width: 168upx;
				height: 168upx;
				border-radius: 10upx;
				flex: none;
			}
			.mid-right{
				width: 100%;
				padding: 4upx 0 2upx 20upx;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.mid-title{
					padding-right: 80upx;
				}
				.goods-num{
					position: absolute;
					right: 0;
					top: 4upx;
				}
				// .order-price{
				// 	display: flex;
				// 	align-items: flex-end;
					
				// }
			}
		}
		.price-box{
			padding: 24upx 0;
			text-align: right;
		}
		.price-box-more{
			padding-top: 24upx;
			.price-box-item{
				padding-bottom: 24upx;
			}
		}
		.btn-box{
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			.btn{
				margin-left: 20upx;
				min-width: 180upx;
				padding: 0 20upx;
				font-size: 26upx;
				height: 56upx;
				line-height: 56upx;
				border-radius: 60upx;
				margin-bottom: 32upx;
			}
			.btn-border{
				color: #EB798D;
				border: 1px solid #EB798D;
			}
			.btn-red{
				background-color: #EB798D;
				color: #fff;
			}
			.btn-gray{
				background-color: #DBDBDB;
				color: #fff;
			}
		}
	}
	.no-order {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #AEAEAE;
		font-size: 26upx;
		.lg-no-order{
			width: 206upx;
			height: 137upx;
			margin-bottom: 66upx;
		}
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
