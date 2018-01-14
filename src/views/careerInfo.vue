<template>
	<div>
		<div class="careerInfo">
			<div class="careerInfoTitle f15">职业信息</div>
			<div class="careerInfoDetail">
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">公司全称</span>
					<input class="inputSty" type="text" name="" v-model="occupation.companyName">
				</div>
				<div class="inputBoxSty thin-border-bottom f15 selectSty">
					<span class="inputName thin-border-right">公司地址</span>
					<input id="address" class="inputSty" type="text" name="" readonly="" unselectable="true" onfocus="this.blur()" v-model="occupation.companyAddress">
					<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
				</div>
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">详细地址</span>
					<input class="inputSty" type="text" name="" v-model="occupation.detailAddress">
					<input type="hidden" name="" id="addressVal">
				</div>
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">公司电话</span>
					<span class="areaCode thin-border-right ">
						<input class="inputSty " type="tel" name="" placeholder="区号" maxlength="4" v-model='occupation.areaNum' onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')">
					</span>
					<input class="inputSty fixPhone" type="tel" name="" placeholder="电话号码" maxlength="8" v-model="occupation.phoneNum" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')">
				</div>
				<div class="inputBoxSty thin-border-bottom f15">
					<span class="inputName thin-border-right">月收入</span>
					<input class="inputSty income" type="tel" name="" v-model="occupation.salary" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')">
					<span class="unit">元</span>
				</div>
				<div class="inputBoxSty thin-border-bottom f15 selectSty">
					<span class="inputName thin-border-right">入职年份</span>
					<input id="joinCompanyDate" type="text" name="" class="inputSty" readonly="" unselectable="true" onfocus="this.blur()" v-model="occupation.joinCompanyDate"/>
					<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
				</div>
			</div>
		</div>

		<div class="btnBox">
			<button class="btnSty" v-on:click="nextStep()">下一步</button>
		</div>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
		<loading v-if="showLoading"></loading>
	</div>
</template>
<script>
	import '../js/LCalendar.js'
    import '../css/LCalendar.css'
    import '../js/testData.js'
    import '../js/LArea.min.js'
    import '../css/LArea.min.css'
	export default{
		data(){
			return {
				showLoading: false,
				occupation: {
					id: 0,
					companyName: "",
					companyAddress: "",
					detailAddress: "",
					companyPhone: "",
					salary: "",
					joinCompanyDate: "",
					phoneNumber: this.isLogin(),
					areaNum: "",
					phoneNum: "",
				},
				toastData:{
					show: false,
					text: ""
				},
				alertData: {
					show: false,
					msg: "",
				},
			}
		},
		methods:{
			isAllInput: function(){
				if(this.vaildNull(this.occupation.companyName)){
					this.toastData= {
						show: true,
						text: '请输入公司全称'
					};
					return
				}else if(this.vaildNull(this.occupation.companyAddress)){
					this.toastData= {
						show: true,
						text: '请输入公司地址'
					};
					return
				}else if(this.vaildNull(this.occupation.detailAddress)){
					this.toastData= {
						show: true,
						text: '请输入详细地址'
					};
					return
				// }else if(this.vaildNull(this.occupation.areaNum)){
				// 	this.toastData= {
				// 		show: true,
				// 		text: '请输入区号'
				// 	};
				// 	return
				// }else if(this.vaildNull(this.occupation.phoneNum)){
				// 	this.toastData= {
				// 		show: true,
				// 		text: '请输入电话号码'
				// 	};
				// 	return
				}else if(this.vaildNull(this.occupation.salary)){
					this.toastData= {
						show: true,
						text: '请输入月收入'
					};
					return
				}else if(this.vaildNull(this.occupation.joinCompanyDate)){
					this.toastData= {
						show: true,
						text: '请输入入职年份'
					};
					return
				}else {
					return true
				}
			},
			nextStep: function(){
				if(this.isAllInput()){
					var param = JSON.parse(JSON.stringify(this.occupation));
					param.companyPhone = this.occupation.areaNum + "-" + this.occupation.phoneNum;
					param.joinCompanyDate = new Date(this.occupation.joinCompanyDate);
					param.companyAddress = this.occupation.companyAddress.replace(/,/g,'');
					this.showLoading = true;
					this.$http.post(BASE_URL+'app/v1/user/occupationInfo?username='+this.isLogin(),param).then(function(res){
						this.showLoading = false;
						if(res&&res.body&&res.body.success){
							this.$router.push({path: "/relativeInfo",query: this.$route.query});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("职业信息");
		},
		created:function(){
			var occupation = localStorage.getItem("occupation");
			if(occupation&&occupation!=undefined){
				this.occupation = JSON.parse(occupation);
				this.occupation.areaNum = this.occupation.companyPhone.split("-")[0];
				this.occupation.phoneNum = this.occupation.companyPhone.split("-")[1];
				this.occupation.joinCompanyDate = new Date(this.occupation.joinCompanyDate).getFullYear() + "-" + ((new Date(this.occupation.joinCompanyDate).getMonth() + 1) < 10 ? ('0' + (new Date(this.occupation.joinCompanyDate).getMonth() + 1)) : (new Date(this.occupation.joinCompanyDate).getMonth() + 1));
			}
		},
		mounted(){
			var calendarym = new LCalendar();
		    calendarym.init({
		        'trigger': '#joinCompanyDate',
		        'type': 'ym',
		        'minDate': '1900-1',
		        'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
		    });

		    var area = new LArea();
		    area.init({
		        'trigger': '#address',
		        'valueTo': '#addressVal',
		        'keys': {
		            id: 'value',
		            name: 'text'
		        },
		        'type': 2,
		        'data': [provs_data, citys_data, dists_data]
		    });
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
</style>