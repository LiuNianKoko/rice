<template>
	<view>
		<view class="wrap">
			<view class="font44 fontBold text-center marginBottom20">
				{{info.title || ''}}
			</view>
			<view class="text-center color-gray font24 marginBottom30">
				{{info.create_time}}
			</view>
			<view class="">
				<view v-html="info.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				id:0,
				info:{},
				
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					message_id:this.id,
					token:uni.getStorageSync('token')
				}
				http('/api/Message/getMessageInfo','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data
						if(this.info.content){
							let reg = new RegExp('<img','gi')
							this.info.content = this.info.content.replace(reg,'<img style="width:100%;vertical-align: top;"')
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
		padding: 30upx;
	}
</style>
