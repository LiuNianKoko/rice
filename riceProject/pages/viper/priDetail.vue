<template>
	<view class="pri-wraps">
		<view v-html="info">
			
		</view>
		<!-- <view class="pri-item">
			<view class="pri-title">
				1.成为小农户 
			</view>
			<view class="pri-text">
				购买指定的产品(价值299元，分2个包裹发货，独立的运费模板)，确认收货后成为小农户身份，有效期365天。 
			</view>
		</view>
		<view class="pri-item">
			<view class="pri-title">
				2.小农户权益
			</view>
			<view class="pri-text">
				享以会员价购买指定某几款特权产品的权益，总额度300斤(具体限额后台可统一设置)
			</view>
		</view>
		<view class="pri-item">
			<view class="pri-title">
				3.特权产品
			</view>
			<view class="pri-text">
				特权产品按包出售，每包5斤（可根据实际调节)
			</view>
		</view>
		<view class="pri-item">
			<view class="pri-title">
				4.分销权限
			</view>
			<view class="pri-text">
				小农户具有分销权限，推广普通会员成为小农户，赠送
				推荐人一张50元通用代金券（具体金额后台可设置）；
				推广其他会员成为大农户，无奖励
			</view>
		</view> -->
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				info:''
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				http('/api/setting/farmingEquity','post').then(res => {
					console.log(res)
					this.info = res.data.data.farmingEquity
					if(this.info){
						let reg = new RegExp('<img', 'gi');
						this.info = this.info.replace(reg, `<img style="width: 100%;vertical-align:top;"`);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.pri-wraps{
		border-top: 2upx solid #f2f2f5;
		// padding: 30upx;
		box-sizing: border-box;
		.pri-item{
			margin-bottom: 50upx;
			.pri-title{
				font-weight: bold;
				line-height: 48upx;
			}
			.pri-text{
				font-size: 24upx;
				line-height: 48upx;
			}
		}
	}
</style>
