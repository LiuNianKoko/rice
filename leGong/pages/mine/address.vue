<template>
	<view class="content">
		<cu-custom bgColor="bgWhite" :isBack="true"><block slot="backText"></block><block slot="content">我的地址</block></cu-custom>
		<view class="addr-wrap" v-if="list.length > 0">
			<view class="addr-item" v-for="(item,index) in list" :key="index" @click="backOrder(item)">
				<view class="addr-top disBetween fontBold">
					<view class="">
						{{item.contact_name}}
					</view>
					<view class="">
						{{item.contact_phone}}
					</view>
				</view>
				<view class="addr-main scale-1px-bottom">
					<view class="addr-ress disAlignCenter">
						<image :src="imgUrl +'lg-local.png'" class="lg-local"></image>
						<view class="addr-txt">
							{{item.province_city_district}}{{item.address}}
						</view>
					</view>
					<view class="addr-btn-wrap disFlex">
						<view class="lg-addr disCenter lg-addr-right" @click.stop="editAddr(item.id)">
							<image :src="imgUrl +'lg-addr-edit.png'" class="lg-addr-edit" ></image>
						</view>
						<view class="lg-addr disCenter" @click.stop="beforeOperation(item.id,3)">
							<image :src="imgUrl +'lg-addr-trash.png'" class="lg-addr-trash"></image>
						</view>
					</view>
				</view>
				<view class="addr-bot" @click.stop="beforeOperation(item.id,4)">
					<view class="addr-default">
						默认地址
					</view>
					<image :src="imgUrl +'lg-sel.png'" class="sel" v-if="item.is_default==2"></image>
					<image :src="imgUrl +'lg-seled.png'" class="sel" v-if="item.is_default==1"></image>
				</view>
				<view class="addr-hid" v-if="type != 1 && item.is_usable == 0"></view>
			</view>
		</view>
		<view class="nodata" v-else>
			暂无收货地址~
		</view>
		<view class="blank"></view>
		<view class="btn-wrap">
			<view class="btn" @click="toAdd">
				添加收货地址
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				list:[],
				page:1,
				type:1,//2 跳转下单页
				goods:'',//商品
			}
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			this.page = 1
			// this.getList()
			if(option.type){
				this.type = option.type
				this.goods = option.goods
			}
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.getNewList()
		},
		methods: {
			toAdd(){
				uni.navigateTo({
					url:'/pages/mine/editAddr'
				})
			},
			editAddr(id){
				uni.navigateTo({
					url:'/pages/mine/editAddr?id=' + id
				})
			},
			backOrder(item){
				if(this.type != 1){
					if(item.is_usable == 0){
						uni.showToast({
							title:'该地区不支持配送',
							icon:'none'
						})
					}else{
						let addr = item
						this.$store.state.address = addr
						uni.navigateBack({
							delta:1
						})
					}
				}
			},
			beforeOperation(id,type){
				let that = this
				if(type == 3){
					uni.showModal({
					    title: '删除收货地址',
					    content: '确认删除收货地址吗？',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								that.operationAddr(id,type)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{
					that.operationAddr(id,type)
				}
			},
			operationAddr(id,type){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					type:type,
					address_id:id
				}
				http('/api/users/operation_address','post',data).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title:res.mess || res.msg,
							icon:'none'
						})
						this.getList()
					}else{
						uni.showToast({
							title:res.msg || res.mess,
							icon:'none'
						})
					}
					console.log(res)
				})
			},
			getList(){
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:1
				}
				http('/api/users/user_address','post',data).then(res=>{
					if(res.code == 200){
						this.list = res.data
					}
					console.log(res)
				})
			},
			getNewList(){
				let newList = []
				let data = {
					user_id:uni.getStorageSync('user_id'),
					user_token:uni.getStorageSync('token'),
					page:this.page+1
				}
				http('/api/users/user_address','post',data).then(res=>{
					
					if(res.code == 200){
						newList = res.data
						
						this.list = this.list.concat(newList)
						this.page++
					}
					
				})
			},
		}
	}
</script>

<style lang="less">
	.addr-wrap{
		padding: 16upx;
	}
	.addr-item{
		border: 1px solid #D1D1D1;
		border-radius: 20upx;
		margin-bottom: 27upx;
		padding: 0 35upx;
		position: relative;
		.addr-hid{
			width: 100%;
			height: 100%;
			background: #000;
			opacity: .5;
			position: absolute;
			z-index: 100;
			top: 0;
			left: 0;
			border-radius: 20upx;
		}
		.addr-top{
			padding: 34upx 0;
		}
		.addr-main{
			position: relative;
			padding-bottom: 30upx;
			.addr-ress{
				padding-right: 220upx;
				.lg-local{
					width: 37upx;
					height: 47upx;
					margin-right: 20upx;
					flex: none;
				}
				.addr-txt{
					font-size: 22upx;
					color: #535353;
				}
			}
			.addr-btn-wrap{
				position: absolute;
				z-index: 10;
				right: 0;
				top: 0;
				.lg-addr{
					width: 68upx;
					height: 44upx;
				}
				.lg-addr-right{
					border-right: 1px solid #eee;
				}
				.lg-addr-edit{
					width: 38upx;
					height: 35upx;
				}
				.lg-addr-trash{
					width: 34upx;
					height: 36upx;
				}
			}
		}
		.addr-bot{
			padding: 18upx 0 24upx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.addr-default{
				color: #929292;
				font-size: 22upx;
				margin-right: 20upx;
			}
			.sel{
				width: 30upx;
				height: 30upx;
			}
		}
	}
	.blank{
		height: 170upx;
	}
	.btn-wrap{
		padding: 30upx 30upx 50upx;
		background-color: #fff;
		width: 100%;
		z-index: 100;
		position: fixed;
		bottom: 0;
		left: 0;
		.btn{
			height: 90upx;
			font-size: 24upx;
			font-weight: bold;
			color: #EB798D;
			border: 1px solid #EB798D;
			border-radius: 10upx;
			text-align: center;
			line-height: 90upx;
		}
	}
</style>
