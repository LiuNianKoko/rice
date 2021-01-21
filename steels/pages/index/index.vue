<template>
	<view>
		<view class="title" :style="[{height:(CustomBar + 20)+ 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="disAlignCenter search-wrap" @click="toSearch">
				<image src="/static/search-gray.png" class="search-gray" mode=""></image>
				<view class="color-gray">
					请输入关键词
				</view>
			</view>
			<view class=" disCenter">
				<view class="tips-wrap disCenter" @click="toMsg">
					<image src="/static/tips.png" class="tips" mode=""></image>
					<view class="tips-num disCenter scale08" v-if="indexInfo.message_count > 0">
						{{indexInfo.message_count}}
					</view>
				</view>
			</view>
		</view>
		<view :style="[{height:(CustomBar + 20) + 'px'}]"></view>
		<view class="swiper-wrap">
			<bw-swiper :swiperList="banner" @clickItem="clickItem" style="width:100%" nextMargin="5px" previousMargin="5px" :interval="5000" :swiperType="true"></bw-swiper>
		</view>
		<view class="icon-wrap">
			<view class="icon-item" v-for="(item,index) in iconList" :key="index" @click="jumpIcon(item)">
				<image :src="item.img" class="icon" mode=""></image>
				<view class="icon-txt">
					{{item.name || ''}}
				</view>
			</view>
		</view>
		<view class="info-wrap">
			<view class="disBetween marginBottom10">
				<view class="font36 fontBold">
					资讯展示
				</view>
				<view class="font24 color-gray " @click="toInfoList">
					更多资讯
					<image src="/static/right-gray.png" class="right-gray" mode=""></image>
				</view>
			</view>
			<view class="info-item" v-for="(item,index) in infoList" :key="index" @click="toInfoDetail(item)">
				<view class="info-img-wrap">
					<image :src="item.cover" class="info-img" mode="aspectFill"></image>
				</view>
				<view class="info-text width100 paddingLeft20">
					<view class="font32 fontBold line2">
						{{item.title || ''}}
					</view>
					<view class="font24 color-gray line1">
						{{item.details || ''}}
					</view>
					<view class="disBetween font24 color-gray">
						<view class="disAlignCenter">
							<image src="/static/eyes.png" class="info-eye" mode=""></image>
							{{item.look_num || 0}}
						</view>
						<view class="">
							{{item.add_time || ''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lines"></view>
		
		<view class="pro-wrap disCenter" v-if="list.length > 0">
			<image src="/static/index-pro-bg.png" class="pro-bg" mode=""></image>
			<view class="pro-box disCenter">
				<image src="/static/index-pro.png" class="pro" mode=""></image>
				<view class="pro-title">
					好货推荐
				</view>
			</view>
		</view>
		<view class="goods-wrap" v-if="list.length > 0">
			<view class="goods-item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="goods-img-wrap">
					<image :src="item.cover" class="goods-img" mode="aspectFill"></image>
					<view class="att-type">
						{{item.goods_type == 1 ? '收购' : '出售'}}
					</view>
					<view class="col-wrap disBetween">
						<view class="disCenter">
							<image src="/static/eyes.png" class="col-img" mode=""></image>
							{{item.click_count || 0}}
						</view>
						<view class="disCenter">
							<image src="/static/coll.png" class="col-img" mode=""></image>
							{{item.collection_count || 0}}
						</view>
					</view>
				</view>
				
				<view class="text-center goods-text">
					<view class="font32 fontBold line1">
						{{item.goods_name || ''}}
					</view>
					<view class="line1 font24 line1 goods-intr">
						{{item.desc || ''}}
					</view>
					<view class="font32 fontBold goods-price">
						￥{{item.price || ''}}
					</view>
					<view class="disCenter">
						<view class="btn-buy disCenter">
							立即联系
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue'
	export default {
		components:{
		    bwSwiper
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				page:1,
				infoList:[],//资讯
				list:[],//商品
				banner:[],//轮播
				iconList:[],//分类
				indexInfo:{},//首页
				
			}
		},
		onLoad() {
			// this.getIndex()
			// this.getInfomation()
			// this.getList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			
			setTimeout( ()=> {
				this.page = 1
				uni.stopPullDownRefresh();//停止下拉刷新动画
				this.getIndex()
				this.getInfomation()
				this.getList()
			}, 1000);
		},
		onShow() {
			this.page = 1
			this.getIndex()
			this.getInfomation()
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toInfoList(){
				uni.navigateTo({
					url:'/pages/home/infoList'
				})
			},
			toInfoDetail(item){
				uni.navigateTo({
					url:'/pages/home/infoDetail?id=' + item.id
				})
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/home/search'
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id=' + item.id
				})
			},
			toMsg(){
				uni.navigateTo({
					url:'/pages/home/msg'
				})
			},
			// 轮播图点击
			clickItem(item){//1外链；2资讯；3商品详情；4分类
				if (item.link) {
					if(item.banner_type==1){
						uni.navigateTo({
							url: '/pages/home/web?src=' + item.link
						})
					}else if(item.banner_type==2){
						uni.navigateTo({
							url:'/pages/home/infoDetail?id=' + item.link
						})
					}else if(item.banner_type==3){
						uni.navigateTo({
							url:'/pages/home/detail?id=' + item.link
						})
					}else if(item.banner_type==4){
						let sortid = item.link
						this.$store.state.sortId = sortid
						uni.switchTab({
							url:'/pages/index/shop'
						})
					}
				}
			},
			// 分类跳转
			jumpIcon(item){
				let sortid = item.category_id
				this.$store.state.sortId = sortid
				uni.switchTab({
					url:'/pages/index/shop'
				})
			},
			getIndex(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/index/index','post',data).then(res=>{
					if(res.status == 200){
						this.indexInfo = res.data
						this.banner = res.data.bannerList.data
						this.iconList = res.data.iconList.data
						uni.stopPullDownRefresh();
					}
					console.log(res)
				})
			},
			getInfomation(){
				let data = {
					paging:10,
					is_recommend:1,
					token:uni.getStorageSync('token')
				}
				http('/api/index/recommend_article_list','post',data).then(res=>{
					if(res.status == 200){
						this.infoList = res.data.article_list.data
						uni.stopPullDownRefresh();
					}
					console.log(res)
				})
			},
			getList(){
				let data = {
					paging:10,
					page:1,
					is_recommend:1,
					token:uni.getStorageSync('token')
				}
				http('/api/index/recommend_goods_list','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.goods_list.data
						uni.stopPullDownRefresh();
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					paging:10,
					page:this.page + 1,
					is_recommend:1,
					token:uni.getStorageSync('token')
				}
				http('/api/index/recommend_goods_list','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.goods_list.data
						this.list = this.list.concat(newList)
						this.page++
					}
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="less">
	.title{
		display: flex;
		align-items: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #BCBCBC;
		padding: 0 32upx;
		background-color: #fff;
		.search-wrap{
			height: 72upx;
			width: 100%;
			background-color: #F5F5F9;
			padding: 20upx 40upx;
			border-radius: 36upx;
			.search-gray{
				width: 32upx;
				height: 32upx;
				margin-right: 10upx;
			}
		}
		.tips-wrap{
			position: relative;
			margin-left: 30upx;
			.tips{
				width: 34upx;
				height: 42upx;
			}
			.tips-num{
				width: 30upx;
				height: 30upx;
				background: #FF3B50;
				border-radius: 50%;
				position: absolute;
				right: -10upx;
				top: -8upx;
				color: #fff;
				font-size: 24upx;
			}
		}
	}
	.swiper-wrap{
		padding: 10upx 0;
		height: 320upx;
	}
	.icon-wrap{
		display: flex;
		flex-wrap: wrap;
		padding: 40upx 10upx 20upx;
		.icon-item{
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 40upx;
			.icon{
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
			}
			.icon-txt{
				margin-top: 12upx;
				color: #272727;
				font-size: 24upx;
			}
		}
	}
	.info-wrap{
		padding: 0 32upx;
		.right-gray{
			width: 24upx;
			height: 20upx;
			margin-left: 6upx;
		}
		.info-item{
			padding: 30upx 0;
			display: flex;
			.info-img-wrap{
				width: 230upx;
				height: 160upx;
				.info-img{
					width: 230upx;
					height: 160upx;
					border-radius: 10upx;
				}
			}
			.info-text{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.info-eye{
				width: 28upx;
				height: 24upx;
				margin-right: 6upx;
			}
		}
	}
	.lines{
		height: 20upx;
		background: #F8F9F9;
	}
	.pro-wrap{
		position: relative;
		height: 114upx;
		.pro-bg{
			width: 395upx;
			height: 48upx;
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.pro-box{
			position: relative;
			z-index: 10;
		}
		.pro-title{
			color: #343434;
			font-size: 34upx;
			font-weight: bold;
		}
		.pro{
			width: 36upx;
			height: 36upx;
			margin-right: 14upx;
		}
	}
	.goods-wrap{
		background: #F8F9F9;
		padding: 20upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.goods-item{
			background: #fff;
			width: 345upx;
			margin-bottom: 20upx;
			.goods-img-wrap{
				width: 345upx;
				height: 255upx;
				position: relative;
				.att-type{
					font-size: 24upx;
					color: #fff;
					padding: 6upx 14upx;
					background-color: #40384a;
					border-radius: 30upx;
					line-height: 26upx;
					position: absolute;
					left: 10upx;
					top: 10upx;
					z-index: 10;
				}
				.col-wrap{
					width: 100%;
					padding: 0 10upx;
					position: absolute;
					left: 0;
					bottom: 6upx;
					z-index: 10;
					color: #fec71c;
					.col-img{
						width: 30upx;
						height: 28upx;
						margin-right: 6upx;
					}
				}
			}
			.goods-img{
				width: 345upx;
				height: 255upx;
			}
			.goods-text{
				padding: 20upx;
				.goods-intr{
					color: #D0D3DE;
					margin-top: 5upx;
				}
				.goods-price{
					color: #181C62;
					margin-top: 24upx;
					margin-bottom: 18upx;
				}
				.btn-buy{
					width: 120upx;
					height: 44upx;
					color: #fff;
					background: #181C62;
					font-size: 24upx;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
