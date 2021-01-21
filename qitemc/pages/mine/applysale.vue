<template>
	<view class="applysale">
		<view class="pay-text" v-for="(data, index) in orderinfo.goods_data" :key="index">
			<view class="text-img"><image :src="data.cover"></image></view>
			<view class="text-intr">
				<view class="intr-name line1">{{ data.goods_name }}</view>
				<view class="intr-norm">
					<view class="intr-norm1 line1">规格:{{ data.goods_attr_name }}</view>
				</view>
				<view class="text-prices">
					<text style="font-size: 24upx;">￥</text>{{ data.goods_price }}
				</view>
			</view>
			<view class="text-price">
				
				<view class="text-num">x{{ data.goods_num }}</view>
			</view>
		</view>
		<view class="borfive">
			<view class=" disflex felie-item boxsizing borfivtop border_bottom">
				<view class=" bti">退货退款</view>
				<view class=" txtjt"><image class="huijt" @click="chagetuik(1)" :src="tuiktype == 1 ? '/static/select.png' : '/static/unselect.png'" mode=""></image></view>
			</view>
			<view class="disflex felie-item boxsizing borfivbottom">
				<view class=" bti">仅退款</view>
				<view class=" txtjt"><image class="huijt" @click="chagetuik(2)" :src="tuiktype == 2 ? '/static/select.png' : '/static/unselect.png'" mode=""></image></view>
			</view>
		</view>
		<view class="borfive">
			<view class=" disflex felie-item boxsizing borfivtop border_bottom">
				<view class=" bti">货物状态</view>
				<view class=" txtjt disflex" @click="chagehwu">
					
					{{hwuTxt||'请选择'}}
					<image class="huijt arrow" src="/static/huijt.png" mode=""></image>
				</view>
			</view>
			<view class=" disflex felie-item boxsizing borfivbottom">
				<view class="bti">退款原因</view>
				<view class="txtjt disflex" @click="chagetuikse">
					{{refuseTxt||'请选择'}}
					<image class="huijt arrow" src="/static/huijt.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="borfive">
			<view class="felie-item disflex boxsizing borfivtop border_bottom" style="justify-content: flex-start;">
				<view class=" bti">退款金额</view>
				<view class="tuikjine"><text style="font-size: 24upx;">￥</text>{{ orderinfo.goods_data[0].totalprice }}</view>
			</view>
			<view class="felie-item disflex boxsizing borfivbottom" style="justify-content: flex-start;">
				<view class=" bti">退款说明</view>
				<view class=""><input class="tuikipt" v-model="explain" type="text" value="" placeholder="选填" /></view>
			</view>
		</view>
		
		<view class="pingz-wrap">
			<view class="pztitle">上传凭证</view>
			<view class="up-content disflex">
				<view class="grapy-item disflex">
					<view class="pz-img" v-for="(data, index) in imgpathArr" :key="index"><image :src="data" mode="aspectFill"></image></view>
					<!-- <view class="pz-img">
						<image src="/static/commentpic.png" mode=""></image>
					</view>
					<view class="pz-img">
						<image src="/static/commentpic.png" mode=""></image>
					</view> -->
				</view>
				<view class="upbtn" @click="didPressChooseImage" v-if="imgpathArr.length<3">
					<image src="/static/zhangh.png"></image>
					<view class="bti">
						上传凭证
						<br />
						(最多3张)
					</view>
				</view>
			</view>
		</view>
		<view class="pay-ffooter" @click="putPinglun">确认</view>
	</view>
</template>

<script>
import qiniuUploader from '../../common/qiniuUploader.js';
import http from '@/api/http.js';
export default {
	data() {
		return {
			tuiktype: 1,
			orderid: '',
			orderinfo: {},
			uptoken: '',
			imgpathArr: [],
			imgpathArr2: [],
			refundReasonLists:[],
			refuseType:-1,
			hwuType:-1,
			refuseTxt:'',
			hwuTxt:'',
			explain:'',
			goods_id:''
		};
	},
	onLoad(option) {
		this.getRefundReason();
		this.orderid = option.orderid;
		this.goods_id = option.good_id;
		this.getorder(this.orderid);
		this.gettutoken();
	},
	methods: {
		putPinglun(){
			try{
				if(!this.hwuTxt){
					throw '请选择货物状态'
				}
				if(!this.refuseTxt){
					throw '请选择退款原因'
				}
				// if(!this.explain){
				// 	throw '请填写退款说明'
				// }
				
			}catch(e){
				//TODO handle the exception
				this.$util.showToast(e);
				return false
			}
			this.$util.showLoading('请稍后');
			let data = {
				token: uni.getStorageSync('token'),
				type:this.tuiktype,
				goods_id:this.goods_id,
				order_id:this.orderid,
				reason:this.refuseTxt,
				explain:this.explain,
				money:this.orderinfo.totalprice,
				image:this.imgpathArr2.join(','),
				goods_status:this.hwuTxt
			};
			http('/api/AfterSale/serviceOrder', 'post', data).then(res => {
				// console.log(res.data.data.bannerList.data)
				if(res.data.status==200){
					this.$util.showToast(res.data.msg);
					setTimeout(()=>{
						// uni.navigateTo({
						// 	url:'/pages/mine/order-aftersale?service_id='+res.data.data.service_id
						// })
						uni.switchTab({
							url:'/pages/mine/mine'
						})
					},2000)
					this.$util.hideLoading();
				}else{
					this.$util.showToast(res.data.msg);
					return
				}
				
			});
		},
		gettutoken() {
			let data = {
				token: uni.getStorageSync('token')
			};
			http('/api/Setting/getQinToken', 'post', data).then(res => {
				// console.log(res.data.data.bannerList.data)
				console.log(res.data.data.token);
				this.uptoken = res.data.data.token;
			});
		},
		getorder(orderid) {
			let data = {
				order_id: orderid,
				goods_order_id:this.goods_id,
				token: uni.getStorageSync('token')
			};
			this.$util.showLoading('请稍后');
			http('/api/Order/orderInfo', 'post', data).then(res => {
				// console.log(res.data.data.bannerList.data)
				this.orderinfo = res.data.data;
				console.log(this.orderinfo);
				this.$util.hideLoading();
			});
		},
		getRefundReason() {
			let data = {
				token: uni.getStorageSync('token')
			};
			http('/api/Aftersale/getRefundReason', 'get', data).then(res => {
				this.refundReasonLists = res.data.data.refundReasonLists;
			});
		},
		didPressChooseImage() {
			// if(this.imgpathArr.length==3){
			// 	this.$util.showToast('只能上传三张~');
			// 	return false;
			// }
			let that = this;
			console.log(that.uptoken);
			let imgpathArr = [];
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					that.$util.showLoading('请稍后');
					let key =
						new Date().getTime() +
						Math.random()
							.toString(36)
							.substr(2);
					const filePath = res.tempFilePaths[0];
					// this.avtorsrc = res.tempFilePaths[0];
					console.log(filePath)
					that.imgpathArr.push(res.tempFilePaths[0]);
					console.log(that.imgpathArr)
					qiniuUploader.upload(
						filePath,
						res => {
							let path = '/' + res.key;
							that.imgpathArr2.push(path);
							console.log(that.imgpathArr2)
							that.$util.hideLoading();
						},
						error => {
							console.log('error: ' + error);
							that.$util.showToast('图片上传超时');
							that.$util.hideLoading();
						},
						{
							key: key + '.jpg',
							region: 'SCN',
							domain: 'clothpic.sayyin.com',
							// domain: 'ricepic.sayyin.com',
							uptoken: that.uptoken
						},
						res => {},
						() => {
							// 取消上传
						},
						() => {
							// `before` 上传前执行的操作
						},
						err => {
							// `complete` 上传接受后执行的操作(无论成功还是失败都执行)
						}
					);
				}
			});
		},
		chagetuik(i) {
			this.tuiktype = i;
		},
		chagehwu() {
			let that = this;
			uni.showActionSheet({
				itemList: ['已收到货物', '未收到货物'],
				success: function(res) {
					that.hwuType = res.tapIndex;
					that.hwuTxt = res.tapIndex==0?'已收到货物':'未收到货物'
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		chagetuikse() {
			let that = this;
			let refuse = [];
			that.refundReasonLists.map((item)=>{
				refuse.push(item.content);
			})
			uni.showActionSheet({
				itemList: refuse,
				success: function(res) {
					that.refuseType = res.tapIndex;
					that.refuseTxt = that.refundReasonLists[res.tapIndex].content;
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: #f2f2f5;
}
.pay-ffooter {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: #fb4142;
	height: 100upx;
	line-height: 100upx;
	width: 100%;
	box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
	font-size: 32upx;
	color: #ffffff;
	text-align: center;
}
.pingz-wrap {
	background-color: #ffffff;
	margin-top: 20upx;
	padding: 28upx;
	margin-bottom: 80upx;
	.pztitle {
		margin-bottom: 20upx;
	}
}
.up-content {
	.grapy-item {
		.pz-img {
			margin-right: 20upx;
		}
		image {
			width: 120upx;
			height: 120upx;
		}
	}
	.upbtn {
		width: 120upx;
		height: 120upx;
		border: 1px dashed #aaaaaa;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content:center;
		image {
			width: 36upx;
			height: 32upx;
			margin-top: 9upx;
		}
		.bti {
			color: #aaaaaa;
			font-size: 11upx;
			text-align: center;
			transform: scale(0.75);
		}
	}
}
.applysale {
	padding: 30upx;
}
.tuikjine {
	color: #ec614a;
	font-size: 28upx;
	margin-left: 20upx;
}
.tuikipt {
	height: 70upx;
	padding-left: 20upx;
	margin-top: 10upx;
	box-sizing: border-box;
}
.pay-text {
	display: flex;
	border-radius: 5px;
	justify-content: space-between;
	margin-bottom: 32upx;
	background-color: #ffffff;
	padding: 24upx;
	
	.text-img {
		image {
			width: 180upx;
			height: 180upx;
		}
	}
	.text-intr {
		width: 240upx;
		margin-left: -100upx;
		position: relative;
		.intr-name {
			font-size: 32upx;
		}
		.intr-norm {
			color: #aaaaaa;
			margin-top: -4upx;
			
			.intr-norm1 {
				font-size: 24upx;
			}
			.intr-norm2 {
				font-size: 24upx;
			}
		}
	}
	.text-price {
		
		.text-num {
			font-size: 26upx;
			color: #aaaaaa;
			text-align: right;
			letter-spacing: 5upx;
		}
	}
	.text-prices{
		color: #ec614a;
		position: absolute;
		left: 0;
		bottom: 0;
	}
}
.borfive {
	margin-top: 30upx;
}
.borfiveborder {
	border-radius: 5px;
}
.borfivtop {
	border-radius: 5px 5px 0 0;
}
.borfivbottom {
	border-radius: 0 0 7px 7px;
}

.felie-item {
	height: 100upx;
	width: 100%;
	justify-content: space-between;
	line-height: 100upx;
	background-color: #ffffff;
	padding: 0 30upx;
	.bti {
		font-size: 28upx;
		color: #000000;
	}
	.txtjt {
		align-items: center;
		display: flex;
		font-size: 28upx;
		color: #aaaaaa;
	}
	.huijt {
		width: 36upx;
		height: 36upx;
		vertical-align: bottom;

		&.arrow {
			width: 28upx;
			height: 28upx;
			margin-left: 10upx;
		}
	}
}
</style>
