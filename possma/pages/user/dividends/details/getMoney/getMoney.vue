<template>
	<view class="content">
		<view class="title">可提现金额</view>
		<input class="inputBox" type="number" :value="data.inputValue" @input="getInput">
		<view class="name">当前可提现金额</view>
		<view class="num">{{data.money}}</view>
		<view class="all" @tap="all">全部提现</view>
		<view class="clearBoth"></view>
		<view class="tips">提现说明:一天只能提现一次</view>
		
		<view class="next" @tap="next">立即提现</view>
		
		<view class="shaDow" v-if="showShadow">
			<view class="close"></view>
			<view class="bg_white">
				<view class="box" @tap="getOut(0)">
					<image class="image" src="../../../../../static/image/user/set/myProceeds/icon_1.png" mode=""></image>
					<view class="names">支付宝</view>
				</view>
				<view class="box" @tap="getOut(1)">
					<image class="image" src="../../../../../static/image/user/set/myProceeds/icon_2.png" mode=""></image>
					<view class="names">银行卡</view>
				</view>
				<view class="clearBoth"></view>
				<view class="false" @tap="close">取消</view>
			</view>
		</view>
		
		
	</view>
</template>
<style>	
	.content{overflow-y: hidden;}
	.content .title{margin-left: 5%;margin-top:80upx;font-size:18px;font-weight: bold;}
	.content .inputBox{width:90%;margin-left: 5%;margin-top: 40upx;font-size: 20px;border-bottom: 1px solid rgb(246,246,246)}
	.content .name{margin-top: 40upx;font-size: 15px;float: left;margin-left: 5%;}
	.content .num{margin-top: 40upx;font-size: 15px;float: left;margin-left:2%;color:rgb(79,176,244)}
	.content .all{margin-top: 40upx;font-size: 16px;float: right;margin-right:5%;color:rgb(223,40,47);margin-left: 5%;}
	.content .tips{margin-top: 20upx;font-size: 14px;float: left;margin-left: 5%;}
	
	
	.content .next{width:80%;margin-left: 5%;padding:3% 5%;margin-top:200upx;background: rgb(79,176,244);color:white;text-align: center;border-radius: 100upx;}
	.content .shaDow{width:100%;height:100%;position: fixed;top:0;left:0}
	.content .shaDow .close{width:100%;height:100%;position: fixed;top:0;left:0;background: rgba(0,0,0,0.4);}
	.content .shaDow .bg_white{width:60%;padding:5%;position: fixed;top:40%;left:15%;background:white;border-radius: 10upx;}
	.content .shaDow .bg_white .box{width:50%;text-align: center;float: left;}
	.content .shaDow .bg_white .box .image{width:50upx;height: 50upx;}
	.content .shaDow .bg_white .box .names{margin-top:10upx;font-size:15px;}
	.content .shaDow .bg_white .false{letter-spacing: 4upx;border-top:1px solid rgb(229,229,229);padding-top: 20upx;text-align: center;color:#959595;font-size:17px;margin-top: 70upx;}
</style>
<script>
	export default {
		data() {
			return {
				data:{
					inputValue:"",
					money:0,
				},
				showShadow:false,
				_$token:""
			}
		},
		onLoad(){
			this.getStorage();
			this.getStorages();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:"../detail/detail"
			})
		},
		methods: {
			getStorages(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			getStorage(){
				var that = this;
				uni.getStorage({
					key: 'fromUser',
					success: function (res){
						that.data.money = res.data.jackpot_price;
				}}
			)},
			getInput(e){this.data.inputValue = e.target.value},
			close(){this.showShadow = false},
			all(){
				this.data.inputValue = "";
				this.data.inputValue = this.data.money
			},
			next(){
				if( this.data.inputValue == "" ){
					uni.showToast({icon:"none",title:"请输入金额"})
					return;
				}else if( Number(this.data.inputValue) > Number(this.data.money) ){
					uni.showToast({icon:"none",title:"输入金额有误"})
					return;
				}else{
					this.showShadow = true
				}
			},
			getOut(index){
				if( index == 0 ){
					uni.navigateTo({url:"/pages/user/myProceeds/Alipay/Alipay?money=" + this.data.inputValue + "&type=2" })
				}else if( index == 1 ){
					uni.navigateTo({url:"/pages/user/myProceeds/bankCard/bankCard?money=" + this.data.inputValue + "&type=2" })
				}
			},
		}
	}
</script>