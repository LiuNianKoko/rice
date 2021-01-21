<template>
	<view>
		<image src="/static/mine-bg.png" class="mine-bg" mode=""></image>
		<view class="title" :style="[{height:CustomBar+ 'px'},{paddingTop:StatusBar + 'px'}]">
			我的
		</view>
		<view class="mine-info disAlignCenter" :style="[{paddingTop:(CustomBar + 50) + 'px'}]">
			<view class="headimg-wrap disCenter" @click="toInfo">
				<image :src="info.headimgurl" class="headimg" mode=""></image>
				<image src="/static/person.png" class="headimg-sign" mode="" v-if="info.is_attestation == 1"></image>
			</view>
			<view class="name-wrap paddingLeft20 paddingRight20 flex1 text-white" @click="toInfo">
				<view class="name-box font36 fontBold marginBottom10 disAlignCenter">
					{{info.nickname || ''}}
					<view class="sign scale08" v-if="info.is_attestation == 1">
						已认证
					</view>
				</view>
				<view class="intr-box font24 line1">
					{{info.introduce || ''}}
				</view>
				
			</view>
			<view class="disCenter">
				<image src="/static/right-white.png" class="right-white" mode=""></image>
			</view>
			<view class="disAlignCenter text-white font26 fan-wrap">
				<view class="" @click="toFans(1)">
					我的关注: {{info.my_follow_count || 0}}
				</view>
				<view class="" style="margin-left: 80upx;" @click="toFans(2)">
					我的粉丝: {{info.fans_count || 0}}
				</view>
			</view>
		</view>
		<view class="per-service">
			<view class="per-title font36 fontBold marginBottom30">
				个人服务
			</view>
			<view class="per-wrap">
				<view class="per-item" @click="jump(1)">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-release.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						我的发布
					</view>
				</view>
				<view class="per-item" @click="jump(2)">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-card.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						身份认证
					</view>
				</view>
				<view class="per-item" @click="jump(3)">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-collect.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						我的收藏
					</view>
				</view>
				<view class="per-item" @click="show('QSPop')">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-phone.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						电话客服
					</view>
				</view>
				<view class="per-item" @click="jump(4)">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-set.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						设置
					</view>
				</view>
				<!-- <view class="per-item" @click="jump(5)">
					<view class="mine-icon-wrap disCenter">
						<image src="/static/mine-local.png" class="mine-icon" mode=""></image>
					</view>
					<view class="font24 disCenter">
						地址管理
					</view>
				</view> -->
			</view>
		</view>
		
		<QSPopup ref="QSPop">
			<view class="qs-content">
				<view class="qs-top text-center">
					<view class="fontBold font32 marginBottom20">
						提示
					</view>
					<view class="">
						是否拨打电话 <text class="color-steel">{{servicePhone}}</text> ?
					</view>
				</view>
				<view class="qs-btn-wrap disFlex">
					<view class="color-gray disCenter qs-btn qs-btn-l" @click="hides('QSPop')">
						取消
					</view>
					<view class="color-steel disCenter qs-btn" @click="phoneCall(servicePhone)">
						确定
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				info:{},
				servicePhone:'12345678',
			}
		},
		onLoad() {
			this.getServicePhone()
		},
		onShow() {
			this.getMine()
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			getServicePhone(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Setting/servicePhone','post',data).then(res=>{
					if(res.status==200){
						this.servicePhone = res.data.service_phone
					}
				})
			},
			phoneCall(phone){
				this.hides('QSPop')
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			toInfo(){
				uni.navigateTo({
					url:'/pages/mine/info'
				})
			},
			toFans(type){
				uni.navigateTo({
					url:'/pages/mine/fans?type=' + type
				})
			},
			jump(type){
				// 1我的发布  2身份认证  3我的收藏  4设置  5地址管理
				if(type == 1){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else if(type == 2){
					if(this.info.is_attestation == 1){
						uni.showToast({
							title:'您已认证!',
							icon:'none'
						})
						return
					}
					uni.navigateTo({
						url:'/pages/mine/idCard'
					})
				}else if(type == 3){
					uni.navigateTo({
						url:'/pages/mine/collect'
					})
				}else if(type == 4){
					uni.navigateTo({
						url:'/pages/mine/set'
					})
				}else if(type == 5){
					uni.navigateTo({
						url:'/pages/mine/address'
					})
				}
			},
			getMine(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_user_info','post',data).then(res=>{
					if(res.status==200){
						this.info = res.data
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.mine-bg{
		width: 100%;
		height: 550upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		color: #fff;
		font-size: 40upx;
		padding: 0 32upx;
		font-weight: bold;
	}
	.mine-info{
		padding-left: 32upx;
		padding-right: 32upx;
		padding-bottom: 80upx;
		position: relative;
		.fan-wrap{
			position: absolute;
			bottom: 32upx;
			left: 176upx;
		}
		.headimg-wrap{
			width: 124upx;
			height: 124upx;
			border-radius: 50%;
			background: #fff;
			position: relative;
			.headimg-sign{
				width:56upx;
				height: 32upx;
				position: absolute;
				z-index: 10;
				right: -18upx;
				top: -12upx;
			}
			.headimg{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}
		}
		.sign{
			font-size: 24upx;
			color: #fff;
			padding: 10upx 20upx;
			background-color: #40384a;
			border-radius: 30upx;
			line-height: 26upx;
			margin-top: 4upx;
		}
		.right-white{
			width: 20upx;
			height: 32upx;
		}
	}
	.per-service{
		padding: 32upx;
		background: #fff;
		border-radius: 30upx 30upx 0 0;
		.per-wrap{
			display: flex;
			flex-wrap: wrap;
			.per-item{
				width: 25%;
				margin-bottom: 50upx;
				.mine-icon{
					width: 50upx;
					height: 50upx;
					margin-bottom: 14upx;
				}
			}
		}
	}
	.qs-content{
		width: 520upx;
		background-color: #fff;
		box-shadow: 1px 6upx 30upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		.qs-top{
			padding: 40upx 40upx 70upx;
			border-bottom: 1px solid #eee;
		}
		.qs-btn-wrap{
			height: 80upx;
			.qs-btn{
				width: 50%;
			}
			.qs-btn-l{
				border-right: 1px solid #eee;
			}
		}
	}
</style>
