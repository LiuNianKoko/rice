<template>
	<view>
		<view class="wrap">
			<view class="msg-item disFlex scale-1px-bottom" @click="toMsgList(1)">
				<view class="disCenter paddingRight20">
					<image src="/static/msg.png" class="msg-icon" mode=""></image>
				</view>
				<view class="msg-txt width100">
					<view class="disBetween width100">
						<view class="msg-read-wrap fontBold">
							系统消息
							<view class="msg-read" v-if="info.messageList.is_look == 1">
								
							</view>
						</view>
						<view class="color-bbb font24 scale09">
							{{info.messageList.create_time || ''}}
						</view>
					</view>
					<view class="line1 font24 color-999 scale09 scaleLeft">
						{{info.messageList.title || '暂无最新消息'}}
					</view>
				</view>
			</view>
			<view class="msg-item disFlex scale-1px-bottom" @click="toMsgList(2)">
				<view class="disCenter paddingRight20">
					<image src="/static/msg.png" class="msg-icon" mode=""></image>
				</view>
				<view class="msg-txt width100">
					<view class="disBetween width100">
						<view class="msg-read-wrap fontBold">
							站内信
							<view class="msg-read" v-if="info.noticeList.is_look == 1">
								
							</view>
						</view>
						<view class="color-bbb font24 scale09">
							{{info.noticeList.create_time || ''}}
						</view>
					</view>
					<view class="line1 font24 color-999 scale09 scaleLeft">
						{{info.noticeList.title || '暂无最新消息'}}
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
				info:{},
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			toMsgList(type){
				uni.navigateTo({
					url:'/pages/home/msgList?type=' + type
				})
			},
			getInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Message/getMessageFind','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data
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
		// border-bottom: 1px solid #ddd;
		.msg-icon{
			width: 80upx;
			height: 80upx;
			flex: none;
		}
		.msg-txt{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.msg-read-wrap{
				position: relative;
				.msg-read{
					background: #FB4142;
					width: 14upx;
					height: 14upx;
					border-radius: 50%;
					position: absolute;
					z-index: 10;
					right: -8upx;
					top: 2upx;
				}
			}
		}
	}
</style>
