<template>
	<view>
		<view class="wrap">
			<view class="msg-item" v-for="(item,index) in list" :key="index">
				<view class="font24 color-bbb marginBottom15 disCenter">
					{{item.create_time || ''}}
				</view>
				<view class="msg-main" @click="toMsgDetail(item)">
					<view class="disBetween">
						<view class="fontBold color-333 line1">
							{{item.title || ''}}
						</view>
						<view class="msg-read" v-if="item.is_read == 0">
							
						</view>
					</view>
					<view class="font24 color-333 msg-intr line2">
						{{item.describe|| ''}}
					</view>
					<view class="disBetween paddingTop20 scale-1px-top">
						<view class="color-bbb font24">
							查看详情
						</view>
						<image src="/static/image/img/right-gray-sm.png" class="right-gray" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				list:[],
				page:1,
				_$token: "",
			}
		},
		onLoad(option) {
			this.getStorage();
			this.getList()
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			getStorage() {
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					} else {
						uni.showToast({
							icon: "none",
							title: "请先登录"
						})
						setTimeout(function() {
							uni.navigateTo({
								url: "../../login/login"
							})
						}, 1500)
					}
				} catch (e) {}
			},
			toMsgDetail(item){
				uni.navigateTo({
					url:'/pages/index/msg/msgDetail?id=' + item.id
				})
			},
			getList(){
				let data = {
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					page:1
				}
				this._$InitRequest.request('user_msg/index',data).then(res=>{
					if(res.data.code == 200){
						this.list = res.data.data.data
						console.log(this.list)
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					page:this.page + 1
				}
				http('user_msg/index','post',data).then(res=>{
					if(res.data.code == 200){
						newList = res.data.data
						this.list = this.list.concat(newList)
						this.page++
					}
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 30upx;
	}
	.msg-item{
		padding: 30upx 0;
		margin-bottom: 10upx;
		.msg-main{
			padding: 30upx;
			box-shadow: 0px 6upx 20upx 0px rgba(48, 49, 59, 0.1);
			border-radius: 10upx;
			.msg-read{
				background: #FB4142;
				width: 12upx;
				height: 12upx;
				border-radius: 50%;
			}
			.msg-intr{
				margin: 25upx 0;
			}
			.right-gray{
				width: 12upx;
				height: 22upx;
			}
		}
	}
</style>
