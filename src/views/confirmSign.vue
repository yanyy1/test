<template>
	<div>
		<div class="successTitle">
			<i class="icon iconfont icon-duigou mgr-10"></i>
			<span class="f17">签约成功</span>
		</div>
		<div class="f15 successTip">
			恭喜您，您的申请已经成功，我们将第一时间将您的爱车送到您的身边，如果您有其他疑问，欢迎致电客服：<span class="color-ed852e">400-098-2118</span>
		</div>
		<div class="carInfo applyProcess">
			<ul>
			<!-- 	<li v-for="item in scheduleData">
					<i class="icon iconfont icon-jindudian schedulePoint"></i>
					
					<div>
						<p class="f17">{{item}}</p>
						
					</div>
				</li> -->
				<li v-for="item in scheduleData" v-bind:class="!item.flag? 'scheduleSty' : ''">
					<i class="icon iconfont icon-jindudian schedulePoint"></i>
					<div>
						<p class="f17 statusStr">{{item.text}}</p>
						<!-- <p class="f12 color-999">{{item.time}}</p> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="btnBox thin-border-top">
			<router-link to="/"><button class="bottomBtn refresh">返回首页</button></router-link>
			<button class="bottomBtn" v-on:click="viewOrder()">查看订单</button>
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
						text:"填写认证信息",
						flag: true
					},
					{
						text:"签署条约",
						flag: true
					},
					{
						text:"等待发货",
						flag: true
					},
					{
						text:"车辆发货",
						flag: false
					},
					{
						text:"支付首付款、线下取车",
						flag: false
					},
					{
						text:"每月月供",
						flag: false
					},
					{
						text:"完成订单",
						flag: false
					},
				],
			}
		},
		methods: {
			viewOrder: function(){
				this.$router.push({path: '/carParticulars',query: this.$route.query});
			}
		},
		beforeCreate:function(){
			this.setDocumentTitle("确认签约");
		},
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
	.scheduleSty .schedulePoint{
		color: #eee;
	}
	.applyProcess ul li.scheduleSty:before{
		background-color: #eee;
	}
</style>