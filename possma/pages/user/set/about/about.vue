<template>
	<view class="content">
		<view class="logoBox"><image class="logo" :src="logo" mode="widthFix"></image></view>
		<view class="rows" v-for="(item,index) in setData" :key="index" @tap="setBtn(index)">
			<view class="names">{{item.name}}</view>
			<uni-icons class="icons" type="arrowright" color="#939393" size="12"/>
			<view class="clearBoth"></view>
		</view>
	</view>
</template>
<style>
	.content{width:100%;height:100%;}
	.logoBox{display: flex;justify-content: center;margin:100upx 0;}
	.logo{width:175upx;}
	.rows{width:95%;padding:5% 2.5%;border-bottom: 1px solid rgb(233,233,233);}
	.rows .headImage{width: 92upx;height: 92upx;line-height: 92upx;border-radius: 92upx;float: left;}
	.rows .names{color:#222222;float: left}
	.rows .rightName{color:#939393;float: right;width:50%;text-align: right;margin-right:10upx;}
	.rows .icons{color:#939393;float: right;position: relative;top:8upx}
 </style>
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components:{
			uniIcons,
			uniSection
		},
		data() {
			return {
				logo:"/static/image/img/logo.png",
				setData:[
					{"name":"公司简介","rightName":""},
					{"name":"服务条款","rightName":""},
					{"name":"隐私政策","rightName":""},
					{"name":"用户注册协议","rightName":""},
				],
				_$token:""
			}
		},
		onLoad(){
			this.getStorage();
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			setBtn(index){
				var that = this;
				if( index == 0 ){
					uni.navigateTo({url:"./agree/agree?id=0"})
				}else if( index == 1 ){
					uni.navigateTo({url:"./agree/agree?id=1"})
				}else if( index == 2 ){
					uni.navigateTo({url:"./agree/agree?id=2"})
				}else if( index == 3 ){
					uni.navigateTo({url:"./agree/agree?id=3"})
				}
			}
		}
	}
</script>