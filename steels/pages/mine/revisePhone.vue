<template>
	<view>
		<view class="input-box">
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					+86
				</view>
				<input type="number" class="inputs" placeholder="请输入旧手机号" disabled v-model="oldphone" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disBetween">
				<view class="disAlignCenter">
					<view class="inputs-left">
						验证码
					</view>
					<input type="number" class="inputs" placeholder="请输入短信验证码" v-model="oldcode" placeholder-class="inputs-pla"/>
				</view>
				<view class="inputs-right disAlignCenter">
					<view class="lines">
						
					</view>
					<view class="get-code">
						<button :disabled="!isCanSendCode1" class="btn-code font26"  @click.stop="sendCode">{{sendMsg1}}</button>
					</view>
				</view>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					+86
				</view>
				<input type="number" class="inputs" placeholder="请输入新手机号" v-model="newphone" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disBetween">
				<view class="disAlignCenter">
					<view class="inputs-left">
						验证码
					</view>
					<input type="number" class="inputs" placeholder="请输入短信验证码" v-model="newcode" placeholder-class="inputs-pla"/>
				</view>
				<view class="inputs-right disAlignCenter">
					<view class="lines">
						
					</view>
					<view class="get-code">
						<button :disabled="!isCanSendCode2" class="btn-code font26"  @click.stop="sendCode2">{{sendMsg2}}</button>
					</view>
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
			this.getMine()
		},
		methods: {
			getMine(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_user_info','post',data).then(res=>{
					if(res.status==200){
						this.oldphone = res.data.phone
					}
				})
			},
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
				// this.setCodeInterval1()
				// return
				let data = {
					phone:this.oldphone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:res.message || res.msg,
							icon:'none'
						})
						 this.setCodeInterval1();
					}else{
						uni.showToast({
							title:res.message|| res.msg,
							icon:'none'
						})
					}
					console.log(res)
				})
				//发送验证码
			    // if (!checkPhone(this.oldphone) ) {
			    //     return
			    // }
			   
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
				// this.setCodeInterval2()
				// return
				let data = {
					phone:this.newphone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:res.message|| res.msg,
							icon:'none'
						})
						  this.setCodeInterval2();
					}else{
						uni.showToast({
							title:res.message|| res.msg,
							icon:'none'
						})
					}
					console.log(res)
				})
				//发送验证码
			    // if (!checkPhone(this.newphone) ) {
			    //     return
			    // }
			  
				/*
				* 发送验证码逻辑
				*/
			},
			submit() {
				if(this.oldphone =='' ||this.oldcode =='' ||this.newphone == '' || this.newcode ==''){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return;
				};
				let reg = new RegExp(/^1[3456789]\d{9}$/)
				if(reg.test(this.newphone)==false){
					this.$util.showToast('请输入正确手机号')
					return
				}
				let data = {
					token:uni.getStorageSync('token'),
					phone:this.oldphone,
					code:this.oldcode,
					replace_phone:this.newphone,
					replace_code:this.newcode
				}
				http('/api/user/replacePhone','post',data).then(res=>{
					console.log(res)
					if(res.status == 200){
						this.$util.showToast(res.message || rse.msg)
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},1200)
					}else{
						uni.showToast({
							title:res.message || rse.msg,
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
		padding: 32upx;
		font-size: 30upx;
		
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
	.button{
		line-height: 90upx;
		height: 90upx;
		font-size: 32upx;
		height:100upx;
		color: #FFFFFF;
		margin-top: 60upx;
		background:#181C62;
		border-radius:10upx;
	}
</style>
