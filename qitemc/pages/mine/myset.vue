<template>
	<view class="set_wrap">
		<navigator url="/pages/mine/set/otherPhone">
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					更换绑定手机号
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</navigator>
		<navigator url="/pages/mine/forgetpaypwd?forgettype=2">
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					修改登录密码
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</navigator>
		<navigator url="/pages/mine/set/suggestion">
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					意见反馈
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</navigator>
		<navigator url="/pages/mine/set/usehelp">
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					使用帮助
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</navigator>
		<navigator url="/pages/mine/set/about">
			<view class="nav-item border_bottom">
				<view class="txtlabel left">
					关于我们
				</view>
				<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
			</view>
		</navigator>
		
		<view class="nav-item border_bottom" @click="clear">
			<view class="txtlabel left">
				清除缓存
			</view>
			<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="nav-item border_bottom">
			<view class="txtlabel left">
				版本信息
			</view>
			<!-- <image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image> -->
			<view class="txtlabel right">
				V{{version}}
			</view>
		</view>
		<view class="nav-item border_bottom" @click="show('QSPopup')">
			<view class="txtlabel left">
				检查更新
			</view>
			<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image>
		</view>
		<!-- #endif -->
		
		<view class="nav-item quit" @click="loginOut">
			<view class="txtlabel quit-text">
				退出登录
			</view>
<!-- 		<image class="arrow right" src="/static/huijt.png" mode="aspectFill"></image> -->		
		</view>
		<!-- 检查更新弹窗 -->
		<QSPopup ref="QSPopup">
			<view class="content-del" v-if="renew">
				<view class="del-text scale-1px-bottom">
					<view class="del-text2">
						有新的版本可更新 
					</view>
					<view class="del-text2">
						版本信息 <text>V1.2.0</text>
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="hides('QSPopup')">
						取消
					</view>
					<view class="del-btn-yes" @tap="hides('QSPopup')">
						确认
					</view>
				</view>
			</view>
			<view class="content-del" v-if="!renew">
				<view class="del-text scale-1px-bottom">
					<view class="del-text2">
						当前是最新版本
					</view>
					<view class="del-text2">
						无需更新
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="hides('QSPopup')">
						取消
					</view>
					<view class="del-btn-yes" @tap="hides('QSPopup')">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>
<script>
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default{
		components:{QSPopup},
		data(){
			return{
				renew:false,  //检查更新状态
				version:'1.0.0'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.getversion()
			// #endif
		},
		methods:{
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			clear(){
				uni.setStorageSync('selectArr',[]);
				uni.showToast({
					title:'清除缓存成功!',
					icon:'none',
					duration:2000
				})
			},
			getversion(){
				let version = plus.runtime.version
				this.version = version
			},
			loginOut(){
				uni.setStorageSync('token','');
				uni.setStorageSync('selectArr',[]);
				uni.navigateTo({
					url:'/pages/index/logon/logon'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.set_wrap{
		padding:0 30upx;
		.nav-item{
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			
			.txtlabel{
				color: #000000;
				font-size: 36upx;
			}
			.arrow{
				width: 34upx;
				height: 34upx;
				margin-top: 30upx;
			}
		}
		.quit{
			margin-top: 80upx;
			background:#00a0e9;
			border-radius:10upx;
			.quit-text{
				text-align: center;
				color: #ffffff;
			}
		}
	}
	
	.content-del{
		height: 360upx;
		width: 670upx;
		background-color: white;
		border-radius: 20upx;
		.del-text{
			padding:60upx 20upx;
			height: 259upx;
			box-sizing: border-box;
			.del-text2{
				font-size: 32upx;
				text-align: center;
				margin-top: 20upx;
				text{
					font-size: 32upx;
					color: #FB4142;
				}
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			.del-btn-no{
				border-right: 1px solid #e5e5e5;
				color: #aaa;
				font-size: 32upx;
				flex: 1;
				text-align: center;
			}
			.del-btn-yes{
				color: #FB4142;
				font-size: 32upx;
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
