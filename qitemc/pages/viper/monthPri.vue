<template>
	<view class="month-wraps">
		<view v-if="list.length>0">
			<view class="month-item scale-1px-bottom" v-for="item in list" :key="item.id">
				<view class="month-total">
					<view class="month-text">
						总计收益
					</view>
					<view class="month-price">
						+{{item.money}}
					</view>
				</view>
				<view class="month-time">
					{{item.record_time}}
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
				list:[],
				page:1
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			getList(){
				let that = this
				
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/Api/user/profitLog','post',data).then(res=>{
					if(res.data.status == '200'){
						that.list = res.data.data.profitLog.data
					}
					console.log(res)
				})
			},
			getNewList(){
				
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/Api/user/profitLog','post',data).then(res=>{
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page> res.data.data.profitLog.length){
						// this.$util.showToast('没有更多了')	
						return false
					}
					this.page++
					this.list = this.list.concat(res.data.data.profitLog.data)
				})
			}
		}
	}
</script>

<style lang="less">
	.month-wraps{
		border-top: 2upx solid #f2f2f5;
		padding:0 30upx;
		box-sizing: border-box;
		
	}
	.month-item{
		height: 150upx;
		padding: 30upx 0;
		box-sizing: border-box;
		.month-total{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.month-text{
				font-size:32upx;
			}
			.month-price{
				font-size:40upx;
				font-weight:bold;
				color:#EFB400;
			}
		}
		.month-time{
			font-size: 24upx;
			color: #bbbbbb;
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
