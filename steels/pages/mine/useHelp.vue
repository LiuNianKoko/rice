<template>
	<view class="wrap">
		<view class="item" v-for="(item,index) in list" :key="index" @click="toUseDetail(item.id)">
			{{index+1}}、{{item.title}}
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Setting/getUseHelp','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			toUseDetail(id){
				uni.navigateTo({
					url:'/pages/mine/useDetail?type=1&id=' + id
				})
			}
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 20upx;
	}
	.item{
		padding: 20upx 0;
	}
</style>
