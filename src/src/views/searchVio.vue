<template>
    <div class="content">
        <p class="pSty">以下信息仅用于交管局查询，我们将严格保密</p>
        <div class="register-item">
            <span>车牌号码</span>
            
            <input class="num" type="text" placeholder="车牌号码" maxlength="6" v-model="num"/>
            <div @click="showPro()">{{proData.pro}}<i class="icon iconfont icon-jiantou"></i></div>
        </div>
        <div class="register-item">
            <span>发动机号</span>
            <input type="text" placeholder="发动机号后6位" v-model="engine"/>
        </div>
        <div class="register-item">
            <span>车辆识别代号</span>
            <input type="text" placeholder="车辆识别代号后6位" v-model="recogn"/>
        </div>
        <div class="btnBox"><button class="btnSty" :class="!num?'on':''" @click="search()">查询</button></div>
        <selectPro :todo="proData" @pro="getPro"></selectPro>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
        <loading v-if="showLoading"></loading>
    </div>
</template>
<script>
import selectPro from '../components/selectPro.vue'
    export default{
        data(){
            return{
              proData:{
                show: false,
                pro: '粤'
              },
              num: '',
              engine: '',
              recogn: '',
              alertData: {
                    show: false,
                    msg: "",
                },
                showLoading: false
            }
        },
        computed:{
            carId(){
                return this.proData.pro + this.num;
            }
        },
        methods:{
            showPro(){
                this.proData.show = true;
            },
            getPro(d){
                this.proData.pro = d;
            },
            search(){
                if(!this.num){
                    return
                }
                this.showLoading = true;
                let token = localStorage.getItem('token');
                let d = {
                    carNumber: this.carId,
                    carCode: this.recogn,
                    carDriveNumber: this.engine,
                }
                this.$http({
                    method:'GET',
                    url: BASE_URL+"app/v1/illegal/record",
                    params: d,
                    headers: {
                        access_token: token,
                    },
                }).then((res) => {
                    if(res && res.data && res.data.success){
                        this.showLoading = false;
                        let history = JSON.parse(localStorage.getItem('history')) || [];
                        let hasItem = false;
                        if(history.length>0){
                            
                            history.forEach(function(e){
                                if(e.carNumber == d.carNumber){
                                    hasItem = true;
                                    return
                                }
                            });
                        }
                        if(!hasItem){
                            history.push(d);
                            localStorage.setItem('history',JSON.stringify(history));
                        }
                            

                        this.$router.push({path: '/vioList',query:{carNumber: this.carId,carCode: this.recogn,carDriveNumber: this.engine}});
                    }else{
                        this.showLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                })
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("违章查询");
        },
        components:{
            selectPro
        }
    }
</script>
<style scoped>
    .content{
        background-color: #F5F4F9;
        width: 100%;
        height: 100%;
    }
    .pSty{
        padding: 24px 0 10px 20px;
        font-size: 13px;
        color: #999;
    }
    .register-item{
        height:50px;
        background-color:#fff;
        font-size:16px;
        padding: 0 30px 0 15px;
        line-height: 50px;
        border-top:1px solid #f2f2f2;
      }
      .register-item>span{
        color: #333333;
        display: inline-block;
      }
      .register-item>div{
        width: 40px;
        height: 26px;
        border-radius: 2px;
        float: right;
        background: #FCE7D2;
        color: #EF851C;
        margin-top: 12px;
        line-height: 26px;
        padding-left: 7px;
      }
      .register-item>input.num{
        width: 90px;
      }
      .register-item>input{
        float: right;
        width: 170px;
        height: 49px;
        border:none;
        outline:none;
        font-size: 15px;
        text-align: right;
      }
    input::-webkit-input-placeholder {
        color: #BCBCBC;
        font-size: pxTorem(15);
      }
      .icon-jiantou{
        font-size: 14px;
        position: relative;
        top: -2px;
      }
      .btnBox{
        padding: 40px 20px 0;
      }
      .btnSty.on{
        background: #C0C0C0;
      }
</style>