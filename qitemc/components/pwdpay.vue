<template>
	<view class="content" @tap="hiddenKeyboard">
		
		<view class="paymodal">
			<view class="content-item">
				<view class="jinebt">
					{{payTitle}}
					<view class="close" @click="closeModal">
						✕
					</view>
				</view>
				<view class="jinec">
					￥ {{payMoney}}
				</view>
				<view class="fbti">
					请输入支付密码
				</view>
				<view class="input-row" @tap.stop="showKeyboard">
					<view :class="['item',{'item-active':codeLength==index}]" v-for="(k,index) in arr" :key="index">
						{{code.charAt(index)}}
					</view>
				</view>
			</view>
			<DigitalKeyboard @change="contToggle" @closeKeyboard="closeKeyboard" :keyBoardSwitch="keyBoardSwitch" :decimalPoint="true"></DigitalKeyboard>
		</view>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	import DigitalKeyboard from '@/components/digital-keyboard/digital-keyboard.vue'
	
	export default {
		components:{
			DigitalKeyboard
		},
		props:{
			payMoney:'',   //支付金额
			payTitle:'',   //  提现 或余额支付
			source:''   // 1 提现   2 余额支付
		},
		data() {
			return {
				arr:['','','','','',''],
				code:'',
				codeLength:null,
				length:6,
				keyBoardSwitch:true,
			}
		},
		onLoad() {
			
		},
		methods: {
			closeModal(){
				this.$emit('closeModal');  // 关闭输入支付密码页
			},
			showKeyboard(){
				this.codeLength=this.code.length==6?5:this.code.length;
				this.keyBoardSwitch=true;
				console.log(this.source)
			},
			hiddenKeyboard(){
				this.keyBoardSwitch=false;
				this.codeLength=null;
			},
			closeKeyboard(value){
				console.log(value);
			},
			contToggle(k){
				let that = this
				let len=that.code.length;
				if(k===''){
					that.code=that.code.substring(0,len-1);
					that.codeLength=that.code.length;
					return;
				}
				that.codeLength=len+1;
				that.code += k.toString();
				
				if(that.length===len+1){
					that.keyBoardSwitch=false;
					if(that.source == '1'){
						that.$emit('payCode',that.code)
						
					}else if(that.source == '2'){
						that.$emit('payCode',that.code)
						
					}
					
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.paymodal{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 49;
		background-color: rgba(0,0,0,.6);
	}
	.content-item{
		position: fixed;
		width: 80%;
		padding: 30upx;
		background-color: #FFFFFF;
		border-radius: 6px;
		top: 30%;
		left: 50%;
		transform: translateX(-50%);
		.jinebt{
			font-size: 40upx;
			position: relative;
			color: #000000;
			text-align: center;
			margin: 0 0 20upx 0;
			.close{
				font-size: 40upx;
				position: absolute;
				right: 30upx;
				top: 0;
			}
		}
		.jinec{
			font-size: 40upx;
			color: #000000;
			text-align: center;
		}
		.fbti{
			font-size: 32upx;
			text-align: center;
			color: #000000;
			margin:20upx 0;
		}
	}
	page,.content{
		width: 100vw;
		min-height: 100vh;
		margin: 0;
		box-sizing: border-box;
	}
	.input-row{
		width: 600upx;
		margin: 0 auto;
		padding: 30upx 0;
		box-sizing: border-box;
		font-size: 24px;
		text-align: center;
		.item{
			float: left;
			text-align: center;
			width: 80upx;
			height: 80upx;
			line-height: 80upx;
			border-radius: 10upx;
			margin:0 10upx;
			border: 1px solid #C8C8C8;
			background: #fff;
			box-sizing: border-box;
		}
		.item-active{
			position: relative;
			border: 1px solid #f4000a;
			transform: scale(1.2);
			--webkit-transform: scale(1.2);
		}
	}
	
</style>
