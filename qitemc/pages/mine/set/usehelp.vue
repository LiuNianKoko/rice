<template>
	<view class="help-wraps">
		<!-- <view class="help-item">
			1.如何解绑银行卡？
		</view>
		<view class="help-item">
			2.如何解绑手机号？
		</view>
		<view class="help-item">
			3.如何注销帐号？
		</view>
		<view class="help-item">
			4.怎么更改登录的帐号？
		</view>
		<view class="help-item">
			5.如何申请退款？
		</view>
		<view class="help-item">
			6.商品有问题怎么办？
		</view> -->
		<view class="help-item" v-for="(item,index) in list" :key="index" @click="toHelp(item.id)">
			<view class="help-title">
				{{item.title}}
			</view>
			<view class="help-right">
				<image class="huijt" src="/static/huijt.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				http('/api/Setting/getUseHelp','post').then(res=>{
					this.list = res.data.data
					console.log(res)
				})
			},
			toHelp(id){
				uni.navigateTo({
					url:'/pages/mine/set/helpDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f3f3f3;
	}
	.help-wraps{
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		border-top: 2upx solid #f2f2f5;
		background-color: #fff;
		.help-item{
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			
			.help-title{
				color: #333;
				font-size: 32upx;
			}
			.help-right{
				
				.huijt{
					width: 32upx;
					height: 32upx;
				}
			}
		}
	}
</style>
