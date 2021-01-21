<template>
	<view class="content">
		<view class="topBox" @tap="next">
			<view class="tip">欢迎加入我们</view>
			<view class="tips">叮叮挪车期待您的加入</view>
		</view>
		<view class="splites"></view>
		<view class="title">
			<view class="titleName">加入我们的好处</view>
			<view class="splite"></view>
		</view>
		
		<view class="html" v-html="html"></view>
		<!-- <view class="rows" v-for="(item,index) in rowsData" :key="index">
			<image class="icon" :src="item.src" mode="widthFix"></image>
			<view class="right">
				<view class="name">{{item.name}}<view class="names">{{item.names}}</view><view class="contents">{{item.contents}}</view></view>
				<view class="clearBoth"></view>
			</view>
		</view>
		<view class="tips">代理的区域，会员用户以后在商城每消费一单获得1元 收益。</view> -->
		
		
		<view class="next" @tap="next">立即加入</view>
	</view>
</template>
<style>
	.content .topBox{width:100%;height:330upx;position: relative;background-image: url(../../../static/image/user/agent/icon_1.png);background-repeat: no-repeat;background-size: 100% 100%;}
	.content .topBox .tip{width:50%;background: rgb(138,179,255);color:white;border-radius: 10upx;text-align: center;padding:10upx 0;position: absolute;top:30%;right:10%}
	.content .topBox .tips{width:50%;color: rgb(138,179,255);border-radius: 10upx;text-align: center;padding:10upx 0;position: absolute;top:50%;right:10%;font-size: 13px;}
	.content .splites{width:100%;height:20upx;background: rgb(244,244,244);}
	.content .title{width:90%;padding:3% 2.5%;margin-left: 2.5%;position: relative;}
	.content .title .titleName{font-weight:bold;}
	.content .title .splite{width:40upx;height:4upx;background: rgb(78,178,244);margin-top:10upx;border-radius: 20upx;}
	.content .rows{width:90%;padding:3% 2.5%;margin-bottom: 80upx;margin-left: 2.5%;}
	.content .rows .icon{width:10%;height:50upx;float: left;}
	.content .rows .right{width:85%;margin-left:5%;float: left;display:flex;}
	.content .rows .right .name{text-align:left;font-size:13px;color:#4CA6D5;display: inline;}
	.content .rows .right .names{text-align:left;font-size:13px;color:#434343;display: inline;}
	.content .rows .right .contents{text-align:left;font-size: 12px !important;color:#7D7D7D;display: inline;}
	.content .tips{width:90%;padding:3% 2.5%;margin-bottom: 80upx;margin-left: 2.5%;font-size: 13px;color:#535353;}
	.content .next{width:90%;padding:3% 2.5%;margin-bottom: 80upx;margin-left: 2.5%;text-align: center;color: white;background: rgb(78,178,244);border-radius: 100upx;}
	.content .html{width:90%;padding:2.5%;margin-left: 2.5%;}
</style>
<script>
	export default {
		data() {
			return {
				rowsData:[
					{'src':'../../../static/image/user/agent/icon_2.png','name':'镇代理','names':'（每个镇1个名额）：','contents':'259元，代理的镇每生 成一个订单获得0.5元。静态相当于518个回本。'},
					{'src':'../../../static/image/user/agent/icon_3.png','name':'县代理','names':'（每个镇1个名额）：','contents':'259元，代理的镇每生 成一个订单获得0.5元。静态相当于518个回本。'},
					{'src':'../../../static/image/user/agent/icon_4.png','name':'市代理','names':'（每个市3个名额）：','contents':'339元，代理的市每生 成一个订单获得0.7元。静态相当于518个回本。'},
				],
				_$token:"",
				html:"",
				
			}
		},
		onLoad(){
			var that = this;
			this.getStorage();
			setTimeout(function(){
				that.AjaxLoad()
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			next(){uni.navigateTo({url:"./PayAgent/PayAgent"})},
			AjaxLoad(){
				var that = this;
				let params={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":6
				};
				this._$InitRequest.request('User/sys_text', params).then(res =>{
					this.html = res.data.data.content
					// console.log( res.data.data.content );
				},error=>{})
			},
			
			
			
		}
	}
</script>
<style lang="scss" scoped>
.content .html{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>