<template>
<section>
    <div class="payShade" @click="hide"></div>
    <div class="payType">
        <header>选择付款方式</header>
        <div @click="payZfb"><span class="payLogo"><img src="static/img/zfb.png"></span><span class="text">支付宝</span><i class="iconfont icon-gengduo"></i></div>
        <div @click="payWx"><span class="payLogo"><img src="static/img/wechat.png"></span><span class="text">微信</span><i class="iconfont icon-gengduo"></i></div>
    </div>
</section>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        payZfb:function(){
            this.$emit('oneType');
        },
        payWx:function(){
            this.$emit('twoType');
        },
        hide:function(){
            this.$emit('hidePayType');
        }
    }
}
</script>
<style scoped>
.payShade{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 0;
}
.payType{
    z-index: 999;
    width: 9.334rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
   -webkit-transform: translate(-50%,-50%);
    background: white;
    font-size: 0.4rem;
   border-radius: 10px;
    /*padding-bottom: 0.5rem;*/
}
.payType header{
    text-align: center;
    line-height: 1rem;
}
.payType>div{
    padding: 0 0.5334rem;

    line-height: 1.5rem;
    position: relative;
}
.payType>div:nth-of-type(1){
      border-bottom: 1px solid #ccc;
}
.payType>div>.payLogo{
    width: 40px;
    height: 40px;
    display: inline-block;
     position: absolute;
   top: 50%;
   transform: translateY(-50%);
   -webkit-transform: translateY(-50%);
   -moz-transform: translateY(-50%);
   -ms-transform: translateY(-50%);
}
.payType>div>.payLogo>img{
  width:100%;
}
 .payType>div>.text{
    margin-left: 1.8rem;
} 
.payType>div>i{
    float: right;
    font-size: 0.4rem;
}
</style>