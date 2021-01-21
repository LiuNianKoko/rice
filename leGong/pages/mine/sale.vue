<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" borderBottom="#EDEDED" :isBack="true"><block slot="backText"></block><block slot="content">售后/退款</block></cu-custom>
		
		<view class="disBetween ordertab" :style="[{top:CustomBar + 'px'}]">
			<view class="tab-item " @click="loadOrder(1)" :class="{ active: orderType == 1 }"><text>处理中</text></view>
			<view class="tab-item " @click="loadOrder(2)" :class="{ active: orderType == 2 }"><text>售后记录</text></view>
		</view>
		<view style="height: 104upx;"></view>
		
		<view class="order-wrap" v-if="list.length > 0">
			<view class="order-item" v-for="(item,index) in list" :key="index">
				<view class="top-box disBetween">
					<view class="disAlignCenter">
			<!--	after_status 售后状态1待审核 2为已审核 3为审核未通过 -->
			<!-- 	type  1仅退款 2退款退货 3退货换货 -->
			<!-- 	status  售后状态 1待审核 2审核未通过 3待退货入库 4待换货出库 5换货出库 6待收货 7成功 8待退款 9退款中 0已撤销 -->
						<view class=""  v-if="item.status == 1 ">
							待审核
						</view>
						<view class=""  v-if="item.status == 2">
							审核未通过
						</view>
						<view class=""  v-if="item.status == 3">
							待退货入库
						</view>
						<view class=""  v-if="item.status == 4">
							待换货出库
						</view>
						<view class=""  v-if="item.status == 5">
							换货出库
						</view>
						<view class=""  v-if="item.status == 6">
							待收货
						</view>
						<view class=""  v-if="item.status == 7">
							成功
						</view>
						<view class=""  v-if="item.status == 8">
							待退款
						</view>
						<view class=""  v-if="item.status == 9">
							退款中
						</view>
						<view class=""  v-if="item.status == 10">
							已终止
						</view>
						<view class=""  v-if="item.status == 0">
							已撤销
						</view>
					</view>
					
					<view class="">
						{{item.create_time}}
					</view>
					
				</view>
				<view class="mid-box disFlex">
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
								<text class="fontBold font30">{{item.goods.price}}</text>
								<text class="fontBold" v-if="item.goods.unit">/</text>
								<text class="fontBold font24" v-if="item.goods.num > 1 && item.goods.unit">{{item.goods.num || ''}}</text>
								<text class="fontBold font24">{{item.goods.unit || ''}}</text>
							</view>
							
						</view>
					</view>
				</view>
				<view class="price-box" v-if="item.type == 3">
					订单金额:￥{{item.price}}
				</view>
				<view class="price-box" v-else>
					退款金额:￥{{item.price}}
				</view>
				
				<view class="btn-box">
					
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				imgUrl:app.globalData.imgUrl,
				orderType:1,
				page:1,
				list:[],
				backTopShow:false,
				backTopHeight:0,
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.backTopHeight = uni.getSystemInfoSync().windowHeight * 3;
		},
		onPageScroll(e) {
			if(e.scrollTop > this.backTopHeight){
				this.backTopShow = true
			}else{
				this.backTopShow = false
			}
		},
		onShow() {
			this.getList(this.orderType)
		},
		onReachBottom() {
			this.getNewList(this.orderType)
		},
		methods: {
			loadOrder(type) {
				this.orderType = type;
				this.page =1
				this.list = []
				this.getList(type);
			},
			backTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			toSaleDetail(item){
				uni.navigateTo({
					url:'/pages/mine/saleDetail?id=' + item.id
				})
			},
			getList(type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:type,
					page:1
				}
				http('/api/users/after_list', 'post',data).then(res => {
					if(res.code == 200){
						this.list = res.data
					}
				})
			},
			getNewList(type){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:type,
					page:this.page+1
				}
				http('/api/users/after_list', 'post',data).then(res => {
					newList = res.data
					this.list = this.list.concat(newList)
					this.page++
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.ordertab{
		height: 90upx;
		padding: 0 130upx;
		width: 100%;
		background-color: #fff;
		position: fixed;
		z-index: 100;
		left: 0;
		.tab-item {
			text-align: center;
			height: 90upx;
			line-height: 105upx;
			min-width: 130upx;
			text-align: center;
			color: #686868;
			text {
				// padding-bottom: 12upx;
				font-size: 30upx;
				
			}
			
		}
		.active {
			color: #EB798D;
			
			position: relative;
			
			text {
				border-color: #EB798D;
				font-size: 30upx;
			}
		}
		.active::after{
			content: '';
			width: 110upx;
			height: 6upx;
			background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
			border-radius: 10upx;
			position: absolute;
			bottom: 0upx;
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
			padding-top: 24upx;
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
			padding-top: 24upx;
			.btn{
				margin-left: 20upx;
				min-width: 180upx;
				padding: 0 20upx;
				font-size: 26upx;
				height: 56upx;
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
