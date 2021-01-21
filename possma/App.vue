<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.setStorageSync('hids',1)
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function(){
			
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	@import url("common/common.css");
	.content{width:100%;padding:0;padding:0;color:#333333}
	.clearBoth{clear:both}
	.comm-btn{background: linear-gradient(0deg, #409BE0 0%, #76B6FF 100%) !important;}
	@font-face {
	    font-family: my-font;
	    src: url('~@/static/font/price.ttf');
	}
	/*每个页面公共css */
	 .clearFloat{
	 	zoom: 1;
	 }
	 .clearFloat::after {
	   content: "";
	   display: block;
	   height: 0;
	   clear: both;
	   visibility: hidden;
	 }
	 .overHidden{
	 	overflow: hidden;
	 }
	 .hids{
	 	position: fixed;
	 	width: 100%;
	 	height: 100%;
	 	left: 0;
	 	top: 0;
	 	background-color: #000;
	 	opacity: .5;
	 	z-index: 180;
	 }
	 .scale-1px-bottom{
	 	position: relative;
	 	border: none;
	 }
	 .scale-1px-bottom::after{
	 	content: '';
	 	position: absolute;
	 	bottom: 0;
	 	right: 0;
	 	background: #ddd;
	 	height: 1px;
	 	width: 100%;
	 	-webkit-transform: scaleY(0.5);
	 	transform: scaleY(0.5);
	 	-webkit-transform-origin: 0 0;
	 	transform-origin: 0 0;
	 }
	 .scale-1px-top{
	 	position: relative;
	 	border: none;
	 }
	 .scale-1px-top::after{
	 	content: '';
	 	position: absolute;
	 	top: 0;
	 	right: 0;
	 	background: #ddd;
	 	height: 1px;
	 	width: 100%;
	 	-webkit-transform: scaleY(0.5);
	 	transform: scaleY(0.5);
	 	-webkit-transform-origin: 0 0;
	 	transform-origin: 0 0;
	 }
	 .scale_border{
	 	position: relative;
	 	border: none;
	 }
	 .scale_border::after{
	    content: '';
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 200%;
	    width: 200%;
	    border: 1px solid #f3f1f1;
	    border-radius: 20upx;
	    -webkit-transform: scale(0.5);
	    transform: scale(0.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    box-sizing: border-box;
	  }
	  .nodata {
	  	text-align: center;
	  	position: absolute;
	  	top: 50%;
	  	left: 50%;
	  	transform: translate(-50%, -50%);
	  	color: #aaaaaa;
	  	font-size: 30upx;
	  }
	 .text-white{
	 	color: #fff;
	 }
	 .text-center{
	 	text-align: center;
	 }
	 .text-line{
	 	text-decoration: line-through;
	 }
	 .minH40{
		 min-height: 80upx;
	 }
	 .width100{
	 	width: 100%;
	 }
	.color-steel{
		color: #181C62;
	}
	.color-com{
		color: #30A9E0;
	}
	.color-blackB{
		color: #30313B;
	}
	.color-red{
		color: #FF5060;
	}
	 .color-gray{
	 	color: #bcbcbc;
	 }
	 .color-333{
	 	color: #333;
	 }
	 .color-666{
	 	color: #666;
	 }
	 .color-999{
	 	color: #999;
	 }
	 .color-bbb{
	 	color: #bbb;
	 }
	 .disNone{
	 	display: none;
	 }
	 .disBlock{
	 	display: block;
	 }
	 .disFlex{
	 	display: flex;
	 }
	 .disFlexEnd{
	 	display: flex;
	 	align-items: flex-end;
	 }
	 .bgWhite{
	 	background-color: white;
	 }
	 .bgF4{
	 	background-color: #f4f4f4;
	 }
	 .disCenter{
	 	display: flex;
	 	justify-content: center;
	 	align-items: center;
	 }
	 .disAlignCenter{
	 	display: flex;
	 	align-items: center;
	 }
	 .disBetween{
	 	display: flex;
	 	justify-content: space-between;
	 	align-items: center;
	 }
	 .flex1{
	 	flex: 1;
	 }
	 .fontIta{
		 font-style: italic;
	 }
	 .fontBold{
	 	font-weight: bold;
	 }
	 .font48{
	 	font-size: 48upx;
	 }
	 .font46{
	 	font-size: 46upx;
	 }
	 .font44{
	 	font-size: 44upx;
	 }
	 .font42{
	 	font-size: 42upx;
	 }
	 .font40{
	 	font-size: 40upx;
	 }
	 .font36{
	 	font-size: 36upx;
	 }
	 .font34{
	 	font-size: 34upx;
	 }
	 .font32{
	 	font-size: 32upx;
	 }
	 .font30{
	 	font-size: 30upx;
	 }
	 .font28{
	 	font-size: 28upx;
	 }
	 .font26{
	 	font-size: 26upx;
	 }
	 .font24{
	 	font-size: 24upx;
	 }
	 .font22{
	 	font-size: 22upx;
	 }
	 .scale05{
	 	transform: scale(.5);
	 }
	 .scale06{
	 	transform: scale(.6);
	 }
	 .scale07{
	 	transform: scale(.7);
	 }
	 .scale08{
	 	transform: scale(.8);
	 }
	 .scale09{
	 	transform: scale(.9);
	 }
	 .scaleLeft{
	 	transform-origin: left;
	 }
	 
	 .contents{
	 	padding: 30upx;
	 }
	 /* padding */
	 .padding5{
	 	padding: 5upx;
	 }
	 .padding10{
	 	padding: 10upx;
	 }
	 .padding15{
	 	padding: 15upx;
	 }
	 .padding20{
	 	padding: 20upx;
	 }
	 /* paddingTop */
	 .paddingTop5{
	 	padding-top: 5upx;
	 }
	 .paddingTop10{
	 	padding-top: 10upx;
	 }
	 .paddingTop15{
	 	padding-top: 15upx;
	 }
	 .paddingTop20{
	 	padding-top: 20upx;
	 }
	 /* paddingLeft */
	 .paddingLeft5{
	 	padding-left: 5upx;
	 }
	 .paddingLeft10{
	 	padding-left: 10upx;
	 }
	 .paddingLeft15{
	 	padding-left: 15upx;
	 }
	 .paddingLeft20{
	 	padding-left: 20upx;
	 }
	 /* paddingRight */
	 .paddingRight5{
	 	padding-right: 5upx;
	 }
	 .paddingRight10{
	 	padding-right: 10upx;
	 }
	 .paddingRight15{
	 	padding-right: 15upx;
	 }
	 .paddingRight20{
	 	padding-right: 20upx;
	 }
	 /* paddingBottom */
	 .paddingBottom5{
	 	padding-bottom: 5upx;
	 }
	 .paddingBottom10{
	 	padding-bottom: 10upx;
	 }
	 .paddingBottom15{
	 	padding-bottom: 15upx;
	 }
	 .paddingBottom20{
	 	padding-bottom: 20upx;
	 }
	 /* margin */
	 .marginTop5{
	 	margin-top: 5upx;
	 }
	 .marginTop10{
	 	margin-top: 10upx;
	 }
	 .marginTop15{
	 	margin-top: 15upx;
	 }
	 .marginTop20{
	 	margin-top: 20upx;
	 }
	 .marginTop50{
	 	margin-top: 50upx;
	 }
	 .marginBottom5{
	 	margin-bottom: 5upx;
	 }
	 .marginBottom10{
	 	margin-bottom: 10upx;
	 }
	 .marginBottom15{
	 	margin-bottom: 15upx;
	 }
	 .marginBottom20{
	 	margin-bottom: 20upx;
	 }
	 .marginBottom30{
	 	margin-bottom: 30upx;
	 }
	 .margingLeft5{
	 	margin-left: 5upx;
	 }
	 .margingLeft10{
	 	margin-left: 10upx;
	 }
	 .margingLeft15{
	 	margin-left: 15upx;
	 }
	 .margingLeft20{
	 	margin-left: 20upx;
	 }
	 .margingRight5{
	 	margin-right: 5upx;
	 }
	 .margingRight10{
	 	margin-right: 10upx;
	 }
	 .margingRight15{
	 	margin-right: 15upx;
	 }
	 .margingRight20{
	 	margin-right: 20upx;
	 }
	 .margingRight30{
	 	margin-right: 30upx;
	 }
	 
	 
	 /* 一行超出省略号 */
	 .line1{
	 	display: -webkit-box;
	 	line-clamp: 1;
	 	-webkit-line-clamp: 1;
	 	box-orient: vertical;
	 	-webkit-box-orient: vertical;
	 	overflow: hidden;
	 	word-break:break-all
	 }
	 /* 两行超出省略号 */
	 .line2{
	 	display: -webkit-box;
	 	line-clamp: 2;
	 	-webkit-line-clamp: 2;
	 	box-orient: vertical;
	 	-webkit-box-orient: vertical;
	 	overflow: hidden;
	 	word-break:break-all
	 }
	 /* 3行超出省略号 */
	 .line3{
	 	display: -webkit-box;
	 	line-clamp: 3;
	 	-webkit-line-clamp: 3;
	 	box-orient: vertical;
	 	-webkit-box-orient: vertical;
	 	overflow: hidden;
	 	word-break:break-all
	 }
</style>