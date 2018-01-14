<template>
    <section id="remain">
        <div id="remainPayment">
            <span class="payTitle">剩余月供</span>
            <span class="payMoney">{{ money }}元</span>
            <div>
                <div>
                    <span>已还款期数:
                        <span class="allAmount">{{ lastPayAmount }}期</span>
                    </span>
                    <span>剩余还款期数:
                        <span class="remainAmount">{{ needPayAmount }}期</span>
                    </span>
                </div>
            </div>
        </div>
    
        <template v-if="judge">
            <div class="remainAdvance">
                <span>提前还款金额</span>
                <span>{{ advanceMoney }}</span>
            </div>
            <button class="refundBtn payBtn" @click="payAll">支付提前还款金额</button>
        </template>
        <template v-else>
            <button :class="[isValid ? btnActive : '', refundBtn]" :disabled="!isValid" @click="apply">{{ advanceText }}</button>
            <p class="attention">{{ attentionText }}</p>
        </template>
        <payType v-show="appShow" v-on:oneType="zfbType" v-on:twoType="wxType" v-on:hidePayType="hidePayType"></payType>
        <loadOrder v-show="loading"></loadOrder>
    </section>
</template>
<script >
import payType from './payType.vue'
import loadOrder from './loadOrder.vue'
export default {
    data() {
        return {
            judge: false,     //是否可以申请提前还款
            orderId: '',
            btnActive: "btnActive",
            refundBtn: "refundBtn",
            applyID: null,
            stages: '',          //总共期数
            money: 0,           //剩余还款的金额
            needPayAmount: '',     //剩余还款的期数
            lastPayAmount: '',     //已还款的期数
            advanceMoney: 0,       //提前还款的金额
            carId: '',
            isValid: false,     //判断是否可以申请提前还款
            attentionText: '注意:还款期数未达到6期，不能申请提前还款',       //注意信息
            addvanceStatus: null,         //提前还款的申请状态
            appShow: false,                  //app支付的弹框
            carInfo: '',                     //车辆信息
            advanceText: '申请提前还款',        //申请提前还款的text
            loading: true,
            financeId:''

        }
    },
    methods: {
        initStages: function () {
            this.orderId = this.$route.params.id;
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/getOrderByOrderId?orderId=' + this.orderId, { headers: { access_token: token } }).then((res) => {
                // console.log(res.body.data.finance);
                this.stages = res.body.data.finance.stages;
                this.carId = res.body.data.carOrder.carId;
                 this.financeId = res.body.data.carOrder.financeId;
            }).then(() => {
                // this.initUnPay();
                this.inithasApply();
                this.initAdvanceInfo();


            })
        },
        apply: function () {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/earlyPaymentRequest?orderId=' + this.orderId, { headers: { access_token: token } }).then((res) => {
                if (res.body.success) {
                    this.applyID = res.body.data;
                }
            }).then(() => {
                this.$http.get(BASE_URL+'app/v1/order/earlyPaymentRequestStatus?requestId=' + this.applyID, { headers: { access_token: token } }).then((res) => {
                    if (res.body.success) {
                        this.addvanceStatus = res.body.data.status;
                        if (this.addvanceStatus == 0) {
                            this.isValid = false;
                            this.advanceText = "审核中";
                        } else if (this.addvanceStatus == 1) {
                            this.judge = true;
                        } else if (this.addvanceStatus == 2 || this.addvanceStatus == 5) {
                            this.isValid = false;
                            this.advanceText = "审核失败或未处理";
                        }
                    }
                })
            })
        },
        payAll: function () {
            if (this.isWX) {
                var openId = '';
                var carId = this.carId;
                if (localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != undefined) {
                    openId = JSON.parse(localStorage.getItem('userInfo')).openid;
                }
                var orderId = this.$route.params.id;

                var payData = {
                    // payInfo参数
                    outTradeNo: orderId,
                    carId: carId,
                    body: '提前还款',
                    totalFee: this.advanceMoney * 100,
                    openid: openId,
                    type: 3,// 支付款项的类型 0定金 1 首付款 2 尾款 3提前还款
                    earlyPayApplyId: this.applyID,
                    path: location.href.split('#')[0] + "#/carRefund",
                    financeId: this.financeId
                }

                localStorage.setItem('payData', JSON.stringify(payData));
                location.href = location.origin + location.pathname + 'pay.html?v=20170728';
            } else {
                this.appShow = true;
            }

        },
        inithasApply: function () {
            var orderId = this.orderId;
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/getEarlyPaymentInfo?orderId=' + orderId, { headers: { access_token: token } }).then((res) => {
                if (res.body.success) {
                    this.isValid = res.body.data.valid;
                    this.money = res.body.data.monthPaymentTotal.toFixed(2);
                    this.needPayAmount = res.body.data.unPayNumber;
                    this.lastPayAmount = res.body.data.payedNumber;
                    if (this.lastPayAmount >= 6) {
                        this.attentionText = "注意:还款日期前十天无法提交申请";
                    }
                }


            })
        },
        initAdvanceInfo: function () {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/earlyPaymentRequestStatusByOrderId?orderId=' + this.orderId, { headers: { access_token: token } }).then((res) => {
                if (res.body.success) {
                    if (res.body.data.status !== undefined) {
                        this.applyID = res.body.data.id;
                        this.addvanceStatus = res.body.data.status;
                        this.advanceMoney = res.body.data.totalUnpay;
                        this.money = res.body.data.unPayMonthMoney.toFixed(2);
                        this.needPayAmount = parseInt(res.body.data.financeCount) - parseInt(res.body.data.payedCount);
                        this.lastPayAmount = res.body.data.payedCount;
                        console.log(this.addvanceStatus);
                        if (this.addvanceStatus == 1) {
                            this.judge = true;
                            this.isValid = true;
                        } else if (this.addvanceStatus == 0) {
                            this.advanceText = "审核中";
                            this.isValid = false;
                        } else if (this.addvanceStatus == 2 || this.addvanceStatus == 5) {
                            this.isValid = false;
                            this.advanceText = "审核失败或未处理";
                        }
                    }
                }
                this.loading = false;

            })
            this.$http.get(BASE_URL+'app/v1/car/' + this.carId, { headers: { access_token: token } }).then((res) => {
                this.carInfo = res.body.data.carItem;
            })
        },
        zfbType: function () {
            var token = localStorage.getItem('token');
            var money = this.advanceMoney.toFixed(2);
            var title = this.carInfo.brandTopName;
            var orderId = this.orderId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/zfb/pay",
                headers: { access_token: token },
                params: {
                    subject: '车丫头',
                    total_fee: money,
                    body: "提前还款",
                    type:3,
                    financeId:this.financeId,
                    earlyPayApplyId:this.applyID,
                    out_trade_no: orderId,
                    return_url: location.href
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
                        var money = self.advanceMoney.toFixed(2);
                        var token = localStorage.getItem('token');
                        self.$http({
                            url: BASE_URL+'app/v1/order/insertPaymentRecord?orderId=' + orderId + '&type=3&payChannel=2&payType=1&receiptNumber=' + receiptNumber + '&money=' + money + '&earlyPayApplyId='+self.applyID,
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                               self.$router.push({path:'/carRefund'});
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
            var money = this.advanceMoney * 100;
            var orderId = this.orderId;
            var financeId = this.financeId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/wechatapp/pay",
                params: {
                    // outTradeNo: orderId,
                    body: "提前还款",
                    // totalFee: money,
                    type:3,
                    financeId: financeId,
                    earlyPayApplyId:this.applyID

                }
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
                        var token = localStorage.getItem('token');
                        var money = self.advanceMoney;
                        self.$http({
                            url: BASE_URL+'app/v1/order/insertPaymentRecord?orderId=' + orderId + '&type=3&payChannel=3&payType=1&receiptNumber=' + receiptNumber + '&money=' + money + '&earlyPayApplyId='+self.applyID,
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                                self.$router.push({path:'/carRefund'});
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
        hidePayType: function () {
            this.appShow = false;
        }
    },
    components: {
        payType,
        loadOrder
    },
    beforeCreate: function () {
        this.setDocumentTitle("查看剩余月供");
    },
    created() {
        this.initStages();
    }
}
</script>

<style src="../common.css"></style>
<style>
#remain {
    margin: 0 0.3334rem;
}

#remainPayment {
    margin-top: 0.4rem;
    box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
}

#remainPayment>span {
    width: 100%;
    display: inline-block;
    text-align: center;
}

#remainPayment .payTitle {
    margin-top: 0.5334rem;
    color: #999999;
    font-size: 0.32rem;
}

#remainPayment .payMoney {
    margin-top: 0.4rem;
    margin-bottom: 0.6667rem;
    color: #333333;
    font-size: 0.64rem;
}

#remainPayment>div {
    color: #999999;
    font-size: 0.32rem;
    line-height: 1.28rem;
    border-top: 1px solid #ccc;
}

#remainPayment>div>div {
    margin: 0 1rem;
}

#remainPayment>div>div>span:nth-of-type(2) {
    float: right;
}

#remain .refundBtn {
    width: 100%;
    line-height: 1.28rem;
    color: white;
    font-size: 0.5334rem;
    border: none;
    margin-top: 0.4rem;
    border-radius: 10px;
    background: #d8d8d8;
}

#remain .btnActive {
    background: #ed841f;
}

#remain .btnError {
    background: #f4f4f4;
}

#remain .attention {
    text-align: center;
    color: #ed841f;
    font-size: 0.32rem;
    margin-top: 0.4rem;
}

#remain .remainAdvance {
    width: 100%;
    line-height: 1.3334rem;
    font-size: 0.4rem;
    margin-top: 0.4rem;
    box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
}

#remain .remainAdvance>span:nth-of-type(1) {
    margin-left: 0.5rem;
}

#remain .remainAdvance>span:nth-of-type(2) {
    float: right;
    color: #ed841f;
    margin-right: 0.5rem;
}

#remain .payBtn {
    background: #ed841f;
}
</style>