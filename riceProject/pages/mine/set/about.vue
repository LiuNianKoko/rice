<template>
	<view class="about_wrap">
		<view class="about-img">
			<image src="/static/logo.png"></image>
			<view class="logo-intr">
				版本v{{version || '1.0.0'}}
			</view>
		</view>
		<view class="nav-wrap">
			<!-- <view class="nav-item border_bottom">
				<view class="txtlabel left">
					北申良品简介
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					给北申良品打分
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					服务条款
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					隐私权相关政策
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					特别说明
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					证照信息
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view> -->
			<view class="nav-item border_bottom" v-for="(item,index) in list" :key="index" @click="toAboutDetail(item.id)">
				<view class="txtlabel left">
					{{item.title}}
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				list:[],
				version:'1.0.0'
			}
		},
		onLoad() {
			this.getList()
			let version = uni.getStorageSync('version')
			this.version = version
		},
		methods:{
			getList(){
				http('/api/Setting/getAboutUs','post').then(res=>{
					this.list = res.data.data
					console.log(res)
				})
			},
			toAboutDetail(id){
				uni.navigateTo({
					url:'/pages/mine/set/aboutDetail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #f2f2f5;
	}
	.about_wrap{
		
		.about-img{
			width: 100%;
			height: 392upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 180upx;
				height: 140upx;
			}
			.logo-intr{
				font-size: 24upx;
				color: #bbbbbb;
				margin-top: 30upx;
			}
		}
		.nav-wrap{
			padding:0 30upx;
			background-color: #ffffff;
			.nav-item{
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				
				.txtlabel{
					color: #000000;
					font-size: 36upx;
				}
				.arrow{
					width: 34upx;
					height: 34upx;
					margin-top: 30upx;
				}
			}
		}
		
	}
</style>

