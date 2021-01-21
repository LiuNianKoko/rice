<template>
	<view class="content">
		<view class="btnGo" @tap="goMyProceeds">
			<view class="btnGos">提现</view>
		</view>
		
		<view class="rowsBox">
			<view class="rows">
				<view class="rowsDisplay">
					<view class="price">¥ {{data.total_price}}</view>
					<view class="tops">上升中↑</view>
				</view>
				<view class="clearBoth"></view>
				<view class="name">平台累计红利</view>
			</view>
			<view class="rows">
				<view class="rowsDisplay">
					<view class="price">¥ {{data.join_price}}</view>
					<view class="tops">上升中↑</view>
				</view>
				<view class="clearBoth"></view>
				<view class="name">加入后累计红利</view>
			</view>
		</view>
		<view class="clearBoth"></view>
		
		<view class="rowsBox" style="margin-top:30upx;">
			<view class="rows">
				<image class="icons" src="../../../static/image/user/dividends/icon_1.png" mode=""></image>
				<view class="names">累计分红：</view>
				<view class="prices">¥ {{data.cumulative}}</view>
			</view>
			<view class="rows">
				<image class="icons" src="../../../static/image/user/dividends/icon_2.png" mode=""></image>
				<view class="names">分红人数：</view>
				<view class="prices">¥ {{data.people_count}}</view>
			</view>
		</view>
		<view class="clearBoth"></view>
		
		<view class="row">
			<image class="icons" src="../../../static/image/user/dividends/icon_3.png" mode=""></image>
			<view class="names">昨日分红：</view>
			<view class="prices">¥ {{data.yesterday_price}}</view>
			<view class="clearBoth"></view>
		</view>
		
		<view class="last">
			<view class="last_title">达成条件：</view>
			<view class="last_rows">1：团队直推20人+团队总人数60人</view>
			<view class="last_rows">2：购买一个888元的礼包申请享受分红</view>
			<image class="btnImage" src="../../../static/image/user/dividends/icon_4.png" mode="" @tap="btnGos"></image>
		</view>
		
	</view>
</template>
<style>
	.content{width:100%;height:100vh;background-image:url(../../../static/image/user/dividends/bg_1.png);background-size: 100% 115%;background-repeat: no-repeat;}
	.content .btnGo{width: 100%;display: flex;justify-content: center;margin-top: 230upx;}
	.content .btnGo .btnGos{width:120upx;border:1px solid white;color:white;border-radius: 10upx;font-size: 36upx;text-align: center;}
	.content .rowsBox{width: 90%;margin-left: 5%;margin-top: 100upx;margin-bottom: 0upx;}
	.content .rowsBox .rows{width:40%;margin:0 2.5%;padding:2.5%;background: white;border-radius: 10upx;float: left;}
	.content .rowsBox .rows .rowsDisplay{display: flex;justify-content: center;}
	.content .rowsBox .rows .price{color:#E43E40;font-size: 36upx;text-align: center;font-weight: bold;}
	.content .rowsBox .rows .tops{color:white;background: #E43E40;position: relative;left:10upx;border-radius: 100upx;padding:0upx 15upx;font-size: 12px;text-align: center;margin:10upx 0;}
	.content .rowsBox .rows .name{color:#9A9A9A;font-size:14px;text-align: center;margin-top: 20upx;}
	.content .rowsBox .rows .icons{width:50upx;height:50upx;float: left;margin-right:10upx}
	.content .rowsBox .rows .names{float: left;font-size: 12px;margin-top:10upx}
	.content .rowsBox .rows .prices{float: left;font-size: 12px;color:#E43E40;margin-top:10upx}
	.content .row{width:85%;padding:20upx 0;margin-left: 7.5%;background: white;border-radius: 10upx;margin-top:20upx;}
	.content .row .icons{width:50upx;height:50upx;float: left;margin-left: 2.5%;margin-right:10upx}
	.content .row .names{float: left;font-size: 12px;margin-top:10upx}
	.content .row .prices{float: right;font-size: 12px;color:#E43E40;margin-top:10upx;margin-right: 2.5%;}
	.content .last{width:75%;margin-left: 7.5%;padding:4% 5%;margin-top: 20upx;background: white;border-radius: 10upx;}
	.content .last .last_title{font-size: 30upx;color:#343434;margin-bottom: 20upx;font-weight: bold;}
	.content .last .last_rows{font-size: 26upx;color:#666666;margin:20upx 0;}
	.content .last .btnImage{width:80%;height:80upx;margin-left: 10%;margin-top: 40upx;}
	
</style>
<script>
	export default {
		data() {
			return {
				data:{
					"total_price":"",
					"join_price":"",
					"cumulative":"",
					"people_count":"",
					"yesterday_price":"",
				}
			}
		},
		onLoad(){
			this.getStorage()
			this.AjaxLoad()
		},
		methods: {
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request("User/jackpot", param).then(res => {
					this.data.total_price = res.data.data.total_price
					this.data.join_price = res.data.data.join_price
					this.data.cumulative = res.data.data.cumulative
					this.data.people_count = res.data.data.people_count
					this.data.yesterday_price = res.data.data.yesterday_price
					// console.log( res.data.data , "index" );
				},error=>{})
			},
			goMyProceeds(){
				uni.navigateTo({url:"./details/details"})
			},
			btnGos(){
				uni.navigateTo({
					url:"../../index/details/details?id=151"
				})
			},
			
			
			
			
			
			
		}
	}
</script>
<style lang="scss" scoped>
/deep/ .uni-input-input {font-size:32upx}
/deep/ .uni-radio-input-checked{background-color:rgb(110,43,34) !important;border:2upx solid white !important}
.content .html{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>