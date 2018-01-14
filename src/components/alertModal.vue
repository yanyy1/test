<template>
	<div id="alertModal">
		<div class="alertBox">
			<div class="msg">{{msg}}</div>
			<div class="ok" v-on:click="hide()">{{btnMsg}}</div>
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
			hide: function(){
				var scope = this;
				scope.todo.show = false;
				if(scope.todo.callBack){
					scope.todo.callBack(scope);
				}
			}
		}
	}
</script>

<style scoped>
	#alertModal{
		position: fixed;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.3);
	    z-index: 99999;
	}
	#alertModal .alertBox{
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
	#alertModal .alertBox .msg{
		word-break: break-all;
	    padding: 25px 8px;
	    text-align: center;
	    font-size: 14px;
	    color: #333;
	}
	#alertModal .alertBox .ok{
	    color: #3577cd;
	    text-align: center;
	    line-height: 44px;
	    border-top: 1px solid #EFEFF4;
	    font-size: 14px;
	}
</style>