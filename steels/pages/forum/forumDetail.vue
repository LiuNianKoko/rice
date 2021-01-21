<template>
	<view>
		<view class="title disBetween" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="back">
				<image src="/static/back-black.png" class="back" mode=""></image>
			</view>
			<view class="font40 fontBold" :class="info.is_follow == 0?'margingLeft60':'margingLeft20'">
				动态详情
			</view>
			<view class="disAlignCenter">
				<view class="" v-if="info.is_follow == 0" @click="del(info)">
					删除
				</view>
				<view class="" v-if="info.is_follow == 0">
					|
				</view>
				<view class="" @click="report()">
					举报
				</view>
			</view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="post-wrap">
			<view class="">
				<view class="post-item">
					<view class="post-top disFlex marginBottom20">
						<image :src="info.headimgurl" class="headimg" mode="" @click.stop="toMyRelease(info)"></image>
						<view class="paddingLeft20" @click.stop="toMyRelease(info)">
							<!-- <view class="font32 fontBold marginBottom5">
								{{info.nickname || ''}}
							</view> -->
							<view class="marginBottom5 disAlignCenter">
								<view class="fontBold font32">
									{{info.nickname || ''}}
								</view>
								<view class="price-type" :class="info.is_attestation == 1?'price-act':''">
									{{info.is_attestation == 1?'已认证':'未认证'}}
								</view>
							</view>
							<view class="font24 color-gray">
								{{info.add_time || ''}}
							</view>
						</view>
						<view class="follow" :class="info.is_follow ==1?'follow-act':''" v-if="info.is_follow != 0" @click="changeFollow(info)">
							{{info.is_follow == 1?'取消关注':'+关注'}}
						</view>
					</view>
					<view class="marginBottom20">
						{{info.content || ''}}
					</view>
					<view class="post-img-wrap marginBottom20">
						<view class="img-box" v-if="info.img_arr && info.img_arr.length==1">
							<view class="imgs disCenter" v-for="(imgs,imgIndex) in info.img_arr" :key="imgIndex">
								<image :src="imgs" class="one-img" mode="aspectFill" @click="previewImg(info.img_arr,imgIndex)"></image>
							</view>
						</view>
						<view class="img-boxs" v-if="info.img_arr &&info.img_arr.length>1">
							<view class="imgs disCenter" v-for="(imgs,imgIndex) in info.img_arr" :key="imgIndex">
								<image :src="imgs" class="more-img" mode="aspectFill" @click="previewImg(info.img_arr,imgIndex)"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="lines"></view>
			</view>
		</view>
		<view class="com-wrap" v-if="list.length > 0">
			<view class="font32 color-blackB fontBold">
				评论
			</view>
			<view class="com-item" v-for="(item,index) in list" :key="index">
				<view class="disAlignCenter marginBottom10" @click.stop="toMyRelease(item)">
					<view class="disCenter">
						<image :src="item.headimgurl" class="headimg" mode=""></image>
					</view>
					<!-- <view class="fontBold color-blackB paddingLeft20">
						{{item.nickname || ''}}
					</view> -->
					<view class="paddingLeft20 disAlignCenter">
						<view class="fontBold color-blackB">
							{{item.nickname || ''}}
						</view>
						<view class="price-type" :class="item.is_attestation == 1?'price-act':''">
							{{item.is_attestation == 1?'已认证':'未认证'}}
						</view>
					</view>
				</view>
				<view class="width100 com-main">
					<view class="font26 color-blackB marginBottom20" @click="com(item.id,0,item.nickname)">
						{{item.content || ''}}
					</view>
					<view class="disBetween">
						<view class="font24 color-bbb scale09 scaleLeft">
							{{item.time || ''}}
						</view>
						<view class="zan-wrap disCenter" @click="zanClick(item.id,2,item)">
							<image :src="item.is_fabulous == 0 ?'/static/zan.png':'/static/zaned.png'" class="zan" mode=""></image>
						</view>
					</view>
					<view class="sub-wrap marginTop20" v-if="item.comment_count > 0">
						<view class="sub-com font26" v-for="(sub,subIndex) in item.son_comment" :key="subIndex">
							<view class="" v-if="sub.reply_nickname" @click="com(sub.pid,sub.user_id,sub.nickname)">
								<text class="color-com">{{sub.nickname}}</text>
								<text class="paddingRight10 paddingLeft10">回复</text>
								<text class="color-com">{{sub.reply_nickname}}</text>
								<text class="paddingRight10">:</text>
								<text>{{sub.content}}</text>
							</view>
							<view class="" v-else @click="com(sub.pid,sub.user_id,sub.nickname)">
								<text class="color-com">{{sub.nickname}}</text>
								<text class="paddingRight5">:</text>
								<text>{{sub.content}}</text>
							</view>
						</view>
						<view class="font24 color-com sub-all" v-if="item.comment_count > 3" @click="lookMore(item,index)">
							<view v-if="item.page == 1">
								查看全部{{item.comment_count}}条回复
							</view>
							<view v-if="item.page > 1">
								{{item.son_comment.length == item.comment_count?'收起回复':'查看更多回复'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="blank"></view>
		<view class="bot-wrap scale-1px-top disAlignCenter">
			<view class="write-wrap disAlignCenter" @click="com(0,0,info.nickname)">
				<image src="/static/pencil.png" class="icons" mode=""></image>
				<text class="paddingLeft20 color-bbb">写评论</text>
			</view>
			<image :src="info.is_collection == 0 ?'/static/coll.png':'/static/colled.png'" class="icons marl" mode="" @click="coll(id)"></image>
			<image :src="info.is_fabulous == 0 ?'/static/zan.png':'/static/zaned.png'" class="icons marl" mode="" @click="zanClick(id,1)"></image>
		</view>
		
		<QSPopup ref="QSPop" type="fadeInUp">
			<view class="comm-box">
				<view class="">
					<textarea v-model="comments" :placeholder="pla" class="txt-area" maxlength="180"/>
				</view>
				<view class="put-btn-wrap">
					<view class="put-btn" @click="send">
						{{reportType == 1?'发送':'举报'}}
					</view>
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				info:{},
				list:[],//一级评论
				comments:'',//评论内容
				id:0,//帖子id
				pid:0,//一级评论id
				reply_user_id:0,//回复用户id
				page:1,
				pla:'我来说两句...',
				reportType:1,//1发送   2举报
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 预览图片
			previewImg(img,index){
				uni.previewImage({
					urls:img,
					current:index
				})
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				// var s = date.getSeconds();
				return Y+M+D+h+m;
			},
			getInfo(){
				let data = {
					token:uni.getStorageSync('token'),
					forum_id:this.id,
					type:1
				}
				http('/api/Forum/forumDetails','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data.forum
						this.info.add_time = this.timestampToTime(parseFloat(this.info.add_time))
					}else{
						this.$util.showToast('该帖子已被删除')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1300)
					}
					console.log(res)
				})
			},
			formatMsgTime (timespan) {
				var dateTime = new Date(timespan * 1000) // 将传进来的字符串或者毫秒转为标准时间
				var year = dateTime.getFullYear()// 将当前编辑的时间转换为年
				var month = dateTime.getMonth() + 1// 将当前编辑的时间转换为月
				var day = dateTime.getDate()// 将当前编辑的时间转换为天
				var hour = dateTime.getHours()// 将当前编辑的时间转换为小时
				var minute = dateTime.getMinutes()// 将当前编辑的时间转换为分
				// var second = dateTime.getSeconds()// 将当前编辑的时间转换为秒
				var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
				var now = new Date() // 获取本机当前的时间
				var nowNew = now.getTime() // 将本机的时间转换为毫秒
				var milliseconds = 0
				var timeSpanStr
				milliseconds = nowNew - millisecond//时间差
				if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
					timeSpanStr = '刚刚'
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
					timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				}
				return timeSpanStr
			},
			getList(){
				let data = {
					paging:10,
					page:1,
					token:uni.getStorageSync('token'),
					forum_id:this.id
				}
				http('/api/Forum/getCommentList','post',data).then(res=>{
					if(res.status == 200){
						this.list = res.data.comment
						this.list.map((item)=>{
							item.time = this.formatMsgTime(parseFloat(item.time))
							return item
						})
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					paging:10,
					page:this.page + 1,
					token:uni.getStorageSync('token'),
					forum_id:this.id
				}
				http('/api/Forum/getCommentList','post',data).then(res=>{
					if(res.status == 200){
						newList = res.data.comment
						newList.map((item)=>{
							item.time = this.formatMsgTime(parseFloat(item.time))
							return item
						})
						this.list = this.list.concat(newList)
						this.page++
					}
					console.log(res)
				})
			},
			com(pid,reid,nickname){
				this.reportType = 1
				this.pid = pid
				this.reply_user_id = reid
				this.pla = '回复 ' + nickname
				this.show('QSPop')
			},
			report(){
				this.reportType = 2
				this.pla = '请填写举报理由'
				this.show('QSPop')
			},
			del(info){
				this.$util.showLoading('请稍候...')
				let data = {
					type:2,
					data_id:info.id,
					token:uni.getStorageSync('token')
				}
				http('/api/user/delete_publish','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:'删除成功!',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1200)
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			send(){
				if(this.reportType == 1){
					if(this.comments == ''){
						this.$util.showToast('请输入评论')
						return
					}
					let data = {
						token:uni.getStorageSync('token'),
						forum_id:this.id,
						content:this.comments,
						pid:this.pid,
						reply_user_id:this.reply_user_id
					}
					http('/api/Forum/addComment','post',data).then(res=>{
						if(res.status == 200){
							this.$util.showToast(res.message || res.msg)
							this.comments = ''
							this.getList()
							this.hides('QSPop')
						}else{
							this.$util.showToast(res.message || res.msg)
						}
						console.log(res)
					})
				}else{
					if(this.comments == ''){
						this.$util.showToast('请填写举报理由')
						return
					}
					this.$util.showLoading('请稍候...')
					let data = {
						type:2,
						data_id:this.info.id,
						token:uni.getStorageSync('token'),
						reason:this.comments
					}
					http('/api/user/report','post',data).then(res=>{
						if(res.status == 200){
							uni.showToast({
								title:'举报成功!',
								icon:'none'
							})
							this.comments = ''
							setTimeout(()=>{
								this.hides('QSPop')
							},100)
						}else{
							this.$util.showToast(res.msg)
						}
						this.$util.hideLoading()
						console.log(res)
					})
				}
				
			},
			zanClick(id,type,item){
				this.$util.showLoading('请稍候...')
				let data = {
					token:uni.getStorageSync('token'),
					type:type,
					data_id:id
				}
				http('/api/Forum/fabulous','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.message || res.msg)
						if(type == 1){
							this.getInfo()
						}else{
							// this.getList()
							if(item.is_fabulous == 0){
								item.is_fabulous = 1
							}else{
								item.is_fabulous = 0
							}
						}
						
					}else{
						this.$util.showToast(res.message || res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			coll(){
				this.$util.showLoading('请稍候...')
				let data = {
					type:3,
					gid:this.id,
					token:uni.getStorageSync('token')
				}
				http('/api/User/coll_goods','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						this.getInfo()
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			// 关注
			changeFollow(info){
				this.$util.showLoading('请稍候...')
				let data = {
					follow_user_id:info.user_id,
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/follow','post',data).then(res=>{
					if(res.status == 200){
						this.$util.showToast(res.msg)
						this.getInfo()
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			toMyRelease(item){
				if(item.is_follow == 0){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else{
					uni.navigateTo({
						url:'/pages/mine/myRelease?id=' + item.user_id+ '&nickname=' + item.nickname
					})
				}
				
			},
			// 查看更多评论
			lookMore(item,index){
				let data = {
					paging:10,
					comment_id:item.id,
					forum_id:this.id,
					token:uni.getStorageSync('token'),
					page:item.page
				}
				http('/api/Forum/sonCommentList','post',data).then(res=>{
					if(res.status == 200){
						let sonData = res.data.comment.son_comment.data
						if(sonData.length > 0){
							if(item.page == 1){
								item.son_comment = sonData
							}else{
								item.son_comment = item.son_comment.concat(sonData)
							}
							item.page++
						}else{
							if(item.son_comment.length == item.comment_count){
								item.son_comment = item.son_comment.splice(0,3)
								item.page = 1
							}
						}
					}else{
						this.$util.showToast(res.msg)
					}
					console.log(res)
				})
			},
			
		}
	}
</script>

<style lang="less">
	.margingLeft60{
		margin-left: 60upx;
	}
	.title{
		display: flex;
		align-items: center;
		position: fixed;
		background: #fff;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		padding: 0 32upx;
		.back-wrap{
			width: 40upx;
			height: 40upx;
			.back{
				width: 24upx;
				height: 40upx;
			}
		}
		
	}
	.lines{
		background: #F5F5F9;
		height: 20upx;
	}
	.post-item{
		padding: 32upx 32upx 0 32upx;
		.post-top{
			position: relative;
			.follow{
				position: absolute;
				top: 10upx;
				right: 10upx;
				padding: 2upx 23upx;
				color: #FF5060;
				border: 1px solid #FF5060;
				border-radius: 30upx;
			}
			.follow-act{
				color: #999;
				border: 1px solid #999;
			}
			.headimg{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}
		.one-img{
			width: 100%;
			height: 380upx;
			border-radius: 10upx;
		}
		.img-boxs{
			display: flex;
			flex-wrap: wrap;
			.imgs{
				width: 33.3%;
				margin-bottom: 10upx;
				.more-img{
					width: 96%;
					height: 220upx;
					border-radius: 6upx;
				}
			}
		}
		
	}
	
	.com-wrap{
		padding: 30upx;
	}
	.com-item{
		padding: 30upx 0;
		.headimg{
			width: 72upx;
			height: 72upx;
			border-radius: 50%;
		}
		.com-main{
			padding-left: 92upx;
			.zan-wrap{
				width: 40upx;
				height: 40upx;
				.zan{
					width: 32upx;
					height: 32upx;
				}
			}
			.sub-wrap{
				padding: 25upx;
				background: #F5F5F9;
				border-radius: 10upx;
				.sub-com{
					margin-bottom: 37upx;
				}
				.sub-com:last-child{
					margin-bottom: 0;
				}
				.sub-all{
					text-align: right;
				}
			}
		}
	}
	.blank{
		height: 102upx;
	}
	.bot-wrap{
		padding: 6upx 30upx 20upx 30upx;
		height: 102upx;
		width: 100%;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 199;
		.write-wrap{
			padding: 10upx 30upx;
			height: 76upx;
			flex: 1;
			background: #F5F5F9;
			border-radius: 38upx;
		}
		.icons{
			width: 36upx;
			height: 36upx;
		}
		.marl{
			margin-left: 40upx;
		}
	}
	.comm-box{
		width: 750upx;
		padding: 20upx;
		background-color: #fff;
		box-sizing: border-box;
		.txt-area{
			background-color: #F5F5F9;
			border-radius: 20upx;
			font-size: 28upx;
			padding: 20upx;
			width: 100%;
			height: 160upx;
			box-sizing: border-box;
		}
		.put-btn-wrap{
			margin-top: 20upx;
			display: flex;
			justify-content: flex-end;
		}
		.put-btn{
			padding: 4upx 20upx;
			color: #30A9E0;
		}
	}
	.price-type{
		margin-left: 10upx;
		font-size: 24upx;
		color: #fff;
		padding: 6upx 14upx;
		background-color: #40384a;
		border-radius: 30upx;
		line-height: 26upx;
	}
	.price-act{
		background-color: #fec71c;
	}
</style>
