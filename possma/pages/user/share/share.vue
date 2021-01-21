<template>
	<view class="content">
		<view class="scanBox" :style="[{height:windowHeight + 'px'}]" @longtap="saveScan">
			<image class="scan" :style="[{height:windowHeight + 'px'}]" :src="scan_src" mode=""></image>
		</view>
		<!-- <view class="scanName" @longtap="saveScan">长按保存图片</view> -->
		
		<!-- <div class="footer">
			<view class="rows" @tap="share(0)">
				<uni-icons class="icon" type="weixin" color="grey" size="22"/>
				<view class="names">微信</view>
			</view>
			<view class="rows" @tap="share(1)">
				<uni-icons class="icon" type="pengyouquan" color="grey" size="22"/>
				<view class="names">朋友圈</view>
			</view>
		</div> -->
		
		
	</view>
</template>
<style>
	.content{overflow-y: hidden;}
	.content .scanBox{width:100%;}
	.content .scanName{width:100%;text-align: center;font-size: 14px;color:#000;margin-top: 20upx;position: absolute;top:62%;}
	.content .scan{width:100%;}
	.content .footer{width:100%;position:absolute;left:0;bottom:2%;text-align: center;}
	.content .footer .rows{width:50%;float: left;}
	.content .footer .rows .names{font-size: 14px;}

</style>
<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				scan_src:"",
				windowHeight:0
				
			}
		},
		onLoad(){
			this.getStorage();
			this.AjaxLoad()
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			console.log(this.windowHeight)
		},
		methods: {
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				uni.showLoading({
					title:'请稍候'
				})
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/share_pic', param).then(res => {
					this.scan_src = res.data.data.code_url
					uni.hideLoading()
				},error=>{})
			},
			share(index){
				if( index == 0 ){
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 2,
					    imageUrl: this.scan_src,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}else if( index == 1 ){
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 2,
					    imageUrl: this.scan_src,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			async saveScan(){
				var result = await permision.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE","相册")
				console.log(result)
				var strStatus
				let plat = uni.getSystemInfoSync().platform.toLowerCase()
				console.log(plat)
				if(plat == 'android'){
					if (result == 1) {
						strStatus = "已获得授权"
						uni.showLoading({
							title:'保存中...'
						})
						uni.downloadFile({
							url:this.scan_src,
							success(res){
								console.log(res)
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function (s) {
										console.log(s)
										uni.showToast({icon:"none",title:"保存成功"})
									}
								});
								uni.hideLoading()
							},
							fail(err){
								uni.hideLoading()
							}
						})
						
					} else if (result == 0) {
						strStatus = "未获得授权"
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					} else {
						strStatus = "被永久拒绝权限"
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					}
				}else{
					let status = permision.judgeIosPermission("photoLibrary")
					if(status == true){
						uni.getImageInfo({
							src:this.scan_src,
							success(res){
								console.log(res)
								uni.saveImageToPhotosAlbum({
									filePath: res.path,
									success: function (s) {
										console.log(s)
										uni.showToast({icon:"none",title:"保存成功"})
									}
								});
							}
						})
					}else{
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					}
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