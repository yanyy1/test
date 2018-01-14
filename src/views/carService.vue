<template>
    <section id="serContent">
      <div class="entryBox">
        <div class="entryItem" v-for="(item,index) in dataList" @click="link(item.path)">
          <img :src="item.img"/>
          <p>{{item.text}}</p>
        </div>
      </div>
      <!--   <ul class="twoChoice">
            <router-link to="/carService/ylFoundation" tag="li" class="funds">
                <span><img src="static/img/yljjh.png"></span>
                <div class="serTitle">银来基金会</div>
                <div class="fundsContent twoContent">以弘扬敬老爱老助老为中心,为有困难的老年人雪中送炭为重点。</div>
            </router-link>
            <router-link to="/carService/carInstuceBuy" tag="li" class="insurance">
                <span><img src="static/img/cxgm.png"></span>
                <div class="serTitle">车险购买</div>
                <div class="insuranceContent twoContent">为你的爱车买一份保险,安全,无忧,出行</div>
            </router-link>
        </ul>
        <ul id="serverList">
            <router-link to="/carService/serReport" tag="li"  >
                <span><img src="static/img/bxba.png"></span><span>保险报案</span></li>
            </router-link>

            <router-link to="/carService/serRoad" tag="li">
                <span><img src="static/img/dljy.png"></span><span>道路救援</span>
            </router-link>
            <router-link to="/carService/serRepair" tag="li">
                <span><img src="static/img/clby.png"></span><span>车辆保养</span>
            </router-link>
        </ul> -->
        <bottomNav v-bind:todo="active"></bottomNav>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
    </section>
</template>
<script>
import bottomNav from "../components/bottomNav.vue"
export default {
  data () {
    return {
      keyword:'',
      active: {
          path: this.$route.path,
          name: this.$route.name,
      },
      dataList: [
        {
          img: 'static/img/p1.png',
          text: '车险购买',
          path: '/carService/carInstuceBuy'
        },
        {
          img: 'static/img/p2.png',
          text: '保险报案',
          path: '/carService/serReport'
        },
        {
          img: 'static/img/p3.png',
          text: '道路救援',
          path: '/carService/serRoad'
        },
        {
          img: 'static/img/p4.png',
          text: '车辆保养',
          path: '/carService/serRepair'
        },
        {
          img: 'static/img/p5.png',
          text: '违章查询',
          path: '/searchVioR'
        },
      ],
      toastData:{
          show: false,
          text: ""
        },
    }
  },
  methods:{
    link(path){
      if(path){
        if(path=="/searchVioR"){

          let p = "/searchVioR";

          let history = JSON.parse(localStorage.getItem('history')) || [];
          if(history.length>0){
            p = "/searchVioR";
          }else{
            p = "/searchVio";
          }

          if(this.isLogin()){
              this.$router.push({path: p});
          }else{
              this.$router.push({path: this.isWX ? 'login' : 'loginPage',query: {pathName: p}});
          }

          
        }else{
          if(this.isLogin()){
              this.$router.push({path: path});
          }else{
              this.$router.push({path: this.isWX ? 'login' : 'loginPage',query: {pathName: path}});
          }
        }
      }else{
        this.toastData= {
          show: true,
          text: '尚在开发中，请敬请期待'
        };
      }
    }
  },
  beforeCreate(){
     this.setDocumentTitle("车主服务");
  },
  created(){

  },
  components:{
    bottomNav
  }
}
</script>

<style src="../common.css"></style>
<style scoped >
  #serContent{
    width: 100%;
    height: 100%;
    background-color: #F5F4F9;
    padding-top: 5px;
    box-sizing: border-box;
/*    position: relative;
    top: -1px;*/
  }
  .entryBox{
    background-color: #fff;
    overflow: hidden;
  }
  .entryItem{
    width: 25%;
    float: left;
    height: 2rem;
    text-align: center;
    font-size: 0.3733rem;
    padding-top: 0.26667rem;
  }
  .entryItem img{
    width: 0.8rem;
    height: 0.8rem;
  }
/*  #serContent>.twoChoice{
    width: 100%;
    overflow:auto;
     border-bottom:1px solid #eee;
  }
  #serContent>.twoChoice>li{
    width: 50%;
    float: left;
    padding:1.886rem 0 1.173rem 0;
  }
  #serContent>.twoChoice>li:nth-of-type(1){
  border-right:1px solid #eee;
  }
  #serContent>.twoChoice>li>span{
    width: 2.8534rem;
    height: 2.8534rem;
    display: block;
    margin: 0 auto;

  }
  #serContent>.twoChoice>li>span>img{
    width: 100%;
  }
  #serContent .serTitle{
    width: 100%;
    font-size: 0.4534rem;
    text-align: center;
    float: left;
    margin-top: 0.47rem;
  }
  #serContent .twoContent{
    margin: 0 1rem;
    font-size: 0.4rem;
    color: #999999;
    margin-top: 0.5333rem;
    text-align: center;
    padding-top: 1rem;
  }
  #serverList{
    margin: 0px 45px;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    margin-top: 1.8rem;
  }
  #serverList>li{
    -webkit-box-flex: 1;
  }
  #serverList>li>span:first-child{
    width: 1.44rem;
    height: 1.44rem;
    display: block;
    margin: 0 auto;
  }
  #serverList>li>span:first-child>img{
    width: 100%;
  }
  #serverList>li>span:last-child{
    width: 100%;
    text-align: center;
    font-size: 0.32rem;
    color: #333333;
    float: left;
    margin-top: 0.2667rem;
  }*/
</style>