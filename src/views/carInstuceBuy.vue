<template>
    <div>
    <serviceCommon  :pathPic="byone" :commonText="txt" :tel="phone"></serviceCommon>
    </div>
</template>
<script>
import  serviceCommon  from './serviceCommon.vue'
export default {

  data () {
    return {
      txt: '我们的客服将为您的车辆挑选最优的保险方案',
      byone: 'static/img/cxgm.png',
      phone: "tel:400-098-2118"
    }
  },
  methods:{

  },
  created(){

  },
   beforeCreate(){
        this.setDocumentTitle("车险购买");
    },
  components:{
    serviceCommon
  }
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
    #serviceCommon>img{
        width: 36px;
        height: 40px;
        margin: 0 auto;
        display: block;
        margin-top: 1.2rem;
    }
    #serviceCommon>.servicePhone{
        display: block;
        margin: 0 auto;
        font-size: 0.2934rem;
        text-align: center;
        margin-top: 0.1334rem;
    }
</style>