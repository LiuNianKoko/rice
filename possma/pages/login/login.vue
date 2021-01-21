<template>
	<view class="content">
		<view class="statusBox"></view>
		<!-- <uni-icons class="icons" type="eye" color="rgb(166,178,198)" size="12"/> -->
		<image class="logo" src="/static/image/img/logo.png" mode=""></image>
		
		<input class="input marginTop200" type="text" placeholder="用户名" @input="getUsername" :value="userName" v-if="ways==1">
		<view class="passwordBox" v-if="ways==1">
			<input class="input marginTop20 " :type="passwordType" :value="password" placeholder="登录密码" maxlength="11" @input="getPassWord">
			<image class="eye" src="../../static/image/login/icon_1.png" mode="" @tap="eyeBtn"></image>
		</view>
		
		<input class="input marginTop200" type="number" placeholder="手机号" :value="userName" @input="getUsername" maxlength="11" v-if="ways==2">
		<view class="passwordBox" v-if="ways==2">
			<input class="input marginTop20 " type="number" placeholder="验证码" :value="code" maxlength="6" @input="getCode">
			<view class="getCode fontSize14" @tap="btnGetCode">{{codeName}}</view>
		</view>
		
		
		<view class="loginBtn comm-btn" @click="btnLogin">登录</view>
		<view class="btns">
			<view class="register fontSize14"	@tap="btnRegister">手机快速注册</view>
			<view class="forget fontSize14"		@tap="btnForget">忘记密码</view>
		</view>
		
		<view class="loginBtns">
			<!-- <view class="box" @tap="wxLogin">
				<image class="iconImage" src="../../static/image/login/icon_2.png" mode=""></image>
				<view class="name fontSize13">微信登录</view>
			</view> -->
			<view class="box" @tap="anoWay">
				<image class="iconImages" src="../../static/image/login/icon_3.png" mode=""></image>
				<view class="name fontSize13">{{wayName}}</view>
			</view>
		</view>
		<view class="last">
			<view class="common fontSize13">无法登陆，点击</view>
			<view class="other fontSize13" @tap="customerService">联系客服</view>
		</view>
		
		
		<!-- <view class="showDow" v-if="showBeginShadow">
			<view class="bg_grey"></view>
			<view class="bg_white">
				<view class="title">服务协议及隐私政策</view>
				<view class="titlesA">亲，感谢你对康乐宝的信任！
请注意，在您使用本软件过程中我们会按照<view class="jumps titlesA" @tap="jumps(0)">《康乐宝隐私政策》</view>、<view class="jumps titlesA" @tap="jumps(1)">《康乐宝用户协议》</view>收集、使用和共享您的个人信息，请认真阅读并充分理解。特别提示：
1、为向您提供交易相关基本功能，我们会收集、使用必要的信息；
2、基于您的授权，我们可能获取您的位置等信息，您有权拒绝或取消授权；
3、我们会采用业界先进的安全措施保护您的信息安全；
4、未经您的同意，我们不会从第三方处获取、共享或向其提供您的信息；</view>
				<view class="btns falseBtn" @tap="clickFlase">不同意</view>
				<view class="btns sureBtn" @tap="clickSure">同意</view>
			</view> 
		</view> -->
		
	</view>
</template>
<style>
	.statusBox{width:100%;height:90upx;background: white;position: fixed;top:0;left: 0;z-index: 2;}
	.content{width:100%}
	.content .logo{width:25%;height: 200upx;margin-left:37.5%;margin-top:110upx;}
	.content .passwordBox{width:100%;position: relative;}
	.content .passwordBox .eye{width:40upx;height: 25upx;position: absolute;top:40%;right:10%;z-index: 2;}
	.content .input{width:85%;margin-left:5%;padding:2.5%;border-bottom: 1px solid rgb(240,240,240);}
	.content .getCode{position: absolute;top:20%;right:8%;color:#409BE0;text-align: center;}
	.content .marginTop200{margin-top:100upx;}
	.content .marginTop20{margin-top:20upx}
	.content .uni-input-placeholder{font-size: 14px;color:#A5A5A5;}
	.content .loginBtn{width:90%;margin-left: 5%;background: rgb(78,178,244);color:white;border-radius: 200upx;;text-align: center;padding:2.5% 0;margin-top:100upx;}
	.content .btns{width:100%;margin-top: 20upx;}
	.content .btns .register{width:40%;margin-left: 9%;text-align: left;float:left;color:#434343}
	.content .btns .forget{width:40%;margin-right: 9%;text-align: right;float: right;color:#C41E3F}
	.content .loginBtns{width:100%;margin-top:150upx;display: flex;flex-direction: column;align-items: center;}
	.content .loginBtns .box{width:50%;float: left;text-align: center;}
	.content .loginBtns .box .iconImage{width:70upx;height: 60upx;}
	.content .loginBtns .box .iconImages{width:40upx;height: 60upx;}
	.content .loginBtns .box .name{color:#2F2F2F;margin-top: 10upx;}
	.content .last{position: absolute;left:0;bottom: 1%;text-align: center;width:100%;display: flex;justify-content: center;}
	.content .last .common{float:left;}
	.content .last .other{float:left;color:#409BE0;}
	
	.content .showDow{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 30}
	.content .showDow .bg_grey{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 3;background: rgba(0,0,0,0.4);}
	.content .showDow .bg_white{width:80%;height:auto;margin-left: 5%;padding:2% 5%;position: fixed;top:30%;left:0;z-index: 3;background:white;text-align: center;border-radius: 10upx;;}
	.content .showDow .bg_white .title{font-size: 18px;padding:60upx 0;padding-bottom: 30px;margin-bottom: 0upx;font-weight: bold;}
	.content .showDow .bg_white .titlesA{font-size: 12px;padding:0;padding-bottom: 30px;margin-bottom: 0upx;font-weight: bold;color:#B3B3B3;}
	.content .showDow .bg_white .jumps{display: inline;color:rgba(0,0,0,0.8);font-weight: bold;}
	.content .showDow .bg_white .btnSure{color:#C68660;font-size: 18px;border-top: 1px solid #E5E5E5;;padding:20upx 0;}
	.content .showDow .bg_white .btns{width:50%;float: left;border-top: 1px solid #E5E5E5;padding:20upx 0;}
	.content .showDow .bg_white .falseBtn{color:#999999}
	.content .showDow .bg_white .sureBtn{color:#409BE0}
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data(){
			return{
				passwordType:"password",
				userName:"",
				password:"",
				code:"",
				wayName:"验证码登录",
				codeName:"获取验证码",
				timing:false,
				ways:1,
				haveClick:false,
				showBeginShadow:false,
			}
		},
		onLoad(){
			var that = this;
			// try {
			//     const value = uni.getStorageSync('agreeMent');
			//     if (value) {
			// 		that.showBeginShadow = false
			//     }else{
			// 		that.showBeginShadow = true
			// 	}
			// } catch (e) {}
			that.AjaxGoindex();
		},
		onShow(){
			this.haveClick = false
		},
		methods: {
			AjaxGoindex(){
				var that = this;
				setTimeout(function(){
					uni.getStorage({
					    key: 'token',
					    success: function (res) {
							// if( res.data ){
							// 	uni.navigateTo({url:"../index/index"})
							// }
					    }
					});
				},10)
			},
			eyeBtn(){
				if( this.passwordType == "password" ){
					this.passwordType = "text"
				}else{
					this.passwordType = "password"
				}
			},
			customerService(){
				uni.navigateTo({
					url:"/pages/user/socket/socket"
				})
			},
			getUsername(e){ this.userName = e.target.value },
			getPassWord(e){ this.password = e.target.value },
			getCode(e){ this.code = e.target.value },
			btnRegister(){uni.navigateTo({url:"./register/register"})},
			btnForget(){uni.navigateTo({url:"./forget/forget"})},
			wxLogin(){
				var that = this;
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						uni.getUserInfo({
							provider: 'weixin',
							success: function (infoRes) {
								let param={
									login_type:3,
									openid:infoRes.userInfo.openId,
									nickname:infoRes.userInfo.nickName,
									headimgurl:infoRes.userInfo.avatarUrl,
								};
								that._$InitRequest.request('login/login', param).then(res => {
									if( res.data.code !== 200 ){
										uni.showToast({icon:"none",title:res.data.mess})
										try {
										    uni.setStorageSync('wxData',infoRes.userInfo );
										}catch (e){}
										setTimeout(function(){
											uni.navigateTo({
												url:"./wxRegister/wxRegister"
											})
										},1500)
										return; 
									}else{
										uni.showToast({icon:"none",title:res.data.mess})
										try {
											uni.setStorageSync('token',res.data.data );
										}catch (e){}
										setTimeout(function(){
											uni.switchTab({url:"../index/index"})
										},1500)
									}
								},error=>{})
							}
						});
					}
				});
			},
			anoWay(){
				this.userName = "";
				this.password = "";
				this.code = "";
				if( this.ways == 1 ){
					this.ways = 2
					this.wayName = "账号密码登录"
				}else{
					this.ways = 1
					this.wayName = "验证码登录"
				}
			},
			btnGetCode(){
				var that = this;
				var time = 60;
				if( this.userName.length !== 11 ){
					uni.showToast({icon:"none",title:"请输入正确的手机号"})
					return;
				}else{
					if( that.timing == false ){
						let param={
							"send_type":1,
							"phone":that.userName,
						};
						this._$InitRequest.request('login/sendSms', param).then(res => {
							if( res.data.code !== 200 ){
								uni.showToast({icon:"none",title:res.data.mess})
								return;
							}else{
								uni.showToast({icon:"none",title:res.data.mess})
								var timeer = setInterval(function(){
									that.codeName = time + "s"
									that.timing = true
									time--;
									if( time == -1 ){
										clearInterval(timeer)
										that.codeName = "获取验证码"
										that.timing = false
									}
								},1000)
							}
						},error=>{})
					}else{
						uni.showToast({icon:"none",title:"请勿重复获取"})
					}
				}
			},
			btnLogin(){
				var that = this;
				// if( that.haveClick == false ){
				// 	that.haveClick = true
					if( that.ways == 1 ){
						if( that.userName == "" ){
							uni.showToast({icon:"none",title:"请输入用户名"})
							return;
						}else if( that.password == "" ){
							uni.showToast({icon:"none",title:"请输入密码"})
							return;
						}else{
							//18983181366    123456
							let param={
								"login_type":2,
								"phone":that.userName,
								"password":that.password,
							};
							this._$InitRequest.request('login/login', param).then(res => {
								if( res.data.code !== 200 ){
									uni.showToast({icon:"none",title:res.data.mess})
									// that.haveClick = false
									return; 
								}else{
									uni.showToast({icon:"none",title:res.data.mess})
									// uni.setStorage({
									//     key: 'token',
									//     data: res.data.data,
									//     success: function(){}
									// });
									try {
										uni.setStorageSync('token',res.data.data );
									}catch (e){}
									setTimeout(function(){
										uni.switchTab({url:"../index/index"})
									},1500)
								}
							},error=>{})
						}
					}else{
						if( that.userName == "" ){
							uni.showToast({icon:"none",title:"请输入手机号"})
							return;
						}else if( that.code == "" ){
							uni.showToast({icon:"none",title:"请输入验证码"})
							return;
						}else{
							//pass
							let param={
								"login_type":1,
								"phone":that.userName,
								"code":that.code,
							};
							this._$InitRequest.request('login/login', param).then(res => {
								if( res.data.code !== 200 ){
									// that.haveClick = false
									uni.showToast({icon:"none",title:res.data.mess})
									return; 
								}else{
									uni.showToast({icon:"none",title:res.data.mess})
									// uni.setStorage({
									//     key: 'token',
									//     data: res.data.data,
									//     success: function(){}
									// });
									try {
										uni.setStorageSync('token',res.data.data );
									}catch (e){}
									setTimeout(function(){
										uni.switchTab({url:"../index/index"})
									},1500)
								}
							},error=>{})
						}
					}
				// }else{
					
					
					
				// }
			},
			jumps(e){
				if( e == 0 ){
					uni.navigateTo({
						url:"/pages/user/set/about/agree/agree?id=2"
					})
				}else if( e == 1 ){
					uni.navigateTo({
						url:"/pages/user/set/about/agree/agree?id=3"
					})
				}
			},
			clickFlase(){
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				}else{ 
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				}
			},
			clickSure(){
				try {
				    uni.setStorageSync('agreeMent', '1');
				} catch (e) {}
				this.showBeginShadow = false
			},

		}
	}
</script>