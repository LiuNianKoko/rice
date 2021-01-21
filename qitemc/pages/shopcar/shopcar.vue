<template>
	<view class="shopcar-wraps">
		<!-- <view class="status_bar"> -->
			<!-- 这里是状态栏 -->
		<!-- </view> -->
		<!-- 购物车为空 -->
		<view class="shopcar-empty" v-if="isEmpty">
			<view class="header-wrap">
				<view class="index-header">
					购物车
				</view>
			</view>
			<view class="blank"></view>
			<view class="empty-main">
				<view class="empty-img">
					<image :src='imag+"empty-car.png"'></image>
				</view>
				<view class="empty-text">
					购物车空空如也，快来挑选好货呗~
				</view>
				<view class="empty-btn" @tap="toItem">
					去逛逛
				</view>
			</view>
			<!-- 推荐商品 -->
			<view class="foryou">
				<view class="foryou-line">
					<view class="line-text">为你推荐</view>
				</view>
				<view class="foryou-main">
					<view class="recomon-item2-wrap disFlex">
						<view class="recomon-item2 marginBottom20" v-for="item in recomList" :key="item.id" @tap="toDetail(item.id)">
							<image :src="item.cover" alt=""></image>
							<view class="recomon-text2">
								<view class="recomon-title2 line1">
									{{item.goods_name}}
								</view>
								<view class=" recomon-intr2 line1 marginBottom20">
									{{item.desc}}
								</view>
								<view class="recomon-price2 disFlex">
									<view class="recomon-price2-2 disFlex">
										￥{{item.price}}
										<view class="gouwuche-text"></view>
									</view>
									<view class="recomon-lowprice2 disFlex">
										<!-- <text class="recomon-num2">已售 {{item.alsalenum}}</text> -->
									</view>
								</view>
								
								<view class="recomon-gouwuche2 disFlex">
									<view class="recomon-price-x2">
										<text class="x2-symbol">￥</text>
										<text class="x2-price">{{item.member_price}}</text>
										<image class="x2-img" :src='imag+"member-man.png"'></image>
									</view>
									<image class="gouwuche" src="/static/gouwuche2.png"></image>
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物车满 -->
		<view v-if="!isEmpty">
			<view class="shopcar-main1" v-if="setStatus">
				<view class="shopcar-full">
					<view class="header-wrap">
						<view class="index-header">
							购物车
							<text class="header-set" @tap="setStatusTap">管理</text>
						</view>
					</view>
					<view class="blank"></view>
					<view class="full-main">
						<view class="full-item" v-for="(item,index) in goodsList" :key="item.id">
							<view class="full-opt">
								<image :src="selectImg" @tap="selectedTap(item,index)" v-if="item.check"></image>
								<image :src="unSelectImg" @tap="selectedTap(item,index)" v-else></image>
							</view>
							<view class="full-img">
								<image :src="item.cover" @tap="selectedTap(item,index)"></image>
							</view>
							<view class="full-text" v-if="item.goods_name">
								<view class="full-title line1" @click="toDetail(item.goods_id)">
									{{item.goods_name}}
								</view>
								<view class="full-intr" @click="toDetail(item.goods_id)">
									{{item.sku_name}} 	
									<!-- <text v-if="item.type==1">(会员商品)</text> -->
								</view>
								<view class="full-price">
									<view class="full-cost-price">
										<text class="symbol">￥</text>
										{{item.totalprice}}
									</view>
									<!-- <text class="full-vip-price margingLeft15">农户价￥12.00</text> -->
									<!-- <text class="full-num">x{{item.num}}</text> -->
									<view class="num-computed">
										<view class="num-jian num-common" @tap="jianNum(item)">
											<image src="/static/jianhao.png" class="num-symbol"></image>
										</view>
										<view class="num-total num-common">
											{{item.num}}
										</view>
										<view class="num-add num-common" @tap="addNum(item)">
											<image src="/static/jiahao.png" class="num-symbol"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 推荐商品 -->
					<view class="foryou">
						<view class="foryou-line">
							<view class="line-text">为你推荐</view>
						</view>
						<view class="foryou-main">
							<view class="recomon-item2-wrap disFlex">
								<view class="recomon-item2 marginBottom20" v-for="item in recomList" :key="item.id" @tap="toDetail(item.id)">
									<image :src="item.cover" alt=""></image>
									<view class="recomon-text2">
										<view class="recomon-title2 line1">
											{{item.goods_name}}
										</view>
										<view class=" recomon-intr2 line1 marginBottom20">
											{{item.desc}}
										</view>
										<view class="recomon-price2 disFlex">
											<view class="recomon-price2-2 disFlex">
												<text class="symbol">￥</text>
												{{item.price}}
												<view class="gouwuche-text"></view>
											</view>
											<view class="recomon-lowprice2 disFlex">
												<!-- <text class="recomon-num2">已售 {{item.alsalenum}}</text> -->
											</view>
										</view>
										
										<view class="recomon-gouwuche2 disFlex">
											<view class="recomon-price-x2">
												<text class="x2-symbol">￥</text>
												<text class="x2-price">{{item.member_price}}</text>
												<image class="x2-img" :src='imag+"member-man.png"'></image>
											</view>
											<image class="gouwuche" src="/static/gouwuche2.png"></image>
											
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 结算 -->
				<view class="total-wrap">
					<view class="total-opt">
						<image :src="totalSelect ? selectImg : unSelectImg" @tap="totalSelectedTap"></image>
						<view class="total-text">
							全选
						</view>
					</view>
					<view class="total-pr">
						<view class="total-price">
							合计：<text>￥{{totalMoney}}</text>
						</view>
						<view class="total-btn total-common" @tap="toPay">
							结算
						</view>
					</view>
				</view>
			</view>
			<!-- 购物车管理 -->
			<view class="shopcar-main2" v-if="!setStatus">
				<view class="shopcar-full">
					<view class="header-wrap">
						<view class="index-header">
							购物车
							<text class="header-set" @tap="setStatusTap">取消</text>
						</view>
					</view>
					<view class="blank"></view>
					<view class="full-main">
						<view class="full-item" v-for="(item,index) in goodsList" :key="item.id">
							<view class="full-opt">
								<image :src="selectImg" @tap="selectedTap(item,index)" v-if="item.check"></image>
								<image :src="unSelectImg" @tap="selectedTap(item,index)" v-else></image>
							</view>
							<view class="full-img">
								<image :src="item.cover"></image>
							</view>
							<view class="full-text">
								<view class="full-title line1">
									{{item.goods_name}}
								</view>
								<view class="full-intr">
									{{item.sku_name}} 
									 <!-- <text v-if="item.type==1">(会员商品)</text> -->
								</view>
								<view class="full-price">
									<!-- <text class="full-cost-price">￥{{item.goods_price}}</text> -->
									<view class="full-cost-price">
										<text class="symbol">￥</text>
										{{item.goods_price}}
									</view>
									<!-- <text class="full-vip-price margingLeft15">农户价￥12.00</text> -->
									<!-- <text class="full-num">x{{item.num}}</text> -->
								</view>
							</view>
						</view>
					</view>
					<!-- 推荐商品 -->
					<view class="foryou">
						<view class="foryou-line">
							<view class="line-text">为你推荐</view>
						</view>
						<view class="foryou-main">
							<view class="recomon-item2-wrap disFlex">
								<view class="recomon-item2 marginBottom20" v-for="item in recomList" :key="item.id" @tap="toDetail(item.id)">
									<image :src="item.cover" alt=""></image>
									<view class="recomon-text2">
										<view class="recomon-title2 line1">
											{{item.goods_name}}
										</view>
										<view class=" recomon-intr2 line1 marginBottom20">
											{{item.desc}}
										</view>
										<view class="recomon-price2 disFlex">
											<view class="recomon-price2-2 disFlex">
												￥{{item.price}}
												<view class="gouwuche-text"></view>
											</view>
											<view class="recomon-lowprice2 disFlex">
												<!-- <text class="recomon-num2">已售 {{item.alsalenum}}</text> -->
											</view>
										</view>
										
										<view class="recomon-gouwuche2 disFlex">
											<view class="recomon-price-x2">
												<text class="x2-symbol">￥</text>
												<text class="x2-price">{{item.member_price}}</text>
												<image class="x2-img" :src='imag+"member-man.png"'></image>
											</view>
											<image class="gouwuche" src="/static/gouwuche2.png"></image>
											
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 删除 -->
				<view class="total-wrap">
					<view class="total-opt">
						<image :src="totalSelect ? selectImg : unSelectImg" @tap="totalSelectedTap"></image>
						<view class="total-text">
							全选
						</view>
					</view>
					<view class="total-pr">
						<view class="total-btn total-common" @tap="show('QSPopup')">
							删除
						</view>
					</view>
				</view>
			</view>
		</view>
			
			<!-- 删除弹窗 -->
			<QSPopup ref="QSPopup">
				<view class="content-del">
					<view class="del-text scale-1px-bottom">
						<view class="del-text1">
							删除确认
						</view>
						<view class="del-text2">
							确定要删除该商品吗？
						</view>
					</view>
					<view class="del-btn">
						<view class="del-btn-no" @tap="hides('QSPopup')">
							取消
						</view>
						<view class="del-btn-yes" @tap="delGoods">
							确认
						</view>
					</view>
				</view>
			</QSPopup>
			<!-- 登录确认弹窗 -->
			<QSPopup ref="QSPopuplogin" :tapMaskHide="false">
				<view class="content-del2">
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
				isEmpty:true,
				selected:false,
				totalSelect:false,
				selectImg:'/static/select.png',
				unSelectImg:'/static/unselect.png',
				setStatus:true,  //管理
				goodsList:[],	//购物车列表
				recomList:[],	//推荐商品列表
				totalMoney:0, // 商品总价
				page:1,	//分页
				// types:0//0是普通商品  1是会员商品  显示在简介后
				// selectArr : [],//购物车选中缓存
			}
		},
		onLoad(){
			this.getGoodsList()
		},
		onShow() {
			this.getGoodsList()
			
			this.isLogon()
		},
		onHide() {
			this.airBrake()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods:{
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
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			delGoods(){
				this.hides('QSPopup')
				let cartids = [];
				
				this.goodsList.map(item=>{
					if(item.check){
						cartids.push(item.id)
					}
				})
				if(cartids.length==0){
					return false;
				}
				let data = {
					token:uni.getStorageSync('token'),
					car_id:cartids.join(',')
				}
				http('/api/Car/delUserCar','post',data).then(res=>{
					
					this.getGoodsList()
				})
				this.totalSelect = false
				this.totalMoney = 0
			},
			//购物车选中
			selectArrCar(){
				let that = this
				let selectArr = that.$util.getStorage('selectArr')
				that.goodsList.forEach((item)=>{
					selectArr.forEach((select)=>{
						if(item.id==select){
							item.check = true
						}
					})
				})
			},
			selectedTap(item){
				let _this = this;
				// 记录选中的商品种类个数
				let num = 0;
				let selectArr = [];//购物车选中缓存
				
				// 注意对比前后两次输出的结果
				console.log(item.check);
				if (typeof item.check == "undefined") {
					_this.$set(item, "check", false);
					// 注意对比前后两次输出的结果
					console.log(item.check);
				} else {
					item.check = !item.check;
					_this.goodsList.forEach(function (item, value) {
						_this.$util.setStorage('selectArr',[])
						if (item.check) {
							selectArr.push(item.id)
							_this.$util.setStorage('selectArr',selectArr)
						}
					})
				}
				_this.goodsList.forEach(function (item, value) {
					if (item.check) {
						num++;
						selectArr.push(item.id)
						_this.$util.setStorage('selectArr',selectArr)
					}
				})
				console.log(_this.$util.getStorage('selectArr'))
				// 如果选中的商品种类个数等于商品列表（数组）的长度，修改全选框的全选标志；
				if (num == _this.goodsList.length) {
					_this.totalSelect = true;
				} else {
					_this.totalSelect = false;
				}
				// 计算总价
				
				_this.getTotalMoney();
				
			},
			airBrake(){   //  置空
				let _this = this;
				_this.setStatus = true
			},
			totalSelectedTap(){
				let selectArr = [];//购物车选中缓存
				let _this = this;
				_this.totalSelect = !_this.totalSelect;
				
				_this.goodsList.forEach(function (item, index) {
					if (typeof item.check == "undefined") {
						// 设置item的check属性
						_this.$set(item, "check", _this.totalSelect);
						_this.goodsList.forEach(function (item, value) {
							_this.$util.setStorage('selectArr',[])
							if (item.check) {
								selectArr.push(item.id)
								_this.$util.setStorage('selectArr',selectArr)
							}
						})
					} else {
						item.check = _this.totalSelect;
						_this.goodsList.forEach(function (item, value) {
							_this.$util.setStorage('selectArr',[])
							if (item.check) {
								selectArr.push(item.id)
								_this.$util.setStorage('selectArr',selectArr)
							}
						})
					}
				})
				// 计算总价
				_this.getTotalMoney()
			},
			setStatusTap(){
				this.setStatus = !this.setStatus
			},
			//获取列表
			getGoodsList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/Car/userCarList','post',data).then(res=>{
					console.log(res)
					// this.isLogon()
					this.recomList = res.data.data.car_goods_list
					if(res.data.data.userCarList.data.length == 0){
						this.isEmpty = true
					}else if(res.data.data.userCarList.data.length > 0){
						this.goodsList = res.data.data.userCarList.data
						
						this.isEmpty = false;
					    this.goodsList.map((item)=>{
							this.$set(item,'check',false)
						})
						this.selectArrCar()
						this.getTotalMoney()
					}
				})
			},
			getNewList(){
				let data = {
					token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/Car/userCarList','post',data).then(res=>{
					
					if(res.data.status=='400'){
						this.$util.showToast(res.data.msg)
						return
					}
					
					if(this.page > res.data.data.userCarList.last_page){
						// this.$util.showToast('没有更多了')
						return false
					}
					this.page++
					this.goodsList = this.goodsList.concat(res.data.data.userCarList.data)
					this.goodsList.map((item)=>{
						this.$set(item,'check',false)
					})
					this.selectArrCar()
					this.getTotalMoney()
				})
			},
			//总金额计算 
			getTotalMoney() {
				let _this = this;
				let total = 0
				// 商品总价首先置0，判断选中后，再计入总价
				_this.totalMoney = 0;
				_this.goodsList.forEach(function (item, index) {
					// 如果商品被选中，则计算到总价之中，运算符使用+=
					if (item.check) {
						total += (((parseFloat(item.goods_price)*100) * item.num)/100)
						_this.totalMoney = total.toFixed(2)
						// _this.totalMoney += (parseFloat(item.totalprice)*100)/100
					}
				})
			},
			toPay(){
				let cartid =[];
				this.goodsList.map((item)=>{
					if(item.check){
						cartid.push(item.id)
					}
				})
				if(cartid.length==0){
					return false;
				}
				console.log(111111);
				
				this.$util.setStorage('orderdata',{
					token:uni.getStorageSync('token'),
					type:2,
					cart_id:cartid.join(',')
				})
				uni.navigateTo({
					url:'/pages/index/pay/pay?type=2&cart_id='+cartid.join(',')
				})
				this.totalMoney = 0
				this.totalSelect = false
				this.setStatus = true
			},
			addNum(item){
				if(item.num >= 1){      //定义一个 初始价格
					
					let data = {
						token:uni.getStorageSync('token'),
						car_id:item.id,
						type:1   //  1 添加  2  减少
					}
					http('/api/car/saveCar','post',data).then(res=>{
						console.log(res)
						this.getGoodsList()
						this.getTotalMoney()
						// this.totalMoney = 0
						// this.totalSelect = false
					})
				}
				
			},
			jianNum(item){
				if(item.num > 1){      //定义一个 初始价格
					let data = {
						token:uni.getStorageSync('token'),
						car_id:item.id,
						type:2   //  1 添加  2  减少
					}
					http('/api/car/saveCar','post',data).then(res=>{
						console.log(res)
						this.getGoodsList()
						this.getTotalMoney()
						// this.totalMoney = 0
						// this.totalSelect = false
					})
					
				}
				if(item.num <= 1){
					return
				}
			},
			toItem(){
				uni.switchTab({	
					url:'/pages/item/item'
				})
			},
			toDetail(id){
				uni.navigateTo({
					url:'/pages/index/detail?goodsid='+id
				})
			},
		}
	}
</script>

<style lang="less">
	// .status_bar {
	//     height: var(--status-bar-height);
	//     width: 100%;
	// 	}
	
	.header-wrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
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
			.header-set{
				font-size: 32upx;
				position: absolute;
				right: 32upx;
				top: 106upx;
				letter-spacing: 4upx;
			}
		}
	}
	.blank {
		width: 100%;
		height: 176upx;
	}	
	// 购物车为空 
	.empty-main{
		width: 100%;
		// height: 100%;
		padding-top: 37%;
		.empty-img{
			margin-left: 34%;
			image{
				width: 221upx;
				height: 193upx;
			}
		}
		.empty-text{
			color:rgba(170,170,170,1);
			text-align: center;
			margin-top: 60upx;
			margin-bottom: 26upx;
		}
		.empty-btn{
			width:240upx;
			height:66upx;
			line-height: 62upx;
			text-align: center;
			letter-spacing: 5upx;
			background:#00a0e9;
			// box-shadow:0px 10upx 10upx 0px #00a0e9;
			border-radius:33upx;
			color: #fff;
			font-weight: bold;
			margin-left: 32%;
		}
	}
	// 购物车满 
	.full-main{
		padding: 10upx 30upx 120upx;
		box-sizing: border-box;
		// position: absolute;
		// bottom: 0;
		// left: 0;
		// height: 100%;
		width: 100%;
		overflow-y: auto;
		.full-item{
			width: 100%;
			// height: 250upx;
			border-bottom: 1px solid #f2f2f5;
			padding-top: 25upx;
			box-sizing: border-box;
			display: flex;
			position: relative;
			.full-opt{
				margin-top: 12%;
				width:40upx;
				image{
					width:40upx;
					height:40upx;
				}
			}
			.full-img{
				// margin-left: 30upx;
				padding: 10upx 20upx 10upx 30upx;
				box-sizing: border-box;
				image{
					width: 180upx;
					height: 180upx;
				}
			}
			.full-text{
				padding: 20upx 10upx;
				flex: 1;
				.full-title{
					width:343upx;
					font-size:32upx;
					// font-weight:bold;
				}
				.full-intr{
					font-size:24upx;
					color:rgba(187,187,187,1);
					margin-top: 6upx;
					margin-bottom: 28upx;
					text{
						font-size:24upx;
						color:rgba(187,187,187,1);
					}
				}
				.full-price{
					display: flex;
					justify-content: space-between;
					width: 100%;
					.full-cost-price{
						color: #f31616;
						font-size:36upx;
						font-weight: bold;
						// color:rgba(255,0,0,1);
						.symbol{
							font-size: 24upx;
							
						}
					}
					.full-vip-price{
						font-size:24upx;
						color:rgba(255,0,0,1);
					}
					.full-num{
						font-size:32upx;
						color:rgba(187,187,187,1);
						position: absolute;
						right: 10upx;
						bottom: 36upx;
					}
					.num-computed{
						display: flex;
						// margin-left: 90upx;
						
						.num-common{
							font-size: 36upx;
							width:50upx;
							// height:50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							// line-height: 50upx;
							// text-align: center;
							// background:rgba(247,248,252,1);
							// border-radius:10upx;
							margin-left: 8upx;
							.num-symbol{
								width:30upx;
								height:30upx;
							}
						}
						.num-total{
							width: 70upx;
							font-weight: bold;
							// color: #f95555;
						}
					}
				}
			}
		}
	}
	// 结算
	.total-wrap{
		position: fixed;
		bottom: 100upx;
		/* #ifdef APP-PLUS */
		bottom: 0;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 0;
		/* #endif */
		left: 0;
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		background-color: #ffffff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		border-top:1px solid rgba(238,238,238,1);
		.total-opt{
			display: flex;
			align-items: center;
			image{
				width:40upx;
				height:40upx;
			}
			.total-text{
				margin-left: 30upx;
			}
		}
		.total-pr{
			display: flex;
			.total-common{
				width:240upx;
				height:100upx;
				line-height: 100upx;
				text-align: center;
			}
			.total-price{
				height:100upx;
				line-height: 100upx;
				font-size: 28upx;
				margin-right: 10upx;
				text{
					font-weight: bold;
					color: #FF0000;
					font-size: 32upx;
				}
			}
			.total-btn{
				font-size: 36upx;
				background:rgba(251,65,66,1);
				color: #ffffff;
				font-weight: bold;
			}
		}
	}
	// 删除弹窗
	.content-del{
		height: 360upx;
		width: 670upx;
		background-color: white;
		border-radius: 10upx;
		.del-text{
			padding:60upx 20upx;
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
				margin-top: 40upx;
			}
		}
		.del-btn{
			display: flex;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			.del-btn-no{
				border-right: 1px solid #e5e5e5;
				color: #aaa;
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
	// 推荐
	.foryou{
		padding: 40upx 34upx 100upx;
		box-sizing: border-box;
	}
	.foryou-line{
		margin-top: 60upx;
		border-bottom: 1px solid #dcd0d0;
		position: relative;
		.line-text{
			background-color: #ffffff;
			position: absolute;
			top: -20upx;
			left: 50%;
			transform: translateX(-50%);
			padding: 0 46upx;
			box-sizing: border-box;
			font-style: italic;
			letter-spacing: 4upx;
			color:#00a0e9;
		}
	}
	.foryou-main{
		margin-top: 50upx;
		
		// 二图
		.recomon-item2-wrap {
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			.recomon-item2 {
				width: 335upx;
				// height: 540upx;
				// margin-right: 6upx;
				background: rgba(255, 255, 255, 1);
				// box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius: 10upx;
			
				image {
					width: 335upx;
					height: 335upx;
				}
			
				.recomon-text2 {
					padding: 25upx 16upx;
			
					.recomon-title2 {
						width: 300upx;
						// font-weight: bold;
						color: #333;
						margin-bottom: 4upx;
						font-size: 32upx;
						line-height: 40upx;
					}
			
					.recomon-intr2 {
						// width: 259upx;
						font-size: 24upx;
						color: #939393;
						margin-bottom: 32upx;
						line-height: 30upx;
					}
			
					.recomon-price2 {
						// width:100upx;
						// height:32upx;
						
						align-items: center;
						justify-content: space-between;
						
					}
					.recomon-price2-2{
						font-size: 26upx;
						line-height: 26upx;
						font-weight: bold;
						font-family: numFont;
						.symbol{
							font-size: 24upx;
							line-height: 26upx;
							// font-weight: normal;
						}
					}
					.recomon-price-x2 {
						// width:120upx;
						color: #ec614a;
						display: flex;
						align-items: flex-end;
						line-height: 24upx;
						position: relative;
						// background-color: #dadada;
						// border-radius: 20upx;
						// padding: 4upx 12upx;
						.x2-symbol{
							font-size: 24upx;
							line-height: 26upx;
							font-weight: bold;
						}
						.x2-price{
							font-weight: bold;
							font-size: 38upx;
							line-height: 38upx;
							font-family: numFont;
						}
						
						.x2-img{
							
							width: 64upx;
							height: 78upx;
							position: absolute;
							top: -20upx;
							right: -64upx;
						}
					}
					.recomon-lowprice2 {
						justify-content: flex-end;
						// margin-top: 20upx;
			
						.recomon-num2 {
							// width: 110upx;
							height: 24upx;
							line-height: 24upx;
							font-size: 20upx;
							color: rgba(187, 187, 187, 1);
							font-weight: normal;
						}
					}
					.recomon-gouwuche2{
						justify-content: space-between;
						align-items: center;
						// padding-right: 8upx;
						font-size: 24upx;
						position: relative;
						margin-top: 8upx;
					}
					.gouwuche{
						border-radius: 50%;
						width: 58upx;
						height: 56upx;
						position: absolute;
						top: -12upx;
						right: -6upx;
						// margin-right: 8upx;
					}
					.gouwuche-text{
						
					}
				}
			}
		}
		
	}
	.content-del2{
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

