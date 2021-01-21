<template>
	<view class="content">
		<input class="inputBox" type="number" placeholder="请输入手机号" maxlength="11" @input="getUserName">
		<view class="btnBox">
			<input class="inputBox marignInput" type="number" placeholder="请输入短信验证码" maxlength="6" @input="getCode">
			<view class="btn" @tap="CodeBtn">{{codeName}}</view>
		</view>
		<input class="inputBox marignInput" type="text" maxlength="16" placeholder="请输入8~16位数字加字母密码"  	@input="getNewTel">
		<input class="inputBox marignInput" type="text" maxlength="16" placeholder="确认密码"    	@input="SureNewTel">
		<view class="sure" @tap="sureBtn">确认</view>
		
		<view class="showShadow" v-if="showDow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="title">{{status.title}}</view>
				<view class="contents">{{status.content}}</view>
				<view class="iconBox"><image class="icons" :src="status.src" mode="widthFix"></image></view>
				<view class="sure" @tap="shadowSure">完成</view>
			</view>
		</view>
	</view>
</template>
<style>
	.content .showShadow{width:100%;height:100%;position: fixed;top:0;left:0;}
	.content .showShadow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .showShadow .bg_white{width:70%;padding:5%;height:auto;border-radius:15upx;background: white;position: fixed;top:20%;left:10%;z-index: 2;}
	.content .showShadow .bg_white .title{color:#383838;font-size: 21px;text-align: center;}
	.content .showShadow .bg_white .contents{font-size: 14px;color:#9A9A9A;margin:30upx 0;text-align: center;}
	.content .showShadow .bg_white .iconBox{display: flex;justify-content: center;}
	.content .showShadow .bg_white .icons{width:235upx;height:255upx;}
	.content .showShadow .bg_white .sure{width:90%;margin-top: 50upx;padding:2.5%;margin-left: 2.5%;background: linear-gradient(to right,rgb(54,178,255),rgb(74,214,255));color:white;border-radius: 110upx;}
	
	
	.content{overflow-y: hidden;}
	.content .uni-input-placeholder{font-size: 14px;letter-spacing: 2upx;}
	.content .btnBox{position: relative;}
	.content .btnBox .btn{border-radius:10upx;padding:10upx 20upx;font-size: 14px;position: absolute;right:5%;top:14.5%;color:#409BE0;border:1px solid #409BE0;}
	.content .inputBox{width:90%;margin-left: 2.5%;padding:2.5%;border-bottom:1px solid rgb(225,225,225);margin-top: 40upx;}
	.content .marignInput{margin:25upx}
	.content .sure{margin-top:150upx;width:90%;margin-left: 2.5%;padding:2.5%;background: #409BE0;color:white;border-radius: 120upx;text-align: center;}
</style>
<script>
	export default {
		data() {
			return {
				userName:"",
				codeName:"获取验证码",
				timing:false,
				codeNum:"",
				newPassWord:"",
				surePassWord:"",
				status:{
					"title":"",
					"src":"",
					"content":"",
				},
				showDow:false,
				
			}
		},
		methods: {
			CodeBtn(){
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
			getCode(e){this.codeNum = e.target.value},
			getNewTel(e){this.newPassWord = e.target.value},
			SureNewTel(e){this.surePassWord = e.target.value},
			getUserName(e){this.userName = e.target.value},
			sureBtn(){
				var that = this;
				var re = /[A-Za-z]+/;
				var result = this.newPassWord.search(re)
				if( that.userName == "" ){
					uni.showToast({icon:"none",title:"请输入手机号"})
					return;
				}else if( that.codeNum == "" ){
					uni.showToast({icon:"none",title:"请输入验证码"})
					return;
				}else if( that.newPassWord == "" ){
					uni.showToast({icon:"none",title:"请输入密码"})
					return;
				}else if( that.surePassWord == "" ){
					uni.showToast({icon:"none",title:"请确认密码"})
					return;
				}else if( that.surePassWord !== that.newPassWord ){
					uni.showToast({icon:"none",title:"两次密码输入不相同"})
					return;
				}else if( this.newPassWord.length < 8 || this.newPassWord.length > 16 ){
					uni.showToast({icon:"none",title:"请输入8-16位密码"})
				}else if( result < 0 ){
					uni.showToast({icon:"none",title:"请输入密码+数字"})
				}else{
					let param={
						"phone":that.userName,
						"code":that.codeNum,
						"password":that.newPassWord,
						"repassword":that.surePassWord,
					};
					this._$InitRequest.request('login/forget_password', param).then(res => {
						if( res.data.code !== 200 ){
							uni.showToast({icon:"none",title:res.data.mess})
							return; 
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							setTimeout(function(){
								uni.navigateTo({url:"../login"})
							},1500)
						}
					},error=>{})
					
				}
				console.log( that.userName );
				console.log( that.codeNum );
				console.log( that.newPassWord );
				console.log( that.surePassWord );
			},
			shadowSure(){
				uni.navigateTo({
					url:"../user"
				})
			}
			
		}
	}
</script>