<template>
	<view class="seckill-wraps">
		<view class="header-wrap">
			<view class="index-header">
				整点秒杀
				
				<!-- <image class="back-icon" src="/static/back-icon.png" @click="toIndex"></image> -->
				<view class="back-icon-wrap" @click="toIndex">
					<image class="back-icon" src="/static/back-icon.png" ></image>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="seckill-main">
			<view class="seckill-tab">
				<view class="tab-item" :class="current==index?'active':''" v-for="(item,index) in items" :key="index" @tap="changetab(index)">
					{{item}}
					<view class="line" v-if="current==index"></view>
				</view>
			</view>
			<!-- 历史销量 -->
			<view class="sale-num sale-main" v-show="current==0">
				<view class="open" v-if="seckillList.length>0">
					<view class="open-main marginTop20">
						<view class="open-item marginBottom20 disFlex" v-for="item in seckillList" :key="item.id">
							<image :src="item.cover" alt=""></image>
							<view class="open-text">
								<view class="open-title line1 marginBottom5">
									{{item.goods_name}}
								</view>
								<view class=" open-intr line1 marginBottom5">
									{{item.desc}}
								</view>
								<view class="open-have">
									<view class="progress-box">
										<progress percent="100" activeColor="#F84949" active stroke-width="6" />
									</view>
								</view>
								<view class="open-status">
									已抢完  还剩0件  
								</view>
								<view class="disFlex open-vip-wrap">
									<view class="open-vip-price ">￥{{item.price}}</view>
								</view>
								<view class="open-price disFlex">
									
									<!-- <text class="open-cost-price">￥{{item.price}}</text> -->
									<view class="spell-price-x disFlex">
										<text class="symbol">￥</text>
										<text class="spell-cost-price">{{item.reveal_price}}</text>
										<image class="recomon-price-img" src="/static/member-man2.png" ></image>
									</view>
									<view class="end-wrap">
										<!-- {{item.end_time_date}}结束 -->
									</view>
									<!-- <text class="open-old-price margingLeft10">￥568</text> -->
								</view>
								
								
							</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无数据~</view>
			</view>
			<!-- 正在疯抢 -->
			<view class="sale-now sale-main" v-show="current==1">
				<view v-if="seckillList.length>0">
					<view class="downtime">
						<!-- <text>{{seckill.name}}</text>  &nbsp;&nbsp; 距离结束：<text>{{hr}}:{{min}}:{{sec}}</text> -->
						距离结束：<text class="downtime-x">{{hr}} : {{min}} : {{sec}}</text>
					</view>
					<view class="open" >
						<view class="open-main marginTop20">
							<view class="open-item marginBottom20 disFlex" v-for="item in seckillList" :key="item.id" @click="toDetail(item.id)">
								<image :src="item.cover" alt=""></image>
								<view class="open-text">
									<view class="open-title line1 marginBottom5">
										{{item.goods_name}}
									</view>
									<view class=" open-intr line1 marginBottom5">
										{{item.desc}}
									</view>
									
									<view class="open-have marginTop10">
										<view class="progress-box">
											<progress :percent="item.contrast" activeColor="#F84949" active stroke-width="6" />
										</view>
									</view>
									<view class="open-status">
										已抢{{item.surplus_num}}件  还剩<text>{{item.surplus_number}}</text>件  
									</view>
									<view class="immed-wrap disFlex" >
										<view class="open-vip-price">￥{{item.price}}</view>
										<view class="open-immed common-immed">
											<text>立即抢购</text>
										</view>
									</view>
									<view class="open-price disFlex">
										<!-- <text class="open-cost-price">￥{{item.reveal_price}}</text> -->
										<view class="spell-price-x disFlex">
											<text class="symbol">￥</text>
											<text class="spell-cost-price">{{item.reveal_price}}</text>
											<image class="recomon-price-img" src="/static/member-man2.png" ></image>
										</view>
										<view class="end-wrap">
											<!-- {{item.end_time_date}}结束 -->
										</view>
									</view>
									
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
				<view class="nodata" v-else>暂无数据~</view>
			</view>
			<!-- 下期预告 -->
			<view class="sale-next sale-main" v-show="current==2">
				<view v-if="seckillList.length>0">
					<!-- <view class="count-down">
						<text>{{seckill.name}}</text>  &nbsp;&nbsp; 距开始：<text>{{hr}}:{{min}}:{{sec}}</text>
					</view> -->
					<view class="downtime">
						距离开始：<text class="downtime-x">{{hr}} : {{min}} : {{sec}}</text>
					</view>
					<view class="open">
						<view class="open-main marginTop20">
							<view class="open-item marginBottom20 disFlex" v-for="item in seckillList" :key="item.id">
								<image :src="item.cover" alt=""></image>
								<view class="open-text" @click="toDetail(item.id)">
									<view class="open-title line1">
										{{item.goods_name}}
									</view>
									<view class=" open-intr line1 marginBottom10">
										{{item.desc}}
									</view>
									<view class="open-next-limit">
										限量{{item.restricted_number}}件  下期{{item.start_time}}开始  
									</view>
									<view class="immed-wrap disFlex">
										<view class="open-vip-price">￥{{item.price}}</view>
										<view class="open-immed common-immed" @click.stop="remind(item.id)">
											<text>提醒我</text>
										</view>
									</view>
									<view class="open-price disFlex ">
										<!-- <text class="open-cost-price">￥{{item.price}}</text> -->
										<view class="spell-price-x disFlex">
											<text class="symbol">￥</text>
											<text class="spell-cost-price">{{item.reveal_price}}</text>
											<image class="recomon-price-img" src="/static/member-man2.png" ></image>
										</view>
										<view class="end-wrap">
											<!-- {{item.end_time_date}}开始 -->
										</view>
									</view>
									<!-- <view class="open-old-price marginTop20">
										￥568
									</view> -->
									
									
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-else>暂无数据~</view>
			</view>
		</view>
		<QSPopup ref="QSPopupSuccess">
			<view class="success">
				<view class="sure1">
					设置提醒成功
				</view>
				<view class="sure2" @click="hides('QSPopupSuccess')">
					确认
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	export default {
		components:{QSPopup},
		data() {
			return {
				items:['历史销量','正在疯抢','下期预告'],
				current:1,		// 2下期预告=未开始   1正在疯抢=正在进行   0历史销量=过期
				hr: 0,
				min: 0,
				sec: 0,
				endTime:0,     //结束时间戳
				startTime:0,
				page:1,
				seckillList:[],
				seckill:{},
				currType:2,		// 1未开始 2正在进行 3过期
				// progressd:0,	//进度完成数
				// alreadyrob:0,	//已抢
				// surplus:0	//剩余
			}
		},
		onLoad(){
			this.getList()
			
		
		},
		onShow() {
			setInterval(()=>{
				this.countdown()
			},1000)
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			changetab(i){
				this.current = i
				this.seckillList = []
				this.getList()
			},
			remind(id){
				let data = {
					token:uni.getStorageSync('token'),
					seckil_id:id
				}
				http('/api/spike/spike_remind','post',data).then(res=>{
					console.log(res)
					if(res.data.status == '200'){
						this.show('QSPopupSuccess')
					}else{
						this.$util.showToast(res.data.message)
					}
				})
				
			},
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			toDetail(id){
				if(this.current==1){
					// if(this.surplus<=0){
					// 	this.$util.showToast('商品秒杀完毕')
					// 	return
					// }
					uni.navigateTo({
						url:'/pages/index/seckillBuy?seckillid='+id+'&isCur=1'
					})
				}
				if(this.current == 2){
					uni.navigateTo({
						url:'/pages/index/seckillBuy?seckillid='+id+'&isCur=2'
					})
				}
			},
			countdown(){
				if(this.current==1){
					const end = this.endTime *1000
					const now = Date.parse(new Date())
					const msec = end - now;
					if (msec <= 0) {
					        return false;
					     }
					let day = parseInt(msec / 1000 / 60 / 60 / 24);
					let hr = parseInt((msec / 1000 / 60 / 60) % 24);
					let min = parseInt((msec / 1000 / 60) % 60);
					let sec = parseInt((msec / 1000) % 60);
					this.hr = hr > 9 ? hr : '0' + hr;
					this.min = min > 9 ? min : '0' + min;
					this.sec = sec > 9 ? sec : '0' + sec;
				}
				if(this.current==2){
					const end = this.startTime *1000
					const now = Date.parse(new Date())
					const msec = end - now;
					// console.log(msec)
					if (msec <= 0) {
					        return false;
					     }
					let day = parseInt(msec / 1000 / 60 / 60 / 24);
					let hr = parseInt((msec / 1000 / 60 / 60) % 24);
					let min = parseInt((msec / 1000 / 60) % 60);
					let sec = parseInt((msec / 1000) % 60);
					this.hr = hr > 9 ? hr : '0' + hr;
					this.min = min > 9 ? min : '0' + min;
					this.sec = sec > 9 ? sec : '0' + sec;
				}
				
			},
			getList(){
				if(this.current==0){
					this.currType=3
				}
				if(this.current==1){
					this.currType=2
				}
				if(this.current==2){
					this.currType=1
				}
				
				let data = {
					token:uni.getStorageSync('token'),
					type:this.currType
				}
				http('/Api/Spike/SpikeLists','post',data).then(res=>{
					if(res.data.status == '200'){
						this.seckillList = res.data.data.spikeLists.data
						
						if(res.data.data.seckill_category){
							this.seckill = res.data.data.seckill_category
							this.endTime = res.data.data.seckill_category.end_time
							this.startTime = res.data.data.seckill_category.start_time
						}
						// this.seckillList.map((item)=>{
						// 	this.alreadyrob =parseInt(item.restricted_number) - parseInt(item.surplus_number)
						// 	this.surplus = item.surplus_number
						// 	this.progressd = ((this.alreadyrob / parseInt(item.restricted_number)) * 100).toFixed(0)
						// })
					}
					console.log(res)
				})
			},
			getNewList(){
				if(this.current==0){
					this.currType=3
				}
				if(this.current==1){
					this.currType=2
				}
				if(this.current==2){
					this.currType=1
				}
				let data = {
					token:uni.getStorageSync('token'),
					type:this.currType,
					page:this.page+1
				}
				http('/Api/Spike/SpikeLists','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.spikeLists.last_page){
						this.$util.showToast('没有更多了')
						return
					}
					this.page++
					this.seckillList = this.seckillList.concat(res.data.data.spikeLists.data)
				})
			},
		}
	}
</script>

<style lang="less">
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		// background:linear-gradient(90deg,rgba(69,180,67,1) 0%,rgba(122,205,121,1) 100%);
		background:linear-gradient(90deg,#00a0e9 0%,#61c2ef 100%);
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
	.active{
		font-size: 32upx;
		font-weight: bold;
	}
	.count-down{
		padding: 30upx 0;
		text-align: center;
		text{
			color: #F84949;
			margin-right: 16upx;
		}
	}
	.common-immed{
		position: absolute;
		right: 0;
		bottom: 22upx;
		width:146upx;
		height:46upx;
		line-height: 46upx;
		background:#00a0e9;
		// box-shadow:0px 10upx 10upx 0px #00a0e9;
		border-radius:27upx;
		text-align: center;
		text{
			font-size:24upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
	.seckill-main{
		padding: 0 30upx;
		.seckill-tab{
			height: 100upx;
			padding: 0 70upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tab-item{
				position: relative;
				.line{
					width:124upx;
					height:6upx;
					background:rgba(248,73,73,1);
					border-radius:3upx;
					position: absolute;
					bottom: -20upx;
				}
			}
		}
		.open-vip-wrap{
			margin-bottom: 2upx;
			margin-top: 8upx;
		}
		.immed-wrap{
			justify-content: space-between;
			align-items: center;
			margin-bottom: 6upx;
			margin-top:18upx;
		}
		.sale-main{
			.open{
				.open-item{
					position: relative;
					image{
						width: 254upx;
						height: 254upx;
					}
					.open-immed{
						// right: 0;
						// bottom: 10upx;
					}
					.open-text{
						width: 410upx;
						// height: 280upx;
						padding-left: 20upx;
						.open-title{
							width:383upx;
							font-size:32upx;
							// font-weight:bold;
							margin-bottom: 6upx;
							color:#333;
						}
						.open-intr{
							width:311upx;
							font-size:24upx;
							color:#939393;
						}
						.open-price{
							color:  #ec614a;
							
							.spell-price-x{
								align-items: flex-end;
								line-height: 32upx;
							}
							.spell-cost-price{
								font-size:36upx;
								font-weight:bold;
								// color:rgba(248,73,73,1);
							}
							.symbol{
								font-size: 24upx;
								line-height: 24upx;
							}
							.recomon-price-img{
								width: 68upx;
								height: 30upx;
								margin-left: 4upx;
								
							}
						}
						.open-vip-price{
							font-size:24upx;
							font-weight: bold;
							// color:rgba(248,73,73,1);
							// background-color: #dadada;
							// border-radius: 20upx;
							// padding: 4upx 12upx;
						}
						// 正在疯抢
						.open-have{
							margin-top: 14upx;
							width: 280upx;
							margin-bottom: 4upx;
						}
						.open-status{
							// margin-top: 20upx;
							color: #bbb;
							font-size: 24upx;
							letter-spacing: 2upx;
							text{
								font-size: 24upx;
								color:  #ec614a;
								font-weight: bold;
							}
						}
						// 下期预告
						.open-next-limit{
							font-size: 24upx;
							margin-bottom: 38upx;
							// margin-top: 24upx;
						}
						.open-old-price{
							font-size:24upx;
							text-decoration:line-through;
							color: #bbbbbb;
						}
						
					}
				}
			}
		}
	}
	.success{
		width:640upx;
		height:340upx;
		background:rgba(255,255,255,1);
		border:1px solid rgba(229,229,229,1);
		border-radius:10upx;
		.sure1{
			font-size: 36upx;
			height: 243upx;
			line-height: 243upx;
			text-align: center;
			border-bottom: 2upx solid #E5E5E5;
		}
		.sure2{
			height: 95upx;
			line-height: 95upx;
			text-align: center;
			color: #F84949;
			font-size: 32upx;
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
	.downtime {
		text-align: center;
		height: 30upx;
		font-size: 28upx;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin: 26upx 0;
		width: 100%;
		.downtime-x {
			color: #F84949;
		}
	}
</style>
