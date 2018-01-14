<template>
    <section id="serviceCommon">
        <span class="serLogo"><img v-bind:src="pathPic"></span>
        <div class="serviceIntro">{{ commonText }}</div>
       <a :href="tel" v-on:click="takePhone()"><img src="static/img/kefu.png"></a>
       <span class="servicePhone">在线客服</span>
    </section>
</template> 
<script>

export default {
  name: 'serCommon',
  props: ['pathPic','commonText',"tel"]
}
</script>

<style src="../common.css"></style>
<style scoped >
    #serviceCommon>.serLogo{
        width: 2.8534rem;
        height: 2.8534rem;
        display: block;
        margin: 0 auto;
        margin-top: 1.2rem;
    }
    #serviceCommon>.serLogo>img{
        width: 100%;
    }
    .serviceIntro{
        margin: 0px  2.293rem;
        font-size: 0.4rem;
        margin-top: 1.2rem;
        text-align: center;
    }
    #serviceCommon>a{
        width: 0.48rem;
        height: auto;
        margin: 0 auto;
        display: block;
        margin-top: 1.2rem;
        overflow: auto;
    }
    #serviceCommon>a>img{
        float: left;
        width: 100%;
    }
    #serviceCommon>.servicePhone{
        display: block;
        margin: 0 auto;
        font-size: 0.2934rem;
        text-align: center;
        margin-top: 0.1334rem;
    }
</style>