<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" borderBottom="#DBDBDB" :isBack="true"><block slot="backText"></block><block slot="content">我的地址</block></cu-custom>
		<view class="edit-wrap">
			<view class="edit-item bor">
				<view class="edit-left">
					收货人
				</view>
				<view class="edit-right">
					<input type="text" class="inputs" v-model="name" placeholder="请输入收货人姓名"/>
				</view>
			</view>
			<view class="edit-item bor">
				<view class="edit-left">
					联系电话
				</view>
				<view class="edit-right">
					<input type="number" class="inputs" v-model="phone" placeholder="请输入收货人手机号"/>
				</view>
			</view>
			<view class="edit-item bor">
				<view class="edit-left">
					所在地区
				</view>
				<view class="edit-right edit-right-area">
					<input type="text" class="inputs" disabled v-model="city" placeholder="省份  城市  县区  乡镇" @click="showPop"/>
					<image :src="imgUrl + 'lg-local.png'" class="lg-local" @click="chooseLocal"></image>
				</view>
				
			</view>
			<view class="edit-item">
				<view class="edit-left">
					详细地址
				</view>
				<view class="edit-right">
					<input type="text" class="inputs" v-model="addr" placeholder="街道，楼牌号等"/>
				</view>
			</view>
		</view>
		<view class="de-wrap disBetween">
			<view class="de-txt">
				设为默认地址
			</view>
			<view class="de-switch">
				<switch :checked="addrDefault" @change="switchChange" color="#ffaaa6" style="transform:scale(0.7)"/>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn" @click="hold">
				保存
			</view>
		</view>
		
		<view class="hid" v-if="popup" @click="showPop()">
			
		</view>
		<ehPicker @conceal="conceal" v-if="popup" />
	</view>
</template>

<script>
	const app = getApp()
	import http from '@/api/http.js';
	import ehPicker from '@/components/erha-picker/erha-picker.vue'; 
	export default {
		components:{
		    ehPicker
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				name:'',//收货人
				phone:'',//电话
				city:'',//城市
				addr:'',//详细地址
				addrDefault:false,//是否为默认地址
				save:1,//1能点保存  2不能点
				addrDe:1,//是否为默认地址 1默认；2非默认
				id:0,
				type:1,//1为新增 2为修改 3为删除 4为设置默认地址
				popup:false,
				province:'',//单独省份
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
				this.type = 2
				this.getAddr()
			}
		},
		methods: {
			showPop(){
				this.popup = !this.popup
			},
			conceal(param) {
				// 获取到传过来的 省 市 区 县数据
				console.log(param);
				// 选择完毕后隐藏
				this.popup = false;
				this.city = param.province + param.city + param.area + param.street
			},
			switchChange(e){
				console.log(e.target.value)
				this.addrDefault = e.target.value
				if(this.addrDefault){
					this.addrDe = 1
				}else{
					this.addrDe = 2
				}
			},
			getAddr(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					address_id:this.id
				}
				http('/api/users/address_detail','post',data).then(res=>{
					if(res.code == 200){
						let addr = res.data
						this.name = addr.contact_name
						this.phone = addr.contact_phone
						this.city = addr.province_city_district
						this.addr = addr.address
						this.addrDe = addr.is_default
						if(this.addrDe == 1){
							this.addrDefault = true
						}else{
							this.addrDefault = false
						}
					}
					console.log(res)
				})
			},
			// 保存
			hold(){
				if(this.save == 2)return
				if(this.name == ''){
					this.$util.showToast('收货人不可为空')
					return
				}
				if(this.phone == ''){
					this.$util.showToast('联系电话不可为空')
					return
				}else{
					let reg = new RegExp(/^1[3456789]\d{9}$/)
					if(reg.test(this.phone)==false){
						uni.showToast({
							title:'请填写正确手机号',
							icon:'none'
						})
						return
					}
				}
				if(this.city == ''){
					this.$util.showToast('所在地区不可为空')
					return
				}
				if(this.addr == ''){
					this.$util.showToast('请填写街道信息')
					return
				}
				let c = this.city
				console.log(c)
				let pro
				if(c.indexOf('省') != -1){
					pro = c.indexOf('省')
					this.province = c.substring(0,pro + 1)
				}else if (c.indexOf('自治区')!= -1) {
					pro = c.indexOf('自治区')
					this.province = c.substring(0,pro + 3)
				}else if (c.indexOf('香港') == 0) {
					this.province = '香港'
				}else if (c.indexOf('澳门') == 0) {
					this.province = '澳门'
				}else if (c.indexOf('台湾') == 0) {
					this.province = '台湾'
				}else if (c.indexOf('市')!= -1) {
					pro = c.indexOf('市')
					this.province = c.substring(0,pro + 1)
				}else {
					this.province = ''
				}
				console.log(pro)
				console.log(this.province)
				// return
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:this.type,
					contact_name:this.name,
					contact_phone:this.phone,
					province_city_district:this.city,
					address:this.addr,
					is_default:this.addrDe,
					province:this.province
				}
				if(this.type == 2){
					data = {
						...data,
						address_id:this.id
					}
				}
				this.save = 2
				http('/api/users/operation_address','post',data).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title:res.mess || res.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none'
						})
						this.save = 1
					}
					console.log(res)
				})
				
			},
			chooseLocal(){
				let that = this
				wx.chooseLocation({
					success: function (res) {
						// success
						console.log(res,"location")
						console.log(res.name)
						console.log(res.latitude)
						console.log(res.longitude)
						that.city = res.address
					},
					fail: function (rej) {
						console.log(rej)
						// fail
					},
					complete: function () {
						// complete
					}
				})
			},
			
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.bor{
		border-bottom: 1px solid #F1F1F1;
	}
	.edit-wrap{
		background-color: #fff;
		padding: 0 38upx;
		margin-bottom: 22upx;
		.edit-item{
			padding: 38upx 0;
			display: flex;
			align-items: center;
			
			.edit-left{
				width: 180upx;
				color: #434343;
				font-size: 27upx;
				font-weight: bold;
			}
			.edit-right{
				width: 90%;
				position: relative;
				.inputs{
					font-size: 26upx;
				}
			}
			.edit-right-area{
				padding-right: 50upx;
				.lg-local{
					width: 40upx;
					height: 52upx;
					position: absolute;
					right: 0;
					top: -4upx;
					z-index: 10;
				}
			}
		}
	}
	.de-wrap{
		padding: 24upx 20upx 24upx 40upx;
		background-color: #fff;
		.de-txt{
			color: #303030;
			font-size: 27upx;
			font-weight: bold;
		}
		.de-switch{
			
		}
	}
	
	.blank{
		height: 170upx;
	}
	.btn-wrap{
		padding: 30upx 30upx 50upx;
		background-color: #f4f4f4;
		width: 100%;
		z-index: 100;
		position: fixed;
		bottom: 0;
		left: 0;
		.btn{
			height: 90upx;
			font-size: 24upx;
			font-weight: bold;
			color: #EB798D;
			border: 1px solid #EB798D;
			border-radius: 10upx;
			text-align: center;
			line-height: 90upx;
		}
	}
	.hid{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
</style>
