<template>
	<view>
		<view class="header-wrap">
			<!-- #ifndef MP-WEIXIN -->
			<image class="xiazai" src="/static/xiazai.png" @click="showHids"></image>
			<!-- #endif -->
			<!-- <image class="xiazai" src="/static/xiazai.png" @click="copyFn"></image> -->
			<view class="index-header">
				分享推广
				<image class="back-icon" src="/static/back-black.png" @click="back"></image>
			</view>
		</view>
		
		<view class="share-wraps">
			<!-- <image class="code-bg" :src='imag+"twocode-bg.jpg"'></image> -->
			<!-- <image class="code-bg" :src='imag+"15.jpg"'></image> -->
			<image class="code-bg" :src='imag+"share-image-bj.png"'></image>
			<view class="code-wrap">
				<image class="code-bg2" :src='imag+"share-image-hz.png"'></image>
				<image class="code" :src="codeImg"></image>
			</view>
			
			<!-- <view class="share-text">
				扫一扫注册
			</view> -->
		</view>
		<!-- 生成图片 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
		    <canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		
		<QSPopup ref="QSPopupShare" type="fadeInUp">
			<view class="share-order disFlex">
				<view class="share-item">
					<image src="/static/wxfriend.png"></image>
					微信好友
				</view>
				<view class="share-item">
					<image src="/static/friendcircle.png"></image>
					朋友圈
				</view>
				
				<view class="sure-btn" @tap="hides('QSPopupShare')">
					取消
				</view>
			</view>
		</QSPopup>
		<view class="hids" v-if="hids" @click="hidsctx"></view>
		<view class="hids-main" v-if="hids" @click="hidsctx">
			<view>
				<image :src='imag+"15.jpg"' mode="" class="bgimg"></image>
				<image class="codes" :src="codeImg"></image>
			</view>
			<canvas style="width: 100%; height: 100%;" canvas-id="firstCanvas" class="firstCanvas"></canvas>
			<view class="btn-wrap">
				<button type="primary" size="mini" @tap.prevent.stop="shareF()">保存图片</button>
			</view>
		</view>
		<!-- <canvas style="width: 200px; height: 440px;" canvas-id="firstCanvas"></canvas> -->
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import getSharePoster from '@/components/QS-SharePoster/QS-SharePoster.js'
	const app = getApp();
	export default{
		data(){
			return{
				imag: app.globalData.imag,
				codeImg:'',
				bgImg:'',
				windowWidth:0,
				windowHeight:0,
				base64:null,
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				hids:false,
				downloadPic:''
			}
		},
		components: {QSPopup},
		onLoad() {
			this.getCode();
			
		},
		
		onShareAppMessage(option) {
			let that = this
			 return {
			      title: '扫一扫注册',
			      path: '/pages/index/index',
				  imageUrl:that.codeImg
			    }
		},
		methods:{
			
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			
			getCode(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/user/qrcode','post',data).then(res=>{
					if(res.data.status == '200'){
						this.codeImg = res.data.data.qrcode
						this.bgImg = res.data.data.share
					}
					// else{-
					// 	this.$util.showToast('网络异常，请重试!');
					// }
					console.log(res)
				})
			},
			showHids(){
				this.hids = true
			},
			hidsctx(){
				this.hids = false
			},
			shareF(){
				let that = this
				that.hids = true
				let codeimg = ''
				if(that.codeImg){
					codeimg = that.codeImg
				}else{
					codeimg = that.imag+'twocode-bg.jpg'
				}
				setTimeout(()=>{
					var ctx = uni.createCanvasContext('firstCanvas')
					// 背景
					ctx.beginPath()
					ctx.drawImage(that.imag+'15.jpg',0,0,270,400)
					ctx.rotate(73 * Math.PI / 180)
					ctx.drawImage(codeimg,214,-115,110,110)
					ctx.closePath()
					ctx.draw(false, ()=>{
					     that.$util.showLoading('请稍后，正在生成...');
					     setTimeout(function(){
					      uni.canvasToTempFilePath({
					       x:0,
					       y:0,
					       width:270,
					       height:400,
					       fileType:'png',
					       quality:1,
					       canvasId: 'firstCanvas',
					       success: (res) => {
					        console.log('1212',res);
					        that.downloadPic = res.tempFilePath;
					        // uni.hideLoading();
							that.$util.hideLoading()
					        if (res.errMsg == "canvasToTempFilePath:ok") {
					         that.downs();
					        }
					       },
					       fail(err) {
					        console.log(err);
					       }
					      })
					     },500)
					    })
					
				})
				
			},
			downs(){
			    let that = this;
				console.log(that.downloadPic)
			    uni.saveImageToPhotosAlbum({
			     filePath: that.downloadPic,
			     success: function(errMsg){
					
			      // this.$toast("保存成功");
			      console.log('3443',errMsg);
			      uni.showToast({
			       title:'保存成功'
			      })
				  setTimeout(()=>{
					that.hids = false  
				  },1000)
			     },
			     fail: function(err){
			      uni.showToast({
			       title:'保存失败',
			       icon:'none'
			      });
			      console.log(err);
			     }
			    })
			   },
			async shareFc() {
				let that = this
				try {
					if (!that.poster.finalPath) {
						const d = await getSharePoster({
							type: 'testShareType',
							// background:{
							// 	width:750,
							// 	height:1200,
							// 	backgroundColor:white
							// },
							backgroundImage:that.bgImg,
							posterCanvasId: that.canvasId,
							qrCodeArray: ({bgObj, type, bgScale}) => {
								return [{
									text: '',
									size: bgObj.width*0.01,
									dx: bgObj.width*0.1 - 999,
									dy: bgObj.height - bgObj.width*0.1
								}]
							},
							imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
								const dx = bgObj.width*0.3; 
								return [{
									url: that.codeImg,
									dx,
									dy: bgObj.height - bgObj.width*0.9,
									dWidth:240,
									dHeight:240,
									// dy: bgObj.height * 0.5,
									// infoCallBack(imageInfo) {
									// 	let scale = bgObj.width*0.2 / imageInfo.height;
									// 	return {
									// 		dWidth: bgObj.width*0.4,	
									// 		dHeight: bgObj.width*0.4,
									// 	}
									// }
								}]
							},
							textArray: ({bgObj, type, bgScale}) => {
								const fontSize = bgObj.width*0.08;
								const lineHeight = bgObj.height*0.04;
								return [{
									// fontStyle: 'italic',
									// text: '扫一扫注册',
									// size: fontSize,
									// color: 'white',
									// alpha: .5,
									// textAlign: 'center',
									// textBaseline: 'middle',
									// infoCallBack(textLength) {
									// 	_app.log('index页面的text的infocallback ，textlength:' + textLength);
									// 	return {
									// 		dx: bgObj.width - textLength - fontSize,
									// 		dy: bgObj.height - lineHeight*3
									// 	}
									// }
								}
								]
							},
							setCanvasWH: ({bgObj, type, bgScale}) => { // 为动态设置画布宽高的方法，
								console.log(bgObj, type, bgScale)
								that.poster = bgObj ;
								
							},
							// setDraw: ({Context, bgObj, type, bgScale}) => {
							// 	Context.setFillStyle('black');
							// 	Context.setGlobalAlpha(0.3);
							// 	Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
							// }
						});
						console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
						that.poster.finalPath = d.poster.tempFilePath;
					}
					that.qrShow = true;
				} catch (e) {
					
					that.$util.hideLoading();
					that.$util.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				let that = this
				uni.saveImageToPhotosAlbum({
					filePath: that.poster.finalPath,
					// filePath: that.base64,
					success(res) {
						that.$util.showToast('保存成功');
						that.qrShow = false;
					},
					fail(rej) {
						that.$util.showToast('保存失败');
					}
				})
				
				// // #ifdef H5
				// this.$util.showToast('保存了');
				// // #endif
			},
			
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		// background:#FFFFFF;
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
		}
	}
	.hids{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #000;
		opacity: 0.5;
		z-index: 1000;
	}
	.hids-main{
		width: 520upx;
		height: 800upx;
		position: fixed;
		top: 12%;
		left: 14%;
		background-color: #fff;
		z-index: 1001;
		
		.bgimg{
			width: 520upx;
			height: 800upx;
		}
		.codes{
			width: 246upx;
			height: 246upx;
			position: absolute;
			transform: rotate(73deg);
			top: 360upx;
			left: 138upx;
		}
	}
	.firstCanvas{
		position: fixed;
		top: -99999px;
	}
	.btn-wrap{
		position: fixed;
		left: 50%;
		top: 80%;
		transform: translateX(-50%);
	}
	.code-bg{
		
		position: absolute;
		width: 100%;
		height: calc(100% - 176upx);
		top: 176upx;
		left: 0;
		z-index: -2;
	}
	.code-wrap{
		position: absolute;
		left: 10%;
		top: 50%;
	}
	.code-bg2{
		
		width: 620upx;
		height: 620upx;
		transform: rotate(-16deg);
	}
	.share-wraps{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-top: 2upx solid #f2f2f5;
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		overflow: hidden;
		.code{
			position: absolute;
			top: 78upx;
			left: 126upx;
			width: 314upx;
			height: 314upx;
			// margin-top: 410upx;
			// background-color: blue;
			transform: rotate(73deg);
		}
		.share-text{
			font-size: 36upx;
			margin-top: 30upx;
		}
	}
	
	.xiazai{
		width: 42upx;
		height: 42upx;
		position: fixed;
		top: 104upx;
		right: 30upx;
		z-index: 999;
	}
	//分享按钮弹出层
	.share-order{
		width: 750upx;
		height: 430upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		padding: 100upx 180upx;
		box-sizing: border-box;
		justify-content: space-between;
		.share-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 80upx;
				height: 80upx;
				margin-bottom: 20upx;
				margin-top: 0;
			}
		}
	}
	.sure-btn{
		width: 100%;
		height: 100upx;
		background:rgba(251,65,66,1);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		font-size: 40upx;
		color: #ffffff;
		line-height: 100upx;
		text-align: center
	}
	
	
	
	// 海报插件css
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
