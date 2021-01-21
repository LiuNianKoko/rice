<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
			<view class="statusBox"></view>
		<!-- #endif -->
		<view class="wuliu box-sizing">
			<image class="leftArrow" @click="backPage()" src="/static/image/user/icon_1.png" mode=""></image>
			<image class="shopimg" :src="shopinfo.goods_pic"></image>
			{{shopinfo.good_name}}
		</view>
		<view class="wuliu-list box-sizing">
			<view class="" v-if="logistList.length>0">
				<view class="item" v-for="(data,index) in logistList" :key="index">
					<view class="time">
						{{data.ftime}}
					</view>
					<view class="wuliu-cont">
						<image class="loginbz" v-if="index==0" src="/static/image/user/icon_2.png" mode=""></image>
						<image class="loginbz" v-else src="/static/image/user/icon_3.png" mode=""></image>
						<view class="title">
							{{data.status}}
						</view>
						<view class="cont" >
							{{data.context}}
						</view>
					</view>
				</view>
			</view>
			<view v-else style="text-align: center;">
				暂无数据~
			</view>
		</view>
	</view>
</template>
<style>
	.content{margin-top: 90upx;}
	.statusBox{width:100%;height:90upx;background: white;position: fixed;top:0;left: 0;z-index: 5;}
</style>
<script>
	export default {
		data() {
			return {
				logistList:[],
				shopinfo:{},
				_$token:"",
			}
		},
		onLoad(e){
			this.getOrder(e.id);
		},
		methods: {
			backPage(){
				uni.navigateBack()
			},
			getOrder(id){
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {that._$token = value}
				} catch (e) {}
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"order_id":id,
					"type":2
				};
				this._$InitRequest.request('user/order_operation', param).then(res => {
					this.logistList = res.data.data.wuliu;
					this.shopinfo = res.data.data.goods;
				},error=>{})
			}
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
	page{
		background-color: #f2f2f2;
		padding:30upx;
		box-sizing: border-box;
	}
	.wuliu{
		width: 100%;
		margin: 0 auto;
		height: 90upx;
		font-size: 32upx;
		display: flex;
		border-radius: 10px;
		align-items: center;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 9px 1px rgba(0,0,0,.1);
		.shopimg{
			width: 70upx;
			height: 70upx;
			margin: 0 30upx;
		}
		.leftArrow{
			width: 60upx;
			height: 60upx;
			margin-left: 10upx;
		}
	}
	.wuliu-list{
		border-radius: 10px;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 9px 1px rgba(0,0,0,.1);
		padding:30upx;
		margin-top: 40upx;
		.item{
			display: flex;
		}
		.time{
			font-size: 26upx;
			width: 148upx;
		}
		.cont{
			font-size: 26upx;
		}
		.wuliu-cont{
			padding-left: 40upx;
			border-left: 1px dashed #cccccc;
			flex:1;
			padding-bottom: 36upx;
			margin-left: 28upx;
			width: 100%;
			position: relative;
			.loginbz{
				width:56upx;
				height: 56upx;
				position: absolute;
				left:-30upx;
				top: -2upx;
			}
			.title{
				color: #333333;
				font-size: 32upx;
				margin-bottom: 14upx;
			}
		}
	}
</style>
