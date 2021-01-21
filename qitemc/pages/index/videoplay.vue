<template>
	<view class="">
		<web-view  :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		
		onLoad(option) {
			// uni.setNavigationBarTitle({
			//     title: ''
			// })
			// #ifdef APP-PLUS
			// var currentWebview = this.$mp.page.$getAppWebview()
			// setTimeout(()=>{
			// 	console.log(currentWebview.getTitleNView())
				
			// },1000)
		
			// #endif
			console.log(option)
			if(option.src){
				this.src = option.src
			}
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	.img{
		width: 32upx;
		height: 61upx;
		position: absolute;
		left: 56upx;
		top: 90upx;
		z-index: 10000;
	}
</style>
