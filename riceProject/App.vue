
<script>
	import http from '@/api/http.js'
	export default {
		 globalData: {  
		            imag:'http://img.beishenliangpin.com/' 
		        }, 
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 页面加载时触发  
			var pinf = plus.push.getClientInfo();  
			var cid = pinf.clientid;//客户端标识  
			console.log(cid)
			if(!cid){
				setTimeout(()=>{
					cid = plus.push.getClientInfo().clientid
					uni.setStorageSync('cid',cid)
				},300)
			}
			// 84eb4ad9354d2f54ac165a6767ab44a9
			uni.setStorageSync('cid',cid)
			const _self = this;  
			const _handlePush = function(message) {
				// TODO  
			};  
			plus.push.addEventListener('click', _handlePush);  
			plus.push.addEventListener('receive', _handlePush);  
			// var msgs = plus.push.getAllMessage();
			// console.log(msgs) 
			// let str = {"title":"ceshi","content":"ceshi222"}
			// let str1 = JSON.stringify(str)
			// plus.push.createMessage(str);
			let appid = plus.runtime.appid
			let version = plus.runtime.version
			uni.setStorageSync('version',version)
			// #endif 
			
			
			//#ifdef MP-WEIXIN
			wx.login({
			      success: res => {
			        console.log(res)
			        let data = {
			          code : res.code
			        }
			        // 发送 res.code 到后台换取 openId, sessionKey, unionId
			        
			        http('/api/login/getsession_key','post',data).then(ress=>{
			        // http('/app/login/regist','post',data).then(ress=>{
			          console.log(ress)
						
			          wx.setStorageSync('openid',ress.data.data.session_key.openid)
			        })
			      }
			    })
				console.log(wx.getStorageSync('openid'))
			// #endif 
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	//#ifndef MP-WEIXIN
	@font-face
	{
	font-family: myFirstFont;
	src: url('~@/static/icofont/helvetica2.ttf')
	}
	@font-face
	{
	font-family: numFont;
	src: url('~@/static/icofont/source3.ttf')
	}
	/* @font-face
	{
	font-family: myFirstFont;
	src: url('~@/static/icofont/Helvetica.ttf')
	}
	@font-face
	{
	font-family: numFont;
	src: url('~@/static/icofont/Helvetica.ttf')
	} */
	// #endif
	
	page{
		background-color: #fff;
	}
	view,text{
		font-size: 28upx;
		text-align: left;
		/* #ifdef APP-PLUS */
		font-family:myFirstFont;
		/* #endif */
	}
	button{
		font-size: 28rpx;
		line-height: 2;
	}
	image{
		display: block;
		width: 20upx;
		height: 20upx;
	}
	input{
		text-align: left;
		font-size: 30upx;
	}
	.container{
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.bgWhite{
		background-color: #fff;
	}
	.back{
		width: 40upx;
		height: 40upx;
	}
	.next{
		width: 16rpx;
		height: 27rpx;
	}
	.searchPic{
		width: 30upx;
		height: 30upx;
	}
	.transformT{
		transition: all 1s ;
		transform: rotateZ(-180deg);
		transform-origin:50% 50%;
	}
	.transformF{
		transition: all 1s ;
		transform: rotateZ(0deg);
		transform-origin:50% 50%;
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
	
	
	.scale-1px-bottom{
		position: relative;
		border: none;
	}
	.scale-1px-bottom::after{
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		background: #d9d9dd;
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
	   border: 1px solid #d9d9dd;
	   border-radius: 20upx;
	   -webkit-transform: scale(0.5);
	   transform: scale(0.5);
	   -webkit-transform-origin: 0 0;
	   transform-origin: 0 0;
	   box-sizing: border-box;
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
	
	/* index 背景 */
	.indexBg{
		background-color: #2180fe;
		border-radius: 0rpx 0rpx 50% 50% / 0rpx 0rpx 20rpx 20rpx;
	}
</style>
