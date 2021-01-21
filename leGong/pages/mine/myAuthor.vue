<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" borderBottom="#dcdcdc" :isBack="true"><block slot="backText"></block><block slot="content">授权</block></cu-custom>
		<view class="title">请您授权</view>
		<view class="box">
			<image :src="imgUrl + 'lg-logo-l.png'" class="logo"></image>
		</view>
		
		
		<view class="btnBox">
			<button :disabled="disabled" open-type="getUserInfo" @tap="gets" class="loginBtn" @getuserinfo="getUserInfo">授权</button>
			<!-- <button class="nologinBtn" @tap="go">随便逛逛</button> -->
		</view>
		<!-- <view class="marginTop10 boxes" >
			<view class="iconfont icon-xuanzhong" style="color: #6894B9;"></view>
			<view class="paddingLeft5">
				<text>登录即代表您已同意</text>
				<text style="color: #6894B9;" @tap="getnav(router(`userAgreement?type=1`))">《隐私条款声明》</text>
				<text style="color: #6894B9;" @tap="getnav(router(`userAgreement?type=2`))">《注册协议》</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	const app = getApp()
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				
				disabled:false,
				encrypteData:'',
				session_key:'',
				iv:'',
				code:'',
				userId:0
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			console.log(option)
			if(option.userid){
				this.userId = option.userid
			}
			this.login();
		},
		
		methods: {
			go () {
				uni.switchTab({
					url:this.router(`index`)
				})
			},
			login () {
				// uni.showToast({
				// 	title:'请稍后...',
				// 	icon:'none'
				// });
				// this.disabled = true;
				uni.login({
					provider:'oauth',
					success: (res) => {
						if (res.errMsg = "login:ok") {
							this.code = res.code;
							http('/api/login/getcode','post',{code:this.code}).then( (res) => {
								if (res.code == 200) {
									this.session_key = res.data.session_key.session_key;
									// return this.session_key
								}
							})
						}
					},
					fail: (err) => {
						// this.disabled = false;
						uni.hideLoading();
					}
				})
			},
			gets () {
				
			},
			getUserInfo (e) {
				let that = this
				console.log(e)
				uni.showToast({
					title:'请稍后...',
					icon:'none'
				});
				that.disabled = true;
				if (e.detail.errMsg == 'getUserInfo:ok') {
					
					that.encrypteData = e.detail.encryptedData;
					that.iv = e.detail.iv;
					uni.checkSession({
						success: () => {
							if (that.session_key != '') {
								let data = {
									session_key:that.session_key,
									encrypteData: that.encrypteData,
									iv:that.iv
								}
								http('/api/login/get_userInfo','post',data).then( (respon) => {
									if (respon.code == 200) {
										// if (respon.data.phone == '' || respon.data.phone == null) {
										// 	this.getnav(this.router(`getPhone?token=${respon.data.token}`));
										// }else{
										// 	uni.switchTab({
										// 		url:this.router(`index`)
										// 	});
										// 	uni.setStorageSync('user',respon.data);
										// }
										let userData = JSON.stringify(respon.data) 
										uni.redirectTo({
											url:'/pages/mine/myPhone?user=' + userData + '&userid=' + that.userId
										})
									}else if (respon.code == 400) {
										uni.showToast({
											title:respon.mess,
											icon:'none'
										})
									}
									
									that.disabled = false;
									uni.hideLoading();
								})
							}
						},
						fail: () => {
							that.login();
							that.disabled = false;
							uni.showToast({
								title:'登录失效，请重新登录',
								icon:'none'
							})
						}
					})
				}else{
					that.disabled = false;
					uni.showToast({
						title:'用户取消授权',
						icon:'none'
					})
				}
			}
			
		}
	}
</script>

<style lang="less">
	.title{
		padding: 80rpx 30rpx;
		font-size:48rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.box{
		text-align: center;
		.logo{
			width: 240rpx;
			height: 240rpx;
		}
	}
	.btnBox{
		margin-top: 172rpx;
		padding: 0 32rpx;
		.loginBtn{
			width:100%;
			height:100rpx;
			color: #fff;
			font-size: 36rpx;
			line-height:100rpx;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			border-radius:5px;
		}
		.nologinBtn{
			margin-top: 52rpx;
			width:100%;
			height:100rpx;
			color: #333;
			font-size: 36rpx;
			line-height:100rpx;
			background:#fff !important;
			border:1px solid rgba(204,204,204,1);
			border-radius:5px;
		}
	}
	.boxes{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
