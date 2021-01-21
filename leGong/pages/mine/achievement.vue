<template>
	<view class="content">
		<cu-custom bgColor="bgF4" :isBack="true"><block slot="backText"></block><block slot="content">顾客业绩</block></cu-custom>
		<view class="wraps">
			<view class="month-wrap disBetween">
				<view class="">
					<text v-if="isMonth">本月/</text>{{yearShow}}/{{month}}
				</view>
				<view class="disAlignCenter" @click="show('QSpop')">
					查看其它月份
					<image src="/static/right-white.png" class="right-white margingLeft10"></image>
				</view>
			</view>
			<!-- <view class="" v-if="list.length > 0">
				<view class="month-item" v-for="(item,index) in list" :key="index">
					<view class="disBetween marginBottom15">
						<view class="fontBold">
							{{item.nickname}}
						</view>
						<view class="color-pink fontBold">
							+￥{{item.price}}
						</view>
					</view>
					<view class="disBetween">
						<view class="disAlignCenter">
							<view class="disCenter">
								<image src="/static/lg-level-1.png" class="lg-level" v-if="item.member_grade == 0"></image>
								<image src="/static/lg-level-2.png" class="lg-level" v-if="item.member_grade == 1"></image>
								<image src="/static/lg-level-3.png" class="lg-level" v-if="item.member_grade == 2"></image>
								<image src="/static/lg-level-4.png" class="lg-level" v-if="item.member_grade == 3"></image>
								<image src="/static/lg-level-5.png" class="lg-level" v-if="item.member_grade == 4"></image>
								<image src="/static/lg-level-6.png" class="lg-level" v-if="item.member_grade == 5"></image>
							</view>
							<view class="level" v-if="item.member_grade == 0">
								会员
							</view>
							<view class="level" v-if="item.member_grade == 1">
								见习推荐官
							</view>
							<view class="level" v-if="item.member_grade == 2">
								品牌推荐官
							</view>
							<view class="level" v-if="item.member_grade == 3">
								核心推荐官
							</view>
							<view class="level" v-if="item.member_grade == 4">
								首席推荐官
							</view>
							<view class="level" v-if="item.member_grade == 5">
								合伙人推荐官
							</view>
						</view>
						<view class="times">
							{{item.time}}
						</view>
					</view>
				</view>
			</view> -->
			
			<view class="wrap">
				<view class="group-wrap">
					<view class="group-box disCenter">
						<view class="group-item">
							<view class="disCenter">
								<image :src="imgUrl + 'lg-group-1.png'" class="lg-group"></image>
							</view>
							<view class="group-txt">
								总人数
							</view>
							<view class="font34 color-pink fontBold">
								{{groupData.total_count || 0}}
							</view>
						</view>
						<view class="group-line"></view>
						<view class="group-item">
							<view class="disCenter">
								<image :src="imgUrl + 'lg-group-2.png'" class="lg-group"></image>
							</view>
							<view class="group-txt">
								已消费会员
							</view>
							<view class="font34 color-pink fontBold">
								{{groupData.already_count || 0}}
							</view>
						</view>
						<view class="group-line"></view>
						<view class="group-item">
							<view class="disCenter">
								<image :src="imgUrl + 'lg-group-3.png'" class="lg-group"></image>
							</view>
							<view class="group-txt">
								未消费会员
							</view>
							<view class="font34 color-pink fontBold">
								{{groupData.not_count || 0}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="per-wrap">
				<view class="per-box" v-if="list.length > 0">
					<view class="per-item disFlex" v-for="(item,index) in list" :key="index" @click="toFlow(item)">
						<view class="headimg-wrap disCenter">
							<image :src="item.head_img" class="headimg"></image>
						</view>
						<view class="per-right width100">
							<view class="disAlignCenter wx-name-wrap">
								<view class="font24 wx-name fontBold">
									{{item.nickname}}
								</view>
								<view class="disAlignCenter">
									<view class="disCenter">
										<image src="/static/lg-level-1.png" class="lg-level" v-if="tab == 2"></image>
										<image src="/static/lg-level-2.png" class="lg-level" v-if="item.member_grade == 1"></image>
										<image src="/static/lg-level-3.png" class="lg-level" v-if="item.member_grade == 2"></image>
										<image src="/static/lg-level-4.png" class="lg-level" v-if="item.member_grade == 3"></image>
										<image src="/static/lg-level-5.png" class="lg-level" v-if="item.member_grade == 4"></image>
										<image src="/static/lg-level-6.png" class="lg-level" v-if="item.member_grade == 5"></image>
									</view>
									<view class="level" v-if="tab == 2">
										会员
									</view>
									<view class="level" v-if="item.member_grade == 1">
										见习推荐官
									</view>
									<view class="level" v-if="item.member_grade == 2">
										品牌推荐官
									</view>
									<view class="level" v-if="item.member_grade == 3">
										核心推荐官
									</view>
									<view class="level" v-if="item.member_grade == 4">
										首席推荐官
									</view>
									<view class="level" v-if="item.member_grade == 5">
										合伙人推荐官
									</view>
								</view>
							</view>
							<view class="time">
								{{item.binding_time || ''}}
							</view>
							<view class="font24 ach fontBold">
								个人消费 :  <text class="color-pink paddingLeft10">{{item.price || 0}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>
					暂无相关数据~
				</view>
			</view>
		</view>
		
		<QSPopup ref="QSpop">
			<view class="choose-month">
				<view class="choose-top text-white">
					<view class="font30" @click="changeChooseMonth">
						{{year}}
					</view>
					<view class="months" @click="changeChooseMonth">
						{{monthBefore}}月
					</view>
				</view>
				<view class="mon-box">
					<view class="mon-wrap" v-if="monthChoose">
						<view class="mon-item disCenter"  v-for="item in 12" @click="chooseDay(item)">
							<view class="mon-item-num" :class="[monthBefore == (item + 1)?'act':'',{'act-gra':actMonth(item)}]">
								{{item + 1}}
							</view>
						</view>
					</view>
					<view class="year-wrap" v-if="!monthChoose">
						<view class="year-item disCenter" v-for="item in yearList" @click="chooseYear(item)">
							<view class="year-item-num" :class="year == item?'act':''">
								{{item}}
							</view>
						</view>
					</view>
					<view class="btn-wrap">
						<view class="btn" @click="cancelDate">
							取消
						</view>
						<view class="btn" @click="sureDate">
							确定
						</view>
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	const app = getApp()
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import http from '@/api/http.js'
	export default {
		components:{QSPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				year:2020,//选中年
				yearShow:2020,//选中年时展示
				month:12,//选中月
				monthBefore:12,//选择月份时展示
				isMonth:true,//是否本月
				yearNow:2020,//本年
				monthNow:10,//本月
				monthChoose:true,//true选择月份  false选择年
				yearList:[],
				
				tab:2,
				groupData:{},
				
				list:[],
				page:1,
				
			}
		},
		onShareAppMessage() {
			
		},
		onLoad() {
			this.isThisMonth()
			this.page = 1
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			toFlow(item){
				let times = this.yearShow + '-' + this.month
				uni.navigateTo({
					url:'/pages/mine/flowRecord?id=' + item.id + '&times=' + times
				})
			},
			changeChooseMonth(){
				let count = new Date()
				let yearNow = count.getFullYear()
				let monthNow = count.getMonth()
				if(monthNow > 2)return
				this.monthChoose = !this.monthChoose
			},
			isThisMonth(){
				let count = new Date()
				this.yearNow = count.getFullYear()
				this.monthNow = count.getMonth() + 1
				this.year = this.yearNow
				this.yearShow = this.yearNow
				this.month = this.monthNow
				this.monthBefore = this.monthNow
				this.yearList = [this.year - 1,this.year]
				this.month = this.month > 9 ? this.month : '0' + this.month
			},
			chooseYear(item){
				this.year = item
				let count = new Date()
				let yearNow = count.getFullYear()
				let monthNow = count.getMonth()
				if(yearNow == this.year){
					this.monthBefore = 1
				}else{
					this.monthBefore = 12
				}
			},
			actMonth(item){
				let count = new Date()
				let yearNow = count.getFullYear()
				let monthNow = count.getMonth()
				let oldMonth = monthNow - 3
				if(monthNow == 0){
					oldMonth = 9
				}else if(monthNow == 1){
					oldMonth = 10
				}else if(monthNow == 2){
					oldMonth = 11
				}
				if(monthNow > 2 && yearNow == this.year){
					if(monthNow < item){
						return true
					}else if(oldMonth > item){
						return true
					}
				}else if(yearNow > this.year&&monthNow > 2){
					return true
				}else if(monthNow <= 2 && yearNow == this.year){
					if(monthNow < item){
						return true
					}
				}else if(yearNow > this.year&&monthNow <= 2){
					if(oldMonth > item){
						return true
					}
				}
			},
			chooseDay(item){
				let count = new Date()
				let yearNow = count.getFullYear()
				let monthNow = count.getMonth()
				let oldMonth = monthNow - 3
				if(monthNow == 0){
					oldMonth = 9
				}else if(monthNow == 1){
					oldMonth = 10
				}else if(monthNow == 2){
					oldMonth = 11
				}
				if(monthNow > 2 && yearNow == this.year){
					if(monthNow < item){
						return
					}else if(oldMonth > item){
						return
					}
				}else if(yearNow > this.year&&monthNow > 2){
					return
				}else if(monthNow <= 2 && yearNow == this.year){
					if(monthNow < item){
						return
					}
				}else if(yearNow > this.year&&monthNow <= 2){
					if(oldMonth > item){
						return
					}
				}
				this.monthBefore = item + 1
				
			},
			cancelDate(){
				// this.month = this.monthNow
				this.hides('QSpop')
			},
			sureDate(){
				this.month = this.monthBefore > 9 ? this.monthBefore : '0' + this.monthBefore
				this.yearShow = this.year
				if(this.yearShow == this.yearNow && this.month == this.monthNow){
					this.isMonth = true
				}else{
					this.isMonth = false
				}
				
				this.hides('QSpop')
				this.page = 1
				this.getList()
			},
			getList(){
				let times = this.yearShow + '-' + this.month
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:1,
					type:2,
					time:times
				}
				// /api/Users/achievement_list
				http('/api/Users/user_team','post',data).then(res=>{
					if(res.code == 200){
						this.groupData = res.data.count_data
						this.list = res.data.member_list
					}
					console.log(res)
				})
			},
			getNewList(){
				let times = this.yearShow + '-' + this.month
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:this.page+1,
					type:2,
					time:times
				}
				http('/api/Users/user_team','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data.member_list
						
						this.list = this.list.concat(newList)
						this.page++
					}
					
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f4f4f4;
	}
	.wraps{
		padding: 23upx;
	}
	.month-wrap{
		padding: 33upx 25upx;
		background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
		border-radius: 20upx;
		margin-bottom: 37upx;
		font-size: 26upx;
		color: #fff;
		.right-white{
			width: 13upx;
			height: 24upx;
		}
	}
	.month-item{
		padding: 32upx;
		background-color: #fff;
		border-radius: 20upx;
		margin-bottom: 5upx;
		.level{
			font-size: 24upx;
			color: #7D7D7D;
		}
		.times{
			font-size: 20upx;
			color: #A8A8A8;
		}
		.lg-level{
			width: 30upx;
			height: 26upx;
			margin-right: 14upx;
		}
	}
	
	.choose-month{
		width: 575upx;
		background: #fff;
		.choose-top{
			background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
			height: 190upx;
			padding: 44upx 44upx 0;
			.months{
				font-size: 52upx;
			}
		}
		.mon-box{
			padding: 50upx 30upx 80upx;
			.mon-wrap{
				display: flex;
				flex-wrap: wrap;
				.mon-item{
					font-weight: bold;
					width: 16%;
					height: 70upx;
					.mon-item-num{
						width: 50upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
						
					}
					.act{
						color: #fff;
						background-color: #ed7b8f;
						border-radius: 6upx;
					}
					.act-gra{
						color: #aaa;
					}
				}
			}
			.year-wrap{
				display: flex;
				.year-item{
					width: 50%;
					height: 70upx;
					font-weight: bold;
					.year-item-num{
						width: 100upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
					}
					.act{
						color: #fff;
						background-color: #ed7b8f;
						border-radius: 6upx;
					}
				}
			}
			.btn-wrap{
				margin-top: 50upx;
				display: flex;
				justify-content: flex-end;
				
				.btn{
					color: #1C2732;
					margin-left: 80upx;
				}
			}
		}
	}
	.wrap{
		margin-top: -12upx;
		height: 234upx;
		position: relative;
		z-index: 50;
		.group-wrap{
			padding: 0 23upx;
			background-color: #fff;
			border-radius: 20upx 20upx 0 0;
			height: 100%;
			.group-box{
				border-bottom: 6upx solid #f6f6f6;
				height: 100%;
				.group-item{
					width: 33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					.lg-group{
						width: 100upx;
						height: 93upx;
					}
					.group-txt{
						font-size: 20upx;
						color: #A0A0A0;
						margin-bottom: 4upx;
					}
				}
				.group-line{
					width: 2upx;
					height: 106upx;
					background-color: #EEEEEE;
				}
			}
			
		}
	}
	.per-wrap{
		// padding: 0 28upx;
		.per-box{
			padding:23upx;
			background-color: #fff;
			
			.per-item{
				padding: 32upx 0;
				border-bottom: 1px solid #f6f6f6;
				.headimg-wrap{
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					background: linear-gradient(90deg, #FF99D9 0%, #FFAF99 100%);
					.headimg{
						width: 116upx;
						height: 116upx;
						border-radius: 50%;
					}
				}
				.per-right{
					padding-left: 26upx;
					.wx-name-wrap{
						margin-top: 12upx;
						margin-bottom: 30upx;
					}
					.wx-name{
						margin-right: 50upx;
					}
					.level{
						font-size: 24upx;
						color: #7D7D7D;
					}
					.lg-level{
						width: 30upx;
						height: 26upx;
						margin-right: 14upx;
					}
					.time{
						font-size: 18upx;
						color: #A0A0A0;
						
					}
					.ach{
						margin-top: 24upx;
					}
				}
			}
			.per-item:last-child{
				border: none;
			}
		}
	}
</style>
