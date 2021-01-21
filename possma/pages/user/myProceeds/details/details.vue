<template>
	<view class="content">
		<view class="none" v-if="data==''">暂无数据~</view>
		<view v-if="type == 1">
			<view class="wrap scale-1px-bottom" v-for="(item,index) in data" :key="index">
				<view class="left-box disAlign">
					<image :src="item.headimgurl" class="headimg" mode=""></image>
					<view class="dis-box">
						<view class="disAlign">
							<view class="nickname">
								{{item.nickname}}
							</view>
							<view class="level" v-if="item.level != 0">
								{{item.levels}}
							</view>
						</view>
						<view class="create_time">
							{{item.create_time}}
						</view>
					</view>
				</view>
				<view class="dis-box dis-box2">
					<view class="prices">
						+{{item.price}}
					</view>
					<view class="create_time">
						<!-- 返利(元) -->
						{{item.source}}(元)
					</view>
				</view>
			</view>
		</view>
		<view v-if="type == 2">
			<view class="rows" v-for="(item,index) in data" :key="index">
				<image class="image" src="/static/image/img/qiandai.png" mode=""></image>
				<view class="names">{{item.atc_price}}</view>
				<view class="names2">{{item.price}}</view>
				<view class="status" v-if="item.status == 1">待审核</view>
				<view class="status" v-if="item.status == 2">已到账</view>
				<view class="status" v-if="item.status == 3">已拒绝</view>
				<view class="names names3">
					手续费{{item.percent || '10'}}%
				</view>
				<view class="time">{{item.createtime}}</view>
				<view class="clearBoth"></view>
			</view>
		</view>
		
	</view>
</template>
<style>
	.content{}
	.content .none{text-align: center;width:100%;margin-top:40upx;}
	.content .rows{width:95%;padding:2.5%;border-bottom: 1px solid rgb(244,244,244);}
	.content .rows .image{width:50upx;height: 62upx;float: left;margin:10upx}
	.content .rows .names{font-size: 16px;float: left;height: 62upx;line-height: 62upx;margin:10upx 0;margin-left:10upx;}
	.content .rows .names2{font-size: 14px;float: left;height: 62upx;line-height: 62upx;margin:10upx 0;margin-left:10upx;text-decoration: line-through;color: #999;}
	.content .rows .names3{font-size: 12px;color: #999;}
	.content .rows .status{font-size: 12px;float: left;height: 40upx;line-height: 40upx;margin:20upx 0;margin-left:20upx;background: #409BE0; color: #fff;padding: 0 14upx;border-radius: 30upx;}
	.content .rows .time{font-size: 14px;color:#BABABA;float: right;height: 62upx;line-height: 62upx;margin:10upx 0;margin-right: 20upx;}
	
	.disAlign{display: flex;align-items: center;}
	.wrap{padding: 40upx 30upx;display: flex;justify-content: space-between;align-items: center;}
	.left-box{}
	.headimg{width: 92upx;height: 92upx;border-radius: 50%;margin-right: 20upx;flex: none;}
	.dis-box{display: flex;flex-direction: column;}
	.dis-box2{align-items: center;}
	.nickname{font-size: 36upx;font-weight: bold;margin-right: 10upx;}
	.level{width: 116upx;height: 34upx;color: #fff;background: #409BE0;box-shadow: 0px 1px 6px 0px rgba(255, 255, 255, 0.7);border-radius: 30upx;text-align: center;line-height: 34upx;font-size: 24upx;}
	.create_time{color: #8E8E8E;font-size: 26upx;margin-top: 4upx;}
	.prices{font-size: 40upx;color: #409BE0;font-weight: bold;}
	
</style>
<script>
	export default {
		data() {
			return {
				data:[],
				pages:1,
				_$token:"",
				type:1,//1收益明细  2提现明细
			}
		},
		onLoad(option){
			var that = this;
			that.type = option.type
			that.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		onReachBottom(){
			var that = this;
			that.pages++;
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		methods:{
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			timestampToTime(timestamp) {
				var date = new Date(parseFloat(timestamp) * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '年';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
				var D = date.getDate() + '日 ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				return M+D+h+m;
			},
			numToS(num){
				let chnNumChar = ["零","一","二","三","四","五","六","七","八","九"]
				let n = chnNumChar[num]
				return n + '级团队'
			},
			AjaxLoad(){
				var that = this;
				var lists = []
				let url
				if(that.type == 1){
					url = 'user/earnings'
				}else{
					url = 'User/account_detail'
				}
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"page":this.pages
				};
				this._$InitRequest.request(url, param).then(res => {
					console.log( res );
					if(that.type == 1){
						let list = res.data.data.data
						
						list.map((item)=>{
							item.create_time = that.timestampToTime(item.create_time)
							item.levels = that.numToS(item.level)
						})
						console.log(list)
						that.data = that.data.concat(list)
					}else{
						let list = res.data.data
						that.data = that.data.concat(list)
						// res.data.data.forEach((item,index)=>{
						// 	lists.push({
						// 		money:item.price,
						// 		time:item.createtime
						// 	})
						// })
						// for (var i = 0; i < lists.length; i++){
						// 	that.data.push(lists[i])
						// }
					}
					
				},error=>{})
			},
			
			
			
			
		}
	}
</script>