<template>
	<view>
		<view class="header-wrap">
			<view class="index-header">
				设置支付密码
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
				<text class="addNew" @click="tosetpassword">忘记密码</text>
			</view>
		</view>
		<view class="blank"></view>
		<view class="" v-if="setpaystatus == 2">
			<view class="content" @tap="hiddenKeyboard">
				<view class="content-title">请输入支付密码</view>
				<view class="input-row" @tap.stop="showKeyboard">
					<view :class="['item',{'item-active':codeLength3==index}]" v-for="(k,index) in arr" :key="index">
						{{code3.charAt(index)}}
					</view>
				</view>
				<DigitalKeyboard @change="contToggle3" @closeKeyboard="closeKeyboard" :keyBoardSwitch="keyBoardSwitch" :decimalPoint="true"></DigitalKeyboard>
			</view>
		</view>
		<view class="" v-if="setpaystatus == 0">
			<view class="content" @tap="hiddenKeyboard">
				<view class="content-title">请输入新支付密码</view>
				<view class="input-row" @tap.stop="showKeyboard">
					<view :class="['item',{'item-active':codeLength==index}]" v-for="(k,index) in arr" :key="index">
						{{code.charAt(index)}}
					</view>
				</view>
				<DigitalKeyboard @change="contToggle" @closeKeyboard="closeKeyboard" :keyBoardSwitch="keyBoardSwitch" :decimalPoint="true"></DigitalKeyboard>
			</view>
		</view>
		<view class="" v-if="setpaystatus == 1">
			<view class="content" @tap="hiddenKeyboard">
				<view class="content-title">请再次输入新支付密码</view>
				<view class="input-row" @tap.stop="showKeyboard">
					<view :class="['item',{'item-active':codeLength2==index}]" v-for="(k,index) in arr" :key="index">
						{{code2.charAt(index)}}
					</view>
				</view>
				<DigitalKeyboard @change="contToggle2" @closeKeyboard="closeKeyboard" :keyBoardSwitch="keyBoardSwitch" :decimalPoint="true"></DigitalKeyboard>
			</view>
		</view>
		
		<QSPopup ref="QSPopupSuccess">
			<view class="success">
				<image src="/static/pay-success.png"></image>
				密码设置成功
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import DigitalKeyboard from '@/components/digital-keyboard/digital-keyboard.vue'
	export default {
		components:{
			DigitalKeyboard,QSPopup
		},
		data() {
			return {
				arr:['','','','','',''],
				code:'',
				code2:'',
				code3:'',  // 旧密码
				codeLength:null,
				codeLength2:null,
				codeLength3:null,   // 旧密码
				length:6,
				keyBoardSwitch:false,
				setpaystatus:2
			}
		},
		onLoad() {
			console.log(this.$util.getStorage('phone'))
		},
		// onNavigationBarButtonTap() {
			// this.tosetpassword()
		// },
		methods: {
			tosetpassword(){
				uni.navigateTo({
					url:'/pages/mine/reforgetpaypwd'
				})
			},
			toMine(){
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			showKeyboard(){
				this.codeLength=this.code.length==6?5:this.code.length;
				this.codeLength2=this.code2.length==6?5:this.code2.length;
				this.codeLength3=this.code3.length==6?5:this.code3.length;
				this.keyBoardSwitch=true;
			},
			hiddenKeyboard(){
				this.keyBoardSwitch=false;
				this.codeLength=null;
				this.codeLength2=null;
				this.codeLength3=null;
			},
			closeKeyboard(value){
				console.log(value);
			},
			contToggle3(k){
				let len=this.code3.length;
				if(k===''){
					this.code3=this.code3.substring(0,len-1);
					this.codeLength3=this.code3.length;
					return;
				}
				this.codeLength3=len+1;
				this.code3+=k.toString();
				console.log(this.code3)
				if(this.length===len+1){
					let data = {
						token:uni.getStorageSync('token'),
						password:this.code3
					}
					http('/api/user/judge_pass','post',data).then(res=>{
						if(res.data.status == 200){
							// this.keyBoardSwitch=false;
							this.setpaystatus = 0;
						}else{
							this.$util.showToast(res.data.msg||res.data.message);
							this.setpaystatus = 2;
							this.code3=''
							this.codeLength3=null;
						}
					})
					
				}
				
			},
			contToggle(k){
				let len=this.code.length;
				if(k===''){
					this.code=this.code.substring(0,len-1);
					this.codeLength=this.code.length;
					return;
				}
				this.codeLength=len+1;
				this.code+=k.toString();
				console.log(this.code)
				if(this.length===len+1){
					// this.keyBoardSwitch=false;
					this.setpaystatus = 1;
					
				}
			},
			contToggle2(k){
				let len=this.code2.length;
				if(k===''){
					this.code2=this.code2.substring(0,len-1);
					this.codeLength2=this.code2.length;
					return;
				}
				this.codeLength2=len+1;
				this.code2+=k.toString();
				
				console.log(this.code2)
				if(this.length===len+1){
					this.keyBoardSwitch=false;
					
					if(this.code2 === this.code){
						let data = {
							token:uni.getStorageSync('token'),
							payment_password:this.code,
							repassword:this.code2,
							used_password:this.code3
						}
						http('/api/user/editPaymentPassword','post',data).then(res=>{
							if(res.data.status == '200'){
								this.show('QSPopupSuccess')
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/mine/mine'
									})
								},1500)
								console.log(res)
							}else{
								this.$util.showToast(res.data.msg||res.data.message);
								this.setpaystatus = 2;
								this.code=''
								this.code2=''
								this.code3=''
								this.codeLength=null;
								this.codeLength2=null;
								this.codeLength3=null;
							}
						})
						
					}else{
						this.$util.showToast('前后密码不一致，请重新设置!');
						this.setpaystatus = 2;
						this.code=''
						this.code2=''
						this.code3=''
						this.codeLength=null;
						this.codeLength2=null;
						this.codeLength3=null;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background:linear-gradient(90deg,#60bff7 0%,#00a0e9 100%);
		.index-header {
			height: 176upx;
			padding: 0 30upx;
			padding-top: 100upx;
			box-sizing: border-box;
			text-align: center;
			font-size: 40upx;
			color: #fff;
			position: relative;
			.back-icon{
				width: 25upx;
				height: 44upx;
			}
			.back-icon-wrap{
				width: 50upx;
				height: 50upx;
				position: absolute;
				left: 32upx;
				top: 106upx;
			}
			.addNew{
				position: absolute;
				right: 32upx;
				top: 110upx;
			}
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	page,.content{
		width: 100vw;
		min-height: 94vh;
		margin: 0;
		box-sizing: border-box;
		.content-title{
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			border-top: 1px solid #eeeeee;
			padding-top: 60upx;
			font-size: 32upx;
		}
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
	
	.success{
		width: 500upx;
		height: 300upx;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx;
		box-sizing: border-box;
		font-size: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		image{
			width: 56upx;
			height: 56upx;
			margin-right: 22upx;
		}
	}
</style>
