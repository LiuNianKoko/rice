<template>
	<view>
		<view class="title disBetween" :style="[{height:CustomBar+ 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap disAlignCenter" @click="show('QSPop')">
				<image src="/static/close-b.png" class="back" mode=""></image>
			</view>
			<view class="title-txt">
				发布动态
			</view>
			<view class="back-wrap"></view>
		</view>
		<view :style="[{height:CustomBar + 'px'}]"></view>
		<view class="wrap">
			<view class="rel-item disAlignCenter">
				<view class="font32 fontBold color-blackB">
					选择分类
				</view>
				<view class="inputs-wrap disBetween" @click="show('QSPopSort')">
					<input type="text" class="inputs" placeholder="请选择" v-model="sortTxt" placeholder-class="inputs-pla" disabled/>
					<view class="disCenter down-wrap">
						<image src="/static/down2.png" class="down" mode=""></image>
					</view>
				</view>
			</view>
			<view class="text-wrap">
				<textarea v-model="comment" placeholder="写动态..." class="text-main" maxlength="500" auto-height/>
			</view>
			<view class="img-wrap">
				<view class="img-box img-item" v-for="(item,index) in imgArr" :key="index">
					<image :src="item" class="imgs" mode=""></image>
					<image src="/static/close-g.png" class="del" mode="" @click="del(index)"></image>
				</view>
				<view class="img-add img-item disCenter" @click="didPressChooseImage" v-if="imgArr.length< 9">
					<image src="/static/add-bor.png" class="add-bor" mode=""></image>
				</view>
			</view>
		</view>
		
		
		<view class="blank"></view>
		<view class="bot-wrap">
			<view class="bot disCenter" @click="back(2)">
				发布
			</view>
		</view>
		
		<QSPopup ref="QSPop" type="fadeInUp">
			<view class="back-box">
				<view class="back-item color-999 font32 disCenter">
					保存内容再退出
				</view>
				<view class="back-item color-com font32 disCenter" @click="back(1)">
					保存
				</view>
				<view class="back-item color-blackB font32 disCenter" @click="back(3)">
					不保存
				</view>
				<view class="back-item color-999 font32 disCenter" @click="hides('QSPop')">
					取消
				</view>
			</view>
		</QSPopup>
		
		<QSPopup ref="QSPopSort" type="fadeInUp" :tapMaskHide="false">
			<view class="box">
				<view class="disBetween contents">
					<view class="disCenter close-box"></view>
					<view class="close-title">选择论坛分类</view>
					<view class="disCenter close-box" @tap="hides('QSPopSort')">
						<image src="/static/close-black.png" class="close" mode=""></image>
					</view>
				</view>
				<view class="sort-wrap">
					<picker-view indicator-style="height: 80upx;" @change="bindChange" :value="val">
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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				comment:'',
				sortTxtBefore:'',
				sortTxt:'',
				sortsId:0,
				sorts:[],
				imgArr:[],
				uptoken:'',
				val:[0],
				draft:null,//草稿箱
				
			}
		},
		onLoad() {
			this.gettutoken()
			this.getInfo()
			this.getDraft()
		},
		methods: {
			show(ref) {
				this.$refs[ref].show();
			},
			hides(ref) {
				this.$refs[ref].hide();
			},
			back(type){
				if(type == 3){
					uni.setStorageSync('release',type)
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/forum'
						})
					},100)
				}else{
					if(this.sortsId == 0){
						this.$util.showToast('请选择分类')
						return
					}
					if(this.comment == ''){
						this.$util.showToast('没有写动态哟~')
						return
					}
					// let img = JSON.stringify(this.imgArr)
					let data = {
						token:uni.getStorageSync('token'),
						is_drafts:type,
						category_id:this.sortsId,
						content:this.comment,
						img:this.imgArr
					}
					http('/api/Forum/releaseForum','post',data).then(res=>{
						if(res.status == 200){
							uni.setStorageSync('release',type)
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/index/forum'
								})
							},100)
						}else{
							this.$util.showToast(res.message || res.msg)
						}
						console.log(res)
					})
				}
			},
			getInfo(){
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/Forum/banner','post',data).then(res=>{
					if(res.status == 200){
						this.sorts = res.data.categoryList
					}
					console.log(res)
				})
			},
			// 获取草稿箱
			getDraft(){
				let data = {
					token:uni.getStorageSync('token'),
					type:2
				}
				http('/api/Forum/forumDetails','post',data).then(res=>{
					if(res.status == 200){
						this.draft = res.data.forum
						if(this.draft){
							this.sortTxt = this.draft.category_name
							this.sortsId = this.draft.category_id
							this.comment = this.draft.content
							if(this.draft.img){
								this.imgArr = this.draft.img_arr
							}
						}
					}
					console.log(res)
				})
			},
			bindChange(val){
				console.log(val)
				let _this=this;
				let arr=val.detail.value;
				_this.sortTxtBefore = _this.sorts[arr[0]].name
				_this.sortsId = _this.sorts[arr[0]].id
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
				this.hides('QSPopSort')
			},
			gettutoken(){
				let data = {
					token:uni.getStorageSync('token')
				};
				http('/api/Setting/getQinToken', 'post', data).then(res => {
					console.log(res)
					this.uptoken = res.data.token;
				});
			},
			del(index){
				this.imgArr.splice(index,1)
			},
			// didPressChooseImage(){
			// 	let that = this;
			// 	console.log(that.uptoken);
			// 	uni.chooseImage({
			// 		count: 1, // 默认9
			// 		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
			// 		success: (res) => {
			// 			that.$util.showLoading('请稍后');
			// 			let key = new Date().getTime()+Math.random().toString(36).substr(2);
			// 			const filePath = res.tempFilePaths[0];
			// 			console.log(filePath);
			// 			// stat  仅获取资源的Metadata信息，不返回资源内容 
			// 			qiniuUploader.upload(filePath, (ress) => {
			// 				let path =ress.key;
			// 				if(path == undefined){
			// 					that.$util.showToast('令牌过期，请重新上传');
			// 					that.gettutoken();
			// 				}else{
			// 					let src = 'http://pic.ningdongzixun.com/' + path;
			// 					that.imgArr.push(src);
			// 				}
			// 				that.$util.hideLoading();
			// 			}, (error) => {
			// 			  console.log('error: ' + error);
			// 			  that.$util.showToast('令牌过期，请重新上传');
			// 			  that.gettutoken();
			// 			  that.imgArr = [];
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
			async didPressChooseImage(){
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
					uni.chooseImage({
						count: 1, // 默认9
						sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
						success: (res) => {
							that.$util.showLoading('请稍后');
							let key = new Date().getTime()+Math.random().toString(36).substr(2);
							const filePath = res.tempFilePaths[0];
							console.log(filePath);
							// stat  仅获取资源的Metadata信息，不返回资源内容 
							qiniuUploader.upload(filePath, (ress) => {
								let path =ress.key;
								if(path == undefined){
									that.$util.showToast('令牌过期，请重新上传');
									that.gettutoken();
								}else{
									let src = 'http://pic.ningdongzixun.com/' + path;
									that.imgArr.push(src);
								}
								that.$util.hideLoading();
							}, (error) => {
							  console.log('error: ' + error);
							  that.$util.showToast('令牌过期，请重新上传');
							  that.gettutoken();
							  that.imgArr = [];
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
		}
	}
</script>

<style lang="less">
	.title{
		display: flex;
		align-items: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		padding: 0 32upx;
		background-color: #fff;
		.back-wrap{
			width: 42upx;
			height: 42upx;
			.back{
				width: 32upx;
				height: 32upx;
			}
		}
		.title-txt{
			color: #30313B;
			font-size: 40upx;
			font-weight: bold;
		}
	}
	.wrap{
		padding: 30upx;
	}
	.text-wrap{
		
		.text-main{
			width: 100%;
			height: 200upx;
		}
	}
	.img-wrap{
		margin-top: 70upx;
		display: flex;
		flex-wrap: wrap;
		.img-item{
			width: 33.3%;
			margin-bottom: 20upx;
		}
		.img-box{
			position: relative;
			border-radius: 10upx;
			.imgs{
				width: 218upx;
				height: 218upx;
				border-radius: 10upx;
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
			width: 218upx;
			height: 218upx;
			border: 1px dashed #bbb;
			border-radius: 10upx;
			.add-bor{
				width: 60upx;
				height: 60upx;
			}
		}
	}
	.blank{
		height: 80upx;
	}
	.bot-wrap{
		height: 80upx;
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 199;
		padding: 10upx 30upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-top: 1px solid #e5e5e5;
		.bot{
			width: 110upx;
			height: 50upx;
			background: #00B4FF;
			border-radius: 10upx;
			color: #fff;
		}
	}
	.back-box{
		width: 750upx;
		background: #fff;
		padding: 20upx;
		.back-item{
			padding: 20upx 0;
		}
	}
	
	.inputs-pla{
		color: #b3b3b3;
	}
	.rel-item{
		margin-bottom: 50upx;
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
