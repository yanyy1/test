<template>
	<div class="loading-mask">
		<div class="loading">
			<em class="loadingImg"></em>
		</div>
	</div>
</template>
<script>
	export default{
		
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
	.loading{
		width: 100px;
	    height: 82px;
	    line-height: 82px;
		position: fixed;
	    top: 40%;
	    left: 50%;
	    border-radius: 5px;
	    background: rgba(0,0,0,.6);
	    text-align: center;
	    margin-top: -41px;
	    margin-left: -50px;
	}
</style>