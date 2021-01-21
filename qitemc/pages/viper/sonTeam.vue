<template>
	<view>
		<view class="extend-wraps" v-if="sonTeam.length >0">
			<view class="extend-item" v-for="(item,i) in sonTeam" :key="i">
				<view class="extend-headimg">
					<!-- <image src="/static/vip-head-pic.png"></image> -->
					<image :src="item.headimgurl?item.headimgurl:'/static/vip-head-pic.png'" mode="aspectFill"></image>
				</view>
				<view class="extend-text">
					<view class="extend-title">
						<view class="extend-name">
							{{item.nickname}}
						</view>
						<view class="extend-status" v-if="item.vip ==3">
							<image src="/static/vip-logo.png"></image>会员
							
						</view>
						<view class="extend-status" v-if="item.vip ==2">
							<image src="/static/vip-xiao.png"></image>会员
							
						</view>
						<view class="extend-status" v-if="item.vip <=1">
							<image src="/static/vip-putong.png"></image>普通用户
							
						</view>
					</view>
					<view class="extend-time">
						注册时间: {{item.invite_time}} | 注册手机: {{item.phone}}
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
				sonTeam:[],
				otherId:0,
				nickname:''
			}
		},
		onLoad(option) {
			console.log(option)
			this.otherId = option.otherId
			this.nickname = option.nickname
			this.getSonTeam()
			this.setTitle()
		},
		onShow() {
			this.getSonTeam()
			this.setTitle()
		},
		methods:{
			setTitle(){
				uni.setNavigationBarTitle({
				　　title:this.nickname + '的团队'
				})
			},
			getSonTeam(){
				let data = {
						token:uni.getStorageSync('token'),
						others_id:this.otherId
					}
				http('/api/user/customer','post',data).then(res=>{
					if(res.data.status == '200'){
						this.sonTeam = res.data.data
					}
					console.log(res)
				})
			}
		}
	}
	
</script>

<style lang="less">
	.extend-wraps{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 30upx;
		box-sizing: border-box;
		background-color:#f2f2f5 ;
		.extend-item{
			width: 690upx;
			height: 150upx;
			margin-top: 26upx;
			border-radius:10upx;
			background-color: #FFFFFF;
			display: flex;
			padding: 30upx 10upx;
			box-sizing: border-box;
			.extend-headimg{
				image{
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}
			}
			.extend-text{
				margin-left: 20upx;
				.extend-title{
					display: flex;
					.extend-status{
						margin-left: 20upx;
						display: flex;
						image{
							width: 36upx;
							height: 36upx;
						}
					}
				}
				.extend-time{
					margin-top: 16upx;
					font-size: 24upx;
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
