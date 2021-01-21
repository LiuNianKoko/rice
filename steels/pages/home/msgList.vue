<template>
	<view>
		<view class="wrap">
			<view class="msg-item" v-for="(item,index) in list" :key="index">
				<view class="font24 color-bbb marginBottom15 disCenter">
					{{item.create_time || ''}}
				</view>
				<view class="msg-main" @click="toMsgDetail(item)">
					<view class="disBetween">
						<view class="fontBold color-333 line1">
							{{item.title || ''}}
						</view>
						<view class="msg-read" v-if="item.is_read == 0">
							
						</view>
					</view>
					<view class="font24 color-333 msg-intr line2">
						{{item.describe|| ''}}
					</view>
					<view class="disBetween paddingTop20 scale-1px-top">
						<view class="color-bbb font24">
							查看详情
						</view>
						<image src="/static/right-gray-sm.png" class="right-gray" mode=""></image>
					</view>
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
				type:1,
				list:[],
				page:1
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toMsgDetail(item){
				if(item.message_type == 3 || item.message_type == 4){
					this.getInfos(item.id)
					uni.navigateTo({
						url:'/pages/forum/forumDetail?id=' + item.message_id
					})
				}else if(item.message_type == 5){
					this.getInfos(item.id)
					uni.navigateTo({
						url:'/pages/home/detail?id=' + item.message_id
					})
				}else{
					uni.navigateTo({
						url:'/pages/home/msgDetail?id=' + item.id
					})
				}
			},
			getInfos(id){
				let data = {
					message_id:id,
					token:uni.getStorageSync('token')
				}
				http('/api/Message/getMessageInfo','post',data).then(res=>{
					if(res.status == 200){
					}
					console.log(res)
				})
			},
			getList(){
				let data = {
					type:this.type,
					page:1,
					token:uni.getStorageSync('token')
				}
				http('/api/Message/getMessageList','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					type:this.type,
					page:this.page + 1,
					token:uni.getStorageSync('token')
				}
				http('/api/Message/getMessageList','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.data
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
	.wrap{
		padding: 30upx;
	}
	.msg-item{
		padding: 30upx 0;
		margin-bottom: 10upx;
		.msg-main{
			padding: 30upx;
			box-shadow: 0px 6upx 20upx 0px rgba(48, 49, 59, 0.1);
			border-radius: 10upx;
			.msg-read{
				background: #FB4142;
				width: 12upx;
				height: 12upx;
				border-radius: 50%;
			}
			.msg-intr{
				margin: 25upx 0;
			}
			.right-gray{
				width: 12upx;
				height: 22upx;
			}
		}
	}
</style>
