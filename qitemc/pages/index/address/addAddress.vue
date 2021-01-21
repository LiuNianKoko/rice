<template>
	<view class="shouhzid">
		<view class="header-wrap">
			<view class="index-header">
				添加收货地址
				<!-- <image class="back-icon" src="/static/back-black.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-black.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="ad-item friad">
			<view class="item-content disflex border_bottom">
				<view class="bti">
					收货人：
				</view>
				<view class="flex-1 ipt-fwben">
					<input type="text" v-model="shouhren" placeholder="请填写收货人姓名"></input>
				</view>
			</view>
			<view class="item-content disflex border_bottom">
				<view class="bti">
					联系电话：
				</view>
				<view class="flex-1 ipt-fwben">
					<input type="number" v-model="phone" placeholder="请输入手机号码"></input>
				</view>
			</view>
		<!-- 	<view class="item-content disflex border_bottom">
				<view class="bti">
					企业名称：
				</view>
				<view class="flex-1 ipt-fwben">
					<input type="text" v-model="companyname" placeholder="请输入企业名称"></input>
				</view>
			</view> -->
		</view>
		<view class="ad-item">
			<view class="item-content disflex border_bottom" @click="chooseCity">
				<view class="bti">
					省市地区：
				</view>
				<view class="flex-1 ipt-fwben">
					<input type="text" disabled="disabled" v-model="cityPickerValuea" placeholder="点击选择"></input>
					
				</view>
				<image class="more uni-transformY" src="/static/img/more.png" ></image>
			</view>
			<view class="item-content disflex border_bottom">
				<view class="bti left">
					详细地址：
				</view>
				<view class="flex-1 ipt-fwben right">
					<input type="text"  v-model="xiangxidizhi" placeholder="请输入详细地址(5-120个字)"></input>
				</view>
			</view>
		</view>
		<view class="row default-row box-sizing">
			<text class="tit left">设置默认地址</text>
			<switch class="swichbtn right margingRight20" color="#25928B" @change="switchChange" />
		</view>
		<view class="sureadd" @click="addmant">
			确定添加
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<QSPopup ref="QSPopup">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					<view class="del-text1">
						添加成功
					</view>
					<view class="del-text2">
						返回地址管理
					</view>
				</view>
				<view class="del-btn">
					<!-- <view class="del-btn-no" @tap="hides('QSPopup')">
						取消
					</view> -->
					<view class="del-btn-yes" @tap="addAddress">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import mpvueCityPicker from '@/components/m-citypicker/mpvueCityPicker.vue'
	import provinceDatas from '@/components/m-citypicker/city-data/province.js';
	import cityData from '@/components/m-citypicker/city-data/city.js';
	import areaData from '@/components/m-citypicker/city-data/area.js';
	export default{
		components:{
			mpvueCityPicker,QSPopup
		},
		data() {
			return {
				isshowdistpicker:false,
				cityPickerValuea:'',
				isDefault:false,
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				shouhren:'',
				phone:'',
				// companyname:'',
				xiangxidizhi:'',
				fault:2,   //1 默认   2 非默认
				cityssq:[],
				accode:'',
				province:'',
				city:'',
				area:'',
				member:'',
				tequan:'',
				changeType:0,
				group_buy_records_id:0,    //团长id
			};
		},
		onLoad(option){
			this.changeType = option.changeType
			if(option.member){
				this.member = option.member
			}
			if(option.tequan){
				this.tequan = option.tequan
			}
			if(option.recordid){
				this.group_buy_records_id = option.recordid
			}
		},
		// onNavigationBarButtonTap(val) {
		// 	this.addmant();
		// },
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			hidedistpickerbox(){
				this.isshowdistpicker  = false;
			},
			getcity(cityobj){
				this.cityPickerValuea = cityobj.province.value+'/'+ cityobj.city.value+'/'+ cityobj.area.value;
				// this.cityPickerValuea = cityobj.province.value + cityobj.city.value + cityobj.area.value;
				
			},
			toMine(){
				uni.redirectTo({
					url:'/pages/index/address/address?member=' + this.member + '&tequan=' + this.tequan + '&changeType=' + this.changeType + '&recordid='+this.group_buy_records_id
				})
			},
			addmant(){
				let that = this;
				console.log('122121');
				try{
					if(!that.shouhren){
						throw '请填写收货地址人!';
					}
					if(!that.phone){
						throw '请填写电话号码!';
					}else{
						var reg =  /^1[3|4|5|7|8|9][0-9]{9}$/;
						if(!reg.test(that.phone)){
							throw '请填写正确的手机号码！';
						}
					}
					// if(!that.companyname){
					// 	throw '请填写企业名称!';
					// }
					if(!that.cityPickerValuea){
						throw '请选择省市区!';
					}
					if(!that.xiangxidizhi){
						throw '请填写详细收货地址!';
					}
					
				}catch(e){
					//TODO handle the exception
					this.$util.showToast(e);
					return false;
				}
				// let token = that.$util.getStorage('token');
				// let uid = this.$util.getStorage('uid');
				console.log(that.province)
				this.$util.showLoading('请稍后...');
				let data = {
					token:uni.getStorageSync('token'),
					type:1,
					username:that.shouhren,
					phone:that.phone,
					address:that.cityPickerValuea,
					detail_address:that.xiangxidizhi,
					default:that.fault,
					province:that.province,
					city:that.city,
					area:that.area
				}
				http('/api/User/act_address','post',data).then(res=>{
					if(res.data.status == '200'){
						that.$util.hideLoading()
						that.shouhren = '';
						that.phone = '';
						that.cityPickerValuea = '';
						that.fault= 1;
						that.xiangxidizhi ='';
						that.show('QSPopup')
						// uni.showModal({
						// 	title:'提示',
						// 	content:'添加成功,是否返回地址管理?',
						// 	success(e) {
						// 		console.log(e);
						// 		if(e.confirm){
						// 			uni.navigateTo({
						// 				url:'/pages/index/address/address?member=' + that.member + '&tequan=' + that.tequan + '&changeType=' + that.changeType + '&recordid='+this.group_buy_records_id
						// 			})
						// 		}else{
						// 			that.shouhren = "";
						// 			that.phone= "";
						// 			that.xiangxidizhi= "";
						// 			that.fault= 0;
						// 			that.cityssq=[];
						// 			that.accode = '';
						// 		}
						// 	}
						// })
					}else{
						that.$util.showToast(res.data.msg);
					}
					console.log(res)
				})
				
			},
			addAddress(){
				uni.navigateTo({
					url:'/pages/index/address/address?member=' + this.member + '&tequan=' + this.tequan + '&changeType=' + this.changeType + '&recordid='+this.group_buy_records_id
				})
			},
			switchChange(e){
				console.log(e);
				this.fault  = e.detail.value?'1':'2';
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				// #ifdef APP-PLUS  
					plus.key.hideSoftKeybord();  
				// #endif
				this.$refs.mpvueCityPicker.show()
				// this.isshowdistpicker = true;
			},
			onConfirm(e) {
				let s = [];
				this.region = e;
				console.log(e.label);
				s = e.value;
				this.accode = provinceDatas[s[0]].value+'/'+cityData[s[0]][s[1]].value+'/'+areaData[s[0]][s[1]][s[2]].value;
				this.cityPickerValuea = e.label;
				this.cityssq = this.cityPickerValuea.split('/');
				console.log(this.cityssq)
				this.province = this.cityssq[0]
				this.city = this.cityssq[1]
				this.area = this.cityssq[2]
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F6F6;
	}
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		// background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
		background-color: #fff;
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
				
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
			.addNew{
				position: absolute;
				right: 32upx;
				top: 110upx;
				
			}
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	.sureadd{
		width:90%;
		height:100upx;
		line-height: 100upx;
		text-align: center;
		color: #FFFFFF;
		margin:0 auto;
		font-size: 34upx;
		margin-top: 50upx;
		background:#00a0e9;
		border-radius:10px;
	}
	.distpicker-address-wrapper .address-container{
		position: relative;
		top:80upx;
	}
	.distpickerbox{
		position: fixed;
		left:0;
		width:100%;
		height: 100%;
		overflow: auto;
		bottom:0;
		z-index: 7;
		.modal{
			position: fixed;
			left:0;
			width:100%;
			height: 100%;
			overflow: auto;
			bottom:0;
			background-color: rgba(0,0,0,.4);
			z-index:1;
		}
		.box{
			position: fixed;
			z-index:3;
			left:0;
			width:100%;
			height: 500upx;
			overflow: auto;
			bottom:0;
			background-color:#fff;
			.address-header{
				position: fixed!important;
				width: 100%!important;
				z-index: 5;
				border-bottom:1px solid #F6F6F6
			}
		}
		
	}
	.surebtn{
		width: 80%;
		height: 88upx;
		line-height: 88upx;
		text-align:center;
		border-radius: 60upx;
		background-color: rgb(34, 100, 199);
		color: #fff;
		margin: 0 auto;
		display: block;
		margin-top: 60upx;
	}
	.default-row{
		padding: 0 30upx;
		width: 100%;
		height: 104upx;
		line-height: 104upx;
		background-color: #fff;
		.tit{
			color: #404040;
			font-size: 28upx;
		}
		.uni-switch-wrapper{
			-webkit-transform: scale(0.7);
			transform: scale(0.7)
		}
	}
	
	.shouhzid{
		padding-top: 1px;
		.friad{
			margin-top: 20upx;
		}
		.ad-item{
			padding-left: 32upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.item-content{
				height: 104upx;
				line-height: 104upx;
				position: relative;
				
				.bti{
					color: #404040;
					font-size: 28upx;
					width: 143upx;
				}
				.more{
					position: absolute;
					width: 36upx;
					height: 36upx;
					right: 20upx;
					top: 50%;
				}
				.ipt-fwben{
					flex: 1;
					input{
						margin-top: 32upx;
						font-size: 28upx;
					}
				}
			}
		}
	}
	.content-del{
		height: 360upx;
		width: 670upx;
		background-color: white;
		border-radius: 10upx;
		.del-text{
			padding:60upx 20upx;
			height: 259upx;
			box-sizing: border-box;
			.del-text1{
				font-size: 40upx;
				font-weight: bold;
				text-align: center;
			}
			.del-text2{
				font-size: 32upx;
				text-align: center;
				margin-top: 40upx;
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			.del-btn-no{
				border-right: 1px solid #e5e5e5;
				color: #aaa;
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
