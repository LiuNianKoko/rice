<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" :isBack="true"><block slot="backText"></block><block slot="content">搜索</block></cu-custom>
		<view class="search-wrap" :style="[{top:CustomBar + 'px'}]">
			<view class="search-box">
				<image :src="imgUrl + 'lg-search.png'" class="search"></image>
				<input type="text" class="inputs" placeholder="请输入搜索关键词" v-model="search" confirm-type="search" @confirm="searchClick"/>
				<image src="/static/close.png" class="close" v-if="search" @click="clearSearch"></image>
			</view>
			<view class="color-pink" @click="searchClick()">
				搜索
			</view>
		</view>
		<view style="height: 140upx;"></view>
		<view class="recent-se" v-if="recentSearch.length > 0">
			<view class="recent-top disBetween">
				<view class="font30 fontBold">
					最近搜索
				</view>
				<image :src="imgUrl + 'lg-trash.png'" class="lg-trash" @click="clearRence"></image>
			</view>
			<view class="recent-box">
				<view class="recent-item-wrap">
					<view class="recent-item" v-for="(item,index) in recentSearch" :key="index" @click="searchClickRe(item)">
						{{item}}
					</view>
					
				</view>
			</view>
			
		</view>
		<!-- 商品列表 -->
		<view class="wares-wrap" v-if="search_result == 1">
			<view class="wares-item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="img-wrap">
					<image :src="item.goods_pic" class="imgs"></image>
					
				</view>
				<view class="wares-txt">
					<view class="wares-title fontBold line1">
						{{item.good_name}}
					</view>
					<view class="wares-intr-box">
						<image :src="imgUrl +'lg-intr-img-yes.png'" class="wares-intr-img"></image>
						<view class="wares-intr line1">
							{{item.desc || '默认规格'}}
						</view>
					</view>
					<view class="price-wrap">
						<view class="font24" v-if="sysData.price_type == 1|| sysData.price_type == 3">
							<text>定金价：</text>
							<text class=" fontBold">￥{{item.deposit_price}}</text>
						</view>
						<view class="font24" v-if="sysData.price_type == 2|| sysData.price_type == 3">
							<text>入仓价：</text>
							<text class=" fontBold">￥{{item.warehousing_price}}</text>
						</view>
						<view class="line-price" v-if="parseFloat(item.old_price)">
							￥{{item.old_price}}
						</view>
					</view>
					<view class="font24 marginBottom20">
						<text class="color-gray">已售：{{item.sales}}</text> 
						<!-- <text class="color-pink margingLeft20">剩余：{{parseInt(item.num_stock_left) > 0?item.num_stock_left:0}}</text> -->
					</view>
					<view class="rush-now-btn">
						立即抢购
					</view>
				</view>
			</view>
		</view>
		
		<!-- 团品商品 -->
		<view class="wrap" v-if="search_result == 0">
			<view class="group-goods scale-1px-bottom" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="group-goods-intr">
					<view class="goods-title font24 fontBold line2">
						{{item.good_name}}
					</view>
					<view class="goods-intr-box">
						<image :src="imgUrl +'lg-intr-img.png'" class="intr-img"></image>
						<view class="goods-intr line2">
							{{item.desc || '默认规格'}}
						</view>
					</view>
					
					<view class="font20" v-if="sysData.price_type == 1|| sysData.price_type == 3">
						<text>定金价：</text>
						<text class="color-pink fontBold font-ware">{{item.deposit_price}}</text>
					</view>
					<view class="font20" v-if="sysData.price_type == 2|| sysData.price_type == 3">
						<text>入仓价：</text>
						<text class="color-pink fontBold font-ware">{{item.warehousing_price}}</text>
					</view>
					<!-- <view class="font22 text-line color-grayPrice old-price" v-if="parseFloat(item.old_price)">
						￥{{item.old_price}}
					</view> -->
					<view class="font20 marginBottom5 disFlex" v-if="parseFloat(item.old_price)">
						<text class="fontIta" style="visibility: hidden;">原价格：</text>
						<text class="text-line font22 color-grayPrice">￥{{item.old_price || 0}}</text>
					</view>
					<view class="font22 color-grayNum">
						已售：{{item.sales}}
					</view>
					<!-- <view class="font22 color-pink">
						剩余：{{parseInt(item.num_stock_left) > 0?item.num_stock_left:0}}
					</view> -->
				</view>
				<view class="banner-box disCenter">
					<image :src="item.goods_pic" class="banner"></image>
				</view>
				<!-- <view class="rush-now-wrap ">
					<view class="font24 text-white">
						立即抢购
					</view>
					<image :src="imgUrl +'lg-right-white.png'" class="right-white"></image>
				</view>
				<view class="group-goods-line">
					
				</view> -->
				
			</view>
		</view>
		<image src="/static/back-top.png" class="back-top" mode="" v-if="backTopShow" @click="backTop"></image>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	const app = getApp()
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				imgUrl:app.globalData.imgUrl,
				search:'',
				list:[],
				page:1,
				recentSearch:[],
				search_result:2,//0无商品  1有商品
				sysData:{},
				backTopShow:false,
				backTopHeight:0,
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.page = 1
			this.backTopHeight = uni.getSystemInfoSync().windowHeight * 3;
			let searchs = uni.getStorageSync('searchs')
			if(searchs){
				this.recentSearch = searchs
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > this.backTopHeight){
				this.backTopShow = true
			}else{
				this.backTopShow = false
			}
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			backTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			clearSearch(){
				this.search = ''
			},
			clearRence(){
				uni.setStorageSync('searchs',[])
				this.recentSearch = []
			},
			toDetail(item){
				// if(item.sell_status == 0){
					// return
				// }else{
					uni.navigateTo({
						url:'/pages/index/detail?id=' + item.id
					})
				// }
			},
			// 最近搜索
			searchs(){
				this.recentSearch.unshift(this.search)
				if(this.recentSearch.length > 50){
					this.recentSearch = this.recentSearch.slice(1,51)
				}
				uni.setStorageSync('searchs',this.recentSearch)
			},
			// 搜索
			searchClick(){
				this.page = 1
				this.list = []
				if(this.search == ''){
					this.isSearch = true
					this.getList()
				}else{
					let reSearch = uni.getStorageSync('searchs')
					console.log(reSearch)
					if(reSearch){
						if(this.search == reSearch[0]){
							this.isSearch = true
							this.getList()
							return
						}
					}
					this.searchs()
					this.isSearch = true
					this.getList()
				}
				
			},
			searchClickRe(item){
				this.page = 1
				this.list = []
				this.search = item
				this.getList()
			},
			getList(){
				
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					search_words:this.search,
					page:1
				}
				http('/api/index/search_goods','post',data).then(res=>{
					if(res.code == 200){
						this.list = res.data.goods_data
						this.search_result = res.data.search_result
						this.sysData = res.data.sys_set
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					search_words:this.search,
					page:this.page+1
				}
				http('/api/index/search_goods','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data.goods_data
						
						this.list = this.list.concat(newList)
						this.page++
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
	
	.search-wrap{
		padding: 20upx 30upx;
		background-color: #f4f4f4;
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
			padding: 12upx 28upx;
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
	.recent-se{
		padding: 0 40upx 20upx;
		.recent-top{
			margin-bottom: 32upx;
			.lg-trash{
				width: 28upx;
				height: 30upx;
			}
		}
		.recent-box{
			max-height: 468upx;
			overflow: hidden;
		}
		.recent-item-wrap{
			display: flex;
			flex-wrap: wrap;
		}
		.recent-item{
			min-width: 110upx;
			background-color: #fff;
			text-align: center;
			padding: 10upx 20upx;
			border-radius: 40upx;
			margin-bottom: 20upx;
			margin-right: 26upx;
		}
	}
	
	.wares-wrap{
		padding: 0 10upx 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.wares-item{
			border-radius: 20upx;
			background-color: #fff;
			margin-bottom: 38upx;
			width: 355upx;
			.img-wrap{
				position: relative;
				width: 355upx;
				height: 351upx;
				.imgs{
					width: 355upx;
					height: 351upx;
					border-radius: 20upx 20upx 0 0;
				}
				.img-no{
					width: 172upx;
					height: 172upx;
					color: #fff;
					background-color: #000;
					opacity: 0.5;
					font-size: 40upx;
					border-radius: 50%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					z-index: 10;
					// font-weight: bold;
					text-align: center;
					line-height: 172upx;
				}
			}
			.wares-txt{
				padding: 10upx 20upx 28upx;
				
				.wares-intr-box{
					position: relative;
					background-color: #f4f4f4;
					padding: 10upx 6upx 10upx 14upx;
					margin-top: 18upx;
					margin-bottom: 12upx;
					.wares-intr-img{
						width: 35upx;
						height: 50upx;
						position: absolute;
						left: -10upx;
						top: -6upx;
						z-index: 10;
					}
					.wares-intr{
						font-size: 20upx;
						color: #c1c1c1;
					}
				}
				.price-wrap{
					position: relative;
					min-height: 64upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.line-price{
						font-size: 24upx;
						color: #B4B4B4;
						text-decoration: line-through;
						position: absolute;
						right: -4upx;
						top: 20upx;
					}
				}
				.rush-now-btn{
					font-size: 20upx;
					color: #fff;
					width: 144upx;
					height: 46upx;
					text-align: center;
					line-height: 46upx;
					background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
					border-radius: 50upx;
					margin: 0 auto;
				}
				.rush-act{
					background: #aaa;
				}
			}
		}
	}
	
	.wrap{
		padding: 20upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
	}
	.group-goods{
		// padding: 50upx 10upx 90upx;
		padding: 30upx 0;
		background-color: #fff;
		position: relative;
		display: flex;
		// align-items: flex-end;
		// flex-direction: column;
		.banner-box{
			width: 484upx;
			height: 350upx;
			background-color: #ffa6bc;
			position: relative;
			z-index: 10;
			.banner{
				width: 480upx;
				height: 346upx;
			}
		}
		.rush-now-wrap{
			width: 534upx;
			height: 50upx;
			padding-right: 23upx;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: relative;
			z-index: 10;
			.right-white{
				width: 12upx;
				height: 21upx;
				margin-left: 14upx;
			}
		}
		.group-goods-line{
			background-color: #f7ccdd;
			width: 50%;
			height: 6upx;
			position: absolute;
			top: 134upx;
			left: 10upx;
			z-index: 1;
		}
		.group-goods-intr{
			width: 250upx;
			height: 350upx;
			padding: 20upx;
			border: 1px solid #ffbece;
			background-color: #fff9fb;
			// position: absolute;
			// top: 154upx;
			// left: 10upx;
			// z-index: 20;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-intr-box{
				position: relative;
				background-color: #f4f4f4;
				padding: 10upx 6upx 10upx 14upx;
				margin-top: 18upx;
				margin-bottom: 10upx;
				.intr-img{
					width: 40upx;
					height: 84upx;
					position: absolute;
					left: -14upx;
					top: -10upx;
					z-index: 10;
				}
			}
			.font-ware{
				font-size: 32upx;
				font-family: 'SimHei';
			}
			.goods-intr{
				font-size: 20upx;
				color: #c1c1c1;
			}
			.old-price{
				padding-left: 88upx;
				margin-bottom: 6upx;
			}
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
