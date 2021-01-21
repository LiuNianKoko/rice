<template>
	<view class="content">
		<web-view :webview-styles="webviewStyles" :src="src"></web-view>
	</view>
</template>
<style>
	.content{}
</style>
<script>
	export default {
		data() {
			return {
				src:"http://byt.zoosnet.net/LR/Chatpre.aspx?id=BYT11384054&lng=cn",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(){
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
/deep/ .uni-input-input {font-size:32upx}
/deep/ .uni-radio-input-checked{background-color:rgb(110,43,34) !important;border:2upx solid white !important}
.content .html{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>