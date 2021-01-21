<template>
	<view class="content">
		<view class="none" v-if="data==''">暂无收益</view>
		<view class="rows" v-for="(item,index) in data" :key="index">
			<image class="image" src="@/static/image/user/set/myProceeds/icon_3.png" mode=""></image>
			<view class="names">获得分红 +{{item.price}}</view>
			<view class="time">{{item.createtime}}</view>
			<view class="clearBoth"></view>
		</view>
	</view>
</template>
<style>
	.content{}
	.content .none{text-align: center;width:100%;margin-top:40upx;}
	.content .rows{width:95%;padding:2.5%;border-bottom: 1px solid rgb(244,244,244);}
	.content .rows .image{width:50upx;height: 62upx;float: left;margin:10upx}
	.content .rows .names{font-size: 14px;float: left;height: 62upx;line-height: 62upx;margin:10upx 0;margin-left:20upx;}
	.content .rows .time{font-size: 14px;color:#BABABA;float: right;height: 62upx;line-height: 62upx;margin:10upx 0;margin-right: 20upx;}
</style>
<script>
	export default {
		data() {
			return {
				data:[],
				pages:1,
				_$token:""
			}
		},
		onLoad(){
			var that = this;
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
		methods:{
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var list = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"page":this.pages
				};
				this._$InitRequest.request("User/jackpot_putforword", param).then(res => {
					res.data.data.data_list.forEach( (item,index) =>{
						list.push({
							createtime:item.createtime,
							price:item.price,
						})
					})
					for (var i = 0; i < list.length; i++){
						that.data.push(list[i])
					}
				},error=>{})
			},
			
		}
	}
</script>