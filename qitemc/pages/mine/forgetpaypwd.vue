<template>
	<view class="setpay-wrap">
		<view class="itemes disflex border">
			<text class="label">+86</text>
			<input v-model="phone" class="ipt flxe-1" type="text" value="" placeholder="请输入手机号" />
		</view> 
		<view class="itemes disflex border">
			<text class="label">验证码</text>
			<input v-model="code" class="ipt flxe-1" type="number" maxlength="5" value="" placeholder="请输入短信验证码" />
			<view class="yanzma">
				<button :disabled="!isCanSendCode" class="btn-code"  @click.stop="sendCode">{{sendMsg}}</button>
			</view>
		</view>
		<view class="itemes disflex border">
			<text class="label">新密码</text>
			<input v-model="password1" class="ipt flxe-1" type="password" value="" placeholder="请输入密码(6-20位数字与字母组合)" />
		</view>
		<view class="itemes disflex border">
			<text class="label">确认密码</text>
			<input v-model="password2" class="ipt flxe-1" type="password" value="" placeholder="请再次输入新密码" />
		</view>
		<view class="sureadd" @click="submit">
			确认
		</view>
	</view>
</template>

<script>
	let timer = '';
	import http from '@/api/http.js'
	import {checkPhone,checkPwd,checkCode} from "@/common/common.js"
	export default {
		data() {
			return {
				sendMsg:"获取验证码",
				isCanSendCode:true,
				phone:"",
				password1:"",
				password2:"",
				code:""
			};
		},
		onLoad(option) {
			console.log(option)
			if(option.forgettype == '2'){
				uni.setNavigationBarTitle({
					title:'修改登录密码'
				})
			}
		},
		methods: {
			setCodeInterval () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer);
			    timer = setInterval(() => {
			        time--;
			        this.isCanSendCode=false;
			        this.sendMsg=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode=true;
			            this.sendMsg="重新获取";
			            clearInterval(timer);
			        }
			    }, 1000)
			},
			clearCodeInterval(){
			    clearInterval(timer);
			    this.codemsg="获取验证码";
			},
			sendCode () {
				
				let data = {
					phone:this.phone
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
			    if (!checkPhone(this.phone)) {
			        return
			    }
			    this.setCodeInterval();
				
				/*
				* 发送验证码逻辑
				*/
			},
			submit() {
				if(this.password1 == ''|| this.password2 == '' || this.phone == '' || this.code == ''){
					this.$util.showToast('不能为空')
					return;
				}
				if(!checkPhone(this.phone)){
					return;
				};
				if(!checkPwd(this.password1)){
					return;
				};
				if(!checkCode(this.code)){
					return;
				};
				if(this.password1 != this.password2){
				
					this.$util.showToast('两次密码不一致')
					return;
				};
				let data = {
					type:2,
					phone:this.phone,
					password:this.password1,
					repassword:this.password2,
					code:this.code
				}
				http('/api/Login/register','post',data).then(res=>{
					if(res.data.status == '200'){
						
						this.$util.showToast(res.data.message)
						uni.setStorageSync('token',res.data.data.token);
						uni.setStorageSync('vip',res.data.data.vip);
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/index/logon/logon'
							})
						},1000)
						
					}
					if(res.data.status == '400'){
						uni.showToast({
							title:res.data.message || res.data.msg,
							icon:'none'
						})
						return;
					}
					console.log(res)
				})
				// uni.reLaunch({
				// 	url:'/pages/index/logon/logon'
				// })
			}
		}
	}
</script>

<style lang="scss">
	.sureadd{
		width:90%;
		height:100upx;
		line-height: 100upx;
		text-align: center;
		color: #FFFFFF;
		margin:0 auto;
		font-size: 34upx;
		margin-top: 50upx;
		background:#00a0e9;
		border-radius:10px;
	}
	.setpay-wrap{
		padding:30upx;
		.itemes{
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			margin-bottom: 26upx;
			position: relative;
			
			.yanzma{
				position: absolute;
				right: 20upx;
				top:20upx;
				z-index: 2;
				.btn-code{
				    // position: absolute;
				    // right: 0upx;
				    // top:50%;
				    // transform: translateY(-50%);
					color: #00a0e9;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					line-height: 60upx;
					width:160upx;
					height:60upx;
					outline: none;
				}
			}
			.label{
				font-size: 34upx;
				color: #000000;
				padding-left: 30upx;
			}
			.ipt{
				height: 80upx;
				line-height: 80upx;
				font-size: 30upx;
				padding-left: 30upx;
				margin-top: 10upx;
			}
		}
	}
</style>
