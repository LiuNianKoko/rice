<template>
	<view>
		<view class="wrap">
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					+86
				</view>
				<input type="number" class="inputs" placeholder="请输入手机号" v-model="phone" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disBetween">
				<view class="disAlignCenter">
					<view class="inputs-left">
						验证码
					</view>
					<input type="number" class="inputs" placeholder="请输入短信验证码" v-model="code" placeholder-class="inputs-pla"/>
				</view>
				<view class="inputs-right disAlignCenter">
					<view class="lines">
						
					</view>
					<view class="get-code">
						<button :disabled="!isCanSendCode" class="btn-code font26"  @click.stop="sendCode">{{sendMsg}}</button>
					</view>
				</view>
			</view>
			<view class="bot">
				<image :src="sel?'/static/seled.png':'/static/sel.png'" class="sel" @click="changeSel"></image>
				请详细阅读并知晓
				<navigator url="./agreement" hover-class="none">
					<text style="color: #181C62;">《用户协议》</text>
				</navigator>
			</view>
			<view class="btn disCenter" @click="toSet()">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	let timer = '';
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				phone:'',
				code:'',
				sendMsg:"获取验证码",
				isCanSendCode:true,
				sel:true,//协议
			}
		},
		onLoad() {
			
		},
		methods: {
			changeSel(){
				this.sel = !this.sel
			},
			toSet(){
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
				if(this.code == ''){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				if(this.sel == false){
					uni.showToast({
						title:'请阅读并勾选协议',
						icon:'none'
					})
					return
				}
				let data = {
					phone:this.phone,
					code:this.code
				}
				http('/api/Login/yzCodeRegister','post',data).then(res=>{
					if(res.status == 200){
						let nickname = res.data.nickname
						uni.navigateTo({
							url:'/pages/login/setPassword?phone=' + this.phone + '&code=' + this.code + '&nickname=' + nickname 
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
					console.log(res)
				})
				
			},
			clearCodeInterval(){
			    clearInterval(timer);
			    this.sendMsg="获取验证码";
			},
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
			sendCode () {
				// this.setCodeInterval();
				// return
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
				let data = {
					phone:this.phone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:'发送成功',
							icon:'none'
						})
						this.setCodeInterval();
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
						return
					}
					console.log(res)
				})
				/*
				* 发送验证码逻辑
				*/
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 32upx;
	}
	.inputs-wrap{
		height: 90upx;
		border: 1px solid #DEDEDE;
		border-radius: 4upx;
		padding: 10upx 23upx 10upx 30upx;
		margin-bottom: 32upx;
		.inputs-left{
			color: #31323C;
			font-size: 30upx;
			width: 140upx;
		}
		.inputs{
			font-size: 26upx;
		}
		.inputs-pla{
			color: #CCCCCC;
		}
	}
	.lines{
		width: 1px;
		height: 40upx;
		background: #E5E5E5;
		
	}
	.get-code{
		margin-left: 24upx;
		width: 130upx;
		text-align: center;
	}
	.btn-code{
		background-color: #fff !important;
		color: #181C62 !important;
		border: none;
		padding: 0;
		margin: 0;
	}
	.btn-code::after{
		border: none;
	}
	.bot{
		display: flex;
		align-items: center;
		color: #31323C;
		margin-bottom: 40upx;
		.sel{
			width: 30upx;
			height: 30upx;
			margin-right: 14upx;
		}
	}
	.btn{
		background:#181C62;
		height: 90upx;
		border-radius: 10upx;
		color: #fff;
		font-size: 32upx;
	}
</style>
