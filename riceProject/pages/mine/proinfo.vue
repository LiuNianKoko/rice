<template>
	<view class="">
		<view class="header-wrap">
			<view class="index-header">
				个人资料
				
			</view>
		</view>
		<view class="blank"></view>
		<view class="yonghcz topers">
			<view class="user-opare">
				<view class="op-item toux-item border_bottom box-sizing" @click="opencrame">
					<text class="s-bt">用户头像</text>
					<view class="r-content">
						<!-- <image class="avtor border margingRight20" mode="aspectFill" :src="imgArr[0]?imgArr[0]:imgpath"></image> -->
						<image class="avtor border margingRight20" mode="aspectFill" :src="imgpath"></image>
					</view>
				</view>	
				
				<!-- <view class="op-item border_bottom box-sizing" @click="modifynick(userinfo.user_name)"> -->
				<view class="op-item border_bottom box-sizing">
					<text class="s-bt">昵称</text>
					<view class="r-content">
						<!-- <text class="fubt">{{userinfo.user_name||'暂无名称'}}</text> -->
						<input class="fubt" type="text" v-model="nickname" placeholder="请输入昵称" maxlength="6"/>
					</view>
				</view>
				<view class="op-item border_bottom box-sizing">
					<text class="s-bt">绑定手机</text>
					<view class="r-content">
						<text class="fubt">{{userinfo.phone}}</text>
						<!-- <image src="/static/img/more.png" class="gend"></image> -->
					</view>
				</view>
				<view class="op-item border_bottom box-sizing" >
					<text class="s-bt">性别</text>
					<view class="r-content r-content-sex">
						<image :src="selectSex==1?'/static/select-green.png':'/static/unselect.png'" class="circle" @click="selectsex(1)"></image>
					
						<text class="fubt">男</text>
						<image :src="selectSex==2?'/static/select-green.png':'/static/unselect.png'" class="circle" @click="selectsex(2)"></image>
						
						<text class="fubt">女</text>
						<!-- <text class="fubt">{{userinfo.sex==1?'男':'女'}}</text> -->
						<!-- <image src="/static/huijt.png" class="gend"></image> -->
					</view>
				</view>
				<view class="op-item border_bottom box-sizing topers" @click="showtime">
					<text class="s-bt">生日</text>
					<view class="r-content disFlex">
						<input type="text" class="fubt" disabled="disabled" v-model="birthday" placeholder="点击选择"></input>
						<image src="/static/huijt.png" class="gend"></image>
					</view>
				</view>
				<view class="op-item border_bottom box-sizing topers" @click="chooseCity">
					<text class="s-bt">地区</text>
					<view class="r-content disFlex">
						<input type="text" class="fubt" disabled="disabled" v-model="cityPickerValuea" placeholder="点击选择"></input>
						<image src="/static/huijt.png" class="gend"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="sure-wrap">
			<view class="sureadd" @click="keep">
				保存
			</view>
			<view class="sureadd cancel" @click="cancel">
				取消
			</view>
		</view>
		
		<w-picker :mode="mode" startYear="1900" endYear="3030" step="1" :defaultVal="defaultVal" :current="true" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirms"></mpvue-city-picker>
	</view>
</template>
<script>
	// import {
	// 	pathToBase64,
	// 	base64ToPath,
	// 	renTupload
	// } from '@/static/js/baseimg.js'
	// import apiUrl from '@/common/env.js'
	import http from '@/api/http.js';
	import qiniuUploader from '../../common/qiniuUploader.js';
	import wPicker from "@/components/w-picker/w-picker.vue";
	import mpvueCityPicker from '@/components/m-citypicker/mpvueCityPicker.vue'
	import provinceDatas from '@/components/m-citypicker/city-data/province.js';
	import cityData from '@/components/m-citypicker/city-data/city.js';
	import areaData from '@/components/m-citypicker/city-data/area.js';
	export default {
		components:{
			mpvueCityPicker,wPicker
		},
		data() {
			return {
				cityPickerValuea:'',
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				cityssq:[],
				accode:'',
				tabIndex:0,
				imgpath: '',//选择时展示的头像
				imgpath2: '',//上传的头像
				imgArr:[],
				imgArr2:[],
				userinfo:{},
				nickname:'',
				sex:'',
				selectSex:1,
				birthday:'',
				regions:'',
				uptoken:'',
				tabList:[{
					mode:"date",
					name:"日期选择",
					value:[0,1,0]
				},{
					mode:"dateTime",
					name:"日期时间选择",
					value:[1,1,1,1,2,5]
				},{
					mode:"time",
					name:"时间选择",
					value:[1,1,0]
				}
				],
			}
		},
		onLoad() {
			this.gettutoken()
		},
		onShow() {
			this.getpro()
			this.selectsex(this.selectSex)
		},
		computed:{
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
			}
		},
		
		methods: {
			showtime(){
				this.$refs.picker.show();
			},
			onConfirm(res){
				console.log(res)
				this.birthday = res.result
			},
			// modifynick(va){
			// 	uni.navigateTo({
			// 		url:'./modifynick?name='+va
			// 	})
			// },
			// modifybeizhu(va){
			// 	uni.navigateTo({
			// 		url:'./modifybeizu?name='+va
			// 	})
			// },
			chooseCity() {
				let that =this
				// #ifdef APP-PLUS  
					plus.key.hideSoftKeybord();  
				// #endif
				that.$refs.mpvueCityPicker.show()
				// this.isshowdistpicker = true;
			},
			onConfirms(e) {
				let s = [];
				// this.regions = e;
				console.log(e.label);
				s = e.value;
				this.accode = provinceDatas[s[0]].value+'/'+cityData[s[0]][s[1]].value+'/'+areaData[s[0]][s[1]][s[2]].value;
				this.cityPickerValuea = e.label;
				this.cityssq = this.cityPickerValuea.split('/');
				console.log(this.cityssq)
				this.province = this.cityssq[0]
				this.city = this.cityssq[1]
				this.area = this.cityssq[2]
			},
			cancel(){
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			},
			keep(){
				if(this.nickname ==''){
					this.$util.showToast('请填写昵称')
					return false
				}
				let data = {
					token:uni.getStorageSync('token'),
					// headimgurl:this.imgArr2.join(','),
					headimgurl:this.imgpath2,
					nickname:this.nickname,
					sex:this.sex,
					birthday:this.birthday,
					region:this.cityPickerValuea
				}
				http('/api/User/act_user','get',data).then(res=>{
					this.$util.showToast('保存成功,请等待数据上传!')
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},1500)
					console.log(res)
				})
			},
			getpro(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo','get',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.userinfo = res.data.data;
						this.nickname = res.data.data.nickname
						this.selectSex = res.data.data.sex
						this.imgpath = res.data.data.headimgurl
						if( res.data.data.region){
							this.cityPickerValuea = res.data.data.region
						}
						if(res.data.data.birthday){
							this.birthday = res.data.data.birthday
						}
						
					}
					
				})
			},
			selectsex(i){
				let that = this;
				that.selectSex = i
				if(that.selectSex== 1){
					that.sex = 1
				}else if(that.selectSex == 2){
					that.sex = 2
				}
				console.log(that.sex)
			},
			// uploadAvtor(path){
			// 	var that = this;
			// 	let token = that.$util.getStorage('token');
			// 	uni.showLoading({
			// 		title: '请稍后...'
			// 	});
			// 	console.log(path);
			// 	//请求服务器
			// 	renTupload(path).then(res => {
			// 		console.log(res);
			// 		let imgpath = res.data.data.src;
			// 		//请求服务器
			// 		that.$request({
			// 			url: '/Userinfo/headimg',
			// 			data: {
			// 				token:token,
			// 				head_img:imgpath
			// 			},
			// 			method: 'post',
			// 			success: (res) => {
			// 				console.log(res);
			// 				if (res.data.code == 0) {
			// 					that.$util.showToast('头像修改成功!');
			// 				}else if(res.data.code == 903){
			// 					that.$util.tokenOverdue();
			// 				}
			// 			},
			// 			fail: (res) => {
			// 				console.log(res);
			// 			},
			// 			complete: () => {
			// 				this.$util.hideLoading();
			// 			}
			// 		})
			// 	})
			// 	.catch(error => {
			// 		console.error(error)
			// 	})
				
			// },
			gettutoken() {
				let data = {
					token: uni.getStorageSync('token')
				};
				http('/api/Setting/getQinToken', 'post', data).then(res => {
					// console.log(res.data.data.bannerList.data)
					console.log(res.data.data.token);
					this.uptoken = res.data.data.token;
				});
			},
			opencrame() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
					success:res => {
						let key =
							new Date().getTime() +
							Math.random()
								.toString(36)
								.substr(2);
						const src = res.tempFilePaths[0];
						console.log(src)
						qiniuUploader.upload(
							src,
							res => {
								let path = '/' + res.key;
								this.imgpath = src
								this.imgpath2 = path
								console.log(this.imgpath2)
							},
							error => {
								console.log('error: ' + error);
							},
							{
								key: key + '.jpg',
								region: 'SCN',
								domain: 'clothpic.sayyin.com',
								uptoken: this.uptoken
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
						// uni.redirectTo({
						// 	url: '/pages/upload/upload?src=' + src
						// });
					}
				});
				return false;
				let that = this;
				uni.showActionSheet({
					itemList: ['从相册中选择'],
					success: function(res) {  
						
						uni.chooseImage({
							count: 1,
							sizeType: ['original', 'compressed'],
							sourceType: ['album','camera'],
							success: function(res) {
								pathToBase64(res.tempFilePaths[0]).then(base64 => {
									that.userinfo.head_img = base64;
									that.uploadAvtor(base64);
								})
								.catch(error => {
									console.error(error)
								})
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});

			},
			// openxc() {
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success: function(res) {
			// 			console.log(JSON.stringify(res.tempFilePaths));
			// 		}
			// 	});
			// }
		}
	}
</script>
<style lang='scss' scoped>
	page {
		background-color: #F6F6F6;
	}
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #fff;
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	.sure-wrap{
		padding: 0 40upx;
		margin-top: 50upx;
		display: flex;
		justify-content: space-between;
		
	}
	.sureadd{
		width:300upx;
		height:100upx;
		line-height: 100upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 34upx;
		
		background:#00a0e9;
		border-radius:10px;
	}
	.cancel{
		background:#959ea2;
	}
	.jifentij {
		width: 100%;
		height: 90upx;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 90upx;
		background: #FF4707;
		color: #FFF;
		font-size: 32upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 20px;
	}

	.yonghcz {
		padding:0 20upx;
		background-color: #fff;
		box-sizing: border-box;
		&.topers {
			margin-bottom: 20upx;
		}
	}

	.logout {
		width: 50%;
		height: 89upx;
		line-height: 89upx;
		text-align: center;
		color: #989898;
		color: #cab387;
		font-size: 30upx;
		margin: 0 auto;
		margin-top: 60upx;

		&:after {
			border-color: #cab387;
			border-radius: 10upx;
		}
	}

	.user-opare {

		.op-item {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			background-color: #fff;
			position: relative;
			padding: 0 20upx;

			.s-bt {
				color: #333;
				font-size: 30upx;
			}

			.gend {
				width: 36upx;
				height: 32upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.circle{
				width: 34upx;
				height: 34upx;
				display: inline-block;
			}
			.r-content-sex{
				display: flex;
				align-items: center;
			}
			.r-content {
				position: absolute;
				top: 50%;
				-webkit-transform: translateY(-50%);
				transform: translateY(-50%);
				right: 20upx;

				.avtor {
					width: 103upx;
					height: 103upx;
					border-radius: 50%;
				}

				.fubt {
					color: #333333;
					font-size: 32upx;
					margin-right: 30upx;
					margin-left:14upx ;
					text-align: right;
				}

				.smrz {
					width: 121upx;
					display: inline-block;
					height: 48upx;
					line-height: 48upx;
					color: #FF4707;
					font-size: 30upx;
					text-align: center;
					margin-right: 16upx;

					&:after {
						border-color: #FF4707
					}
				}
			}
		}
		.toux-item {
			height: auto;
			padding: 20px 16upx;
		}
	}
</style>
