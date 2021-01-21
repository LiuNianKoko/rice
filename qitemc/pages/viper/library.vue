<template>
	<view class="lib-wraps">
		<view v-if="libList.length > 0">
			<view class="lib-item" @click="toLibDetail(item.id)" v-for="item in libList" :key="item.id" >
				<view class="lib-img">
					<image :src="item.cover"></image>
				</view>
				<view class="lib-text">
					<view class="lib-title line1">
						{{item.title}}
					</view>
					<view class="lib-intr line2">
						{{item.details}}
					</view>
					<view class="lib-time">
						发布时间:{{item.add_time}}
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-else>暂无数据~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				libList:[],
				page:1
			}
		},
		onLoad() {
			this.getLib()
		},
		onShow() {
			this.getLib()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			getLib(){
				let data = {
					page:1,
					pagesize:10
				}
				http('/api/Setting/sourceMaterialLists','post',data).then(res=>{
					if(res.data.status == '200'){
						this.libList = res.data.data.sourceMaterialLists.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let data = {
					page:this.page+1,
					pagesize:10
				}
				http('/api/Setting/sourceMaterialLists','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.sourceMaterialLists.last_page){
						// this.$util.showToast('没有更多了')
						return
					}
					this.page++
					this.libList = this.libList.concat(res.data.data.sourceMaterialLists.data)
				})
			},
			toLibDetail(id){
				uni.navigateTo({
					url:"/pages/viper/libDetail?id=" + id
				})
			}
		}
	}
</script>

<style lang="less">
	.lib-wraps{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 30upx;
		box-sizing: border-box;
		background-color:#f2f2f5 ;
		.lib-item{
			width:690upx;
			height:238upx;
			background:rgba(255,255,255,1);
			border-radius:10upx;
			margin-top: 26upx;
			padding: 30upx;
			box-sizing: border-box;
			display: flex;
			.lib-img{
				image{
					width: 180upx;
					height: 180upx;
				}
			}
			.lib-text{
				margin-left: 20upx;
				.lib-title{
					line-height: 48upx;
				}
				.lib-intr{
					font-size: 24upx;
					color: #bbbbbb;
					line-height: 32upx;
					margin-top: 10upx;
				}
				.lib-time{
					font-size: 24upx;
					color: #bbbbbb;
					line-height: 32upx;
					// float: right;
					margin-top: 30upx;
				}
			}
		}
	}
	.nodata {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #aaaaaa;
		font-size: 30upx;
	}
</style>
