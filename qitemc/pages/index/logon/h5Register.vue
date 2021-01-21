<template>
	<view>
		<view class="h5reg-wraps">
			<view class="logo">
				<image src="/static/logo.png"></image>
			</view>
			<view class="input-box">
			    <view class="input-item">
			        <view class="input-label">
						<image src="/static/phone.png"></image>
					</view>
					<view class="input-body">
						<input v-model="phone" maxlength="11" type="number" placeholder="请输入您的手机号码" class="input" >
					</view>
			    </view>
				<view class="input-item">
				    <view class="input-label">
						<image src="/static/verify.png"></image>
					</view>
					<view class="input-body">
						<input v-model="code" maxlength="5" type="number" placeholder="请输入短信验证码" class="input" >
						<button :disabled="!isCanSendCode" class="btn-code"  @click.stop="sendCode">{{sendMsg}}</button>
					</view>
				</view>
			    <view class="input-item">
					<view class="input-label">
						<image src="/static/password.png"></image>
					</view>
					<view class="input-body">
						<input v-model="password" type="text" style="margin-right: 50upx;" placeholder="请设置密码" maxlength="20"  class="input" />
					</view>
			    </view>
				<button class="button" @click="show('QSPopup')">立即注册</button>
				<view class="agreement disFlex">
					<image :src="isHide?'/static/select-green.png':'/static/unselect.png'" @tap="isSure"></image>
					我已阅读并同意
					<navigator url="/pages/index/logon/useragree" class="agree-text">
						《用户隐私保护提示》
					</navigator>
				</view>
			    <view class="select" @click="toLoad">
			        <!-- <navigator url="/pages/index/logon/register" hover-class="none">手机快速注册</navigator> -->
					已注册？ 直接下载APP
			    </view>
			</view>
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
				password:"",
				userId:0,
				links:'',
				isHide:true,
			};
		},
		onLoad(option) {
			console.log(option,'1111')
			
			this.userId = option.user_id
			if(option.scene){
				let scene = decodeURIComponent(option.scene)//参数二维码传递过来的参数
				this.userId = scene.split("=")[1]
				console.log(scene)
			}
			if(option.q){
				let q = decodeURIComponent(option.q)//参数二维码传递过来的参数
				console.log(q)
				this.userId = q.split("?")[1].split("=")[1]
			}
			this.getCode()
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			isSure(){
				this.isHide = !this.isHide
			},
			// checkToken(){
			// 	let data = {
			// 		token:uni.getStorageSync('token')
			// 	}
			// 	http('/api/User/get_userinfo','get',data).then(res=>{
					
			// 		if(res.data.status==200){
			// 			uni.switchTab({
			// 				url:'/pages/index/index'
			// 			})
			// 		}
			// 	})
			// },
			getQueryStringByName(name){
			     // let result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
			     // if(result == null || result.length < 1){
			     //     return "";
			     // }
			     // return result[1];
			},
			toLoad(){
				uni.navigateTo({
					url:'/pages/index/logon/h5Load?src='+this.links
				})
			},
			getCode(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.links = res.data.data.link
					console.log(res)
				})
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
				if(this.phone == '' || this.password == ''|| this.code == ''){
					uni.showToast({
						title:'不能为空',
						icon:'none'
					})
					return
				}
				if(!checkPhone(this.phone)){
					return;
				};
				if(!checkPwd(this.password)){
					return;
				};
				if(!checkCode(this.code)){
					return;
				};
				if(this.isHide != true){
					uni.showToast({
						title:'请阅读并勾选协议',
						icon:'none'
					})
					return;
				}
				let data = {
					phone:this.phone,
					password:this.password,
					code:this.code,
					user_id:this.userId
				}
				http('/api/Login/registerH5','post',data).then(res=>{
					uni.setStorageSync('token',res.data.data.token)
					uni.setStorageSync('vip',res.data.data.vip)
					
					if(res.data.status == '200'){
						// uni.switchTab({
						// 	url:'/pages/index/index'
						// })
						uni.reLaunch({
							// url:'/pages/mine/mine',
							url:'/pages/mine/proinfo'
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
			}
		}
	}
</script>

<style lang="scss">
	page{
		// background:linear-gradient(90deg,rgba(69,180,67,1) 0%,rgba(122,205,121,1) 100%);
		background:linear-gradient(90deg,#00a0e9 0%,#66c0ea 100%);
	}
	.h5reg-wraps{
		background-color: #FFFFFF;
		width: 670upx;
		// height: 1000upx;
		border-radius:20upx ;
		margin-top: 90upx;
		margin-left: 40upx;
	}
	.logo{
		padding: 60upx 0 80upx;
		display: flex;
		justify-content: center;
		image{
			width: 220upx;
			height: 190upx;
		}
	}
	
	button::after{
		border: none;
	}
	.input-box {
		padding: 60upx 32upx;
		font-size: 28upx;
		.input-item {
			display: flex;
			line-height: 90upx;
			height: 90upx;
			width:600upx;
			background:rgba(255,255,255,1);
			border:1px solid #f2f2f5;
			border-radius:10upx;
			margin-bottom: 40upx;
			.input-label {
				width: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 46upx;
					height: 46upx;
				}
			}
			.input-body{
				position: relative;
				height: 90upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 90upx;
					height: 90upx;
					position: relative;
					font-size: 32upx;
				}
				.eye{
					position: absolute;
					height: 46upx;
					width: 46upx;
					right: -34upx;
					top: 50%;
					transform: translateY(-50%);
					image{
						width: 46upx;
						height: 46upx;
					}
				}
				.btn-code{
				    position: absolute;
					z-index: 5;
				    right: -30upx;
				    top:50%;
				    transform: translateY(-50%);
					color:#00a0e9;
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
		.select {
			padding-top: 20upx;
			text-align: center;
			color: #333333;
		}
	}
	.button{
		margin-top: 60upx;
		line-height: 100upx;
		color: white;
		font-size: 32upx;
		width:400upx;
		height:100upx;
		background:#00a0e9;
		border-radius:10upx;
	}
	.agreement{
		margin-top: 33upx;
		font-size: 32upx;
		align-items: center;
		image{
			width: 36upx;
			height: 36upx;
			margin-right: 16upx;
		}
		.agree-text{
			color: #00a0e9;
		}
	}
	.content-del{
			height: 920upx;
			width: 670upx;
			background-color: white;
			border-radius: 20upx;
			.del-text{
				padding:20upx;
				height: 820upx;
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

