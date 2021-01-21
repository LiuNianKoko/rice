<template>
	<view class="wrap">
		<image src="/static/success-bg.png" class="bg"></image>
		<view class="text-wrap text-center">
			<view v-html="rule"></view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				rule:''
			}
		},
		onLoad() {
			this.getBg()
		},
		methods: {
			getBg(){
				http('/api/setting/getIndex').then(res=>{
					console.log(res)
					if(res.sta == 200){
						this.rule = res.data.tips
						this.rule = this.rule.replace(/\r/g,'<br>')
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	
	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.text-wrap{
		padding:170upx 142upx;
		font-size: 34upx;
		color: #445056;
		// font-weight: bold;
		line-height: 54upx;
	}
	
</style>
