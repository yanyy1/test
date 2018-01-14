<template>
	<div>
		<div class="ImmediateContact">
			<div class="ImmediateContactTitle">申请人信息</div>
			<div class="ImmediateContactDetail">
				<div class="inputBoxSty thin-border-bottom f15 selectSty">
					<span class="inputName thin-border-right">关系</span>
					<select class="inputSty" v-model="relatives.applyerrelation">
						<option value="">请选择</option>
						<option v-for="(i,index) in relations" v-bind:value="i" :key="index">{{i}}</option>
					</select>
					<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
				</div>
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">姓名</span>
					<input class="inputSty" type="text" name="" v-model="relatives.applyername">
				</div>

				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">电话</span>
					<input class="inputSty" type="tel" name="" v-model="relatives.phonenumber" maxlength="11">
				</div>
                <div class="inputBoxSty thin-border-bottom f15" >
					<span class="inputName thin-border-right">身份证号</span>
					<input class="inputSty" type="tel" name="" v-model="relatives.applyerid">
				</div>
			</div>
		</div>
		<div class="ImmediateContact">
			<div class="otherContactTitle">扶持对象信息</div>
			<div class="ImmediateContactDetail">
				<div class="inputBoxSty thin-border-bottom f15 selectSty">
					<span class="inputName thin-border-right">关系</span>
					<select class="inputSty" v-model="relatives.supportedrelation">
						<option value="">请选择</option>
						<option v-for="(i,index) in relations" v-bind:value="i" :key="index">{{i}}</option>
					</select>
					<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
				</div>
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">姓名</span>
					<input class="inputSty" type="text" name="" v-model="relatives.supportedname">
				</div>

                <div class="inputBoxSty thin-border-bottom f15" >
					<span class="inputName thin-border-right">身份证号</span>
					<input class="inputSty" type="tel" name="" v-model="relatives.supportedid">
				</div>
			</div>
		</div>

        <div  class="ImmediateContactTitle">申请书</div>
        <div class="textBox">
       		<textarea class="applyText" placeholder="请以实际情况填写申请书,从而提升申请通过率" v-model="relatives.application"></textarea>  
        </div>

		<div class="btnBox">
			<button class="btnSty" v-on:click="nextStep()">提交申请</button>
		</div>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				relations:['父母','子女','亲属'],
				relatives: {
				  "applyerid": "",
				  "applyername": "",
				  "applyerrelation": "",
				  "contractid": this.$route.query.id,
				  "id": 0,
				  "phonenumber": "",
				  "status": 0,
				  "supportedid": "",
				  "supportedname": "",
				  "supportedrelation": "",
				  "username": this.isLogin(),
				  "application": ""
				},
				alertData: {
					show: false,
					msg: "",
				},
				toastData:{
					show: false,
					text: ""
				},
			}
		},
		methods:{
			viewList:function(index){
				window.scope = this;
				this.getHostApp(function(hostApp){
                    window.getRelatives = function(name,phone){
                    	scope.relatives.name = name;
                    	scope.relatives.phone = phone;
					}
					hostApp.callRelatives('getRelatives');
				});
			},
			isAllInput: function(){
				if(this.vaildNull(this.relatives.applyerrelation)){
					this.toastData= {
						show: true,
						text: '请选择申请人关系'
					};
					return
				}else if(this.vaildNull(this.relatives.applyername)){
					this.toastData= {
						show: true,
						text: '请输入申请人姓名'
					};
					return
				}else if(this.vaildNull(this.relatives.phonenumber)){
					this.toastData= {
						show: true,
						text: '请输入申请人电话'
					};
					return
				}else if(this.vaildNull(this.relatives.applyerid)){
					this.toastData= {
						show: true,
						text: '请输入申请人身份证号'
					};
					return
				}else if(this.vaildNull(this.relatives.supportedrelation)){
					this.toastData= {
						show: true,
						text: '请选择扶持对象关系'
					};
					return
				}else if(this.vaildNull(this.relatives.supportedname)){
					this.toastData= {
						show: true,
						text: '请输入扶持对象姓名'
					};
					return
				}else if(this.vaildNull(this.relatives.supportedid)){
					this.toastData= {
						show: true,
						text: '请输入扶持对象身份证号'
					};
					return
				}else {
					return true
				}
			},
			nextStep: function(){
				if(this.isAllInput()){
					this.$http.post(BASE_URL+'app/v1/yinLai',this.relatives).then(function(res){
						if(res&&res.body&&res.body.success){
							this.$router.push({path: "/carService"});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("申请登记");
		},
	}
</script>
<style scoped>
	.careerInfoTitle,.ImmediateContactTitle,.otherContactTitle{
		padding-left: 15px;
		border-left: 2px solid #ed852e;
		height: 25px;
		line-height: 25px;
		margin: 15px 10px;
		font-size: 14px;
	}
	.careerInfoDetail,.ImmediateContactDetail,.otherContactDetail{
		box-shadow: 0 0 5px #eee;
		margin: 0 10px;
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
	.name.inputSty{
		width: 40%;
	}
	.viewList{
		display: inline-block;
		width: 25%;
		text-align: center;
	}
	select.inputSty{
		-webkit-appearance: none;
		background-color: #fff
	}
	.selectSty{
		position: relative;
	}
	.arrowDownSty{
		position: absolute;
		right: 20px;
		top: 15px;
	}
	.btnBox{
		padding: 10px;
	}
	.areaCode{
		width: 20%;
		height: 25px;
		display: inline-block;
	}
	.areaCode input{
		width: 100%;
	}
	.fixPhone{
		width: 48%
	}
	.income{
		width: 52%;
	}
	.unit{
		width: 16%;
		padding-right: 15px;
		display: inline-block;
		text-align: right;
	}
	.tips{
		padding-left: 10px;
		padding-right: 10px;
	}
	.textBox{
		width: 100%;
		padding: 0 10px;
	}
    .applyText{
    	width: 100%;
        height: 250px;
        font-size: 15px;
        color: #999;
        border: none;
        box-shadow: 0 0 5px #ccc;
        outline: none;
        display: block;
        border-radius: 5px;
        resize: none;
        padding: 10px;
        box-sizing: border-box;
    }
</style>