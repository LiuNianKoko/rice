<template>
	<view class="content">
		<cu-custom bgColor="bgF4" borderBottom="#dbdbdb" :isBack="true"><block slot="backText"></block><block slot="content">消息通知</block></cu-custom>
		<view class="" v-if="list.length > 0">
			<view class="msg-item" v-for="(item,index) in list" :key="index">
				<view class="msg-time">
					{{item.createtime}}
				</view>
				<view class="msg-text">
					<view class="font32 fontBold marginBottom20">
						系统通知
					</view>
					<view class="disFlex" @click="toOrderDetail(item)">
						<view class="msg-img-wrap">
							<image :src="item.cover" class="msg-img"></image>
						</view>
						<view class="msg-intr-wrap width100">
							<view class="msg-intr">
								{{item.title}}
							</view>
							<view class="line1 msg-intr">
								{{item.content}}
							</view>
							<view class="msg-check">
								查看订单详情
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="nodata" v-else>
			暂无消息~
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp()
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				page:1,
				list:[],
				
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toOrderDetail(item){
				uni.navigateTo({
					url:'/pages/mine/orderDetail?id=' + item.order_id
				})
			},
			getList(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/users/message_list','post',data).then(res=>{
					if(res.code == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/users/message_list','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data
						
						this.list = this.list.concat(newList)
						this.page++
					}
					
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.msg-item{
		padding: 30upx 25upx;
		.msg-time{
			font-size: 26upx;
			color: #636363;
			margin-bottom: 40upx;
			text-align: center;
		}
		.msg-text{
			background-color: #fff;
			padding: 22upx 24upx;
			border-radius: 25upx;
			
			.msg-img-wrap{
				width: 132upx;
				height: 132upx;
				.msg-img{
					width: 132upx;
					height: 132upx;
					
				}
			}
			.msg-intr-wrap{
				background-color: #f8f8f8;
				padding: 12upx 14upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.msg-intr{
					font-size: 25upx;
					color: #858585;
				}
				.msg-check{
					font-size: 24upx;
					color: #EB7A8D;
					text-align: right;
				}
			}
		}
	}
</style>
