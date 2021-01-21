<template>
	<view>
		<view class="top-head" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disCenter" @click="back">
				<image src="/static/image/img/back-white.png" class="back" mode=""></image>
			</view>
			<view class="top-title">
				我的团队
			</view>
			<view class="back-wrap">
				
			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="top-wrap disBetween">
			<!-- <view class="top-shangji" v-if="shangji">
				我的上级 : {{shangji || ''}}
			</view> -->
			<view class="top-item">
				<view class="top-num">
					<view class="font48 fontBold">{{team.total || 0}}</view>
					<view class="font24 line24">人</view>
				</view>
				<view class="">
					{{team.level}}
				</view>
			</view>
			<view class="top-item">
				<view class="top-num">
					<view class="font48 fontBold">{{team.valid || 0}}</view>
					<view class="font24 line24">人</view>
				</view>
				<view class="">
					有效人数
				</view>
			</view>
			<view class="top-item">
				<view class="top-num">
					<view class="font48 fontBold">{{team.no_valid || 0}}</view>
					<view class="font24 line24">人</view>
				</view>
				<view class="">
					无效人数
				</view>
			</view>
		</view>
		<view class="tab-wrap">
			<view class="tab-box disCenter" v-for="(item,index) in teamList" :key="index">
				<view class="tab-item" @click="changeTab(item,index)">
					<image :src="'/static/image/img/team'+ (index+1) +'.png'" class="tab-bg" mode=""></image>
					<view class="font30 tab-act">
						{{item.level}}
					</view>
					<view class="font230 tab-act">
						({{item.total || 0}})
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="list.length > 0">
			<view class="wrap scale-1px-bottom" v-for="(item,index) in list" :key="index">
				<view class="left-box disAlign">
					<image :src="item.headimgurl" class="headimg" mode=""></image>
					<view class="dis-box">
						<view class="disAlign">
							<view class="nickname">
								{{item.nickname}}
							</view>
							<view class="level">
								团队{{item.total || 0}}人 有效{{item.valid || 0}}人
							</view>
						</view>
						<view class="create_time">
							{{item.add_time}}
						</view>
					</view>
				</view>
				
				<view class="dis-box dis-box2">
					<view class="prices">
						+{{item.price}}
					</view>
					<view class="">
						
					</view>
					<view class="create_time">
						奖励(元)
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="wrap scale-1px-bottom">
				<view class="left-box disAlign">
					<image :src="list.headimgurl" class="headimg" mode=""></image>
					<view class="dis-box">
						<view class="disAlign">
							<view class="nickname">
								{{list.nickname}}
							</view>
						</view>
						<view class="create_time">
							{{list.add_time}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				pages: 1,
				_$token: "",
				teamList: [],
				team: {},
				list: [],
				teamType: 0,
				shangji:'',//我的上级
			}
		},
		onLoad() {
			var that = this;
			const res = uni.getSystemInfoSync();
			that.getStorage();
			setTimeout(function() {
				that.getTeam()
				that.AjaxLoad();
			}, 100)
		},
		onReachBottom() {
			var that = this;
			that.pages++;
			setTimeout(function() {
				that.AjaxLoad();
			}, 100)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeTab(item, index) {
				this.pages = 1
				this.teamType = index + 1
				this.team = item
				this.list = []
				this.AjaxLoad()
			},
			getStorage() {
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					}
				} catch (e) {}
			},
			timestampToTime(timestamp) {
				var date = new Date(parseFloat(timestamp) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '年';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
				var D = date.getDate() + '日 ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				return M + D + h + m;
			},
			numToS(num) {
				let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
				let n = chnNumChar[num]
				return n + '级团队'
			},
			getTeam() {
				let param = {
					"user_id": this._$token.id,
					"user_token": this._$token.token
				};
				this._$InitRequest.request('user/my_team', param).then(res => {
					let list = res.data.data.list
					list.map((item) => {
						item.level = this.numToS(item.level)
					})
					let team = res.data.data.total
					team.level = '总人数'
					this.shangji = team.parent_user
					this.team = team
					this.teamList = list
				}, error => {})
			},
			AjaxLoad() {
				var that = this;
				let param = {
					"user_id": that._$token.id,
					"user_token": that._$token.token,
					"page": that.pages,
					level: that.teamType
				};
				this._$InitRequest.request('user/my_team_user', param).then(res => {
					let list = res.data.data.data
					list.map((item) => {
						item.add_time = that.timestampToTime(item.add_time)
						item.level = that.numToS(item.level)
					})
					that.list = that.list.concat(list)
				}, error => {})
			},
		}
	}
</script>
<style lang="less">
	.line24 {
		line-height: 46upx;
	}

	.top-head {
		width: 100%;
		position: fixed;
		z-index: 300;
		top: 0;
		left: 0;
		background: linear-gradient(90deg, #409BE0 0%, #76B6FF 100%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		.back-wrap {
			width: 70upx;
			height: 100%;

			.back {
				width: 26upx;
				height: 44upx;
			}
		}

		.top-title {
			font-size: 48upx;
			color: #fff;
			font-weight: bold;
		}
	}

	.top-wrap {
		padding: 100upx 60upx 120upx;
		background: linear-gradient(90deg, #409BE0 0%, #76B6FF 100%);
		color: #fff;
		position: relative;
		z-index: 2;
		.top-shangji{
			position: absolute;
			color: #fff;
			font-size: 28upx;
			left: 60upx;
			top: 25upx;
		}
		.top-item {
			text-align: center;

			.top-num {
				display: flex;
				justify-content: center;
				align-items: flex-end;
			}
		}
	}

	.tab-wrap {
		display: flex;
		flex-wrap: wrap;
		padding: 30upx 10upx 0;
		margin-top: -60upx;
		background-color: #fff;
		border-radius: 30upx 30upx 0 0;
		position: relative;
		z-index: 10;
		.tab-box {
			width: 33.33%;
			margin-bottom: 30upx;
		}

		.tab-item {
			font-size: 30upx;
			color: #fff;
			width: 90%;
			height: 120upx;
			// background: #F5F5F9;
			border-radius: 6upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
		}

		.tab-bg {
			width: 100%;
			height: 120upx;
			position: absolute;
			top: 0;
			left: 0;
		}

		.tab-act {
			position: relative;
			z-index: 10;
		}
	}

	.disAlign {
		display: flex;
		align-items: center;
	}

	.wrap {
		padding: 40upx 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-box {}

	.headimg {
		width: 92upx;
		height: 92upx;
		border-radius: 50%;
		margin-right: 20upx;
		flex: none;
	}

	.dis-box {
		display: flex;
		flex-direction: column;
	}

	.dis-box2 {
		align-items: center;
	}

	.nickname {
		font-size: 36upx;
		font-weight: bold;
		margin-right: 10upx;
	}

	.level {
		height: 34upx;
		color: #fff;
		background: #409BE0;
		box-shadow: 0px 1px 6px 0px rgba(255, 255, 255, 0.7);
		border-radius: 30upx 30upx 30upx 0;
		text-align: center;
		line-height: 34upx;
		font-size: 24upx;
		padding: 0 10upx;
	}

	.create_time {
		color: #8E8E8E;
		font-size: 26upx;
		margin-top: 4upx;
	}

	.prices {
		font-size: 40upx;
		color: #409BE0;
		font-weight: bold;
	}
</style>
