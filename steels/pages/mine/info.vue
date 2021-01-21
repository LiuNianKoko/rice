<template>
	<view>
		<view class="wrap">
			<view class="info-item disBetween">
				<view class="info-left font32">
					用户头像
				</view>
				<view class="info-right">
					<image :src="info.headimgurl" class="headimg" mode=""></image>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					昵称
				</view>
				<view class="info-right font32 color-gray">
					{{info.nickname || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					个性签名
				</view>
				<view class="info-right font32 color-gray paddingLeft20">
					{{info.introduce || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					绑定手机
				</view>
				<view class="info-right font32 color-gray">
					{{info.phone || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					性别
				</view>
				<view class="info-right font32 color-gray">
					{{info.sex == 1?'男':'女' || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					地区
				</view>
				<view class="info-right font32 color-gray">
					{{info.region || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					生日
				</view>
				<view class="info-right font32 color-gray">
					{{info.birthday || ''}}
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					邮箱
				</view>
				<view class="info-right font32 color-gray">
					{{info.mail || ''}}
				</view>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn disCenter" @click="toEdit">
				编辑
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
			this.getMine()
		},
		methods: {
			toEdit(){
				uni.navigateTo({
					url:'/pages/mine/editInfo'
				})
			},
			getMine(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_user_info','post',data).then(res=>{
					if(res.status==200){
						this.info = res.data
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding-left: 30upx;
	}
	.info-item{
		padding: 30upx 30upx 30upx 0;
		border-bottom: 1px solid #F2F2F5;
		.headimg{
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
		}
		.info-left{
			font-weight: 500;
			flex: none;
		}
	}
	.blank{
		height: 110upx;
	}
	.btn-wrap{
		width: 100%;
		padding: 10upx 32upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 119;
		.btn{
			background:#181C62;
			height: 90upx;
			border-radius: 10upx;
			color: #fff;
			font-size: 32upx;
		}
	}
</style>
