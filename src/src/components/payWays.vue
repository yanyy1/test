<template>
	<div>
		<div class="mask" v-on:click="hidePayWays()"></div>
		<div class="payWaysBox">
			<div class="title thin-border-bottom">选择付款方式</div>
			<div v-for="item in blanks" class="thin-border-bottom blankPay">
				<span class="floatLeft">{{item.name}}</span>
				<i class="icon iconfont icon-jiantou"></i>
				<span class="floatRight mgr-10">{{item.cardNum}}</span>
			</div>
			<div class="thin-border-bottom aliPay" @click="aliPay()">
				<img class="logoSty" src="static/img/alipay.png">
				<span class="floatLeft">支付宝</span>
				<i class="icon iconfont icon-jiantou"></i>
			</div>
			<div class="thin-border-bottom wxPay" @click="wxPay()">
				<img class="logoSty" src="static/img/wxPay.png">
				<span class="floatLeft">微信</span>
				<i class="icon iconfont icon-jiantou"></i>
			</div>
			<!-- <div class="btnBox">
				<button class="btnSty">添加付款方式</button>
			</div> -->
		</div>
	</div>
</template>
<script>
	export default{
		props: ['todo'],
		data(){
			return {
				blanks:[]
			}
		},
		created(){
			
		},
		methods: {
			hidePayWays: function(){
				this.todo.showPayWays = false;
			},
			aliPay: function(){
				
			},
			wxPay: function(){

			}
		}
	}
</script>
<style scoped>
	.mask{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
		z-index: 99998;
	}
	.payWaysBox{
		position: fixed;
		bottom: 0;
		right: 12px;
		left: 12px;
		background-color: #fff;
		z-index: 99999;
		border-radius: 5px 5px 0 0;
		padding-bottom: 50px;
	}
	.title{
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
	}
	.blankPay,.aliPay,.wxPay{
		padding: 10px 20px;
		height: 50px;
		line-height: 30px;
	}
	.logoSty{
		width: 30px;
		height: 30px;
		float: left;
		margin-right: 15px;
	}
	.icon-jiantou{
		float: right;
		font-size: 14px;
	}
	.btnBox{
		padding: 80px 30px 15px;
	}
</style>