<template>
    <div>
        <!-- <p class="title">{{data.title}}</p>
        <p class="time">{{data.updateTime}}</p> -->
        <!-- <img class="imgSty" v-bind:src="data.url"> -->
        <p class="text" v-html="data.content"></p>
        <div class="viewDetailBtn thin-border-top">
            <a href="tel:400-098-2118" v-on:click="takePhone()">
                <button class='onlineService btn'>
                    <div class="floatLeft leftIcon">
                        <i class="icon iconfont icon-kefu"></i>
                    </div>
                    <div class="floatLeft">
                        <p class="kefu">联系客服</p>
                        <p class="shijian">9:00-18:00</p>
                    </div>
                </button>
            </a>
            <button class='viewDetail btn' v-on:click="submitBtn">申请登记</button>
        </div>
        <loading v-if="showLoading"></loading>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                data: {},
                showLoading: false
            }
        },
        methods:{
            submitBtn(){
                if(this.isLogin()){
                    this.$router.push({path: '/ylApply',query: {id: this.data.id}});
                }else{
                    // app环境
                    if(!this.isWX){
                        this.$router.push({path: '/loginPage',query:{pathName:'/ylApply?id='+this.data.id}});
                    }else{// 微信环境
                        this.$router.push({path: '/login',query:{pathName:'/ylApply?id='+this.data.id}});
                    }
                }
            },
            getData(){
                this.showLoading = true;
                this.$http.get(BASE_URL + 'app/v1/yinLai').then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.data = res.body.data;
                        // this.data.updateTime = new Date(this.data.updateTime).getFullYear() + "-" + (new Date(this.data.updateTime).getMonth()+1) + "-" + new Date(this.data.updateTime).getDate();
                        this.showLoading = false;
                    }
                });
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("基金会介绍");
        },
        created: function(){
            this.getData();
        },
        components: {}
    }
</script>
<style scoped>
    .title{
        font-size: 18px;
        margin-top: 20px;
        text-align: center;
    }
    .time{
        font-size: 12px;
        margin: 10px 0;
        text-align: center;
    }
    .imgSty{
        display: block;
        width: 100%;
        margin: 20px 0;
    }
    .text{
        padding: 0 17px;
        font-size: 15px;
        line-height: 23px;
        margin-bottom: 60px;
    }
    .viewDetailBtn{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        text-align: center;
        z-index: 99999;
    }
    .btn{
        display: block;
        float: left;
        height: 50px;
        border: none;
        outline: none;
    }
    .onlineService{
        width: 28%;
        background-color: #fff;
    }
    .viewDetail{
        width: 72%;
        background-color: #ed8521;
        color: #fff;
        font-size: 17px;
    }
    .leftIcon{
        height: 100%;
        padding: 0 0.24rem;
        line-height: 50px;
    }
    .kefu{
        margin-top: 10px;
        margin-bottom: 2px;
        font-size: 0.2933rem;
        text-align: left;
    }
    .shijian{
        font-size: 0.2667rem;
        text-align: left;
    }
    .icon{
        font-size: 0.4267rem;
    }
</style>