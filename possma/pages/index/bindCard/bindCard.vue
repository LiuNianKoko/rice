<template>
	<view class="content" :style="{'height':screenHeight}">
		<!-- #ifdef APP-PLUS -->
			<view class="statusBox"></view>
		<!-- #endif -->
		<view class="topBox">
			<uni-icons class="icon" type="arrowleft" color="white" size="12" @tap="backBtn"/>
			<view class="title">绑定车牌信息</view>
			<view class="littleTtile fontSize13">请填写下方信息完成车牌绑定</view>
		</view>
		
		<view class="bg_white">
			<view class="inputBox">
				<input class="input" type="text" placeholder="请输入您的姓名" maxlength="6" @input="getName">
			</view>
			<view class="inputBox">
				<input class="input" type="number" placeholder="请输入绑定手机号" maxlength="11" @input="getTel">
			</view>
			<view class="inputBox">
				<input class="input" type="number" placeholder="请输入验证码" maxlength="6" @input="getCode">
				<view class="getCode fontSize14" @tap="btnGetCode">{{codeName}}</view>
			</view>
		</view>
		
		<view class="bg_white marignTop40">
			<view class="rows" style="border-bottom:1px solid rgba(0,0,0,0.2)">
				<view class="left fontSize15">汽车品牌</view>
				<picker @change="bindPickerChange1" :value="index1" :range="array1" range-key="name">
					<view class="iconBox fontSize13">{{array1[index1].name}}<uni-icons class="icon" type="arrowdown" color="rgb(78,155,244)" size="12"/></view>
				</picker>
				<view class="clearBoth"></view>
			</view>
			<view class="rows">
				<view class="left fontSize15">车牌号码</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="iconBox fontSize13">{{array[index].name}}<uni-icons class="icon" type="arrowdown" color="rgb(78,155,244)" size="12"/></view>
				</picker>
				<view class="num fontSize12"><input class="cardInput" type="text" placeholder="请填写车牌号" maxlength="10" @input="getCardName"></view>
				<view class="clearBoth"></view>
			</view>
		</view>
		
		<view class="sure fontSize15" @tap="btnSure">{{sureName}}</view>
		
		<view class="shadown" v-if="showShadow">
			<view class="close" @tap="closeShadow"></view>
			<view class="bg_whites">
				<view class="shadown_title">绑定成功</view>
				<view class="shadown_article">您的手机号，车牌以绑定成功</view>
				<image src="../../../static/image/index/icon_10.png" mode="" style="width:200upx;height:200upx"></image>
				<view class="shadown_sure" @tap="btnBack">{{btnName}}</view>
			</view>
		</view>
		

	</view>		
</template>
<style>
	.statusBox{width:100%;height:90upx;background: white;position: fixed;top:0;left: 0;z-index: 2;}
	.content{width:100%;background: rgb(244,244,244);height:100%;}
	.content .uni-input-placeholder{font-size: 15px;color:#A5A5A5;}
	.content .topBox{width:950%;padding-bottom:80upx;background: rgb(78,155,244);padding-top:20upx;padding-left: 5%;}
	.content .topBox .icon{}
	.content .topBox .title{color:white;font-size: 26px;margin-top: 40upx;margin-bottom: 20upx;}
	.content .topBox .littleTtile{color:white;}
	.content .bg_white{width:90%;padding:2.5%;margin-left: 2.5%;background: white;border-radius: 10upx;position: relative;top:-50upx}
	.content .inputBox{width:95%;position: relative;padding:2.5%;margin-top: 20upx;}
	.content .inputBox .input{width:100%;border-bottom: 1px solid rgb(240,240,240);padding-bottom: 10upx;}
	.content .getCode{position: absolute;top:-10%;right:5%;color:rgb(78,178,244);border: 1px solid rgb(78,178,244);text-align: center;border-radius: 10upx;padding:10upx;}
	.content .marignTop40{margin-top: 40upx;}
	.content .rows{width: 90%;padding:4% 5%;}
	.content .rows .left{color:#959595;float: left;padding:10upx}
	.content .rows .iconBox{float: left;margin-left: 40upx;border:1px solid rgb(78,155,244);color:rgb(78,155,244);padding:10upx;border-radius: 10upx;background: rgb(244,250,255);}
	.content .rows .iconBox .icon{margin-left: 20upx;}
	.content .rows .num{color:#313131;padding:10upx;float: left;margin-left: 20upx;float: left;width:35%}
	.content .rows .num .cardInput{float: right;font-size: 14px;}
	.content .rows .num .uni-input-placeholder{font-size: 14px;}
	.content .sure{width:80%;margin-left:5%;padding:3% 5%;margin-top:40upx;background: rgb(79,154,244);text-align: center;color:white;text-align: center;border-radius: 100upx;}
	.content .shadown .close{width:100%;height:100%;background: rgba(0,0,0,0.4);position: fixed;top:0;left:0;}
	.content .shadown .bg_whites{width:60%;text-align: center;padding:5%;background: white;border-radius: 10upx;position: fixed;top:25%;left:15%;}
	.content .shadown .bg_whites .shadown_title{font-size: 17px;font-weight: bold;}
	.content .shadown .bg_whites .shadown_article{font-size: 14px;margin:40upx 0;color:rgb(161,161,161)}
	.content .shadown .bg_whites .shadown_sure{width:80%;font-size: 15px;margin:40upx 0 0 10%;background: rgb(79,154,244);color:white;border-radius: 100upx;padding:10upx 0;}
	.content .shadown{width:100%;height:100%;position: fixed;top:0;left:0;}
	/* #ifdef APP-PLUS */
		.content{width:100%;background: rgb(244,244,244);height:100%;margin-top: 90upx;}
	/* #endif */
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				screenHeight:"",
				codeName:"获取验证码",
				timing:false,
				name:"",
				tel:"",
				code:"",
				showShadow:false,
				sureName:"确定绑定",
				array:[
					{name:'请选择',"id":0},
				],
				index: 0,
				array1:[
					{name:'请选择',"id":0},
				],
				index1: 0,
				CardName:"",
				goods_order_id:"",
				_$token:"",
				btnName:"",
				loadImage:"",
			}
		},
		onLoad(e){
			var that = this;
			const res = uni.getSystemInfoSync();
			this.goods_order_id = e.id
			this.screenHeight = res.windowHeight*2 + 'upx'
			this.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var list = []
				var lists = []
				let param={
					"user_id":that._$token.id,
					"user_token":that._$token.token,
					"type":1
				};
				that._$InitRequest.request('Index/get_car_msg', param).then(res => {
					res.data.data.forEach((item,index) =>{
						list.push({
							id:item.id,
							name:item.name
						})
					})
					for (var i = 0; i < list.length; i++){
						that.array1.push(list[i])
					}
				},error=>{})
				
				let params={
					"user_id":that._$token.id,
					"user_token":that._$token.token,
					"type":2
				};
				that._$InitRequest.request('Index/get_car_msg', params).then(res => {
					res.data.data.forEach((item,index) =>{
						lists.push({
							id:item.id,
							name:item.name
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.array.push(lists[i])
					}
				},error=>{})
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
			bindPickerChange1: function(e) {
				this.index1 = e.detail.value
			},
			backBtn(){
				uni.navigateBack({
					delta:1
				})
			},
			getName(e){ this.name = e.target.value },
			getTel(e){ this.tel = e.target.value },
			getCode(e){ this.code = e.target.value },
			getCardName(e){ this.CardName = e.target.value },
			btnBack(){
				var that = this;
				if( that.btnName == "下载体验码" ){
					var result = permision.requestAndroidPermission()
					var strStatus
					if (result == 1) {
						uni.saveImageToPhotosAlbum({
							filePath: that.loadImage,
							success: (res) => {
								uni.showToast({title:"已保存到相册",icon:'none'})
								setTimeout(function(){
									uni.navigateTo({url:"../index"})
								},1500)
							}
						})
					} else if (result == 0) {
						strStatus = "未获得授权"
						uni.showToast({icon:"none",title:"请获取权限"})
						setTimeout(function(){
							permision.gotoAppPermissionSetting()
						},1000)
					} else {
						strStatus = "被永久拒绝权限"
						uni.showToast({icon:"none",title:"请获取权限"})
						setTimeout(function(){
							permision.gotoAppPermissionSetting()
						},1000)
					}
					
				}else if( that.btnName == "确认" ){
					uni.navigateTo({url:"../index"})
				}
			},
			closeShadow(){this.showShadow = false},
			btnSure(){
				var that = this;
				if( this.name == "" ){
					uni.showToast({title:'请输入姓名',icon:'none'})
					return;
				}else if( this.tel == "" ){
					uni.showToast({title:'请输入手机号',icon:'none'})
					return;
				}else if( this.tel.length !== 11 ){
					uni.showToast({title:'请输入正确手机号',icon:'none'})
					return;
				}else if( this.code == "" ){
					uni.showToast({title:'请输入验证码',icon:'none'})
					return;
				}else if( this.CardName == "" ){
					uni.showToast({title:'请输入车牌号',icon:'none'})
					return;
				}else if( this.array[this.index].id == 0 ){
					uni.showToast({title:'请选择车牌',icon:'none'})
					return;
				}else if( this.array1[this.index1].id == 0 ){
					uni.showToast({title:'请选择汽车品牌',icon:'none'})
					return;
				}else{
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"goods_order_id":this.goods_order_id,
						"username":this.name,
						"phone":this.tel,
						"code":this.code,
						"brand":this.array1[this.index1].name,
						"license_plate":this.array[this.index].name + this.CardName,
					};
					this._$InitRequest.request('index/sub_code', param).then(res =>{
						console.log( res );
						
						if( res.data.code !== 200 ){
							uni.showToast({title:res.data.mess,icon:'none'})
							return;
						}else{
							if( res.data.data.is_down == 1 ){
								that.loadImage = res.data.data.code_url
								that.btnName = "下载体验码"
							}else if( res.data.data.is_down == 0 ){
								that.btnName = "确认"
							}
							this.showShadow = true
						}
					},error=>{})
				}
			},
			btnGetCode(){
				var that = this;
				var time = 60;
				if( this.tel.length !== 11 ){
					uni.showToast({icon:"none",title:"请输入正确的手机号"})
					return;
				}else{
					if( that.timing == false ){
						let param={
							"send_type":1,
							"phone":that.tel,
						};
						this._$InitRequest.request('login/sendSms', param).then(res => {
							if( res.data.code !== 200 ){
								uni.showToast({icon:"none",title:res.data.mess})
								return;
							}else{
								// console.log( res );
								uni.showToast({icon:"none",title:res.data.mess})
								var timeer = setInterval(function(){
									that.codeName = time + "s"
									that.timing = true
									time--;
									if( time == -1 ){
										clearInterval(timeer)
										that.codeName = "获取验证码"
										that.timing = false
									}
								},1000)
							}
						},error=>{})
					}else{
						uni.showToast({icon:"none",title:"请勿重复获取"})
					}
				}
			},
			
			
			
			
		}
	}
</script>