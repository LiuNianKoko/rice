<template>
	<view>
		<view class="img-box">
			<view class="img-wrap" v-for="(item,index) in imgArr" :key="index">
				<image :src="item.file" class="imgs" @click="previewImg(index)"></image>
				
				
				<!-- <image src="/static/img.png" class="imgs" @click="show('QSPhoto')"></image> -->
			</view>
		</view>
		
		<view class="bottom-wrap">
			<view class="pres font24 disCenter" @click="back">
				返回修改
			</view>
			<view class="nexts font24 text-white disCenter" @click="show('QSPopup')">
				第三步，确认提交
			</view>
		</view>
		
		<QSPopup ref="QSPopup">
			<view class="sure-content">
				<view class="sure-title">
					提交照片
				</view>
				<view class="disCenter">
					<image src="/static/photo.png" class="photo-icon"></image>
				</view>
				<view class="tips">
					是否确认提交，提交后不可修改
					，每个订单号只有一次修改机会
				</view>
				<view class="btns-wrap">
					<view class="btns disCenter btns-left" @click="hides('QSPopup')">
						取消
					</view>
					<view class="btns disCenter btns-right" @click="sureClick()">
						确认
					</view>
				</view>
			</view>
		</QSPopup>
		
		<QSPopup ref="QSPhoto">
			<view class="photo-wrap">
				<image :src="src" class="photos"></image>
				
				<image src="/static/del-white.png" class="del-white" @click="hides('QSPhoto')"></image>
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
				imgArr:[],//展示数组
				imgArrUp:[],//上传数组
				src:'',
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			let imgarr = uni.getStorageSync('imgarr')
			// let imgarr2 = uni.getStorageSync('imgarr2')
			this.imgArr = imgarr
			let imgId = []
			imgarr.map(item=>{
				imgId.push(item.id)
			})
			this.imgArrUp = imgId
			console.log(this.imgArr)
			console.log(this.imgArrUp)
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
			previewImg(index){
				this.show('QSPhoto')
				this.src = this.imgArr[index].file
			},
			sureClick(){
				this.hides('QSPopup')
				this.$util.showLoading('提交中')
				let data = {
					order_num:uni.getStorageSync('order'),
					img:JSON.stringify(this.imgArrUp)
				}
				http('/api/order/save','post',data).then(res=>{
					if(res.sta == 200){
						this.$util.hideLoading()
						uni.reLaunch({
							url:'/pages/index/success'
						})
						uni.setStorageSync('imgarr','')
						// uni.setStorageSync('imgarr2','')
					}else{
						this.$util.showToast(res.msg)
						this.$util.hideLoading()
					}
				})
				
			},
			
		}
	}
</script>

<style lang="less">
	
	.img-box{
		display: flex;
		flex-wrap: wrap;
		padding: 46upx;
	}
	.img-wrap{
		position: relative;
		margin-bottom: 50upx;
		width: 33%;
	}
	.imgs{
		border-radius: 10upx;
		width: 190upx;
		height: 190upx;
	}
	.marginRight40{
		margin-right: 42upx;
	}
	.bottom-wrap{
		display: flex;
		justify-content: space-between;
		padding: 80upx 44upx 50upx;
	}
	.nexts{
		width: 310upx;
		height: 78upx;
		background-color: #01b0bd;
		border-radius: 10upx;
	}
	.pres{
		width: 310upx;
		height: 75upx;
		border: 1px solid #01b0bd;
		color: #01b0bd;
		border-radius: 10upx;
	}
	.sure-content{
		width: 510upx;
		// height: 570upx;
		background-color: #fff;
		border-radius: 10upx;
		padding: 65upx 50upx;
		box-sizing: border-box;
		.sure-title{
			font-size: 42upx;
			color: #383838;
			text-align: center;
			margin-bottom: 50upx;
			font-weight: bold;
		}
		.photo-icon{
			width: 140upx;
			height: 128upx;
			margin-bottom: 50upx;
		}
		.tips{
			color: #9A9A9A;
			margin-bottom: 50upx;
			text-align: center;
		}
		.btns-wrap{
			display: flex;
			justify-content: space-between;
			.btns{
				width: 170upx;
				height: 56upx;
				font-size: 26upx;
				border-radius: 30upx;
			}
			.btns-left{
				background-color: #dcdcdc;
				color: #fff;
			}
			.btns-right{
				background-color: #01b0bd;
				color: #fff;
			}
		}
	}
	
	.photo-wrap{
		width: 506upx;
		height: 704upx;
		border-radius: 30upx;
		background-color: #fff;
		position: relative;
		.photos{
			width: 506upx;
			height: 704upx;
			border-radius: 30upx;
		}
		.del-white{
			width: 70upx;
			height: 70upx;
			position: absolute;
			bottom: -120upx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
