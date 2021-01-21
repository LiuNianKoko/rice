<template>
	<view>
		<view class="wrap">
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					昵称
				</view>
				<input type="text" class="inputs width100" maxlength="10" placeholder="输入昵称" v-model="nickname" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					密码
				</view>
				<input type="password" class="inputs width100" placeholder="输入登录密码" v-model="password1" placeholder-class="inputs-pla"/>
			</view>
			<view class="inputs-wrap disAlignCenter">
				<view class="inputs-left">
					确认密码
				</view>
				<input type="password" class="inputs width100" placeholder="确认登录密码" v-model="password2" placeholder-class="inputs-pla"/>
			</view>
			<view class="font26 color-gray">
				密码长度6-32位。只能输入数字英文组合区分大小写
			</view>
			<view class="btn disCenter" @click="showQs">
				确认提交
			</view>
		</view>
		<QSPopup ref="QSPop">
			<view class="qs-content">
				<view class="qs-top text-center">
					<view class="fontBold marginBottom20">
						您的申请已提交!
					</view>
					<view class="">
						审核结果将以短信的形式发到您
						的手机上，请注意查收
					</view>
				</view>
				<view class="font32 color-steel text-center paddingTop20 paddingBottom20" @click="hideQs">
					好的
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				password1:'',
				password2:'',
				phone:'',
				code:'',
				nickname:''
			}
		},
		onLoad(option) {
			this.nickname = option.nickname
			this.phone = option.phone
			this.code = option.code
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			showQs(){
				if(this.nickname==''){
					this.$util.showToast('请输入昵称')
					return
				}
				if(this.password1==''){
					this.$util.showToast('请输入密码')
					return
				}
				if(this.password2==''){
					this.$util.showToast('请确认密码')
					return
				}
				let reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/)
				if(reg.test(this.password1)){
					if(this.password1 != this.password2){
						this.$util.showToast('密码不一致')
						return
					}
					this.log()
				}else{
					this.$util.showToast('密码格式为6-32位数字英文组合')
				}
				
			},
			log(){
				let data = {
					phone:this.phone,
					code:this.code,
					type:1,
					password:this.password1,
					repassword:this.password2,
					nickname:this.nickname
				}
				http('/api/Login/register','post',data).then(res=>{
					if(res.status == 200){
						// this.show('QSPop')
						uni.showToast({
							title:'注册成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},1200)
					}else{
						uni.showToast({
							title:res.message|| res.msg,
							icon:'none'
						})
					}
					console.log(res)
				})
			},
			hideQs(){
				this.hides('QSPop')
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 32upx;
	}
	.inputs-wrap{
		height: 90upx;
		border: 1px solid #DEDEDE;
		border-radius: 4upx;
		padding: 10upx 23upx 10upx 30upx;
		margin-bottom: 32upx;
		.inputs-left{
			color: #31323C;
			font-size: 30upx;
			width: 140upx;
			flex: none;
		}
		.inputs{
			font-size: 26upx;
			color: #333;
		}
		.inputs-pla{
			color: #CCCCCC;
		}
	}
	
	
	.btn{
		background:#181C62;
		height: 90upx;
		border-radius: 10upx;
		color: #fff;
		font-size: 32upx;
		margin-top: 45upx;
	}
	.qs-content{
		width: 520upx;
		background-color: #fff;
		box-shadow: 1px 6upx 30upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		.qs-top{
			padding: 30upx 66upx 45upx;
			border-bottom: 1px solid #E5E5E5;
		}
	}
</style>
