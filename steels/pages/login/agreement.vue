<template>
	<view class="wrap">
		<view v-html="info"></view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				info:'',
				type:1
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
			}
			if(this.type == 0){
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
			}
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					type:this.type
				}
				http('/api/Login/userAgreement','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data.userAgreement
						if(this.info){
							let reg = new RegExp('<img','gi')
							this.info = this.info.replace(reg,'<img style="width:100%;vertical-align:top;"')
						}
					}
					console.log(res)
				})
			},
			
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 20upx;
	}
</style>
