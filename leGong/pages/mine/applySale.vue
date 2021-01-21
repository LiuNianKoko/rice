<template>
	<view class="content">
		<cu-custom bgColor="bgF4" :isBack="true"><block slot="backText"></block><block slot="content">申请退换</block></cu-custom>
		<view class="wrap">
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
								*{{info.goods.goods_num || ''}}
							</view>
						</view>
						<view class="font30 color-pink fontBold">
							￥{{info.goods.price || ''}}
						</view>
					</view>
				</view>
			</view>
			<view class="reason-wrap">
				<view class="reason-item disAlignCenter" @click="showType">
					<view class="reason-left">
						申请类型
					</view>
					<view class="reason-right line1">
						{{type || '请选择售后类型'}}
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
				<view class="reason-item disAlignCenter" @click="showReason">
					<view class="reason-left">
						退款原因
					</view>
					<view class="reason-right line1">
						{{reason || '点击选择退款原因'}}
					</view>
					<image src="/static/right-gray.png" class="right-gray"></image>
				</view>
				<view class="reason-item disAlignCenter">
					<view class="reason-left">
						退款金额
					</view>
					<view class="">
						￥{{info.atc_total_price || info.price }}
					</view>
				</view>
				<view class="reason-item disAlignCenter">
					<view class="reason-left">
						联系方式
					</view>
					<view class="">
						{{info.telephone || info.phone}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn" @click="toAdd">
				提交申请
			</view>
		</view>
		
		<QSPopup ref="QSPopType" type="fadeInUp" :hid="false">
			<view class="type-wrap">
				<view class="type-item disBetween" @click="changeType(1)" v-if="typeStatus == 1">
					<view class="">
						退款（无需退货）
						<text class="margingLeft20" style="color: #BCBCBC;">未发货，或与卖家协商同意</text>
					</view>
					<view class="disCenter">
						<image :src="imgUrl +'lg-sel.png'" class="sel" v-if="typeId != 1"></image>
						<image :src="imgUrl +'lg-seled.png'" class="sel" v-if="typeId == 1"></image>
					</view>
				</view>
				<view class="type-item disBetween" @click="changeType(2)" v-if="typeStatus != 1">
					<view class="">
						退货退款
						<text class="margingLeft20" style="color: #BCBCBC;">已收到货，需要退还收到的货物</text>
					</view>
					<view class="disCenter">
						<image :src="imgUrl +'lg-sel.png'" class="sel" v-if="typeId != 2"></image>
						<image :src="imgUrl +'lg-seled.png'" class="sel" v-if="typeId == 2"></image>
					</view>
				</view>
				<view class="type-item disBetween" @click="changeType(3)" v-if="typeStatus != 1">
					<view class="">
						换货
						<text class="margingLeft20" style="color: #BCBCBC;">已收到货，需要更换已收到的货物</text>
					</view>
					<view class="disCenter">
						<image :src="imgUrl +'lg-sel.png'" class="sel" v-if="typeId != 3"></image>
						<image :src="imgUrl +'lg-seled.png'" class="sel" v-if="typeId == 3"></image>
					</view>
				</view>
			</view>
		</QSPopup>
		
		<QSPopup ref="QSPopReason" type="fadeInUp" :hid="false">
			<view class="type-wrap">
				<view class="type-item disBetween" v-for="(item,index) in reasonList" :key="index" @click="changeReason(item)">
					<view class="">
						{{item.mess}}
					</view>
					<view class="disCenter">
						<image :src="imgUrl +'lg-sel.png'" class="sel" v-if="reasonId != item.id"></image>
						<image :src="imgUrl +'lg-seled.png'" class="sel" v-if="reasonId == item.id"></image>
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp()
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				type:'',
				typeId:0,	//1仅退款 2退款退货 3退货换货
				reason:'',
				reasonId:0,
				reasonList:[{mess:'不想要了',id:1},{mess:'质量问题',id:2},{mess:'七天无理由',id:3}],
				saleId:'',//售后id
				orderId:0,//订单id
				typeStatus:1,//1仅退款 2退款退货 3退货换货
				info:{},
				phone:''
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.orderId = option.orderid
			this.typeStatus = option.type
			if(option.saleid){
				this.saleId = option.saleid
				this.getSaleInfo()
				
			}else{
				this.getInfo()
			}
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			toAdd(){
				if(this.typeId == 0){
					this.$util.showToast('请选择售后类型')
					return
				}
				if(this.reasonId == 0){
					this.$util.showToast('请选择退款原因')
					return
				}
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.saleId,
					phone:this.phone,
					cate:this.typeId,
					mess:this.reasonId,
					order_id:this.orderId
				}
				http('/api/users/after_edit', 'post',data).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/mine/sale'
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none',
							duration:1200
						})
					}
				})
			},
			changeType(type){
				this.typeId = type
				this.hides('QSPopType')
				if(type == 1){
					this.type = '退款（无需退货）未发货，或与卖家协商同意'
				}else if(type == 2){
					this.type = '退货退款 已收到货，需要退还收到的货物'
				}else if(type == 3){
					this.type = '换货 已收到货，需要更换已收到的货物'
				}
				this.getReasonList(type)
			},
			showType(){
				this.show('QSPopType')
				this.hides('QSPopReason')
			},
			showReason(){
				this.hides('QSPopType')
				if(this.typeId == 0){
					this.$util.showToast('请先选择售后类型')
					return
				}
				
				this.show('QSPopReason')
			},
			changeReason(item){
				this.hides('QSPopReason')
				this.reason = item.mess
				this.reasonId = item.id
			},
			getReasonList(type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:type
				}
				http('/api/users/thmess', 'post',data).then(res => {
					if(res.code == 200){
						this.reasonList = res.data
						
					}
				})
			},
			getInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.orderId
				}
				http('/api/users/order_detail', 'post',data).then(res => {
					if(res.code == 200){
						this.info = res.data
						this.phone = this.info.telephone
					}
				})
			},
			getSaleInfo(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					id:this.saleId
				}
				http('/api/users/after_detail', 'post',data).then(res => {
					if(res.code == 200){
						this.info = res.data
						this.phone = this.info.phone
					}
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.wrap{
		padding: 26upx;
	}
	.goods-wrap{
		padding: 30upx 24upx;
		border-radius: 20upx;
		background-color: #fff;
		margin-bottom: 30upx;
		.mid-box{
			
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
	.reason-wrap{
		padding: 0 38upx;
		border-radius: 20upx;
		background-color: #fff;
		.reason-item{
			color: #4C4C4C;
			padding: 30upx 0;
			border-bottom: 1px solid #eee;
			.reason-left{
				width: 190upx;
				flex: none;
			}
			.reason-right{
				color: #A5A5A5;
				width: 90%;
				padding-right: 20upx;
			}
			.right-gray{
				width: 14upx;
				height: 24upx;
				flex: none;
			}
		}
		.reason-item:last-child{
			border: none;
		}
	}
	.blank{
		height: 170upx;
	}
	.btn-wrap{
		padding: 30upx 30upx 50upx;
		background-color: #f4f4f4;
		width: 100%;
		z-index: 100;
		position: fixed;
		bottom: 0;
		left: 0;
		.btn{
			height: 90upx;
			font-size: 24upx;
			font-weight: bold;
			color: #EB798D;
			border: 1px solid #EB798D;
			border-radius: 10upx;
			text-align: center;
			line-height: 90upx;
		}
	}
	
	.type-wrap{
		width: 750upx;
		max-height: 800upx;
		overflow-y: auto;
		padding: 35upx 30upx 50upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		.type-item{
			padding: 23upx 0;
			color: #4C4C4C;
			.sel{
				width: 30upx;
				height: 30upx;
			}
		}
	}
</style>
