<template>
	<!-- 点击  弹出层 组件-->
	<view>
		<view @touchmove.stop.prevent="voidFc" @tap.stop="maskHide" class="fadeIn_mask" :class="showBl?'show':'hide'" v-if="hid"></view>
		
		<!-- <view @touchmove.stop.prevent="voidFc" :class="[('QS_' + type), showBl?'show':'hide']"> -->
		<view :class="[('QS_' + type), showBl?'show':'hide']">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type:{
				type: String,
				default: 'fadeInMiddle'
			},
			tapMaskHide: {
				type: Boolean,
				default: true
			},
			hid: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showBl: false
			}
		},
		methods: {
			show() {
				this.showBl = true;
			},
			maskHide() {
				if(this.tapMaskHide) this.hide();
			},
			hide() {
				this.showBl = false;
				uni.showTabBar()
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	@import url("css/QS-popup.css");
</style>
