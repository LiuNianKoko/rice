<template>
	<view>
		<view class="become-header">
			购买以下商品即可成为会员
		</view>
		<view class="recomon" v-if="memberList.length>0">
			<view class="recomon-main disFlex">
				<view class="recomon-item marginBottom20" v-for="item in memberList" :key="item.id" @click="toDetail(item.id)">
					<image :src="item.cover" alt=""></image>
					<view class="recomon-text">
						<view class="recomon-title line1">
							{{item.goods_name}}
						</view>
						<view class=" recomon-intr line1">
							{{item.desc}}
						</view>
						<view class="recomon-price-wrap disFlex">
							<view class="recomon-price">
								<text class="symbol">￥</text>
								{{item.price}}
							</view>
							<!-- <view class="pri-num">
								月销2000
							</view> -->
							<image class="gouwuche" src="/static/gouwuche2.png"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- <view class="blank"></view>
		<view class="phone-btn disFlex" @click="callPhone">
			<image src="/static/dianhua.png"></image>
			<view class="phone-text">
				拨打客服
			</view>
		</view> -->
		<!-- 申请大农户弹窗 -->
		<!-- <QSPopup ref="QSPopup">
			<view class="content">
				<view class="del-text scale-1px-bottom">
					<view class="del-text1">
						提示
					</view>
					<view class="del-text2">
						提交申请成功，稍后会有客服人  员联系您，请注意电话信息！
					</view>
				</view>
				<view class="del-btn">
					<view class="del-btn-yes" @tap="hides('QSPopup')">
						确认
					</view>
				</view>
			</view>
		</QSPopup> -->
		<view class="nodata" v-else>暂无数据~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default{
		components:{QSPopup},
		data(){
			return{
				memberList:[],    //会员商品列表
				phone:''
			}
		},
		onLoad() {
			this.getList()
			this.getPhone()
		},
		onNavigationBarButtonTap() {
			this.show('QSPopup')
		},
	
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			toDetail(id){
				uni.navigateTo({
					url:'/pages/index/detail?goodsid=' + id+'&member=member'
				})
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			getPhone(){
				http('/api/Setting/servicePhone','post').then(res=>{
					if(res.data.status == '200'){
						this.phone = res.data.data.service_phone
					}
					console.log(res)
				})
			},
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					is_special:1
				}
				http('/api/Goods/getMemberGoodsList','post',data).then(res=>{
					if(res.data.status == '200'){
						this.memberList= res.data.data.goodsList.data
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
					console.log(res)
				})
			},
			
			callPhone(){
				let that = this
				uni.showModal({
				    title: '拨打客服',
				    content: '是否确认拨打客服电话',
					cancelColor:'#bbbbbb',
					confirmColor:'#FB4142',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.makePhoneCall({
							 	
							 	// 手机号
							    phoneNumber:that.phone, 
							
								// 成功回调
								success: (res) => {
									console.log('调用成功!')	
								},
							
								// 失败回调
								fail: (res) => {
									console.log('调用失败!')
								}
								
							  })
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	.become-header{
		font-size:36upx;
		font-weight: bold;
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		border-top: 1px solid #eeeeee;
	}
	.recomon{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		.recomon-main{
			// margin-top: 30upx;
			justify-content: space-between;
			flex-wrap: wrap;
			.recomon-item{
				width:335upx;
				// height:500upx;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:10upx;
				image{
					width: 335upx;
					height: 335upx;
				}
				.recomon-text{
					padding: 25upx 20upx;
					.recomon-title{
						width:279upx;
						// height:36upx;
						font-size:32upx;
						line-height: 40upx;
						// font-weight:bold;
						color:#333;
						margin-bottom: 4upx;
					}
					.recomon-intr{
						width:259upx;
						// height:24upx;
						// line-height: 24upx;
						line-height: 30upx;
						font-size:24upx;
						color:#939393;
						margin-bottom: 30upx;
					}
					.recomon-price-wrap{
						justify-content: space-between;
						// height: 30upx;
						width: 100%;
						position: relative;
						.recomon-price{
							font-weight:bold;
							color:#ec614a;
							font-size: 36upx;
							.symbol{
								font-size: 24upx;
							}
						}
						.pri-num{
							font-size: 24upx;
						}
						.gouwuche{
							border-radius: 50%;
							width: 58upx;
							height: 56upx;
							position: absolute;
							top: -8upx;
							right: -6upx;
							// margin-right: 8upx;
						}
					}
				}
			}
		}
	}
	// .blank{
	// 	width: 100%;
	// 	height: 100upx;
	// }
	// .phone-btn{
	// 	width:100%;
	// 	height:100upx;
	// 	background:rgba(69,180,67,1);
	// 	position: fixed;
	// 	bottom: 0;
	// 	left: 0;
	// 	justify-content: center;
	// 	align-items: center;
	// 	image{
	// 		width: 42upx;
	// 		height: 42upx;
	// 	}
	// 	.phone-text{
	// 		font-size: 36upx;
	// 		color: #ffffff;
	// 		margin-left: 14upx;
	// 	}
	// }
	
	.content{
		height: 360upx;
		width: 670upx;
		background-color: white;
		border-radius: 10upx;
		.del-text{
			padding:50upx 100upx;
			height: 259upx;
			box-sizing: border-box;
			.del-text1{
				font-size: 40upx;
				font-weight: bold;
				text-align: center;
			}
			.del-text2{
				font-size: 32upx;
				text-align: center;
				margin-top: 24upx;
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			
			.del-btn-yes{
				color: #FB4142;
				font-size: 32upx;
				flex: 1;
				text-align: center;
			}
		}
	}
	.nodata {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #aaaaaa;
		font-size: 30upx;
	}
</style>
