<template>
	<view>
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
			console.log(option)
			if(option.src){
				this.src = option.src
			}
			// uni.setNavigationBarTitle({
			//     title: option.title
			// })
			
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
