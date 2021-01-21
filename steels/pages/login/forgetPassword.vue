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
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					密码
				</view>
				<input type="password" class="inputs width100" placeholder="请输入密码(6-32位数字英文组合)" v-model="password1" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					确认密码
				</view>
				<input type="password" class="inputs width100" placeholder="再次输入密码(6-32位数字英文组合)" v-model="password2" placeholder-class="inputs-pla"/>
			</view>
			<view class="btn disCenter" @click="reLog">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	let timer = ''
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				phone:'',
				code:'',
				password1:'',
				password2:'',
				sendMsg:"获取验证码",
				isCanSendCode:true,
				type:1,//1忘记密码  2修改密码
			}
		},
		onLoad(option) {
			if(option.type){
				this.type = option.type
			}
			if(this.type == 2){
				uni.setNavigationBarTitle({
					title:'修改登录密码'
				})
			}
		},
		methods: {
			reLog(){
				if(this.phone==''){
					this.$util.showToast('请输入手机号')
					return
				}
				if(this.code==''){
					this.$util.showToast('请输入验证码')
					return
				}
				if(this.password1==''){
					this.$util.showToast('请输入密码')
					return
				}
				if(this.password2==''){
					this.$util.showToast('请确认密码')
					return
				}
				let reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/)
				if(reg.test(this.password1)){
					if(this.password1 != this.password2){
						this.$util.showToast('密码不一致')
						return
					}
					this.log()
				}else{
					this.$util.showToast('密码格式为6-32位数字英文组合')
				}
				
			},
			log(){
				let data = {
					phone:this.phone,
					code:this.code,
					type:2,
					password:this.password1,
					repassword:this.password2
				}
				http('/api/Login/register','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:res.message,
							icon:'none'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},1200)
					}else{
						uni.showToast({
							title:res.message || res.msg,
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
			flex: none;
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
		margin-top: 60upx;
	}
</style>
