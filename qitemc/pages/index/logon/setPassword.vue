<template>
	<view>
		<view class="input-box">
			
			<view class="input-item">
				<view class="input-label">登录密码</view>
				<view class="input-body">
					<input v-model="password1" type="text" style="margin-right: 50upx;" placeholder="输入登录密码" maxlength="20"  class="input" />
					
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">确认密码</view>
				<view class="input-body">
					<input v-model="password2" type="text" style="margin-right: 50upx;" placeholder="再次输入登录密码" maxlength="20"  class="input" />
					
				</view>
			</view>
			<view class="explain">
				密码长度6-32位，数字英文组合区分大小写
			</view>
			<button class="button" @click="submit">确认</button>
			<view class="agreement disFlex">
				<image :src="isHide?'/static/select-green.png':'/static/unselect.png'" @tap="isSure"></image>
				我已阅读并同意
				<navigator url="/pages/index/logon/useragree" class="agree-text">
					《用户隐私保护提示》
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import {checkPwd} from "@/common/common.js"
	export default {
		data() {
			return {
				isHide:false,
				phone:'',
				password1:'',
				password2:'',
				cid:'',
				islogon:0,
				spellid:0,
				isCur:1,
				spread_user_id:0,//推广人id
			};
		},
		onLoad(option) {
			this.phone = option.phone
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
			this.cid = uni.getStorageSync('cid')
		},
		methods:{
			isSure(){
				this.isHide = !this.isHide
			},
			submit() {
				if(this.password1 == ''|| this.password2 == ''){
					uni.showToast({
						title:'请输入正确的密码',
						icon:'none'
					})
					return;
				};
				if(this.password1 != this.password2){
					uni.showToast({
						title:'两次密码不一致',
						icon:'none'
					})
					return;
				};
				if(!checkPwd(this.password1) || !checkPwd(this.password2)){
					uni.showToast({
						title:'请输入正确的密码',
						icon:'none'
					})
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
					type:1,
					phone:this.phone,
					password:this.password1,
					repassword:this.password2
				}
				http('/api/Login/register','post',data).then(res=>{
					if(res.data.status == '200'){
						uni.showToast({
							title:'注册成功'
						})
						uni.setStorageSync('token',res.data.data.token);
						uni.setStorageSync('vip',res.data.data.vip);
						
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
									setTimeout(function(){
										uni.reLaunch({
											// url:'/pages/mine/mine',
											url:'/pages/mine/proinfo'
										})
									},1000)
								}else{
									i--
									this.cid = plus.push.getClientInfo().clientid
									
									console.log(111)
								}
							}
							// #endif
							// #ifndef APP-PLUS
							setTimeout(function(){
								uni.reLaunch({
									// url:'/pages/mine/mine',
									url:'/pages/mine/proinfo'
								})
							},1000)
							// #endif
						}
						
					}else{
						uni.showToast({
							title:res.data.message ||res.data.msg,
							icon:'none'
						})
						return;
					}
					console.log(res)
				})
				/*
				* 注册逻辑
				*/
				// this.$store.commit('update',['isLogin',true]);
				
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

	
	button::after{
		border: none;
	}
	.input-box {
		padding: 60upx;
		font-size: 30upx;
		.explain{
			color: #333333;
			margin-top: 30upx;
		}
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
				    transform: translateY(-50%);
					color: #45B443;
					box-sizing: border-box;
					text-align: center;
					padding: 0;
					line-height: 60upx;
					width:160upx;
					height:60upx;
					border:2upx solid #45B443;
					border-radius:6upx;
				}
			}
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
	}
	
	.button{
		line-height: 100upx;
		height: 100upx;
		font-size: 40upx;
		width:630upx;
		height:100upx;
		color: #FFFFFF;
		margin-top: 60upx;
		background:#00a0e9;
		// box-shadow:0px 10upx 20upx 0px #00a0e9;
		border-radius:10upx;
	}
</style>
