<template>
	<view>
		<view class="wrap">
			<view class="info-item disBetween">
				<view class="info-left font32">
					用户头像
				</view>
				<view class="info-right disAlignCenter" @click="opencrame">
					<image :src="imgpath" class="headimg" mode=""></image>
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					昵称
				</view>
				<view class="info-right font32">
					<input type="text" class="inputs" placeholder="请输入昵称" maxlength="10"  placeholder-class="color-gray" v-model="username"/>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					个性签名
				</view>
				<view class="info-right font32">
					<input type="text" class="inputs" placeholder="请输入个性签名" maxlength="38"  placeholder-class="color-gray" v-model="introduce"/>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					绑定手机
				</view>
				<view class="info-right font32">
					<input type="text" class="inputs" disabled placeholder="请输入手机号"  placeholder-class="color-gray" v-model="phone"/>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					性别
				</view>
				<view class="info-right font32 disAlignCenter" >
					<view class="disAlignCenter" @click="changeSex(1)">
						<image :src="sex==1?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
						
						男
					</view>
					<view class="disAlignCenter marl" @click="changeSex(2)">
						<image :src="sex==2?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
						女
					</view>
				</view>
			</view>
			<view class="info-item disBetween"  @click="showarea">
				<view class="info-left font32">
					地区
				</view>
				<view class="info-right font32 color-gray disAlignCenter">
					{{area || '请选择'}}
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="info-item disBetween" @click="showtime">
				<view class="info-left font32">
					生日
				</view>
				<view class="info-right font32 color-gray disAlignCenter">
					{{birthday || '请选择'}}
					<image src="/static/right.png" class="right" mode=""></image>
				</view>
			</view>
			<view class="info-item disBetween">
				<view class="info-left font32">
					邮箱
				</view>
				<view class="info-right font32">
					<input type="text" class="inputs" placeholder="请输入邮箱"  placeholder-class="color-gray" v-model="mail"/>
				</view>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn disCenter" @click="sure">
				保存
			</view>
		</view>
		<w-picker :mode="mode" startYear="1900" endYear="3030" step="1" :defaultVal="defaultVal" :current="true" @confirm="onConfirm" ref="picker" :defaultTitle="defaultTitle"></w-picker>
		<w-picker :mode="mode" :defaultVal="defaultVal" @confirm="onConfirmArea" ref="pickerArea" :defaultTitle="defaultTitle"></w-picker>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import qiniuUploader from '@/common/qiniuUploader.js';
	import permision from "@/common/permission.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				username:'',
				introduce:'',
				imgpath:'',
				imgpath2:'',
				uptoken:'',
				phone:'',
				sex:1,
				area:'',
				birthday:'',
				birthdayNum:'',
				mail:'',
				tabIndex:0,
				tabList:[{
					mode:"date",
					name:"选择时间",
					value:[0,1,0]
				},{
					mode:"dateTime",
					name:"日期时间选择",
					value:[1,1,1,1,2,5]
				},{
					mode:"time",
					name:"时间选择",
					value:[1,1,0]
				},
				{
					mode:"region",
					name:"选择地区",
					value:[0,0,0]
				}
				],
			}
		},
		onLoad() {
			this.getMine()
			this.gettutoken()
		},
		computed:{
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
			},
			defaultTitle(){
				return this.tabList[this.tabIndex].name
			}
		},
		methods: {
			showtime(){
				this.tabIndex = 0
				this.$refs.picker.show();
			},
			showarea(){
				this.tabIndex = 3
				this.$refs.pickerArea.show();
			},
			gettutoken() {
				let data = {
					token:uni.getStorageSync('token'),
				};
				http('/api/Setting/getQinToken', 'post', data).then(res => {
					console.log(res)
					this.uptoken = res.data.token
				});
			},
			onConfirm(res){
				console.log(res)
				this.birthdayNum = res.result
				let arr = res.checkArr
				this.birthday = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
			},
			onConfirmArea(res){
				console.log(res)
				this.area = res.result
			},
			sure(){
				if(this.username == ''){
					this.$util.showToast('请输入昵称')
					return
				}
				let data = {
					token:uni.getStorageSync('token'),
					headimgurl:this.imgpath2,
					nickname:this.username,
					introduce:this.introduce,
					sex:this.sex,
					region:this.area,
					birthday:this.birthday,
					mail:this.mail
				}
				http('/api/User/edit_user','post',data).then(res=>{
					if(res.status==200){
						this.$util.showToast(res.msg)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$util.showToast(res.msg)
					}
				})
				uni.showToast({
					title:'修改成功!',
					icon:'none',
					image:'/static/success.png'
				})
			},
			changeSex(type){
				this.sex = type
			},
			getMine(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_user_info','post',data).then(res=>{
					if(res.status==200){
						let info = res.data
						this.username = info.nickname
						this.imgpath = info.headimgurl
						this.imgpath2 = info.headimgurl
						this.phone = info.phone
						this.sex = info.sex 
						this.introduce = info.introduce!=null?info.introduce:''
						this.area = info.region!=null?info.region:''
						this.birthday = info.birthday!=null?info.birthday:''
						this.mail = info.mail!=null?info.mail:''
					}
				})
			},
			async opencrame(){
				let that = this
				var result
				if(uni.getSystemInfoSync().platform === 'android'){
					console.log('运行Android上')
					result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')
				}else{
					console.log('运行iOS上')
					
					result = 1
					
				}
				console.log(result)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
					let that = this;
					uni.chooseImage({
						count: 1, // 默认9
						sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
						success:(res)=> {
							that.$util.showLoading('请稍后');
							let key =
								new Date().getTime() +
								Math.random()
									.toString(36)
									.substr(2);
							const src = res.tempFilePaths[0];
							console.log(res)
							qiniuUploader.upload(
								src,
								res => {
									let path = res.key;
									that.imgpath = src
									that.imgpath2 = path
									console.log(src)
									console.log(that.imgpath2)
									that.$util.hideLoading();
								},
								error => {
									console.log('error: ' + error);
									that.$util.showToast('图片上传失败');
									that.imgpath = ''
									that.$util.hideLoading();
								},
								{
									key: key + '.jpg',
									region: 'SCN',
									domain: 'pic.ningdongzixun.com',
									uptoken: that.uptoken
								},
								res => {},
								() => {
									// 取消上传
								},
								() => {
									// `before` 上传前执行的操作
								},
								err => {
									// `complete` 上传接受后执行的操作(无论成功还是失败都执行)
								}
							);
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
		}
	}
</script>

<style lang="less">
	.wrap{
		padding-left: 30upx;
	}
	.info-item{
		padding: 30upx 30upx 30upx 0;
		border-bottom: 1px solid #F2F2F5;
		.headimg{
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
		}
		.right{
			width: 18upx;
			height: 30upx;
			margin-left: 23upx;
		}
		.info-left{
			font-weight: 500;
		}
		.inputs{
			text-align: right;
			font-size: 32upx;
		}
		.sel{
			width: 32upx;
			height: 32upx;
			margin-top: 4upx;
			margin-right: 16upx;
		}
		.marl{
			margin-left: 70upx;
		}
	}
	.blank{
		height: 110upx;
	}
	.btn-wrap{
		width: 100%;
		padding: 10upx 32upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 119;
		.btn{
			background:#181C62;
			height: 90upx;
			border-radius: 10upx;
			color: #fff;
			font-size: 32upx;
		}
	}
</style>
