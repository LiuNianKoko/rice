<template>
	<view>
		<view class="post-wrap" v-if="list.length > 0">
			<view class="" v-for="(item,index) in list" :key="index" @click="toForumDetail(item)">
				<view class="post-item" >
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
				<view class="lines"></view>
			</view>
		</view>
		<view class="nodata" v-else>
			暂无数据~
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				list:[],
				id:0,
				page:1
			}
		},
		onLoad(option) {
			this.id = option.id
			let title = option.title
			uni.setNavigationBarTitle({
				title:title
			})
		},
		onShow() {
			this.page = 1
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toForumDetail(item){
				uni.navigateTo({
					url:'/pages/forum/forumDetail?id=' + item.id
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
					token:uni.getStorageSync('token'),
					category_id:this.id
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
					token:uni.getStorageSync('token'),
					category_id:this.id
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
			toMyRelease(item){
				if(item.is_follow == 0){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/myRelease?id=' + item.user_id + '&nickname=' + item.nickname
					})
				}
				
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
	.lines{
		background: #F5F5F9;
		height: 20upx;
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
</style>
