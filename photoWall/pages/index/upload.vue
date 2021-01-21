<template>
	<view>
		<view v-for="(data,idx) in list" :key="idx">
			<view class="title">
				请上传{{data.title}}照片
			</view>
			<view class="img-box">
				<view class="img-wrap"  v-for="(item,index) in imgArr2[idx].img" :key="index">
					<image src="/static/del.png" class="del" @click="delImg(idx,index)"></image>
					<image :src="item.file" class="imgs" @click="previewImg(idx,index)"></image>
					<!-- <image src="/static/img.png" class="imgs" @click="show('QSPhoto')"></image> -->
				</view>
				<view class="img-wrap">
					<image src="/static/add.png" class="imgs" @click="chooseImage(data,idx)"></image>
					<!-- <input type="file" multiple accept='image/*'> -->
				</view>
			</view>
			<view class="num-wrap scale-1px-bottom">
				{{imgArr2[idx].img.length || 0}} / {{data.num}}
			</view>
		</view>
		
		
		<view class=" disCenter">
			<view class="nexts font24 text-white disCenter" @click="upClick">
				第二步，上传照片
			</view>
		</view>
		
		<QSPopup ref="QSPopup">
			<view class="sure-content">
				<view class="sure-title">
					请确认
				</view>
				<view class="disCenter">
					<image src="/static/photo.png" class="photo-icon"></image>
				</view>
				<view class="tips">
					您总共可上传{{allNum}}张图片，当前已上传{{nowNum}}张是否确认上传
				</view>
				<view class="btns-wrap">
					<view class="btns disCenter btns-left" @click="hides('QSPopup')">
						继续上传
					</view>
					<view class="btns disCenter btns-right" @click="sureClick">
						确认提交
					</view>
				</view>
			</view>
		</QSPopup>
		<view class="hids" v-if="hids" @click="hid">
			
		</view>
		<view class="hids-main" v-if="hids" @click="hid">
			<canvas style="width: 300px; height: 420px;" canvas-id="firstCanvas" class="firstCanvas"></canvas>
		</view>
		<QSPopup ref="QSPhoto">
			<view class="photo-wrap">
				<image :src="src" class="photos"></image>
				
				<image src="/static/del-white.png" class="del-white" @click="hides('QSPhoto')"></image>
			</view>
		</QSPopup>
	</view>
</template>

<script>
import http from '@/api/http.js'
import QSPopup from '@/components/QS-popup/QS-popup.vue';
var wx = require('jweixin-module')  
export default {
	components:{QSPopup},
	data() {
		return {
			hids:false,
			imgArr:[],//本地预览
			imgArr2:[],//id
			localDatas:[],
			src:'',//预览的图片
			list:[],//获取的规格
			allNum:0,//总上传数
			nowNum:0,//当前选择数
		}
	},
	onLoad() {
	
		this.getList()
		this.getToken()
		
	},
	methods: {
		show(ref) {
			this.$refs[ref].show();
		},
		hides(ref) {
			this.$refs[ref].hide();
		},
		getToken(){
			console.log(location.href)
			let url = location.href.split('#')[0]
			let data = {
				// http://photo.sayyin.com/
				url:url
			}
			http('/api/order/getSignPackage','post',data).then(res=>{
				console.log(res)
				wx.config({
				  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				  appId: res.data.appId, // 必填，公众号的唯一标识
				  timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				  signature: res.data.signature,// 必填，签名
				  jsApiList: ['chooseImage','uploadImage','getLocalImgData'] // 必填，需要使用的JS接口列表
				});
			})
		},
		getList(){
			let data = {
				order_num:uni.getStorageSync('order')
			}
			http('/api/order/findOrder','post',data).then(res=>{
				console.log(res)
				if(res.sta == 200){
					this.list = res.data.num
					let imgArr = []
					let imgArr2 = []
					let allNum = 0
					this.list.map((item,index)=>{
						imgArr.push({img:[]})
						imgArr2.push({img:[]})
						allNum += item.num
					})
					this.allNum = allNum
					this.imgArr = imgArr
					this.imgArr2 = imgArr2
					console.log(imgArr)
				}
			})
		},
		previewImg(idx,index){
			this.show('QSPhoto')
			this.src = this.imgArr2[idx].img[index].file
		},
		
		// 选择图片
		chooseImage(data,idx) {
			console.log(data,idx)
			// var ua = window.navigator.userAgent.toLowerCase();
			// if (ua.match(/micromessenger/i) == 'micromessenger') {
			//     console.log('是微信客户端')
			//     return true;
			// } else {
			// 	this.$util.showToast('请在微信浏览器打开');
			//     return false;
			// }
			let chooseLen = this.imgArr2[idx].img.length
			if(chooseLen >= data.num){
				this.$util.showToast('只能上传'+data.num+'张~');
				return false;
			}
			
			let that = this;
			// if(data.is_hc == 1){
			// 	that.compose(data,idx)
			// }else{
				 // return new Promise((resolve, reject) => {  
					console.log('选择图片前')
					wx.chooseImage({
						count:(data.num-chooseLen)>=9?9:(data.num-chooseLen),
						// count:9,
						sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
						success:function(re) {
							
							console.log(re)
							let localDatas = re.localIds
							// var localDatas =await that.handlerLoacalImgData(re.localIds);
							
							console.log(localDatas)
							// that.getLocalImgData(localDatas,data,idx)
							that.upLoads(localDatas,data,idx)
							// resolve(localDatas) 
							
						}
					});
				
				// })  
			// }
		},
		upLoads(localDatas,data,idx){
			let that = this
			console.log('up',localDatas)
			if(localDatas.length == 0){
				that.$util.hideLoading()
				
			}else{
				// var localId = localDatas[0].localid;
				var localId = localDatas[0];
				// 解决ios 一直加载中的问题
				if (localId.indexOf("wxlocalresource") != -1) {
					localId = localId.replace("wxlocalresource", "wxLocalResource");
				}
				 // var localId = localDatas.pop();
				that.$util.showLoading('请稍后');
				wx.uploadImage({
				  localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				  isShowProgressTips: 1, // 默认为1，显示进度提示
				  success: function (res) {
					  
					  console.log(res)
						var serverId = res.serverId; // 返回图片的服务器端ID
						let datas = {
							order_num:uni.getStorageSync('order'),
							serverId:serverId,
							is_hc:data.is_hc,
							type:data.id
						}
						http('/api/order/upload','post',datas).then(ress=>{
							console.log(ress)
							if(ress.sta == 200){
								// that.imgArr[idx].img = that.imgArr[idx].img.concat(localDatas)
								that.imgArr2[idx].img = that.imgArr2[idx].img.concat({
									file:ress.data.url,
									serverId:serverId,
									id:ress.data.id
								})
								console.log('imgarr2',that.imgArr2)
							}else{
								this.$util.showToast(ress.msg)
							}
						})
						that.$util.hideLoading()
						
						if(that.imgArr2[idx].img.length > data.num){
							setTimeout(()=>{
								that.$util.showToast('只能上传'+data.num+'张~');
								// that.imgArr[idx].img = that.imgArr[idx].img.splice(0,data.num)
								that.imgArr2[idx].img = that.imgArr2[idx].img.splice(0,data.num)
								// console.log(that.imgArr)
								
							},600)
						}
						localDatas.shift()
						that.upLoads(localDatas,data,idx)
						
					}
				});
			}
			
		},
		handlerLoacalImgData: async function(localIds) {  
			var localDatas = new Array();  
			for (let index in localIds) {  
				var item = localIds[index];  
				var localData = await this.getLocalImgData(item);  
				localDatas.push(localData);  
			}  
			return localDatas;  
		},  
		getLocalImgData: function(localDatas,data,idx) { 
			let datas = []
			let that = this
			console.log('getLocal',localDatas)
			
			var isIOS = uni.getSystemInfoSync().platform == 'ios';    
			// return new Promise((resolve, reject) => {  
				 // localDatas.map(item=>{
					if(localDatas.length == 0){
						console.log('popget0',localDatas)
						// setTimeout(()=>{
						// 	that.upLoads(that.localDatas,data,idx)
						// },200)
						
						setTimeout(()=>{
							if(that.imgArr[idx].img.length > data.num){
								that.$util.showToast('只能上传'+data.num+'张~');
								that.imgArr[idx].img = that.imgArr[idx].img.splice(0,data.num)
								that.imgArr2[idx].img = that.imgArr2[idx].img.splice(0,data.num)
								console.log(that.imgArr)
							}
						},500)
						// that.localDatas = []
					}else{
						console.log('popget1',localDatas)
						// let local = localDatas.pop()
						let local = localDatas[0];
						console.log('popget2',localDatas)
						console.log('getLocal2',local)
						wx.getLocalImgData({
							localId: local,  
							success: function(res) {  
								
								var localData = res.localData;  
								if (localData.indexOf("base64,") > -1) {  
									localData = localData.substr(localData.indexOf("base64,") + "base64,".length);  
								}                                         
								if (isIOS) {  
									datas.push({  
										// localData: localData,  
										file: res.localData,
										localid:local
									})
									// that.upLoads(datas,data,idx)
									// that.localDatas = that.localDatas.concat(datas)
									// that.imgArr[idx].img = that.imgArr[idx].img.concat(that.localDatas)
									that.imgArr[idx].img = that.imgArr[idx].img.concat(datas)
									// console.log('that.localDatas',that.localDatas)
									// console.log('imgarr',that.imgArr)
									localDatas.shift()
									// setTimeout(()=>{
										that.getLocalImgData(localDatas,data,idx)
									// },600)
								
								} else {  
									datas.push({  
										// localData: localData,  
										file: local,
										localid:local
									})  
									// that.upLoads(datas,data,idx)
									// that.localDatas = that.localDatas.concat(datas)
									// that.imgArr[idx].img = that.imgArr[idx].img.concat(that.localDatas)
									that.imgArr[idx].img = that.imgArr[idx].img.concat(datas)
									console.log('imgarr',that.imgArr)
									localDatas.shift()
									// setTimeout(()=>{
										that.getLocalImgData(localDatas,data,idx)
									// },600)
									
								}
								console.log('local',datas)
								
							}  
						})  
					}
					
				// })
					// setTimeout(()=>{
					// 	that.imgArr[idx].img = that.imgArr[idx].img.concat(datas)
					// 	that.upLoads(datas,data,idx)
					// },300)
			// }) 
		},
		// 合成图片
		hid(){
			this.hids = false
		},
		compose(data,idx){
			let that = this;
			let bg1 = ''
			let bg2 = ''
			uni.chooseImage({
				count:2,
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
				success: re => {
					that.$util.showLoading('请稍后');
					console.log(re)
					// that.imgArr[idx].img = that.imgArr[idx].img.concat(re.tempFilePaths)
					
					const filePaths = re.tempFilePaths
					console.log(filePaths)
					if(filePaths.length<2 ||filePaths.length>2){
						that.$util.showToast('请选择两张图片')
					}else{
						that.hids = true
						uni.getImageInfo({
							src:filePaths[0],
							success:(res)=>{
								console.log(res)
								console.log(11)
								bg1 = res.path
								uni.getImageInfo({
									src:filePaths[1],
									success:(ress)=>{
										console.log(22)
										// console.log(res)
										bg2 = ress.path
										var ctx = uni.createCanvasContext('firstCanvas')
										// 背景
										// ctx.beginPath()
										ctx.drawImage(bg1,0,60,150,300)
										ctx.drawImage(bg2,150,60,150,300)
										// ctx.closePath()
										ctx.draw(false, ()=>{
											 setTimeout(function(){
											  uni.canvasToTempFilePath({
											   x:0,
											   y:0,
											   width:300,
											   height:420,
											   fileType:'jpg',
											   quality:1,
											   canvasId: 'firstCanvas',
											   success: (cas) => {
												console.log('1212',cas);
												let pic = cas.tempFilePath;
												
												if (cas.errMsg == "canvasToTempFilePath:ok") {
													uni.uploadFile({
														url: 'http://photo.sayyin.com/api/order/upload', 
														filePath: pic,
														name: 'file',
														formData: {
															order_num:uni.getStorageSync('order'),
															filename:'file',
															file:pic,
															is_hc:data.is_hc,
															type:data.id
														},
														success: (succ) => {
															that.$util.hideLoading()
															console.log(succ.data);
															let resFile = JSON.parse(succ.data)
															console.log(resFile);
															that.imgArr[idx].img = that.imgArr[idx].img.concat({
																file:pic,
																id:resFile.data[0].id
															})
															that.imgId.push(resFile.data[0].id)
															console.log(that.imgArr)
														},
														fail:(err)=>{
															that.$util.hideLoading()
															console.log(err)
														}
													});
												}
											   },
											   fail(err) {
												console.log(err);
												that.$util.hideLoading()
												
											   }
											  })
											 },500)
											})
										}
									})
								}
							})
					}
					
				}
			});
		},
		// 删除图片
		delImg(idx,index){
			// this.imgArr[idx].img.splice(index,1)
			this.imgArr2[idx].img.splice(index,1)
			console.log(this.imgArr)
			console.log(this.imgArr2)
		},
		upClick(){
			let newImg = []
			this.imgArr2.map(img1=>{
				img1.img.map(img2=>{
					newImg.push(img2)
					console.log(newImg)
				})
			})
			this.nowNum = newImg.length
			if(newImg.length == 0){
				this.$util.showToast('请选择图片')
				return
			}
			this.show('QSPopup')
			
		},
		sureClick(){
			this.hides('QSPopup')
			let newImg = []
			let newImg2 = []
			this.imgArr2.map(img1=>{
				img1.img.map(img2=>{
					newImg.push(img2)
					console.log(newImg)
				})
			})
			// this.imgArr2.map(img1=>{
			// 	img1.img.map(img2=>{
			// 		newImg2.push(img2)
			// 		console.log(newImg)
			// 	})
			// })
			console.log(newImg)
			
			setTimeout(()=>{
				uni.setStorageSync('imgarr',newImg)
				// uni.setStorageSync('imgarr2',newImg2)
				uni.navigateTo({
					url:'/pages/index/confirm'
				})
			},100)
			
			
		}
	}
}
</script>

<style lang="less">
	.title{
		font-size: 32upx;
		color: #535353;
		padding: 30upx 33upx 60upx;
	}
	.img-box{
		display: flex;
		flex-wrap: wrap;
		padding: 0 46upx;
	}
	.img-wrap{
		position: relative;
		margin-bottom: 50upx;
		width: 33%;
	}
	.imgs{
		border-radius: 10upx;
		width: 190upx;
		height: 190upx;
	}
	.marginRight40{
		margin-right: 42upx;
	}
	.del{
		width: 46upx;
		height: 46upx;
		position: absolute;
		top: -20upx;
		right: 8upx;
		z-index: 10;
	}
	.num-wrap{
		color: #A0A0A0;
		font-size: 32upx;
		padding: 0 46upx 40upx;
		text-align: right;
	}
	
	.nexts{
		width: 350upx;
		height: 75upx;
		background-color: #01b0bd;
		border-radius: 10upx;
		margin: 30upx 0 100upx;
	}
	
	.sure-content{
		width: 510upx;
		// height: 570upx;
		background-color: #fff;
		border-radius: 10upx;
		padding: 65upx 50upx;
		box-sizing: border-box;
		.sure-title{
			font-size: 42upx;
			color: #383838;
			text-align: center;
			margin-bottom: 50upx;
			font-weight: bold;
		}
		.photo-icon{
			width: 140upx;
			height: 128upx;
			margin-bottom: 50upx;
		}
		.tips{
			color: #9A9A9A;
			margin-bottom: 50upx;
			text-align: center;
		}
		.btns-wrap{
			display: flex;
			justify-content: space-between;
			.btns{
				width: 170upx;
				height: 56upx;
				font-size: 26upx;
				border-radius: 30upx;
			}
			.btns-left{
				border: 1px solid #01b0bd;
				color:#01b0bd ;
			}
			.btns-right{
				background-color: #01b0bd;
				color: #fff;
			}
		}
	}
	
	.photo-wrap{
		width: 506upx;
		height: 704upx;
		border-radius: 30upx;
		background-color: #fff;
		position: relative;
		.photos{
			width: 506upx;
			height: 704upx;
			border-radius: 30upx;
		}
		.del-white{
			width: 70upx;
			height: 70upx;
			position: absolute;
			bottom: -120upx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
	// .hids{
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: #000;
	// 	opacity: 0.5;
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 100;
	// }
	.hids-main{
		width: 70%;
		height: 60%;
		position: fixed;
		top: 9999px;
		left: 10%;
		// background-color: #fff;
		// z-index: 101;
		
	}
</style>
