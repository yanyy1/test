<template>
	<div id="confirmModal">
		<div class="confirmBox">
			<div class="msg">{{msg}}</div>
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
				btnMsg: this.todo.btnMsg || '确认'
			}
		},
		methods: {
			cancel: function(){
				this.todo.show = false;
			},
			hide: function(){
				var scope = this;
				scope.todo.show = false;
				scope.todo.confirm(scope);
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
	    padding: 25px 8px;
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
</style>