<template>
	<view>
		<view class="header-wrap">
			<view class="index-header">
				下载app
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="mainbox" >
			<!-- <image class="code" src="/static/downloadlink.png" mode=""></image> -->
			<!-- <image :src='imag+"15.jpg"' class="bg"></image>
			<image class="code" :src="code" mode=""></image> -->
			<image class="code-bg" :src='imag+"share-image-bj.png"'></image>
			<view class="code-wrap">
				<image class="code-bg2" :src='imag+"share-image-hz.png"'></image>
				<image class="code" :src="code"></image>
			</view>
			<!-- <view class="loadtxt">
				扫一扫下载APP
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
				code:'',
				imag: app.globalData.imag,
			}
		},
		onLoad() {
			this.getCode()
		},
		methods:{
			getCode(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.code = res.data.data.qr_code
					console.log(res)
				})
			},
			toMine(){
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #fff;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	.code-bg{
		
		position: absolute;
		width: 100%;
		height: calc(100% - 176upx);
		top: 176upx;
		left: 0;
		z-index: -2;
	}
	.code-wrap{
		position: absolute;
		left: 10%;
		top: 50%;
	}
	.code-bg2{
		
		width: 620upx;
		height: 620upx;
		transform: rotate(-16deg);
	}
	.mainbox{
		// position: absolute;
		// top: 50%;
		// left: 50%;
		// transform: translate(-50%,-50%);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.bg{
			width: 100%;
			height: 100%;
		}
		.code{
			position: absolute;
			top: 78upx;
			left: 126upx;
			width: 314upx;
			height: 314upx;
			transform: rotate(73deg);
		}
		.loadtxt{
			text-align: center;
			color: #000000;
			font-size: 36upx;
			margin-top: 30upx;
		}
	}
</style>
