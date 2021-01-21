<template>
	<view class="content">
		
		<view class="rows">
			<picker @change="bindPickerChange" :value="FirstIndex" :range="array" range-key="name">
			<image class="icon" src="../../../../static/image/index/icon_17.png" mode="widthFix"></image>
				<view class="name">{{array[FirstIndex].name}}</view>
			<uni-icons class="icons" type="arrowright" color="#ABABAB" size="12"/>
			<view class="clearBoth"></view>
			</picker>
		</view>
		
		<view class="rows">
			<picker @change="bindPickerChange1" :value="SecondIndex" :range="array1" range-key="name">
			<image class="icon iconsLeft" src="../../../../static/image/index/icon_14.png" mode="widthFix"></image>
				<view class="name">{{array1[SecondIndex].name}}</view>
			<uni-icons class="icons" type="arrowright" color="#ABABAB" size="12"/>
			<view class="clearBoth"></view>
			</picker>
		</view>
		
		<view class="rows">
			<picker @change="bindPickerChange2" :value="ThirdIndex" :range="array2" range-key="name">
			<image class="icon iconsLeft" src="../../../../static/image/index/icon_15.png" mode="widthFix" style="width:40upx;height:30upx"></image>
				<view class="name">{{array2[ThirdIndex].name}}</view>
			<uni-icons class="icons" type="arrowright" color="#ABABAB" size="12"/>
			<view class="clearBoth"></view>
			</picker>
		</view>
		
		<view class="rows">
			<picker @change="bindPickerChange3" :value="FourThIndex" :range="array3" range-key="name">
			<image class="icon iconsLeft" src="../../../../static/image/index/icon_16.png" mode="widthFix"></image>
				<view class="name">{{array3[FourThIndex].name}}</view>
			<uni-icons class="icons" type="arrowright" color="#ABABAB" size="12"/>
			<view class="clearBoth"></view>
			</picker>
		</view>
		
		<!-- <view>定位的地址：{{del_addr}}</view> -->

		<view class="footer">
			<view class="nameA">您需要支付:￥ {{payMoney}}</view>
			<view class="btnNow" @tap="payNow">立即支付</view>
		</view>
		
		<view class="shaDow" v-if="showShadow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="box" @tap="payWay(0)">
					<image class="image" src="../../../../static/image/user/set/myProceeds/icon_1.png" mode=""></image>
					<view class="names">支付宝</view>
				</view>
				<view class="box" @tap="payWay(1)">
					<image class="image" src="../../../../static/image/user/addr/icon_vx.png" mode=""></image>
					<view class="names">微信</view>
				</view>
				<view class="clearBoth"></view>
				<view class="false" @tap="close">取消</view>
			</view>
		</view>
		
	</view>
</template>
<style>
	.content{overflow-y: hidden;}
	.content .footer{position: absolute;left:0;bottom: 0;width:100%;height:100upx;line-height: 100upx;border-top: 1px solid rgba(0,0,0,0.2);}
	.content .footer .nameA{float: left;font-size: 14px;margin-left:20upx}
	.content .footer .btnNow{float: right;font-size:14px;background: rgb(79,176,244);color:white;border-radius: 200upx;text-align: center;margin-right: 20upx;height:50upx;line-height: 50upx;margin-top: 25upx;padding:5upx 30upx;}
	.content .shaDow{width:100%;height:100%;position: fixed;top:0;left:0}
	.content .shaDow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .shaDow .bg_white{width:60%;padding:5%;position: fixed;top:40%;left:15%;background:white;border-radius: 10upx;}
	.content .shaDow .bg_white .box{width:50%;text-align: center;float: left;}
	.content .shaDow .bg_white .box .image{width:50upx;height: 50upx;}
	.content .shaDow .bg_white .box .names{margin-top:10upx;font-size:15px;}
	.content .shaDow .bg_white .false{letter-spacing: 4upx;border-top:1px solid rgb(229,229,229);padding-top: 20upx;text-align: center;color:#959595;font-size:17px;margin-top: 70upx;}
	.content .rows{width:90%;padding:2.5%;margin:20upx 0;margin-left:2.5%;border-radius: 10upx;border:1px solid rgba(0,0,0,0.1);}
	.content .rows .icon{float: left;width:32upx;height:46upx;line-height: 46upx;margin:0 10upx}
	.content .rows .iconsLeft{width:33upx;height:32upx;position: relative;top:6upx;}
	.content .rows .name{float: left;font-size: 14px;color:#ABABAB;height:46upx;margin-left: 10upx;line-height: 46upx;}
	.content .rows .icons{float: right;position: relative;top:10upx}
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
				payMoney:"",
				arrayProvince:[],
				array:[
					{name:'请选择你要代理的等级',"id":0},
					{name:'镇代理',"id":1},
					{name:'县代理',"id":2},
					{name:'市代理',"id":3},
				],
				array1:[
					{name:'请选择你所属的市',"id":0},
				],
				array2:[
					{name:'请选择你所属的县/区(选填)',"id":0},
				],
				array3:[
					{name:'请选择你所属的镇(选填)',"id":0},
				],
				FirstIndex: 0,
				SecondIndex:0,
				ThirdIndex:0,
				FourThIndex:0,
				_$token:"",
				locationProvince:"",
				showShadow:false,
				// del_addr:""
			}
		},
		onLoad(){
			var that = this;
			this.getStorage();
			setTimeout(function(){
				that.AjaxAddrs();
			},100)
		},
		methods:{
			close(){ this.showShadow = false },
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxAddrs(){
				var that = this;
				var lists = []
				var listProvince = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":1
				};
				this._$InitRequest.request('index/get_city', param).then(res => {
					uni.getLocation({
					    type: 'gcj02',
						geocode:true,
					    success: function (resAddr) {
							that.locationProvince = resAddr.address.province
							// that.del_addr = resAddr
							res.data.data.forEach((item,index) =>{
								listProvince.push({
									id:item.id,
									code:item.province_code,
									name:item.province_name
								})
							})
							for (var i = 0; i < listProvince.length; i++){
								that.arrayProvince.push(listProvince[i])
							}
							that.arrayProvince.forEach((item,index)=>{
								if( item.name == that.locationProvince ){
									that.indexProvince = index
								}
							})
							let params={
								"user_id":that._$token.id,
								"user_token":that._$token.token,
								"type":2,
								"province_code":that.arrayProvince[that.indexProvince].code
							};
							that._$InitRequest.request('index/get_city', params).then(resA => {
								resA.data.data.forEach((item,index) =>{
									lists.push({
										id:item.id,
										code:item.city_code,
										name:item.city_name
									})
								})
								for (var i = 0; i < lists.length; i++){
									that.array1.push(lists[i])
								}
							},error=>{})
						},
					})
				},error=>{})
			},
			AjaxLoad(e){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":e
				};
				this._$InitRequest.request('User/get_rechargePrice', param).then(res => {
					this.payMoney = res.data.data
				},error=>{})
			},
			bindPickerChange: function(e) {
				this.FirstIndex = e.detail.value
				if( this.array[this.FirstIndex].id == 1 ){
					this.AjaxLoad(4)
				}else if( this.array[this.FirstIndex].id == 2 ){
					this.AjaxLoad(3)
				}else if( this.array[this.FirstIndex].id == 3 ){
					this.AjaxLoad(2)
				}else{
					this.payMoney = ""
				}
			},
			bindPickerChange1:function(e){
				var that = this;
				this.SecondIndex = e.detail.value
				var lists = []
				this.array2 = [
					{name:'请选择你所属的县/区(选填)',"id":0},
				]
				this.array3 = [
					{name:'请选择你所属的镇(选填)',"id":0},
				]
				this.ThirdIndex = 0;
				this.FourThIndex = 0;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":3,
					"city_code":this.array1[this.SecondIndex].code
				};
				this._$InitRequest.request('index/get_city', param).then(res => {
					res.data.data.forEach((item,index) =>{
						lists.push({
							id:item.id,
							area_code:item.area_code,
							name:item.area_name
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.array2.push(lists[i])
					}
				},error=>{})
			},
			bindPickerChange2:function(e){
				var that = this;
				this.ThirdIndex = e.detail.value
				var lists = []
				this.array3 = [
					{name:'请选择你所属的镇(选填)',"id":0},
				]
				this.FourThIndex = 0;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":4,
					"area_code":this.array2[this.ThirdIndex].area_code
				};
				this._$InitRequest.request('index/get_city', param).then(res => {
					res.data.data.forEach((item,index) =>{
						lists.push({
							id:item.id,
							code:item.street_code,
							name:item.street_name
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.array3.push(lists[i])
					}
				},error=>{})
			},
			bindPickerChange3:function(e){
				this.FourThIndex = e.detail.value
			},
			payNow(){
				var that = this;
				if( this.array[this.FirstIndex].id == 0 ){
					console.log( 11 );
					uni.showToast({icon:"none",title:"请选择你要代理的等级"})
					return;
				}else if( this.array[this.FirstIndex].id == 3 ){//市
				console.log( 22 );
					if( this.array1[this.SecondIndex].id == 0 ){
						uni.showToast({icon:"none",title:"请选择城市"})
						return;
					}else{
						this.showShadow = true;
					}
				}else if( this.array[this.FirstIndex].id == 2 ){
					console.log( 33 );
					if( this.array2[this.ThirdIndex].id == 0 ){
						uni.showToast({icon:"none",title:"请选择县/区"})
						return;
					}else{
						this.showShadow = true;
					}
				}else if( this.array[this.FirstIndex].id == 1 ){
					if( this.array3[this.FourThIndex].id == 0 ){
						uni.showToast({icon:"none",title:"请选择所属的镇"})
						return;
					}else{
						this.showShadow = true;
					}
				}
			},
			payWay(e){
				if( e == 0 ){
					this.payFunc(2);
				}else{
					this.payFunc(1);
				}
			},
			payFunc(e){
				var that = this;
				var address_id = "";
				if( this.array1[ this.SecondIndex ].id !== 0 ){
					address_id = this.array1[ this.SecondIndex ].id
				}
				if( this.array2[ this.ThirdIndex ].id !== 0 ){
					address_id = this.array2[ this.ThirdIndex ].id
				}
				if( this.array3[ this.FourThIndex ].id !== 0 ){
					address_id = this.array3[ this.FourThIndex ].id
				}
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					
					"agent_type":this.array[this.FirstIndex].id,
					"address_id":address_id,
					
					"price":this.payMoney,
					"pay_type":e,
				};
				this._$InitRequest.request('user/buy_agent', param).then(res => {
					console.log( res );
					if( res.data.code !== 200 ){
						uni.showToast({icon:"none",title:res.data.mess})
						return; 
					}else{
						if( e == 2 ){
							uni.requestPayment({
							    provider: 'alipay',
								orderInfo:res.data.data,
								success: function (res) {
								   uni.showToast({icon:"none",title:"支付成功"})
								   that.showShadow = false
								   setTimeout(function(){
								   	uni.navigateTo({url:"../../user"})
								   },1000)
								},
								fail: function (err) {
									uni.showToast({icon:"none",title:"支付失败"})
								}
							  //   orderInfo: res.data.data,
							  //   success: function (res) {
									// uni.showToast({icon:"none",title:"支付成功"})
									// that.showShadow = false
									// setTimeout(function(){
									// 	uni.navigateTo({url:"../../user"})
									// },1000)
							  //   },
							  //   fail: function (err) {
									// uni.showToast({icon:"none",title:"支付失败"})
							  //   }
							});
						}else if( e == 1 ){
							uni.requestPayment({
							    provider: 'wxpay',
								orderInfo:{
									"appid": res.data.data.appid,
									"noncestr": res.data.data.nonce_str,
									"package": res.data.data.package,
									"partnerid": res.data.data.partnerid,
									"prepayid": res.data.data.prepay_id,
									"timestamp": res.data.data.time,
									"sign": res.data.data.sign,
								},
								success: (e) => {
									uni.showToast({icon:"none",title:"支付成功"})
									that.showShadow = false
									setTimeout(function(){
										uni.navigateTo({url:"../../user"})
									},1000)
								},
								fail: (e) => {
									uni.showToast({icon:"none",title:"支付失败"})
								},
							  //   orderInfo:  res.data.data,
							  //   success: function (res) {
									// uni.showToast({icon:"none",title:"支付成功"})
									// that.showShadow = false
									// setTimeout(function(){
									// 	uni.navigateTo({url:"../../user"})
									// },1000)
							  //   },
							  //   fail: function (err) {
									// uni.showToast({icon:"none",title:"支付失败"})
							  //   }
							});
						}
					}
				},error=>{})
			},
			
			
			
			
		}
	}
</script>