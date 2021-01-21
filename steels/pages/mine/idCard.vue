<template>
	<view>
		<view class="wrap">
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					+86
				</view>
				<input type="number" class="inputs" placeholder="请输入手机号" v-model="phone" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disBetween">
				<view class="disAlignCenter">
					<view class="inputs-left">
						验证码
					</view>
					<input type="number" class="inputs" placeholder="请输入短信验证码" v-model="code" placeholder-class="inputs-pla"/>
				</view>
				<view class="inputs-right disAlignCenter">
					<view class="lines">
						
					</view>
					<view class="get-code">
						<button :disabled="!isCanSendCode" class="btn-code font26"  @click.stop="sendCode">{{sendMsg}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="line-fen"></view>
		<view class="wrap">
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					姓名
				</view>
				<input type="text" class="inputs" placeholder="请输入姓名" v-model="name" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					身份证
				</view>
				<input type="text" class="inputs" placeholder="请输入身份证号码" v-model="idCard" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					厂家名称
				</view>
				<input type="text" class="inputs" placeholder="请输入厂家名称" v-model="company" placeholder-class="inputs-pla"/>
			</view>
		</view>
		<view class="line-fen"></view>
		<view class="wrap">
			<view class="font32 marginBottom30">
				上传身份证正反面<text class="font28">(必填)</text>
			</view>
			<view class="disBetween">
				<image :src="cardImg?cardImg:'/static/card1.png'" class="card-img" mode="" @click="chooseCardImg"></image>
				<image :src="cardOther?cardOther:'/static/card2.png'" class="card-img" mode="" @click="chooseCardOther"></image>
			</view>
			<view class="tips marginTop20 marginBottom20">
				*仅用于平台资质审核，以及招标方决策参考，不公开显示。
			</view>
		</view>
		<view class="line-fen"></view>
		<view class="wrap">
			<view class="font32 marginBottom30">
				上传营业执照<text class="font28">(选填)</text>
			</view>
			<view class="" @click="chooseCompanyImg">
				<view class="add-wrap disCenter" v-if="!companyImg">
					<image src="/static/add-xl.png" class="add-xl" mode=""></image>
				</view>
				<view class="" v-if="companyImg">
					<image :src="companyImg" class="company-img" mode=""></image>
				</view>
			</view>
			<view class="tips marginTop20">
				*仅用于平台资质审核，以及招标方决策参考，不公开显示。
			</view>
		</view>
		<view class="btn-wrap">
			<view class="btn disCenter" @click="sub">
				提交审核
			</view>
		</view>
	</view>
</template>

<script>
	let timer = '';
	import http from '@/api/http.js'
	import qiniuUploader from '@/common/qiniuUploader.js';
	export default {
		data() {
			return {
				phone:'',
				code:'',
				name:'',
				idCard:'',
				company:'',
				cardImg:'',//正面 展示
				cardImg2:'',//正面  上传用
				cardOther:'',//反面
				cardOther2:'',//反面  上传用
				companyImg:'',//营业
				companyImg2:'',//营业  上传用
				sendMsg:"获取验证码",
				isCanSendCode:true,
				uptoken:'',
			}
		},
		onLoad() {
			this.gettutoken()
		},
		methods: {
			gettutoken() {
				let data = {
					token:uni.getStorageSync('token'),
				};
				http('/api/Setting/getQinToken', 'post', data).then(res => {
					console.log(res)
					this.uptoken = res.data.token
				});
			},
			clearCodeInterval(){
			    clearInterval(timer);
			    this.sendMsg="获取验证码";
			},
			setCodeInterval () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer);
			    timer = setInterval(() => {
			        time--;
			        this.isCanSendCode=false;
			        this.sendMsg=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode=true;
			            this.sendMsg="重新获取";
			            clearInterval(timer);
			        }
			    }, 1000)
			},
			sendCode () {
				// this.setCodeInterval();
				// return
				if(this.phone==''){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}else{
					let reg = new RegExp(/^1[3456789]\d{9}$/)
					if(reg.test(this.phone)==false){
						uni.showToast({
							title:'手机号输入有误',
							icon:'none'
						})
						return
					}
				}
				let data = {
					phone:this.phone
				}
				http('/api/Login/send_code','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:'发送成功',
							icon:'none'
						})
						this.setCodeInterval();
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						return
					}
					console.log(res)
				})
				/*
				* 发送验证码逻辑
				*/
			},
			sub(){
				if(this.phone == ''){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}
				if(this.code == ''){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				if(this.name == ''){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if(this.idCard == ''){
					uni.showToast({
						title:'请输入身份证号码',
						icon:'none'
					})
					return
				}
				if(this.company == ''){
					uni.showToast({
						title:'请输入厂家名称',
						icon:'none'
					})
					return
				}
				if(this.cardImg2 == ''){
					uni.showToast({
						title:'请上传身份证正面照片',
						icon:'none'
					})
					return
				}
				if(this.cardOther2 == ''){
					uni.showToast({
						title:'请上传身份证反面照片',
						icon:'none'
					})
					return
				}
				let data = {
					token:uni.getStorageSync('token'),
					phone:this.phone,
					code:this.code,
					name:this.name,
					id_card:this.idCard,
					manufactor_name:this.company,
					card_front:this.cardImg2,
					card_back:this.cardOther2,
					business_license:this.companyImg2
				}
				http('/api/User/attestation','post',data).then(res=>{
					console.log(res)
					if(res.status == 200){
						uni.showToast({
							title:'提交成功!',
							icon:'none',
							image:'/static/success.png'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1200)
					}else{
						uni.showToast({
							title:res.msg || res.message,
							icon:'none'
						})
					}
				})
				
			},
			// 选择身份证正面
			chooseCardImg(){
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
								that.cardImg = src
								that.cardImg2 = path
								console.log(src)
								console.log(that.cardImg2)
								that.$util.hideLoading();
							},
							error => {
								console.log('error: ' + error);
								that.$util.showToast('图片上传失败');
								that.cardImg = ''
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
			},
			// 选择身份证反面
			chooseCardOther(){
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
								that.cardOther = src
								that.cardOther2 = path
								console.log(src)
								console.log(that.cardOther2)
								that.$util.hideLoading();
							},
							error => {
								console.log('error: ' + error);
								that.$util.showToast('图片上传失败');
								that.cardOther = ''
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
			},
			// 选择营业执照
			chooseCompanyImg(){
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
								that.companyImg = src
								that.companyImg2 = path
								console.log(src)
								console.log(that.companyImg2)
								that.$util.hideLoading();
							},
							error => {
								console.log('error: ' + error);
								that.$util.showToast('图片上传失败');
								that.companyImg = ''
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
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 40upx 32upx 10upx;
	}
	.line-fen{
		height: 20upx;
		background: #F5F5F9;
	}
	.inputs-wrap{
		height: 90upx;
		border: 1px solid #DEDEDE;
		border-radius: 4upx;
		padding: 10upx 23upx 10upx 30upx;
		margin-bottom: 32upx;
		.inputs-left{
			color: #31323C;
			font-size: 30upx;
			width: 140upx;
			flex: none;
		}
		.inputs{
			font-size: 26upx;
			width: 100%;
		}
		.inputs-pla{
			color: #CCCCCC;
		}
	}
	.lines{
		width: 1px;
		height: 40upx;
		background: #E5E5E5;
		
	}
	.get-code{
		margin-left: 24upx;
		width: 130upx;
		text-align: center;
	}
	.btn-code{
		background-color: #fff !important;
		color: #181C62 !important;
		border: none;
		padding: 0;
		margin: 0;
	}
	.btn-code::after{
		border: none;
	}
	.card-img{
		width: 326upx;
		height: 221upx;
		border-radius: 4upx;
	}
	.add-wrap{
		width: 100%;
		height: 400upx;
		background-color: #F5F5F9;
		border-radius: 4upx;
		.add-xl{
			width: 150upx;
			height: 150upx;
		}
	}
	.company-img{
		width: 100%;
		height: 400upx;
		border-radius: 4upx;
	}
	.tips{
		color: #CED3DE;
		font-size: 24upx;
	}
	.btn-wrap{
		width: 100%;
		padding: 100upx 32upx;
		.btn{
			background:#181C62;
			height: 90upx;
			border-radius: 10upx;
			color: #fff;
			font-size: 36upx;
		}
	}
	
</style>
