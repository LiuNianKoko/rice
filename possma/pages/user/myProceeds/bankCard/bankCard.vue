<template>
	<view class="content">
		
		<input class="inputBox" type="text" placeholder="请输入银行卡号" @input="getUserName">
		
		<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
			<view class="inputBox color_grey">{{array[index].name}}<uni-icons class="icons" type="arrowright" color="rgb(197,197,197)" size="12"/></view>
		</picker>
		
		<input class="inputBox" type="text" placeholder="请输入您的真实姓名"   @input="getRealName">
		<input class="inputBox" type="number" maxlength="11" placeholder="请输入您的联系方式" @input="getTel">
		<view class="sure comm-btn" @tap="sureBtn">确认提现</view>
		
		
	
		
	</view>
</template>
<style>
	.content .inputBox{width:80%;font-size: 14px;padding:2.5% 5%;margin-left: 5%;border:1px solid rgb(242,242,242);border-radius: 20upx;margin-top:30upx;}
	.content .uni-input-placeholder{font-size: 14px;color:grey}
	.content .sure{width:80%;margin-left: 5%;margin-top: 200upx;background: rgb(78,178,244);color:white;border-radius: 200upx;text-align: center;padding:3% 5%;}
	.content .color_grey{color:grey;font-size: 14px;}
	.content .icons{float: right;position: relative;top:4upx}
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
				money:"",
				data:{
					"UserName":"",
					"bankId":"",
					"RealName":"",
					"Tel":"",
				},
				array:[
					{name:'请选择您的银行开户行',"id":0},
					// {name: '美国',"id":22},
					// {name:'巴西',"id":33},
					// {name:'日本',"id":44},
				],
				index: 0,
				_$token:"",
				type:"",
				
			}
		},
		onLoad(e){
			var that = this;
			this.type = e.type
			this.money =  e.money
			this.getStorage();
			setTimeout(function(){
				that.AjaxBankCard();
			},100)
		},
		methods:{
			// getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			getStorage(){var that = this;uni.getStorage({ key: 'token',success: function (res) {that._$token = res.data}})},
			AjaxBankCard(){
				var that = this;
				var lists = []
				let param={
					"user_id":this._$token.id,
					"user_token":this._$token.token,
				};
				this._$InitRequest.request('user/get_bankList', param).then(res => {
					console.log( res.data.data );
					res.data.data.forEach((item,index) =>{
						lists.push({
							id:item.id,
							name:item.bank_name
						})
					})
					for (var i = 0; i < lists.length; i++){
						that.array.push(lists[i])
					}
				},error=>{})
			},
			getUserName(e){this.data.UserName = e.target.value},
			getRealName(e){this.data.RealName = e.target.value},
			getTel(e){this.data.Tel = e.target.value},
			sureBtn(){
				if( this.data.UserName == "" ){
					uni.showToast({icon:"none",title:"请输入银行卡号"})
					return;
				}else if( this.data.RealName == "" ){
					uni.showToast({icon:"none",title:"请输入真实姓名"})
					return;
				}else if( this.data.Tel == "" ){
					uni.showToast({icon:"none",title:"请输入联系方式"})
					return;
				}else if( this.data.bankId == "" ){
					uni.showToast({icon:"none",title:"请选择开户行"})
					return;
				}else{
					let param={
						"user_id":this._$token.id,
						"user_token":this._$token.token,
						"price":this.money,
						"type":2,
						"username":this.data.RealName,
						"phone":this.data.Tel,
						"bank_num":this.data.UserName,
						"bank_id":this.array[this.index].id,
						"put_type":this.type
					};
					this._$InitRequest.request('user/withdrawal', param).then(res =>{
						if( res.data.code !== 200 ){
							uni.showToast({icon:"none",title:res.data.mess})
							return;
						}else{
							uni.showToast({icon:"none",title:res.data.mess})
							setTimeout(function(){
								uni.switchTab({
									url:'/pages/user/user'
								})
							},1500)
						}
					},error=>{})
				}
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.data.bankId = this.array[e.detail.value].id
			},
			
			
			
			
		}
	}
</script>