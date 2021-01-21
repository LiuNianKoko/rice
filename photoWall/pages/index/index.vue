<template>
	<view class="wrap">
		<image :src="bg" class="bg"></image>
		<view class="mid-wrap">
			<view class="mids disCenter">
				<input type="text" v-model="order" placeholder="请填写订单号" class="inputs"/>
			</view>
			<view class="mids btn disCenter" @click="toUpload()">
				第一步，先确认订单号
			</view>
		</view>
		
		<view class="mask">
			<view class="text-wrap">
				<view class="title text-white marginBottom15 text-center">
					活动规格
				</view>
				<view class="intr font24 text-white">
					<view v-html="rule"></view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				order:'',
				bg:'',
				rule:'',
				
			}
		},
		onLoad() {
			this.getBg()
		},
		methods: {
			getBg(){
				http('/api/setting/getIndex').then(res=>{
					console.log(res)
					if(res.sta == 200){
						this.bg = res.data.bg
						this.rule = res.data.rule
						this.rule = this.rule.replace(/\r/g,'<br>')
					}
				})
			},
			toUpload(){
				if(this.order == ''){
					this.$util.showToast('请填写订单号')
					return
				}
				let data = {
					order_num:this.order
				}
				http('/api/order/findOrder','post',data).then(res=>{
					console.log(res)
					if(res.sta == 200){
						uni.setStorageSync('order',this.order)
						uni.navigateTo({
							url:'/pages/index/upload'
						})
					}else{
						this.$util.showToast(res.msg)
					}
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		// width: 100%;
		// height: 100%;
		// background-image: url(../../static/bg.png);
		// background-size: 100% 100%;
		// background-repeat: no-repeat;
	}
	.bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.mid-wrap{
		margin-left: 50%;
		transform: translateX(-50%);
		padding-top: 61%;
	}
	.mids{
		border: 1px solid #01b0bd;
		border-radius: 12upx;
		width: 350upx;
		height: 75upx;
		background-color: #fff;
	}
	.inputs{
		font-size: 32upx;
		color: #959595;
		text-align: center;
	}
	.btn{
		margin-top: 40upx;
		font-size: 24upx;
		color: #434343;
	}
	
	.mask{
		padding: 140upx 60upx 0;
	}
	.text-wrap{
		padding: 22upx 16upx;
		background-color: #000;
		opacity: 0.3;
		border-radius: 10upx;
		
	}
	
</style>
