<template>
	<view class="mine-wraps">
		<view class="user-mask boxsizing">
			<view class="setxuaix">
				<navigator url="/pages/mine/myset">
					<image class="meset left" :src='imag+"meset.png"' mode="aspectFill"></image>
				</navigator>
				<navigator url="/pages/index/msg/systemMsg">
					<image class="xuaix right" :src='imag+"xinfeng-white.png"' mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="userinfo">
				<view class="avtor left disflex">
					<image class="tous" :src="userinfo.headimgurl?userinfo.headimgurl:'/static/noperson.png'" mode="aspectFill"></image>
					<!-- <image class="tous" src="/static/commentpic.png" mode=""></image> -->
					<view class="infoname">
						<text class="mainna">{{userinfo.nickname}}</text>
						<view class="funa-wrap">
							<image class="vipimg" :src='imag+"vip-logo2.png"' v-if="userinfo.vip==2||userinfo.vip==3"></image>
							<text class="funa" v-if="userinfo.vip==3">会员</text>
							<text class="funa" v-if="userinfo.vip==2">会员</text>
							<text class="funa" v-if="userinfo.vip==1">普通用户</text>
						</view>
					</view>
				</view>
				<navigator url="/pages/mine/proinfo">
					<view class="edit right">
						编辑资料
						<image class="rightarows" src="/static/toarows.png" mode="aspectFill"></image>
					</view>
				</navigator>
			</view>
		</view>
		<view class="order-mask">
			<view class="orderquy">
				<view class="btiquy border_bottom">
					<view class="bti left">我的订单</view>
					<navigator url="/pages/mine/myorderlist?type=1">
						<view class="chakdd right">查看全部订单<image class="huijt" src="/static/huijt.png" mode=""></image></view>
					</navigator>
				</view>
				<view class="disFlex bttile-wrap">
					<view class="item " @click="junporder(2)">
						<image class="otimg" :src='imag+"dafuk2.png"' mode="aspectFill"></image>
						<view class="bttile">待付款</view>
						<view class="item-num" v-if="userinfo.wait_payment>0">{{userinfo.wait_payment || 0}}</view>
					</view>
					<navigator url="/pages/mine/mySpellTeam">
						<view class="item ">
							<image class="otimg otimggroup" src='/static/groupimg.png' mode="aspectFill"></image>
							<view class="bttile">拼团</view>
							<view class="item-num" v-if="userinfo.wait_group>0">{{userinfo.wait_group || 0}}</view>
						</view>
					</navigator>
					<view class="item " @click="junporder(3)">
						<image class="otimg" :src='imag+"daifah2.png"' mode="aspectFill"></image>
						<view class="bttile">待发货</view>
						<view class="item-num" v-if="userinfo.wait_delivery>0">{{userinfo.wait_delivery || 0}}</view>
					</view>
					<view class="item " @click="junporder(4)">
						<image class="otimg" :src='imag+"daishouh2.png"' mode="aspectFill"></image>
						<view class="bttile">待收货</view>
						<view class="item-num" v-if="userinfo.wait_harvest>0">{{userinfo.wait_harvest || 0}}</view>
					</view>
					<view class="item " @click="junporder(5)">
						<image class="otimg" :src='imag+"daipj2.png"' mode="aspectFill"></image>
						<view class="bttile">待评价</view>
						<view class="item-num" v-if="userinfo.wait_evaluate>0">{{userinfo.wait_evaluate || 0}}</view>
					</view>
					<view class="item" @click="junporder(6)">
						<image class="otimg" :src='imag+"renminbi2.png"' mode="aspectFill"></image>
						<view class="bttile">售后</view>
						<view class="item-num" v-if="userinfo.wait_service>0">{{userinfo.wait_service || 0}}</view>
					</view>
					
				</view>
			</view>
			<view class="borfive">
				<!-- <navigator url="/pages/mine/mywallet">
					<view class="felie-item boxsizing border_bottom borfivtop">
						<view class="left bti">
							我的钱包
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator> -->
				<navigator url="/pages/mine/mycash">
					<view class="felie-item boxsizing borfivbottom  border_bottom">
						<view class="left bti">
							我的现金券
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="contact" class="felie-item boxsizing borfivbottom border-none">
					<!-- <view class="felie-item boxsizing borfivbottom"> -->
						<view class="left bti">
							联系客服
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					<!-- </view> -->
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="felie-item boxsizing borfivbottom" @click="callPhone">
					<view class="left bti">
						联系客服
					</view>
					<view class="right txtjt">
						<image class="huijt" src="/static/huijt.png" mode=""></image>
					</view>
				</view>
				<!-- #endif -->
				
			</view>
			<view class="borfive">
				<navigator url="/pages/index/address/address">
					<view class="felie-item boxsizing border_bottom borfiveborder">
						<view class="left bti">
							我的地址
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator>
				<view class="felie-item boxsizing borfivbottom" @click="toSet">
					<view class="left bti">
						设置支付密码
					</view>
					<view class="right txtjt">
						<image class="huijt" src="/static/huijt.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="borfive">
				<!-- <navigator url="/pages/mine/mySpellTeam">
					<view class="felie-item boxsizing borfivtop border_bottom">
						<view class="left bti">
							我的拼团
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator> -->
				<navigator url="/pages/mine/mycollect">
					<view class="felie-item boxsizing borfivtop border_bottom">
						<view class="left bti">
							我的收藏
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/mine/loadapp">
					<view class="felie-item boxsizing ">
						<view class="left bti">
							下载APP
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator>
			</view>
			<!-- <view class="borfive">
				<navigator url="/pages/mine/loadapp">
					<view class="felie-item boxsizing borfiveborder">
						<view class="left bti">
							下载APP
						</view>
						<view class="right txtjt">
							<image class="huijt" src="/static/huijt.png" mode=""></image>
						</view>
					</view>
				</navigator>
			</view> -->
		</view>
		
		<!-- 客服弹窗 -->
		<QSPopup ref="QSPopupkefu">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					<view class="del-text2">
						联系客服
					</view>
					<view class="del-text3">
						是否拨打客服电话?
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="hides('QSPopupkefu')">
						取消
					</view>
					<view class="del-btn-yes" @tap="callPhone">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
		
		<!-- 登录确认弹窗 -->
		<QSPopup ref="QSPopuplogin" :tapMaskHide="false">
			<view class="content-del">
				<view class="del-text scale-1px-bottom">
					<view class="del-text2">
						您暂未登录
					</view>
					<view class="del-text3">
						登录发现更多精彩
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-no" @tap="toIndex">
						取消
					</view>
					<view class="del-btn-yes" @tap="toLogin">
						去登录
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	const app = getApp();
export default {
	components:{QSPopup},
	data() {
		return {
			imag: app.globalData.imag,
			userinfo:{},
			list:[
				{
					count:11,
					name:112
				},
				{
					count:11,
					name:112
				}
			],
			phone:'',
			cid:''
		}
	},
	onLoad(){
		this.cid = uni.getStorageSync('cid')
		this.getcid()
		
		// this.getuser();
		// this.getPhone()
		
	},
	onShow() {
		this.getuser();
		// this.isLogon()
		// #ifdef APP-PLUS
		if(!this.cid){
			setTimeout(()=>{
				this.cid = plus.push.getClientInfo().clientid
				this.getcid()
			},1000)
		}
		// #endif
	},
	methods:{
		getcid(){
			let data = {
				token:uni.getStorageSync('token'),
				cid:this.cid
			}
			http('/api/user/set_user_push', 'post',data).then(res => {
				if(res.data.status == '200'){
					console.log('success')
				}else{
					console.log('fail')
				}
			})
		},
		show(ref) {
			this.$refs[ref].show();
		},
		hides(ref) {
			this.$refs[ref].hide();
		},
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
			this.hides('QSPopuplogin')
		},
		toLogin(){
			uni.navigateTo({
				url:'/pages/index/logon/logon'
			})
			this.hides('QSPopuplogin')
		},
		isLogon(){
			if(!uni.getStorageSync('token')){
				this.show('QSPopuplogin')
			}
			if(uni.getStorageSync('token')){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/get_userinfo','get',data).then(res=>{
					if(res.data.status == '200'){
						
					}else{
						this.$util.showToast('登录信息已过期，请重新登录')
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/index/logon/logon'
							})
						},1500)
					}
					console.log(res)
				})
			}
		},
		getuser(){
			let data = {
				token:uni.getStorageSync('token')
			}
			http('/api/User/get_userinfo','post',data).then(res=>{
				this.isLogon()
				this.$util.setStorage('phone',res.data.data.phone)
				// this.$util.setStorage('uid',res.data.data.id)
				this.userinfo = res.data.data;
				console.log(res)
			})
		},
		junporder(type){
			uni.navigateTo({
				url:'/pages/mine/myorderlist?type='+type
			})
		},
		getPhone(){
			http('/api/Setting/servicePhone','post').then(res=>{
				if(res.data.status == '200'){
					this.phone = res.data.data.service_phone
				}
				console.log(res)
			})
		},
		toSet(){
			if(this.userinfo.is_payment_password == 0){
				uni.navigateTo({
					url:"/pages/mine/setpaypwd"
				})
			}else if(this.userinfo.is_payment_password == 1){
				uni.navigateTo({
					url:"/pages/mine/resetpaypwd"
				})
			}
			
		},
		callPhone(){
			// let that = this
			// uni.makePhoneCall({
			 	
			//  	// 手机号
			//     phoneNumber:that.phone, 
			
			// 	// 成功回调
			// 	success: (res) => {
			// 		console.log('调用成功!')	
			// 	},
			
			// 	// 失败回调
			// 	fail: (res) => {
			// 		console.log('调用失败!')
			// 	}
				
			// })
			// that.hides('QSPopupkefu')
			uni.navigateTo({
				url: '/pages/index/totalList?kefu=kefu'
			})
			
		},
	}
};
</script>

<style lang="scss">
	page{
		background-color: #F2F2F5;
	}
	.borfive{
		margin-top: 30upx;
	}
	.borfiveborder{
		
		border-radius: 5px;
	}
	.borfivtop{
		border-radius: 5px 5px 0 0;
	}
	.borfivbottom{
		border-radius: 0 0 7px 7px;
	}
	.huijt{
		width: 34upx;
		height: 34upx;
		vertical-align: bottom;
		margin-top: 15px
	}
	.felie-item{
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		background-color: #FFFFFF;
		padding: 0 30upx;
		.bti{
			font-size: 28upx;
			color: #000000
		}
	}
	.border-none::after{
		border: none;
	}
	.order-mask{
		padding:30upx;
		margin-top: -150upx;
	}
	.bttile-wrap{
		justify-content: space-between;
	}
	.orderquy{
		padding:10upx 30upx;
		border-radius: 5px;
		background-color: #FFFFFF;
		.item{
			text-align: center;
			margin: 20upx 0;
			position: relative;
			.item-num{
				width: 36upx;
				height: 36upx;
				position: absolute;
				top: -4upx;
				right: -4upx;
				border: 1px solid #F84949;
				border-radius: 50%;
				color: #F84949;
				text-align: center;
				line-height: 36upx;
				font-size: 24upx;
				background-color: #FFFFFF;
			}
		}
		.btiquy{
			overflow: hidden;
			height: 80upx;
			line-height: 80upx;
			.chakdd{
				font-size: 30upx;
				color:#BBBBBB;
				image{
					display: inline-block;
					width: 26upx;
					height: 26upx;
					margin-top: 0;
					vertical-align: middle;
					margin-left: 8upx;
				}
			}
			.bti{
				font-size: 34upx;
				color: #000000
			}
			
		}
		.otimg{
			width: 80upx;
			height: 80upx;
			margin:0 auto
		}
		.otimggroup{
			width: 98upx;
			height: 80upx;
		}
		.bttile{
			font-size: 28upx;
			color: #000000;
			text-align: center;
		}
	}
.user-mask {
	padding: 30upx;
	width: 100%;
	height: 560upx;
	background: linear-gradient(0deg,#00a0e9 0%,#61c2ef 100%);
	.setxuaix {
		overflow: hidden;
		margin-top: 70upx;
		.meset {
			width: 50upx;
			height: 50upx;
		}
		.xuaix {
			width: 50upx;
			height: 50upx;
		}
	}
}
.userinfo {
	margin-top: 80upx;
	.edit {
		font-size: 32upx;
		color: #ffffff;
		margin-top: 20upx;
		.rightarows {
			width: 26upx;
			height: 26upx;
			display: inline-block;
			margin-left: 10upx;
			vertical-align: middle;
			margin-top: -4upx;
		}
	}
	.tous {
		width: 135upx;
		height: 135upx;
		clear: both;
		border: 1px solid #ffffff;
		border-radius: 50%;
	}
	.mainna {
		display: block;
		font-size: 36upx;
		color: #ffffff;
		margin-left: 16upx;
		margin-top: 16upx;
	}
	.funa-wrap{
		display: flex;
		align-items: center;
		margin-left: 14upx;
		margin-top: 20upx;
		.vipimg{
			width:44upx;
			height: 44upx;
		}
	}
	.funa {
		// font-size: 32upx;
		color: #fff;
		
		
		/* #ifdef APP-PLUS */
		margin-top: 20upx;
		/* #endif */
		display: block;
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
				font-size: 36upx;
				text-align: center;
				margin-top: 20upx;
				color: #333;
			}
			.del-text3{
				color: #999;
				text-align: center;
				margin-top: 20upx;
				
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			.del-btn-no{
				border-right: 1px solid #e5e5e5;
				color: #999;
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
