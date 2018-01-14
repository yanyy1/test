<template>
    <section id="carRefund">
        <section id="meRefunds" v-if="hasInfo">
            <h5>暂无需要还款的车辆</h5>
            <span class="logo">
                <img src="static/img/clxg.png" />
            </span>
            <span class="title">车辆选购</span>
            <div class="explain">前往商城挑选心仪的车辆，享受最优的服务</div>
        </section>
        <section v-else id="hasFunds">
            <carItem :infoObj="carInfo" :financeId="stages" :downPayment="downPay" :mouthPayment="monthPay"></carItem>
            <div class="refundRate">
                <div class="hasRepay">
                    <canvas id="mycanvas1" width="100px" height="100px"></canvas>
                    <span>已还款</span>
                    <router-link class="find" tag="span" :to="/repayHistory/+orderId">还款记录
                        <i class="iconfont icon-gengduo"></i>
                    </router-link>
                </div>
                <div class="noRepay">
                    <canvas id="mycanvas2" width="100px" height="100px"></canvas>
                    <span>未还款</span>
                    <router-link class="find" tag="span" :to="'/remainPayment/'+orderId">
                        查看剩余月供
                        <i class="iconfont icon-gengduo"></i>
                    </router-link>
                </div>
            </div>
            <span class="pcDetails">逾期赔偿
                <span>天数
                    <span>{{overDays}}天</span>
                </span>
                <span>违约金
                    <span>{{forfeitMoney}}元</span>
                </span>
            </span>
            <span class="pcRegular" @click="checkContract">查看逾期赔偿条令
                <i class="iconfont icon-gengduo"></i>
            </span>
            <button class="oneBtn" @click="oneKeyPay">一键还款</button>
            <payType v-show="appShow" v-on:oneType="zfbType" v-on:twoType="wxType" v-on:hidePayType="hidePayType"></payType>
            <YQTK v-show="yqtkShow" :tip="yqtkTip" v-on:closeTips="closeYqtk"></YQTK>
            <Tips v-show="tipShow" :tip="tip" v-on:closeTips="closeTips"></Tips>
        </section>
        <bottomNav v-bind:todo="active"></bottomNav>
        <loadOrder v-show="loading"></loadOrder>
    </section>
</template>
<script>
import carItem from './carItem.vue'
import loadCanvas from '../../static/js/canvas.js'
import payType from './payType.vue'
import bottomNav from "../components/bottomNav.vue"
import loadOrder from './loadOrder.vue'
export default {
    data() {
        return {
            hasInfo: true,
            phoneNumber: null,    //电话号码
            carId: '',            //车辆id
            orderId: '',          //订单id
            carInfo: [],          //车辆信息列表
            forfeitMoney: '',     //违约金
            overDays: '',         //延期的时间  
            payNumber: null,      //已经还款的金额
            total: null,          //总金额
            oneKeyNumber: '',      //一键还款的金额
            appShow: false,
            tipShow: false,
            tip: '',
            stages: '',
            financeId:'',
            active: {
                path: this.$route.path,
                name: this.$route.name,
            },
            advanceStatus: '',
            loading: true,
            yqtkShow: false,
            yqtkTip: '',
            payMentId: '',
            tailMoney:0,
            totalFee:0,
            downPay: '',        //首供
            monthPay: ''        //月供

        }
    },
    methods: {
        initCanvas: function (pay, total) {
            if (pay == 0) {
                loadCanvas('mycanvas1', 0)
                loadCanvas('mycanvas2', 1)
            } else {
                var payPercent = parseFloat((pay / total).toFixed(2));
                var unpayPercent = parseFloat((1-payPercent).toFixed(2));
                // console.log(payPercent,unpayPercent);
                loadCanvas('mycanvas1', payPercent)
                loadCanvas('mycanvas2', unpayPercent)
            }

        },
        initOrder: function () {
            var token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            if (username) {
                this.$http.get(BASE_URL+'app/v1/order/getOrderByPhoneNumber?phoneNumber=' + username, { headers: { access_token: token } }).then((res) => {
                    //根据电话号码获取订单信息
                    //console.log(res);
                    for (var i = 0; i < res.body.data.length; i++) {
                        
                        if (res.body.data[i].state == 4 || res.body.data[i].state == -1 || res.body.data[i].state == 5) {
                            console.log(i);
                            this.hasInfo = false;
                            this.carId = res.body.data[i].carId;
                            this.orderId = res.body.data[i].orderId;
                            this.initCarInfo(this.carId);
                            this.payMent(this.orderId);
                            break;

                        }else{
                            this.hasInfo = true;
                        }
                    }
                    console.log(this.carId);
                }).then(() => {
                    this.$http.get(BASE_URL+'app/v1/order/earlyPaymentRequestStatusByOrderId?orderId=' + this.orderId, { headers: { access_token: token } }).then((res) => {
                        //获取订单是否处于提前还款的状态
                        if (res.body.success) {
                            this.advanceStatus = res.body.data.status;
                        }
                        this.loading = false;
                    })
                })

            }
        },
        initCarInfo: function (id) {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/car/' + id, { headers: { access_token: token } }).then((res) => {
                //根据carId获取车辆信息
                this.carInfo = res.body.data.carItem;
                this.initStages();
            })
        },
        payMent: function (id) {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/getOrderPayPlanCount?orderId=' + id, { headers: { access_token: token } }).then((res) => {
                //根据carId获取车辆信息
                // console.log(res.body.data.payNumber)
                this.overDays = res.body.data.overDays;
                this.forfeitMoney = res.body.data.forfeitMoney;
                this.payNumber = res.body.data.payNumber;
                this.total = res.body.data.total;
                // console.log(  this.payNumber,this.total);
            }).then(() => {
                this.initCanvas(this.payNumber, this.total);

            })
        },
        oneKeyPay: function () {

            var token = localStorage.getItem('token');
            var id = this.orderId;
            var totalFee = 0, paymentIdes = [];
            var carId = this.carId;
            var openId = '';
            this.$http.get(BASE_URL+'app/v1/order/getShouldMonthPaymentList?orderId=' + id, { headers: { access_token: token } }).then((res) => {
                var data = res.body.data;
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    paymentIdes.push(data[i].appCarPaymentPlan.id);
                    
                    if(data[i].appCarPaymentPlan.sequence == this.stages){
                        this.tailMoney = data[i].tailMoney;
                        totalFee += parseFloat(data[i].totalMoney * 100)+parseFloat(data[i].tailMoney*100);
                    }else{
                        totalFee += parseFloat(data[i].totalMoney * 100);
                    }
                }
                this.totalFee = totalFee/100;
                this.payMentId = paymentIdes;
            }).then(() => {
                if (this.isWX) {
                    if (localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != undefined) {
                        openId = JSON.parse(localStorage.getItem('userInfo')).openid;
                    }
                    if (paymentIdes.length == 0) {
                        this.tipShow = true;
                        this.tip = '未到还款期限';
                    } else {
                        var payData = {
                            // payInfo参数
                            outTradeNo: id,
                            body: '支付月供',
                            totalFee: totalFee,
                            openid: openId,
                            type: 4,// 支付款项的类型 0定金 1 首付款 2 尾款 3提前还款
                            carId: carId,
                            paymentIdes: paymentIdes,
                            financeId:this.financeId
                        }
                        localStorage.setItem('payData', JSON.stringify(payData));
                        location.href = location.origin + location.pathname + 'pay.html?v=201707281627';
                    }
                } else {
                     if (this.payMentId.length == 0) {
                        this.tipShow = true;
                        this.tip = '未到还款期限';
                    } else {
                    this.appShow = true;
                    }
                }


            })

        },
        initStages: function () {
            var token = localStorage.getItem('token');
            if (this.orderId) {
                this.$http({
                    url: BASE_URL+"app/v1/order/getOrderByOrderId?orderId=" + this.orderId,
                    headers: {
                        access_token: token
                    }
                }).then((res) => {
                    this.stages = res.body.data.finance.stages;
                    this.downPay = res.body.data.finance.downpayment;
                    this.monthPay = res.body.data.finance.mouthpayment;
                    this.financeId = res.body.data.carOrder.financeId;
                })
            }
        },
        zfbType: function () {
            
            var token = localStorage.getItem('token');
            var money = this.totalFee.toFixed(2);
            var title = this.carInfo.brandTopName;
            var orderId = this.orderId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/zfb/pay",
                headers: { access_token: token },
                params: {
                    subject: '车丫头',
                    total_fee: money,
                    body: "支付月供",
                    type:4,
                    financeId:this.financeId,
                    orderId:orderId,
                    out_trade_no: orderId,
                    return_url: location.href,
                    earlyPayApplyId:0
                }
            }).then((res) => {
                window.self = this;
                if (res.body.success) {
                    var receiptNumber = res.body.data.orderNo;
                    window.fail = function (data) {
                        self.appShow = false;
                        self.tipShow = true;
                        self.tip = data;
                    };
                    window.success = function () {
                        self.appShow = false;
                        var orderId = self.orderId;
                        var tailMoney = self.tailMoney;
                        var payMentId = self.payMentId;
                        var token = localStorage.getItem('token');
                        self.$http({
                            url: BASE_URL+'app/v1/order/monthPaymentRecord?orderId=' + orderId + '&payChannel=2&payType=1&receiptNumber=' + receiptNumber + '&tailMoney='+tailMoney+'&paymentIds='+payMentId,
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                                self.hasInfo =true;
                                self.initOrder();
                            }else{
                                self.tipShow = true;
                                self.tip = res.body.data.errorMessage;
                            }
                        })

                    };
                    this.getHostApp(function (hostApp) {
                        hostApp.callAlipay(res.body.data.responseBody, "fail", "success");
                    })
                }

            })
        },
        wxType: function () {
            var token = localStorage.getItem('token');
            var money = this.totalFee * 100;
            var orderId = this.orderId;
            var financeId = this.financeId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/wechatapp/pay",
                params: {
                    body: "支付月供",
                    type:4,
                    financeId:financeId,
                    earlyPayApplyId:0,
                    orderId:orderId
                },
                headers: {access_token: token}
            }).then((res) => {
                window.self = this;
                if (res.body.success) {
                    var receiptNumber = res.body.data.outTradeNo;
                    window.fail = function (data) {
                        self.appShow = false;
                        self.tipShow = true;
                        self.tip = data;
                    };
                    window.success = function () {
                        self.appShow = false;
                        var orderId = self.orderId;
                        var payMentId = self.payMentId;
                        var token = localStorage.getItem('token');
                        var tailMoney = self.tailMoney;
                        self.$http({
                            url: BASE_URL+'app/v1/order/monthPaymentRecord?orderId=' + orderId + '&payChannel=3&payType=1&receiptNumber=' + receiptNumber + '&tailMoney='+tailMoney+ '&paymentIds='+payMentId,
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                                self.hasInfo =true;
                                self.initOrder();
                            }else{
                                self.tipShow = true;
                                self.tip = res.body.data.errorMessage;
                            }
                        })

                    };
                    this.getHostApp(function (hostApp) {
                        hostApp.callWXpay(res.body.data, "fail", "success");
                    })
                }
            })
        },
        closeTips: function () {
            this.tipShow = false;
            this.tip = '';
        },
        closeYqtk: function () {
            this.yqtkShow = false;
            this.yqtkTip = '';
        },
        checkContract: function () {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/contracts', { headers: { access_token: token } }).then((res) => {
                if (res.body.success) {
                    this.yqtkTip = res.body.data.violatecontent;
                } else {
                    this.yqtkTip = res.body.data.errorMessage;
                }
            }).then(() => {
                this.yqtkShow = true;
            })
        },
        hidePayType: function () {
            this.appShow = false;
        }
    },
    components: {
        carItem,
        payType,
        bottomNav,
        loadOrder
    },
    created() {
        // this.initCanvas();
        this.initOrder();
    },
    beforeCreate: function () {
        this.setDocumentTitle("我要还款");
    }
}

</script>
<style>
#carRefund {
    overflow: auto;
    padding-bottom: 2rem;
}

#meRefunds {
    padding-bottom: 1.5rem;
}

#meRefunds>h5 {
    font-size: 0.4534rem;
    color: #333333;
    text-align: center;
    margin-top: 3.2rem;
    font-weight: initial;
}

#meRefunds .logo {
    width: 2.8534rem;
    height: 2.8534rem;
    display: block;
    margin: 0 auto;
    margin-top: 1.33rem;
}

#meRefunds .logo>img {
    width: 100%;
}

#meRefunds .title {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 0.4534rem;
    color: #333333;
    margin-top: 0.5334rem;
}

#meRefunds .explain {
    margin: 0 3.413rem;
    text-align: center;
    color: #999999;
    font-size: 0.4rem;
    margin-top: 0.5334rem;
}

#hasFunds {
    padding-bottom: 1.4rem;
}

#hasFunds .funds {
    width: 100%;
    height: auto;
    display: flex;
    /*margin-top: 0.6667rem;*/
    color: #333333;
}

#hasFunds .fundsPic {
    width: 5.413rem;
    height: auto;
    flex: none;
}

#hasFunds .fundsPic>span {
    display: block;
    width: 4.3867rem;
    height: auto;
    margin: 0 auto;
    margin-top: 0.5934rem;
}

#hasFunds .fundsPic>span>img {
    width: 100%;
}

#hasFunds .fundsInfo {
    width: auto;
    flex: 1;
}

#hasFunds .fundsInfo>h5 {
    font-size: 0.4534rem;
}

#hasFunds .carModel,
#hasFunds .nper {
    font-size: 0.32rem;
    /*margin-top: 0.2667rem;*/
}

#hasFunds .firstPayment,
#hasFunds .monthPayment {
    margin-right: 1.2534rem;
    color: #fe8255;
    font-size: 0.42rem;
    /*margin-top: 0.2667rem;*/
}

.firstPayment>span:last-child,
.monthPayment>span:last-child {
    float: right;
}






/*#hasFunds */

.refundRate {
    width: 100%;
    overflow: auto;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    /*padding-bottom: 0.853rem;*/
}

.refundRate>div {
    width: 49.5%;
    height: 100%;
    float: left;
    padding-top: 1.04rem;
    padding-bottom: 0.853rem;
}

.refundRate>div:not(:last-child) {
    border-right: 1px solid #eee;
}

.refundRate>div>canvas {
    display: block;
    margin: 0 auto;
}

.refundRate>div>span {
    /* display: inline-block; */
    width: 100%;
    text-align: center;
    float: left;
}

.refundRate>div>span:nth-of-type(1) {
    margin-top: 0.6667rem;
    color: #333333;
    font-size: 0.4rem;
}

.refundRate>div>.find {
    margin-top: 0.15rem;
    color: #999999;
    font-size: 0.32rem;
    cursor: pointer;
    position: relative;
}

.refundRate>div>.find>i {
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    margin-left: 2px;
}

#hasFunds .pcDetails,
#hasFunds .pcRegular {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 0.4rem;
    color: #333333;
    position: relative;
}

#hasFunds .pcRegular>i {
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    margin-left: 2px;
}

#hasFunds .pcDetails {
    float: left;
    margin-top: 0.4rem;
}

#hasFunds .pcDetails>span {
    margin-left: 0.4rem;
}

#hasFunds .pcDetails>span>span {
    color: #ed852e;
    margin-left: 0.2rem;
}

#hasFunds .pcRegular {
    margin-top: 0.24rem;
    color: #999999;
    float: left;
}

#hasFunds .oneBtn {
    width: 4rem;
    height: 1.1734rem;
    display: block;
    float: left;
    background: #ed852e;
    color: white;
    font-size: 0.4rem;
    border: none;
    border-radius: 10px;
    margin-top: 0.6rem;
    margin-left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    outline: none;
}
</style>