<template>
	<view class="address-wraps">
		<view class="header-wrap">
			<view class="index-header">
				收货地址
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
				<text class="addNew" @click="toAddAddress">添加新地址</text>
			</view>
		</view>
		<view class="blank"></view>
		<!-- 地址为空 -->
		<view class="address-empty" v-if="isEmpty">
			<view class="address-img">
				<image :src='imag+"empty-address.png"'></image>
			</view>
			<view class="address-text">
				暂未设置
			</view>
			<view class="address-intr">
				没有收货地址寄不了快递哦~
			</view>
			<view class="address-btn" @tap="toAddAddress">
				新增地址
			</view>
		</view>
		
		<!-- 有地址 -->
		<view class="address-full" v-if="!isEmpty">
			<view class="address-item scale-1px-bottom" v-for="item in addressList" :key="item.id">
				
				<view class="address-person" @click="toPayPage(item.id)">
					<view class="person-name">
						{{item.username}}
						<text class="person-phone margingLeft20">{{item.phone}}</text>
					</view>
					<view class="person-location">
						<text class="default-sign" v-if="item.default == 1">默认</text>
						{{item.address}} {{item.detail_address}}
					</view>
				</view>
				<view class="address-edit" @click="toEdit(item.id)">
					编辑
				</view>
			</view>
			
			<!-- <view class="address-item scale-1px-bottom">
				<view class="address-person">
					<view class="person-name">
						羊羊羊
						<text class="person-phone margingLeft20">134xxxx8376</text>
					</view>
					<view class="person-location">
						上海上海市徐汇区徐家汇街道斜土路 2611号嘉汇广场T3栋18G
					</view>
				</view>
				<view class="address-edit">
					编辑
				</view>
			</view> -->
			
		</view>
		
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	export default {
		data() {
			return {
				imag: app.globalData.imag,
				isEmpty:true,
				addressList:[],
				orderdata:{},
				changeType:0,
				member:'',
				tequan:'',
				group_buy_records_id:0,    //团长id
			}
		},
		onLoad(option) {
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
			this.getAddress()
		},
		onShow() {
			this.getAddress()
		},
		// onNavigationBarButtonTap() {
		// 	this.toAddAddress();
		// },
		methods:{
			toAddAddress(){
				uni.navigateTo({
					url:'/pages/index/address/addAddress?member=' + this.member + '&tequan=' + this.tequan + '&changeType=' + this.changeType + '&recordid='+this.group_buy_records_id
				})
			},
			toEdit(id){
				uni.navigateTo({
					url:'/pages/index/address/editAddress?id=' + id+'&member=' + this.member + '&tequan=' + this.tequan + '&changeType=' + this.changeType + '&recordid='+this.group_buy_records_id
				})
			},
			toPayPage(id){
				if(this.changeType == 0){
					return
				}else if(this.changeType == 1){		//普通下单
					
					console.log(uni.getStorageSync('orderdata'))
					// let orderdata = this.$util.getStorage('orderdata')
					// let key = 'address_id'
					// let val = id
					// orderdata[key] = val
					let orderdata2 = uni.getStorageSync('orderdata')
					let obj2 = {'address_id':id}
					let orderdata ={
						...orderdata2,
						...obj2
					}
					console.log(orderdata)
					uni.setStorageSync('orderdata',orderdata)
					uni.navigateTo({
						url:'/pages/index/pay/pay?addressid=' + id +'&member=' + this.member + '&tequan=' + this.tequan
					})
				}else if(this.changeType == 2){			//团购下单
					console.log(uni.getStorageSync('groupOrderdata'))
					
					let orderdata2 = uni.getStorageSync('groupOrderdata')
					let obj2 = {'address_id':id}
					let orderdata ={
						...orderdata2,
						...obj2
					}
					console.log(orderdata)
					uni.setStorageSync('groupOrderdata',orderdata)
					uni.navigateTo({
						url:'/pages/index/pay/groupPay?addressid=' + id + '&recordid='+this.group_buy_records_id
					})
				}else if(this.changeType == 3){			//秒杀下单
					console.log(uni.getStorageSync('secOrderdata'))
					
					let orderdata2 = uni.getStorageSync('secOrderdata')
					let obj2 = {'address_id':id}
					let orderdata ={
						...orderdata2,
						...obj2
					}
					console.log(orderdata)
					uni.setStorageSync('secOrderdata',orderdata)
					uni.navigateTo({
						url:'/pages/index/pay/seckillPay?addressid=' + id
					})
				}else if(this.changeType == 4){			//预订下单
					console.log(uni.getStorage('presaleOrderdata'))
					
					let orderdata2 = uni.getStorageSync('presaleOrderdata')
					let obj2 = {'address_id':id}
					let orderdata ={
						...orderdata2,
						...obj2
					}
					console.log(orderdata)
					uni.setStorageSync('presaleOrderdata',orderdata)
					uni.navigateTo({
						url:'/pages/index/pay/advancePay?addressid=' + id
					})
				}else if(this.changeType == 5){			//礼包商品下单
					console.log(uni.getStorageSync('giftOrderdata'))
					
					let orderdata2 = uni.getStorageSync('giftOrderdata')
					let obj2 = {'address_id':id}
					let orderdata ={
						...orderdata2,
						...obj2
					}
					console.log(orderdata)
					uni.setStorageSync('giftOrderdata',orderdata)
					uni.navigateTo({
						url:'/pages/index/pay/giftPay?addressid=' + id
					})
				}
				
			},
			getAddress(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1,
					pagesize:10
				}
				http('/api/User/address_list','post',data).then(res=>{
					if(res.data.status == '200'){
						if(res.data.data.length == 0){
							this.isEmpty = true
						}else if(res.data.data.length > 0){
							this.addressList = res.data.data
							this.isEmpty = false
						}
					}
					console.log(res)
				})
			},
			toMine(){
				
				if(this.changeType == 1){
					uni.redirectTo({
						url:'/pages/index/pay/pay?member=' + this.member + '&tequan=' + this.tequan
					})
				}else if(this.changeType == 2){
					uni.redirectTo({
						url:'/pages/index/pay/groupPay?recordid='+this.group_buy_records_id
					})
				}else if(this.changeType == 3){
					uni.redirectTo({
						url:'/pages/index/pay/seckillPay'
					})
				}else if(this.changeType == 4){
					uni.redirectTo({
						url:'/pages/index/pay/advancePay' 
					})
				}else if(this.changeType == 5){
					uni.redirectTo({
						url:'/pages/index/pay/giftPay'
					})
				}else{
					uni.switchTab({
						url:'/pages/mine/mine'
					})
				}
				
			},
			
		}
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #fff;
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
	.address-wraps{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f2f2f5;
	}
	.address-empty{
		height: 100%;
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		.address-img{
			margin-top: -80upx;
			image{
				width: 243upx;
				height: 233upx;
			}
		}
		.address-text{
			font-size: 32upx;
			font-weight: bold;
			margin-top: 60upx;
		}
		.address-intr{
			color: #aaaaaa;
			margin-bottom: 30upx;
			margin-top: 30upx;
		}
		.address-btn{
			width:240upx;
			height:66upx;
			background:rgba(69,180,67,1);
			box-shadow:0px 10upx 20upx 0px rgba(69, 67, 180, 0.35);
			border-radius:33upx;
			line-height: 66upx;
			color: #fff;
			text-align: center;
			font-weight: bold;
			letter-spacing: 5upx;
		}
	}
	
	
	.address-full{
		margin-top: 26upx;
		background-color: #fff;
		padding: 0 30upx;
		box-sizing: border-box;
		.address-item{
			height: 210upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.address-person{
				width: 100%;
				height: 210upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.person-name{
					font-size: 32upx;
					.person-phone{
						color: #aaa;
					}
				}
				.person-location{
					
					margin-top: 20upx;
					font-size: 24upx;
				}
			}
			.address-edit{
				width: 100upx;
				height: 50upx;
				font-size: 24upx;
				color: #aaa;
				border-left: 1px solid #eeeeee;
				text-align: right;
				line-height: 50upx;
			}
		}
	}
	
	.default-sign{
		color: #FF0000;
		font-size: 24upx;
		/* #ifdef APP-PLUS */
		font-size: 20upx;
		/* #endif */
		background-color: #fff0f0;
		margin-right: 10upx;
	}
</style>

