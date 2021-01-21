<template>
	<view>
		<view class="pro-wrap disAlignCenter">
			<view class="pro-item" :class="current == 1?'pro-act':''" @click="changeCurrent(1)">
				货物
			</view>
			<view class="pro-item" :class="current == 2?'pro-act':''" @click="changeCurrent(2)">
				帖子
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<view class="hw-wrap" v-if="current == 1&&list.length > 0">
			<view class="hw-item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="hw-img-wrap">
					<image :src="item.cover" class="hw-img" mode="aspectFill"></image>
				</view>
				<view class="font30 fontBold line2 marginBottom20 minH40">
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
		<view class="nodata" v-if="current == 1&&list.length == 0">
			暂无数据~
		</view>
		<view class="post-wrap" v-if="current == 2&&list.length > 0">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="post-item" @click="toForumDetail(item)">
					<view class="post-top disFlex marginBottom20">
						<image :src="item.headimgurl" class="headimg" mode=""></image>
						<view class="paddingLeft20">
							<view class="font32 fontBold marginBottom5">
								{{item.nickname}}
							</view>
							<view class="font24 color-gray">
								{{item.add_time}}
							</view>
						</view>
					</view>
					<view class="marginBottom20 line2">
						{{item.content}}
					</view>
					<view class="post-img-wrap marginBottom20">
						<view class="img-box" v-if="item.img_arr.length==1">
							<view class="imgs disCenter" v-for="(imgs,imgIndex) in item.img_arr" :key="imgIndex">
								<image :src="imgs" class="one-img" mode="aspectFill"></image>
							</view>
						</view>
						<view class="img-boxs" v-if="item.img_arr.length>1">
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
				<view class="lines"></view>
			</view>
		</view>
		<view class="nodata" v-if="current == 2&&list.length == 0">
			暂无数据~
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				current:1,//1货物  2帖子
				list:[],
				page:1,
				otherId:0,//其他用户id
			}
		},
		onLoad(option) {
			if(option.id){
				this.otherId = option.id
				let title = option.nickname + '的发布'
				uni.setNavigationBarTitle({
					title:title
				})
			}
			
		},
		onShow() {
			this.page = 1
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			changeCurrent(type){
				this.page = 1
				this.current = type
				this.getList()
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id=' + item.id
				})
			},
			toForumDetail(item){
				uni.navigateTo({
					url:'/pages/forum/forumDetail?id=' + item.id
				})
			},
			getList(){
				let data = {
					paging:10,
					page:1,
					type:this.current,
					token:uni.getStorageSync('token')
				}
				if(this.otherId != 0){
					data = {
						...data,
						user_id:this.otherId
					}
				}
				http('/api/User/user_publish_list','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.list.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					paging:10,
					page:this.page + 1,
					type:this.current,
					token:uni.getStorageSync('token')
				}
				if(this.otherId != 0){
					data = {
						...data,
						user_id:this.otherId
					}
				}
				http('/api/User/user_publish_list','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.list.data
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
	.pro-wrap{
		padding: 0 32upx;
		height: 100upx;
		width: 100%;
		position: fixed;
		left: 0;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
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
	.lines{
		background: #F5F5F9;
		height: 20upx;
	}
	.post-item{
		padding: 32upx;
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
</style>
