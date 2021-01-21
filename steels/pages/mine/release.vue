<template>
	<view>
		<view class="wrap">
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB">
					货物信息
				</view>
				<view class="info-right font32 disAlignCenter" >
					<view class="disAlignCenter" @click="changeType(1)">
						<image :src="goodsType==1?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
						
						收购
					</view>
					<view class="disAlignCenter marl" @click="changeType(2)">
						<image :src="goodsType==2?'/static/seled.png':'/static/sel.png'" class="sel" mode=""></image>
						出售
					</view>
				</view>
			</view>
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB">
					货物名称
				</view>
				<view class="inputs-wrap">
					<input type="text" class="inputs" placeholder="输入货物名称" v-model="goodsName" placeholder-class="inputs-pla"/>
				</view>
			</view>
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB">
					货物分类
				</view>
				<view class="inputs-wrap disBetween" @click="show('QSPop')">
					<input type="text" class="inputs" placeholder="请选择" v-model="sortTxt" placeholder-class="inputs-pla" disabled/>
					<view class="disCenter down-wrap">
						<image src="/static/down2.png" class="down" mode=""></image>
					</view>
				</view>
			</view>
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB left-txt">
					<text>价</text><text>格</text>
				</view>
				<view class="inputs-wrap disBetween">
					<input type="number" class="inputs" v-model="price" placeholder="输入货物价格" placeholder-class="inputs-pla"/>
					<view class="disCenter down-wrap">
						元
					</view>
				</view>
			</view>
			<view class="rel-item">
				
				<view class="font32 fontBold color-blackB left-txt">
					<text>简</text><text>介</text>
				</view>
				<view class="inputs-area-wrap ">
					<textarea class="inputs-area" maxlength="600" v-model="desc" @input="descInput" placeholder="描述你的货物..." placeholder-class="inputs-pla"/>
					<view class="input-len">
						{{descNum}}/600
					</view>
				</view>
			</view>
			<view class="font32 fontBold color-blackB rel-sub-title">
				添加封面（最多5张）
			</view>
			<view class="img-wrap add-parameter">
				<view class="img-box img-item" v-for="(item,index) in homepage" :key="index">
					<image :src="item" class="imgs" mode=""></image>
					<image src="/static/close-g.png" class="del" mode="" @click="delHomepage(index)"></image>
				</view>
				<view class="img-add img-item disCenter" @click="chooseHomepage" v-if="homepage.length< 5">
					<image src="/static/add-bor.png" class="add-bor" mode=""></image>
				</view>
			</view>
			<!-- <view class="font32 fontBold color-blackB rel-sub-title">
				货物参数
			</view>
			<view class="disBetween marginBottom30" v-for="(item,index) in parameter" :key="index">
				<view class="para-inputs-wrap">
					<input type="text" class="para-inputs" v-model="item.name" placeholder="输入参数名" placeholder-class="inputs-pla"/>
				</view>
				<view class="para-inputs-wrap para-inputs-wrap2">
					<input type="text" class="para-inputs" v-model="item.value" placeholder="输入参数" placeholder-class="inputs-pla"/>
				</view>
				<view class="disCenter">
					<image src="/static/del.png" class="del" mode="" @click="delParameter(index)"></image>
				</view>
			</view>
			<view class="font32 color-steel disCenter add-parameter" @click="addParameter">
				添加参数
			</view> -->
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB">
					地 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 址
				</view>
				<view class="inputs-wrap disBetween" @tap="chooseAddr">
					<input type="text" class="inputs" v-model="address" disabled placeholder="请选择地址" placeholder-class="inputs-pla"/>
					<view class="disCenter down-wrap" >
						<image src="/static/down2.png" class="down" mode=""></image>
					</view>
				</view>
			</view>
			<view class="font32 fontBold color-blackB rel-sub-title">
				添加货物图片（最多10张）
			</view>
			<view class="img-wrap">
				<view class="img-box img-item" v-for="(item,index) in detailpage" :key="index">
					<image :src="item" class="imgs" mode=""></image>
					<image src="/static/close-g.png" class="del" mode="" @click="delDetailpage(index)"></image>
				</view>
				<view class="img-add img-item disCenter" @click="chooseDetailpage" v-if="detailpage.length< 10">
					<image src="/static/add-bor.png" class="add-bor" mode=""></image>
				</view>
			</view>
			
			<view class="bot-wrap disFlex">
				<view class="bot disCenter" @click="sure(0)">
					保存草稿
				</view>
				<view class="bot bot-r disCenter" @click="sure(1)">
					发布
				</view>
			</view>
		</view>
		
		<QSPopup ref="QSPop" type="fadeInUp" :tapMaskHide="false">
			<view class="box">
				<view class="disBetween contents">
					<view class="disCenter close-box"></view>
					<view class="close-title">选择货物分类</view>
					<view class="disCenter close-box" @tap="hides('QSPop')">
						<image src="/static/close-black.png" class="close" mode=""></image>
					</view>
				</view>
				<view class="sort-wrap">
					<picker-view indicator-style="height: 80upx;" @change="bindChange">
						<picker-view-column>
						    <view class="sort-item" v-for="(item,index) in sorts" :key="index">
						    	{{item.name}}
						    </view>
						</picker-view-column>
					</picker-view>
				</view>
				<view class="btn-wraps">
					<view class="btns disCenter" @tap="sureSort()">
						确定
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	import http from '@/api/http.js';
	import QSPopup from '@/components/QS-popup/QS-popup.vue';
	import qiniuUploader from '@/common/qiniuUploader.js';
	import permision from "@/common/permission.js"
	export default {
		components:{QSPopup},
		data() {
			return {
				goodsType:1,//1收购   2出售
				parameter:[{name:'',value:''}],//参数
				sorts:[],//货物分类
				sortsId:0,
				sortTxtBefore:'',//分类名选中前
				sortTxt:'',//分类名
				goodsName:'',
				price:'',
				desc:'',
				descNum:0,
				address:'',
				lat:'',
				lng:'',
				homepage:['http://steels.sayyin.com/default.jpg'],
				detailpage:['http://steels.sayyin.com/default.jpg'],
				uptoken:'',
			}
		},
		onLoad() {
			this.gettutoken()
			this.getSortList()
			this.getInfo()
		},
		onShow() {
			uni.$once('location', (data) => {
			    console.log(data)
				this.address = data.address
				this.lat = data.point.latitude
				this.lng = data.point.longitude
			});
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			changeType(type){
				this.goodsType = type
			},
			gettutoken(){
				let data = {
					token:uni.getStorageSync('token'),
				};
				http('/api/Setting/getQinToken', 'post', data).then(res => {
					console.log(res)
					this.uptoken = res.data.token
				});
			},
			sureSort(){
				if(this.sortsId == 0){
					this.sortTxt = this.sorts[0].name
					this.sortsId = this.sorts[0].id
				}else{
					if(this.sortTxtBefore == ''){
						this.sortTxt = this.sorts[0].name
						this.sortsId = this.sorts[0].id
					}else{
						this.sortTxt = this.sortTxtBefore
					}
				}
				this.hides('QSPop')
				let data = {
					category_id:this.sortsId,
					token:uni.getStorageSync('token')
				}
				http('/api/Goods/get_ream_category','post',data).then(res=>{
					if(res.status == 200){
						let list = res.data.ream_category_list
						this.parameter = [{name:'',value:''}]
						if(list.length > 0){
							let para = []
							list.map((item)=>{
								para.push({name:item,value:''})
							})
							console.log(para)
							this.parameter = para
						}
					}
					console.log(res)
				})
			},
			bindChange(val){
				let _this=this;
				let arr=val.detail.value;
				this.sortTxtBefore = this.sorts[arr[0]].name
				this.sortsId = this.sorts[arr[0]].id
				
			},
			descInput(e){
				console.log(e)
				this.descNum = e.detail.value.length
			},
			getSortList(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Goods/get_category_list','post',data).then(res=>{
					if(res.status == 200){
						this.sorts = res.data.category_list
					}
					console.log(res)
				})
			},
			getInfo(){
				let data = {
					type:1,
					token:uni.getStorageSync('token')
				}
				http('/api/Goods/goodsInfo','post',data).then(res=>{
					if(res.status == 200){
						let info = res.data.goods
						if(info){
							this.goodsName = info.goods_name
							if(info.category_id != 0){
								this.sortsId = info.category_id
								this.sortTxt = info.category_name
							}
							if(info.price != '0.00'){
								this.price = info.price
							}
							if(info.desc){
								this.desc = info.desc
							}
							if(info.banner){
								this.homepage = info.banner_arr
							}
							this.parameter = info.parameter_arr
							if(info.address){
								this.address = info.address
							}
							if(info.lat){
								this.lat = info.lat
							}
							if(info.lng){
								this.lng = info.lng
							}
							if(info.user_img){
								this.detailpage = info.user_img_arr
							}
						}
					}
					console.log(res)
				})
			},
			// 删除参数
			delParameter(i){
				if(this.parameter.length <= 1)return
				this.parameter.splice(i,1)
			},
			//添加参数
			addParameter(){
				let para = {name:'',value:''}
				this.parameter.push(para)
				console.log(this.parameter)
			},
			getCity(info){
				let data = {
					token:uni.getStorageSync('token'),
					longitude:info.longitude,
					latitude:info.latitude,
					address:info.address
				}
				console.log(data)
				http('/Api/Index/getCity','post',data).then(res=>{
					console.log(res)
					if(res.status==200){
						this.address = res.data.address
					}
				})
			},
			chooseAddr(){
				let that = this
				 // 先判断定位权限是否开启
				uni.getLocation({
					success(suc){
						console.log(suc)
						// uni.chooseLocation({
						// 	success(res) {
						// 		console.log(res)
						// 		that.getCity(res)
						// 		that.lat = res.latitude
						// 		that.lng = res.longitude
								
						// 	},
						// })
						uni.navigateTo({
							url:'/pages/mine/location'
						})
					},
					fail(e) {
						console.log(e)
						that.$util.showToast('请打开手机定位权限')
					   // App跳转系统的设置界面
						// #ifdef APP-PLUS
						uni.getSystemInfo({
							success(sys) {
								if(sys.platform=='ios'){ //IOS
									plus.runtime.openURL("app-settings://");
								} else if (sys.platform=='Android'){ //安卓
									// 跳转设置页(无效)
									// let main = plus.android.runtimeMainActivity();
									// let Intent = plus.android.importClass("android.content.Intent");
									// let mIntent = new Intent('android.settings.ACTION_SETTINGS');
									// main.startActivity(mIntent);
									// 跳转设置页(未检测)
									var Intent = plus.android.importClass("android.content.Intent");
									var Settings = plus.android.importClass("android.provider.Settings");
									var Uri = plus.android.importClass("android.net.Uri");
									var mainActivity = plus.android.runtimeMainActivity();
									var intent = new Intent();
									intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
									var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
									intent.setData(uri);
									mainActivity.startActivity(intent);
								}
							}
						});
						// #endif
					}
				})
				
			},
			sure(type){
				// 0保存草稿   1提交
				if(this.goodsName == ''){
					this.$util.showToast('请输入货物名称')
					return
				}
				if(type == 1){
					if(this.sortsId == 0){
						this.$util.showToast('请选择货物分类')
						return
					}
					if(this.price == ''){
						this.$util.showToast('请输入价格')
						return
					}
					if(this.desc == ''){
						this.$util.showToast('请输入简介')
						return
					}
					if(this.homepage.length == 0){
						this.$util.showToast('请添加封面')
						return
					}
					// let p = true
					// this.parameter.map(item=>{
					// 	if(item.name == '' || item.value == ''){
					// 		p = false
					// 	}
					// })
					// if(p == false){
					// 	this.$util.showToast('请输入参数')
					// 	return
					// }
					if(this.address == ''){
						this.$util.showToast('请输入地址')
						return
					}
					if(this.detailpage.length == 0){
						this.$util.showToast('请添加货物图片')
						return
					}
				}
				let para = JSON.stringify(this.parameter)
				let data = {
					token:uni.getStorageSync('token'),
					is_drafts:type,
					goods_name:this.goodsName,
					cid:this.sortsId,
					price:this.price,
					desc:this.desc,
					banner:this.homepage,
					cover:this.homepage[0] || '',
					lat:this.lat,
					lng:this.lng,
					addr_cur:this.address,
					user_img:this.detailpage,
					// parameter:para,
					goods_type:this.goodsType
				}
				http('/api/Goods/add_goods','post',data).then(res=>{
					if(res.status == 200){
						if(type == 0){
							uni.showToast({
								title:'保存成功!',
								icon:'none',
								image:'/static/success.png'
							})
						}else{
							uni.showToast({
								title:'发布成功!',
								icon:'none',
								image:'/static/success.png'
							})
						}
						
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1300)
					}else{
						uni.showToast({
							title:res.message || res.msg,
							icon:'none',
						})
					}
					console.log(res)
				})
				
				
			},
			delHomepage(index){
				this.homepage.splice(index,1)
			},
			// chooseHomepage(){
			// 	let that = this;
			// 	console.log(that.uptoken);
			// 	uni.chooseImage({
			// 		count: 1, // 默认9
			// 		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
			// 		success: (res) => {
			// 			that.$util.showLoading('请稍后');
			// 			let key = new Date().getTime()+Math.random().toString(36).substr(2);
			// 			const filePath = res.tempFilePaths[0];
						
			// 			console.log(filePath)
			// 			qiniuUploader.upload(filePath, (ress) => {
			// 				console.log(11)
			// 				let path =ress.key;
			// 				if(path == undefined){
			// 					that.$util.showToast('令牌过期，请重新上传')
			// 					that.gettutoken()
			// 				}else{
			// 					let src = 'http://pic.ningdongzixun.com/' + path
			// 					that.homepage.push(src);
			// 				}
			// 				that.$util.hideLoading();
			// 			}, (error) => {
			// 			  console.log('error: ' + error);
			// 			  that.$util.showToast('令牌过期，请重新上传')
			// 			  that.gettutoken()
			// 			  that.homepage = []
			// 			  that.$util.hideLoading();
			// 			},{
			// 			  key: key+'.jpg',
			// 			  region: 'SCN',
			// 			  domain: 'pic.ningdongzixun.com', 
			// 			  uptoken: that.uptoken
			// 			}, (res) => {
			// 			}, () => {
			// 			  // 取消上传
			// 			}, () => {
			// 			  // `before` 上传前执行的操作
			// 			}, (err) => {
			// 			  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
			// 			});
			// 		}
			// 	});
			// },
			async chooseHomepage(){
				let that = this
				var result
				if(uni.getSystemInfoSync().platform === 'android'){
					console.log('运行Android上')
					result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')
				}else{
					console.log('运行iOS上')
					
					result = 1
					
				}
				console.log(result)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
					let that = this;
					console.log(that.uptoken);
					uni.chooseImage({
						count: 1, // 默认9
						sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: (res) => {
							that.$util.showLoading('请稍后');
							let key = new Date().getTime()+Math.random().toString(36).substr(2);
							const filePath = res.tempFilePaths[0];
							
							console.log(filePath)
							qiniuUploader.upload(filePath, (ress) => {
								console.log(11)
								let path =ress.key;
								if(path == undefined){
									that.$util.showToast('令牌过期，请重新上传')
									that.gettutoken()
								}else{
									let src = 'http://pic.ningdongzixun.com/' + path
									that.homepage.push(src);
								}
								that.$util.hideLoading();
							}, (error) => {
							  console.log('error: ' + error);
							  that.$util.showToast('令牌过期，请重新上传')
							  that.gettutoken()
							  that.homepage = []
							  that.$util.hideLoading();
							},{
							  key: key+'.jpg',
							  region: 'SCN',
							  domain: 'pic.ningdongzixun.com', 
							  uptoken: that.uptoken
							}, (res) => {
							}, () => {
							  // 取消上传
							}, () => {
							  // `before` 上传前执行的操作
							}, (err) => {
							  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
							});
						}
					});
				} else if (result == 0) {
					strStatus = "未获得授权"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				} else {
					strStatus = "被永久拒绝权限"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				}
			},
			delDetailpage(index){
				this.detailpage.splice(index,1)
			},
			// chooseDetailpage(){
			// 	let that = this;
			// 	console.log(that.uptoken);
			// 	uni.chooseImage({
			// 		count: 1, // 默认9
			// 		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
			// 		success: (res) => {
			// 			that.$util.showLoading('请稍后');
			// 			let key = new Date().getTime()+Math.random().toString(36).substr(2);
			// 			const filePath = res.tempFilePaths[0];
						
			// 			console.log(filePath)
			// 			qiniuUploader.upload(filePath, (res) => {
			// 				let path =res.key;
			// 				if(path == undefined){
			// 					that.$util.showToast('令牌过期，请重新上传')
			// 					that.gettutoken()
			// 				}else{
			// 					let src = 'http://pic.ningdongzixun.com/' + path
			// 					that.detailpage.push(src);
			// 				}
			// 				that.$util.hideLoading();
			// 			}, (error) => {
			// 			  console.log('error: ' + error);
			// 			  that.$util.showToast('令牌过期，请重新上传')
			// 			  that.gettutoken()
			// 			  that.detailpage = []
			// 			  that.$util.hideLoading();
			// 			},{
			// 			  key: key+'.jpg',
			// 			  region: 'SCN',
			// 			  domain: 'pic.ningdongzixun.com', 
			// 			  uptoken: that.uptoken,
			// 			}, (res) => {
			// 			}, () => {
			// 			  // 取消上传
			// 			}, () => {
			// 			  // `before` 上传前执行的操作
			// 			}, (err) => {
			// 			  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
			// 			});
			// 		}
			// 	});
			// },
			async chooseDetailpage(){
				let that = this
				var result
				if(uni.getSystemInfoSync().platform === 'android'){
					console.log('运行Android上')
					result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')
				}else{
					console.log('运行iOS上')
					result = 1
				}
				console.log(result)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
					let that = this;
					console.log(that.uptoken);
					uni.chooseImage({
						count: 1, // 默认9
						sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: (res) => {
							that.$util.showLoading('请稍后');
							let key = new Date().getTime()+Math.random().toString(36).substr(2);
							const filePath = res.tempFilePaths[0];
							
							console.log(filePath)
							qiniuUploader.upload(filePath, (res) => {
								let path =res.key;
								if(path == undefined){
									that.$util.showToast('令牌过期，请重新上传')
									that.gettutoken()
								}else{
									let src = 'http://pic.ningdongzixun.com/' + path
									that.detailpage.push(src);
								}
								that.$util.hideLoading();
							}, (error) => {
							  console.log('error: ' + error);
							  that.$util.showToast('令牌过期，请重新上传')
							  that.gettutoken()
							  that.detailpage = []
							  that.$util.hideLoading();
							},{
							  key: key+'.jpg',
							  region: 'SCN',
							  domain: 'pic.ningdongzixun.com', 
							  uptoken: that.uptoken,
							}, (res) => {
							}, () => {
							  // 取消上传
							}, () => {
							  // `before` 上传前执行的操作
							}, (err) => {
							  // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
							});
						}
					});
				} else if (result == 0) {
					strStatus = "未获得授权"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				} else {
					strStatus = "被永久拒绝权限"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				}
			},
		}
	}
</script>

<style lang="less">
	.wrap{
		padding: 30upx;
	}
	.inputs-pla{
		color: #b3b3b3;
	}
	.sel{
		width: 36upx;
		height: 36upx;
		margin-top: 4upx;
		margin-right: 16upx;
	}
	.marl{
		margin-left: 100upx;
	}
	.rel-item{
		margin-bottom: 30upx;
		.left-txt{
			width: 128upx;
			display: flex;
			justify-content: space-between;
		}
		.info-right{
			margin-left: 30upx;
			padding: 20upx 10upx 20upx 0;
			flex: 1;
		}
		.inputs-wrap{
			margin-left: 30upx;
			padding: 20upx 10upx 20upx 20upx;
			border: 1px solid #DDDDDD;
			flex: 1;
			.inputs{
				font-size: 28upx;
				width: 90%;
			}
			.down-wrap{
				width: 40upx;
				height: 40upx;
			}
			.down{
				width: 20upx;
				height: 14upx;
			}
		}
		
		.inputs-area-wrap{
			height: 250upx;
			position: relative;
			border: 1px solid #DDDDDD;
			border-radius: 4upx;
			padding: 20upx;
			margin-top: 30upx;
			.inputs-area{
				width: 100%;
				height: 180upx;
				font-size: 28upx;
			}
			.input-len{
				position: absolute;
				right: 20upx;
				bottom: 10upx;
				color: #b3b3b3;
			}
		}
	}
	.rel-sub-title{
		margin-top: 50upx;
		margin-bottom: 30upx;
	}
	.add-parameter{
		margin-bottom: 50upx;
	}
	.img-wrap{
		display: flex;
		flex-wrap: wrap;
		.img-item{
			width: 25%;
		}
		.img-box{
			position: relative;
			.imgs{
				width: 92%;
				height: 158upx;
				margin-bottom: 10upx;
				border-radius: 4upx;
			}
			.del{
				width: 32upx;
				height: 32upx;
				position: absolute;
				right: 10%;
				top: 10upx;
				z-index: 10;
			}
		}
		.img-add{
			width: 158upx;
			height: 158upx;
			border: 1px dashed #bbb;
			border-radius: 10upx;
			.add-bor{
				width: 60upx;
				height: 60upx;
			}
		}
	}
	.para-inputs-wrap{
		padding: 20upx;
		border: 1px solid #DDDDDD;
		width: 40%;
		.para-inputs{
			font-size: 28upx;
			width: 100%;
		}
	}
	
	.para-inputs-wrap2{
		width: 50%;
	}
	.del{
		width: 40upx;
		height: 40upx;
		margin-left: 5upx;
	}
	
	.bot-wrap{
		margin-top: 80upx;
		padding-bottom: 40upx;
		.bot{
			background: #00A4FF;
			height: 90upx;
			font-size: 32upx;
			color: #fff;
			width: 50%;
		}
		.bot-r{
			background: #171C61;
		}
	}
	
	.box{
		width: 750upx;
		background-color: #fff;
		.close-box{
			width: 40upx;
			height: 40upx;
			.close{
				width: 28upx;
				height: 28upx;
			}
		}
		.close-title{
			color: #262626;
			font-size: 36upx;
			font-weight: bold;
		}
		picker-view{
			height: 100%;
		}
		.sort-wrap{
			height: 320upx;
			padding: 60upx 0;
			overflow: hidden;
		}
		.sort-item{
			text-align: center;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 32upx;
			color: #171C61;
		}
		.sort-act{
			color: #171C61;
			font-size: 36upx;
			font-weight: bold;
		}
		.btn-wraps{
			// width: 100%;
			padding: 0 32upx 10upx;
			background-color: #fff;
			.btns{
				background:#181C62;
				height: 90upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 32upx;
			}
		}
	}
</style>
