<template>
	<view class="content" :style="{'height':screenHeight}">
		<!-- <uni-icons 0class="icons" type="arrowright" color="rgb(197,197,197)" size="12"/> -->
		<view class="splite"></view>
		<input class="input fontSize14" type="text" placeholder="收货人"     :value="data.name" @input="getName">
		<input class="input fontSize14" type="number" placeholder="手机号码" :value="data.tel" maxlength="11" @input="getTel">
		<view class="input" @tap="tapThree">
			<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
			<!-- <image class="icon" src="../../../../static/image/user/agent/icon_5.png" mode="widthFix"></image> -->
			<view class="name fontSize14" v-if="showThree==false">{{nameAddr}}</view>
			<view class="name fontSize14" v-if="showThree">{{province}}，{{city}}，{{area}}</view>
			<uni-icons class="icons" type="arrowright" color="#ABABAB" size="12"/>
			<view class="clearBoth"></view>
			</picker>
		</view>
		<textarea class="input" placeholder="详细地址" :value="data.addr" @input="getAddr"/>
		<view class="row">
			<view class="name fontSize15">设为默认地址</view>
			<switch :checked="data.isCheck" @change="switchChange" color="rgb(78,155,244)" />
		</view>
		<view class="del" v-if="editId" @tap="delBtn">删除</view>
		
		
		
	</view>
</template>
<style>
	.content{width:100%;background: rgb(244,244,244);}
	.content .splite{width:100%;height:20upx;background: rgb(244,244,244);}
	.content .input{width:90%;padding:4% 2.5%;border-radius: 10upx;background: white;margin:20upx 0;margin-left: 2.5%;}
	.content .uni-input-placeholder{font-size: 14px;color:rgba(0,0,0,0.5)}
	.content .uni-textarea-placeholder{font-size: 14px;color:rgba(0,0,0,0.5)}
	.content .row{width:90%;padding:4% 0%;margin-left: 5%;}
	.content .row .name{float: left;color: #303030;}
	.content .row switch{float: right;transform:scale(0.7);}
	.content .input .name{float: left;color:rgba(0,0,0,0.5)}
	.content .input .icons{float: right;}
	.content .del{width:90%;padding:2.5%;color:red;text-align: center;border:1px solid red;border-radius:200upx;position: absolute;bottom:5%;left: 2.5%;}
</style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import citys from '@/common/city.js'
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				screenHeight:"",
				nameAddr:"所在区域",
				editId:"",
				isThis:false,
				data:{
					"name":"",
					"tel":"",
					"addr":"",
					"isCheck":null
				},
				multiArray: [
					[],
					[],
					[]
				],
				showThree:false,
				multiIndex: [0, 0, 0],
				province:"北京市",
				city:"市辖区",
				area:"东城区",
				_$token:""
			}
		},
		onLoad(e){
			var that = this;
			const res = uni.getSystemInfoSync();
			this.editId = e.id
			this.getStorage();
			this.screenHeight = res.windowHeight*2 + 'upx'
			if( this.editId ){
				uni.setNavigationBarTitle({title: '修改收货地址'});
				setTimeout(function(){
					that.AjaxLoad(1);
				},100)
			}
			this.Three();
		},
		onNavigationBarButtonTap(){
			// console.log( this.data );
			// console.log( this.isThis );
			var is_default = ""
			if( this.editId ){
				if( this.isThis == false ){
					is_default = 2
				}else{
					is_default = 1
				}
				if( this.data.name == "" ){
					uni.showToast({icon:"none",title:"请输入收货人"})
					return;
				}else if( this.data.tel == "" ){
					uni.showToast({icon:"none",title:"请输入手机号码"})
					return;
				}else if( this.data.tel.length  !== 11 ){
					uni.showToast({icon:"none",title:"请输入正确的手机号"})
					return;
				}else if( this.data.addr == "" ){
					uni.showToast({icon:"none",title:"请输入详细地址"})
					return;
				}else if( this.showThree == false ){
					uni.showToast({icon:"none",title:"请选择地址"})
					return;
				}else{
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"address_id":this.editId,
						"type":3,
						"username":this.data.name,
						"phone":this.data.tel,
						"address":this.data.addr,
						"province":this.province,
						"city":this.city,
						"area":this.area,
						"is_default":is_default,
					};
					this._$InitRequest.request('user/address_operation', param).then(res => {
						uni.showToast({icon:"none",title:res.data.mess})
						setTimeout(function(){
							// uni.navigateTo({url:"../myAddr"})
							uni.navigateBack({
								delta:1
							})
						},1500)
					},error=>{})
				}
			}else{
				if( this.isThis == false ){
					is_default = 2
				}else{
					is_default = 1
				}
				if( this.data.name == "" ){
					uni.showToast({icon:"none",title:"请输入收货人"})
					return;
				}else if( this.data.tel == "" ){
					uni.showToast({icon:"none",title:"请输入手机号码"})
					return;
				}else if( this.data.tel.length  !== 11 ){
					uni.showToast({icon:"none",title:"请输入正确的手机号"})
					return;
				}else if( this.data.addr == "" ){
					uni.showToast({icon:"none",title:"请输入详细地址"})
					return;
				}else if( this.showThree == false ){
					uni.showToast({icon:"none",title:"请选择地址"})
					return;
				}else{
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"address_id":"",
						"type":"2",
						"username":this.data.name,
						"phone":this.data.tel,
						"address":this.data.addr,
						"province":this.province,
						"city":this.city,
						"area":this.area,
						"is_default":is_default,
					};
					this._$InitRequest.request('user/address_operation', param).then(res => {
						uni.showToast({icon:"none",title:res.data.mess})
						setTimeout(function(){
							// uni.navigateTo({url:"../myAddr"})
							uni.navigateBack({
								delta:1
							})
						},1500)
					},error=>{})
				}
			}
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			Three(){
				for (var i = 0; i < citys.addr.data.length; i++){
					this.multiArray[0].push(citys.addr.data[i].value)
				}
				this.multiArray[1].push(citys.addr.data[0].children[0].value)
				for (var i = 0; i < citys.addr.data[0].children[0].children.length; i++) {
					this.multiArray[2].push(citys.addr.data[0].children[0].children[i].value)
				}
			},
			switchChange: function(e){
				this.isThis = e.detail.value
			},
			tapThree(){this.showThree = true},
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				this.multiArray[1] = []
				this.multiArray[2] = []
				for (var i = 0; i < citys.addr.data.length; i++){
					if( i == this.multiIndex[0] ){
						for(var a = 0;a < citys.addr.data[this.multiIndex[0]].children.length;a++){
							this.multiArray[1].push(citys.addr.data[this.multiIndex[0]].children[a].value)
							for(var b = 0; b < citys.addr.data[this.multiIndex[0]].children[this.multiIndex[1]].children.length; b ++ ){
								this.multiArray[2].push(citys.addr.data[this.multiIndex[0]].children[this.multiIndex[1]].children[b].value)
							}
						}
					}
				}
				this.province = this.multiArray[0][ this.multiIndex[0] ]
				this.city = this.multiArray[1][ this.multiIndex[1] ]
				this.area = this.multiArray[2][ this.multiIndex[2] ]
			},
			getName(e){this.data.name = e.target.value},
			getTel(e){this.data.tel = e.target.value},
			getAddr(e){this.data.addr = e.target.value},
			AjaxLoad(e){
				var that = this;
				var lists = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"address_id":this.editId,
					"type":e
				};
				this._$InitRequest.request('user/address_operation', param).then(res => {
					this.showThree = true
					this.data.name = res.data.data.username;
					this.data.tel = res.data.data.phone;
					this.data.addr = res.data.data.address;
					this.province = res.data.data.province;
					this.city = res.data.data.city;
					this.area = res.data.data.area;
					if( res.data.data.is_default == 1 ){
						this.data.isCheck = true
					}else{
						this.data.isCheck = false
					}
				},error=>{})
			},
			delBtn(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"address_id":this.editId,
					"type":4
				};
				this._$InitRequest.request('user/address_operation', param).then(res => {
					uni.showToast({icon:"none",title:res.data.mess})
					setTimeout(function(){
						// uni.navigateTo({url:"../myAddr"})
						uni.navigateBack({
							delta:1
						})
					},1500)
				},error=>{})
			},
			
			
			
		}
	}
</script>