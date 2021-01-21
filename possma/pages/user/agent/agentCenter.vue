<template>
	<view class="content" :style="{'height':screenHeight}">
		<view class="splite"></view>
		<view class="top">
			<view class="icon">￥</view>
			<view class="tip">总收益：￥{{money}}</view>
			<view class="tips">还需推广：{{peopelNum}}人回本</view>
			<view class="clearBoth"></view>
		</view>
		
		<view class="rowsBox">
			<view class="rowsData">
				<view class="boxData" v-for="(item,index) in rowsDate" :key="index">
					<image class="headImage" :src="item.src" mode=""></image>
					<view class="right">
						<view class="name overflow_one">{{item.name}}</view>
						<view class="nums">总返利：￥ {{item.money}}</view>
					</view>
					<view class="clearBoth"></view>
				</view>
				<view class="clearBoth"></view>
			</view>
			<view class="clearBoth"></view>
		</view>
		<view class="clearBoth"></view>
		
		
		
		
		
	</view>
</template>
<style>
	.content{width:100%;background: rgb(244,244,244);padding-bottom: 120upx;}
	.content .top{width:90%; padding:2.5%;margin-left: 2.5%;margin-bottom: 20upx;background: url(../../../static/image/user/agent/bg_1.png);background-repeat: no-repeat;background-size: 100% 100%;}
	.content .top .icon{color:rgb(71,169,214);background: white;position: relative;top:6upx;margin-right:20upx;border-radius: 100upx;float: left;font-size: 12px;padding:0upx 5upx;}
	.content .top .tip{color:white;font-size: 15px;float: left;}
	.content .top .tips{color:white;font-size: 15px;float: right;}
	.content .rowsData{width:100%;background: rgb(244,244,244);margin-top: 20upx;}
	.content .rowsData .boxData{width:90%;padding:4% 2.5%;margin:0upx 2.5%;;margin-top: 10upx;background: white;border-radius: 10upx;}
	.content .rowsData .boxData .headImage{width:15%;height:100upx;border-radius: 120upx;float: left;margin-right: 5%;}
	.content .rowsData .boxData .right{width:80%;float: left;}
	.content .rowsData .boxData .right .name{font-size: 12px;margin:8upx 0;color:#8E8E8E;width:100%}
	.content .rowsData .boxData .right .nums{color:#1A1A1A;margin-top: 20upx;font-size: 12px;}
	.content .splite{width:100%;height:20upx;background:rgb(244,244,244);}
</style>
<script>
	export default {
		data() {
			return {
				screenHeight:"",
				money:1,
				peopelNum:1,
				rowsDate:[
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':1},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':2},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':3},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':3},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':1},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':2},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':3},
					// {'src':'../../../static/demo.jpg','name':'这是名字这是名字这是名字这是名字这是名字这是名字这是名字这是名字','money':3},
				],
				pages:1,
				_$token:""
			}
		},
		onLoad(){
			var that = this;
			const res = uni.getSystemInfoSync();
			this.screenHeight = res.windowHeight*2 + 'upx'
			this.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		onReachBottom(){
			var that = this;
			this.pages++;
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var lists = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"page":this.pages
				};
				this._$InitRequest.request('User/agent_center', param).then(res => {
					this.money = res.data.data.total_price
					this.peopelNum = res.data.data.need_num
					res.data.data.user_data.forEach((item,index)=>{
						lists.push({
							id:item.user_id,
							src:item.headimgurl,
							name:item.nickname,
							money:item.total_price
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.rowsDate.push(lists[i])
					}
				},error=>{})
			},
			
			
			
		}
	}
</script>