<template>
	<view>
		<view class="blank"></view>
		<view class="msg-wraps">
			<view class="msg-item scale-1px-bottom" @click="toSystemMsg">
				<view class="msg-img">
					<image :src='imag+"new-notice.png"'></image>
					<view class="redcircle" v-if="systeminfo.is_look==1"></view>
				</view>
				<view class="msg-text">
					<view class="msg-title">
						<text class="msg-title-l">系统消息</text>
						<text class="msg-title-r" v-if="systeminfo.create_time">{{systeminfo.create_time}}</text>
					</view>
					<view class="msg-intr line1" v-if="systeminfo.title">
						{{systeminfo.title}}
					</view>
					<view class="msg-intr line1" v-else>
						暂无消息~
					</view>
				</view>
			</view>
			<!-- <view class="msg-item scale-1px-bottom">
				<view class="msg-img">
					<image src="/static/service-msg.png"></image>
					
				</view>
				<view class="msg-text">
					<view class="msg-title">
						<text class="msg-title-l">客服消息</text>
						<text class="msg-title-r">2019-09-01</text>
					</view>
					<view class="msg-intr line1">
						亲，在的哦！请问有什么可以帮您...
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	export default{
		data(){
			return{
				imag: app.globalData.imag,
				systeminfo:{}
			}
		},
		onLoad() {
			this.getSystemInfo()
		},
		onShow() {
			this.getSystemInfo()
		},
		methods:{
			toSystemMsg(){
				uni.navigateTo({
					url:'/pages/index/msg/systemMsg'
				})
			},
			getSystemInfo(){
				let data = {
						token:uni.getStorageSync('token')
					}
				http('/api/Message/getMessageFind','post',data).then(res=>{
					console.log(res)
					this.systeminfo = res.data.data
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
	}
	.msg-wraps{
		padding: 0 30upx;
		box-sizing: border-box;
		.msg-item{
			padding: 40upx 0;
			box-sizing: border-box;
			display: flex;
			
			.msg-img{
				position: relative;
				image{
					width: 76upx;
					height: 76upx;
				}
				.redcircle{
					width: 16upx;
					height: 16upx;
					border-radius: 50%;
					background-color: #f31616;
					position: absolute;
					top: 0;
					right: 4upx;
				}
			}
			.msg-text{
				margin-left: 20upx;
				flex: 1;
				.msg-title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 4upx;
					.msg-title-l{
						font-size: 30upx;
					}
					.msg-title-r{
						color: #bbbbbb;
						font-size: 24upx;
						/* #ifdef APP-PLUS */
						font-size: 20upx;
						/* #endif */
					}
				}
				.msg-intr{
					margin-top: 8upx;
					color: #bbbbbb;
					font-size: 24upx;
					/* #ifdef APP-PLUS */
					margin-top: 20upx;
					/* #endif */
				}
			}
		}
	}
</style>
