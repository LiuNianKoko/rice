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
			<bw-swiper :swiperList="swiperList" @clickItem="clickItem" style="width:100%" nextMargin="5px" previousMargin="5px" :interval="5000" :swiperType="true"></bw-swiper>
		</view>
		<view class="icon-wrap">
			<view class="icon-item" v-for="(item,index) in iconList" :key="index" @click="toForumSort(item)">
				<image :src="item.icon" class="icon" mode=""></image>
				<view class="icon-txt">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="" v-for="(item,index) in list" :key="index">
			<view class="lines"></view>
			<view class="post-item" @click="toForumDetail(item)">
				<view class="post-top disFlex marginBottom20">
					<image :src="item.headimgurl" class="headimg" mode="" @click.stop="toMyRelease(item)"></image>
					<view class="paddingLeft20">
						<view class="marginBottom5 disAlignCenter">
							<view class="fontBold font32">
								{{item.nickname || ''}}
							</view>
							<view class="price-type" :class="item.is_attestation == 1?'price-act':''">
								{{item.is_attestation == 1?'已认证':'未认证'}}
							</view>
						</view>
						<view class="font24 color-gray">
							{{item.add_time || ''}}
						</view>
						<view class="follow" :class="item.is_follow ==1?'follow-act':''" v-if="item.is_follow != 0" @click.stop="changeFollow(item)">
							{{item.is_follow == 1?'取消关注':'+关注'}}
						</view>
					</view>
				</view>
				<view class="marginBottom20 line2">
					{{item.content || ''}}
				</view>
				<view class="post-img-wrap marginBottom20">
					<view class="img-box" v-if="item.img_arr && item.img_arr.length==1">
						<view class="imgs disCenter" v-for="(imgs,imgIndex) in item.img_arr" :key="imgIndex">
							<image :src="imgs" class="one-img" mode="aspectFill"></image>
						</view>
					</view>
					<view class="img-boxs" v-if="item.img_arr && item.img_arr.length>1">
						<view class="imgs disCenter" v-for="(imgs,imgIndex) in item.img_arr" :key="imgIndex">
							<image :src="imgs" class="more-img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="disBetween">
					<view class="disAlignCenter">
						<image src="/static/looks.png" class="icons" mode=""></image>
						<view class="color-666 margingLeft10">
							{{item.browse_num || 0}}
						</view>
					</view>
					<view class="disAlignCenter">
						<image src="/static/comms.png" class="icons" mode=""></image>
						<view class="color-666 margingLeft10">
							{{item.comment_num || 0}}
						</view>
					</view>
					<view class="disAlignCenter">
						<image src="/static/zan.png" class="icons" mode=""></image>
						<view class="color-666 margingLeft10">
							{{item.fabulous_num || 0}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="forum-add-wrap" v-if="info.is_release == 1">
			<!-- <image src="/static/forum-add.png" class="forum-add" mode="" @click="toRelease"></image> -->
			<view class="forum-add" @click="toRelease">
				我要<br>
				发帖
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
				swiperList:[],
				indexInfo:{},//首页
				info:{},//论坛
				iconList:[],//分类
				list:[],//论坛列表
				page:1,
				
			}
		},
		onLoad() {
			// this.getIndex()
			// this.getInfo()
			// this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		onShow() {
			this.page = 1
			this.getIndex()
			this.getInfo()
			
			this.getList()
			let release = uni.getStorageSync('release')
			if(release && release == 1){
				uni.showToast({
					title:'已保存到草稿箱!',
					icon:'none',
					image:'/static/success.png'
				})
				uni.setStorageSync('release',0)
			}else if(release && release == 2){
				uni.showToast({
					title:'发布成功!',
					icon:'none',
					image:'/static/success.png'
				})
				uni.setStorageSync('release',0)
			}
		},
		methods: {
			toMsg(){
				uni.navigateTo({
					url:'/pages/home/msg'
				})
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/home/search'
				})
			},
			toForumSort(item){
				uni.navigateTo({
					url:'/pages/forum/forumSort?id=' + item.id + '&title=' + item.name
				})
			},
			toForumDetail(item){
				uni.navigateTo({
					url:'/pages/forum/forumDetail?id=' + item.id
				})
			},
			toMyRelease(item){
				if(item.is_follow == 0){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/myRelease?id=' + item.user_id+ '&nickname=' + item.nickname
					})
				}
				
			},
			toRelease(){
				uni.navigateTo({
					url:'/pages/forum/releaseNews'
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
			getIndex(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/index/index','post',data).then(res=>{
					if(res.status == 200){
						this.indexInfo = res.data
					}
					console.log(res)
				})
			},
			getInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/banner','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data
						this.swiperList = res.data.bannerList
						this.iconList = res.data.categoryList
					}
					console.log(res)
				})
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				return Y+M+D+h+m;
			},
			getList(){
				let data = {
					paging:10,
					page:1,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/getForumList','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.forum_list.data
						this.list.map((item)=>{
							item.add_time = this.timestampToTime(parseFloat(item.add_time))
							return item
						})
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					paging:10,
					page:this.page + 1,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/getForumList','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.forum_list.data
						newList.map((item)=>{
							item.add_time = this.timestampToTime(parseFloat(item.add_time))
							return item
						})
						this.list = this.list.concat(newList)
						this.page++
					}
					console.log(res)
				})
			},
			// 关注
			changeFollow(info){
				this.$util.showLoading('请稍候...')
				let data = {
					follow_user_id:info.user_id,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/follow','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						if(info.is_follow == 1){
							this.list.map(item=>{
								if(item.user_id == info.user_id){
									item.is_follow = 2
								}
							})
						}else{
							this.list.map(item=>{
								if(item.user_id == info.user_id){
									item.is_follow = 1
								}
							})
						}
						
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
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
		padding: 40upx 10upx 0;
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
	.lines{
		height: 20upx;
		background: #F8F9F9;
	}
	.post-item{
		padding: 32upx;
		.post-top{
			position: relative;
			.follow{
				position: absolute;
				top: 10upx;
				right: 10upx;
				padding: 2upx 23upx;
				color: #FF5060;
				border: 1px solid #FF5060;
				border-radius: 30upx;
			}
			.follow-act{
				color: #999;
				border: 1px solid #999;
			}
			.headimg{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.one-img{
			width: 100%;
			height: 380upx;
			border-radius: 10upx;
		}
		.img-boxs{
			display: flex;
			flex-wrap: wrap;
			.imgs{
				width: 33.3%;
				margin-bottom: 10upx;
				.more-img{
					width: 96%;
					height: 222upx;
					border-radius: 6upx;
				}
			}
		}
		.icons{
			width: 36upx;
			height: 36upx;
		}
	}
	.price-type{
		margin-left: 10upx;
		font-size: 24upx;
		color: #fff;
		padding: 6upx 14upx;
		background-color: #40384a;
		border-radius: 30upx;
		line-height: 26upx;
	}
	.price-act{
		background-color: #fec71c;
	}
	.forum-add-wrap{
		position: fixed;
		z-index: 188;
		right: 20upx;
		bottom: 20upx;
		/* #ifdef H5 */
		bottom: 120upx;
		/* #endif */
		.forum-add{
			width: 100upx;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background: #fff;
			box-shadow: 0 0 8px 3px #cecece;
			color: #181C62;
		}
	}
</style>
