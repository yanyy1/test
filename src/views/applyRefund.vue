<template>
	<div>
		<div class="successTitle">
			<i class="icon iconfont icon-duigou mgr-10"></i>
			<span class="f17">申请退款中</span>
		</div>
		<div class="f15 successTip">
			尊敬的用户您好，您已成功提交退款申请，我们将第一时间将您的退款退回您的账户，如果您有其他疑问，欢迎致电客服：<span class="color-ed852e"><a href="tel:400-098-2118" class="color-ed852e" v-on:click="takePhone()">400-098-2118</a></span>
		</div>
		<div class="carInfo applyProcess">
			<ul>
				<li v-for="item in scheduleData" v-bind:class="!item.flag? 'scheduleSty' : ''">
					<i class="icon iconfont icon-jindudian schedulePoint"></i>
					<div>
						<p class="f17">{{item.text}}</p>
						<!-- <p class="f12 color-999">2017-05-06 12:01</p> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="btnBox thin-border-top">
			<button class="bottomBtn refresh" v-on:click="returnHomePage()">返回首页</button>
			<button class="bottomBtn" @click="viewOrder()">查看订单</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				scheduleData: [
					{
						text:"定金支付成功",
						flag: true
					},
					{
						text:"申请退款",
						flag: true
					},
					{
						text:"填写退款信息",
						flag: true
					},
					{
						text:"审核申请",
						flag: true
					},
					
				],
			}
		},
		methods: {
			returnHomePage: function(){
				this.$router.push({path: "/"});
			},
			viewOrder: function(){
				this.$router.push({path: "/refundOrder",query: this.$route.query});
			}
		},
		beforeCreate: function(){
			this.setDocumentTitle("申请退款");
		},
		created: function(){
			var token = localStorage.getItem('token');
            this.$http.get(BASE_URL + 'app/v1/order/getOrderByOrderId?orderId='+this.$route.query.orderId, { headers: { access_token: token } }).then((res) =>{
				if(res&&res.body&&res.body.success){
					var state = res.body.data.state
					if(state == 7){// 退款成功
						this.scheduleData.push({text: "退款至账户",flag: true});
					}else if(state==8){// 退款中
						this.scheduleData.push({text: "退款中",flag: true});
					}else if(state==9){// 申请退款
						this.scheduleData.push({text: "退款至账户",flag: false});
					}else if(state==10){// 退款审核失败
						this.scheduleData.push({text: "退款审核失败",flag: true});
					}
				}
            })
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
	.applyProcess ul li.scheduleSty:before{
		background-color: #eee;
	}
	.scheduleSty .schedulePoint{
		color: #eee;
	}
</style>