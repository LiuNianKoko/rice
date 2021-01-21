<template>
	<view class="content">
		
		<view class="contents" v-html="data"></view>
		
	</view>
</template>
<style>
	.contents{width:90%;padding:2.5%;margin-left: 2.5%;overflow-x: hidden;}
</style>
<script>
	export default {
		data() {
			return {
				data:"",
				_$token:""
			}
		},
		onLoad(e){
			var that = this;
			this.getStorage();
			if( e.id == 0 ){
				setTimeout(function(){
					that.AjaxAgree(1);
				},100)
				uni.setNavigationBarTitle({title: '公司简介'});
			}else if( e.id == 1 ){
				setTimeout(function(){
					that.AjaxAgree(2);
				},100)
				uni.setNavigationBarTitle({title: '服务条款'});
			}else if( e.id == 2 ){
				setTimeout(function(){
					that.AjaxAgree(3);
				},100)
				uni.setNavigationBarTitle({title: '隐私政策'});
			}else if( e.id == 3 ){
				setTimeout(function(){
					that.AjaxAgree(4);
				},100)
				uni.setNavigationBarTitle({title: '用户注册协议'});
			}
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxAgree(e){
				var that = this;
				let param={
					"user_id":"",
					"user_token":"",
					type:e
				};
				this._$InitRequest.request('User/sys_text', param).then(res => {
					that.data = res.data.data.content
					console.log( res );
				},error=>{})
			},
		}
	}
</script>
<style lang="scss" scoped>
.contents{
  ::v-deep {
    img {
      width: 100%;
    }
  }
}
</style>