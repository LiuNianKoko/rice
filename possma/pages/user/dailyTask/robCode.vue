<template>
	<view>
		<image src="/static/image/img/task-bg.png" class="task-bg" :style="[{height:(StatusBar + 180) + 'px'}]"  mode=""></image>
		<view class="top-head" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]" :class="isBg?'top-head-bg':''">
			<view class="back-wrap disCenter" @click="back">
				<image src="/static/image/img/back-white.png" class="back" mode=""></image>
			</view>
			<view class="top-title">
				抢码区
			</view>
			<view class="back-wrap">

			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="top-box text-white" :style="[{height:((StatusBar + 180) - CustomBar) + 'px'}]">
			<view class="top-time" v-if="timeSlot == 1">
				09:00--21:00开始抢码
			</view>
			<view class="text-center">
				<view class="font28 marginBottom10">
					已完成任务次数
				</view>
				<view class="font48 fontBold">
					{{info.success || 0}}
				</view>
			</view>
			<view class="text-center">
				<view class="font28 marginBottom10">
					累计收益
				</view>
				<view class="font48 fontBold">
					￥{{info.price || 0}}
				</view>
			</view>
		</view>
		
		<view class="wrap" v-if="list.length > 0">
			<swiper class="swiper-box" vertical="true" circular="true" autoplay="true" interval="500" display-multiple-items="10">
			    <swiper-item class="item disBetween" v-for="(item,index) in list" :key="index" >
			        <view class="font32">
			        	{{item.phone}}
			        </view>
			        <view class="btn-now" @click="receive(item)">
			        	立即抢码
			        </view>
			    </swiper-item>
			</swiper>
		</view>
		<view class="nodata" v-else>
			暂无可抢任务~
		</view> 
		<view class="bot-btn-wrap">
			<view class="bot-btn" @click="toDailyTask">
				我的任务
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				pages: 1,
				_$token: "",
				list: [],
				info:{},
				isBg:false,
				timeSlot:0,
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > 50){
				this.isBg = true
			}else{
				this.isBg = false
			}
		},
		onLoad() {
			var that = this;
			const res = uni.getSystemInfoSync();
			that.getStorage();
			that.getTimeSlot()
			setTimeout(function() {
				
				that.AjaxLoad();
			}, 100)
		},
		onShow() {
			this.getInfo()
		},
		// onReachBottom() {
		// 	var that = this;
		// 	that.pages++;
		// 	setTimeout(function() {
		// 		that.AjaxLoad();
		// 	}, 100)
		// },
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getStorage() {
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					}
				} catch (e) {}
			},
			// 获取时间段  提示
			getTimeSlot(){
				var date = new Date();
				var Y = date.getFullYear() + '/';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes()+ ':';
				var s = date.getSeconds();
				let nowTime = Y+M+D+h+m+s
				let firstTime = Y+M+D+'09:00:00'
				let secondTime = Y+M+D+'21:00:00'
				
				let nowTimes = new Date(nowTime).getTime()
				let firstTimes = new Date(firstTime).getTime()
				let secondTimes = new Date(secondTime).getTime()
				console.log(new Date(nowTime).getTime())
				if(nowTimes > firstTimes && nowTimes < secondTimes){
					this.timeSlot = 0
				}else {
					this.timeSlot = 1
				}
			},
			getInfo(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token
				};
				this._$InitRequest.request('task/count', param).then(res => {
					console.log( res );
					this.info = res.data.data
				},error=>{})
			},
			AjaxLoad() {
				var that = this;
				let param = {
					"user_id": that._$token.id,
					"user_token": that._$token.token
				};
				this._$InitRequest.request('task/list', param).then(res => {
					console.log(res);
					let list = res.data.data
					that.list = that.list.concat(list)

				}, error => {})
			},
			receive(item){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					id:item.id
				};
				this._$InitRequest.request('task/take', param).then(res => {
					console.log( res );
					if(res.data.status == 200){
						uni.showToast({icon:"none",title:res.data.mess})
					}else{
						uni.showToast({icon:"none",title:res.data.mess})
					}
				},error=>{})
			},
			toDailyTask(){
				uni.navigateTo({
					url:'/pages/user/dailyTask/dailyTask'
				})
			},
		}
	}
</script>
<style lang="less">
	page{
		background: #F8FCFF;
	}
	.task-bg{
		width: 100%;
		// height: 360upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}
	.top-head {
		box-sizing: border-box;
		width: 100%;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		// background: linear-gradient(90deg, #409BE0 0%, #76B6FF 100%);
		display: flex;
		justify-content: space-between;
		align-items: center;

		.back-wrap {
			width: 70upx;
			height: 100%;

			.back {
				width: 26upx;
				height: 44upx;
			}
		}

		.top-title {
			font-size: 36upx;
			color: #fff;
			font-weight: bold;
		}
	}
	.top-head-bg{
		background: linear-gradient(90deg, #409BE0 0%, #76B6FF 100%);
	}
	.top-box{
		width: 100%;
		position: relative;
		z-index: 1;
		padding: 56upx 100upx 0;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.top-time{
		position: absolute;
		font-size: 26upx;
		color: #fff;
		// left: 60upx;
		top: 10upx;
		left: 50%;
		transform: translateX(-50%);
	}
	.wrap{
		padding: 80upx 30upx 50upx;
		box-sizing: border-box;
	}
	.swiper-box{
		width: 100%;
		height: 700upx;
		position: relative;
	}
	.item{
		box-sizing: border-box;
		padding: 10upx;
		// height: 116upx;
		// background: #FFFFFF;
		// box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
		border-radius: 10upx;
		.btn-now{
			width: 168upx;
			height: 56upx;
			line-height: 56upx;
			font-size: 32upx;
			color: #fff;
			text-align: center;
			background: #409BE0;
			border-radius: 10upx;
		}
	}
	
	.bot-btn-wrap{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		background: #fff;
		padding: 20upx 30upx;
		box-sizing: border-box;
		.bot-btn{
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			color: #fff;
			font-size: 32upx;
			border-radius: 8upx;
			background: #409BE0;
		}
	}
</style>
