<template>
	<view class="item-wraps">
		<!-- <view class="status_bar"> -->
			<!-- 这里是状态栏 -->
		<!-- </view> -->
		<view class="header-search-wrap">
			<view class="index-header scale-1px-bottom">
				<view class="input-wrap">
					<input type="text" placeholder="搜索商品" @click="toSearch" disabled="true"/>
					<image class="input-fangdajing" :src='imag+"search.png"' @click="toSearch"></image>	   
				</view>
				<navigator url="/pages/index/msg/systemMsg">
					<image class="input-message" :src='imag+"xinfeng.png"'></image>
				</navigator>
			</view>
		</view>
		<view class="blank"></view>
		<!-- 展示商品 -->
		<view class="item-main">
			<view class="item-nav">
				<view class="item-nav-item" :class="[item.id==listid?'item-active':'']" v-for="(item,index) in list" :key="item.id" @tap="changeTab(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="item-content">
				<view class="item-content-item scale-1px-bottom" v-for="(item2,index2) in goodslist" :key="item2.id" @tap="toDetail(item2.id)">
					<image :src="item2.cover"></image>
					<view class="item-text">
						<view class="item-title line1 ">
							{{item2.goods_name}} 
						</view>
						<view class="item-intr line1 marginBottom10">
							{{item2.desc}}
						</view>
						<view class="item-num">
							<view class="item-cost-price">￥{{item2.price}}</view>
							<!-- <view class="item-nums">已售{{item2.alsalenum}}</view> -->
						</view>
						<view class="item-price">
							<view class="item-vip-price">
								<text class="symbol">￥</text>
								{{item2.member_price}}
								<image class="recomon-price-img" :src='imag+"member-man.png"' ></image>
							</view>
							
							<image class="gouwuche" src="/static/gouwuche2.png"></image>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	export default {
		data() {
			return {
				imag: app.globalData.imag,
				list:[],//分类标题
				goodslist:[],//分类商品列表
				i:0,
				listid:0
			}
		},
		onLoad(){
			this.getList()
			this.$util.showLoading('加载中')
		},
		onShow() {
			let that = this
			console.log(uni.getStorageSync('indexNum'))
			
			if(uni.getStorageSync('indexNum')){
				let indexNum = uni.getStorageSync('indexNum')
				that.changeTab(indexNum)
			}else{
				that.changeTab(that.listid)
			}
			that.getList()
		},
		// onHide(){
		// 	this.$util.setStorage('indexNum',0)
		// },
		// onPullDownRefresh() {
		// 	//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		// 	this.getList()
		// 	console.log('refresh');
		// 	setTimeout(function () {
		// 		uni.stopPullDownRefresh();  //停止下拉刷新动画
		// 	}, 1000);
		// },
		methods:{
			
			getList(){
				let _this = this
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Goods/getGoodsCategory','post',data).then(res=>{	
					if(res.data.status == '200'){
						if(res.data.data.ordernum){
							_this.list = res.data.data.ordernum;
							_this.listid = _this.list[0].id
							_this.list.map((item)=>{
								if(uni.getStorageSync('indexNum') == item.id){
									_this.listid = item.id
								}
								return _this.listid
							})
							_this.changeTab(_this.listid)
						}else{
							_this.list = [{
								'name':'推荐',
								'goods_list':[{'goods_name':'东北大米'}]
							}]
						}
						_this.$util.hideLoading()
					}else{
						_this.$util.showToast(res.data.msg)
						return
					}
					
					console.log(res)
				})
			},
			changeTab(id){
				console.log(id)
				
				let that = this
				that.$util.setStorage('indexNum',id)
				that.listid = id
				let goodslist2 = []
				that.list.map((item)=>{
					if(that.listid == item.id){
						goodslist2 = item.goods_list
					}
					return goodslist2
				})
				that.goodslist = goodslist2
				// if(!index){
				// 	this.i = 0
				// }else{
				// 	this.i = index
				// }
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
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
		}
	}
</script>

<style lang="less">
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
		}

	.header-search-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		.index-header {
			height: 146upx;
			line-height: 86upx;
			padding: 0 30upx;
			padding-top: 70upx;
			box-sizing: border-box;
			background-color: #ffffff;
			font-size: 28upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.input-message{
				position: absolute;
				width: 48upx;
				height: 48upx;
				top: 80upx;
				/* #ifdef MP-WEIXIN */
				right: 200upx;
				/* #endif */
				/* #ifndef MP-WEIXIN */
				right: 40upx;
				/* #endif */
			}
			.input-wrap {
				/* #ifdef MP-WEIXIN */
				width: 450upx;
				/* #endif */
				/* #ifndef MP-WEIXIN */
				width: 600upx;
				/* #endif */
				height: 60upx;
				padding: 6upx 30upx 10upx 100upx;
				box-sizing: border-box;
				background-color: #f2f2f5;
				border-radius: 50upx;
				color: #333333;
				position: relative;
				.input-fangdajing{
					position: absolute;
					width: 44upx;
					height: 44upx;
					left: 30upx;
					top: 10upx;
				}
			}
		}
	}
	.blank {
		width: 100%;
		height: 146upx;
	}
	.item-active{
		width:160upx;
		height:50upx;
		line-height: 50upx;
		background:#00a0e9;
		border-radius:25upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,254,254,1);
	}
	.item-wraps{
		
	}
	.item-main{
		// display: flex;
		position: absolute;
		z-index: 2;
		box-sizing: border-box;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		// margin-top: 126upx;
		.item-nav{
			width: 200upx;
			padding: 0 20upx;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 146upx;
			height: 88%;
			overflow-y: auto;
			.item-nav-item{
				margin-top: 42upx;
				margin-bottom: 10upx;
				height:50upx;
				font-size:28upx;
				text-align: center;
				letter-spacing: 2upx;
			}
		}
		.item-content{
			padding-left: 14upx;
			// flex:1;
			position: absolute;
			left: 200upx;	
			top: 146upx;
			z-index: 5;
			background-color: #f8f8f8;
			height: 88%;
			overflow-y: auto;
			.item-content-item{
				box-sizing: border-box;
				// height: 240upx;
				padding: 10upx 0;
				display: flex;
				image{
					width: 180upx;
					height: 180upx;
				}
				.item-text{
					width: 322upx;
					height: 180upx;
					padding-left: 20upx;
					padding-right: 14upx;
					.item-title{
						width: 300upx;
						font-size:32upx;
						// font-weight:bold;
					}
					.item-intr{
						font-size:24upx;
						width: 300upx;
						color:rgba(187,187,187,1);
						// margin-bottom: 10upx;
					}
					.item-num{
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						margin-top: 26upx;
						.item-cost-price{
							font-size:24upx;
							font-weight: bold;
						}
						.item-nums{
							font-size:28upx;
							color:rgba(187,187,187,1);
							align-self: center;
						}
					}
					.item-price{
						display: flex;
						justify-content: space-between;
						align-items: center;
						// padding-right: 10upx;
						position: relative;
						margin-top: 2upx;
						.item-vip-price{
							font-size:38upx;
							color:#ec614a;
							display: flex;
							line-height: 32upx;
							align-items: flex-end;
							font-weight: bold;
							position: relative;
							// background-color: #dadada;
							// border-radius: 20upx;
							// padding: 4upx 10upx;
							.symbol{
								font-size: 24upx;
								line-height: 24upx;
								
							}
							.recomon-price-img{
								width: 68upx;
								height: 76upx;
								margin-left: 4upx;
								position: absolute;
								right: -70upx;
								top: -22upx;
							}
						}
						
						.gouwuche{
							border-radius: 50%;
							width: 58upx;
							height: 56upx;
							position: absolute;
							top: -16upx;
							right: 0;
						}
						
					}
				}
			}
		}
	}


</style>
