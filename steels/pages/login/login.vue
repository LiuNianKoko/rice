<template>
	<view>
		<view class="logo-wrap disCenter">
			<image src="/static/logo.png" class="logo" mode=""></image>
		</view>
		<view class="box">
			<view class="inputs-wrap disAlignCenter">
				<view class="disCenter">
					<image src="/static/log-phone.png" class="log-icon" mode=""></image>
				</view>
				<input type="number" class="inputs" placeholder="手机号" v-model="phone" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="disCenter">
					<image src="/static/log-pass.png" class="log-icon" mode=""></image>
				</view>
				<input type="text" class="inputs" placeholder="登录密码" v-model="password" :password="isHidePassword?true:false" placeholder-class="inputs-pla"/>
				<image @click="isHidePasswordClick" class="log-icon log-eye" src="/static/log-eye.png"></image>
			</view>
			<view class="btn disCenter" @click="login">
				登录
			</view>
			<view class="font32 disBetween">
				<navigator url="/pages/login/register" hover-class="none">
					<view class="">
						手机快速注册
					</view>
				</navigator>
				<navigator url="/pages/login/forgetPassword" hover-class="none">
					<view class="">
						忘记密码
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	export default {
		data() {
			return {
				phone:'',
				password:'',
				isHidePassword:true,
			}
		},
		onLoad() {
			// if(uni.getStorageSync('token') && uni.getStorageSync('token') != ''){
			// 	this.checkToken()
			// }
		},
		onShow() {
			
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			login(){
				if(this.phone==''){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}else{
					let reg = new RegExp(/^1[3456789]\d{9}$/)
					if(reg.test(this.phone)==false){
						uni.showToast({
							title:'手机号输入有误',
							icon:'none'
						})
						return
					}
				}
				if(this.password == ''){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return
				}
				let data = {
					phone:this.phone,
					password:this.password
				}
				http('/api/Login/pwd_login','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:res.message,
							icon:'none'
						})
						uni.setStorageSync('token',res.data.token)
						// #ifdef APP-PLUS
						let cid = uni.getStorageSync('cid')
						if(cid&&cid!='null'){
							this.getcid(cid) 
						}else{
							setTimeout(()=>{
								cid = plus.push.getClientInfo().clientid
								this.getcid(cid)
							},500)
						}
						// #endif
						// #ifdef H5
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1200)
						// #endif
						
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
						return
					}
					console.log(res)
				})
			},
			// 获取设备cid
			getcid(cid){
				let data = {
					token:uni.getStorageSync('token'),
					cid:cid
				}
				console.log(data)
				http('/api/user/set_user_push', 'post',data).then(res => {
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},1200)
				})
			},
			checkToken(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_user_info','post',data).then(res=>{
					if(res.status==200){
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.logo-wrap{
		padding-top: 30%;
		padding-bottom: 120upx;
		.logo{
			width: 180upx;
			height: 180upx;
		}
	}
	.box{
		padding: 0 60upx;
		.inputs-wrap{
			position: relative;
			height: 100upx;
			background: #FFFFFF;
			box-shadow: 1px 10upx 50upx 0px rgba(2, 2, 2, 0.1);
			border-radius: 10upx;
			padding: 10upx 25upx;
			margin-bottom: 40upx;
			.log-icon{
				width: 44upx;
				height: 44upx;
				margin-right: 22upx;
			}
			
			.log-eye{
				width: 44upx;
				height: 44upx;
				position: absolute;
				right: 30upx;
				top: 50%;
				transform: translateY(-50%);
			}
			.inputs{
				font-size: 32upx;
			}
			.inputs-pla{
				color: #ccc;
			}
		}
		.btn{
			height: 100upx;
			background: #181C62;
			box-shadow: 1px 10upx 50upx 0px rgba(2, 2, 2, 0.1);
			border-radius: 10upx;
			color: #fff;
			font-size: 40upx;
			margin-top: 60upx;
			margin-bottom: 40upx;
		}
	}
	
</style>
