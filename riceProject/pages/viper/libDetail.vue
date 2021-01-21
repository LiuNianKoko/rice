<template>
	<view>
		<view class="header-wrap scale-1px-bottom">
			<view class="index-header">
				{{libDetail.title}}
				<view class="back-icon-wrap" @click="back">
					<image class="back-icon" src="/static/back-black.png" ></image>
				</view>
				
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<image class="share-btn" src="/static/share-img.png" @tap="show('QSPopupShare')"></image>
			<!-- #endif -->
		</view>
		
		<view class="lib-wraps">
			<!-- <view class="lib-title">
				{{libDetail.title}}
			</view>
			<view class="lib-intr">
				{{libDetail.details}}
			</view>
			<view class="lib-time">
				发布时间:{{libDetail.add_time}}
			</view> -->
			
			<!-- <view class="marginTop20">
				<video style="width: 100%;" :poster="libDetail.cover" src="https://video-qn.51miz.com/preview/video/00/00/11/23/V-112372-4E9384D0.mp4"  controls></video>
			</view> -->
			<view class="marginTop20">
				<view v-html="libDetail.content"></view>
			</view>
			
			<!-- <view class="lib-smalltitle">
				响水贡米的奥秘  
			</view>
			<view class="lib-artical">
				关于响水大米的由来,由于部分地下泉水因海拔镜泊湖水压差,使带着富含氧离子的旗袍从熔岩裂缝缝隙中向稻田地面涌出,加上玄武岩中含有大量的气孔、裂隙，水体热胀冷缩，上下反复，周而复始，“串串旗袍，轻轻响声，清脆神秘，不知所踪”，故谓之“响水”
			</view>
			<view class="lib-pic">
				<image src="/static/libdetail.png"></image>
			</view> -->
		</view>
		
		
		<!-- 分享按钮弹窗 -->
		<QSPopup ref="QSPopupShare" type="fadeInUp">
			<view class="share-order disFlex">
				<view class="share-item" @click="shareWeixin">
					<image src="/static/wxfriend.png"></image>
					微信好友
				</view>
				<view class="share-item" @click="shareCircleWeixin">
					<image src="/static/friendcircle.png"></image>
					朋友圈
				</view>
				<!-- <view class="share-item">
					<image src="/static/downloads.png"></image>
					一键下载
				</view> -->
				<view class="sure-btn" @tap="hides('QSPopupShare')">
					取消
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default{
		components: {QSPopup},
		data(){
			return{
				libDetail:{},
				id:0,
				domain_name:'',//域名
				goodsName:'',
				goodsDesc:'',
				coverImg:'',
				v:'<video :autoplay="true" show-play-btn show-center-play-btn controls objectFit="fill" style="width:100%" src = "https://video-qn.51miz.com/preview/video/00/00/11/23/V-112372-4E9384D0.mp4"> </video>'
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.getLibDetail()
			this.getdomainName()
		},
		onShareAppMessage(option) {
			let that = this
			return {
			    title: that.goodsName,
			    path: '/pages/viper/libDetail?id='+that.id,
				imageUrl:that.coverImg
			   }
		},
		methods:{
			getdomainName(){
				http('/Api/setting/downloadInfo','post').then(res=>{
					this.domain_name = res.data.data.domain_name
				})
			},
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
			getLibDetail(){
				let that = this
				let data = {
					id:that.id
				}
				http('/api/Setting/sourceMaterialInfo','post',data).then(res=>{
					if(res.data.status == '200'){
						that.libDetail = res.data.data.article
						that.goodsName= res.data.data.article.title
						that.goodsDesc= res.data.data.article.details
						that.coverImg= res.data.data.article.cover
						if(that.libDetail.content){
							let reg = new RegExp('<img', 'gi');
							that.libDetail.content = that.libDetail.content.replace(reg, `<img style="width: 100%;vertical-align:top;"`);
							// let regs = new RegExp('<embed', 'gi');
							// that.libDetail.content = that.libDetail.content.replace(regs, `<embed style="width: 100%"`);
							// that.libDetail.content = that.libDetail.content.replace(regs, `<video src="https://video-qn.51miz.com/preview/video/00/00/11/23/V-112372-4E9384D0.mp4" style="width: 100%"`);
						}
					}
					console.log(res)
				})
			},
			shareWeixin(){
				uni.share({
				   //  provider: "weixin",
				   //  scene: "WXSceneSession",
				   //  type: 0,
				   //  href: this.domain_name+"/#/pages/viper/libDetail?id="+this.id,
				   // title: '我在北申良品发现一个宝贝',
				   //  summary: this.goodsName,
				   //  imageUrl: this.coverImg,
					provider: 'weixin',
					scene: "WXSceneSession",
					type: 5,
					imageUrl:this.coverImg,
					title: this.goodsName,
					miniProgram: {
						id: 'gh_921dd6574e02',
						path: 'pages/viper/libDetail?id='+this.id,
						type: 0,
						webUrl: this.domain_name+"/#/pages/viper/libDetail?id="+this.id,
					},
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				})
			},
			shareCircleWeixin(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: this.domain_name+"/#/pages/viper/libDetail?id="+this.id,
				    title: '我在北申良品发现一个宝贝',
				    summary: this.goodsName,
				    imageUrl: this.coverImg,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				})
			},
		}
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		background:#FFFFFF;
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			position: relative;
			.back-icon{
				width: 26upx;
				height: 44upx;
				
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
		}
	}
	.lib-wraps{
		padding: 30upx;
		margin-top: 176upx;
		box-sizing: border-box;
		.lib-title{
			font-size:32upx;
			line-height:48upx;
		}
		.lib-intr{
			color:#bbbbbb;
			line-height:44upx;
			margin-top: 30upx;
		}
		.lib-time{
			font-size:24upx;
			color:#bbbbbb;
			line-height:32upx;
			margin-top: 30upx;
		}
		.lib-smalltitle{
			margin-top: 50upx;
			font-weight:bold;
			line-height:40upx;

		}
		.lib-artical{
			line-height:48upx;
			margin-top: 30upx;
			text-indent: 1.5rem;
		}
		.lib-pic{
			margin-top: 50upx;
			image{
				width: 690upx;
				height: 786upx;
			}
		}
	}
	.share-btn{
		width: 80upx;
		height: 80upx;
		position: fixed;
		right: 30upx;
		top: 90upx;
		z-index: 999;
	}
	//分享按钮弹出层
	.share-order{
		width: 750upx;
		height: 430upx;
		background-color: #ffffff;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		padding: 100upx 186upx;
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
</style>
