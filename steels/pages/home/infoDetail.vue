<template>
	<view>
		<view class="wrap">
			<view class="font44 fontBold text-center marginBottom20">
				{{info.title || ''}}
			</view>
			<view class="text-center color-gray font24 marginBottom30">
				发布人：{{info.publisher}} | {{info.add_time || ''}}
			</view>
			<view class="">
				<view v-html="info.content"></view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn disCenter" @click="coll">
				{{info.is_collection == 0?'收藏':'已收藏'}}
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				info:{},
				id:'',
				
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		methods: {
			getInfo(){
				let data = {
					article_id:this.id,
					token:uni.getStorageSync('token')
				}
				http('/api/index/article_details','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data.article_list
						if(this.info.content){
							let reg = new RegExp('<img','gi')
							this.info.content = this.info.content.replace(reg,'<img style="width:100%;vertical-align: top;"')
						}
					}
					console.log(res)
				})
			},
			coll(){
				this.$util.showLoading('请稍候...')
				let data = {
					type:2,
					gid:this.info.id,
					token:uni.getStorageSync('token')
				}
				http('/api/User/coll_goods','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						this.getInfo()
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 32upx;
	}
	
	
	.blank{
		height: 110upx;
	}
	.btn-wrap{
		width: 100%;
		padding: 10upx 32upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 119;
		.btn{
			background:#181C62;
			height: 90upx;
			border-radius: 10upx;
			color: #fff;
			font-size: 32upx;
		}
	}
</style>
