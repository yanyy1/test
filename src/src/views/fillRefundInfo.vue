<template>
	<div class="login">
		<div class="inputInfo">
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">姓名</span>
				<input class="inputSty" type="text" name="" v-model="submitData.bankCardUsername">
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">退款卡号</span>
				<input class="inputSty" type="number" name="" v-model="submitData.bankCardNumber">
			</div>
			<div class="inputBoxSty f15">
				<span class="inputName thin-border-right">开户银行</span>
				<input class="inputSty" type="text" name="" v-model="submitData.bankCardAddress">
			</div>
		</div>
		<button v-on:click="applyRefund()" class="btnSty">申请退款</button>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
	</div>
</template>
<script>
	export default{
		data: function(){
			return {
				alertData: {
					show: false,
					msg: "",
				},
				toastData:{
					show: false,
					text: ""
				},
				submitData: {
					orderId: "",
					bankCardUsername: "",
					bankCardNumber: "",
					bankCardAddress: ""
				}
			}
		},
		methods: {
			isAllInput: function(){
				if(this.vaildNull(this.submitData.bankCardUsername)){
					this.toastData= {
						show: true,
						text: '请输入姓名'
					};
					return
				}else if(this.vaildNull(this.submitData.bankCardNumber)){
					this.toastData= {
						show: true,
						text: '请输入退款卡号'
					};
					return
				}else if(this.vaildNull(this.submitData.bankCardAddress)){
					this.toastData= {
						show: true,
						text: '请输入开户银行'
					};
					return
				}else {
					return true
				}
			},
			applyRefund: function(){
				if(this.isAllInput()){

					var paraStr = 'orderId='+this.$route.query.orderId+"&bankCardUsername="+this.submitData.bankCardUsername+"&bankCardNumber="+this.submitData.bankCardNumber+"&bankCardAddress="+this.submitData.bankCardAddress;
					this.$http.get(BASE_URL+'app/v1/order/orderRefund?'+paraStr,{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
						if(res&&res.body&&res.body.success){
							this.$router.push({path: "/applyRefund",query: this.$route.query});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("填写退款信息");
		},
		
	}
</script>
<style scoped>
	.login{
		padding: 15px 15px;
	}
	.inputInfo{
		margin-bottom: 15px;
		box-shadow: 0 0 5px #dcdcdc;
	}
	.inputBoxSty{
		height: 50px;
		padding: 13px 0 0;
	}
	.inputName{
		float: left;
		height: 25px;
		text-align: center;
		width: 30%;
		font-size: 15px;
	}
	.inputSty{
		outline: none;
		border: 0;
		font-size: 15px;
		padding-left: 15px;
		padding-right: 15px;
		width: 70%;
	}

</style>