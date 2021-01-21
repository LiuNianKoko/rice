<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" borderBottom="#dcdcdc" :isBack="true"><block slot="backText"></block><block slot="content">添加手机号码</block></cu-custom>
		<view class="wrap">
			<view class="item">
				<view class="item-left">
					手机号码
				</view>
				<view class="item-right">
					<input type="digit" class="inputs" v-model="phone" placeholder="输入有效手机号"/>
				</view>
			</view>
			<view class="item">
				<view class="item-left">
					验证码
				</view>
				<view class="item-right">
					<input type="number" class="inputs" placeholder="输入六位验证码"/>
				</view>
			</view>
			<view class="de-wrap disBetween">
				<view class="de-txt">
					保存此号码供以后授权使用
				</view>
				<view class="de-switch">
					<switch checked @change="switchChange" color="#ffaaa6" style="transform:scale(0.7);transform-origin: right;"/>
				</view>
			</view>
			<view class="btn" @click="hold">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				phone:'',
				
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			
		},
		
		methods: {
			hold(){
				
			},
			phoneInput(e){
				console.log(e)
				var mobile = e.detail.value.replace(/[^/d]/g,'')
				this.phone = mobile
				return this.phone
			},
			
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 0 38upx;
	}
	.item{
		padding: 36upx 0;
		border-bottom: 1px solid #f1f1f1;
		display: flex;
		align-items: center;
		.item-left{
			color: #434343;
			font-size: 27upx;
			width: 180upx;
			font-weight: bold;
		}
		.item-right{
			font-size: 26upx;
		}
		
	}
	.de-wrap{
		padding: 24upx 0;
		.de-txt{
			color: #9D9D9D;
			font-size: 26upx;
		}
		.de-switch{
			
		}
	}
	.btn{
		margin-top: 160upx;
		height: 90upx;
		font-size: 24upx;
		font-weight: bold;
		color: #EC7A8E;
		border: 1px solid #EC7A8E;
		border-radius: 10upx;
		text-align: center;
		line-height: 90upx;
	}
</style>
