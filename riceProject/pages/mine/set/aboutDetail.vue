<template>
	<view>
		<view class="wraps">
			<view class="title">
				{{info.title}}
			</view>
			<view class="intr">
				<view v-html="info.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				info:{},
				listid:0
			}
		},
		onLoad(option) {
			this.listid = option.id
			this.getList()
		},
		methods:{
			getList(){
				let data = {
					id:this.listid
				}
				http('/api/Setting/aboutUsDetails','post',data).then(res=>{
					this.info = res.data.data
					console.log(res)
				})
			},
			
		}
	}
</script>

<style lang="less">
	
	.wraps{
		padding: 20upx;
		box-sizing: border-box;
	}
	.title{
		text-align: center;
		padding: 0 0 40upx 0;
		font-size: 36upx;
	}
	.intr{
		font-size: 24upx;
		text-indent: 2em;
	}
</style>

