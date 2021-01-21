<template>
	<view class="guide-wraps">
		<swiper class="swiper" :indicator-dots="true" :autoplay="autoplay" :interval="5000" :duration="500"
		@animationfinish="animationfinish" @change="changecur" :style="{'height':windowHeight}">
			<swiper-item v-for="(item,index) in bannerImg" :key="index" :style="{'height':windowHeight}">
				<view class="swiper-item" @click="bannerTo(item,index)" :style="{'height':windowHeight}">
					<image :src="item.image" :style="{'height':windowHeight}"></image>
					<view class="guide-time" @click.stop="toIndex">
						跳过 {{timers}}
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<QSPopup ref="QSPopup" :tapMaskHide="false">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					
					<view>亲，感谢你对棋特买菜的信任！</view>
					
					<view>请注意，在您使用本软件过程中我们会按照
							<text class="txt" @click="toPro">《棋特买菜隐私政策》</text>
						、
							<text class="txt" @click="toAgree">《棋特买菜用户协议》</text>
						
						收集、使用和共享您的个人信息，请认真阅读并充分理解。
					</view>
					<view>特别提示：</view>
					<view>1、为向您提供交易相关基本功能，我们会收集、使用必要的信息；</view>
					<view>2、基于您的授权，我们可能获取您的位置等信息，您有权拒绝或取消授权；</view>
					<view>3、我们会采用业界先进的安全措施保护您的信息安全；</view>
					<view>4、未经您的同意，我们不会从第三方处获取、共享或向其提供您的信息；</view>
					
					
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="quit">
						不同意
					</view>
					<view class="del-btn-yes" @tap="surehide">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	let timer = '';
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default{
		components:{QSPopup},
		data(){
			return{
				bannerImg:[],
				windowHeight:"667px",
				autoplay:true,
				timers:2,
				nav:false,
				page:1
			}
		},
		onLoad(option) {
			this.getGuide()
			// uni.setStorageSync('looktype',0)
			//#ifdef MP-WEIXIN
			let scene = decodeURIComponent(option.scene)//参数二维码传递过来的参数
			// let query = options.query.dentistId // 参数二维码传递过来的场景参数
			let q = decodeURIComponent(option.q)
			console.log(q)
			console.log(scene)
			// console.log(query)
			//#endif
			console.log(uni.getStorageSync('looktype'))
			
			console.log(uni.getStorageSync('looktype'))
			
			
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
		onReady() {
			//#ifdef MP-WEIXIN
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
			//#endif
		},
		onShow() {
			
			if(!uni.getStorageSync('looktype')){
				this.autoplay = false
				setTimeout(()=>{
					this.show('QSPopup')
				},50)
			}else{
				// this.autoplay = true
				// this.countdown()
				if(this.page == this.bannerImg.length){
					this.nav = true
					this.autoplay = false
				}else{
					this.nav = false
					this.autoplay = true
				}
				this.countdown()
			}
			
		},
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			surehide(){
				this.hides('QSPopup')
				uni.setStorageSync('looktype',1)
				this.autoplay = true
				if(this.bannerImg.length == 1){
					this.nav = true
				}
				this.countdown()
			},
			toPro(){
				uni.navigateTo({
					url:"/pages/index/logon/userpro"
				})
			},
			toAgree(){
				uni.navigateTo({
					url:"/pages/index/logon/useragree"
				})
			},
			getGuide(){
				http('/api/index/guide_list','post').then(res=>{
					console.log(res)
					this.bannerImg = res.data.data
					if(uni.getStorageSync('looktype')){
						if(this.bannerImg.length == 1){
							this.nav = true
							this.countdown()
						}
					}
				})
			},
			bannerTo(item,index) {  //0:无；1外链；2素材；3商品详情；4分类
				this.page = index + 1
				if(item.banner_type==0){
					return
				}else if(item.banner_type==1){
					clearInterval(timer);
					this.autoplay = false
					this.nav = false
					this.countdown()
					uni.navigateTo({
						url: '/pages/index/totalList?src=' + item.link
					})
				}else if(item.banner_type==2){
					clearInterval(timer);
					this.autoplay = false
					this.nav = false
					this.countdown()
					// uni.navigateTo({
					// 	url:"/pages/viper/libDetail?id=" + item.link
					// })
					uni.navigateTo({
						url:"/pages/viper/libDetail?id=" + item.link
					})
				}else if(item.banner_type==3){
					clearInterval(timer);
					this.autoplay = false
					this.nav = false
					this.countdown()
					uni.navigateTo({
						url:"/pages/index/detail?goodsid=" + item.link
					})
				}else if(item.banner_type==4){
					clearInterval(timer);
					this.autoplay = false
					this.nav = false
					this.countdown()
					this.$util.setStorage('indexNum',Number(item.link))
					uni.switchTab({
						url:"/pages/item/item"
					})
				}
			},
			animationfinish(e){
				console.log(e)
				if(e.detail.current == this.bannerImg.length-1){
					this.autoplay = false
					if(this.timers <= 0){
						this.nav = true
					}
					this.countdown()
					//  setTimeout(function() {
					// 	uni.switchTab({
					// 		url: '/pages/index/index'
					// 	});
					// }, 5000)
				}
			},
			changecur(e){
				console.log(e)
				
				if(e.detail.current == this.bannerImg.length-1){
					this.autoplay = false
					this.nav = true
				}else {
					this.autoplay = true
					this.nav = false
				}
				this.countdown()
				console.log(this.nav )
			},
			toIndex(){
				clearInterval(timer);
				this.autoplay = false
				this.nav = false
				this.countdown()
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			countdown(){
				clearInterval(timer);
				this.timers = 2
				if(this.nav == false){
					timer = setInterval(() => {
					    this.timers--;
					    if (this.timers <= 0) {
					        clearInterval(timer);
					    }
					}, 1000)
				}else{
					timer = setInterval(() => {
					    this.timers--;
					    if (this.timers <= 0) {
							uni.switchTab({
								url: '/pages/index/index'
							});
					        clearInterval(timer);
					    }
					}, 1000)
				}
				
			},
			quit(){
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				}else{ 
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				}
			},
		}
	}
	
</script>

<style lang="less">
	
	.guide-wraps{
		
		image{
			width: 100%;
		}
		.swiper-item{
			position: relative;
			.guide-time{
				width: 130upx;
				height: 50upx;
				opacity: 0.7;
				background-color: #000;
				z-index: 5;
				border-radius: 30upx;
				position: absolute;
				/* #ifdef MP-WEIXIN */
				top: 6%;
				right: 220upx;
				/* #endif */
				/* #ifndef MP-WEIXIN */
				top: 130upx;
				right: 46upx;
				/* #endif */
				color: #fff;
				font-size: 24upx;
				text-align: center;
				line-height: 50upx;
				letter-spacing: 4upx;
			}
		}
		
	}
	.content-del{
			// height: 920upx;
			width: 670upx;
			background-color: white;
			border-radius: 20upx;
			.del-text{
				padding:20upx;
				// height: 820upx;
				box-sizing: border-box;
				color: #333;
				.txt{
					color: #00a0e9;
				}
			}
			.del-btn{
				display: flex;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				.del-btn-no{
					border-right: 1px solid #e5e5e5;
					color: #999;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
				.del-btn-yes{
					color: #FB4142;
					font-size: 32upx;
					flex: 1;
					text-align: center;
				}
			}
		}
</style>
