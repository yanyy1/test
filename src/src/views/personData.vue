<template>
    <section id="personData">
        <img src="static/img/login.png" />
        <span class="login">已登录</span>
        <span class="number">{{username}}</span>
        <span class="attentation"><i class="iconfont icon-duigou" :class="statusBollean?iconActive:''"></i>{{ statusText }}</span>
       <!--  <navList :arr="arr"></navList> -->
        <ul class="details">
            <li @click="toPath">个人信息</li>
            
        </ul>
        <Tips v-show="tipShow" v-on:closeTips="closeTips" :tip="tip" ></Tips>
    </section>
</template>
<script>
import  navList from './navList.vue'
export default{
    data(){
        return{
            username:'',
            status:'',
            statusText:'未认证',
            statusBollean:false,
            iconActive:"iconActive",
            tipShow:false,
            tip:"",
            tipArr:["身份信息审核中","身份信息审核完成","身份信息审核失败","用户已经上了黑名单"]

        }
    },
    methods:{
        initInfo:function(){
            var token = localStorage.getItem('token');
            this.username = localStorage.getItem('username');
            var username = this.username;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/user/auditResult",
                params: {
                    username: username
                },
                headers:{access_token: token}
            }).then((res)=>{
                this.status = res.body.data.status;
                if (this.status == 2) {
                    this.statusText = "已认证";
                    this.statusBollean = true;
                }
            }, (err)=>{})
        },
        toPath:function(){
            var status = this.status;
            switch(status)
        {
        case 0:
            this.$router.push({path: "/IDinfo"});
            // self.location=location.origin+location.pathname+"#/IDinfo";window.location.reload();
            
          break;
        case 1:
            this.tipShow = true;
            this.tip = this.tipArr[0];
          break;
        case 2:
            this.tipShow = true;
          this.tip = this.tipArr[1];
          break;
        case 3:
          this.$router.push({path: "/submitSuccess"});
          // self.location=location.origin+location.pathname+"#/submitSuccess";window.location.reload();
         
          break;
        case 4:
            this.tipShow = true;
           this.tip = this.tipArr[3];
          break;
       
        }
           

        },
        closeTips:function(){
            this.tipShow = false;
        }
    },
    components:{
            navList
        },
    created(){
            this.initInfo();
        },
    beforeCreate(){
     this.setDocumentTitle("个人信息");
  },
}
</script>

<style scoped>
    #personData{
        padding-bottom: 1.4rem; 
        color: #333333;
        font-size: 0.4534rem;
    }
    #personData>img{
        width: 2.4rem;
        height: 2.4rem;
        display: block;
        margin:  0 auto;
        margin-top: 0.4rem;
    }
    #personData>span{
        width: 100%;
        display: inline-block;
        text-align: center;
        margin-top: 0.2667rem;
    }
    .attentation{font-size:0.32rem; margin-top: 0.4rem;}
    .attentation>i{font-size: 0.32rem;margin-right: 0.1334rem;color: gray;}
    .attentation>.iconActive{
        color: #79e683;
    }
    #personData  .details{margin: 0.334rem 0;border-top: 1px solid #ccc;}
     #personData .details>li{
        text-align: center;
        padding: 0.334rem 0;
    }
</style>