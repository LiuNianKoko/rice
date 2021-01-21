<template>
	<view>
		<web-view  :src="src"></web-view>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	export default {
		data() {
			return {
				src:'',
			}
		},
		onLoad(option) {
			if(option.src){
				this.src = option.src
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	
</style>
