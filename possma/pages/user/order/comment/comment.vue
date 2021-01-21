<template>
	<view class="content">
		<view class="boxes marginBottom-20">
			<view class="clearBoth marginBottom-20"></view>
			<image class="goodsImage" :src="orderData.goodsImage" mode=""></image>
			<view class="name overflow_four">{{orderData.introduce}}</view>
			<view class="right">
				<view class="price">￥{{orderData.goods_price}}</view>
				<view class="num">* {{orderData.nums}}</view>
			</view>
			<view class="clearBoth"></view>
		</view>
		<view class="commentBox">
			<textarea class="textArea" placeholder="请输入商品评论" maxlength="200" @input="getContent"/>
			<view class="imageBox" v-for="(item,index) in imageBox" :key="index">
				<image class="images" :src="item.src" mode=""></image>
				<image class="icon_del" src="../../../../static/image/user/order/icon_del2.png" mode=""  @tap="delBtn(index)"></image>
			</view>
			<image class="icon cameraIcon" src="../../../../static/image/user/order/icon_camera.png" mode="" @tap="BtnAdd"></image>
			<view class="clearBoth"></view>
		</view>
		<view class="clearBoth"></view>
		<view class="sureBtn comm-btn" @tap="sureBtn">确认评价</view>
			
		
		
	</view>
</template>
<style>
	.commentBox{width:80%;margin-left:5%;padding:2% 5%;border-radius: 10upx;border:1px solid rgb(239,238,239);padding-bottom: 30upx;}
	.commentBox .textArea{width:100%;font-size: 14px;}
	.uni-textarea-placeholder,
	.textarea-placeholder{font-size: 14px;}
	.commentBox .cameraIcon{width: 135upx;height:135upx;float: left;;margin-top:40upx;border-radius: 10upx;}
	.commentBox .imageBox{width: 135upx;height:135upx;float: left;position: relative;;margin-top:40upx;margin-right:20upx}
	.commentBox .imageBox .images{width:100%;height:135upx;border-radius: 10upx;}
	.commentBox .imageBox .icon_del{width:30upx;height:30upx;position: absolute;top:-15upx;right:-15upx;}	
	.boxes{width: 90%;margin-left: 2.5%;padding:2.5%;background: white;border-radius: 10upx;}
	.boxes .goodsImage{width:170upx;height:170upx;margin-right:20upx;border-radius: 5upx;float: left;}
	.boxes .name{width:50%;float: left;font-size: 14px;color:#161616;}
	.boxes .right{width:20%;float: left;font-size: 14px;color:#919191;;}
	.boxes .right .price{float: right;width: 100%;text-align: right;font-size: 14px;}
	.boxes .right .num{float: right;width:100%;text-align: right;font-size: 13px;color:#919191;margin-top: 15upx;}
	.sureBtn{text-align: center;background: rgb(80,175,246);color:white;width:90%;margin-left: 2.5%;padding:2.5%;border-radius: 200upx;margin-top:150upx;}
	.marginBottom-20{margin-bottom: 20upx;}
	.marginBottom-40{margin-bottom: 40upx}
</style>
<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				goodsId:'',
				orderData:{},
				// {'id':2,'time':"2019-10-11",'goodsImage':'../../../../static/demo.jpg','introduce':'这是商品介绍2','goods_price':'20','nums':'2','payPrice':'200'}
				imageBox:[],
				orderId:"",
				orderContent:{},
				contents:"",
				token:"",
				_$token:""
			}
		},
		onLoad(e){
			var that = this;
			this.orderId = e.id
			this.goodsId = e.id
			this.getStorage();
			this.AjaxLoad();
			setTimeout(function(){
				let param={
					"user_id":that._$token.id,
					"user_token":that._$token.token,
				};
				that._$InitRequest.request('User/get_token', param).then(res => {
					that.token = res.data.data.token
				},error=>{})
			},100)
		},
		methods: {
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				try {
				    const value = uni.getStorageSync('commentOrder');
				    if (value) {
				        that.orderContent = value;
						that.orderData.id = that.orderContent.id
						that.orderData.nums = that.orderContent.nums
						that.orderData.goodsImage = that.orderContent.goodsImage
						that.orderData.introduce = that.orderContent.introduce
						that.orderData.goods_price = that.orderContent.goods_price
						that.orderData.payPrice = that.orderContent.payPrice
				    }
				} catch (e) {}
			},
			async BtnAdd(){
				var that = this;
				if( that.imageBox.length > 2 ){
					uni.showToast({icon:'none',title:'抱歉，最多只能上传三张图片'})
					return;
				}
				var result = await permision.requestAndroidPermission('android.permission.READ_EXTERNAL_STORAGE')
				var strStatus
				if (result == 1) {
					uni.chooseImage({
					    count: 1,
					    sizeType: ['original', 'compressed'],
					    sourceType: ['album'],
					    success: function (res){
							uni.uploadFile({
								url:"http://klb.sayyin.com/api/user/uploadify",
								header:{},
								filePath:res.tempFilePaths[0],
								name: 'filedata',
								formData: {
									"user_id":that._$token.id,
									"user_token":that._$token.token,
								},
								success: function(ress) {
									console.log(ress)
									var imageUrl = JSON.parse(ress.data).data.pic_url
									// var imageUrl = "http://youngpic.sayyin.com/" + JSON.parse( res.data ).key
									var src = {'src':imageUrl}
									
									that.imageBox.push(src)
									
								},
							});
					    }
					});
				} else if (result == 0) {
					strStatus = "未获得授权"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				} else {
					strStatus = "被永久拒绝权限"
					uni.showToast({icon:"none",title:"请获取权限"})
					setTimeout(function(){
						permision.gotoAppPermissionSetting()
					},1000)
				}

			},
			delBtn(index,src){
				var that = this;
				uni.showToast({icon:'none',title:'删除成功'})
				this.imageBox.splice(index,1);
			},
			getContent(e){this.contents = e.target.value},
			sureBtn(){
				var that = this;
				var arrImage = []
				this.imageBox.forEach( (item,index) =>{
					let imageSrc = item.src.split("com/")[1]
					arrImage.push(imageSrc)
				})
				if( this.contents == "" ){
					uni.showToast({icon:'none',title:'请输入评论内容'})
					return;
				}
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"order_id":this.orderId,
					"type":4,
					"pics":arrImage,
					"content":this.contents
				};
				this._$InitRequest.request('user/order_operation', param).then(res =>{
					if( res.data.code !== 200 ){
						uni.showToast({icon:'none',title:res.data.mess})
						return;
					}else{
						uni.showToast({icon:'none',title:res.data.mess})
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/user/user'
							})
						},1500)
					}
				},error=>{})
				
			},
			
			
			
			
		}
	}
</script>
