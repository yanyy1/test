<template>
	<div class="login">
		<div class="inputInfo">
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">手机号</span>
				<input class="inputSty" type="tel" name="" maxlength="11" v-model="loginData.mobile">
			</div>
			<div class="inputBoxSty f15" v-show="isNeed">
				<span class="inputName thin-border-right">图形验证码</span>
				<input class="validCode inputSty" name="" v-model="vfCode">
				<span v-on:click="getCode()" class="getCode thin-border-left" @click="changeCode()">
					<canvas id="canvas"></canvas>
				</span>
			</div>
			<div class="inputBoxSty f15">
				<span class="inputName thin-border-right">验证码</span>
				<input class="validCode inputSty" type="number" name="" v-model="loginData.code">
				<span v-if="canGetCode" v-on:click="getCode()" class="getCode thin-border-left">获取验证码</span>
				<span v-if="!canGetCode" class="color-999 getCode thin-border-left">{{second}}秒后重试</span>
			</div>
			<div class="inputBoxSty thin-border-bottom f15"> 
				<span class="inputName thin-border-right">邀请码</span>
				<input class="validCode inputSty" name="" v-model="vfCode" placeholder="选填">
			</div>
		</div>
		<button v-on:click="login()" class="btnSty">登录</button>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
		<loading v-if="showLoading"></loading>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
	</div>
</template>
<script>
	import idCode from '../js/idCode.js'
	import '../css/common.css'
	export default{
		data(){
			return {
				canGetCode: true,
				second: 60,
				isNeed: null,
				vfCode: null,
				verifyCode: null,
				verifyCodeKey: null,
				loginData: {
					mobile: "",
					code: ""
				},
				toastData:{
					show: false,
					text: ""
				},
				showLoading: false,
				alertData: {
					show: false,
					msg: "",
				},
			}
		},
		created () {
			this.$http.get(BASE_URL + 'app/v1/login/defaultKaptcha',{}).then(function(res){
				let isNeed = res.body.data.isNeed, 
					verifyCode = res.body.data.verifyCode
				this.verifyCodeKey = res.body.data.verifyCodeKey
				this.isNeed = isNeed
				this.verifyCode = verifyCode
				if(isNeed == 1) {
					idCode.drawPic(verifyCode)
				}
			})
		},
		methods: {
			// 推送
			pushMsg: function(username,registrationID){
				var param = "?username="+username+"&registrationID="+registrationID;
				this.$http.post(BASE_URL+"app/v1/registration"+param,{headers:{access_token: localStorage.getItem('token')}}).then(function(res){
					
				});
			},
			bindThirdPartAccount:function(type,appId,phoneNumber,token,username){
				var param = "?type="+type+"&appId="+appId+"&phoneNumber="+phoneNumber;
				this.$http.post(BASE_URL+"app/v1/bindThirdPartAccount"+param,{headers:{access_token: token}}).then(function(res){
					if(res&&res.body&&res.body.success){
						this.pushMsg(this.loginData.mobile,localStorage.getItem('pushId'));

						this.$router.push({path: this.$route.query.pathName});
					}else{
						this.alertData.show = true;
						this.alertData.msg = res.body.data.errorMessage;
					}
				});
			},
			// 用户登录
			login: function(){
				if(this.vaildNull(this.loginData.mobile)){
					this.toastData= {
						show: true,
						text: '请输入手机号码'
					};
					return
				}else if(this.vaildNull(this.loginData.code)){
					this.toastData= {
						show: true,
						text: '请输入验证码'
					};
					return
				}else {
					this.showLoading = true;
					this.$http.post(BASE_URL + 'app/v1/login/loginByPhone?mobile='+this.loginData.mobile+'&code='+this.loginData.code).then(function(res){
						this.showLoading = false;
						if(res&&res.body&&res.body.success){
							localStorage.setItem('username',this.loginData.mobile);
							var token = res.body.data.token;
							localStorage.setItem('token',token);
							if(this.isWX){// 微信
								this.$router.push({path: this.$route.query.pathName});
							}else{// APP
								var query = this.$route.query;
								this.bindThirdPartAccount(query.type,query.appId,this.loginData.mobile,token,this.loginData.mobile);
							}
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
				
			},
			// 获取验证码
			getCode: function(){
				if(this.vaildNull(this.loginData.mobile)){
					this.toastData= {
						show: true,
						text: '请输入手机号码'
					};
					return
				}else if(this.loginData.mobile.length!=11){
					this.toastData= {
						show: true,
						text: '请输入正确手机号码'
					};
					return
				}else if(this.vaildNull(this.vfCode) && this.isNeed == 1){
					this.toastData= {
						show: true,
						text: '请输入图形验证码'
					};
					return
				}else if (this.vfCode == this.verifyCode){
					var para = {mobile: this.loginData.mobile,verifyCode: this.vfCode,verifyKey: this.verifyCodeKey};
					this.$http.get(BASE_URL + 'app/v2/login/smsCode',{params: para}).then(function(res){
						if(res.status==200){
							if(res.data.success==true){
								this.second = 60;
								this.countDown();
							}else{
								this.$message.error(res.data.data.errorMessage);
							}
						}
					}
					);
				}else {
					this.toastData= {
						show: true,
						text: '请输入正确验证码'
					};
					return
				}
				
			},
			// 倒计时
			countDown: function(){
				var scope = this;
				scope.canGetCode = false;
				var countDown = setInterval(function(){
					scope.second = scope.second - 1;
					if(scope.second == 0){
						scope.canGetCode = true;
						clearInterval(countDown);
					}
				},1000);
			},
			changeCode: function (){
				this.$http.get(BASE_URL + 'app/v1/login/defaultKaptcha',{}).then(function(res){
					let isNeed = res.body.data.isNeed, verifyCode = res.body.data.verifyCode
					this.isNeed = isNeed
					this.verifyCode = verifyCode
					if(isNeed == 1) {
						idCode.drawPic(verifyCode)
					}
				})
			}
		},
		beforeCreate: function(){
			this.setDocumentTitle("用户登录");
		},
		beforeCreate: function(){
			this.setDocumentTitle("绑定手机");
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
	.validCode{
		width: 30%;
	}
	.getCode{
		padding-left: 14px;
		padding-right: 14px;
	    height: 25px;
   		float: right;
	}
	#canvas {
		width: 1.8rem;
		height: 0.6rem;
	}
	
</style>