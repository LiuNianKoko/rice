<template>
	<view class="shop-wrap">
	
		<view class="header-wrap">
			<view class="index-header">
				我的收藏
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="back"></image> -->
				<view class="back-icon-wrap" @click="back">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<!-- 收藏 商品 列表 -->
		<view class="coll-list" v-if="managed">
			<view v-if="collList.length > 0">
				<view class="manage" @click="changeManage">
					管理
				</view>
				<view class="disflex shop-item" v-for="item in collList" :key="item.id" @click="toDetail(item.goods_id,item.type,item.target_id)">
					<!-- <view class="">
						<image class="select" :src="checked ? selectImg : unselectImg" @tap="selected"></image>
					</view> -->
					<view class="shopinfo flxe-1 disflex paddingLeft20">
						<view class="shpopimg">
							<image class="shpopimg" :src="item.cover" mode=""></image>
						</view>
						<view class="flxe-1 spinfo">
							<view class="zhubt line1">
								{{item.goods_name}}
							</view>
							<view class="guige line1">
								{{item.desc}}
							</view>
							<!-- <view class="prquy">
								<text class="price">￥{{item.price}}</text>
								<text class="nhprice">农户价￥{{item.member_price}}</text>
								<text class="salenum">月销{{item.surplusnum}}</text>
							</view> -->
							<view class="item-num">
								<view class="item-cost-price">
									<text class="symbol">￥</text>
									{{item.price}}
								</view>
								<!-- <view class="item-nums">已售{{item.surplusnum}}</view> -->
							</view>
							<view class="item-price">
								<view class="item-vip-price">
									<text class="symbol">￥</text>
									<text class="recomon-prices">{{item.member_price}}</text>
									<image class="recomon-price-img" :src='imag+"member-man.png"'></image>
								</view>
								<image class="gouwuche" src="/static/gouwuche2.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nodata" v-else>暂无数据~</view>
		</view>
		
		<!-- 收藏商品 管理 -->
		<view class="coll-list" v-if="!managed">
			<view class="manage" @click="changeManage">
				取消
			</view>
			<view class="disflex shop-item" v-for="(item,index) in collList" :key="item.id">
				<view class="">
					<image class="select" :src="selectImg" @tap="selectedTap(item,index)" v-if="item.check"></image>
					<image class="select" :src="unSelectImg" @tap="selectedTap(item,index)" v-else></image>
				</view>
				<view class="shopinfo flxe-1 disflex paddingLeft20">
					<view class="shpopimg">
						<image class="shpopimg" :src="item.cover" mode=""></image>
					</view>
					<view class="flxe-1 spinfo">
						<view class="zhubt line1">
							{{item.goods_name}}
						</view>
						<view class="guige line1">
							{{item.desc}}
						</view>
						<!-- <view class="prquy">
							<text class="price">￥{{item.price}}</text>
							<text class="nhprice">农户价￥{{item.member_price}}</text>
							<text class="salenum">月销{{item.surplusnum}}</text>
						</view> -->
						<view class="item-num">
							<view class="item-cost-price">
								<text class="symbol">￥</text>
								{{item.price}}
							</view>
							<!-- <view class="item-nums">已售{{item.surplusnum}}</view> -->
						</view>
						<view class="item-price">
							<view class="item-vip-price">
								<text class="symbol">￥</text>
								<text class="recomon-prices">{{item.member_price}}</text>
								<image class="recomon-price-img" :src='imag+"member-man.png"'></image>
							</view>
							<image class="gouwuche" src="/static/gouwuche2.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="blank"></view>
			<view class="coll-fotter disFlex">
				<view class="total">
					<image class="select" :src="totalSelect ? selectImg : unSelectImg" @tap="totalSelectedTap"></image>
					<!-- <image class="select" :src="selectImg" @tap="totalSelectedTap" v-if="totalSelect"></image>
					<image class="select" :src="unSelectImg" @tap="totalSelectedTap" v-else></image> -->
					全选
				</view>
				<view class="del" @click="show('QSPopup')">
					删除
				</view>
			</view>
			<!-- 删除弹窗 -->
			<QSPopup ref="QSPopup">
				<view class="content-del">
					<view class="del-text scale-1px-bottom">
						<view class="del-text1">
							删除确认
						</view>
						<view class="del-text2">
							确定要删除该商品吗？
						</view>
					</view>
					<view class="del-btn">
						<view class="del-btn-no" @tap="hides('QSPopup')">
							取消
						</view>
						<view class="del-btn-yes" @tap="delColl">
							确认
						</view>
					</view>
				</view>
			</QSPopup>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				imag: app.globalData.imag,
				collList:[],
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				checked:false, 
				managed:true,
				totalSelect:false,
				page:1
			}
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1,
					pagesize:10
				}
				http('/api/User/coll_lists','post',data).then(res=>{
					if(res.data.status == '200'){
						this.collList = res.data.data
						
						
						if(this.collList.length>0){
							this.collList.map((item)=>{
								this.$set(item,'check',false)
							})
						}else{
							this.managed = true
						}
					}
					console.log(res)
				})
			},
			getNewList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/User/coll_lists','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					// if(this.collList.length == res.data.data.length){
					// 	// this.$util.showToast('没有更多了')	
					// 	return false
					// }
					this.page++
					this.collList = this.collList.concat(res.data.data)
				})
			},
			back(){
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			},
			selectedTap(item){
				let _this = this;
				// 记录选中的商品种类个数
				let num = 0;
				// 注意对比前后两次输出的结果
				console.log(item.check);
				if (typeof item.check == "undefined") {
					this.$set(item, "check", false);
					// 注意对比前后两次输出的结果
					console.log(item.check);
				} else {
					item.check = !item.check;
				}
				this.collList.forEach(function (item, value) {
					if (item.check) {
						num++;
					}
				})
				// 如果选中的商品种类个数等于商品列表（数组）的长度，修改全选框的全选标志；
				if (num == _this.collList.length) {
					this.totalSelect = true;
				} else {
					this.totalSelect = false;
				}
			},
			totalSelectedTap(){
				var _this = this;
				_this.totalSelect = !_this.totalSelect;
				this.collList.forEach(function (item, index) {
					if (typeof item.check == "undefined") {
						// 设置item的check属性
						_this.$set(item, "check", _this.totalSelect);
					} else {
						item.check = _this.totalSelect;
					}
				})
			},
			changeManage(){
				this.managed = !this.managed
			},
			toDetail(goodsId,colltype,targetid){
				if(colltype==1){	//普通商品
					uni.navigateTo({
						url:'/pages/index/detail?goodsid='+goodsId
					})
				}
				if(colltype==2){	//团购商品
					uni.navigateTo({
						url:'/pages/index/gorupBuy?groupid=' + targetid
					})
				}
				if(colltype==3){	//预售商品
					uni.navigateTo({
						url:'/pages/index/advanceBuy?presaleid='+targetid
					})
				}
				if(colltype==4){	//秒杀商品
					uni.navigateTo({
						url:'/pages/index/seckillBuy?seckillid='+targetid
					})
				}
				if(colltype==5){	//会员商品
					uni.navigateTo({
						url:'/pages/index/detail?goodsid='+goodsId
					})
				}
			},
			delColl(){
				this.hides('QSPopup')
				let goodsid = [];
				
				this.collList.map(item=>{
					if(item.check){
						goodsid.push(item.id)
					}
				})
				if(goodsid.length==0){
					return false;
				}
				let data = {
					token:uni.getStorageSync('token'),
					goods_id:goodsid.join(',')
				}
				http('/api/User/del_goods_coll','post',data).then(res=>{
					console.log(res)
					this.getList()
					
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #fff;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
		}
	}
	
	.manage{
		position: fixed;
		top:106upx;
		right: 30upx;
		z-index: 1000;
		font-size: 32upx;
		color: #ffffff;
	}
	.shop-wrap{
		padding:176upx 30upx 30upx;
		.spinfo{
			padding-left: 20upx;
		}
		.shop-item{
			padding: 20upx 0;
			margin-bottom: 8upx;
			border-radius: 5px;
			border-bottom: 1px solid #eeeeee;
			.select{
				width: 40upx;
				height: 40upx;
				margin:0 25upx;
				margin-top: 80upx;
			}
			background-color: #FFFFFF;
			.shpopimg{
				width: 200upx;
				height: 200upx;
				border-radius: 5px;
			}
			.zhubt{
				font-size: 32upx;
				color: #333;
				margin-top: 6upx;
			}
			.guige{
				font-size: 24upx;
				color: #939393;
				margin-top: 6upx;
				margin-bottom: 40upx;
			}
			.prquy{
				margin-top: 10upx;
			}
			.price{
				font-size: 36upx;
				// color: #FF0000;
			}
			.salenum{
				font-size: 30upx;
				color: #BBBBBB;
			}
			.nhprice{
				font-size: 24upx;
				color: #FF0000;
				margin:0 20upx
			}
		}
	}
	.blank{
		width: 100%;
		height: 100upx;
	}
	.coll-fotter{
		justify-content: space-between;
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		.total{
			display: flex;
			align-items: center;
			.select{
				width: 40upx;
				height: 40upx;
				margin:0 25upx;
			}
		}
		.del{
			width:240upx;
			height:100upx;
			background:rgba(251,65,66,1);
			font-size:36upx;
			font-weight:bold;
			line-height: 100upx;
			text-align: center;
			color: #FFFFFF;
		}
	}
	
	.content-del{
		height: 360upx;
		width: 670upx;
		background-color: white;
		border-radius: 10upx;
		.del-text{
			padding:60upx 20upx;
			height: 259upx;
			box-sizing: border-box;
			.del-text1{
				font-size: 40upx;
				font-weight: bold;
				text-align: center;
			}
			.del-text2{
				font-size: 32upx;
				text-align: center;
				margin-top: 40upx;
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			.del-btn-no{
				border-right: 1px solid #e5e5e5;
				color: #aaa;
				font-size: 32upx;
				flex: 1;
				text-align: center;
			}
			.del-btn-yes{
				color: #FB4142;
				font-size: 32upx;
				flex: 1;
				text-align: center;
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
	.item-num{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 16upx;
		.item-cost-price{
			font-size:26upx;
			line-height: 26upx;
			font-weight: bold;
			.symbol{
				font-size: 24upx;
				line-height: 24upx;
				// font-weight: normal;
			}
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
		padding-right: 10upx;
		margin-top: 10upx;
		position: relative;
		.item-vip-price{
			font-size:32upx;
			color: #ec614a;
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
				line-height: 26upx;
				
			}
			.recomon-prices{
				font-size: 38upx;
				
				
			}
			.recomon-price-img{
				width: 68upx;
				height: 76upx;
				// margin-left: 4upx;
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
			right: 0;
			top: -18upx;
		}
		
	}
</style>
