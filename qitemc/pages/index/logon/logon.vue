<template>
	<view>
		<view class="logo">
			<image src="/static/logo.png"></image>
		</view>
	    <view class="input-box">
	        <view class="input-item">
	            <view class="input-label">
					<image src="/static/phone.png"></image>
				</view>
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" placeholder="手机号" class="input" >
				</view>
	        </view>	
	        <view class="input-item">
				<view class="input-label">
					<image src="/static/password.png"></image>
				</view>
				<view class="input-body">
					<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="登录密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/eye1.png':'/static/eye2.png'"></image>
				</view>
	        </view>
			<button class="button" @click="submit">登录</button>
	        <view class="select">
	            <!-- <navigator url="/pages/index/logon/register" hover-class="none">手机快速注册</navigator> -->
				<view class="" @click="toRegister">
					手机快速注册
				</view>
	            <navigator url="/pages/mine/forgetpaypwd" hover-class="none">忘记密码</navigator>
	        </view>
	    </view>
		<QSPopup ref="QSPopup" :tapMaskHide="false">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					
					<view>亲，感谢你对棋特买菜的信任！</view>
					
					<view>请注意，在您使用本软件过程中我们会按照
							<text class="txt" @click="toPro">《棋特买菜隐私政策》</text>
						、
							<text class="txt" @click="toAgree">《棋特买菜用户协议》</text>
						
						收集、使用和共享您的个人信息，请认真阅读并充分理解。
					</view>
					<view>特别提示：</view>
					<view>1、为向您提供交易相关基本功能，我们会收集、使用必要的信息；</view>
					<view>2、基于您的授权，我们可能获取您的位置等信息，您有权拒绝或取消授权；</view>
					<view>3、我们会采用业界先进的安全措施保护您的信息安全；</view>
					<view>4、未经您的同意，我们不会从第三方处获取、共享或向其提供您的信息；</view>
					
					
				</view>
				<view class="del-btn">
					<!-- <view class="del-btn-no" @tap="hides('QSPopup')">
						取消
					</view> -->
					<view class="del-btn-yes" @tap="surehide">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import {checkPhone,checkPwd} from "@/common/common.js"
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				isHidePassword:true,
				phone:"",
				password:"",
				islogon:0,	//2 从拼团详情分享页过来 3普通商品详情  4预售  5拼团  6秒杀
				spellid:0,	//拼团id
				cid:'',
				isCur:1,
				spread_user_id:0,//推广人id
			};
		},
		onLoad(option) {
			this.checkToken();
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
			if(!uni.getStorageSync('looktype')){
				setTimeout(()=>{
					this.show('QSPopup')
				},50)
			}
			let cid = uni.getStorageSync('cid')
			if(!cid){
				setTimeout(()=>{
					cid = plus.push.getClientInfo().clientid
					this.cid = cid
				},500)
			}else{
				this.cid = cid
			}
			console.log(this.cid)
		},
		onShow() {
			
		},
		methods: {
			toRegister(){
				uni.navigateTo({
					url:'/pages/index/logon/register?islogon='+this.islogon + '&isCur='+this.isCur + '&id=' + this.spellid+'&spread_user_id=' + this.spread_user_id
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			surehide(){
				this.hides('QSPopup')
				uni.setStorageSync('looktype',1)
			},
			toPro(){
				uni.navigateTo({
					url:"/pages/index/logon/userpro"
				})
			},
			toAgree(){
				uni.navigateTo({
					url:"/pages/index/logon/useragree"
				})
			},
			checkToken(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo','get',data).then(res=>{
					
					if(res.data.status==200){
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				})
			},
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			submit() {
				if(this.phone == '' || this.password == ''){
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
				let data = {
					phone:this.phone,
					password:this.password
				}
				http('/api/Login/pwd_login','post',data).then(res=>{
					if(res.data.status == '200'){
						uni.setStorageSync('token',res.data.data.token)
						uni.setStorageSync('vip',res.data.data.vip)
						this.jump()
						
					} else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					console.log(res)
				})
			},
			jump(){
				if(this.islogon==2){
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							uni.navigateTo({
								url:'/pages/mine/spellDetail?id='+this.spellid+'&spread_user_id=' + this.spread_user_id
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url:'/pages/mine/spellDetail?id='+this.spellid+'&spread_user_id=' + this.spread_user_id
					})
					// #endif
				}else if(this.islogon==3){
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							uni.navigateTo({
								url:'/pages/index/detail?goodsid='+this.spellid+'&spread_user_id=' + this.spread_user_id
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url:'/pages/index/detail?goodsid='+this.spellid+'&spread_user_id=' + this.spread_user_id
					})
					// #endif
				}else if(this.islogon==4){
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							uni.navigateTo({
								url:'/pages/index/advanceBuy?presaleid='+this.spellid+'&spread_user_id=' + this.spread_user_id
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url:'/pages/index/advanceBuy?presaleid='+this.spellid+'&spread_user_id=' + this.spread_user_id
					})
					// #endif
				}else if(this.islogon==5){
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							uni.navigateTo({
								url:'/pages/index/gorupBuy?groupid='+this.spellid+'&spread_user_id=' + this.spread_user_id
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url:'/pages/index/gorupBuy?groupid='+this.spellid+'&spread_user_id=' + this.spread_user_id
					})
					// #endif
				}else if(this.islogon==6){
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							uni.navigateTo({
								url:'/pages/index/seckillBuy?seckillid='+this.spellid+'&isCur='+this.isCur+'&spread_user_id=' + this.spread_user_id
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url:'/pages/index/seckillBuy?seckillid='+this.spellid+'&isCur='+this.isCur+'&spread_user_id=' + this.spread_user_id
					})
					// #endif
				}else{
					// #ifdef APP-PLUS
					let tokens = uni.getStorageSync('token')
					for(var i=1;i<2;i++){
					  if(this.cid){
							this.getcid(tokens)
							console.log('log')
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}else{
							i--
							this.cid = plus.push.getClientInfo().clientid
							
							console.log(111)
						}
					}
					// #endif
					// #ifndef APP-PLUS
					uni.reLaunch({
						url:'/pages/index/index'
					})
					// #endif
				}
			},
			getcid(token){
				console.log(this.cid)
				let data = {
					token:token,
					cid:this.cid
				}
				http('/api/user/set_user_push', 'post',data).then(res => {
					if(res.data.status == '200'){
						console.log('success')
					}else{
						console.log('fail')
					}
				})
			},
		}
	}
</script>

<style lang="scss">

	.logo{
		padding: 100upx 0;
		display: flex;
		justify-content: center;
		image{
			width: 260upx;
			height: 240upx;
		}
	}
	
	button::after{
		border: none;
	}
	.input-box {
		padding: 60upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			line-height: 100upx;
			height: 100upx;
			width:630upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 10upx 50upx 0px rgba(0,71,25,0.1);
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
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
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
			}
			
		}
		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color:#00a0e9;
		}
	}
	.button{
		margin-top: 60upx;
		line-height: 100upx;
		color: white;
		font-size: 40upx;
		width:630upx;
		height:100upx;
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
				.txt{
					color: #00a0e9;
				}
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
