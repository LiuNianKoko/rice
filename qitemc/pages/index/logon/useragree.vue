<template>
	<view>
		<view class="agree-main">
			
			<view v-html="agreement">
				
			</view>
		</view>
	</view>
</template>
<script>
	import http from '@/api/http.js'
	export default {
		data() {
			return {
				agreement:''
			};
		},
		onLoad(){
			this.getAgreement()
		},
		methods:{
			getAgreement(){
				
				http('/api/setting/userAgreement','post').then(res=>{
					this.agreement = res.data.data.userAgreement
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">

	.agree-main{
		.agree-title{
			font-size: 32upx;
			font-weight: bold;
			display: flex;
			justify-content: center;
			padding: 36upx 0;
		}
		.agree-text{
			padding: 0 40upx;
			box-sizing: border-box;
			line-height: 48upx;
		}
	}
</style>
