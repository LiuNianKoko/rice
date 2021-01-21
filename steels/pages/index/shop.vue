<template>
	<view>
		<view class="title" :style="[{height:(CustomBar + 20)+ 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="disAlignCenter search-wrap" @click="toSearch">
				<image src="/static/search-gray.png" class="search-gray" mode=""></image>
				<view class="color-gray">
					请输入关键词
				</view>
			</view>
			<view class=" disAlignCenter">
				<view class="disCenter tips-wrap">
					<image src="/static/shaixuan.png" class="shaixuan" mode=""  @click="changeScreen"></image>
					<view class="choice-wrap" v-if="screen">
						<view class="disAlignCenter choice" @click="changeScreenType(0)">
							<image :src="screenType==0?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
							全部
						</view>
						<view class="disAlignCenter choice" @click="changeScreenType(1)">
							<image :src="screenType==1?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
							收购
						</view>
						<view class="disAlignCenter choice" @click="changeScreenType(2)">
							<image :src="screenType==2?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
							出售
						</view>
					</view>
				</view>
				<view class="tips-wrap disCenter" @click="toMsg">
					<image src="/static/tips.png" class="tips" mode=""></image>
					<view class="tips-num disCenter scale08" v-if="info.message_count > 0">
						{{info.message_count}}
					</view>
				</view>
			</view>
		</view>
		<view :style="[{height:(CustomBar + 20) + 'px'}]"></view>
		<view class="disFlex">
			<view class="left-wrap">
				<scroll-view scroll-y="true" :style="[{height:windowHeight - (CustomBar + 20)+ 'px'}]">
					<view class="left-scroll">
						<view class="left-item disCenter" v-for="(item,index) in list" :key="index" :class="current == index?'left-act':''" @click="changeCurrent(index,item)">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				
			</view>
			<!-- 分割线 -->
			<view class="lines" :style="[{height:windowHeight - (CustomBar + 20)+ 'px'}]"></view>
			<!-- 右边列表 -->
			<scroll-view scroll-y="true" :style="[{height:windowHeight - (CustomBar + 20)+ 'px'}]">
				<view class="right-wrap">
					<view class="right-item" v-for="(item,index) in list[current].goods_list" :key="index" @click="toDetail(item)">
						<view class="right-img-wrap">
							<image :src="item.cover" class="right-img" mode="aspectFill"></image>
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
						<view class="right-txt">
							<view class="fontBold line2">
								{{item.goods_name || ''}}
							</view>
							<view class="font24 color-999">
								发布人:{{item.nickname || item.nikename || ''}}
							</view>
							<view class="font24 color-999">
								{{item.update_time || ''}}
							</view>
							<view class="font32 fontBold color-red">
								¥ {{item.price || 0}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
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
				current:0,
				windowHeight:0,
				list:[],
				info:{},
				screen:false,//筛选
				screenType:0,//0全部  1收购   2出售
			}
		},
		onLoad() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			this.getList()
		},
		onPullDownRefresh() {
			console.log('refresh');
			
			setTimeout( ()=> {
				this.page = 1
				this.getList()
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		onShow() {
			
			this.getList()
		},
		methods: {
			changeCurrent(index,item){
				this.current = index
				let sortid = item.id
				this.$store.state.sortId = sortid
			},
			changeScreen(){
				this.screen = !this.screen
			},
			changeScreenType(type){
				if(this.screenType == type)return
				this.screenType = type
				this.screen = false
				this.getList()
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id=' + item.id
				})
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/home/search'
				})
			},
			toMsg(){
				uni.navigateTo({
					url:'/pages/home/msg'
				})
			},
			getList(){
				this.$util.showLoading('加载中')
				let data = {
					token:uni.getStorageSync('token'),
					goods_type:this.screenType
				}
				http('/api/Goods/getGoodsCategory','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.category_list
						this.info = res.data
						let sortId = this.$store.state.sortId
						console.log(sortId)
						this.list.map((item,index)=>{
							if(sortId == item.id){
								this.changeCurrent(index,item.id)
							}
						})
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
			.shaixuan{
				width: 40upx;
				height: 44upx;
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
			.choice-wrap{
				position: absolute;
				background: #fff;
				z-index: 200;
				top: 54upx;
				left: -48upx;
				padding: 10upx 20upx;
				width: 150upx;
				color: #333;
				border-radius: 8upx;
				box-shadow: 0px 2px 2px 2px #eee;
				.choice{
					padding: 10upx 0;
				}
				.sel{
					width: 38upx;
					height: 38upx;
					margin-right: 6upx;
				}
			}
		}
	}
	.left-wrap{
		// padding: 0 20upx;
		padding-left: 20upx;
		width: 200upx;
		flex: none;
		position: relative;
		.left-scroll{
			padding-right: 20upx;
		}
		.left-item{
			color: #31323C;
			margin-bottom: 45upx;
			padding: 6upx;
		}
		.left-act{
			color: #fff;
			background: #181C62;
			border-radius: 25upx;
		}
		
	}
	.lines{
		width: 1px;
		background: #F2F2F5;
	}
	.right-wrap{
		padding: 0 30upx;
		.right-item{
			margin-bottom: 50upx;
			display: flex;
			.right-img-wrap{
				width: 180upx;
				height: 180upx;
				position: relative;
				.att-type{
					font-size: 24upx;
					color: #fff;
					padding: 6upx 14upx;
					background-color: #40384a;
					border-radius: 30upx;
					line-height: 26upx;
					position: absolute;
					left: 4upx;
					top: 4upx;
					z-index: 10;
				}
				.col-wrap{
					width: 100%;
					padding: 0 4upx;
					position: absolute;
					left: 0;
					bottom: 4upx;
					z-index: 10;
					color: #fec71c;
					.col-img{
						width: 30upx;
						height: 28upx;
						margin-right: 6upx;
					}
				}
				.right-img{
					width: 180upx;
					height: 180upx;
					border-radius: 6upx;
				}
			}
			.right-txt{
				width: 100%;
				padding-left: 20upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-bottom: 6upx;
			}
		}
	}
</style>
