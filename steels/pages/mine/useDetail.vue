<template>
	<view class="wrap">
		<view v-html="content"></view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				type:1,
				id:0,
				content:'',
				title:''
			}
		},
		onLoad(option) {
			this.type = option.type
			this.id = option.id
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					token:uni.getStorageSync('token'),
					id:this.id
				}
				let url = ''
				if(this.type == 1){
					url = '/api/Setting/useHelpDetails'
				}else{
					url = '/api/Setting/aboutUsDetails'
				}
				http(url,'post',data).then(res=>{
					if(res.status == 200){
						this.content = res.data.content
						this.title = res.data.title
						uni.setNavigationBarTitle({
							title:this.title
						})
						if(this.content){
							let reg = new RegExp('<img','gi')
							this.content = this.content.replace(reg,'<img style="width:100%;vertical-align: top;"')
							let reg2 = new RegExp('\n','gi')
							this.content = this.content.replace(reg2,'<br>')
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
