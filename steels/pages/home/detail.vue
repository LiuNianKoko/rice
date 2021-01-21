<template>
	<view>
		<view class="title disBetween" :class="isBg?'bgBlack':''" :style="[{height:CustomBar + 'px'},{paddingTop:StatusBar + 'px'}]">
			<view class="back-wrap height100 disCenter" @click="back">
				<image src="/static/back-white.png" class="back" mode=""></image>
			</view>
			<view class="font40 fontBold text-white" >
				货物详情
			</view>
			<view class="col-del back-wrap height100 disCenter" @click="del(info)" v-if="selfInfo.is_self == 1">
				下架
			</view>
			<view class="back-wrap height100" v-else>
				
			</view>
		</view>
		<view class="content-swiper" @click="previewImage()">
			<swiper class="yunnan-swiper-box" autoplay="true" circular="true" @change="change">
			    <swiper-item v-for="(item ,index) in bannerList" :key="index">
			        <view class="swiper-items">
			            <image :src="item" class="yunnan-img" mode="aspectFill"></image>
			        </view>
			    </swiper-item>
			</swiper>
			<view class="swiper-cur disCenter">
				{{current+1}}/{{bannerList.length}}
			</view>
		</view>
		<view class="contents">
			<view class="font36 fontBold marginBottom20">
				{{info.goods_name || ''}}
			</view>
			<view class="marginBottom20 price-wrap">
				<!-- <view class="price-wrap"> -->
					<view class="paddingBottom5">
						指导价
					</view>
					<view class="color-red fontBold font48">
						￥{{info.price || 0}}
					</view>
					<view class="price-type marginBottom10">
						{{info.goods_type == 1 ? '收购' : '出售'}}
					</view>
				<!-- </view> -->
				
			</view>
			<view class="disAlignCenter marginBottom20" @click="toMyRelease(selfInfo)">
				<view class="">
					发布者:{{selfInfo.nickname || ''}}
				</view>
				<view class="price-type" :class="selfInfo.is_attestation == 1?'price-act':''">
					{{selfInfo.is_attestation == 1?'已认证':'未认证'}}
				</view>
			</view>
			<view class="color-gray">
				{{info.desc || ''}}
			</view>
		</view>
		<view class="lines"></view>
		<view class="disAlignCenter contents">
			<view class="color-gray">
				发货
			</view>
			<view class="disAlignCenter local-wrap flex1">
				<image src="/static/local.png" class="local" mode="" @click="chooseMap"></image>
				<view class="line1">
					{{info.address || ''}}
				</view>
			</view>
			<view class="color-gray">
				月销{{info.show_alsalenum || 0}}
			</view>
		</view>
		<!-- <view class="lines" v-if="info.parameter_arr && info.parameter_arr.length > 0"></view>
		<view class="contents" v-if="info.parameter_arr &&info.parameter_arr.length > 0">
			<view class="fontBold font36 marginBottom30">
				商品参数
			</view>
			<view class="parameter disAlignCenter" v-for="(item,index) in info.parameter_arr" :key="index">
				<view class="color-gray parameter-left">
					{{item.name || ''}}
				</view>
				<view class="line1">
					{{item.value || ''}}
				</view>
			</view>
		</view> -->
		<view class="lines"></view>
		<view class="fontBold font36 contents">
			图文详情
		</view>
		<view class="detail-wrap" v-if="info.details && info.details != 'undefined'">
			<view v-html="info.details"></view>
		</view>
		<view class="detail-wrap" v-else>
			<view class="" v-for="(item,index) in info.user_img_arr" :key="index">
				<image :src="item" class="user-img" mode=""></image>
			</view>
		</view>
		<view class="blank"></view>
		<view class="btn-wrap disFlex">
			<view class="btn disCenter" @click="coll">
				<image src="/static/collect.png" class="btn-img" mode=""></image>
				{{info.is_collection == 0?'收藏':'已收藏'}}({{info.collection_count || 0}})
			</view>
			<view class="btn btn-r disCenter" @click="phoneCall">
				<image src="/static/phone-white.png" class="btn-img" mode=""></image>
				电话咨询
			</view>
			<view class="btn btn-report disCenter" @click="show('QSPop')">
				<image src="/static/jubao.png" class="btn-img" mode=""></image>
				举报
			</view>
		</view>
		
		<QSPopup ref="QSPop" type="fadeInUp">
			<view class="comm-box">
				<view class="">
					<textarea v-model="comments" placeholder="请填写举报理由" class="txt-area" maxlength="180"/>
				</view>
				<view class="put-btn-wrap">
					<view class="put-btn" @click="send">
						举报
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
				isBg:false,
				bannerList:[],
				current:0,
				id:0,
				info:{},
				selfInfo:{},
				comments:'',
				
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getInfo()
		},
		onPageScroll(e) {
			if(e.scrollTop >= 325){
				this.isBg = true
			}else{
				this.isBg = false
			}
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
			change(e) {
				this.current = e.detail.current;
			},
			// 查看banner大图
			previewImage(){
				uni.previewImage({
					urls:this.bannerList,
					current:this.current
				})
			},
			toMyRelease(item){
				console.log(item)
				if(item.is_self == 1){
					uni.navigateTo({
						url:'/pages/mine/myRelease'
					})
				}else{
					if(item.user_id == 0){
						return
					}
					uni.navigateTo({
						url:'/pages/mine/myRelease?id=' + item.user_id+ '&nickname=' + item.nickname
					})
				}
				
			},
			getInfo(){
				let data = {
					type:0,
					goods_id:this.id,
					token:uni.getStorageSync('token')
				}
				http('/api/Goods/goodsInfo','post',data).then(res=>{
					if(res.status == 200){
						this.info = res.data.goods
						this.bannerList = this.info.banner_arr
						this.selfInfo = this.info.user_data
						if(this.info.details){
							let reg = new RegExp('<img','gi')
							this.info.details = this.info.details.replace(reg,'<img style="width:100%;vertical-align: top;"')
						}
					}else{
						this.$util.showToast('该商品已被删除')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1300)
					}
					console.log(res)
				})
			},
			del(info){
				this.$util.showLoading('请稍候...')
				let data = {
					type:1,
					data_id:info.id,
					token:uni.getStorageSync('token')
				}
				http('/api/user/delete_publish','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:'下架成功!',
							icon:'none',
							image:'/static/success.png'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/shop'
							})
						},1200)
					}else{
						this.$util.showToast(res.msg)
					}
					this.$util.hideLoading()
					console.log(res)
				})
			},
			// 举报
			send(){
				if(this.comments == ''){
					this.$util.showToast('请填写举报理由')
					return
				}
				this.$util.showLoading('请稍候...')
				let data = {
					type:1,
					data_id:this.info.id,
					token:uni.getStorageSync('token'),
					reason:this.comments
				}
				http('/api/user/report','post',data).then(res=>{
					if(res.status == 200){
						uni.showToast({
							title:'举报成功!',
							icon:'none',
							image:'/static/success.png'
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
			},
			coll(){
				this.$util.showLoading('请稍候...')
				let data = {
					type:1,
					gid:this.info.id,
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
			phoneCall(){
				console.log(Boolean(this.info.phone))
				if(this.info.phone){
					let data = {
						goods_id:this.info.id,
						token:uni.getStorageSync('token')
					}
					http('/api/goods/call_goods','post',data).then(res=>{
						console.log(res)
					})
					uni.makePhoneCall({
						phoneNumber:this.info.phone
					})
				}else{
					this.$util.showToast('暂未设置电话号码')
				}
			},
			//高德转百度
			gps_bgps(gg_lng, gg_lat){
				var X_PI = Math.PI * 3000.0 / 180.0;
				var x = gg_lng, y = gg_lat;
				var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
				var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
				var bd_lng = z * Math.cos(theta) + 0.0065;
				var bd_lat = z * Math.sin(theta) + 0.006;
				return {
					latitude: bd_lat,
					longitude: bd_lng
				};
			},
			chooseMap() {
				 let item = this.info;
				 let url = ''
				 const des = {longitude:Number(item.lng),latitude:Number(item.lat)};
				 let baikuGps  = this.gps_bgps(des.longitude,des.latitude);
				 console.log(des);
				 console.log(baikuGps);
				 console.log(item)
				 let address = item.address;
				 console.log(address)
				if (plus.os.name=="Android") {
				     var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});
				     var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'});
				     var urlBaiduMap = "baidumap://map/marker?location="+baikuGps.latitude+","+baikuGps.longitude+"&title="+address+"&src=andr.companyName.appName";
				     var urlAmap = "androidamap://viewMap?sourceApplication=ningdongzixun&poiname="+address+"&lat="+des.latitude+"&lon="+des.longitude+"&dev=0"
				     if (hasAmap && hasBaiduMap) {
				      plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]}, function(e){
				       switch (e.index){
				        case 1:
				         plus.runtime.openURL(urlBaiduMap);
				         break;
				        case 2:
				         plus.runtime.openURL(urlAmap);
				         break;
				       }
				      })
				     }
				     else if (hasAmap) {
				      plus.runtime.openURL(urlAmap);
				     }
				     else if (hasBaiduMap) {
				      plus.runtime.openURL(urlBaiduMap);
				     }else{
				      uni.showModal({
				       title: '您未安装导航地图',
				       content: '是否去下载安装？',
				       success: function (res) {
				        if (res.confirm) {
				         console.log('用户点击确定');
				         plus.runtime.openURL("http://map.baidu.com/zt/client/index");
				        } else if (res.cancel) {
				         console.log('用户点击取消');
				        }
				       }
				      });
				     }
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "Apple地图"
						}, {
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						console.log("e.index: " + e.index);
						let latitude = des.latitude
						let longitude = des.longitude
						let bailatitude = baikuGps.latitude
						let bailongitude = baikuGps.longitude
						switch (e.index) {
							case 1:
								url = `http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${latitude},${longitude}&spn=0.008766,0.019441`;
								break;
							case 2:
								url = `baidumap://map/marker?location=${bailatitude},${bailongitude}&title=${address}&content=${address}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
								break;
							case 3:
								url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${address}&lat=${latitude}&lon=${longitude}&dev=0`
								break;
							default:
								break;
						}
						console.log(url)
						if (url != "") {
							
							url = encodeURI(url)
							 // plus.runtime.openURL(url);
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.height100{
		height: 100%;
	}
	.col-del{
		color: #fec71c;
	}
	.title{
		display: flex;
		align-items: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 199;
		.back-wrap{
			width: 80upx;
			.back{
				width: 24upx;
				height: 40upx;
			}
		}
		
	}
	.bgBlack{
		background: #000;
		opacity: 1;
		transition: all .3s;
	}
	.content-swiper{
		height: 750upx;
		position: relative;
		.yunnan-swiper-box{
			height: 750upx;
			.yunnan-img{
				width: 100%;
				height: 750upx;
			}
		}
		.swiper-cur{
			padding: 4upx 14upx;
			background:rgba(0,0,0,0.5);
			color: #fff;
			position: absolute;
			bottom: 0;
			right: 30upx;
			
		}
	}
	.price-wrap{
		display: flex;
		align-items: flex-end;
		
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
	.lines{
		background: #F5F5F9;
		height: 20upx;
	}
	.local-wrap{
		margin-left: 50upx;
		padding-right: 30upx;
		.local{
			width: 24upx;
			height: 28upx;
			flex: none;
			margin-right: 12upx;
		}
	}
	
	.parameter{
		margin-bottom: 20upx;
	}
	.parameter:last-child{
		margin-bottom: 0;
	}
	.parameter-left{
		margin-right: 50upx;
		text-align: right;
		width: 120upx;
	}
	.user-img{
		width: 100%;
		vertical-align: top;
		height: 750upx;
	}
	.detail-wrap{
		overflow: hidden;
	}
	.blank{
		height: 140upx;
	}
	.btn-wrap{
		width: 100%;
		padding: 20upx 30upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 119;
		.btn{
			background:#00A4FF;
			height: 90upx;
			color: #fff;
			font-size: 32upx;
			width: 37%;
		}
		.btn-img{
			width: 44upx;
			height: 44upx;
			margin-right: 16upx;
		}
		.btn-r{
			background: #171C61;
			width: 38%;
		}
		.btn-report{
			width: 25%;
			background:#131415;
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
</style>
