<template>
	<view>
		<view class="input-box">
			<view class="input-item">
			    <view class="input-label">+86</view>
				<view class="input-body">
					<input v-model="oldphone" maxlength="11" type="number" disabled style="margin-right: 160upx;" placeholder="请输入旧手机号" class="input" >
					<button :disabled="!isCanSendCode1" class="btn-code"  @click="sendCode">{{sendMsg1}}</button>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="请输入短信验证码" type="number" v-model="oldcode" maxlength="6" class="input">
				</view>
			</view>
			<view class="input-item">
			    <view class="input-label">+86</view>
				<view class="input-body">
					<input v-model="newphone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入新手机号" class="input" >
					<button :disabled="!isCanSendCode2" class="btn-code"  @click="sendCode2">{{sendMsg2}}</button>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="请输入短信验证码" type="number" v-model="newcode" maxlength="6" class="input">
				</view>
			</view>
			<button class="button" @click="submit">确认</button>
		</view>
	</view>
</template>

<script>
	let timer1 = '';
	let timer2 = '';
	import http from '@/api/http.js'
	import {checkPhone,checkPwd,checkCode} from "@/common/common.js"
	export default {
		data() {
			return {
				sendMsg1:"获取验证码",
				sendMsg2:"获取验证码",
				isCanSendCode1:true,
				isCanSendCode2:true,
				oldphone:"",
				newphone:"",
				oldcode:"",
				newcode:""
			};
		},
		onLoad() {
			this.oldphone = this.$util.getStorage('phone')
		},
		methods: {
			setCodeInterval1 () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer1);
			    timer1 = setInterval(() => {
			        time--;
			        this.isCanSendCode1=false;
			        this.sendMsg1=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode1=true;
			            this.sendMsg1="重新获取";
			            clearInterval(timer1);
			        }
			    }, 1000)
			},
			clearCodeInterval(){
			    clearInterval(timer1);
			    this.codemsg="获取验证码";
			},
			sendCode () {
				let data = {
					phone:this.oldphone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.data.status == '200'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					if(res.data.status == '400'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					console.log(res)
				})
				//发送验证码
			    if (!checkPhone(this.oldphone) ) {
			        return
			    }
			    this.setCodeInterval1();
				/*
				* 发送验证码逻辑
				*/
			},
			setCodeInterval2 () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer2);
			    timer2 = setInterval(() => {
			        time--;
			        this.isCanSendCode2=false;
			        this.sendMsg2=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode2=true;
			            this.sendMsg2="重新获取";
			            clearInterval(timer2);
			        }
			    }, 1000)
			},
			clearCodeInterval2(){
			    clearInterval(timer2);
			    this.codemsg="获取验证码";
			},
			sendCode2 () {
				let data = {
					phone:this.newphone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.data.status == '200'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					if(res.data.status == '400'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					console.log(res)
				})
				//发送验证码
			    if (!checkPhone(this.newphone) ) {
			        return
			    }
			    this.setCodeInterval2();
				/*
				* 发送验证码逻辑
				*/
			},
			submit() {
				if(this.oldcode =='' ||this.newphone == '' || this.newcode ==''){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return;
				};
				if(!checkPhone(this.newphone)){
					uni.showToast({
						title:'请输入正确手机号',
						icon:'none'
					})
					return;
				};
				if(this.oldcode.length!=5 ||this.newcode.length!=5){
					uni.showToast({
						title:'验证码错误',
						icon:'none'
					})
					return;
				};
				let data = {
					token:uni.getStorageSync('token'),
					code:this.oldcode,
					replace_phone:this.newphone,
					replace_code:this.newcode
				}
				http('/api/user/replacePhone','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.$util.showToast(res.data.message)
						// uni.setStorageSync('token',res.data.data.token);
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/index/logon/logon'
							})
						},1000)
					}
					if(res.data.status == '400'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						return;
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
	button::after{
		border: none;
	}
	.input-box {
		padding: 60upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 133upx;
			height: 133upx;
			.input-label {
				width: 150upx;
			}
			.input-body{
				position: relative;
				height: 133upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 133upx;
					height: 133upx;
					position: relative;
					font-size: 28upx;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
					z-index: 2;
				    transform: translateY(-50%);
					color: #00a0e9;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					line-height: 60upx;
					width:160upx;
					height:60upx;
					border:2upx solid #00a0e9;
					border-radius:6upx;
				}
			}
			
		}
	}
	.button{
		line-height: 100upx;
		height: 100upx;
		font-size: 40upx;
		width:630upx;
		height:100upx;
		color: #FFFFFF;
		margin-top: 80upx;
		background:#00a0e9;
		// box-shadow:0px 10upx 20upx 0px #00a0e9;
		border-radius:10upx;
	}
</style>
