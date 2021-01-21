<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor,borderBottom?'scale-1px-bot':'']">
				<view class="action disCenter" @tap="BackPage" v-if="isBack">
					<!-- <text class="cuIcon-back"></text> -->
					<!-- <image src="/static/back-white.png" class="back" ></image> -->
					<image src="/static/back.png" class="back" v-if="isBlack"></image>
					<image src="/static/back-white.png" class="back" v-if="!isBlack"></image>
					<slot name="backText"></slot>
				</view>
				<view class="content over" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isBlack: {
				type: [Boolean, String],
				default: true
			},
			borderBottom: {
				type: [String],
				default: ''
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less">
	 @color: #dbdbdb;
	.scale-1px-bot{
		position: relative;
		border: none;
	}
	.scale-1px-bot::after{
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		background: @color;
		height: 1px;
		width: 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
	}
	.cuIcon-back{
		color: #999999;
		font-size: 36upx;
	}
	.cu-custom {
		display: block;
		position: relative;
	}
	
	.cu-custom .cu-bar .content {
		/* width: calc(100% - 440upx); */
		width: 60%;
		text-align: center;
		font-size: 32upx;
	}
	.cu-bar.fixed,
	.nav.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1024;
		box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	}
	/* #ifdef MP-ALIPAY */
	.cu-custom .cu-bar .action .cuIcon-back {
		opacity: 0;
	}
	
	/* #endif */
	.action{
		width: 40upx;
		height: 32upx;
	}
	.action .back{
		width: 18upx;
		height: 32upx;
	}
	
	.cu-custom .cu-bar .content image {
		height: 60upx;
		width: 240upx;
	}
	
	.cu-custom .cu-bar {
		min-height: 0px;
		/* #ifdef MP-WEIXIN */
		padding-right: 220upx;
		/* #endif */
		/* #ifdef MP-ALIPAY */
		padding-right: 150upx;
		/* #endif */
		box-shadow: 0upx 0upx 0upx;
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20upx;
		/* box-shadow:0px -5px 10px -2px rgba(0,0,0,0.5); */
	}
	
	.cu-custom .cu-bar .border-custom {
		position: relative;
		background: rgba(0, 0, 0, 0.15);
		border-radius: 1000upx;
		height: 30px;
	}
	
	.cu-custom .cu-bar .border-custom::after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		border: 1upx solid #ffffff;
		opacity: 0.5;
	}
	
	.cu-custom .cu-bar .border-custom::before {
		content: " ";
		width: 1upx;
		height: 110%;
		position: absolute;
		top: 22.5%;
		left: 0;
		right: 0;
		margin: auto;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		opacity: 0.6;
		background-color: #ffffff;
	}
	
	.cu-custom .cu-bar .border-custom text {
		display: block;
		flex: 1;
		margin: auto !important;
		text-align: center;
		font-size: 34upx;
	}
	.over{
		overflow: visible;
	}
</style>
