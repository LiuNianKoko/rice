<template>
	<view class="content">
		<image class="logo" src="/static/image/img/logo.png" mode=""></image>
		<view class="inputBox">
			<image class="icons" src="../../../static/image/login/icon_4.png" mode=""></image>
			<input class="input marginTop50" type="text" placeholder="请输入您的手机号" @input="getUsername" maxlength="11">
		</view>
		<view class="inputBox">
			<image class="icons" src="../../../static/image/login/icon_5.png" mode=""></image>
			<input class="input marginTop20 " type="number" placeholder="请输入验证码" maxlength="6" @input="getCode">
			<view class="getCode fontSize14" @tap="btnGetCode">{{codeName}}</view>
		</view>
		<view class="inputBox">
			<image class="icons" src="../../../static/image/login/icon_6.png" mode=""></image>
			<input class="input marginTop20 " type="text" placeholder="请输入8~16位数字加字母密码" maxlength="16" @input="getPassWord">
		</view>
		<!-- <view class="inputBox">
			<image class="icons" src="../../../static/image/login/icon_7.png" mode=""></image>
			<input class="input marginTop20 " type="number" placeholder="请选择你所属的地区" maxlength="6" disabled="">
			<uni-icons class="icon" type="arrowright" color="rgb(166,178,198)" size="12"/>
		</view> -->
		<view class="loginBtn" @tap="btnRegister">注册</view>
		<view class="anoWays">
			<view class="noneIcon" v-if="isAgree == false" @tap="btnAgree"></view>
			<image class="haveIcon" src="../../../static/image/login/icon_8.png" mode="" v-if="isAgree" @tap="btnAgree"></image>
			<view class="article fontSize14">请详细阅并知晓</view>
			<view class="special fontSize14" @tap="btnAgreement(1)">《注册协议》</view>
			<view class="special fontSize14" @tap="btnAgreement(2)">《隐私条款》</view>
			<view class="clearBoth"></view>
		</view>
		<view class="haveUserName fontSize13" @tap="goLogin">已有账号，去登录</view>
		


		
	</view>
</template>
<style>
	.content{width:100%;overflow-x: hidden;}
	.content .logo{width:25%;height: 200upx;margin-left:37.5%;margin-top:32upx;}
	.content .inputBox{width:100%;position: relative;}
	.content .inputBox .eye{width:40upx;height: 25upx;position: absolute;top:40%;right:10%;z-index: 2;}
	.content .inputBox .input{width:85%;margin-left:5%;padding:2.5%;border-bottom: 1px solid rgb(240,240,240);padding-left: 10%;}
	.content .inputBox .icons{width:32upx;height: 40upx;position: absolute;top:25%;left:7%}
	.content .inputBox .icon{position: absolute;top:30%;right:5%;}
	.content .getCode{position: absolute;top:20%;right:8%;color:#409BE0;text-align: center;}
	.content .marginTop50{margin-top:50upx;}
	.content .marginTop20{margin-top:20upx}
	.content .uni-input-placeholder{font-size: 14px;color:#A5A5A5;}
	.content .loginBtn{width:90%;margin-left: 5%;background: #409BE0;color:white;border-radius: 200upx;;text-align: center;padding:2.5% 0;margin-top:100upx;}
	.content .anoWays{width:90%;margin:30upx 0 50upx 5%;}
	.content .anoWays .noneIcon{float: left;width:32upx;height:32upx;border-radius: 33upx;border:1px solid rgba(0,0,0,0.1);margin-right: 20upx;}
	.content .anoWays .haveIcon{float: left;width:33upx;height:33upx;position: relative;top:0upx;border-radius: 33upx;border:1px solid white;margin-right: 20upx;}
	.content .anoWays .article{float: left;margin-right:10upx;}
	.content .anoWays .special{float: left;color:#409BE0;}
	.content .haveUserName{width:95%;text-align: right;color:#515151;margin-right: 5%;}
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
				userName:"",
				code:"",
				password:"",
				codeName:"获取验证码",
				timing:false,
				isAgree:true,
			}
		},
		onLoad(){
			// let param={
			// 	"userName":that.userName,
			// 	"passWord":that.passWord,
			// };
			// this._$InitRequest.request('http://127.0.0.1:8000/cmdb/ajaxDemo/', param).then(res => {
			// 	console.log( res , "index" );
			// },error=>{})
		},
		methods:{
			getUsername(e){ this.userName = e.target.value },
			getCode(e){ this.code = e.target.value },
			getPassWord(e){ this.password = e.target.value },
			goLogin(){uni.navigateTo({url:"../login"})},
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
			btnAgree(){
				if( this.isAgree == true ){
					this.isAgree = false
				}else{
					this.isAgree = true
				}
			},
			btnAgreement(index){
				if( index == 1 ){
					uni.navigateTo({url:"../../user/set/about/agree/agree?id=3"})
				}else{
					uni.navigateTo({url:"../../user/set/about/agree/agree?id=2"})
				}
			},
			btnRegister(){
				var that = this;
				var re = /[A-Za-z]+/;
				var result = this.password.search(re)
				if( this.userName == "" ){
					uni.showToast({icon:"none",title:"请输入手机号"})
					return;
				}else if( this.userName.length !== 11 ){
					uni.showToast({icon:"none",title:"请输入正确的手机号"})
					return;
				}else if( this.code == "" ){
					uni.showToast({icon:"none",title:"请输入验证码"})
					return;
				}else if( this.password == "" ){
					uni.showToast({icon:"none",title:"请输入密码"})
					return;
				}else if( this.isAgree == false ){
					uni.showToast({icon:"none",title:"请同意协议"})
					return;
				}else if( this.password.length < 8 || this.password.length > 16 ){
					uni.showToast({icon:"none",title:"请输入8-16位密码"})
				}else if( result < 0 ){
					uni.showToast({icon:"none",title:"请输入密码+数字"})
				}else{
					let param={
						"phone":this.userName,
						"code":this.code,
						"password":this.password,
					};
					this._$InitRequest.request('login/regist', param).then(res => {
						console.log( res.data.data );
						if( res.data.code !== 200 ){
							uni.showToast({icon:"none",title:res.data.mess})
							return;
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							setTimeout(function(){
								uni.navigateTo({
									url:"../login"
								})
							},1500)
						}
					},error=>{})
				}
			},
			
			

		}
	}
</script>