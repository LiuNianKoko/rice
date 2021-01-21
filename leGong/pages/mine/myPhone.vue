<template>
	<view>
		
		<cu-custom bgColor="bgWhite" borderBottom="#dcdcdc" :isBack="true"><block slot="backText"></block><block slot="content">绑定手机号</block></cu-custom>
		<view class="getPhone">
			<view class="title">绑定手机号并登录</view>
			<button class="getPhoneBtn" :disabled="disabled" @getphonenumber="getPhone"	open-type="getPhoneNumber">授权并登录</button>
			<!-- <view class="marginTop10 box" @tap="getnav(router(`userAgreement?type=2`))">
				<text class="iconfont icon-xuanzhong"></text>
				<text class="paddingLeft5">我已阅读并同意商城用户协议</text>
			</view> -->
		</view>
		<QSPopup ref="QSpopUser" :tapMaskHide="false">
			<view class="user-content disCenter">
				{{tipMsg || '该账号已被冻结'}}
			</view>
		</QSPopup>
	</view>
</template>

<script>
	const app = getApp()
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				
				disabled:false,
				token:'',
				encrypteData:'',
				session_key:'',
				iv:'',
				code:'',
				userData:{},
				userId:0,
				tipMsg:'',
				
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			console.log(option)
			this.userData = option.user
			console.log(this.userData)
			let otherId = uni.getStorageSync('otherid')
			if(otherId){
				this.userId = otherId
			}
			if(option.userid != 0){
				this.userId = option.userid
			}
			// this.$util.showToast(this.userId)
			this.login();
		},
		
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			login () {
				uni.login({
					// provider:'oauth',
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
						this.disabled = false;
						uni.hideLoading();
					}
				})
			},
			getPhone (e) {
				console.log(e)
				uni.showToast({
					title:'请稍后...',
					icon:'none'
				});
				this.disabled = true;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					this.encrypteData = e.detail.encryptedData;
					this.iv = e.detail.iv;
					// http('/api/login/getcode','post',{code:this.code}).then( (res) => {
					// 	if (res.code == 200) {
					// 		this.session_key = res.data.session_key.session_key;
					// 		return this.session_key
					// 	}
					// }).then( (session_key) => {
						this.disabled = false;
						uni.hideLoading();
						// if (session_key != '') {
							let data = {
								session_key: this.session_key,
								encrypteData: this.encrypteData,
								iv: this.iv,
								token:'',
								userInfo: this.userData,
								user_id:this.userId,
							}
							http('/api/login/get_phone','post',data).then(res => {
								if (res.code == 200) {
									uni.hideLoading();
									uni.showToast({
										title:res.mess,
										icon:'none',
										duration:1000
									})
									uni.setStorageSync('token',res.data.user_token)
									uni.setStorageSync('user_id',res.data.id)
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
									
								}else if(res.code == 4001){
									this.tipMsg = res.msg
									this.show('QSpopUser')
								}else{
									uni.hideLoading();
									uni.showToast({
										title:res.mess,
										icon:'none'
									})
									this.disabled = true;
									
								}
								
							})
						// }
					// })
				}else{
					uni.showToast({
						title:'用户已取消',
						icon:'none'
					})
					this.disabled = false;
				}
			}
			
		}
	}
</script>

<style lang="less">
	.getPhone{
		padding: 0 32rpx;
		.title{
			text-align: center;
			padding: 100rpx 0;
			font-size:32rpx;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.getPhoneBtn{
			width:100%;
			height:100rpx;
			color: #fff;
			font-size: 36rpx;
			line-height:100rpx;
			background: linear-gradient(90deg,#ff99dd 0%,#ffb19b 100%);
			border-radius:5px;
		}
		.box{
			color: #6894B9;
		}
	}
	.user-content{
		width: 400upx;
		height: 200upx;
		background-color: #fff;
		border-radius: 20upx;
		font-size: 30upx;
	}
</style>
