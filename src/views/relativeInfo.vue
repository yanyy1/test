<template>
	<div>
		<div class="ImmediateContact" v-if="index<2" v-for="(item,index) in relatives">
			<div v-if="item.type==1" class="ImmediateContactTitle">直系联系人</div>
			<div v-if="item.type==2" class="otherContactTitle">其他联系人</div>
			<div class="ImmediateContactDetail">
				<div class="inputBoxSty thin-border-bottom f15 selectSty">
					<span class="inputName thin-border-right">关系</span>
					<select class="inputSty" v-model="item.relation">
						<option value="">请选择</option>
						<option v-for="i in item.relations" v-bind:value="i">{{i}}</option>
					</select>
					<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
				</div>
				<div v-if="isWX" class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">姓名</span>
					<input class="inputSty" type="text" name="" v-model="item.name">
				</div>

				<div v-if="!isWX" class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">姓名</span>
					<input class="inputSty name" type="text" name="" v-model="item.name">
					<span class="viewList thin-border-left" v-on:click="viewList(index)">查看通讯录</span>
				</div>

				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">电话</span>
					<input class="inputSty" type="tel" name="" v-model="item.phone" maxlength="11">
				</div>
				<div class="tips inputBoxSty color-ed852e f12">注意：请填写真实姓名与号码，以便于提高您的审核通过率</div>
			</div>
		</div>

		<div class="btnBox">
			<button class="btnSty" v-on:click="nextStep()">下一步</button>
		</div>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				relatives:[
					{
						name: "",
						phone: "",
						phonenumber: this.isLogin(),
						relation: "",
						type: 1,
						relations:['配偶','父母','子女']
					},
					{
						name: "",
						phone: "",
						phonenumber: this.isLogin(),
						relation: "",
						type: 2,
						relations: ['兄弟姐妹','同事','同学','朋友']
					},
				],
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
                    	scope.relatives[index].name = name;
                    	scope.relatives[index].phone = phone;
					}
					hostApp.callRelatives('getRelatives');
				});
			},
			isAllInput: function(){
				if(this.vaildNull(this.relatives[0].relation)){
					this.toastData= {
						show: true,
						text: '请选择直系联系人关系'
					};
					return
				}else if(this.vaildNull(this.relatives[0].name)){
					this.toastData= {
						show: true,
						text: '请输入直系联系人姓名'
					};
					return
				}else if(this.vaildNull(this.relatives[0].phone)){
					this.toastData= {
						show: true,
						text: '请输入直系联系人电话'
					};
					return
				}else if(this.vaildNull(this.relatives[1].relation)){
					this.toastData= {
						show: true,
						text: '请选择其他联系人关系'
					};
					return
				}else if(this.vaildNull(this.relatives[1].name)){
					this.toastData= {
						show: true,
						text: '请输入其他联系人姓名'
					};
					return
				}else if(this.vaildNull(this.relatives[1].phone)){
					this.toastData= {
						show: true,
						text: '请输入其他联系人电话'
					};
					return
				}else {
					return true
				}
			},
			nextStep: function(){
				if(this.isAllInput()){
					this.$http.post(BASE_URL+'app/v1/user/relativeInfo?username='+this.isLogin(),this.relatives).then(function(res){
						if(res&&res.body&&res.body.success){
							this.$router.push({path: "/validPhone",query: this.$route.query});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("联系人信息");
		},
		created:function(){
			var relatives = localStorage.getItem("relatives");
			if(relatives&&relatives!=undefined){
				this.relatives = JSON.parse(relatives);
				this.relatives.forEach(function(e){
					if(e.type == 1){
						e.relations = ['配偶','父母','子女'];
					}else if(e.type == 2){
						e.relations = ['兄弟姐妹','同事','同学','朋友'];
					}
				});
			}
		}
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
</style>