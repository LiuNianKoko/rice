<template>
	<view>
		<image src="/static/image/img/task-bg.png" class="task-bg" :style="[{height:(StatusBar + 180) + 'px'}]"  mode=""></image>
		<view class="top-head" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]" :class="isBg?'top-head-bg':''">
			<view class="back-wrap disCenter" @click="back">
				<image src="/static/image/img/back-white.png" class="back" mode=""></image>
			</view>
			<view class="top-title">
				每日任务
			</view>
			<view class="back-wrap">

			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="top-box text-white" :style="[{height:((StatusBar + 180) - CustomBar) + 'px'}]">
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
			<view class="item disBetween" v-for="(item,index) in list" :key="index">
				<view class="font32">
					{{item.phone}}
				</view>
				<view class="btn-now" @click="receive(item)">
					立即接码
				</view>
			</view>
		</view>
		<view class="nodata" v-else>
			暂无数据~
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
			setTimeout(function() {
				
				that.AjaxLoad();
			}, 100)
		},
		onShow() {
			this.getInfo()
		},
		onReachBottom() {
			var that = this;
			that.pages++;
			setTimeout(function() {
				that.AjaxLoad();
			}, 100)
		},
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
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":0,
					"page":this.pages,
				};
				this._$InitRequest.request('task/index', param).then(res => {
					console.log(res);
					let list = res.data.data.data
					that.list = that.list.concat(list)

				}, error => {})
			},
			receive(item){
				uni.navigateTo({
					url:'/pages/user/dailyTask/codeNow?id=' + item.task_id + '&phone=' + item.phone
				})
				// let param={
				// 	"user_id":this._$token.id,
				// 	"user_token":this._$token.token,
				// 	id:item.id
				// };
				// this._$InitRequest.request('task/take', param).then(res => {
				// 	console.log( res );
				// 	if(res.data.status == 200){
				// 		uni.navigateTo({
				// 			url:'/pages/user/dailyTask/codeNow?id=' + item.id + '&phone=' + item.phone
				// 		})
				// 	}else{
				// 		uni.showToast({icon:"none",title:res.data.mess})
				// 	}
				// },error=>{})
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
		width: 100%;
		box-sizing: border-box;
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
		padding: 50upx 100upx 0;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.wrap{
		padding: 30upx;
	}
	.item{
		height: 116upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
		border-radius: 10upx;
		padding: 10upx 30upx;
		margin-bottom: 20upx;
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
</style>
