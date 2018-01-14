<template>
<section id="carParticulars">
   <carItem :infoObj="carData" :financeId="financeId" :downPayment="downPay" :mouthPayment="monthPay"></carItem>
        <ul class="processItem">
            <li v-for="(item,index) in processItemes" :class="[item.processJude ? processActive : processCommon]" :key="index">
                <img :src="item.itemPic">
                <template v-if="item.hasTxt">
                    <span class="itemName">{{ item.itemName }}<span tag="span" @click="checkProcess(index)" class="tips" v-show="item.showTips">{{ item.tip }}</span></span>
                </template>
                <template v-else>
                     <span class="itemName">{{ item.itemName }}</span>
                </template>
            </li>
        </ul>
        <footer class="partFooterRefund">
            <a class="tel" href="tel:400-098-2118" v-on:click="takePhone()">
                <span class="kefuLogo"><img src="static/img/kefu.png"></span>
                <span class="text">在线客服</span>
            </a>
        </footer>
</section>
</template>
<script>
import carItem from './carItem.vue'
import payType from './payType.vue'
export default{
    data(){
        return{
            processCommon: 'processCommon',
            processActive: 'processActive',
            processItemes:[
                // {itemPic: 'static/img/nosucIcon.png',itemName: '定金支付成功',processTimer: '2015-09-06 12：00',hasTime: true,processJude:false},
                // {itemPic: 'static/img/nosucIcon.png',itemName: '填写认证信息',processTimer: '2015-09-06 12：00',tip: '查看进度',hasTime: true,hasTxt:true,processJude:false,showTips:false,toPath:"/submitSuccess"},
                // {itemPic: 'static/img/nosucIcon.png',itemName: '签署条约',hasTxt:true,tip: '查看条约',processJude:false,showTips:false,toPath:"/seeContracts"},
                {itemPic: 'static/img/nosucIcon.png',itemName: '定金支付成功',processJude:false},
                {itemPic: 'static/img/nosucIcon.png',itemName: '申请退款',processJude:false},
                {itemPic: 'static/img/nosucIcon.png',itemName: '处理中',processJude:false},
                {itemPic: 'static/img/nosucIcon.png',itemName: '退款成功',processJude:false}
            ],
            state:null,              //订单状态
            carData:'',              //车辆信息
            financeId: '',             //订单期数
             downPay: '',        //首供
            monthPay: ''        //月供
        }
    },
    methods:{
        getProcess(num){
            for (var i = 0; i < num; i++) {
                this.processItemes[i].itemPic = "static/img/sucIcon.png";
            }
            for (var i = 0; i < num-1; i++) {
                this.processItemes[i].processJude = true;
            }
        },
        catchState:function(){
              this.catchCarInfo();

             var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/getOrderByOrderId?orderId='+this.$route.query.orderId, { headers: { access_token: token } }).then((res) =>{
                this.state = res.body.data.carOrder.state;
                this.financeId  = res.body.data.finance.stages;
                 this.downPay = res.body.data.finance.downpayment;
                this.monthPay = res.body.data.finance.mouthpayment;
                if ((this.state == 9)) {
                    this.getProcess(2);
                }else if ((this.state == 8)) {
                    this.getProcess(3)
                }else if ((this.state == 7)) {
                    this.getProcess(4)
                }else if ((this.state == 10)) {
                    this.processItemes[3].itemName = "退款失败";
                    this.getProcess(4)
                }
            })
        },
          catchCarInfo(){
             var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/car/'+this.$route.query.carId, { headers: { access_token: token } }).then((res) =>{
                //根据carId获取车辆信息
                this.carData = res.body.data.carItem;
            })
        }
    },
    components:{
        carItem,
        payType
    },
    beforeCreate(){
        this.setDocumentTitle("订单详情");
    },
    created(){
        this.catchState();
        
        

    }
}
</script>
<style src="../common.css"></style>
<style>
#carParticulars{padding-bottom: 1.4rem}
#carParticulars .processItem{
    /*width: 100%;*/
   padding: 0 0.6667rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
}
.processItem>li{
    position: relative;
    padding-left: 0.8rem;
    padding-bottom: 0.4rem;
    /*line-height: 10px;*/
}
.processItem>.processCommon:not(:last-child):before{
    content: "";
    width: 1px;
    height: 100%;
    background: #eee;
    left: 11px;
    top: 11px;
    position: absolute;
}
.processItem>.processActive:before{
    content: "";
    width: 1px;
    height: 100%;
    background: #ff9c03;
    left: 11px;
    top: 11px;
    position: absolute;
}
.processItem>li>img{
    width: 12px;
    height: 12px;
    position: absolute;
     left: 0;
    top: 0;
    transform: translate(50%,50%);
    -webkit-transform: translate(50%,50%);
}

.processItem>li>span{
    display: block;
}
.processItem .itemName{
    font-size: 0.45334rem;
    color: #333333;
}
.processItem .processTimer{
    font-size: 0.2667rem;
    color: #999999;
}
.processItem .tips{
    margin-left: 0.6667rem;
    color: #999999;
    /*display: none;*/
}
#carParticulars .partFooterRefund{
    width: 100%;
    height: 1.28rem;
    position: fixed;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    background: white;
    border-top:1px solid #ccc;
}
#carParticulars .partFooterRefund .tel{
    width: 100%;
    text-align: center;
     font-size: 0.32rem;
     display: block;
     overflow: auto;
}
#carParticulars .partFooterRefund .tel>span.text{
    width: 100%;
    text-align: center;
    display: block;
    float: left;
    margin-top: 0.0667rem;
   
}
#carParticulars .partFooterRefund .tel>span.kefuLogo{
    width: 0.32rem;
    height: auto;
    text-align: center;
    display: inline-block;
   
}
#carParticulars .partFooterRefund .tel>span>img{
    width: 0.32rem;
    margin-top: 0.17rem;
}

</style>