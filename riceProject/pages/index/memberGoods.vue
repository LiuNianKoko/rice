<template>
	<view class="search-wraps">
	
		<view class="cut-sort">
			<view class="cut-sort-title" :class="[cut==1?'cut-active':'']" @click="changeCut(1)">
				综合排序
			</view>
			<view class="cut-sort-title" :class="[cut==2?'cut-active':'']" @click="changeCut(2)">
				销量优先
			</view>
			<view class="cut-sort-title" :class="[cut==3?'cut-active':'']" @click="changeCut(3)">
				新品
			</view>
			<view class="cut-sort-title sort-price" :class="[cut==4?'cut-active':'']" @click="changeCut(4)">
				价格
				<view class="sort-position">
					<image src="/static/up1.png" v-if="upStatus"></image>
					<image src="/static/up2.png" v-else></image>
					<image src="/static/down1.png" v-if="!upStatus"></image>
					<image src="/static/down2.png" v-else></image>
				</view>
			</view>
		</view>
		<view class="recomon" v-if="searchList.length>0">
			<view class="recomon-main disFlex">
				<view class="recomon-item marginBottom20" v-for="item in searchList" :key="item.id" @click="toDetail(item.id)">
					<image :src="item.cover" alt=""></image>
					<view class="recomon-text">
						<view class="recomon-title line1">
							{{item.goods_name}}
						</view>
						<view class=" recomon-intr line1">
							{{item.desc}}
						</view>
						<view class="recomon-price disFlex">
							<text class="recomon-price-s">
								
								<text class="symbol">￥</text>
								{{item.price}}
								
							</text>
							<!-- <text class="recomon-num">已售{{item.alsalenum}}</text> -->
						</view>
						<view class="recomon-lowprice disFlex">
							
							<view class="recomon-price-x disFlex">
								<text class="symbol">￥</text>
								<text class="recomon-prices">{{item.member_price}}</text>
								<image class="recomon-price-img" :src='imag+"member-man.png"' ></image>
							</view>
							<image class="gouwuche" src="/static/gouwuche2.png"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="nodata" v-else>暂无数据~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	export default {
		data() {
			return {
				imag: app.globalData.imag,
				cut:1,
				upStatus:true,
				searchList:[],
				page:1
			}
		},
		onLoad() {
			this.changeCut(1)
		},
		onReachBottom() {
			
			this.getNewList()
		},
		methods:{
			
			changeCut(cut){
				this.cut = cut
				if(cut == 1){
					this.page=1
					let data = {
						token:uni.getStorageSync('token'),
						
					}
					this.getSearchList(data)
					
				}
				if(cut == 2){
					this.page=1
					let data = {
						token:uni.getStorageSync('token'),
						alsalenum:1
					}
					this.getSearchList(data)
					
				}
				if(cut == 3){
					this.page=1
					let data = {
						token:uni.getStorageSync('token'),
						is_new:1,
						
					}
					this.getSearchList(data)
					
				}
				if(cut == 4){
					this.page=1
					this.upStatus = !this.upStatus
					if(this.upStatus == true){
						
						let data = {
							token:uni.getStorageSync('token'),
							priceSort:1,
						
						}
						this.getSearchList(data)
						
					}else{
						let data = {
							token:uni.getStorageSync('token'),
							priceSort:2,
							
						}
						this.getSearchList(data)
						
					}
				}
			},
			getSearchList(data){
				http('/api/Goods/getMemberGoodsList','post',data).then((res)=>{
					if(res.data.status=='200'){
						this.searchList = res.data.data.goodsList.data
					}else if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					console.log(res)
				})
			},
			getNewList(){
				if(this.cut==1){
					
					let data = {
						token:uni.getStorageSync('token'),
						page:this.page+1
					}
					this.getNewListApi(data)
				}
				if(this.cut == 2){
					let data = {
						token:uni.getStorageSync('token'),
						page:this.page+1
					}
					this.getNewListApi(data)
					
				}
				if(this.cut == 3){
					let data = {
						token:uni.getStorageSync('token'),
						is_new:1,
						page:this.page+1
					}
					this.getNewListApi(data)
					
				}
				if(this.cut == 4){
					// this.upStatus = !this.upStatus
					if(this.upStatus == true){
						
						let data = {
							token:uni.getStorageSync('token'),
							priceSort:1,
							page:this.page+1
						}
						this.getNewListApi(data)
						
					}else{
						
						let data = {
							token:uni.getStorageSync('token'),
							priceSort:2,
							page:this.page+1
						}
						this.getNewListApi(data)
						
					}
				}
			},
			getNewListApi(data){
				
				http('/api/Goods/getMemberGoodsList','post',data).then((res)=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.goodsList.last_page){
						this.$util.showToast('没有更多了')
						return
					}
					this.page++
					this.searchList = this.searchList.concat(res.data.data.goodsList.data)
				})
			},
			beforeCheck(id){
				let data = {
					token:uni.getStorageSync('token'),
					good_id:id
				}
				http('/api/user/check_good','post',data).then(res=>{
					if(res.data.status == 403){
						uni.navigateTo({
							url:'/pages/viper/vipGoods'
						})
					}else{
						uni.navigateTo({
							url: '/pages/index/detail?goodsid=' + id
						})
					}
				})
			},
			toDetail(id){
				this.beforeCheck(id)
				// uni.navigateTo({
				// 	url:'/pages/index/detail?goodsid='+id
				// })
			},
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="less">
	
	.cut-active{
		color: #F84949;
	}
	.cut-sort{
		padding: 0 30upx;
		position: fixed;
		top: 88upx;
		left: 0;
		/* #ifdef APP-PLUS */
			top: 0;
		/* #endif */
		display: flex;
		align-items: center;
		height: 100upx;
		line-height: 46upx;
		background-color: #FFFFFF;
		z-index: 1;
		.cut-sort-title{
			font-size: 32upx;
			margin-right: 60upx;
		}
		.sort-price{
			display: flex;
			.sort-position{
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 14upx;
				image{
					width: 22upx;
					height: 22upx;
				}
			}
		}
	}
	.w-100{
		width: 100%;
	}
	.recomon{
		width: 100%;
		padding: 0 34upx;
		box-sizing: border-box;
		.recomon-main{
			margin-top: 120upx;
			justify-content: space-between;
			flex-wrap: wrap;
			.recomon-item{
				width:335upx;
				// height:540upx;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:10upx;
				image{
					width: 335upx;
					height: 335upx;
				}
				.recomon-text{
					padding: 25upx 16upx;
					.recomon-title{
					width:279upx;
					font-size:32upx;
					line-height: 40upx;
					// font-weight:bold;
					color:#333;
					margin-bottom: 6upx;
					}
					.recomon-intr{
						width:259upx;
						height:30upx;
						line-height: 30upx;
						font-size:24upx;
						color:#939393;
						margin-bottom: 30upx;
					}
					.recomon-price{
						// width:100upx;
						// height:32upx;
						// font-size:32upx;
						font-weight:bold;
						// justify-content: space-between;
						// align-items: flex-end;
						// color:rgba(248,73,73,1);
						.recomon-num{
							// width:110upx;
							// height:26upx;
							font-size:28upx;
							color:rgba(187,187,187,1);
							font-weight: normal;
						}
						.recomon-price-s{
						// width:120upx;
						// height:26upx;
						font-size:26upx;
						line-height: 26upx;
						font-weight: bold;
						font-family: numFont;
						color: #363636;
						}
						.symbol{
							font-size: 24upx;
							line-height: 24upx;
							// font-weight: normal;
						}
					}
					.recomon-lowprice{
						// justify-content: space-between;
						position: relative;
						margin-top: 4upx;
						// align-items: flex-end;
						.recomon-price-x{
							
							font-weight: bold;
							position: relative;
							align-items: flex-end;
							color: #ec614a;
							font-family: numFont;
						}
						.symbol{
							font-size: 24upx;
							line-height: 26upx;
							
						}
						.recomon-prices{
							font-size: 38upx;
							line-height: 38upx;
						}
						.recomon-price-img{
							width: 68upx;
							height: 76upx;
							// margin-left: 4upx;
							position: absolute;
							right: -68upx;
							top: -20upx;
						}
						
						.gouwuche{
							border-radius: 50%;
							width: 58upx;
							height: 56upx;
							position: absolute;
							top: -14upx;
							right: -6upx;
							// margin-right: 8upx;
						}
					}
				}
			}
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



