<template>
	<view>
		<!-- <view class="img-box" >
			<image src="" class="img" mode=""></image>
		</view> -->
		<swiper class="img-box" :autoplay="true" :interval="5000" :duration="500"
		 :style="{'height':windowHeight}">
			<swiper-item v-for="(item,index) in list" :key="index" :style="{'height':windowHeight}">
				<view class="swiper-item" :style="{'height':windowHeight}">
					<image :src="item.image" class="img" :style="{'height':windowHeight}"></image>
					<!-- <view class="guide-time" @click.stop="toIndex">
						跳过 {{timers}}
					</view> -->
				</view>
			</swiper-item>
		</swiper>
		<view class="count-time" @click="skip" :style="{'top':(StatusBar + 20) + 'px'}">
			({{timers}}s)跳过
		</view>
		
		<view class="showDow" v-if="showBeginShadow">
			<view class="bg_grey"></view>
			<view class="bg_white">
				<view class="title">服务协议及隐私政策</view>
				<view class="titlesA">亲，感谢你对宁东资讯的信任！
请注意，在您使用本软件过程中我们会按照<view class="jumps titlesA" @tap="jumps(0)">《宁东资讯隐私政策》</view>、<view class="jumps titlesA" @tap="jumps(1)">《宁东资讯用户协议》</view>收集、使用和共享您的个人信息，请认真阅读并充分理解。特别提示：
1、为向您提供交易相关基本功能，我们会收集、使用必要的信息；
2、基于您的授权，我们可能获取您的位置等信息，您有权拒绝或取消授权；
3、我们会采用业界先进的安全措施保护您的信息安全；
4、未经您的同意，我们不会从第三方处获取、共享或向其提供您的信息；</view>
				<view class="btns falseBtn" @tap="clickFlase">不同意</view>
				<view class="btns sureBtn" @tap="clickSure">同意</view>
			</view> 
		</view>
	</view>
</template>

<script>
	let timer = ''
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				list:[],
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				windowHeight:"667px",
				timers:5,
				showBeginShadow:false,
			}
		},
		onLoad(option) {
			
			this.getList()
			let val = uni.getStorageSync('agree')
			console.log(val)
			if(val){
				this.showBeginShadow = false
				this.countdown()
			}else{
				this.showBeginShadow = true
			}
			
			//#ifndef MP-WEIXIN
				let _me = this;
				uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
					success: function(res) {
						console.log(res.model);
						console.log(res.pixelRatio);
						console.log(res.windowWidth);
						console.log(res.windowHeight);//这里是手机屏幕高度
						console.log(res.language);
						console.log(res.version);
						console.log(res.platform);
						_me.windowHeight = res.windowHeight + 'px';
						console.log('手机屏幕高度为' + _me.windowHeight);
					}
				});
			// #endif 
		},
		methods: {
			clickFlase(){
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				}else{ 
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				}
			},
			clickSure(){
				uni.setStorageSync('agree', '1');
				this.showBeginShadow = false
				this.countdown()
			},
			jumps(type){
				uni.navigateTo({
					url:'/pages/login/agreement?type=' + type
				})
			},
			getList(){
				let data = {}
				http('/api/Login/guideMapList','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.guideMapList
					}
					console.log(res)
				})
			},
			countdown(){
				clearInterval(timer);
				// this.timers = 5
				timer = setInterval(() => {
					this.timers--;
					if (this.timers <= 0) {
						clearInterval(timer);
						// uni.reLaunch({
						// 	url: '/pages/login/login'
						// });
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				}, 1000)
			},
			skip(){
				clearInterval(timer);
				// uni.reLaunch({
				// 	url: '/pages/login/login'
				// });
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
		}
	}
</script>

<style lang="less">
	.img-box{
		
		.img{
			width: 100%;
		}
	}
	.count-time{
		font-size: 32upx;
		color: #fff;
		position: fixed;
		right: 40upx;
		z-index: 20;
	}
	.showDow{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 30}
	.showDow .bg_grey{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 3;background: rgba(0,0,0,0.4);}
	.showDow .bg_white{width:80%;height:auto;margin-left: 50%;transform: translateX(-50%);padding:2% 5%;position: fixed;top:30%;left:0;z-index: 3;background:white;text-align: center;border-radius: 10upx;}
	.showDow .bg_white .title{font-size: 18px;padding:60upx 0;padding-bottom: 30px;margin-bottom: 0upx;font-weight: bold;}
	.showDow .bg_white .titlesA{font-size: 12px;padding:0;padding-bottom: 30px;margin-bottom: 0upx;font-weight: bold;color:#B3B3B3;}
	.showDow .bg_white .jumps{display: inline;color:rgba(0,0,0,0.8);font-weight: bold;}
	.showDow .bg_white .btnSure{color:#C68660;font-size: 18px;border-top: 1px solid #E5E5E5;;padding:20upx 0;}
	.showDow .bg_white .btns{width:50%;float: left;border-top: 1px solid #E5E5E5;padding:20upx 0;}
	.showDow .bg_white .falseBtn{color:#999999}
	.showDow .bg_white .sureBtn{color:#181C62}
</style>
