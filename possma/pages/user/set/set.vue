<template>
	<view class="content">
		<view class="rows" v-for="(item,index) in setData" :key="index" @tap="setBtn(index)">
			<image class="headImage" :src="item.src" mode="" v-if="index == 0"></image>
			<view class="names" v-if="index !== 0">{{item.name}}</view>
			<uni-icons class="icons" type="arrowright" color="#939393" size="12" :style=" index == 0 ? {'top':'30upx'} : '' "/>
			<view class="rightName overflow_one" :style=" index == 0 ? {'height':'92upx','lineHeight':'92upx'} : '' ">{{item.rightName}}</view>
			<view class="clearBoth"></view>
		</view>
		<view class="out comm-btn" @tap="outBtn">退出登录</view>
		
		<view class="showShadow" v-if="showUpDate">
			<view class="close" @tap="closeShadow"></view>
			<view class="bg_white">
				<image class="update" src="../../../static/image/user/set/update.png" mode=""></image>
				
				<view class="boxes" v-if="update == true">{{versionTitle}}</view>
				<view class="boxes" v-if="update == true">建议立即更新</view>
				
				<view class="boxes" v-if="update == false">您当前已是最新版本</view>
				<view class="boxes" v-if="update == false">无需更新</view>
				
				<view class="btn leftBtn" @tap="closeShadow" v-if="update == true">取消</view>
				<view class="btn rightBtn" v-if="update == true" @tap="downLoadNow">确认更新</view>
				
				<view class="btn sure" @tap="closeShadow" v-if="update == false">确认</view>
				
				<view class="clearBoth"></view>
			</view>
		</view>
		
		<view class="showDow" v-if="showShadow">
			<view class="bg_grey"></view>
			<view class="bg_white">
				<view class="title">{{titleName}}</view>
				<input class="contents fontSize14 textCenter" type="text" placeholder="请输入" :value="inputVlaue" @input="getInputValue">
				<!-- <view class="contents fontSize14 textCenter">审核结果将以短信的形式发到您的手 机上，请注意查收!</view> -->
				<view class="btns falseBtn" @tap="clickFlase">取消</view>
				<view class="btns sureBtn" @tap="clickSure">确认</view>
			</view>
		</view>
		
		
	</view>
</template>
<style>
	.showShadow{width:100%;height: 100%;position: fixed;top:0;left: 0;}
	.showShadow .close{width: 100%;height:100%;background: rgba(0,0,0,0.4);position: fixed;top:0;left: 0;}
	.showShadow .bg_white{width: 80%;height:50%;padding-bottom:40upx;position: fixed;top:20%;left: 10%;z-index: 2;background: white;border-radius:20upx;border-top-left-radius: 40upx;border-top-right-radius: 40upx;}
	.showShadow .bg_white .update{width:100%;height:65%}
	.showShadow .bg_white .boxes{width: 100%;text-align: center;font-size:15px;color:#646464;padding-top: 20upx;}
	.showShadow .bg_white .btn{font-size: 13px;}
	.showShadow .bg_white .leftBtn{color:#BBBBBB;width:35%;margin-left: 7.5%;float: left;margin-top: 40upx;text-align: center;border:1px solid rgb(215,215,215);padding:15upx 10upx;border-radius: 55upx;}
	.showShadow .bg_white .rightBtn{color:#BBBBBB;width:35%;margin-right: 7.5%;float: right;margin-top: 40upx;text-align: center;color:white;background:rgb(67,199,255);padding:15upx 10upx;border-radius: 55upx;}	
	.showShadow .bg_white .sure{width:40%;margin-left: 30%;margin-top: 40upx;text-align: center;color:white;background:rgb(67,199,255);padding:15upx 10upx;border-radius: 55upx;}
	.content{width:100%;height:100%;}
	.rows{width:95%;padding:5% 2.5%;border-bottom: 1px solid rgb(233,233,233);}
	.rows .headImage{width: 92upx;height: 92upx;line-height: 92upx;border-radius: 92upx;float: left;}
	.rows .names{color:#222222;float: left}
	.rows .rightName{color:#939393;float: right;width:50%;text-align: right;margin-right:10upx;}
	.rows .icons{color:#939393;float: right;position: relative;top:8upx}
	.out{width:80%;padding:2.5% 5%;margin-left: 5%;background: rgb(78,155,244);color:white;text-align: center;border-radius:100upx;font-size:15px;margin-top: 120upx;}
	.content .showDow{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 2;}
	.content .showDow .bg_grey{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 3;background: rgba(0,0,0,0.4);}
	.content .showDow .bg_white{width:80%;height:auto;margin-left: 5%;padding:2% 5%;position: fixed;top:30%;left:0;z-index: 3;background:white;text-align: center;border-radius: 10upx;;}
	.content .showDow .bg_white .title{font-size: 18px;padding:60upx 0;margin-bottom: 0upx;font-weight: bold;}
	.content .showDow .bg_white .contents{width:80%;margin-left: 10%;padding:20upx 0;margin-bottom: 20upx;}
	.content .showDow .bg_white .btnSure{color:#C68660;font-size: 18px;border-top: 1px solid #E5E5E5;;padding:20upx 0;}
	.content .showDow .bg_white .btns{width:50%;float: left;border-top: 1px solid #E5E5E5;padding:20upx 0;}
	.content .showDow .bg_white .falseBtn{color:#999999}
	.content .showDow .bg_white .sureBtn{color:#C68660}
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import permision from "@/common/permission.js"
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				setData:[
					{"src":"","name":"","rightName":"修改头像"},
					{"src":"","name":"昵称","rightName":""},
					{"src":"","name":"微信号","rightName":""},
					{"src":"","name":"关于我们","rightName":""},
					{"src":"","name":"版本信息","rightName":""},
					{"src":"","name":"检查更新","rightName":""},
				],
				update:false,
				showUpDate:false,
				AjaxData:{},
				version_num:"",
				phoneType:"",
				versionTitle:"",
				_$token:"",
				downLoadUrl:"",
				token:"",
				showShadow:false,
				inputVlaue:"",
				titleName:"",
			}
		},
		onShow(){
			var that = this;
			this.getStorage();
			setTimeout(function(){
				let param={
					"user_id":that._$token.id,
					"user_token":that._$token.token,
				};
				that._$InitRequest.request('User/get_token', param).then(res => {
					that.token = res.data.data.token
				},error=>{})
				that.AjaxMsg();
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxMsg(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_userInfo', param).then(res => {
					that.setData[1].rightName = res.data.data.nickname
					that.setData[2].rightName = res.data.data.wx_num
					that.setData[0].src = res.data.data.headimgurl
					that.AjaxData = res.data.data
				},error=>{})
				plus.runtime.getProperty(plus.runtime.appid,(res)=>{
					that.version_num = res.version
					that.setData[4].rightName = res.version
				})
				 switch(uni.getSystemInfoSync().platform){
				    case 'android':
						that.phoneType = 1
				    	break;
				    case 'ios':
						that.phoneType = 2
				    break;
				}
			},
			async setImg(){
				let that = this
				var result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')
				console.log(result)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
					uni.chooseImage({
					    count: 1,
					    sizeType: ['original', 'compressed'],
					    sourceType: ['album'],
					    success: function (res) {
							uni.uploadFile({
								url:"http://qiangma.sayyin.com/api/user/uploadify",
								header:{},
								filePath:res.tempFilePaths[0],
								name: 'filedata',
								formData: {
									"user_id":that._$token.id,
									"user_token":that._$token.token,
								},
								success: function (ress){
									console.log(res)
									console.log(ress)
									console.log(ress.data )
									var imageUrl =JSON.parse(ress.data).data.pic_url
									console.log(imageUrl)
									that.setData[0].src = imageUrl
									let param={
										"user_id":that._$token.id,
										"user_token":that._$token.token,
										"headimgurl":that.setData[0].src,
										"nickname":that.setData[1].rightName,
										"wx_num":that.setData[2].rightName
									};
									that._$InitRequest.request('user/edit_userInfo', param).then(res =>{},error=>{})
								},
							});
					    }
					});
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
			setBtn(index){
				var that = this;
				if( index == 0 ){
					this.setImg()
					
				}else if( index == 3 ){
					uni.navigateTo({url:"./about/about"})
				}else if( index == 5 ){
					let param={
						"user_id":that._$token.id,
						"user_token":that._$token.token,
						"version_num":that.version_num,
						"type":that.phoneType
					};
					that._$InitRequest.request('user/versions', param).then(res => {
						console.log(res)
						if( res.data.code == 400 ){
							uni.showToast({icon:"none",title:res.data.mess})
							that.showUpDate = true
							return;
						}else if( res.data.code == 200 ){
							that.showUpDate = true
							that.update = true
							that.versionTitle = res.data.data.content
							that.downLoadUrl = res.data.data.url
						}
					},error=>{})
				}else if( index == 1 ){
					this.showShadow = true
					this.inputVlaue = this.setData[index].rightName
					this.titleName = "修改昵称"
				}else if( index == 2 ){
					this.showShadow = true
					this.inputVlaue = this.setData[index].rightName
					this.titleName = "修改微信号"
				}
			},
			downLoadNow(){
				var that = this;
				plus.runtime.openURL(that.downLoadUrl, function(res){ console.log(res) });
			},
			outBtn(){
				uni.showModal({
					title:'退出登录',
					content:'确认退出登录吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setStorageSync('token','');
							try {
							    uni.setStorageSync('token','');
							} catch (e) {}
							uni.reLaunch({
								url:"/pages/login/login"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			closeShadow(){
				this.showUpDate = false
			},
			getInputValue(e){
				this.inputVlaue = e.target.value
			},
			clickFlase(){this.showShadow = false},
			clickSure(){
				var that = this;
				if(that.inputVlaue == ''){
					uni.showToast({icon:"none",title:"不能为空"})
					return
				}
				if( that.titleName == "修改昵称" ){
					that.setData[1].rightName = that.inputVlaue
				}else if( that.titleName == "修改微信号" ){
					that.setData[2].rightName = that.inputVlaue
				}
				this.showShadow = false
				let param={
					"user_id":that._$token.id,
					"user_token":that._$token.token,
					"headimgurl":that.setData[0].src,
					"nickname":that.setData[1].rightName,
					"wx_num":that.setData[2].rightName
				};
				that._$InitRequest.request('user/edit_userInfo', param).then(res =>{
					if( res.data.code == 200 ){
						uni.showToast({icon:"none",title:"修改成功"})
					}
				},error=>{})
			},
			
			
		}
	}
</script>