<template>
	<view class="address-wraps">
	
		<!-- 有地址 -->
		<view class="address-full">
			<view class="address-item scale-1px-bottom">
				<view class="address-person">
					<view class="person-name">
						羊羊羊
						<text class="person-phone margingLeft20">134xxxx8376</text>
					</view>
					<view class="person-location">
						上海上海市徐汇区徐家汇街道斜土路 2611号嘉汇广场T3栋18G
					</view>
				</view>
				<view class="address-edit">
					编辑
				</view>
			</view>
			<view class="address-item scale-1px-bottom">
				<view class="address-person">
					<view class="person-name">
						羊羊羊
						<text class="person-phone margingLeft20">134xxxx8376</text>
					</view>
					<view class="person-location">
						上海上海市徐汇区徐家汇街道斜土路 2611号嘉汇广场T3栋18G
					</view>
				</view>
				<view class="address-edit">
					编辑
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
		
		}
	}
</script>

<style lang="less">
	.address-wraps{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f2f2f5;
	}

	.address-full{
		margin-top: 26upx;
		background-color: #fff;
		padding: 0 30upx;
		box-sizing: border-box;
		.address-item{
			height: 210upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.address-person{
				width: 460upx;
				.person-name{
					font-size: 32upx;
					.person-phone{
						color: #aaa;
					}
				}
				.person-location{
					margin-top: 20upx;
					font-size: 24upx;
				}
			}
			.address-edit{
				width: 100upx;
				height: 50upx;
				font-size: 24upx;
				color: #aaa;
				border-left: 1px solid #eeeeee;
				text-align: right;
				line-height: 50upx;
			}
		}
	}
</style>


