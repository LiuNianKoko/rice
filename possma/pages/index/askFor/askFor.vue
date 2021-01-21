<template>
	<view class="content">
		<image class="bg" src="/static/image/index/bg_3.png" mode=""></image>
		
		<view class="rows" v-for="(item,index) in list" :key="index">
			<view class="iconBox"><image class="icon" src="/static/image/index/icon_20.png" mode=""></image></view>
			<view class="right">
				<view class="name fontSize15 overflow_one">{{item.name}}</view>
				<view class="price">¥ {{item.price}}</view>
			</view>
			<view class="clearBoth"></view>
		</view>
		
		<view class="footer">
			<view class="btn" @tap="AjaxJump">立即体验</view>
			<view class="left" @tap="JumpOther">我的挪车码</view>
		</view>
		
		
	</view>
</template>
<style>
	.content{}
	.content .bg{width:100%;height:426upx}
	.content .rows{width:90%;padding:2.5%;margin-left: 2.5%;margin-top: 20upx;}
	.content .rows .iconBox{width:10%;height:80upx;float: left;background: rgb(169,214,234);display: flex;justify-content: center;border-top-left-radius: 10upx;border-bottom-left-radius: 10upx;}
	.content .rows .iconBox .icon{width:50upx;height:50upx;margin-top: 15upx;}
	.content .rows .right{width:90%;height:80upx;line-height:80upx;;float: left;background: rgb(227,245,255);border-top-right-radius: 10upx;border-bottom-right-radius: 10upx;}
	.content .rows .right .name{width:50%;color:#333333;margin-left: 30upx;float: left;}
	.content .rows .right .price{color:red;margin-left: 50upx;float: right;padding-right: 40upx;}
	.content .footer{width:100%;height:100upx;background: white;position: fixed;left:0;bottom: 0;z-index: 2;border-top: 1px solid rgba(0,0,0,0.2);}
	.content .footer .left{width:30%;height:98upx;line-height:98upx;border:2upx solid #BBBBBB;border-top: none;text-align: center;float: right;background:white;color:#BBBBBB;}
	.content .footer .btn{width:30%;height:100upx;line-height:100upx;text-align: center;float: right;background: rgb(2,159,230);color:white;}
</style>
<script>
	export default {
		data() {
			return {
				list:[],
				_$token:"",
				
				
			}
		},
		onLoad(){
			this.getStorage();
			this.AjaxLoad()
		},
		methods: {
			getStorage(){
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					}else{
						uni.showToast({icon:"none",title:"请先登录"})
						setTimeout(function(){
							uni.navigateTo({url:"../../login/login"})
						},1500)
					}
				} catch (e) {}
			},
			AjaxLoad(){
				var that = this;
				var goodsList = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('Index/index', param).then(res => {
					res.data.data.goods.forEach( (item,index) =>{
						if(item.id !== 151)
							goodsList.push({
								id:item.id,
								name:item.goods_name,
								price:item.shop_price,
							})
					})
					for (var i = 0; i < goodsList.length; i++){
						that.list.push(goodsList[i])
					}
				},error=>{})
			},
			AjaxJump(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/experience_code', param).then(res => {
					if( res.data.code !== 200 ){
						uni.showToast({title:res.data.mess,icon:'none'})
					}else if( res.data.code == 200 ){
						uni.navigateTo({url:"../bindCard/bindCard?id=" + res.data.data.goods_order_id})
					}
				},error=>{})
			},
			JumpOther(){
				uni.navigateTo({
					url:"../mine/mine"
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