<template>
	<div>
		<div class="successTitle">
			<i class="icon iconfont icon-duigou mgr-10"></i>
			<span class="f17">认证提交成功</span>
		</div>
		<div class="f15 successTip">
			恭喜您，您的认证已经提交成功，我们的工作人员将第一时间为您审核，请您耐心等待几分钟，如果您有其他疑问，欢迎致电客服：<span class="color-ed852e">400-098-2118</span>
		</div>
		<div class="carInfo applyProcess">
			<ul>
				<li v-for="item in scheduleData" v-bind:class="!item.flag? 'scheduleSty' : ''">
					<i class="icon iconfont icon-jindudian schedulePoint"></i>
					<div>
						<p class="f17 statusStr">{{item.text}}</p>
						<p class="f12 color-999">{{item.time}}</p>
					</div>
				</li>
				<div v-if="status==3" class="fixInfo">
					<div style="font-size:14px;" @click="toIDInfo()">前往修改<i class="icon iconfont icon-jiantou"></i></div>
				</div>
			</ul>
			<div class="errorMsg">{{errorMsg}}</div>
		</div>
		<div class="btnBox thin-border-top">
			<button  v-if="!(status==2&&!goBackFlag)" class="bottomBtn refresh" v-on:click="refresh()">刷新状态</button>
			<button v-if="status==2&&!goBackFlag" class="bottomBtn refresh" v-on:click="goSign()">前往签约</button>
			
			<button v-if="!goBackFlag" class="bottomBtn" v-on:click="viewOrder()">查看订单</button>
			<button v-if="goBackFlag" class="bottomBtn" v-on:click="goBack()">返回我的</button>
		</div>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				scheduleData: [
					{
						text:"填写认证信息",
						time: localStorage.getItem("fillInTime") || "",
						flag: true
					},
					{
						text:"提交认证信息",
						time: localStorage.getItem("submitTime") || "",
						flag: true
					},
					{
						text:"审核中",
						time: "",
						flag: true
					}
				],
				alertData: {
					show: false,
					msg: "",
				},
				errorMsg: "",
				status: '',
				goBackFlag: false
			}
		},
		methods: {
			goSign(){
				this.$router.push({path: '/sign',query: this.$route.query});
			},
			toIDInfo: function(){
				this.$router.push({path: '/IDInfo',query: this.$route.query});
			},
			goBack: function(){
				this.$router.push({path: '/me',query: this.$route.query});
			},
			refresh: function(){
				this.scheduleData = [
					{
						text:"填写认证信息",
						time: localStorage.getItem("fillInTime") || "",
						flag: true
					},
					{
						text:"提交认证信息",
						time: localStorage.getItem("submitTime") || "",
						flag: true
					},
					{
						text:"审核中",
						time: "",
						flag: true
					}
				];
				this.getStatus();
			},
			viewOrder: function(){
				this.$router.push({path: '/carParticulars',query: this.$route.query});
			},
			getStatus: function(){
				this.$http.post(BASE_URL+'app/v1/user/auditResult?username='+this.isLogin()).then(function(res){
					if(res&&res.body&&res.body.success){
						this.status = res.body.data.status;
						if(res.body.data.status == 1){
							this.scheduleData.push({text: "审核结果",time: "",flag: false});
						}else if(res.body.data.status == 2){
							this.scheduleData.push({text: "审核通过",time: "",flag: true});
						}else if(res.body.data.status == 3){
							this.scheduleData.push({text: "审核不通过",time: "",flag: true});
							this.errorMsg = res.body.data.message;
						}else if(res.body.data.status == 4){
							this.scheduleData.push({text: "黑名单",time: "",flag: true});
							this.errorMsg = res.body.data.message;
						}
					}else{
						this.alertData.show = true;
						this.alertData.msg = res.body.data.errorMessage;
					}
				});
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("成功提交");
		},
		created: function(){
			this.getStatus();
			function isEmptyObject(e) {  
			    var t;  
			    for (t in e)  
			        return !1;  
			    return !0  
			}
			if(isEmptyObject(this.$route.query)){
				this.goBackFlag = true;
			}
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
		background-color: #f5f5f5;
		height: 100px;
		padding: 20px;
	}
	.btnBox{
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
	}
	.refresh{
		background-color: #fff;
		color: #333;
	}
	.bottomBtn{
		width: 50%;
		height: 50px;
		float: left;
	}

	.applyProcess{
		margin-bottom: 50px;
		padding: 8px 20px;
	}
	.applyProcess ul li{
		padding-left: 40px;
		position: relative;
		height: 45px;
	}
	.applyProcess ul li:before{
		position: absolute;
		content: "";
		width: 1px;
	    height: 35px;
	    left: 13px;
	    top: -24px;
		background-color: #fd9c28;
	}
	.applyProcess ul li:first-child:before{
		height: 0;
	}
	.schedulePoint{
		position: absolute;
		font-size: 28px;
		color: #fd9c28;
		left: 0px;
	}
	.statusStr{
		padding-top: 6px;
	}
	.applyProcess ul li.scheduleSty:before{
		background-color: #eee;
	}
	.scheduleSty .schedulePoint{
		color: #eee;
	}
	.errorMsg{
		font-size: 15px;
		padding-left: 40px;
		padding-right: 10px;
		word-break: break-all;
	}
	.fixInfo{
		text-align: right;
		color: #ed852e;
	}
	.icon-jiantou{
		font-size: 10px;
		position: relative;
		bottom: 2px;
	}
</style>