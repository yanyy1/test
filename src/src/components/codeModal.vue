<template>
	<div id="confirmModal">
		<div class="confirmBox">
			<div class="titleSty">{{title}}</div>
			<div class="msg">{{msg}}</div>
			<div class="inputStyle">
				<input type="text" name="" placeholder="请输入验证码" v-model="inputCode">
			</div>
			<div class="btnBox">
				<div class="cancel thin-border-right" v-on:click="cancel()">取消</div>
				<div class="ok" v-on:click="hide()">{{btnMsg}}</div>
			</div>
		</div>
		<div>
			
		</div>
	</div>
</template>

<script>
	export default{
		props: ["todo"],
		data: function(){
			return {
				msg: this.todo.msg || '系统异常',
				btnMsg: this.todo.btnMsg || '确认',
				title: this.todo.title || '',
				inputCode: ""
			}
		},
		methods: {
			cancel: function(){
				this.todo.show = false;
			},
			hide: function(){
				var scope = this;
				scope.todo.show = false;
				scope.todo.confirm(scope.inputCode);
			}
		}
	}
</script>

<style scoped>
	#confirmModal{
		/*display: none;*/
		position: fixed;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.3);
	    z-index: 99999;
	}
	#confirmModal .confirmBox{
	    background: #fff;
	    border-radius: 5px;
	    box-sizing: border-box;
	    margin: 0 8%;
	    position: fixed;
	    width: 84%;
	    z-index: 99999;
	    top: 50%;
	    transform: translate3d(0, -65%, 0);
	    -webkit-transform: translate3d(0, -65%, 0);
	    display: block;
	}
	#confirmModal .confirmBox .msg{
		word-break: break-all;
	    padding: 5px 8px 15px; 
	    text-align: center;
	    font-size: 14px;
	    color: #333;
	}
	.btnBox{
		color: #3577cd;
	    text-align: center;
	    line-height: 44px;
	    border-top: 1px solid #EFEFF4;
	}
	#confirmModal .confirmBox .ok,#confirmModal .confirmBox .cancel{
	   width: 50%;
	   float: left;
	   font-size: 14px;
	}
	#confirmModal .confirmBox .cancel{
		color: #666;
	}
	.inputStyle{
		text-align: center;
		margin-bottom: 10px;
	}
	.inputStyle input{
		width: 80%;
		height: 30px;
		outline: none;
		border: 1px solid #eee;
		padding-left: 5px;
	}
	.titleSty{
		text-align: center;
		font-size: 16px;
		margin-top: 15px;
	}
</style>