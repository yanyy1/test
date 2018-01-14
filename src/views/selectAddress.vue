<template>
	<div>
		<div v-for="(item,index) in addressList" class="defaultAddress" v-if="item.isDefault" v-on:click="select(index)">
			<div v-if="item.isDefault" class="labelSty default">
				<div class="floatLeft f15">默认地址</div>
			</div>
			<div class="labelSty mgb-10">
				<div class="floatLeft f15 color-999">收货人：{{item.consignee}}</div>
				<div class="floatRight f15 color-999">{{item.phone}}</div>
			</div>
			<div class="f15 color-999 labelSty">地址：{{item.address}}</div>
		</div>

		<div v-for="(item,index) in addressList" class="defaultAddress" v-if="!item.isDefault" v-on:click="select(index)">
			<div class="labelSty mgb-10">
				<div class="floatLeft f15 color-999">收货人：{{item.consignee}}</div>
				<div class="floatRight f15 color-999">{{item.phone}}</div>
			</div>
			<div class="f15 color-999 labelSty">地址：{{item.address}}</div>
		</div>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				addressList:[],
				
				alertData: {
					show: false,
					msg: "",
				},
			}
		},
		methods: {
			select: function(index){
				localStorage.setItem('address',JSON.stringify(this.addressList[index]));
				this.$router.go(-2);
			},
		},
		beforeCreate: function(){
			this.setDocumentTitle("修改地址");
		},
		created: function(){
			this.$http.get(BASE_URL + 'app/v1/address',{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
				if(res&&res.body&&res.body.success){
					this.addressList = res.body.data;
				}else{
					this.alertData.show = true;
					this.alertData.msg = "获取地址信息失败";
				}
			},function(res){
				this.alertData.show = true;
				this.alertData.msg = "获取地址信息失败";
			});
		}
	}
</script>
<style scoped>
	.defaultAddress{
		margin: 15px 10px 15px;
		padding: 15px 0;
		border-radius: 5px;
		box-shadow: 0 0 5px #dcdcdc;
		overflow: hidden;
	}
	.labelSty{
		padding: 0 20px;
		overflow: hidden;
	}
	.default{
		padding: 0 20px 15px;
	}
</style>