<template>
	<view>
		<view class="sug-wraps">
			<view class="input-item">
				<input v-model="title" type="text"  placeholder="请输入意见反馈标题" maxlength="20"  class="input" />
			</view>
			<view class="input-textarea">
				<view class="input-area">
					<textarea v-model="content"   placeholder="请输入反馈内容"   class="inputs" />
				</view>
				<view class="shopimg" v-for="(data,index) in imgpathArr" :key="index">
					<image class="spimg" :src="data" mode="aspectFill"></image>
					<view class="deltimg"  @click="deleteimg(index)">✕</view>
				</view>	
				<view class="area-img">
					
					<image class="camera" src="/static/zhangh.png" @click="didPressChooseImage"></image>
				</view>
			</view>
			<view class="input-item">
				<input v-model="userName" type="text"  placeholder="请输入你的姓名" maxlength="10"  class="input" />
			</view>
			<view class="input-item">
				<input v-model="phone" type="text"  placeholder="请输入你的联系方式" maxlength="11"  class="input" />
			</view>
			<button class="button" @click="Submission">立即提交</button>
		</view>
	</view>
</template>

<script>
	import qiniuUploader from '@/common/qiniuUploader.js'
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				title:'',
				content:'',
				userName:'',
				phone:'',
				imgpathArr:[],
				imgpathArr2:[],
				uptoken:'',
			}
		},
		onLoad() {
			this.gettutoken()
		},
		methods:{
			gettutoken(){
				let data = {
					token:uni.getStorageSync('token')
				};
				http('/api/Setting/getQinToken','post',data).then(res=>{
					// console.log(res.data.data.bannerList.data)
					console.log(res.data.data.token);
					this.uptoken = res.data.data.token;
				})
			},
			deleteimg(index){
				console.log(index);
				
				let a = this.imgpathArr2.splice(0,index);
				this.imgpathArr2 = a;
				
				let b = this.imgpathArr.splice(0,index);
				console.log(b);
				console.log(this.imgpathArr);
				this.imgpathArr = b;
			},
			didPressChooseImage(){
				if(this.imgpathArr.length==3){
					this.$util.showToast('只能上传三张~');
					return false;
				}
				let that = this;
				console.log(that.uptoken);
				let imgpathArr = [];
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						that.$util.showLoading('请稍后');
						let key = new Date().getTime()+Math.random().toString(36).substr(2);
						const filePath = res.tempFilePaths[0];
						// this.avtorsrc = res.tempFilePaths[0];
						that.imgpathArr.push( res.tempFilePaths[0]);
						console.log(filePath)
						console.log(that.imgpathArr)
						qiniuUploader.upload(filePath, (res) => {
							let path ='/'+res.key;
							that.imgpathArr2.push(path);
							console.log(that.imgpathArr)
							console.log(that.imgpathArr2)
							that.$util.hideLoading();
						}, (error) => {
						  console.log('error: ' + error);
						  that.$util.hideLoading();
						},{
						  key: key+'.jpg',
						  region: 'SCN',
						  domain: 'clothpic.sayyin.com', 
						  uptoken: that.uptoken
						}, (res) => {
						}, () => {
						  // 取消上传
						}, () => {
						  // `before` 上传前执行的操作
						}, (err) => {
						  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
						});
					}
				});
			},
			Submission(){
				if(this.title==''||this.content==''||this.userName==''||this.phone==''){
					this.$util.showToast('不能为空')
					return
				}
				let data = {
					token:uni.getStorageSync('token'),
					image:this.imgpathArr2.join(','),
					title:this.title,
					username:this.userName,
					phone:this.phone,
					desc:this.content
				}
				http('/api/user/feedback','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.$util.showToast('提交成功')
						this.imgpathArr2=[]
						this.imgpathArr=[]
						this.title=''
						this.userName=''
						this.phone=''
						this.content=''
						setTimeout(()=>{
							// uni.navigateTo({
							// 	url:'/pages/mine/myset'
							// })
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.shopimg{
		float: left;
		margin-top: 30upx;
		margin-right: 20upx;
		position: relative;
		.deltimg{
			position: absolute;
			width: 36upx;
			height: 36upx;
			text-align: center;
			color: #fff;
			right: 0;
			top: -20upx;
			background-color: rgba(0,0,0,.4);
			border-radius: 50%;
		}
		.spimg{
			width:125upx;
			height: 130upx;
			float: left;
			margin-right: 14upx;
		}
	}
	.sug-wraps{
		padding: 0 30upx;
		box-sizing: border-box;
		border-top: 1upx solid #eeeeee;
	}
	.input-textarea{
		height: 370upx;
		border-bottom: 1upx solid #eeeeee;
		.input-area{
			height: 180upx;
			.inputs {
				padding-top: 30upx;
				height: 150upx;
			}
		}
		.area-img{
			float: left;
			position: relative;
			margin-top: 34upx;
			width:120upx;
			height:120upx;
			background:rgba(255,255,255,1);
			border:2upx dashed rgba(187,187,187,1);
			.camera{
				width: 53upx;
				height: 47upx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
	.input-item{
		border-bottom: 1upx solid #eeeeee;
		line-height: 100upx;
		height: 100upx;
		.input {
			line-height: 100upx;
			height: 100upx;
			position: relative;
		}
	}
	
	.button{
		line-height: 100upx;
		height: 100upx;
		font-size: 40upx;
		width:690upx;
		height:100upx;
		color: #FFFFFF;
		margin-top: 60upx;
		background:#00a0e9;
		// box-shadow:0px 10upx 20upx 0px #00a0e9;
		border-radius:10upx;
	}
</style>
