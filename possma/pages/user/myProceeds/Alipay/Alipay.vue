<template>
	<view class="content">
		
		<input class="inputBox" type="text" placeholder="请输入提现支付宝账号" @input="getUserName">
		<input class="inputBox" type="text" placeholder="请输入您的真实姓名"   @input="getRealName">
		<input class="inputBox" type="number" maxlength="11" placeholder="请输入您的联系方式" @input="getTel">
		<view class="sure comm-btn" @tap="sureBtn">确认提现</view>
		
		
	</view>
</template>
<style>
	.content .inputBox{width:80%;padding:2.5% 5%;margin-left: 5%;border:1px solid rgb(242,242,242);border-radius: 20upx;margin-top:30upx;}
	.content .uni-input-placeholder{font-size: 14px;}
	.content .sure{width:80%;margin-left: 5%;margin-top: 200upx;background: rgb(78,178,244);color:white;border-radius: 200upx;text-align: center;padding:3% 5%;}
</style>
<script>
	export default {
		data() {
			return {
				money:"",
				data:{
					"UserName":"",
					"RealName":"",
					"Tel":"",
				},
				_$token:"",
				type:"",
			}
		},
		onLoad(e){
			this.type = e.type
			this.money =  e.money
			this.getStorage();
		},
		methods:{
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getUserName(e){this.data.UserName = e.target.value},
			getRealName(e){this.data.RealName = e.target.value},
			getTel(e){this.data.Tel = e.target.value},
			sureBtn(){
				var that = this;
				if( this.data.UserName == "" ){
					uni.showToast({icon:"none",title:"请输入支付宝账号"})
					return;
				}else if( this.data.RealName == "" ){
					uni.showToast({icon:"none",title:"请输入真实姓名"})
					return;
				}else if( this.data.Tel == "" ){
					uni.showToast({icon:"none",title:"请输入联系方式"})
					return;
				}else{
					uni.showLoading()
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"price":this.money,
						"type":1,
						"username":this.data.RealName,
						"phone":this.data.Tel,
						"ali_name":this.data.UserName,
						"put_type":this.type
					};
					this._$InitRequest.request('user/withdrawal', param).then(res => {
						uni.hideLoading()
						if( res.data.code !== 200 ){
							
							uni.showToast({icon:"none",title:res.data.mess})
							return;
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							setTimeout(function(){
								uni.switchTab({
									url:'/pages/user/user'
								})
							},1500)
						}
					},error=>{})
				}
			}
		}
	}
</script>