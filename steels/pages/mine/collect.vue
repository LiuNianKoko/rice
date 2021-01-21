<template>
	<view>
		<view class="title disBetween"  :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back-black.png" class="back" mode=""></image>
			</view>
			<view class="disCenter font40 fontBold title-txt">
				我的收藏
			</view>
			<view></view>
			<view class="font32 color-steel title-act" v-if="list.length > 0" @click="changeCol">
				{{col?'编辑':'完成'}}
			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="pro-wrap disAlignCenter" :style="[{top:CustomBar + 'px'}]">
			<view class="pro-item" :class="current == 1?'pro-act':''" @click="changeCurrent(1)">
				货物
			</view>
			<view class="pro-item" :class="current == 3?'pro-act':''" @click="changeCurrent(3)">
				帖子
			</view>
			<view class="pro-item" :class="current == 2?'pro-act':''" @click="changeCurrent(2)">
				资讯
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<view class="hw-wrap" v-if="current == 1 && list.length > 0">
			<view class="disAlignCenter" v-for="(item,index) in list" :key="index">
				<view class="sel-wrap padr30" v-if="!col" @click="selectedTap(item)">
					<image :src="item.check?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
				</view>
				<view class="hw-item" @click="toDetail(item)">
					<view class="hw-img-wrap">
						<image :src="item.cover" class="hw-img" mode="aspectFill"></image>
					</view>
					<view class="hw-text">
						<view class="font30 fontBold line2">
							{{item.goods_name || ''}}
						</view>
						<view class="line2 color-gray">
							{{item.desc || ''}}
						</view>
						<view class="disBetween">
							<view class="font36 fontBold color-red">
								¥{{item.price || 0}}
							</view>
							<view class="font24 color-gray">
								销量{{item.show_alsalenum || 0}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-if="current == 1 && list.length == 0">
			暂无数据~
		</view>
		<view class="" v-if="current == 3 && list.length > 0">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="disAlignCenter">
					<view class="sel-wrap padl30" v-if="!col" @click="selectedTap(item)">
						<image :src="item.check?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
					</view>
					<view class="post-item" @click="toForumDetail(item)">
						<view class="post-top disFlex marginBottom20">
							<image :src="item.headimgurl" class="headimg" mode=""></image>
							<view class="paddingLeft20">
								<view class="font32 fontBold marginBottom5">
									{{item.nickname}}
								</view>
								<view class="font24 color-gray">
									{{item.createtime}}
								</view>
							</view>
						</view>
						<view class="marginBottom20 line2">
							{{item.content}}
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
				<view class="lines"></view>
			</view>
		</view>
		<view class="nodata" v-if="current == 3 && list.length == 0">
			暂无数据~
		</view>
		
		<view class="" v-if="current == 2&&list.length > 0">
			<view class="disAlignCenter" v-for="(item,index) in list" :key="index">
				<view class="sel-wrap padl30" v-if="!col" @click="selectedTap(item)">
					<image :src="item.check?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
				</view>
				<view class="info-item" @click="toInfoDetail(item)">
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
								{{item.add_time}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-if="current == 2 && list.length == 0">
			暂无数据~
		</view>
		<view class="blank" v-if="!col && list.length > 0"></view>
		<view class="bot-wrap disBetween" v-if="!col && list.length > 0">
			<view class="bot-l disCenter" @click="totalSelectedTap">
				<image :src="totalSel?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
				<view class="all-sel">
					全选
				</view>
			</view>
			<view class="bot-r disCenter" @click="del">
				移除({{num}})
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
				list:[],
				current:1,//1货物  3帖子  2资讯
				col:true,//编辑  完成
				totalSel:false,//全选
				page:1,
				num:0,//删除个数
				selectArr:[],//选中缓存
			}
		},
		onLoad() {
			// this.getList()
		},
		onShow() {
			this.page = 1
			this.getList()
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
			changeCol(){
				this.col = !this.col
			},
			changeCurrent(type){
				this.page = 1
				this.list = []
				this.current = type
				this.totalSel = false
				this.selectArr = []
				this.num = 0
				this.getList()
			},
			toInfoDetail(item){
				uni.navigateTo({
					url:'/pages/home/infoDetail?id=' + item.goods_id
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id=' + item.goods_id
				})
			},
			toForumDetail(item){
				uni.navigateTo({
					url:'/pages/forum/forumDetail?id=' + item.goods_id
				})
			},
			// 选中
			selectedTap(item){
				let _this = this;
				let num = 0;
				_this.selectArr = []
				if(typeof item.check == "undefined"){
					_this.$set(item, "check", false);
				}else{
					item.check = !item.check;
					// _this.list.forEach(function (item, value) {
						
					// 	if (item.check) {
					// 		selectArr.push(item.goods_id)
					// 	}
					// })
				}
				_this.list.forEach(function (item, value) {
					if (item.check) {
						num++;
						_this.selectArr.push(item.id)
					}
				})
				_this.num = _this.selectArr.length
				if (num == _this.list.length) {
					_this.totalSel = true;
				} else {
					_this.totalSel = false;
				}
			},
			// 全选
			totalSelectedTap(){
				let _this = this;
				_this.selectArr = []
				_this.totalSel = !_this.totalSel;
				_this.list.forEach(function (item, index) {
					if (typeof item.check == "undefined") {
						// 设置item的check属性
						_this.$set(item, "check", _this.totalSel);
						// _this.list.forEach(function (item, value) {
							if (item.check) {
								_this.selectArr.push(item.id)
							}
						// })
					} else {
						item.check = _this.totalSel;
						// _this.list.forEach(function (item, value) {
							if (item.check) {
								_this.selectArr.push(item.id)
							}
						// })
					}
				})
				_this.num = _this.selectArr.length
			},
			// 移除
			del(){
				
				if(this.selectArr.length==0){
					return false;
				}
				let data = {
					token:uni.getStorageSync('token'),
					coll_id:this.selectArr.join(',')
				}
				http('/api/User/del_goods_coll','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.message || res.msg)
						this.getList()
						this.totalSel = false
						this.num = 0
						this.selectArr = []
					}else{
						this.$util.showToast(res.message || res.msg)
					}
					
				})
				
			},
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1,
					type:this.current,
					pagesize:10
				}
				http('/api/User/coll_lists','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.collection_list
						this.list.map((item)=>{
							this.$set(item,'check',false)
						})
					}
					console.log(res)
				})
				
			},
			getNewList(){
				let newList = []
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page + 1,
					type:this.current,
					pagesize:10
				}
				http('/api/User/coll_lists','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.collection_list
						newList.map((item)=>{
							this.$set(item,'check',false)
						})
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
		.title-txt{
			padding-right: 32upx;
		}
		.title-act{
			position: absolute;
			right: 32upx;
			bottom: 20upx;
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
	.hw-wrap{
		padding: 0 32upx;
	}
	.hw-item{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		.hw-img-wrap{
			width: 220upx;
			height: 220upx;
			.hw-img{
				width: 220upx;
				height: 220upx;
				border-radius: 10upx;
			}
		}
		.hw-text{
			width: 100%;
			padding-left: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	.lines{
		background: #F5F5F9;
		height: 20upx;
	}
	.padl30{
		padding-left: 30upx;
	}
	.padr30{
		padding-right: 30upx;
	}
	.post-item{
		padding: 30upx;
		width: 100%;
		.post-top{
			
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
					height: 220upx;
					border-radius: 6upx;
				}
			}
		}
		.icons{
			width: 36upx;
			height: 36upx;
		}
	}
	.info-item{
		padding: 30upx;
		width: 100%;
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
	.sel-wrap{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.sel{
		width: 32upx;
		height: 32upx;
	}
	.blank{
		height: 90upx;
	}
	.bot-wrap{
		height: 90upx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 119;
		background-color: #F5F5F9;
		.bot-l{
			height: 90upx;
			padding: 0 30upx;
			.all-sel{
				margin-left: 30upx;
				color: #BCBCBC;
			}
		}
		.bot-r{
			width: 250upx;
			height: 90upx;
			font-size: 32upx;
			color: #fff;
			background: #181C62;
		}
	}
</style>
