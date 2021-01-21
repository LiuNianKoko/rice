<template>
	<view class="content">
		<view class="statusBox" :style="[{height:StatusBar + 'px'}]">
			
		</view>
		<view class="topBox" :style="[{top:StatusBar+ 'px'}]">
			<uni-icons class="icons" type="arrowleft" color="black" size="15" @tap="backBtn"/>
			<view class="title">商品详情</view>
			<image class="shareIcon" src="../../../static/image/index/icon_share.png" mode="" @tap="saveScan"></image>
		</view>
		<view class="blank"  :style="[{height:(StatusBar + 44) + 'px'}]">
			
		</view>
		<uni-swiper-dot class="swiper" :info="bannerList" :current="current" mode="dot" :dotsStyles="dotsStyles">
			<swiper class="swiper-box swiper" @change="change" :autoplay="autoplay" circular="true">  
				<swiper-item v-for="(item, index) in bannerList" :key="index + 'A'">
					<image class="swiperitem banner"  :src="item.src"/>  
				</swiper-item>  
			</swiper>  
		</uni-swiper-dot>
		
		<view class="priceBox">
			<view class="name fontSize12">活动价</view>
			<view class="price">￥{{data.price}}</view>
			<!-- <s class="priceBefore">￥{{data.beforePrice}}</s> -->
			<view class="clearBoth"></view>
		</view>
		
		<view class="titles fontSize17">{{data.title}}</view>
		<view class="titles fontSize13" v-html="data.desc"></view>
		
		<!-- <view class="commentBox">
			<view class="title">
				<view class="icons"></view>
				<view class="name fontSize14">商品评价</view>
				<view class="allComment fontSize12" @tap="allComment">查看全部<uni-icons class="icon_right" type="arrowright" color="#8C8C8C" size="12"/></view>
			</view>
			<view class="clearBoth"></view>
			
			<view class="commentData" v-for="(item,index) in commentData" :key="index + 'B'">
				<image class="headImage" :src="item.headImage" mode=""></image>
				<view class="name fontSize14 overflow_four">{{item.name}}</view>
				<view class="clearBoth"></view>
				<view class="contents overflow_two fontSize13">{{item.comments}}</view>
				<image class="showImage" :src="items" mode="" v-for="(items,indexs) in item.showImage" :key="indexs + 'C'"></image>
				<view class="clearBoth"></view>
			</view>
			<view class="clearBoth"></view>
		</view> -->
		<!-- <image class="lastImage" src="../../../static/image/index/last.png" mode="widthFix"></image> -->
		
		<!-- <input class="addBox" disabled="true" type="text" value="+" placeholder="+"  @tap="tapAddNum"	v-if="readyOnly == false">
		<input class="numbox" :value="buyNum" :placeholder="buyNum" type="number" maxlength="3" @input="getNum" disabled="true" v-if="readyOnly">
		<input class="numbox" :value="buyNum" :placeholder="buyNum" type="number" maxlength="3" @input="getNum" v-if="readyOnly == false">
		<input class="lessBox" disabled="true" type="text" value="-" placeholder="-" @tap="tapLessNum" v-if="readyOnly == false"> -->
		
		<view class="lastFooter" v-html="data.content"></view>
		<view class="buyBox">
			<view class="buyNow" @tap="buyNow">立即购买</view>
		</view>
		
		<view class="shadow" v-if="showShadow">
			<view class="close" @tap="closeShadow"></view>
			<view class="bg_white">
				<image class="sellImage" :src="bannerList_zero.src" mode=""></image>
				<view class="name overflow_two">{{titleshaDows}}</view>
				<view class="price">￥{{shadowPriceNow}}</view>
				<!-- <view class="priceBefore"><s>￥{{shadowPriceBefore}}</s></view> -->
				<view class="clearBoth"></view>
				<view class="ruleBox" v-for="(item,index) in rulwBox" :key="index + 'D'">
					<view class="ruleTips">{{item.para_name}}</view>
					<view class="ruleRow overflow_one" :class="items.checked == 1 ? 'thisRows':''" v-for="(items,indexs) in item.child_data" :key="indexs  + 'E'" @tap="thisChildRow(items,index,items.id)">{{items.para_name}}</view>
					<view class="clearBoth"></view>
				</view>
				
				<view class="numsBox">
					<view class="numName fontSize14">数量：</view>
					<input class="addBox" disabled="true" type="text" value="+" placeholder="+"  @tap="tapAddNum"	v-if="readyOnly == false">
					<input class="numbox" :value="buyNum" :placeholder="buyNum" type="number" maxlength="3" @input="getNum" disabled="true" v-if="readyOnly">
					<input class="numbox" :value="buyNum" :placeholder="buyNum" type="number" maxlength="3" @input="getNum" v-if="readyOnly == false">
					<input class="lessBox" disabled="true" type="text" value="-" placeholder="-" @tap="tapLessNum" v-if="readyOnly == false">
					<view class="clearBoth"></view>
				</view>
				<view class="tipsBox" :class="tipsBoxIndex == index ? 'ThisTipsBox':'' " v-if="is_dealer == 2" v-for="(item,index) in yh_data" :key="index + 'F'" @tap="tapThisTips(item,index)">满购{{item.num}}件,减{{item.price}}元;</view>
				<view class="clearBoth"></view>
				<view class="sure" @tap="sure">确定</view>
			</view>
		</view>
	</view>
</template>
<style>
	.statusBox{width:100%;position: fixed;top:0;left: 0;z-index: 2;background: #fff;}
	.content{overflow-x: hidden;padding-bottom: 130upx;}
	.fontSize17{font-size: 17px;}
	.content .topBox{width:100%;height:88upx;line-height: 88upx;display: flex;justify-content: space-between;position: fixed;left: 0;z-index: 100;background: #fff;}
	.content .topBox .icons{margin-left: 20upx;}
	.content .topBox .title{text-align: center;font-weight: bold;}
	.content .topBox .shareIcon{width:32upx;height:30upx;margin-right: 20upx;position: relative;top:30upx}
	.content .swiper{width:100%;height:685upx;}
	.content .banner{width:100%;height:685upx;}
	.content .priceBox{width:90%;padding:2.5%;margin:20upx 1.25%;}
	.content .priceBox .name{background:linear-gradient(to right, rgb(223,179,83) ,rgb(239,204,119));color:white;float: left;padding:10upx 20upx;border-radius: 5upx;}
	.content .priceBox .price{float:left;color:#DF2830;font-size: 24px;margin:0 30upx;position: relative;top:-5upx}
	.content .priceBox .priceBefore{color:#AFAFAF;float: left;position: relative;top:10upx;}
	.content .titles{width:90%;padding:2.5%;margin-left:2.5%;padding-top: 0;color:#323232;}
	.content .commentBox{width:95%;padding:5% 2.5%;margin-top:10upx;background: white;position: relative;}
	.content .commentBox .title{width:100%;}
	.content .commentBox .title .icons{width:4upx;height:25upx;background: rgb(78,155,244);float: left;position: relative;top:8upx}
	.content .commentBox .title .name{float: left;margin-left: 10upx;}
	.content .commentBox .title .allComment{float: right;color:#8C8C8C;}
	.content .commentBox .title .icon_right{float: right;margin-left: 10upx;}
	.content .commentBox .commentData{width:90%;margin-left: 2.5%;padding-right: 5%;margin-top:40upx;margin-bottom: 20upx;border-bottom: 2upx solid #E9E9E9;padding-bottom: 60upx}
	.content .commentBox .commentData .headImage{width:60upx;height:60upx;border-radius:60upx;margin-right: 20upx;float: left;}
	.content .commentBox .commentData .name{color:#8E8E8E;position: relative;top:10upx;width:80%;}
	.content .commentBox .commentData .contents{color:#222222;margin-top:10upx;width:100%;}
	.content .commentBox .commentData .showImage{width:30%;height:196upx;border-radius: 10upx;margin-top:20upx;margin-right:3.3%;float: left;}
	.content .lastImage{width:100%;}
	.content .buyBox{width:100%;height:124upx;background:white;position: fixed;left:0;bottom:0;z-index: 2;border-top: 2upx solid rgba(0,0,0,0.1);}
	.content .buyNow{width:70%;text-align: center;border-radius: 200upx;font-size:17px;padding:20upx 10upx;margin:50upx 0 20upx 14%;color:white;background:linear-gradient(to right, rgb(223,179,83) ,rgb(239,204,119));position: fixed;left:0;bottom:0;}
	.content .shadow{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 200;}
	.content .shadow .close{width:100%;height:100%;position: fixed;top:0;left:0;z-index: 3;background: rgba(0,0,0,0.6);}
	.content .shadow .bg_white{width:90%;padding:5%;height:40%;overflow-y: scroll;position: fixed;bottom:0;left:0;z-index: 4;background: white;border-top-left-radius: 20upx;border-top-right-radius: 20upx;}
	.content .shadow .bg_white .sellImage{width:185upx;height:185upx;border-radius: 5upx;float: left;margin-right:20upx;}
	.content .shadow .bg_white .name{font-size:15px;width:65%;height:130upx;float: left;}
	.content .shadow .bg_white .price{float: left;width:40%;font-size: 25px;color:#DF2830;}
	.content .shadow .bg_white .priceBefore{float: left;width:20%;font-size: 16px;color:#ccc;}
	.content .shadow .bg_white .numsBox{width:100%;margin: 20upx 0;}
	.content .shadow .bg_white .numsBox .numName{color:#8A8A8A;float: left;}
	.content .shadow .bg_white .numsBox .addBox{float: right;width:10%;border-radius: 5upx;border:1px solid #8A8A8A;text-align: center;margin-left: 20upx;}
	.content .shadow .bg_white .numsBox .lessBox{float: right;width:10%;border-radius: 5upx;border:1px solid #8A8A8A;text-align: center;margin-right: 20upx;}
	.content .shadow .bg_white .numsBox .numbox{float: right;width:15%;border-radius: 5upx;border:1px solid #8A8A8A;text-align: center;}
	
	.content .shadow .bg_white .tipsBox{width:auto;border-radius: 100upx;padding:10upx 20upx;font-size: 14px;margin:10upx 0;margin-right:40upx;color:#ccc;float: left;border:2upx solid #8A8A8A}
	.content .shadow .bg_white .ThisTipsBox{color:white;background:linear-gradient(to right, rgb(223,179,83) ,rgb(239,204,119));border:2upx solid rgb(223,179,83)}
	
	.content .shadow .bg_white .ruleBox{width:100%}
	.content .shadow .bg_white .ruleBox .ruleTips{width:90%;font-size: 15px;}
	.content .shadow .bg_white .ruleBox .ruleRow{width:31%;float: left;text-align: center;padding:10upx 0;margin:0 1.3% 20upx 0;border:2upx solid #ccc;border-radius: 100upx;font-size: 14px;margin-top: 20upx;}
	.content .shadow .bg_white .ruleBox .thisRows{border:2upx solid rgb(237,201,115);background: rgb(237,201,115);color:white}

	.content .shadow .bg_white .sure{width:80%;text-align: center;border-radius: 200upx;font-size:17px;padding:20upx 0upx;margin:150upx 0 50upx 9%;color:white;background:linear-gradient(to right, rgb(223,179,83) ,rgb(239,204,119));}
	.content .lastFooter{width:100%;overflow-x: hidden; }

</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import permision from "@/common/permission.js"
	export default {
		components:{
			uniIcons,
			uniSection,
			uniSwiperDot
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				autoplay: true,
				interval: 2000,
				duration: 500,
				current: 0,
				bannerList:[],
				dotsStyles:{  
					bottom:10,
					backgroundColor: 'rgba(255,255,255,0.5)',
					border: '1px none solid',
					color: '#fff',
					selectedBackgroundColor: 'white',  
					selectedBorder: '1px none solid'
				},
				commentData:[],
				data:{"price":"","beforePrice":"","title":"","desc":"","content":"","poster":""},
				showShadow:false,
				buyNum:1,
				goodsId:"",
				_$token:"",
				rulwBox:[],
				ruleIdBox:[],
				shadowPriceBefore:"",
				shadowPriceNow:"",
				is_dealer:"",
				yh_data:[],
				readyOnly:false,
				tipsBoxIndex:-1,
				titleshaDows:"",
				bannerList_zero:"",
				scan_src:''
			}
		},
		onLoad(e){
			var that = this;
			that.goodsId = e.id
			if( e.id == 151 ){
				that.readyOnly = true
			}
			that.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
				that.getScan()
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var bannerList = [],commentList = [],ruleList = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"goods_id":this.goodsId
				};
				this._$InitRequest.request('Index/goods_detail', param).then(res => {
					this.data.price = res.data.data.shop_price;
					this.data.beforePrice = res.data.data.market_price;
					if( res.data.data.goods_name ){
						this.data.title = res.data.data.goods_name;
					}
					this.titleshaDows = res.data.data.goods_name;
					this.data.desc = res.data.data.desc;
					this.data.content = res.data.data.content;
					this.data.poster = res.data.data.thumb_url
					this.is_dealer = res.data.data.is_dealer
					this.yh_data = res.data.data.yh_data
					res.data.data.pics.forEach( (item,index) =>{
						bannerList.push({
							src:item
						})
					})
					for (var i = 0; i < bannerList.length; i++){
						that.bannerList.push(bannerList[i])
					}
					this.bannerList_zero = that.bannerList[0]
					res.data.data.comment_data.forEach( (item,index) =>{
						commentList.push({
							id:item.id,
							headImage:item.headimgurl,
							name:item.nickname,
							comments:item.content,
							showImage:item.pics
						})
					})
					for (var i = 0; i < commentList.length; i++){
						that.commentData.push(commentList[i])
					}
					
					res.data.data.radioattr.forEach( (item,index) =>{
						ruleList.push({
							attr_id:item.id,
							para_name:item.para_name,
							child_data:item.child_data,
						})
					})
					for (var i = 0; i < ruleList.length; i++){
						that.rulwBox.push(ruleList[i])
						for(var a = 0;a<ruleList[i].child_data.length;a++){
							if( ruleList[i].child_data[a].checked == 1 ){
								this.ruleIdBox.push( ruleList[i].child_data[a].id )
							}
						}
					}
					this.AjaxGetPrice(this.ruleIdBox);
				},error=>{})
				
				// let params={
				// 	"user_id":this._$token.id,
				// 	"user_token":this._$token.token,
				// 	"goods_id":this.goodsId,
				// };
				// this._$InitRequest.request('Index/goods_detail', params).then(res => {
				// },error=>{})
			},
			thisChildRow(e,indexs,id){
				this.ruleIdBox = []
				for(var a = 0;a<this.rulwBox[indexs].child_data.length;a++){
					this.rulwBox[indexs].child_data[a].checked = 0
				}
				if( e.checked == 0 ){
					e.checked = 1
				}else{
					e.checked = 0
				}
				for (var i = 0; i < this.rulwBox.length; i++) {
					for(var a=0;a<this.rulwBox[i].child_data.length;a++){
						if( this.rulwBox[i].child_data[a].checked == 1 ){
							this.ruleIdBox.push( this.rulwBox[i].child_data[a].id )
						}
					}
				}
				this.ruleIdBox = JSON.stringify(this.ruleIdBox).split("[")[1].split("]")[0]
				this.AjaxGetPrice(this.ruleIdBox);
			},
			AjaxGetPrice(e){
				let params={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"goods_id":this.goodsId,
					"goods_attr":e
				};
				this._$InitRequest.request('Index/get_goods_price', params).then(res => {
					this.shadowPriceBefore = res.data.data.attrinfos.zs_shop_price
					this.shadowPriceNow = res.data.data.attrinfos.discount_price
				},error=>{})
			},
			change(e){
				this.current = e.detail.current
			},
			backBtn(){uni.navigateBack({delta:1})},
			shareBtn(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://movecar.sayyin.com/h5/register.html?user_id="+this._$token.id,
				    title: this.data.title,
				    summary: this.data.desc,
				    imageUrl: this.data.poster,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			allComment(){
				uni.navigateTo({url:"../../user/allComment/allComment?id=" + this.goodsId })
			},
			buyNow(){this.showShadow = true},
			closeShadow(){this.showShadow = false},
			getNum(e){ 
				if( e.target.value >= 1 ){
					this.buyNum = e.target.value
					this.tipsBoxIndex = -1
				}
				this.computePrice()
			},
			tapAddNum(e){ 
				this.buyNum++
				this.tipsBoxIndex = -1
			},
			tapLessNum(e){ 
				if( this.buyNum >= 2 ){
					this.buyNum--
					this.tipsBoxIndex = -1
				}
			},
			computePrice(){
				return
			},
			sure(){ 
				if( this.buyNum == "" ){
					uni.showToast({icon:"none",title:"请输入数量"})
					return;
				}else{
					uni.navigateTo({
						url:"../../user/sureOrder/sureOrder?num=" + this.buyNum + "&id=" + this.goodsId + "&goods_attr=" + this.ruleIdBox
					})
				}
			},
			tapThisTips(e,index){
				this.buyNum = e.num
				this.tipsBoxIndex = index
			},
			async saveScan(){
				var result = await permision.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE","相册")
				console.log(result)
				var strStatus
				let plat = uni.getSystemInfoSync().platform.toLowerCase()
				console.log(plat)
				if(plat == 'android'){
					if (result == 1) {
						strStatus = "已获得授权"
						uni.showLoading({
							title:'保存中...'
						})
						uni.downloadFile({
							url:this.scan_src,
							success(res){
								console.log(res)
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function (s) {
										console.log(s)
										uni.showToast({icon:"none",title:"保存成功"})
									}
								});
								uni.hideLoading()
							},
							fail(err){
								uni.hideLoading()
							}
						})
						
					} else if (result == 0) {
						strStatus = "未获得授权"
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					} else {
						strStatus = "被永久拒绝权限"
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					}
				}else{
					let status = permision.judgeIosPermission("photoLibrary")
					if(status == true){
						uni.getImageInfo({
							src:this.scan_src,
							success(res){
								console.log(res)
								uni.saveImageToPhotosAlbum({
									filePath: res.path,
									success: function () {
										uni.showToast({icon:"none",title:"保存成功"})
									}
								});
							}
						})
					}else{
						uni.showToast({icon:"none",title:"请获取权限"})
						permision.gotoAppPermissionSetting()
					}
				}
				
			},
			getScan(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/share_pic', param).then(res => {
					this.scan_src = res.data.data.code_url
				},error=>{})
			}
			
		}
	}
</script>
<style lang="scss" scoped>
.content .lastFooter{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
.content .titles{
	::v-deep {
	  img {
	    width: 100%;
	  }
	}
}
</style>