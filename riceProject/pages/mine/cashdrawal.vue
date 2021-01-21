<template>
	<view class="cashdrawal">
		<view class="cash-bg">
			<image class="back-icon" :src='imag+"back-black.png"' @click="goback"></image>
			<view class="bti">
				可提现金额
			</view>
			<view class="cashjag">
				<text class="price" v-if="balance">
					<text class="symbol">￥</text>{{balance}}
				</text>
				<text class="price" v-else>
					<text class="symbol">￥</text>0
				</text>
				<!-- <text class="alltix" @click="alltixian">全部提现</text> -->
			</view>
			<!-- <view class="cash-bgcir">
				
			</view> -->
		</view>
		
		<view class="casjzha-wrap">
			<view class="cash-mode-title">
				提现方式
			</view>
			<view class="cash-mode-wrap">
				<view class="cash-mode" :class="current==1?'cash-act':''" @click="changeMode(1)">
					<image class="tximg" :src='imag+"txzfb.png"'></image>
					支付宝
					<!-- <view class="cash-line" v-if="current==1"></view> -->
				</view>
				<view class="cash-mode" :class="current==2?'cash-act':''" @click="changeMode(2)">
					<image class="tximg" :src='imag+"txbank.png"'></image>
					银行卡
					<!-- <view class="cash-line" v-if="current==2"></view> -->
				</view>
			</view>
			<view v-if="current==1" :class="['item-wraps',current==1?'item-wraps1':'']">
				<!-- <view class="cash-item disflex">
					<view class="lable">
						提现金额
					</view>
					<view class="cashborder border disflex">
						<text class="fhao">￥</text>
						<input class="ipt" type="number" v-model="tixMoney" placeholder="请输入提现的金额" />
					</view>
				</view> -->
				<view class="cash-item disflex">
					<view class="lable">
						支付宝名称
					</view>
					<view class="cashborder  disflex">
						<input class="ipt" type="text" v-model="accountName" placeholder="请输入支付宝名称" />
					</view>
				</view>
				<view class="cash-item disflex">
					<view class="lable">
						支付宝账户
					</view>
					<view class="cashborder  disflex">
						<input class="ipt" type="text" v-model="accountNum" placeholder="请输入支付宝账户" />
					</view>
				</view>
			</view>
			<view v-if="current==2" :class="['item-wraps',current==2?'item-wraps2':'']">
				<!-- <view class="cash-item disflex">
					<view class="lable">
						提现金额
					</view>
					<view class="cashborder border disflex">
						<text class="fhao">￥</text>
						<input class="ipt" type="number" v-model="tixMoney" placeholder="请输入提现的金额" />
					</view>
				</view> -->
				<view class="cash-item disflex">
					<view class="lable">
						持卡人姓名
					</view>
					<view class="cashborder   disflex">
						<input class="ipt" type="text" v-model="personName" placeholder="请输入持卡人姓名" />
					</view>
				</view>
				<view class="cash-item disflex">
					<view class="lable">
						开户银行
					</view>
					<view class="cashborder  disflex">
						<input class="ipt" type="text" v-model="bankName" placeholder="请输入开户银行" />
					</view>
				</view>
				<view class="cash-item disflex">
					<view class="lable">
						银行卡号
					</view>
					<view class="cashborder  disflex">
						<input class="ipt" type="number" v-model="bankNum" placeholder="请输入银行卡号" />
					</view>
				</view>
			</view>
			
			<view class="cash-money-title">
				提现金额
			</view>
			<view class="cash-money disflex">
				<text class="fhao">￥</text>
				<input class="ipt" type="number" v-model="tixMoney"/>
			</view>
		</view>
		<view class="sureadd" @click="sureBtn">
			 确定提现
		</view>
		<KeyboardPay v-if="isPay" :payMoney="tixMoney" :payTitle="cashTitle" :source="source" @payCode="getPayCode"
		 @closeModal="closePayModal" @showSuccess="showPaySuccess"></KeyboardPay>
		<!-- 支付成功 弹窗 -->
		<QSPopup ref="QSPopupSuccess">
			<view class="success">
				<!-- <image src="/static/pay-success.png"></image>
				提现申请提交成功 -->
				<view class="suc-txt">
					<view class="suc-mark-wrap">
						<image class="suc-mark" :src='imag+"txmark.png"'></image>
					</view>
					
					<view class="suc-title">
						请确认以下信息
					</view>
					<view class="suc-data" v-if="current==1">
						<view class="data-item">
							
							<view class="data-item-title">
								支付宝名称:
							</view>
							<view class="data-item-txt">
								{{accountName}}
							</view>
						</view>
						<view class="data-item">
							<view class="data-item-title">
								支付宝账户:
							</view>
							<view class="data-item-txt">
								{{accountNum}}
							</view>
							
						</view>
						<view class="data-item">
							提现金额:{{tixMoney}}
						</view>
					</view>
					<view class="suc-data" v-if="current==2">
						<view class="data-item">
							
							<view class="data-item-title">
								持卡人姓名:
							</view>
							<view class="data-item-txt">
								{{personName}}
							</view>
						</view>
						<view class="data-item">
							<view class="data-item-title">
								开户银行:
							</view>
							<view class="data-item-txt">
								{{bankName}}
							</view>
						</view>
						<view class="data-item">
							<view class="data-item-title">
								银行卡号:
							</view>
							<view class="data-item-txt">
								{{bankNum}}
							</view>
						</view>
						<view class="data-item">
							提现金额:{{tixMoney}}
						</view>
					</view>
					<view class="suc-intr">
						提交成功后，我们将在三个工作日内处理您的提现申请
					</view>
				</view>
				<view class="suc-btn">
					<view class="btn-sure btn" @click="btnSure">
						确认
					</view>
					<view class="btn-cancel btn" @click="hide('QSPopupSuccess')">
						取消
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	import KeyboardPay from '@/components/pwdpay.vue'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	const app = getApp();
	export default {
		data() {
			return {
				imag: app.globalData.imag,
				current: 1,
				isPay: false,
				balance: '',
				tixMoney: '',
				accountName: '', //支付宝名
				accountNum: '', //支付宝账号
				bankName: '', //开户银行
				bankNum: '', //银行卡号
				personName: '', //持卡人姓名
				cashTitle: '提现',
				source: '1', // 1 提现   2 订单余额支付
				tixType: 2, //1余额提现     2收益提现
			}
		},
		components: {
			KeyboardPay,
			QSPopup
		},
		onLoad(option) {
			this.tixType = option.tixType
			this.getBalance()
		},
		onShow() {
			this.getBalance()
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hide(ref){
				this.$refs[ref].hide();
			},
			closePayModal() {
				this.isPay = false;
			},
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			// alltixian() {
			// 	this.tixMoney = this.balance
			// },
			changeMode(type) {
				this.current = type
			},
			getPayCode(code) {
				let that = this
				if (that.current == 1) {
					let data = {
						token: uni.getStorageSync('token'),
						type: 1,
						withdraw_type: that.tixType,
						price: that.tixMoney,
						ali_name: that.accountName,
						ali_num: that.accountNum,
						payment_password: code
					}
					http('/api/User/putforward', 'post', data).then(res => {
						if (res.data.status == '200') {
							that.closePayModal()
							// that.show('QSPopupSuccess')
							
							uni.navigateTo({
								url: '/pages/mine/cashdsuccess?current=' + that.current + '&price=' + that.tixMoney + '&num=' + that.accountNum
							})
							
						} else if (res.data.status == '400') {
							that.$util.showToast(res.data.msg)
							that.closePayModal()
						}
						console.log(res)
					})
				} else if (that.current == 2) {
					let data = {
						token: uni.getStorageSync('token'),
						type: 2,
						withdraw_type: that.tixType,
						price: that.tixMoney,
						username: that.personName,
						bank_name: that.bankName,
						cardnum: that.bankNum,
						payment_password: code
					}
					http('/api/User/putforward', 'post', data).then(res => {
						if (res.data.status == '200') {
							that.closePayModal()
							// that.show('QSPopupSuccess')
							uni.navigateTo({
								url: '/pages/mine/cashdsuccess?current=' + that.current + '&price=' + that.tixMoney + '&num=' + that.bankNum
							})

						} else {
							that.$util.showToast(res.data.msg)
							that.closePayModal()
						}
						console.log(res)
					})
				}
			},
			btnSure(){
				this.hide('QSPopupSuccess')
				this.isPay = true
			},
			sureBtn() {
				console.log(parseInt(this.tixMoney),parseInt(this.balance.replace(/,/g,'')))
				
				if (parseFloat(this.tixMoney) < 0 || parseFloat(this.tixMoney) > parseFloat(this.balance.replace(/,/g,''))  || !this.tixMoney) {
					this.$util.showToast('请填写正确金额')
					return
				}
				if (this.current == 1) {
					if (this.accountName == '' || this.accountNum == '') {
						this.$util.showToast('不能为空')
						return
					} else {
						// this.isPay = true
						this.show('QSPopupSuccess')
					}
				}
				if (this.current == 2) {
					if (this.bankName == '' || this.bankNum == '' || this.personName == '') {
						this.$util.showToast('不能为空')
						return
					} else {
						// this.isPay = true
						this.show('QSPopupSuccess')
					}
				}
			},
			getBalance() {
				let data = {
					token: uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo', 'post', data).then(res => {
					if (res.data.status == '200') {
						if (this.tixType == 1) {
							this.balance = res.data.data.balance
						}
						if (this.tixType == 2) {
							this.balance = res.data.data.surplus_profit
						}
					}
					console.log(res)
				})
			},
		}
	}
</script>
<style lang="scss">
	.sureadd {
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		color: #FFFFFF;
		margin: 0 auto;
		font-size: 34upx;
		margin-top: 50upx;
		background: #00a0e9;
		border-radius:60upx;
	}

	.casjzha-wrap {
		padding: 30upx;
		.cash-mode-title{
			font-size: 30upx;
			margin-bottom: 20upx;
		}
		.cash-mode-wrap {
			display: flex;
			align-items: center;

			.cash-mode {
				height: 80upx;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32upx;
				border-radius: 40upx 40upx 0 0;
				// .cash-line {
				// 	width: 94upx;
				// 	height: 6upx;
				// 	background: rgba(251, 65, 66, 1);
				// 	border-radius: 3upx;
				// }
				.tximg{
					width: 46upx;
					height: 46upx;
					margin-right: 8upx;
				}
			}

			.cash-act {
				background-color: #eee;
				color: #00a0e9;
			}
		}
		.item-wraps{
			background-color: #eee;
			padding: 30upx 40upx 10upx;
		}
		.item-wraps1{
			border-radius:0 40upx 40upx 40upx;
		}
		.item-wraps2{
			border-radius: 40upx 0 40upx 40upx;
		}
		.cash-item {
			margin-bottom: 30upx;
			justify-content: space-between;

			.lable {
				font-size: 30upx;
				color: #000000;
				padding-right: 20upx;
				margin-top: 16upx;
			}

			.ipt {
				height: 70upx;
				line-height: 70upx;
				// padding-left: 20upx;
				font-size: 30upx;
				color: #00a0e9;
				border: 1px solid #00a0e9 ;
				border-radius: 60upx;
				text-align: center;
				width: 400upx;
				.uni-input-placeholder{
					color: #00a0e9; 
				}
			}
			.ipt::-webkit-input-placeholder { 
			/* WebKit browsers */ 
			color: #00a0e9; 
			} 
			.ipt:-moz-placeholder { 
			/* Mozilla Firefox 4 to 18 */ 
			color: #00a0e9; 
			} 
			.ipt::-moz-placeholder { 
			/* Mozilla Firefox 19+ */ 
			color: #00a0e9; 
			} 
			.ipt:-ms-input-placeholder { 
			/* Internet Explorer 10+ */ 
			color: #00a0e9; 
			}
			.cashborder {
				// width: 510upx;
				height: 80upx;
				line-height: 80upx;
			}

			.fhao {
				padding-left: 20upx;
			}
		}
	}
	.cash-money-title{
		font-size: 30upx;
		margin-bottom: 20upx;
		margin-top: 30upx;
	}
	.cash-money{
		align-items: center;
		.fhao {
			font-size: 80upx;
			// font-weight: bold;
			color: #00a0e9;
		}
		.ipt {
			height: 80upx;
			line-height: 80upx;
			padding-left: 40upx;
			width: 100%;
			font-size: 30upx;
			border-radius: 60upx;
			background-color: #eee;
		}
	}
	.cashdrawal {
		.cash-bg{
			height: 350upx;
			background-color: #00a0e9;
			padding-top: 154upx;
			border-radius: 0 0 50% 50%;
			box-sizing: border-box;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
				position: absolute;
				left: 32upx;
				top: 80upx;
			}
			.cash-bgcir{
				width: 130%;
				height: 340upx;
				position: absolute;
				z-index: 1;
				bottom: -132upx;
				left:-14%;
				background-color: #00a0e9;
				border-radius: 50%;
			}
		}
		.bti {
			color: #fff;
			text-align: center;
			font-size: 32upx;
		}
	}

	.symbol {
		font-size: 24upx;
	}

	.cashjag {
		text-align: center;
		margin-top: 20upx;
		.price {
			font-size: 46upx;
			color: #fff;
			margin-right: 20upx;
		}

		.alltix {
			font-size: 32upx;
			color: #024BC5;
		}
	}

	// 支付成功
	.success {
		width: 570upx;
		// height: 640upx;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx 40upx 60upx;
		box-sizing: border-box;
		font-size: 30upx;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// font-weight: bold;
		.suc-txt{
			position: relative;
			padding-top: 74upx;
			margin-bottom: 40upx;
			.suc-mark-wrap{
				width: 160upx;
				height: 160upx;
				border-radius:50% ;
				background-color: #fff;
				position: absolute;
				top: -120upx;
				left: 170upx;
				.suc-mark {
					width: 160upx;
					height: 160upx;
				}
			}
			
			.suc-title{
				color:#00a0e9;
				text-align: center;
				font-size: 30upx;
			}
			.suc-data{
				padding: 20upx 52upx;
				
				.data-item{
					margin-bottom: 20upx;
					font-size: 30upx;
					display: flex;
					flex-wrap: wrap;
					.data-item-title{
						font-size: 30upx;
					}
					.data-item-txt{
						font-size: 30upx;
					}
				}
			}
			.suc-intr{
				padding:0 52upx;
				font-size: 30upx;
				color: #999;
			}
		}
		.suc-btn{
			display: flex;
			justify-content: space-between;
			.btn{
				width: 220upx;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				font-size: 36upx;
				border-radius: 40upx;
				color: #fff;
			}
			.btn-sure{
				background-color: #00a0e9;
			}
			.btn-cancel{
				background-color: #9a9a9a;
			}
		}
	}
</style>
