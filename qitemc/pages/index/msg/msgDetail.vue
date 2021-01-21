<template>
	<view>
		<view class="wraps">
			<!-- <view class="title">
				{{info.title}}
			</view> -->
			<view class="item">
				<view class="item-img">
					<image :src='imag+"new-notice.png"'></image>
				</view>
				<view class="item-txt">
					<view class="item-title">
						{{info.title}}
					</view>
					<view class="intr">
						<view v-html="info.content"></view>
					</view>
				</view>
			</view>
			
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
				info:{},
				listid:0
			}
		},
		onLoad(option) {
			this.listid = option.id
			this.getList()
		},
		methods:{
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					message_id:this.listid
				}
				http('/api/Message/getMessageInfo','post',data).then(res=>{
					this.info = res.data.data
					console.log(this.info)
					if(this.info.content){
						let reg = new RegExp('\r','gi')
						this.info.content = this.info.content.replace(reg,'<br>')
					}
				})
			},
			
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f3f3f8;
	}
	.wraps{
		padding: 30upx 60upx 20upx 20upx;
		box-sizing: border-box;
	}
	.item{
		display: flex;
		margin-top: 40upx;
		.item-img{
			image{
				width: 56upx;
				height: 50upx;
			}
		}
		.item-txt{
			width: 100%;
			margin-left: 20upx;
			.item-title{
				color: #b3b3b5;
				margin-top: -10upx;
			}
		}
	}
	.title{
		text-align: center;
		padding: 0 0 40upx 0;
		font-size: 36upx;
	}
	.intr{
		background-color: #fff;
		width: 88%;
		border-radius: 20upx;
		padding: 20upx;
		margin-top: 10upx;
	}
</style>

