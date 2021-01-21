<template>
	<view>
		<view class="info-wrap" v-if="list.length > 0">
			<view class="info-item" v-for="(item,index) in list" :key="index" @click="toInfoDetail(item)">
				<view class="info-img-wrap">
					<image :src="item.cover" class="info-img" mode="aspectFill"></image>
				</view>
				<view class="info-text width100 paddingLeft20">
					<view class="font32 fontBold line2">
						{{item.title || ''}}
					</view>
					<view class="font24 color-gray line1">
						{{item.details || ''}}
					</view>
					<view class="disBetween font24 color-gray">
						<view class="disAlignCenter">
							<image src="/static/eyes.png" class="info-eye" mode=""></image>
							{{item.look_num || 0}}
						</view>
						<view class="">
							{{item.add_time || ''}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-else>
			暂无数据~
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				list:[],
				page:1,
				
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			toInfoDetail(item){
				uni.navigateTo({
					url:'/pages/home/infoDetail?id=' + item.id
				})
			},
			getList(){
				let data = {
					paging:10,
					page:1,
					is_recommend:0,
					token:uni.getStorageSync('token')
				}
				http('/api/index/recommend_article_list','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.article_list.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					paging:10,
					page:this.page + 1,
					is_recommend:0,
					token:uni.getStorageSync('token')
				}
				http('/api/index/recommend_article_list','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.article_list.data
						this.list = this.list.concat(newList)
						this.page++
					}
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="less">
	.info-wrap{
		padding: 20upx 30upx;
	}
	.info-item{
		padding: 30upx 0;
		display: flex;
		.info-img-wrap{
			width: 230upx;
			height: 160upx;
			.info-img{
				width: 230upx;
				height: 160upx;
				border-radius: 10upx;
			}
		}
		.info-text{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.info-eye{
			width: 28upx;
			height: 24upx;
			margin-right: 6upx;
		}
	}
</style>
