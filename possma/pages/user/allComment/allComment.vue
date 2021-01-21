<template>
	<view class="content">
		<view class="commentBox">
			<view class="commentData" v-for="(item,index) in commentData" :key="index">
				<image class="headImage" :src="item.headImage" mode=""></image>
				<view class="name fontSize14 overflow_four">{{item.name}}</view>
				<view class="clearBoth"></view>
				<view class="contents overflow_two fontSize13">{{item.comments}}</view>
				<image class="showImage" :src="items" mode="" v-for="(items,indexs) in item.showImage" :key="indexs"></image>
				<view class="clearBoth"></view>
				<view class="time fontSize12">{{item.time}}</view>
				<view class="clearBoth"></view>
			</view>
			<view class="clearBoth"></view>
		</view>
	</view>
</template>
<style>
.content .commentBox{width:95%;padding:0 2.5%;background: white;position: relative;}
	.content .commentBox .commentData{width:90%;margin-left:5%;margin-top:40upx;margin-bottom: 20upx;border-bottom: 2upx solid #E9E9E9;padding-bottom: 60upx}
	.content .commentBox .commentData .headImage{width:60upx;height:60upx;border-radius:60upx;margin-right: 20upx;float: left;}
	.content .commentBox .commentData .name{color:#8E8E8E;position: relative;top:10upx;width:80%;}
	.content .commentBox .commentData .contents{color:#222222;margin-top:10upx;width:100%;}
	.content .commentBox .commentData .showImage{width:30%;height:196upx;border-radius: 10upx;margin-top:20upx;margin-right:3.3%;float: left;}
	.content .commentBox .commentData .time{float: right;margin-top: 20upx;color:#8E8E8E;}
</style>
<script>
	export default {
		data() {
			return {
				commentData:[
					// {"headImage":"../../../static/demo.jpg","name":"this is name1","comments":"内容内容内容1",
					// 	showImage:[ 
					// 		{"src":"../../../static/demo.jpg"},{"src":"../../../static/demo.jpg","src":"../../../static/demo.jpg"},{"src":"../../../static/demo.jpg","src":"../../../static/demo.jpg"}
					// 	],
					// },
					// {"headImage":"../../../static/demo.jpg","name":"this is name2","comments":"内容内容内容2",
					// 	showImage:[ 
					// 		{"src":"../../../static/demo.jpg"},{"src":"../../../static/demo.jpg","src":"../../../static/demo.jpg"} ,
					// 	],
					// },
					// {"headImage":"../../../static/demo.jpg","name":"this is name2","comments":"内容内容内容2",
					// 	showImage:[ 
					// 		{"src":"../../../static/demo.jpg"},{"src":"../../../static/demo.jpg","src":"../../../static/demo.jpg"} ,
					// 	],
					// },
					// {"headImage":"../../../static/demo.jpg","name":"this is name2","comments":"内容内容内容2",
					// 	showImage:[ 
					// 		{"src":"../../../static/demo.jpg"},{"src":"../../../static/demo.jpg","src":"../../../static/demo.jpg"} ,
					// 	],
					// },
				],
				pages:1,
				goodsId:"",
				_$token:""
				
			}
		},
		onLoad(e){
			if( e.id ){
				this.goodsId = e.id
			}
			var that = this;
			this.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		onReachBottom(){
			var that = this;
			this.pages++
			this.getStorage();
			setTimeout(function(){
				that.AjaxLoad();
			},100)
		},
		methods:{
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;try {const value = uni.getStorageSync('token');if (value) {that._$token = value}} catch (e) {}},
			AjaxLoad(){
				var that = this;
				var commentList = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
					"page":this.pages,
					"goods_id":this.goodsId
				};
				this._$InitRequest.request('Index/comment_list', param).then(res => {
					res.data.data.forEach( (item,index) =>{
						commentList.push({
							id:item.id,
							headImage:item.headimgurl,
							name:item.nickname,
							comments:item.content,
							time:item.createtime,
							showImage:item.pics
						})
					})
					for (var i = 0; i < commentList.length; i++){
						that.commentData.push(commentList[i])
					}
				},error=>{})
			},
			
			
			
			
		}
	}
</script>