<template>
	<view>
		<view class="input-box">
			<view class="input-item">
			    <view class="input-label">手机号码</view>
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="输入有效手机号" class="input" >
					<button :disabled="!isCanSendCode" class="btn-code"  @click.stop="sendCode">{{sendMsg}}</button>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="输入5位验证码" type="number" v-model="code" maxlength="5" class="input">
				</view>
			</view>
			<button class="button" @click="show('QSPopup')">确认</button>
		</view>
		<QSPopup ref="QSPopup" :tapMaskHide="false">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					<view>温馨提示</view>
					
					<view>尊敬的用户，感谢您对棋特买菜一直以来的信任和支持！</view>
					
					<view>我们依据最新的监管要求更新了《用户注册隐私协议》，特向您说明如下：</view>
					<view>1. 为了向您提供交易相关基本功能，我们会收集和使用必要的信息，包括您的姓名、联系电话、地址等；</view>
					<view>2. 为保障您的账号和使用安全，您可能需要授权我们读取本机识别码，您有权拒绝或取消授权，取消后不会影响您使用我们提供的其他服务；</view>
					<view>3. 为了更好的为您提供商品配送服务，您可能需要授权我们获取您的位置权限，您有权拒绝或取消授权，取消后不会影响使用我们提供的其他服务；</view>
					<view>4. 我们会采取先进的安全措施保护您的信息安全；</view>
					<view>5. 未经您的许可，我们不会从第三方出获取、共享您的个人信息，更不会向第三方提供、共享您的个人信息；</view>
					<view>6. 您可以查询、更正、删除您的个人信息，您亦可以联系我们客服进行账户注销行为。</view>

				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="hides('QSPopup')">
						取消
					</view>
					<view class="del-btn-yes" @tap="submit">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	let timer = '';
	import http from '@/api/http.js'
	import {checkPhone,checkPwd,checkCode} from "@/common/common.js"
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				sendMsg:"获取验证码",
				isCanSendCode:true,
				phone:"",
				code:"",
				islogon:0,
				spellid:0,
				isCur:1,
				spread_user_id:0,//推广人id
			};
		},
		onLoad(option) {
			if(option.islogon){
				this.islogon = option.islogon
				this.spellid = option.id
			}
			if(option.spread_user_id){
				this.spread_user_id = option.spread_user_id
			}
			if(option.isCur){
				this.isCur = option.isCur
			}
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
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
				if(this.phone == '' || this.code ==''){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return;
				};
				if(!checkPhone(this.phone)){
					uni.showToast({
						title:'请输入正确手机号',
						icon:'none'
					})
					return;
				};
				if(this.code.length!=5){
					uni.showToast({
						title:'验证码错误',
						icon:'none'
					})
					return;
				};
				let data = {
					phone:this.phone,
					code:this.code
				}
				http('/Api/Login/yzCodeRegister','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						uni.navigateTo({
							url:"/pages/index/logon/setPassword?phone="+ this.phone +"&islogon="+this.islogon + "&id=" + this.spellid + "&isCur=" + this.isCur+'&spread_user_id=' + this.spread_user_id
						})
						// this.phone=''
						// this.code=''
					}
					if(res.data.status == '400'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						return;
					}
				})
				
				/*
				* 注册逻辑
				*/
				// this.$store.commit('update',['isLogin',true]);
				
			}
		}
	}
</script>

<style lang="scss">

	
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
					z-index: 5;
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
	.content-del{
			// height: 920upx;
			width: 670upx;
			background-color: white;
			border-radius: 20upx;
			.del-text{
				padding:20upx;
				// height: 820upx;
				box-sizing: border-box;
				color: #333;
			}
			.del-btn{
				display: flex;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				.del-btn-no{
					border-right: 1px solid #e5e5e5;
					color: #999;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
				.del-btn-yes{
					color: #FB4142;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
			}
		}
</style>
