<template>
	<view class="content" :style="{'height':screenHeight}">
		<view class="topBox">
			<view class="names" v-for="(item,index) in titleData" :key="index" :class=" item.beThis == true ? 'special' : '' " @tap="titleBtn(index)">{{item.name}}</view>
		</view>
		<view class="clearBoth"></view>
		
		<view class="wrap" v-if="list.length > 0">
		<!-- status  0 待完成   1已完成   2任务失败 -->
			<view class="item " v-for="(item,index) in list" :key="index" @click="receive(item)">
				<view class="disBetween marginBottom20">
					<view class="font26 color-999">
						{{item.date}}
					</view>
					<view class="font26 color-666" v-if="item.status == 0">
						{{timeData || '00:00:00'}}
					</view>
				</view>
				<view class="disBetween">
					<view class="font32">
						{{item.phone}}
					</view>
					<view class="btn-now" v-if="item.status == 0">
						待完成
					</view>
					<view class="btn-now" v-if="item.status == 1">
						已完成
					</view>
					<view class="btn-now btn-now-wc" v-if="item.status == 2">
						任务失败
					</view>
				</view>
				
			</view>
		</view>
		<view class="nodata" v-else>
			暂无数据~
		</view>
	</view>
</template>
<style lang="less">
	.content{background: rgb(244,244,244);width:100%;}
	.content .topBox{width:95%;padding-top:20upx;margin-left:2.5%;}
	.content .topBox .names{width:33.33%;font-size: 14px;border-bottom: 1px solid rgb(244,244,244);text-align: center;padding-bottom: 20upx;float: left;}/* rgb(119,188,233) */
	.content .topBox .special{color:#409BE0;border-bottom: 1px solid #409BE0;transition: all 0.1s;}
	.marginBottom-50{margin-bottom: 50upx;}
	.marginBottom-40{margin-bottom: 40upx}
	
	.copy-wrap{font-size: 24upx;color:#409BE0;border: 1px solid #409BE0;padding: 0 16upx;border-radius: 4upx;margin-left: 30upx;}
	
	.wrap{
		padding: 30upx;
	}
	.item{
		// height: 116upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.06);
		border-radius: 10upx;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		.btn-now{
			font-size: 28upx;
			color: #409BE0;
		}
		.btn-now-wc{
			color: #999;
		}
	}
	.none{text-align: center;width:90%;padding:2.5%;margin-left: 2.5%;background: white;border-radius: 10upx;}
</style>
<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				chooseIndex:0,
				titleData:[
					// {"name":"全部",beThis:true},
					{"name":"已领取",beThis:false},
					{"name":"待完成",beThis:false},
					{"name":"已完成",beThis:false},
					
				],
				timeData: '',    //存放每条数据的处理好的倒计时
				timer: '',    //用来清除定时器
				screenHeight:"",
				list:[],
				pages:1,
				_$token:"",
				endTime:0
			}
		},
		onLoad(e){
			const res = uni.getSystemInfoSync();
			this.getStorage();
			this.chooseIndex = e.index
			this.screenHeight = res.windowHeight*2 + 'upx'
			for (var i = 0; i < this.titleData.length; i++) {
				this.titleData[i].beThis = false
			}
			if( e.index == 0 ){
				this.titleData[0].beThis = true
			}else if( e.index == 1 ){
				this.titleData[1].beThis = true
			}else if( e.index == 2 ){
				this.titleData[2].beThis = true
			}
			var that = this;
			// setTimeout(function(){
			// 	that.AjaxLoad();
			// },100)
			
			if(that.chooseIndex == 1 || that.chooseIndex == 0){
				clearInterval(timer)
				var timer = setInterval(function () {
					that.getEndTime()
				}, 1000)
				that.timer = timer
			}else{
				clearInterval(that.timer)
			}
		},
		onShow() {
			this.pages = 1
			this.list = []
			this.AjaxLoad();
		},
		onReachBottom(){
			this.pages++;
			this.AjaxLoad();
			console.log( this.pages );
		},
		onUnload(){   //卸载页面清除定时器
			clearInterval(this.timer)  
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var type = ""
				var lists = []
				var status = ""
				if( this.titleData[0].beThis == true ){
					type = -1
				}else if( this.titleData[1].beThis == true ){
					type = 0
				}else if( this.titleData[2].beThis == true ){
					type = 1
				}else if( this.titleData[3].beThis == true ){
					type = 2
				}		
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"type":type,
					"page":this.pages,
				};
				this._$InitRequest.request('task/index', param).then(res => {
					console.log(res)
					let list = res.data.data.data
					list.map((item)=>{
						item.date = this.timestampToTime(item.create_time)
					})
					
					this.list = this.list.concat(list)
					
				},error=>{})
			},
			getEndTime(){
				var date = new Date();
				var Y = date.getFullYear() + '/';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
				var D = date.getDate() + ' ';
				let enddate = new Date(Y+M+D + '23:59:59').getTime()
				console.log(enddate)
				var nowdate = new Date().getTime()   //获取当前时间毫秒数
				var totaltime = enddate - nowdate      //获取时间差
				this.totaltime(totaltime)  
				console.log(this.timeData)
			},
			// 复制
			copy(num){
				uni.setClipboardData({
				    data: num,
				    success: function () {
				        console.log('success');
						uni.showToast({
							title:'复制成功',
							icon:'none'
						})
				    }
				});
			},
			titleBtn(index){
				var that = this;
				var type = ""
				var lists = []
				var status = ""
				this.pages = 1;
				this.list = []
				for (var i = 0; i < this.titleData.length; i++) {
					this.titleData[i].beThis = false
				}
				this.titleData[index].beThis = true
				this.AjaxLoad();
			},
			timestampToTime(timestamp) {
				var date = new Date(parseFloat(timestamp) * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes();
				function test(num) {
				  if (num < 10) {
					  num = "0" + num    
				  }
				  return num
				}
				h = test(h)
				m = test(m)
				// var s = date.getSeconds();
				return Y+M+D+h+m;
			},
			receive(item){
				uni.navigateTo({
					url:'/pages/user/dailyTask/codeNow?id=' + item.task_id+ '&phone=' + item.phone
				})
			},
			getTimeList(){
				let that = this
				let order = that.orderData
				order.forEach((item) =>{
				  var nowdate = new Date().getTime()   //获取当前时间毫秒数
				  // var time = item.productExpiredTime.replace(new RegExp("-", "gm"), "/") //ios不能识别日期格式中的 "-" ； .productExpiredTime是接口返回的名称
				  // var timesp = time.split('.')[0]    //此处是因为我们接口返回的时间格式是这样："2019-12-31 11:00:00.0"
				  // var enddate = new Date(timesp).getTime()    //处理好格式之后获取结束时间的毫秒数
				  var enddate = item.time_out * 1000
				  var totaltime = enddate - nowdate      //获取时间差
				  that.totaltime(totaltime)   		//这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
				  item.end_time1 = that.timeData  	//处理好的单个时间安排到item上（重要）
				})
				that.orderData = order   //全部处理好的数据重新赋值
			},
			totaltime(a){   //计算单个剩余时间
			  let totaltime = a
				let that = this
				  var h, m, s, d
				  function test(num) {
					  if (num < 10) {
						  num = "0" + num    
					  }
					  return num
				  }
				  
				if (totaltime > 0) {
					d = Math.floor(totaltime / 1000 / 60 / 60 / 24) * 24
					h = Math.floor(totaltime / 1000 / 60 / 60 % 24)
					m = Math.floor(totaltime / 1000 / 60 % 60)
					s = Math.floor(totaltime / 1000 % 60)
					//获取时分秒
					h = d + h
					h = test(h)
					m = test(m)
					s = test(s)
					
					this.timeData =`${h} : ${m} : ${s}`   // 每个时间的显示格式
				   
				} else {
					
					this.timeData = `00 : 00 : 00`  
				   
				}
			},
			
			
		}
	}
</script>