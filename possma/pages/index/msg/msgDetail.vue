<template>
	<view>
		<view class="wrap">
			<view class="font44 fontBold text-center marginBottom20">
				{{info.title || ''}}
			</view>
			<view class="text-center color-gray font24 marginBottom30">
				{{info.create_time}}
			</view>
			<view class="">
				<view v-html="info.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				info:{},
				_$token: "",
			}
		},
		onLoad(option) {
			this.getStorage();
			this.id = option.id
			this.getInfo()
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
			getInfo(){
				let data = {
					id:this.id,
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				}
				this._$InitRequest.request('user_msg/read',data).then(res=>{
					if(res.data.code == 200){
						this.info = res.data.data
						if(this.info.content){
							let reg = new RegExp('<img','gi')
							this.info.content = this.info.content.replace(reg,'<img style="width:100%;vertical-align: top;"')
						}
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
</style>
