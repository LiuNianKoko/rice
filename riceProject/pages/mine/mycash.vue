<template>
	<view >
		<view class="header-wrap">
			<view class="index-header">
				我的现金券
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toMine"></image> -->
				<view class="back-icon-wrap" @click="toMine">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="cash-wrap" v-if="cashList.length > 0">
			<view class="ticket-item" v-for="(item,i) in cashList" :key="i">
				  <view class="ticket-space">
					   <view class="ticket-price">
							￥<text>{{item.money}}</text>现金券
					   </view>
					   <text class="ticket-intr">
							订单金额满 {{item.at_least}} 可使用  \n  有效期{{item.start_time}} -- {{item.end_time}}
					   </text>
				  </view>
			</view>
		</view>
		<view class="nodata" v-else>暂无优惠券~</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				cashList:[]
			}
		},
		onLoad() {
			this.getCash()
		},
		methods:{
			getCash(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/User/getCouponList','get',data).then(res=>{
					if(res.data.status == '200'){
						this.cashList = res.data.data.couponList
					}else{
						this.$util.showToast(res.data.message)
						return
					}
					console.log(res)
				})
			},
			toMine(){
				// uni.switchTab({
				// 	url:'/pages/mine/mine'
				// })
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}
	page{
		background-color: #F2F2F5;
	}
	.cash-wrap{
		
		padding:30upx
	}
	.ticket-item{
	    margin-bottom: 26upx;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    .ticket-space{
	     width:100%;
	     height:240upx;
	     background:linear-gradient(90deg,rgba(251,65,66,1) 0%,rgba(255,110,76,1) 100%);
	     border-radius:10upx;
	     padding:20upx 40upx 30upx;
	     box-sizing: border-box;
	     display: flex;
	     flex-direction: column;
	     justify-content: space-between;
	     .ticket-price{
	      color: #FCF2B2;
	      font-size: 40upx;
	      text{
	       font-size: 72upx;
	      }
	     }
	     .ticket-intr{
	      color: #FCF2B2;
	      font-size: 24upx;
	     }
	    }
	    .ticket-select{
	     position: relative;
	     .select-img{
	      width: 30upx;
	      height: 30upx;
	      position: absolute;
	      right: 2upx;
	      top: 2upx;
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
