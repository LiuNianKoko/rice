<template>
	<view class="">
		
		<!-- <view class=" baiku-header disflex" style="z-index: 999;">
			<view class="cafice" @click="back">
				<image src="/static/back-black.png" class="fenlixon"></image>
			</view>
			<view class="text flex-1">
				结算
			</view>
		</view> -->
	</view>
</template>
<script>
export default{
	data(){
		return {
			yhkurl:'',
			webviewStyles: {  
				top:'44px',  
				bottom:'66px',  
			 },  
		}
	},
	mounted(){
		
		
		this.yhkurl = this.$util.getStorage('yinhkanurl');
		console.log(this.yhkurl)
		var pages = getCurrentPages();
		var page = pages[pages.length - 1];
		var currentWebview = page.$getAppWebview();
		// var currentWebview = this.$mp.page.$getAppWebview(); 
		// this.yhkurl = this.$util.getStorage('yinhkanurl');
		var wb = plus.webview.create(this.yhkurl, '', {
		
			top: '64px',
			
			bottom: '0px'
		
		});
		
		currentWebview.append(wb);
	},
	methods:{
		back(){
				uni.navigateBack();
		}
	}
}
</script>

<style lang="scss">
	.baiku-header{
		background:rgb(34, 100, 199);
		.cafice{
			width: 90upx;
			height: 60upx;
			position: fixed;
			left: 14upx;
			top: 70upx;
		}
		.fenlixon{
			width: 42upx;
			height: 42upx;
		}
		.text{
			text-align: center;
			font-size: 36upx;
			color: #fff;
			line-height: 80upx;
		}
		.oparteText{
			width: 100upx;
			height: 80upx;
			line-height: 80upx;
			color: #fff;
			position: fixed;
			right: 0;
			font-size: 30upx;
		}
	}
</style>
