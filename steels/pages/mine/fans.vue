<template>
	<view>
		<view class="item scale-1px-bottom disBetween" v-for="(item,index) in list" :key="index">
			<view class="disAlignCenter">
				<image :src="item.headimgurl" class="headimg" mode="" @click="toMyRelease(item)"></image>
				<view class="nickname" @click="toMyRelease(item)">
					{{item.nickname}}
				</view>
			</view>
			<view class="cancel" v-if="type == 1" @click="follow(item)">
				取消关注
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	export default {
		data() {
			return {
				type:1,//1关注   2粉丝
				page:1,
				pageSize:10,
				list:[],
				
			}
		},
		onLoad(option) {
			this.type = option.type
			if(this.type == 2){
				uni.setNavigationBarTitle({
					title:'我的粉丝'
				})
			}
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toMyRelease(item){
				uni.navigateTo({
					url:'/pages/mine/myRelease?id=' + item.user_id + '&nickname=' + item.nickname
				})
			},
			follow(info){
				this.$util.showLoading('请稍候...')
				let data = {
					follow_user_id:info.user_id,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/follow','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						this.page = 1
						this.getList()
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1,
					type:this.type,
					pagesize:10
				}
				http('/api/user/follow_data','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data
					}
					console.log(res)
				})
				
			},
			getNewList(){
				let newList = []
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page + 1,
					type:this.type,
					pagesize:10
				}
				http('/api/user/follow_data','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data
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
	}
</style>
