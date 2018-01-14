<template>
	<div class="loading-mask">
		<div class="loadingBox">
			<div class="loading" v-bind:class="todo">
				<em class="loadingImg"></em>
			</div>
			<div class="f15 tips">正在提交，可能需要1～3分钟</div>
			<div class="f15 tips">请您耐心等待</div>
		</div>
	</div>
</template>
<script>
	export default{
		props: ['todo']
	}
</script>
<style scoped>
	.loading-mask{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999999;
	}
	.loadingBox{
		width: 100%;
		height: 110px;
		position: fixed;
	    top: 40%;
	    margin-top: -54px;
	}
	.loading{
		width: 100px;
	    height: 82px;
	    line-height: 82px;
		margin: 0 auto 5px;
	    border-radius: 5px;
	    background: rgba(0,0,0,.6);
	    text-align: center;
	}
	.tips{
		line-height: 20px;
		text-align: center;
	}
</style>