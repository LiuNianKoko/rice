<template>
	<view class="content">
		<view class="rowsNone textCenter fontSize14" v-if="data==''">暂无收货地址</view>
		
		<view class="rowsData" v-for="(item,index) in data" :key="index" @tap="thisIsIn(item)">
			<view class="name overflow_one fontSize14">{{item.name}}</view>
			<view class="tel fontSize14">{{item.tel}}</view>
			<view class="clearBoth"></view>
			<view class="isThis fontSize12" v-if="item.isThis">默认</view>
			<view class="addr overflow_two fontSize12">{{item.addr}}</view>
			<view class="set fontSize13" @tap.stop="set(item.id)">编辑</view>
			<view class="clearBoth"></view>
		</view>

	</view>
</template>
<style>
	.rowsNone{margin:50upx 0;}
	.content{}
	.content .rowsData{width:90%;padding:2.5%;margin-left: 2.5%;border: 1px solid rgba(0,0,0,0.1);border-radius: 10upx;margin-top: 20upx;}
	.content .rowsData .name{max-width: 30%;float: left;margin-right:20upx;}
	.content .rowsData .tel{float: left;color:#8A8A8A;margin-left: 20upx;}
	.content .rowsData .isThis{float: left;padding:5upx 10upx;margin-top:20upx;margin-right: 20upx;color:#9A0000;border:1px solid rgba(0,0,0,0.2);border-radius: 5upx;}
	.content .rowsData .addr{max-width: 70%;color:#545454;float: left;margin-top:20upx;}
	.content .rowsData .set{float: right;color:#8A8A8A;border-left: 1px solid #D2D2D2;margin-top: 10upx;padding:20upx 0;padding-left: 20upx;}

</style>
<script>
	export default {
		data() {
			return {
				data:[
					// {'id':1,"name":"名字1","tel":133989820104,"isThis":true,"addr":"哪儿哪儿哪哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿哪儿儿哪儿哪儿哪儿"},
				],
				_$token:"",
				back:false,
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({url:"./newAddr/newAddr"})
		},
		onLoad(e){
			if( e.from == "buy" ){
				this.back = true
			}
			var that = this;
			that.getStorage();
			
		},
		onShow() {
			var that = this;
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
				that.data = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/user_address', param).then(res => {
					res.data.data.forEach((item,index) =>{
						var isThis = false
						if( item.is_default == 1 ){isThis = true}else{isThis = false}
						lists.push({
							id:item.id,
							name:item.username,
							isThis:isThis,
							tel:item.phone,
							addr:item.address_date,
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.data.push(lists[i])
					}
				},error=>{})
			},
			set(id){
				uni.navigateTo({url:"./newAddr/newAddr?id=" + id})
			},
			thisIsIn(item){
				if( this.back == true ){
					try {
					    uni.setStorageSync('addrInfo',{"addrInfo":item});
					} catch (e) {}
					
					uni.navigateBack({
					    delta: 1
					});
				}
			},
			
			
		}
	}
</script>