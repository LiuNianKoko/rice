<template>
	<view>
		<view class="tips">
			为了您的健康以及我们更针对性的研发健康产品，康乐宝邀请您来参与问卷：
		</view>
		<view class="wrap" v-for="(item,index) in list" :key="index">
			<view class="">
				{{index + 1}}、{{item.title}}
			</view>
			<view v-if="type == 0">
				<view class="answer-wrap" v-for="(item2,index2) in item.values" :key="index2">
					<view class="answer-box">
						<image class="icon_use" :src="item2.check == true ? '/static/image/user/addr/icon_2.png' : '/static/image/user/addr/icon_1.png'" @click="chooseAnswer(item,item2,index2)"></image>
						<view class="answer">
							{{item2.answer}}
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="" v-for="(item2,index2) in item.values" :key="index2">
					<view class="progress-box">
						<view class="botline">
							<view class="topline" :class="item2.checks==true?'act':''" :style="{width:item2.num + '%'}"></view>
							<view class="ans">
								{{item2.answer}}
							</view>
							
						</view>
						<view class="marginTop10 margingLeft20">
							{{item2.num}}%
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips">
			谢谢您的配合以及对我们工作的支持！祝您工作愉快，生活美满！
		</view>
		<view class="sure comm-btn" @tap="sureBtn" v-if="type == 0">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				_$token: "",
				answerList:[],
				type:0,//1已填  0未填   
			}
		},
		onLoad(option) {
			this.type = option.type
			this.getStorage();
			this.getList()
		},
		methods: {
			getStorage() {
				var that = this;
				try {
					const value = uni.getStorageSync('token');
					if (value) {
						that._$token = value
					} else {
						uni.showToast({
							icon: "none",
							title: "请先登录"
						})
						setTimeout(function() {
							uni.navigateTo({
								url: "../../login/login"
							})
						}, 1500)
					}
				} catch (e) {}
			},
			getList() {
				let param = {
					"user_id": this._$token.id,
					"user_token": this._$token.token,
				};
				this._$InitRequest.request('index/wenjuan', param).then(res => {
					let list = res.data.data
					list.map((item,index)=>{
						this.answerList.push({id:item.id,value:''})
						item.values.map((item2,index2)=>{
							this.$set(item2,'check',false)
						})
					})
					this.list = list
					console.log(res)
					console.log(this.answerList)
				}, error => {})
			},
			chooseAnswer(item,item2,index2){
				item.values.map(a=>{
					a.check = false
				})
				item2.check = true
				this.answerList.map(ans=>{
					if(ans.id == item.id){
						ans.value = item2.answer
					}
					return ans
				})
				console.log(this.answerList)
			},
			sureBtn(){
				let a = true
				this.answerList.map(ans=>{
					if(ans.value == ''){
						a = false
					}
				})
				if(a == false){
					uni.showToast({
						title:'亲，你还有题目没填完',
						icon:'none'
					})
					return
				}
				let list = JSON.stringify(this.answerList)
				let param = {
					"user_id": this._$token.id,
					"user_token": this._$token.token,
					value:list
				};
				this._$InitRequest.request('index/save_wenjuan', param).then(res => {
					if(res.data.code == 200){
						uni.showToast({
							title:'提交成功,感谢您的配合!',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1200)
					}else{
						uni.showToast({
							title:res.mess,
							icon:'none'
						})
					}
				}, error => {})
			},
		}
	}
</script>

<style lang="less">
	.wrap {
		padding: 20upx;
		color: #333;
	}
	.tips{
		padding: 20upx;
		font-weight: bold;
	}
	.answer-wrap {

		.answer-box {
			display: flex;
			align-items: center;
			margin-top: 20upx;

			.answer {
				padding-left: 20upx;
			}
		}
	}

	.icon_use {
		width: 40upx;
		height: 40upx;
	}
	.progress-box{
		width: 72%;
		display: flex;
		align-items: center;
		.botline{
			margin-top: 18upx;
			width: 100%;
			height: 34upx;
			background: #eee;
			align-items: center;
			display: flex;
			flex: none;
			position: relative;
			// border-radius: 10upx;
			.ans{
				font-size: 24upx;
				position: absolute;
				top: 0;
				left: 10upx;
			}
			.topline{
				
				height: 34upx;
				background: #999;
				
				// border-radius: 10upx;
			}
			.act{
				background: #40807e;
			}
		}
	}
	.sure {
		width: 90%;
		margin-top: 50upx;
		margin-bottom: 50upx;
		padding: 2.5%;
		margin-left: 2.5%;
		background: linear-gradient(to right, rgb(54, 178, 255), rgb(74, 214, 255));
		color: white;
		border-radius: 110upx;
		text-align: center;
	}
</style>
