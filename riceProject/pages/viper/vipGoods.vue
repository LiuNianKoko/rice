<template>
	<view>
		<!-- <view class="header">
			<view class="header-title" v-for="(item,index) in priGoods" :key="index" @tap="changePri(index)">
				{{item}}
				<view class="vip-line" v-if="current==index"></view>
			</view>
		</view> -->
		<!-- 特权商品 -->
		<view class="pri-goods" v-if="current==0">
			<view class="pri-quota">
				<view class="quota-total" v-if="userInfo.total_catty">
					总额度：{{userInfo.total_catty}}斤
				</view>
				<view class="quota-total" v-else>
					总额度：0斤
				</view>
				<view class="quota-last" v-if="userInfo.surplus_catty">
					剩余额度：{{userInfo.surplus_catty}}斤
				</view>
				<view class="quota-total" v-else>
					剩余额度：0斤
				</view>
			</view>
			<view class="recomon">
				<view class="recomon-main disFlex">
					<view class="recomon-item marginBottom20" @tap="toDetail(item.id,item.catty)" v-for="item in tequan" :key="item.id">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text">
							<view class="recomon-title line1">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr line1">
								{{item.desc}}
							</view>
							<view class="recomon-price-wrap disFlex">
								<view class="recomon-price">
									<text class="symbol">￥</text>{{item.member_price}}
								</view>
								<!-- <view class="pri-num">
									剩余可购{{item.catty}}斤
								</view> -->
								<image class="gouwuche" src="/static/gouwuche2.png"></image>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 礼包商品 -->
		<view class="gift-goods" v-if="current==1">
			<view class="recomon">
				<view class="recomon-main disFlex">
					<view class="recomon-item marginBottom20" @tap="toGiftDetail(item.id,item.catty)" v-for="item in tequan" :key="item.id">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text">
							<view class="recomon-title line1">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr line1">
								{{item.desc}}
							</view>
							<view class="recomon-price-wrap disFlex">
								<view class="recomon-price">
									<text class="symbol">￥</text>0
								</view>
								<!-- <view class="pri-num">
									剩余可购{{item.catty}}斤
								</view> -->
								<image class="gouwuche" src="/static/gouwuche2.png"></image>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				priGoods:['特权商品','礼包商品'],
				current:0,
				list:{},
				tequan:[],
				type:1,
				userInfo:{},
				page:1
			}
		},
		onLoad() {
			this.getList()
			this.getUserInfo()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			changePri(index){
				this.current = index
				this.getList()
			},
			toDetail(id,catty){
				// if(catty > 0){
				// 	uni.navigateTo({
				// 		url:'/pages/index/detail?goodsid='+ id + '&tequan=tequan'
				// 	})
				// }else{
				// 	this.$util.showToast('该商品库存不足')
				// 	return
				// }
				uni.navigateTo({
					url:'/pages/index/detail?goodsid='+ id + '&tequan=tequan'
				})
			},
			toGiftDetail(id,catty){
				uni.navigateTo({
					url:'/pages/index/giftDetail?goodsid='+ id +'&gift=gift'
				})
			},
			getUserInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo','post',data).then(res=>{
					if(res.data.status == '200'){
						this.userInfo = res.data.data
					}
					console.log(res)
				})
			},
			getList(){
				let that = this
				if(that.current == 0){
					that.type = 1
				}else if(that.current == 1){
					that.type = 2
				}
				let data = {
					token:uni.getStorageSync('token'),
					type:that.type,
					page:1,
					pagesize:10
				}
				http('/api/user/getMemberGoods','post',data).then(res=>{
					if(res.data.status == '200'){
						that.list = res.data.data
						that.tequan = res.data.data.goodsLists
					}
					console.log(res)
				})
			},
			getNewList(){
				if(this.current == 0){
					this.type = 1
				}else if(this.current == 1){
					this.type = 2
				}
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1,
					type:this.type
				}
				http('/api/user/getMemberGoods','post',data).then(res=>{
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					// if(this.tequan.length == res.data.data.goodsLists.length){
					// 	// this.$util.showToast('没有更多了')	
					// 	return false
					// }
					this.page++
					this.tequan = this.tequan.concat(res.data.data.goodsLists)
				})
			}
		}
	}
</script>

<style lang="less">
	.header{
		height: 86upx;
		border-top: 2upx solid #f2f2f5;
		line-height: 80upx;
		padding: 0 190upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.header-title{
			font-size: 32upx;
			.vip-line{
				width:124upx;
				height:6upx;
				background:rgba(251,65,66,1);
				border-radius:3upx;
			}
		}
	}
	// 特权商品
	.pri-goods{
		.pri-quota{
			height: 50upx;
			margin-top: 40upx;
			line-height: 50upx;
			padding: 0 50upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
		}
	}
	
	
	.recomon{
		width: 100%;
		padding: 0 34upx;
		box-sizing: border-box;
		.recomon-main{
			margin-top: 30upx;
			justify-content: space-between;
			flex-wrap: wrap;
			.recomon-item{
				width:335upx;
				// height:500upx;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:10upx;
				image{
					width: 335upx;
					height: 335upx;
				}
				.recomon-text{
					padding: 25upx 20upx;
					.recomon-title{
						width:279upx;
						font-size:32upx;
						line-height: 40upx;
						// font-weight:bold;
						color:#333;
						margin-bottom: 4upx;
					}
					.recomon-intr{
						width:259upx;
						// line-height: 24upx;
						// height: 24upx;
						line-height: 30upx;
						font-size: 24upx;
						color:#939393;
						margin-bottom: 30upx;
					}
					.recomon-price-wrap{
						// justify-content: space-between;
						// height: 30upx;
						width: 100%;
						position: relative;
						.recomon-price{
							font-weight:bold;
							color:#ec614a;
							font-size: 36upx;
						}
						.pri-num{
							font-size: 24upx;
						}
						.symbol{
							font-size: 24upx;
						}
						.gouwuche{
							border-radius: 50%;
							width: 58upx;
							height: 56upx;
							position: absolute;
							top: -10upx;
							right: -6upx;
							// margin-right: 8upx;
						}
					}
				}
			}
		}
	}
</style>
