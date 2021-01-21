<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-body,html,body{  
		height: 100%;  
	}
	.uni-page-head{
		border-bottom: 1px solid #f4f4f4;
	}
	view,text{
		font-size: 28upx;
	}
	.disCenter{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.font24{
		font-size: 24upx;
	}
	.text-white{
		color: #fff;
	}
	.text-center{
		text-align: center;
	}
	.bgWhite{
		background-color: #fff;
	}
	.scale-1px-bottom{
		position: relative;
		border: none;
	}
	.scale-1px-bottom::after{
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		background: #f4f4f4;
		height: 1px;
		width: 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
	}
	/* padding */
	.padding5{
		padding: 5upx;
	}
	.padding10{
		padding: 10upx;
	}
	.padding15{
		padding: 15upx;
	}
	.padding20{
		padding: 20upx;
	}
	/* paddingTop */
	.paddingTop5{
		padding-top: 5upx;
	}
	.paddingTop10{
		padding-top: 10upx;
	}
	.paddingTop15{
		padding-top: 15upx;
	}
	.paddingTop20{
		padding-top: 20upx;
	}
	/* paddingLeft */
	.paddingLeft5{
		padding-left: 5upx;
	}
	.paddingLeft10{
		padding-left: 10upx;
	}
	.paddingLeft15{
		padding-left: 15upx;
	}
	.paddingLeft20{
		padding-left: 20upx;
	}
	/* paddingRight */
	.paddingRight5{
		padding-right: 5upx;
	}
	.paddingRight10{
		padding-right: 10upx;
	}
	.paddingRight15{
		padding-right: 15upx;
	}
	.paddingRight20{
		padding-right: 20upx;
	}
	/* paddingBottom */
	.paddingBottom5{
		padding-bottom: 5upx;
	}
	.paddingBottom10{
		padding-bottom: 10upx;
	}
	.paddingBottom15{
		padding-bottom: 15upx;
	}
	.paddingBottom20{
		padding-bottom: 20upx;
	}
	/* margin */
	.marginTop5{
		margin-top: 5upx;
	}
	.marginTop10{
		margin-top: 10upx;
	}
	.marginTop15{
		margin-top: 15upx;
	}
	.marginTop20{
		margin-top: 20upx;
	}
	.marginBottom5{
		margin-bottom: 5upx;
	}
	.marginBottom10{
		margin-bottom: 10upx;
	}
	.marginBottom15{
		margin-bottom: 15upx;
	}
	.marginBottom20{
		margin-bottom: 20upx;
	}
	.margingLeft5{
		margin-left: 5upx;
	}
	.margingLeft10{
		margin-left: 10upx;
	}
	.margingLeft15{
		margin-left: 15upx;
	}
	.margingLeft20{
		margin-left: 20upx;
	}
	.margingRight5{
		margin-right: 5upx;
	}
	.margingRight10{
		margin-right: 10upx;
	}
	.margingRight15{
		margin-right: 15upx;
	}
	.margingRight20{
		margin-right: 20upx;
	}
</style>
