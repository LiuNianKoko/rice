<template>
	<view class="balancelist">
		<view class="itemb border_bottom disflex" v-for="item in moneyList" :key="item.id">
			<view class="record flxe-1">
				<view class="ordertxt line1" v-if="item.type==1">
					余额提现中
				</view>
				<view class="ordertxt line1" v-if="item.type==13">
					余额提现成功
				</view>
				<view class="ordertxt line1" v-if="item.type==2">
					余额提现失败
				</view>
				<view class="ordertxt line1" v-if="item.type==3 ||item.type==9||item.type==10||item.type==11">
					[商品购物]订单编号 {{item.ordernum}}
				</view>
				<view class="ordertxt line1" v-if="item.type==4">
					退款/退货退款
				</view>
				<view class="ordertxt line1" v-if="item.type==5">
					
				</view>
				<view class="ordertxt line1" v-if="item.type==6">
					余额充值
				</view>
				<view class="ordertxt line1" v-if="item.type==7 || item.type==8">
					分销收益
				</view>
				<!-- <view class="ordertxt line1" v-if="item.type==8">
					推广用户购买商品
				</view> -->
				<!-- <view class="ordertxt line1" v-if="item.type==9">
					
				</view>
				<view class="ordertxt line1" v-if="item.type==10">
					
				</view>
				<view class="ordertxt line1" v-if="item.type==11">
					
				</view> -->
				<view class="ordertxt line1" v-if="item.type==12">
					团购失败
				</view>
				<view class="time">
					{{item.createtime}}
				</view>
			</view>
			<view class="zhimy reducezhifmy" v-if="item.status == 1">
				-{{item.price}}
				
			</view>
			<view class="zhimy addzhifmy " v-if="item.status == 2">
				+{{item.price}}
			</view>
		</view>
		
	</view>
</template>

<script>
	import http from '@/api/http.js'
	export default{
		data(){
			return{
				moneyList:[],
				page:1
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			getList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/user/flowingWater','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.moneyList = res.data.data.statementList.data
					}else{
						this.$util.showToast(res.data.msg)
						return
					}
				})
			},
			getNewList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/user/flowingWater','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.statementList.last_page){
						// this.$util.showToast('没有更多了')
						return false
					}
					this.page++
					this.moneyList = this.moneyList.concat(res.data.data.statementList.data)
				})
			},
		}
	}
</script>

<style lang="scss">
	.balancelist{
		padding: 30upx;
		.itemb{
			width: 100%;
			padding: 28upx 0;
			.ordertxt{
				width: 480upx;
				color: #000000;
				font-size: 34upx;
			}
			.time{
				color: #BBBBBB;
				margin-right: 10upx;
				font-size: 26upx;
				margin-top: 13upx;
			}
		}
		.zhimy{
			// width: 120upx;
			font-size: 38upx;
		}
		.reducezhifmy{
			color: #000000;
		
		}
		.addzhifmy{
			
			color: #EFB400;
			
		}
	}
</style>
