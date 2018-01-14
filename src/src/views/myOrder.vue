<template>
    <section id="myOrder">
        <ul>
            <li v-for="(item,index) in navList" :key="index" @click="navChange(index)"><span :class="item.tabClass">{{ item.name }}</span></li>
        </ul>
        <component :is='currentView' keep-alive></component>
    </section>
</template>
<script>
import orderGoing from './orderGoing.vue'
import orderRefund from './orderRefund.vue'
import orderComplete from './orderComplete.vue'
export default {
    data(){
        return{
            currentView: "orderGoing",
            navList:[
                {name: '进行中',tabClass: "tabActive",id: "orderGoing"},
                {name: '退款',tabClass: 'tabCommon',id: "orderRefund"},
                {name: '已完成',tabClass: 'tabCommon',id: "orderComplete"}
            ]
        }
    },
    components:{
        orderGoing,
        orderRefund,
        orderComplete
    },
    methods:{
        navChange(index){
            for (var i = 0; i < this.navList.length; i++) {
                this.navList[i].tabClass = "tabCommon";
            }
            this.navList[index].tabClass = "tabActive";
            this.currentView = this.navList[index].id;
        }
    },
     beforeCreate: function(){
        this.setDocumentTitle("我的订单");
    },
}
</script>
<style src="../common.css"></style>
<style>
    #myOrder{font-size: 0.4rem;}
    #myOrder>ul{
        padding: 0 0.78rem;
        display: -webkit-box;
        height: 44px;
        border-bottom:1px solid #dddddd;

    }
    #myOrder>ul>li{
        -webkit-box-flex:1;
        line-height: 44px;
        text-align: center;
    }
    #myOrder>ul>li>span{
        width: 1.6rem;
        line-height: 44px;
        display: inline-block;
        margin: 0 auto;
    }
    .tabActive{
         border-bottom:2px solid #ed852e;
    }
    .tabCommon{
         border-bottom:none;
    }
    #myOrder>.orderStatus{
        width: 100%;
        overflow: auto;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        margin-top: 2px;
    }
    #myOrder>.orderStatus>div{
        margin: 0 40px;
        line-height: 88px;
    }
    #myOrder>.orderStatus>div>i{
        float: right;
    }
</style>