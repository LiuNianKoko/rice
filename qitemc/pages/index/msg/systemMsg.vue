<template>
	<view>
		<view class="blank"></view>
		
		<view class="system-wraps" v-if="list.length > 0">
			<view class="system-item scale-1px-bottom" v-for="item in list" :key="item.id" @click="toMsgDetail(item.id)">
				<view class="item-img">
					<image :src='imag+"new-notice.png"'></image>
				</view>
				<view >
					<view class="system-text">
						<view class="system-title">
							{{item.title}}
							<view class="redcircle" v-if="item.is_read==0"></view>
						</view>
						<!-- <view class="system-time">
							{{item.create_time}}
						</view> -->
					</view>
					<!-- <view class="system-intr">
						{{item.content}}
					</view> -->
				</view>
				
			</view>
		</view>
		<view class="nodata" v-else>暂无消息~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	export default{
		data(){
			return{
				imag: app.globalData.imag,
				list:[],
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
			toMsgDetail(id){
				uni.navigateTo({
					url:'/pages/index/msg/msgDetail?id='+id
				})
			},
			getList(){
				let that = this
				
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/Message/getMessageList','post',data).then(res=>{
					if(res.data.status == '200'){
						that.list = res.data.data.data
					}
					console.log(res)
				})
			},
			getNewList(){
				
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/Message/getMessageList','post',data).then(res=>{
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page> res.data.data.data.length){
						// this.$util.showToast('没有更多了')	
						return false
					}
					this.page++
					this.list = this.list.concat(res.data.data.data.data)
				})
			}
		}
	}
</script>

<style lang="less">
	.blank{
		position: fixed;
		top: 88upx;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #f2f2f5;
		/* #ifdef APP-PLUS */
			top: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
			top: 0;
		/* #endif */
	}
	.item-img{
		image{
			width: 68upx;
			height: 64upx;
			margin-right: 40upx;
		}
	}
	.system-wraps{
		padding: 0 30upx;
		box-sizing: border-box;
		.system-item{
			display: flex;
			align-items: center;
			padding:30upx;
			margin-top: 20upx;
			box-sizing: border-box;
			box-shadow:0px 10upx 50upx 0px rgba(0,71,25,0.1);
			.system-text{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.system-title{
					font-size: 32upx;
					position: relative;
					.redcircle{
						width: 16upx;
						height: 16upx;
						border-radius: 50%;
						background-color: #f31616;
						position: absolute;
						top: 2upx;
						left: -8upx;
					}
				}
				.system-time{
					color: #bbbbbb;
					font-size: 24upx;
				}
			}
			.system-intr{
				margin-top: 12upx;
				color: #bbbbbb;
				font-size: 24upx;
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
</style>