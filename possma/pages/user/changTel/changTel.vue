<template>
	<view class="content">
		<input class="inputBox" type="number" :value="tel" disabled>
		<view class="btnBox">
			<input class="inputBox marignInput" type="number" placeholder="请输入短信验证码" maxlength="6" @input="getCode">
			<view class="btn" @tap="CodeBtn(1)">{{codeName}}</view>
		</view>
		
		<input class="inputBox marignInput" type="number" maxlength="11" placeholder="请输入新手机号"  	@input="getNewTel">
		<view class="btnBox">
			<input class="inputBox marignInput" type="number" placeholder="请输入短信验证码" maxlength="6" @input="getCodes">
			<view class="btn" @tap="CodeBtn(2)">{{codeNames}}</view>
		</view>
		<!-- <input class="inputBox marignInput" type="number" maxlength="11" placeholder="请再次输入手机号"	@input="SureNewTel"> -->
		
		
		<view class="sure" @tap="sureBtn">确认</view>
		
		<view class="showShadow" v-if="showDow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="title">{{status.title}}</view>
				<view class="contents">{{status.content}}</view>
				<view class="iconBox"><image class="icons" :src="status.src" mode="widthFix"></image></view>
				<view class="sure" @tap="shadowSure">确定</view>
			</view>
		</view>
	</view>
</template>
<style>
	.content .showShadow{width:100%;height:100%;position: fixed;top:0;left:0;}
	.content .showShadow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .showShadow .bg_white{width:70%;padding:5%;height:auto;border-radius:15upx;background: white;position: fixed;top:20%;left:10%;z-index: 2;}
	.content .showShadow .bg_white .title{color:#383838;font-size: 21px;text-align: center;}
	.content .showShadow .bg_white .contents{font-size: 14px;color:#9A9A9A;margin:30upx 0;text-align: center;}
	.content .showShadow .bg_white .iconBox{display: flex;justify-content: center;}
	.content .showShadow .bg_white .icons{width:235upx;height:255upx;}
	.content .showShadow .bg_white .sure{width:90%;margin-top: 50upx;padding:2.5%;margin-left: 2.5%;background: linear-gradient(to right,rgb(54,178,255),rgb(74,214,255));color:white;border-radius: 110upx;}
	
	
	.content{overflow-y: hidden;}
	.content .uni-input-placeholder{font-size: 14px;letter-spacing: 2upx;}
	.content .btnBox{position: relative;}
	.content .btnBox .btn{border-radius:10upx;padding:10upx 20upx;font-size: 14px;position: absolute;right:5%;top:14.5%;color:#4FB0F4;border:1px solid #4FB0F4;}
	.content .inputBox{width:90%;margin-left: 2.5%;padding:2.5%;border:1px solid rgb(225,225,225);border-radius: 20upx;margin-top: 40upx;}
	.content .marignInput{margin:25upx}
	.content .sure{margin-top:150upx;width:90%;margin-left: 2.5%;padding:2.5%;background: rgb(81,175,244);color:white;border-radius: 120upx;text-align: center;}
</style>
<script>
	export default {
		data() {
			return {
				tel:"",
				codeName:"获取验证码",
				codeNames:"获取验证码",
				timing:false,
				timings:false,
				codeNum:"",
				codeNums:"",
				NewTelNum:"",
				SureTelNum:"",
				status:{
					"title":"",
					"src":"",
					"content":"",
				},
				showDow:false,
				_$token:""
				
				
			}
		},
		onLoad(){
			var that = this;
			this.getStorage();
			setTimeout(function(){
				that.tel = that._$token.phone
			},200)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			CodeBtn(e){
				var that = this;
				var time = 60;
				if( e == 1 ){
					if( that.timing == false ){
						let param={
							"send_type":1,
							"phone":that.tel,
						};
						this._$InitRequest.request('login/sendSms', param).then(res => {
							if( res.data.code !== 200 ){
								uni.showToast({icon:"none",title:res.data.mess})
								return;
							}else{
								uni.showToast({icon:"none",title:res.data.mess})
								var timeer = setInterval(function(){
									that.codeName = time + "s"
									that.timing = true
									time--;
									if( time == -1 ){
										clearInterval(timeer)
										that.codeName = "获取验证码"
										that.timing = false
									}
								},1000)
							}
						},error=>{})
					}else{
						uni.showToast({icon:"none",title:"请勿重复获取"})
					}
				}else{
					if( that.timings == false ){
						let param={
							"send_type":1,
							"phone":that.NewTelNum,
						};
						this._$InitRequest.request('login/sendSms', param).then(res => {
							if( res.data.code !== 200 ){
								uni.showToast({icon:"none",title:res.data.mess})
								return;
							}else{
								uni.showToast({icon:"none",title:res.data.mess})
								var timeer = setInterval(function(){
									that.codeNames = time + "s"
									that.timings = true
									time--;
									if( time == -1 ){
										clearInterval(timeer)
										that.codeNames = "获取验证码"
										that.timings = false
									}
								},1000)
							}
						},error=>{})
					}else{
						uni.showToast({icon:"none",title:"请勿重复获取"})
					}
				}
			},
			getCode(e){this.codeNum = e.target.value},
			getCodes(e){this.codeNums = e.target.value},
			getNewTel(e){this.NewTelNum = e.target.value},
			SureNewTel(e){this.SureTelNum = e.target.value},
			sureBtn(){
				var that = this;
				if( that.codeNum == "" ){
					uni.showToast({icon:"none",title:"请输入验证码"})
					return;
				}else if( that.codeNums == "" ){
					uni.showToast({icon:"none",title:"请输入验证码"})
					return;
				}else if( that.NewTelNum == "" ){
					uni.showToast({icon:"none",title:"请输入新手机号"})
					return;
				}else{
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"old_phone":that.tel,
						"old_code":that.codeNum,
						"new_phone":that.NewTelNum,
						"new_code":that.codeNums,
					};
					this._$InitRequest.request('user/change_phone', param).then(res => {
						console.log( res );
						that.showDow = true
						if( res.data.code !== 200 ){
							that.status.title = "修改失败"
							that.status.src = "../../../static/image/user/set/ChangTel/icon_2.png"
							that.status.content = res.data.mess
							return;
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							that.status.title = "修改成功"
							that.status.src = "../../../static/image/user/set/ChangTel/icon_1.png"
							that.status.content = "您的修改绑定手机已经修改成功 下次登陆请用新手机号进行登陆"
						}
					},error=>{})
					
					
					
					// that.status.title = "修改成功"
					// that.status.src = "../../../static/image/user/set/ChangTel/icon_1.png"
					// that.status.content = "您的修改绑定手机已经修改成功 下次登陆请用新手机号进行登陆"
					// that.status.title = "修改失败"
					// that.status.src = "../../../static/image/user/set/ChangTel/icon_2.png"
					// that.status.content = "xxxxxxxxx"
				}
			},
			shadowSure(){
				uni.navigateTo({
					url:"../user"
				})
			}
			
			 
			
			
			
			
			
			
		}
	}
</script>