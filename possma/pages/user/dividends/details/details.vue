<template>
	<!-- <view class="content" :style="{'height':screenHeight}"> -->
	<view class="content">
		<view class="contents" :style="{'height':screenHeight}">
			<view class="btnGo" @tap="goMyProceeds">
				<view class="btnGos">立即提现</view>
			</view>
			<view class="rowsBox">
				<view class="rows">
					<view class="price">¥ {{data.total_price}}</view>
					<view class="clearBoth"></view>
					<view class="name">总分红</view>
				</view>
				<view class="rows">
					<view class="price">¥ {{data.already_price}}</view>
					<view class="clearBoth"></view>
					<view class="name">已提现</view>
				</view>
			</view>
			<view class="clearBoth"></view>
			
			<view class="row" v-for="(item,index) in items" :key="index">
				<view class="names">{{item.createtime}}</view>
				<view class="prices">¥ {{item.price}}</view>
				<view class="namesA">获得分红</view>
				<view class="clearBoth"></view>
			</view>
			<view class="clearBoth"></view>
		</view>
		
		
	</view>
</template>
<style>
	/* .content{width:100%;background-image:url(../../../../static/image/user/dividends/bg_2.png);background-size: 100% 100%;background-repeat: no-repeat;} */
	/* .contents{width:100%;background-image:url(../../../../static/image/user/dividends/bg_2.png);background-size: 100% 100%;background-repeat: no-repeat;} */
	.content{width:100%;height:auto;overflow-y: scroll;}
	.contents{width:100%;height:auto;background-image:url(../../../../static/image/user/dividends/bg_2.png);background-size: 100% 100%;background-repeat: no-repeat;overflow-y: scroll;}
	.content .btnGo{width: 100%;display: flex;justify-content: center;padding-top: 50upx;}
	.content .btnGo .btnGos{width:180upx;border:1px solid white;color:white;border-radius: 10upx;font-size: 32upx;text-align: center;}
	.content .rowsBox{width: 90%;margin-left: 5%;margin-top: 100upx;margin-bottom: 0upx;}
	.content .rowsBox .rows{width:40%;margin:0 2.5%;padding:5% 2.5%;background: white;border-radius: 10upx;float: left;}
	.content .rowsBox .rows .price{color:#E43E40;font-size: 36upx;text-align: center;font-weight: bold;}
	.content .rowsBox .rows .tops{color:#E43E40;font-size: 12px;text-align: center;margin:10upx 0;}
	.content .rowsBox .rows .name{color:#9A9A9A;font-size:14px;text-align: center;margin-top: 20upx;}
	.content .rowsBox .rows .icons{width:50upx;height:50upx;float: left;margin-right:10upx}
	.content .rowsBox .rows .names{float: left;font-size: 12px;margin-top:10upx}
	.content .rowsBox .rows .prices{float: left;font-size: 12px;color:#E43E40;margin-top:10upx}
	.content .row{width:85%;padding:20upx 0;margin-left: 7.5%;background: white;border-radius: 10upx;margin-top:20upx;margin-bottom:20upx;}
	.content .row .icons{width:50upx;height:50upx;line-height: 50upx;float: left;margin-left: 2.5%;margin-right:10upx}
	.content .row .names{float: left;font-size: 14px;margin-left: 5%;}
	.content .row .prices{float: right;font-size: 14px;color:#E43E40;margin-right: 5%;}
	.content .row .namesA{float: right;font-size: 14px;margin-right: 3%;}
	
	.content .last{width:75%;margin-left: 7.5%;padding:4% 5%;margin-top: 20upx;background: white;border-radius: 10upx;}
	.content .last .last_title{font-size: 30upx;color:#343434;margin-bottom: 20upx;font-weight: bold;}
	.content .last .last_rows{font-size: 26upx;color:#666666;margin:20upx 0;}
	.content .last .btnImage{width:80%;height:80upx;margin-left: 10%;margin-top: 40upx;}
	/* .bg_red{width:100%;height:80%;overflow-y: scroll;background:rgb(236,63,58);padding-bottom: 50upx;} */


</style>
<script>
	export default {
		data() {
			return {
				pages:1,
				screenHeight:"",
				data:{
					"total_price":"",
					"already_price":"",
				},
				items:[]
				
			}
		},
		onLoad(){
			this.getStorage()
			const res = uni.getSystemInfoSync();
			this.screenHeight = res.windowHeight*2 + 'upx'
			this.AjaxLoad()
		},
		onReachBottom() {
			this.pages++
			this.AjaxLoad();
		},
		methods: {
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var list = []
				var that = this;
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"page":this.pages
				};
				this._$InitRequest.request("User/jackpot_putforword", param).then(res => {
					this.data.total_price = res.data.data.total_price
					this.data.already_price = res.data.data.already_price
					res.data.data.data_list.forEach( (item,index) =>{
						list.push({
							createtime:item.createtime,
							price:item.price,
						})
					})
					for (var i = 0; i < list.length; i++){
						that.items.push(list[i])
					}
				},error=>{})
			},
			goMyProceeds(){
				uni.navigateTo({url:"./getMoney/getMoney"})
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