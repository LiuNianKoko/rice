<template>
	<view>
		<view class="wrap">
			<view class="set-item disBetween" @click="jump(1)">
				<view class="font32">
					更换绑定手机号
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="jump(2)">
				<view class="font32">
					修改登录密码
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="jump(3)">
				<view class="font32">
					使用帮助
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="jump(4)">
				<view class="font32">
					意见反馈
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="jump(5)">
				<view class="font32">
					关于我们
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="show('QSPops')">
				<view class="font32">
					客服电话
				</view>
				<view class="font32">
					{{servicePhone}}
				</view>
			</view>
			<view class="set-item disBetween">
				<view class="font32">
					版本信息
				</view>
				<view class="font32">
					V{{ver}}
				</view>
			</view>
			<view class="set-item disBetween" @click="clearSto">
				<view class="font32">
					清除缓存
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="checkUp">
				<view class="font32">
					检查更新
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="set-item disBetween" @click="show('QSPopCancel')">
				<view class="font32">
					注销账号
				</view>
				<view class="disCenter">
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btn-wrap">
			<view class="btn disCenter" @click="show('QSPop')">
				退出账号
			</view>
		</view>
		<QSPopup ref="QSPopCancel">
			<view class="qs-content">
				<view class="qs-top text-center">
					<view class="fontBold font32 marginBottom20">
						提示
					</view>
					<view class="">
						确认注销此账号?
					</view>
				</view>
				<view class="qs-btn-wrap disFlex">
					<view class="color-gray disCenter qs-btn qs-btn-l" @click="hides('QSPopCancel')">
						取消
					</view>
					<view class="color-steel disCenter qs-btn" @click="cancellation">
						确定
					</view>
				</view>
			</view>
		</QSPopup>
		<QSPopup ref="QSPop">
			<view class="qs-content">
				<view class="qs-top text-center">
					<view class="fontBold font32 marginBottom20">
						提示
					</view>
					<view class="">
						确认退出此账号?
					</view>
				</view>
				<view class="qs-btn-wrap disFlex">
					<view class="color-gray disCenter qs-btn qs-btn-l" @click="hides('QSPop')">
						取消
					</view>
					<view class="color-steel disCenter qs-btn" @click="logOut">
						确定
					</view>
				</view>
			</view>
		</QSPopup>
		<QSPopup ref="QSPopUp">
			<view class="qs-content">
				<view class="qs-top qs-top2 text-center">
					<view class="fontBold font32 marginBottom20">
						{{update?'当前已是最新版本':'有新的版本可更新'}}
					</view>
					<view class="">
						{{update?'无需更新':'版本信息V'+newVer+''}}
					</view>
					<view class="font24 color-gray marginTop20" v-if="!update">
						{{desc}}
					</view>
				</view>
				<view class="qs-btn-wrap disFlex">
					<view class="color-gray disCenter qs-btn qs-btn-l" @click="hides('QSPopUp')">
						关闭
					</view>
					<view class="color-steel disCenter qs-btn" @click="checkUpDone">
						{{update?'确定':'更新'}}
					</view>
				</view>
			</view>
		</QSPopup>
		<QSPopup ref="QSPops">
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
					<view class="color-gray disCenter qs-btn qs-btn-l" @click="hides('QSPops')">
						取消
					</view>
					<view class="color-steel disCenter qs-btn" @click="phoneCall()">
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
				update:true,//检查更新
				servicePhone:'12345678',
				ver:'1.0.0',
				newVer:'1.1.1',
				plat:'',
				link:'',//链接
				desc:'',//更新说明
				
			}
		},
		onLoad() {
			this.getServicePhone()
			// #ifdef APP-PLUS
			this.plat = uni.getSystemInfoSync().platform
			this.ver = plus.runtime.version
			// #endif
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			jump(type){
				// 1更换手机号  2修改密码  3使用帮助  4意见反馈  5关于我们
				if(type == 1){
					uni.navigateTo({
						url:'/pages/mine/revisePhone'
					})
				}else if(type == 2){
					uni.navigateTo({
						url:'/pages/login/forgetPassword?type=2'
					})
				}else if(type == 3){
					uni.navigateTo({
						url:'/pages/mine/useHelp'
					})
				}else if(type == 4){
					uni.navigateTo({
						url:'/pages/mine/feedBack'
					})
				}else if(type == 5){
					uni.navigateTo({
						url:'/pages/mine/aboutUs'
					})
				}
			},
			logOut(){
				this.hides('QSPop')
				uni.setStorageSync('token','')
				uni.setStorageSync('id','')
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			cancellation(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/del_user','post',data).then(res=>{
					if(res.status==200){
						this.hides('QSPop')
						uni.setStorageSync('token','')
						uni.setStorageSync('id','')
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
				
			},
			checkUp(){
				this.show('QSPopUp')
				let ver = this.ver.replace(/\./g,'')
				console.log(ver)
				let data = {
					token:uni.getStorageSync('token'),
					number:ver
				}
				http('/api/Setting/versionNumber','post',data).then(res=>{
					if(res.status==200){
						this.update = false
						this.newVer = res.data.name
						this.desc = res.data.remarks
						if(this.plat == 'android'){
							this.link = res.data.android_link
						}else{
							this.link = res.data.apple_link
						}
					}else{
						this.update = true
					}
				})
			},
			checkUpDone(){
				this.hides('QSPopUp')
				console.log(this.link)
				// #ifdef APP-PLUS
				if(this.update == false){
					plus.runtime.openURL(this.link)
				}
				// #endif
				
			},
			clearSto(){
				uni.removeStorageSync('release')
				this.$util.showToast('清除缓存成功!')
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
			phoneCall(){
				this.hides('QSPops')
				uni.makePhoneCall({
					phoneNumber:this.servicePhone
				})
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 30upx 0 30upx 30upx;
	}
	.set-item{
		padding: 30upx 30upx 30upx 0;
		border-bottom: 1px solid #F2F2F5;
		.right{
			width: 18upx;
			height: 30upx;
		}
	}
	.btn-wrap{
		margin-top: 220upx;
		margin-bottom: 200upx;
		padding: 0 32upx;
		.btn{
			background:#F2F2F5;
			height: 90upx;
			border-radius: 10upx;
			color: #BCBCBC;
			font-size: 36upx;
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
		.qs-top2{
			padding: 40upx;
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
