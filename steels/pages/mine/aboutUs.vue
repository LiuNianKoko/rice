<template>
	<view>
		<view class="wrap">
			<view class="logo-wrap">
				<image src="/static/logo.png" class="logo" mode=""></image>
				<view class="font24 color-bbb">
					版本v{{ver}}
				</view>
			</view>
			<view class="set-item disBetween" v-for="(item,index) in list" :key="index" @click="toUseDetail(item.id)">
				<view class="font32">
					{{item.title}}
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
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
				ver:'1.0.0',
				list:[],
				
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			// this.plat = uni.getSystemInfoSync().platform
			this.ver = plus.runtime.version
			// #endif
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Setting/getAboutUs','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			toUseDetail(id){
				uni.navigateTo({
					url:'/pages/mine/useDetail?type=2&id=' + id
				})
			}
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 30upx;
	}
	.logo-wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 150upx 0 120upx 0;
		.logo{
			width: 140upx;
			height: 140upx;
			margin-bottom: 20upx;
		}
	}
	.set-item{
		padding: 30upx 0;
		border-bottom: 1px solid #F2F2F5;
		.right{
			width: 18upx;
			height: 30upx;
		}
	}
</style>
