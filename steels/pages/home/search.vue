<template>
	<view>
		<view class="title" :style="[{height:(CustomBar + 20)+ 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back-black.png" class="back" mode=""></image>
			</view>
			<view class="disAlignCenter search-wrap" >
				<view class="disCenter paddingLeft20" @click="searchClick()">
					<image src="/static/search-gray.png" class="search-gray" mode="" ></image>
				</view>
				
				<input type="text" placeholder="请输入关键词" placeholder-class="color-gray" class="inputs" v-model="search" confirm-type="search" @confirm="searchClick" />
				<image src="/static/close.png" class="close" mode="" v-if="search" @click="clearSearch"></image>
			</view>
		</view>
		<view :style="[{height:(CustomBar + 20)+ 'px'}]"></view>
		<view class="wrap" v-if="!isSearch">
			<view class="search-box" v-if="recentSearchs.length > 0">
				<view class="search-top disBetween">
					<view class="color-666">
						最近搜索
					</view>
					<view class="disCenter" @click="clearRence">
						<image src="/static/trash.png" class="trash" mode=""></image>
					</view>
				</view>
				<!-- :class="loadMore?'H94':'H188'" -->
				<view class="search-item-wrap" >
					<view class="search-item disCenter" v-for="(item,index) in recentSearchs" :key="index" @click="searchClickRe(item)">
						{{item}}
						<image src="/static/close-g.png" class="del-re" @click.stop="delRe(index)" mode=""></image>
					</view>
					<!-- <image src="/static/search-down.png" class="search-down" mode="" :class="loadMore?'search-up':'search-dw'" v-if="recentSearchs.length > 4" @click="changeLoadMore"></image> -->
				</view>
			</view>
			<view class="search-box">
				<view class="search-top disBetween">
					<view class="color-666">
						热门搜索
					</view>
					<view class="disCenter" @click="getHot">
						<image src="/static/refresh.png" class="trash margingRight5" mode=""></image>
						<view class="color-666">
							换一换
						</view>
					</view>
				</view>
				<view class="search-item-wrap">
					<view class="search-item line1 disCenter" v-for="(item,index) in hotList" :key="index" :class="index == 0||index==1?'search-act':''" @click="searchClickRe(item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="isSearch">
			<view class="pro-wrap disAlignCenter" :style="[{top:(CustomBar + 20)+ 'px'}]">
				<view class="pro-item" :class="current == 1?'pro-act':''" @click="changeCurrent(1)">
					货物
				</view>
				<view class="pro-item" :class="current == 2?'pro-act':''" @click="changeCurrent(2)">
					资讯
				</view>
				<view class="pro-item" :class="current == 3?'pro-act':''" @click="changeCurrent(3)">
					用户
				</view>
			</view>
			<view style="height: 100upx;"></view>
			<view class="cur-wrap disBetween" :style="[{top:(CustomBar + 70)+ 'px'}]" v-if="current == 1&&list.length > 0">
				<view class="cur-item" :class="curWh == 1?'cur-act':''" @click="changeCurWh(1)">
					综合排序
				</view>
				<view class="cur-item" :class="curWh == 2?'cur-act':''" @click="changeCurWh(2)">
					销量优先
				</view>
				<view class="cur-item" :class="curWh == 3?'cur-act':''" @click="changeCurWh(3)">
					新品
				</view>
				<view class="cur-item disAlignCenter" :class="curWh == 4?'cur-act':''" @click="changeCurWh(4)">
					价格
					<view class="status-wrap" v-if="priceStatus">
						<image src="/static/up1.png" class="price-status" mode=""></image>
						<image src="/static/down2.png" class="price-status" mode=""></image>
					</view>
					<view class="status-wrap" v-if="!priceStatus">
						<image src="/static/up2.png" class="price-status" mode=""></image>
						<image src="/static/down1.png" class="price-status" mode=""></image>
					</view>
				</view>
			</view>
			<view class="cur-wrap disAlignCenter" :style="[{top:(CustomBar + 70)+ 'px'}]" v-if="current == 2&&list.length > 0">
				<view class="cur-item cur-100" :class="curZx == 0?'cur-act':''" @click="changeCurZx(0)">
					综合排序
				</view>
				<view class="cur-item" :class="curZx == 1?'cur-act':''" @click="changeCurZx(1)">
					最新发布
				</view>
			</view>
			<view style="height: 80upx;" v-if="current != 3"></view>
			
			<view class="hw-wrap" v-if="current == 1&&list.length > 0">
				<view class="hw-item" v-for="item in list" @click="toDetail(item)">
					<view class="hw-img-wrap">
						<image :src="item.cover" class="hw-img" mode=""></image>
					</view>
					<view class="font30 fontBold line2 minH40 marginBottom20">
						{{item.goods_name || ''}}
					</view>
					<view class="disBetween">
						<view class="font36 fontBold color-red">
							¥{{item.price || ''}}
						</view>
						<view class="font24 color-gray">
							销量{{item.show_alsalenum || 0}}
						</view>
					</view>
				</view>
			</view>
			<view class="empty-data" v-if="current == 1&&list.length == 0">
				<image src="/static/search-empty.png" class="search-empty" mode=""></image>
				<view class="color-gray">
					搜索结果为空，换个关键词试试
				</view>
			</view>
			<view class="info-wrap" v-if="current == 2&&list.length > 0">
				<view class="info-item" @click="toInfoDetail(item)" v-for="item in list">
					<view class="info-img-wrap">
						<image :src="item.cover" class="info-img" mode=""></image>
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
			<view class="empty-data" v-if="current == 2&&list.length == 0">
				<image src="/static/search-empty.png" class="search-empty" mode=""></image>
				<view class="color-gray">
					搜索结果为空，换个关键词试试
				</view>
			</view>
			<view class="" v-if="current == 3&&list.length > 0">
				<view class="item scale-1px-bottom disBetween" v-for="(item,index) in list" :key="index">
					<view class="disAlignCenter" @click="toMyRelease(item)">
						<image :src="item.headimgurl" class="headimg" mode=""></image>
						<view class="nickname" >
							{{item.nickname}}
						</view>
					</view>
					<view class="cancel" :class="item.is_follow == 1?'':'act'" @click="changeFollow(item)">
						{{item.is_follow == 1?'取消关注':'+关注'}}
					</view>
				</view>
			</view>
			<view class="empty-data" v-if="current == 3&&list.length == 0">
				<image src="/static/search-empty.png" class="search-empty" mode=""></image>
				<view class="color-gray">
					搜索结果为空，换个关键词试试
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				loadMore:true,
				search:'',
				isSearch:false,//是否搜索
				list:[],
				hotList:[],
				page:1,
				current:1,//1货物  2资讯  3用户
				curWh:1,//1综合排序  2销量  3新品  4价格
				curZx:0,//0综合  1最新
				priceStatus:true,
				recentSearchs:[],
			}
		},
		onLoad() {
			this.getHot()
			this.page = 1
			let searchs = uni.getStorageSync('searchs')
			if(searchs){
				this.recentSearchs = searchs
			}
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			changeLoadMore(){
				this.loadMore = !this.loadMore
			},
			clearSearch(){
				this.search = ''
				this.isSearch = false
			},
			clearRence(){
				uni.setStorageSync('searchs',[])
				this.recentSearchs = []
			},
			delRe(index){
				this.recentSearchs.splice(index,1)
			},
			// 最近搜索
			searchs(){
				let i
				this.recentSearchs.map((item,index)=>{
					if(this.search == item){
						i = index
						return i
					}
				})
				if(i){
					this.recentSearchs.splice(i,1)
				}
				this.recentSearchs.unshift(this.search)
				
				if(this.recentSearchs.length > 6){
					this.recentSearchs = this.recentSearchs.slice(0,6)
				}
				
				uni.setStorageSync('searchs',this.recentSearchs)
			},
			changeCurrent(type){
				this.page = 1
				this.current = type
				this.list = []
				this.getList()
			},
			changeCurWh(type){
				this.curWh = type
				if(type == 4){
					this.priceStatus = !this.priceStatus
				}
				this.getList()
			},
			// 搜索
			searchClick(){
				this.page = 1
				this.list = []
				if(this.search == ''){
					return
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
				this.isSearch = true
				this.getList()
			},
			changeCurZx(type){
				this.page = 1
				this.curZx = type
				this.getList()
			},
			toInfoDetail(item){
				uni.navigateTo({
					url:'/pages/home/infoDetail?id=' + item.id
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id=' + item.id
				})
			},
			getHot(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Search/searchname','post',data).then(res=>{
					if(res.status == 200){
						this.hotList = res.data.hot_search_list
					}
					console.log(res)
				})
			},
			toMyRelease(item){
				if(item.is_follow == 0){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/myRelease?id=' + item.id+ '&nickname=' + item.nickname
					})
				}
				
			},
			// 关注
			changeFollow(item){
				this.$util.showLoading('请稍候...')
				let data = {
					follow_user_id:item.id,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/follow','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						if(item.is_follow == 1){
							item.is_follow = 2
						}else{
							item.is_follow = 1
						}
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			getList(){
				let data = {}
				let sort = 0
				if(this.curWh == 1){
					sort = 0
				}else if(this.curWh == 2){
					sort = 1
				}else if(this.curWh == 3){
					sort = 2
				}else if(this.curWh == 4&& this.priceStatus == true){
					sort = 3
				}else if(this.curWh == 4&& this.priceStatus == false){
					sort = 4
				}
				if(this.current == 1){
					data = {
						paging:10,
						page:1,
						is_recommend:0,
						name:this.search,
						sort:sort,
						token:uni.getStorageSync('token')
					}
					http('/api/index/recommend_goods_list','post',data).then(res=>{
						if(res.status == 200){
							this.list = res.data.goods_list.data
						}
						console.log(res)
					})
				}else if(this.current == 2){
					data = {
						paging:10,
						page:1,
						is_recommend:0,
						sort:this.curZx,
						name:this.search,
						token:uni.getStorageSync('token')
					}
					http('/api/index/recommend_article_list','post',data).then(res=>{
						if(res.status == 200){
							this.list = res.data.article_list.data
						}
						console.log(res)
					})
				}else{
					data = {
						paging:10,
						page:1,
						name:this.search,
						token:uni.getStorageSync('token')
					}
					http('/api/search/searchuser','post',data).then(res=>{
						if(res.status == 200){
							this.list = res.data.list
						}
						console.log(res)
					})
				}
				
			},
			getNewList(){
				let newList = []
				let data = {}
				let sort = 0
				if(this.curWh == 1){
					sort = 0
				}else if(this.curWh == 2){
					sort = 1
				}else if(this.curWh == 3){
					sort = 2
				}else if(this.curWh == 4&& this.priceStatus == true){
					sort = 3
				}else if(this.curWh == 4&& this.priceStatus == false){
					sort = 4
				}
				if(this.current == 1){
					data = {
						paging:10,
						page:this.page + 1,
						is_recommend:0,
						name:this.search,
						sort:sort,
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
				}else if(this.current == 2){
					data = {
						paging:10,
						page:this.page + 1,
						is_recommend:0,
						sort:this.curZx,
						name:this.search,
						token:uni.getStorageSync('token')
					}
					http('/api/index/recommend_article_list','post',data).then(res=>{
						if(res.status == 200){
							newList = res.data.article_list.data
							this.list = this.list.concat(newList)
							this.page++
						}
						console.log(res)
					})
				}else{
					data = {
						paging:10,
						page:this.page + 1,
						name:this.search,
						token:uni.getStorageSync('token')
					}
					http('/api/search/searchuser','post',data).then(res=>{
						if(res.status == 200){
							newList = res.data.list
							this.list = this.list.concat(newList)
							this.page++
						}
						console.log(res)
					})
				}
			},
			
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 20upx 32upx;
	}
	.H94{
		max-height: 188upx;
		transition: all .3s;
	}
	.H188{
		max-height: 376upx;
		transition: all .3s;
	}
	.title{
		display: flex;
		align-items: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		padding: 0 32upx;
		background-color: #fff;
		.back-wrap{
			width: 40upx;
			height: 40upx;
			margin-right: 20upx;
			.back{
				width: 24upx;
				height: 40upx;
			}
		}
		.search-wrap{
			height: 66upx;
			width: 100%;
			background-color: #F5F5F9;
			padding: 16upx 40upx 16upx 20upx;
			border-radius: 36upx;
			position: relative;
			.inputs{
				font-size: 26upx;
				padding-right: 50upx;
				width: 100%;
			}
			.search-gray{
				width: 32upx;
				height: 32upx;
				margin-right: 10upx;
				flex: none;
			}
			.close{
				width: 32upx;
				height: 32upx;
				position: absolute;
				right: 20upx;
				top: 16upx;
			}
		}
		
	}
	
	.search-box{
		margin-bottom: 50upx;
		.search-top{
			margin-bottom: 40upx;
		}
		.trash{
			width: 44upx;
			height: 44upx;
		}
		.search-item-wrap{
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			position: relative;
			.search-item{
				min-width: 130upx;
				max-width: 370upx;
				background: #F5F5F9;
				border-radius: 30upx;
				padding: 8upx 30upx;
				line-height: 48upx;
				margin-right: 20upx;
				margin-bottom: 30upx;
				color: #020202;
				position: relative;
				.del-re{
					width: 30upx;
					height: 30upx;
					position: absolute;
					z-index: 10;
					top: 0;
					right: -6upx;
				}
			}
			.search-down{
				width: 60upx;
				height: 60upx;
				position: absolute;
				right: 0;
				bottom: 30upx;
			}
			.search-up{
				transform: rotate(0deg);
				transition: all .3s;
			}
			.search-dw{
				transform: rotate(-180deg);
				transition: all .3s;
			}
			.search-act{
				background: #fff;
				border: 1px solid #181C62;
				color: #181C62;
			}
		}
	}
	.pro-wrap{
		padding: 0 32upx;
		height: 100upx;
		width: 100%;
		position: fixed;
		left: 0;
		z-index: 100;
		background: #fff;
		.pro-item{
			color: #BCBCBC;
			font-size: 36upx;
			margin-right: 56upx;
		}
		.pro-act{
			color: #272727;
			font-size: 48upx;
			font-weight: bold;
		}
	}
	.cur-wrap{
		padding: 0 32upx;
		height: 80upx;
		width: 100%;
		position: fixed;
		left: 0;
		z-index: 100;
		background: #fff;
		.cur-item{
			color: #30323C;
			.status-wrap{
				display: flex;
				flex-direction: column;
				margin-left: 4upx;
			}
			.price-status{
				width: 20upx;
				height: 14upx;
			}
		}
		.cur-100{
			margin-right: 100upx;
		}
		.cur-act{
			color: #30a9e0;
		}
	}
	.hw-wrap{
		padding: 20upx 32upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.hw-item{
		margin-bottom: 50upx;
		width: 330upx;
		.hw-img-wrap{
			width: 330upx;
			height: 330upx;
			margin-bottom: 20upx;
			.hw-img{
				width: 330upx;
				height: 330upx;
				border-radius: 10upx;
			}
		}
	}
	.info-wrap{
		padding: 0 32upx;
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
	.empty-data{
		position: absolute;
		top: 50%;
		left: 46%;
		transform: translate(-43%, -55%);
		display: flex;
		flex-direction: column;
		align-items: center;
		.search-empty{
			width: 240upx;
			height: 175upx;
			margin-bottom: 40upx;
		}
	}
	
	.item{
		padding: 30upx;
		.headimg{
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
			margin-right: 20upx;
		}
		.nickname{
			font-size: 32upx;
			font-weight: bold;
		}
		.cancel{
			padding: 4upx 16upx;
			font-size: 24upx;
			color: #999;
			border-radius: 30upx;
			border: 1px solid #999;
		}
		.act{
			color: #FF5060;
			border: 1px solid #FF5060;
		}
	}
</style>
