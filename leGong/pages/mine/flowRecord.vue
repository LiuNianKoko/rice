<template>
	<view class="content">
		<cu-custom bgColor="bgF4" :isBack="true"><block slot="backText"></block><block slot="content">消费记录</block></cu-custom>
		<view class="wraps">
			<view class="month-wrap disBetween" v-if="mineFlow">
				<view class="">
					<text v-if="isMonth">本月/</text>{{yearShow}}/{{month}}
				</view>
				<view class="disAlignCenter" @click="show('QSpop')">
					查看其它月份
					<image src="/static/right-white.png" class="right-white margingLeft10"></image>
				</view>
			</view>
			<view class="month-wrap disBetween" v-if="!mineFlow">
				<view class="">
					{{times}}
				</view>
			</view>
		</view>
		<view class="wrap">
			<view class="" v-if="list.length > 0">
				<view class="month-item" v-for="(item,index) in list" :key="index">
					<view class="disBetween marginBottom15">
						<view class="fontBold">
							{{item.nickname}}
						</view>
						<view class="color-pink fontBold">
							￥{{item.price}}
						</view>
					</view>
					<view class="disBetween" v-if="mineFlow">
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
					<view class="disBetween" v-if="!mineFlow">
						<view class="disAlignCenter">
							<view class="disCenter">
								<image src="/static/lg-level-1.png" class="lg-level"></image>
							</view>
							<view class="level">
								会员
							</view>
						</view>
						<view class="times">
							{{item.time}}
						</view>
					</view>
				</view>
			</view>
			<view class="nodata" v-else>
				暂无相关数据~
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
				times:'',
				list:[],
				page:1,
				id:0,
				mineFlow:true,//是否自己的记录
				
				year:2020,//选中年
				yearShow:2020,//选中年时展示
				month:12,//选中月
				monthBefore:12,//选择月份时展示
				isMonth:true,//是否本月
				yearNow:2020,//本年
				monthNow:10,//本月
				monthChoose:true,//true选择月份  false选择年
				yearList:[],
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.id = option.id
			if(option.times){
				this.times = option.times
				this.mineFlow = false
			}
			this.page = 1
			this.isThisMonth()
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
				if(this.mineFlow){
					this.times = this.yearShow + '-' + this.month
				}
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:1,
					time:this.times,
					id:this.id
				}
				http('/api/Users/achievement_list','post',data).then(res=>{
					if(res.code == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			getNewList(){
				if(this.mineFlow){
					this.times = this.yearShow + '-' + this.month
				}
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:this.page+1,
					time:this.times,
					id:this.id
				}
				http('/api/Users/achievement_list','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data
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
		font-size: 26upx;
		color: #fff;
		.right-white{
			width: 13upx;
			height: 24upx;
		}
	}
	.wrap{
		padding: 8upx 23upx 23upx;
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
</style>
