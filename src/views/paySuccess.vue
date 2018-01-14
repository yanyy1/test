<template>
	<div>
		<div class="successTitle">
			<i class="icon iconfont icon-duigou mgr-10"></i>
			<span class="f17">定金支付成功</span>
		</div>
		<div class="f15 successTip">
			恭喜您，您的定金已经支付成功，您需要继续填写认证信息进一步完成您的订单，如果您有其他疑问，欢迎致电客服：<span class="color-ed852e">400-098-2118</span>
		</div>
		<div class="btnBox thin-border-top">
			<button class="bottomBtn later" @click="laterFill()">{{btnData.text2}}</button>
			<button class="bottomBtn" v-on:click="fillInfo(btnData.path)">{{btnData.text}}</button>
		</div>
		<loading v-if="showLoading"></loading>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				showLoading: false,
				alertData: {
					show: false,
					msg: "",
				},
				btnData: {
					text: "前往填写",
					path: "/IDInfo",
					text2: "稍后填写"
				}
			}
		},
		methods: {
			laterFill(){
				this.$router.push({path: '/carParticulars',query: this.$route.query});
			},
			fillInfo: function(path){
				this.showLoading = true;
				this.$router.push({path: path,query: this.$route.query});
			}
		},
		beforeCreate: function(){
			this.setDocumentTitle("付款成功");
		},
		created: function(){
			this.showLoading = true;
			this.$http.post(BASE_URL+'app/v1/user/auditResult?username='+this.isLogin()).then(function(res){
				this.showLoading = false;
				if(res&&res.body&&res.body.success){
					var data = res.body.data;
					if(data.status==1){
						this.btnData = {
							text: "前往查看",
							path: "/submitSuccess",
							text2: "稍后查看"
						}
					}else if(data.status==2){
						this.btnData = {
							text: "前往签约",
							path: "/sign",
							text2: "稍后签约"
						}
					}else{
						this.btnData = {
							text: "前往填写",
							path: "/IDInfo",
							text2: "稍后填写"
						}
					}
				}else{
					this.alertData.show = true;
					this.alertData.msg = res.body.data.errorMessage;
				}
			});
		}
	}
</script>
<style scoped>
	.successTitle{
		padding: 0 20px;
		height: 50px;
		line-height: 50px;
	}
	.icon-duigou{
		color: #09bb07;
	}
	.successTip{
		background-color: #eaeaea;
		padding: 20px;
	}
	.btnBox{
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
	}
	.later{
		background-color: #fff;
		color: #333;
	}
	.bottomBtn{
		width: 50%;
		height: 50px;
		float: left;
	}
</style>