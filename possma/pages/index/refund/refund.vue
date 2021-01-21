<template>
	<view class="content">
		<input class="input" type="text" placeholder="请输入您的支付宝账号" maxlength="20" 	@input="getUserName">
		<input class="input" type="text" placeholder="请输入您的支付宝姓名" maxlength="6"		@input="getName">
		<view class="btn" @tap="btnRefund">立即退款</view>
		
		<view class="showShadow" v-if="showDow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="title">退款成功</view>
				<view class="contents">我们将在2-3个工作日处理您的退款申请</view>
				<view class="iconBox"><image class="icons" src="../../../static/image/index/icon_13.png" mode="widthFix"></image></view>
				<view class="sure falseBtn" @tap="shadowFalse">取消</view>
				<view class="sure sureBtn" @tap="shadowSure">确定</view>
			</view>
		</view>
		
	</view>
</template>
<style>
	.content{}
	.content .uni-input-placeholder{font-size: 14px;}
	.content .input{border-bottom: 1px solid rgba(0,0,0,0.1);width:90%;padding:2.5%;margin:20upx 0;margin-left: 2.5%;}
	.content .btn{width:90%;margin-left: 5%;margin-top:200upx;background: rgb(78,178,244);color:white;padding:20upx 0;border-radius: 200upx;text-align: center;}
	.content .showShadow{width:100%;height:100%;position: fixed;top:0;left:0;}
	.content .showShadow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .showShadow .bg_white{width:70%;padding:5%;height:auto;border-radius:15upx;background: white;position: fixed;top:30%;left:10%;z-index: 2;}
	.content .showShadow .bg_white .title{color:#383838;font-size: 21px;text-align: center;}
	.content .showShadow .bg_white .contents{font-size: 14px;color:#9A9A9A;margin:30upx 0;text-align: center;}
	.content .showShadow .bg_white .iconBox{display: flex;justify-content: center;}
	.content .showShadow .bg_white .icons{width:172upx;height:180upx;}
	.content .showShadow .bg_white .sure{width:42.5%;padding:2.5%;margin-left: 2.5%;float: left;margin-top: 50upx;background: linear-gradient(to right,rgb(54,178,255),rgb(74,214,255));color:white;border-radius: 110upx;text-align: center;}
	.content .showShadow .bg_white .falseBtn{background: rgb(211,211,211);}


</style>
<script>
	export default {
		data() {
			return {
				userName:"",
				name:"",
				showDow:false,
				_$token:""
			}
		},
		onLoad(){
			this.getStorage();
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			getUserName(e){this.userName = e.target.value},
			getName(e){this.name = e.target.value},
			btnRefund(){
				if( this.userName == "" ){
					uni.showToast({icon:"none",title:"支付宝账号不能为空"})
					return;
				}else if( this.name == "" ){
					uni.showToast({icon:"none",title:"支付宝姓名不能为空"})
					return;
				}else{
					var that = this;
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"ali_num":this.userName,
						"ali_name":this.name,
					};
					this._$InitRequest.request('User/apply_refund', param).then(res => {
						if( res.data.code !== 200 ){
							uni.showToast({icon:"none",title:res.data.mess})
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							this.showDow = true
						}
					},error=>{})
				}
			},
			shadowSure(){uni.navigateTo({url:"../index"})},
			shadowFalse(){uni.navigateTo({url:"../index"})},
			
			
			
		}
	}
</script>