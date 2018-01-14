<template>
    <div>
    <serviceCommon  :pathPic="byone" :commonText="txt" :tel="phone" v-on:click="takePhone()"></serviceCommon>
    </div>
</template>	
<script>
import  serviceCommon  from './serviceCommon.vue'
export default {

  data () {
    return {
      txt: '我们的客服将为您的车辆挑选最优的道路救援方案',
      byone: 'static/img/dljyBig.png',
      phone: "tel:400-098-2118"
    }
  },
  methods:{

  },
  created(){

  },
  components:{
    serviceCommon
  },
   beforeCreate: function(){
        this.setDocumentTitle("道路救援");
    },
}
</script>

<style src="../common.css"></style>