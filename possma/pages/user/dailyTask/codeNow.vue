<template>
	<view>
		<view class="top-head" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disCenter" @click="back">
				<image src="/static/image/img/back-white.png" class="back" mode=""></image>
			</view>
			<view class="top-title">
				立即接码
			</view>
			<view class="back-wrap">

			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="wrap">
			<view class="phone-wrap">
				手机号为:{{phone}}正在接码
			</view>
			<view class="item">
				<view class="font32 marginBottom15 padl30">
					您的验证码为：<text style="color: #409BE0;">{{info.code || '******'}}</text>
				</view>
				<view class="font28 color-999 marginBottom20 padl30">
					请立即输出完成接码任务(验证码三分钟内有效)
				</view>
				<view class="color-999 time-wrap">
					{{info.times}}
				</view>
			</view>
		</view>
		<view class="bottom-wrap" v-if="info.status == 0">
			<view class="bottom-btn" @click="changeHids">
				输码验证
			</view>
		</view>
		
		<view class="hids" v-if="hids">
			
		</view>
		<view class="hids-main" v-if="hids">
			<view class="hids-top-bg"></view>
			<view class="hids-top">
				<view class="hids-top-title">
					请校验短信验证码
				</view>
				<view class="hids-top-line">
					
				</view>
			</view>
			<view class="hids-content">
				<view class="input-wrap">
					<input type="text" placeholder="请输入手机号" class="inputs" v-model="phone" disabled/>
				</view>
				<view class="input-wrap">
					<input type="number" placeholder="请输入验证码" class="inputs" v-model="code"/>
				</view>
				<view class="disBetween btns-wrap">
					<view class="btns" @click="changeHids">
						取消
					</view>
					<view class="btns btns-act" @click="sub">
						确认
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				_$token: "",
				list: [],
				info:{},
				hids:false,
				phone:'',
				code:'',
				id:0
			}
		},
		onLoad(option) {
			this.id = option.id
			this.phone = option.phone
			var that = this;
			const res = uni.getSystemInfoSync();
			that.getStorage();
			setTimeout(function() {
				that.getInfo();
			}, 100)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeHids(){
				this.hids = !this.hids
				if(this.hids &&!this.info.code){
					uni.showLoading({
						title:'生成中...'
					})
					setTimeout(()=>{
						this.getCode()
					},4000)
				}
			},
			getCode(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					id:this.info.id
				};
				this._$InitRequest.request('task/create_code', param).then(res => {
					console.log( res );
					uni.hideLoading()
					if(res.data.status == 200){
						uni.showToast({icon:"none",title:res.data.mess})
						this.info.code = res.data.data.code
					}else{
						uni.showToast({icon:"none",title:res.data.mess})
					}
				},error=>{})
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
			timestampToTime(timestamp) {
				var date = new Date(parseFloat(timestamp) * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				function test(num) {
				  if (num < 10) {
					  num = "0" + num    
				  }
				  return num
				}
				h = test(h)
				m = test(m)
				// var s = date.getSeconds();
				return Y+M+D+h+m;
			},
			getInfo(){
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					id:this.id
				};
				this._$InitRequest.request('task/info', param).then(res => {
					console.log( res );
					this.info = res.data.data.log
					this.info.times = this.timestampToTime(this.info.create_time)
				},error=>{})
			},
			sub(){
				if(!this.code){
					uni.showToast({icon:"none",title:'请输入验证码'})
					return
				}
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					id:this.info.id,
					code:this.code
				};
				this._$InitRequest.request('task/save', param).then(res => {
					console.log( res );
					if(res.data.status == 200){
						uni.showToast({icon:"none",title:res.data.mess})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1300)
					}else{
						uni.showToast({icon:"none",title:res.data.mess})
					}
				},error=>{})
			},
		}
	}
</script>
<style lang="less">
	page{
		background: #F8FCFF;
	}
	.padl30{
		padding-left: 30upx;
	}
	.top-head {
		box-sizing: border-box;
		width: 100%;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		background: linear-gradient(0deg, #409BE0 0%, #76B6FF 100%);
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
	.wrap{
		padding: 30upx;
	}
	.phone-wrap{
		font-size: 36upx;
		color: #FF0000;
		margin-bottom: 40upx;
	}
	.item{
		padding-top: 30upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
		margin-bottom: 20upx;
		.time-wrap{
			padding: 23upx 40upx;
			text-align: right;
			border-top: 1px solid #E6E6E6;
			font-size: 28upx;
		}
	}
	.bottom-wrap{
		width: 100%;
		background: #F8FCFF;
		padding: 30upx 30upx 80upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		.bottom-btn{
			height: 88upx;
			line-height: 88upx;
			text-align: center;
			font-size: 36upx;
			font-weight: 500;
			color: #fff;
			background: #409BE0;
			border-radius: 12upx;
		}
	}
	.hids-main{
		width: 560upx;
		height: 500upx;
		border-radius: 15upx;
		background: #fff;
		position: fixed;
		z-index: 200;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.hids-top-bg{
			
		}
		.hids-top{
			position: relative;
			padding: 40upx;
			.hids-top-title{
				font-size: 36upx;
				color: #409BE0;
				font-weight: bold;
				text-align: center;
				position: relative;
				z-index: 10;
			}
			.hids-top-line{
				width: 320upx;
				height: 16upx;
				background: #449DE2;
				opacity: 0.3;
				border-radius: 8upx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				z-index: 1;
				bottom: 37upx;
			}
		}
		.hids-content{
			padding: 0 40upx;
			.input-wrap{
				padding: 16upx 20upx;
				border: 1px solid #999999;
				border-radius: 8upx;
				margin-bottom: 30upx;
				.inputs{
					
				}
			}
			.btns-wrap{
				margin-top: 50upx;
				.btns{
					width: 220upx;
					height: 80upx;
					background: #E6E6E6;
					line-height: 80upx;
					text-align: center;
					border-radius: 10upx;
					color: #666666;
					font-size: 36upx;
					font-weight: 500;
				}
				.btns-act{
					background: #409BE0;
					color: #fff;
				}
			}
		}
	}
</style>
