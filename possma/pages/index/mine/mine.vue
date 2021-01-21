<template>
	<view class="content">
		
		<!-- <view class="split"></view> -->
		<!-- <view class="title">体验二维码</view> -->
		<!-- <view class="title">30分钟有效</view> -->
		<image class="qrImage" :src="QR_src" mode="" :style="{'height':screenHeight}" @longpress="saveThisOne"></image>
		<!-- <view class="tips">立即扫码体验</view> -->
		
		
	</view>
</template>
<style>
	.content{width:100%;}
	.content .split{width:100%}
	.content .qrImage{width:100%;}
	.content .title{width:100%;font-size:42px;letter-spacing:10upx;text-align: center;color:white;margin-bottom:40upx;}
	.content .tips{width:100%;color:white;text-align: center;margin-top: 20upx;font-size: 24px;letter-spacing: 4upx;}
</style>
<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				screenHeight:"",
				QR_src:"",
				_$token:""
			}
		},
		onLoad(){
			const res = uni.getSystemInfoSync();
			this.screenHeight = res.windowHeight*2 + 'upx'
			var that = this;
			try {
				const value = uni.getStorageSync('token');
				if (value) {
					that._$token = value
				}else{
					uni.showToast({icon:"none",title:"请先登录"})
					setTimeout(function(){
						uni.navigateTo({url:"../../login/login"})
					},1500)
				}
			} catch (e) {}
			this.AjaxLoad()
		},
		methods: {
			AjaxLoad(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request("User/user_experience_code", param).then(res => {
					if( res.data.code !== 200 ){
						uni.showToast({icon:"none",title:"请先领取"})
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else{
						this.QR_src = res.data.data.code_url
					}
				},error=>{})
			},
			saveThisOne(){
				var that = this;
				var result = permision.requestAndroidPermission()
				var strStatus
				if (result == 1) {
					uni.saveImageToPhotosAlbum({
						filePath:that.QR_src,
						success: (res) => {
							uni.showToast({
								title: '保存成功'
							})
						},
						fail() {
							uni.showToast({
								icon: 'none',
								title: '保存失败'
							})
						}
					})
				} else if (result == 0) {
					strStatus = "未获得授权"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				} else {
					strStatus = "被永久拒绝权限"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				}
			},
			
			
		}
	}
</script>
<style lang="scss" scoped>
/deep/ .uni-input-input {font-size:32upx}
/deep/ .uni-radio-input-checked{background-color:rgb(110,43,34) !important;border:2upx solid white !important}
.content .html{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>