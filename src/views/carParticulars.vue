<template>
    <section id="carParticulars">
        <carItem :infoObj="carData" :financeId="stages" :downPayment="downPay" :mouthPayment="monthPay"></carItem>
        <ul class="processItem">
            <li v-for="(item,index) in processItemes" :class="[item.processJude ? processActive : processCommon]" :key="index">
                <img :src="item.itemPic">
                <template v-if="item.hasTxt">
                    <span class="itemName">{{ item.itemName }}
                        <span tag="span" @click="checkProcess(index)" class="tips" v-show="item.showTips">{{ item.tip }}</span>
                    </span>
                </template>
                <template v-else>
                    <span class="itemName">{{ item.itemName }}</span>
                </template>
                <!--  <template v-if="item.hasTime">
                             <span class="processTimer">{{ item.processTimer }}</span>
                        </template> -->
            </li>
        </ul>
        <footer class="partFooter" v-show="showHide">
            <a class="tel" href="tel:400-098-2118" v-on:click="takePhone()">
                <img src="static/img/kefu.png">
                <span>在线客服</span>
            </a>
             <div class="applyPart" @click="clickThing" :class="hideProcess?btnActive:''" v-show="hidePart">
                <a href="javascript:void(0);">{{ text1 }}</a>
            </div> 
            <div class="applyProcess" @click="selectPath" v-show="hideProcess">
                <a href="javascript:void(0);">{{ text2 }}</a>
            </div>
        </footer>
        <payType v-show="appShow" v-on:oneType="zfbType" v-on:twoType="wxType" v-on:hidePayType="hidePayType"></payType>
        <Tips v-show="tipShow" :tip="tip" v-on:closeTips="backThing"></Tips>
        <loadOrder v-show="loading"></loadOrder>
    </section>
</template>
<script>
import carItem from './carItem.vue'
import payType from './payType.vue'
import loadOrder from './loadOrder.vue'
export default {
    data() {
        return {
            processCommon: 'processCommon',
            processActive: 'processActive',
            processItemes: [
                { itemPic: 'static/img/nosucIcon.png', itemName: '定金支付成功', processTimer: '2015-09-06 12：00', hasTime: true, processJude: false },
                { itemPic: 'static/img/nosucIcon.png', itemName: '填写认证信息', processTimer: '2015-09-06 12：00', tip: '查看进度', hasTime: true, hasTxt: true, processJude: false, showTips: false, toPath: "/submitSuccess" },
                { itemPic: 'static/img/nosucIcon.png', itemName: '签署条约', hasTxt: true, tip: '查看条约', processJude: false, showTips: false, toPath: "/seeContracts" },
                { itemPic: 'static/img/nosucIcon.png', itemName: '等待发货', processJude: false },
                { itemPic: 'static/img/nosucIcon.png', itemName: '车辆发货', processJude: false },
                { itemPic: 'static/img/nosucIcon.png', itemName: '支付首付款、线下取车', processJude: false },
                { itemPic: 'static/img/nosucIcon.png', itemName: '每月月供', processJude: false },
                { itemPic: 'static/img/nosucIcon.png', itemName: '完成订单', processJude: false }
            ],
            state: null,              //订单状态
            carData: '',              //车辆信息
            text1: '',                //按钮一的文字信息
            text2: '',                //按钮二的文字信息
            showHide: true,           //底部的显示情况
            hideProcess: true,        //按钮的显示情况
            btnActive: "btnActive",  //按钮不同情况下的状态
            appShow: false,           //app支付弹框
            tipShow: false,           //不同状态下提示框
            tip: '',                  //不同状态下的提示信息文字
            userInfoStatus: '',       //用户信息的审核状态
            financeId: '',            //订单期数
            stages:'',
            loading: true,
            downPay: '',        //首供
            monthPay: '' ,       //月供
            hidePart:false
        }
    },
    methods: {
        getProcess(num) {
            for (var i = 0; i < num; i++) {
                this.processItemes[i].itemPic = "static/img/sucIcon.png";
            }
            for (var i = 0; i < num - 1; i++) {
                this.processItemes[i].processJude = true;
            }
        },
        catchState: function () {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/order/getOrderByOrderId?orderId=' + this.$route.query.orderId, { headers: { access_token: token } }).then((res) => {
                this.state = res.body.data.carOrder.state;
                this.stages = res.body.data.finance.stages;
                this.financeId = res.body.data.carOrder.financeId;
                this.downPay = res.body.data.finance.downpayment;
                this.monthPay = res.body.data.finance.mouthpayment;
                if ((this.state == 0)) {
                    this.getProcess(1);
                } else if ((this.state == 1)) {
                    this.getProcess(2)
                } else if ((this.state == 2)) {
                    this.getProcess(3)
                } else if ((this.state == 3)) {
                    this.getProcess(5)
                } else if ((this.state == 4 || this.state == -1 || this.state == 5)) {
                    this.getProcess(7)
                } else if ((this.state == 6)) {
                    this.getProcess(8);
                    this.showHide = false;
                    this.loading = false;
                }

                this.initUserInfo();

            })
        },
        catchCarInfo() {
            var userStatus = this.userInfoStatus;
            var state = this.state;
            if (state == 0 && userStatus == 0) {
                // this.text1 = "申请退还定金";
                this.text2 = "填写认证信息";

            } else if (state == 0 && userStatus !== 2) {
                // this.text1 = "申请退还定金";
                this.text2 = "前往签约";
                this.processItemes[1].showTips = true;
            } else if (state == 1) {
                // this.text1 = "申请退还定金";
                this.text2 = "前往签约";
                this.processItemes[1].showTips = true;
            } else if (state == 2 || state == 3) {
                this.processItemes[1].showTips = false;
                this.processItemes[2].showTips = true;
                this.text1 = "支付首付款";
                this.hideProcess = false;
                this.hidePart = true;
            } else if (state == 4 || state == -1 || state == 5) {
                this.text1 = "支付月供";
                this.hideProcess = false;
                this.hidePart = true;
            } else if (state == 6) {
                this.showHide = false;

            }
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/car/' + this.$route.query.carId, { headers: { access_token: token } }).then((res) => {
                //根据carId获取车辆信息

                this.carData = res.body.data.carItem;
                this.loading = false;
                // console.log(this.carData)
            })
        },
        clickThing: function () {
            var state = this.state;
            var orderId = this.$route.query.orderId;
            var stages = this.stages;
            var firstPay = this.downPay;
            var carId = this.$route.query.carId;
            if (state < 2 && state !== -1) {
                this.$router.push({ path: "/fillRefundInfo", query: { orderId: orderId, financeId: stages, carId: carId } })
            } else if (state == 2) {
                this.tipShow = true;
                this.tip = "订单未发货暂时无法支付";
            } else if (state > 2 && state < 4) {
                if (this.isWX) {
                    var openId = '';
                    if (localStorage.getItem('userInfo') && localStorage.getItem('userInfo') != undefined) {
                        openId = JSON.parse(localStorage.getItem('userInfo')).openid;
                    }

                    var payData = {
                        // payInfo参数
                        outTradeNo: orderId,
                        carId: carId,
                        body: '支付首付款',
                        totalFee: parseFloat(firstPay) * 100,
                        openid: openId,
                        type: 1,// 支付款项的类型 0定金 1 首付款 2 尾款 3提前还款
                        path: location.href,
                        financeId:this.financeId
                    }

                    localStorage.setItem('payData', JSON.stringify(payData));
                    location.href = location.origin + location.pathname +'pay.html?v=201707221919';
                } else {
                    this.appShow = true;
                }

            } else if (state == 4 || state == -1 || state == 5) {
                this.$router.push({ path: "/carRefund" })
            } else if (state == 7) {
                this.showhide = false;
            }
        },
        selectPath: function () {
            var state = this.state;
            var orderId = this.$route.query.orderId;
            var carId = this.$route.query.carId;
            var userStatus = this.userInfoStatus;
            if (state == 0 && userStatus == 0) {
                this.$router.push({ path: "/IDinfo" })
            } else if (state == 0 && userStatus == 1) {
                this.tipShow = true;
                this.tip = "认证审核中，无法签约";
            } else if (state == 0 && userStatus == 3) {
                this.tipShow = true;
                this.tip = "认证审核失败，请重新认证";
            }
            else if (state == 0 && userStatus == 4) {
                this.tipShow = true;
                this.tip = "用户已被拉入黑名单";
            }
            else if (state == 1) {
                this.$router.push({ path: "/sign", query: { carId: carId, orderId: orderId ,showPrice:this.stages} });
            }
        },
        zfbType: function () {
            var token = localStorage.getItem('token');
            var money = this.downPay.toFixed(2);
            var title = this.carData.brandTopName;
            var orderId = this.$route.query.orderId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/zfb/pay",
                headers: { access_token: token },
                params: {
                    subject: '车丫头',
                    total_fee: money,
                    body: "支付首付款",
                    earlyPayApplyId:0,
                    type:1,
                    financeId:this.financeId,
                    out_trade_no: orderId,
                    return_url: location.href.split('?')[0]
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
                        var orderId = self.$route.query.orderId;
                        var money = self.carData.downPayment;
                        var token = localStorage.getItem('token');
                        self.$http({
                            url: BASE_URL+'app/v1/order/insertPaymentRecord?orderId=' + orderId + '&type=1&payChannel=2&payType=1&receiptNumber=' + receiptNumber + '&money=' + money + '',
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                                self.catchState();
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
            var money = parseFloat(this.downPay) * 100;
            var orderId = this.$route.query.orderId;
            var financeId = this.financeId;
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/wechatapp/pay",
                params: {
                    // outTradeNo: orderId,
                    body: "支付首付款",
                    // totalFee: money,
                    type:1,
                    financeId:financeId,
                    earlyPayApplyId:0
                },
                headers:{access_token:token}
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
                        var orderId = self.$route.query.orderId;
                        var token = localStorage.getItem('token');
                        var money = self.carData.downPayment;
                        self.$http({
                            url: BASE_URL+'app/v1/order/insertPaymentRecord?orderId=' + orderId + '&type=1&payChannel=3&payType=1&receiptNumber=' + receiptNumber + '&money=' + money + '',
                            headers: {
                                access_token: token
                            }
                        }).then((res) => {
                            if (res.body.success) {
                                self.catchState();
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
        backThing: function () {
            this.tipShow = false;
            this.tip = '';
        },
        initUserInfo: function () {
            var token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/user/auditResult",
                params: {
                    username: username
                },
                headers: {
                    access_token: token
                }
            }).then((res) => {
                this.userInfoStatus = res.body.data.status;
                this.catchCarInfo();
            })
        },
        checkProcess: function (index) {
            var state = this.state;
            var userStatus = this.userInfoStatus;
            if (state == 1) {
                this.tipShow = true;
                this.tip = "用户审核信息通过";
            } else {
                var orderId = this.$route.query.orderId;
                var carId = this.$route.query.carId;
                var path = this.processItemes[index].toPath;
                // alert(path);
                this.$router.push({ path: path, query: { carId: carId, orderId: orderId } })
            }
        },
        hidePayType: function () {
            this.appShow = false;
        }
    },
    components: {
        carItem,
        payType,
        loadOrder
    },
    beforeCreate() {
        this.setDocumentTitle("订单详情");
    },
    created() {
        this.catchState();



    }
}
</script>
<style src="../common.css"></style>
<style>
#carParticulars {
    padding-bottom: 1.4rem
}

#carParticulars .processItem {
    /*width: 100%;*/
    padding: 0 0.6667rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
}

.processItem>li {
    position: relative;
    padding-left: 0.8rem;
    padding-bottom: 0.4rem;
    /*line-height: 10px;*/
}

.processItem>.processCommon:not(:last-child):before {
    content: "";
    width: 1px;
    height: 100%;
    background: #eee;
    left: 11px;
    top: 11px;
    position: absolute;
}

.processItem>.processActive:before {
    content: "";
    width: 1px;
    height: 100%;
    background: #ff9c03;
    left: 11px;
    top: 11px;
    position: absolute;
}

.processItem>li>img {
    width:12px;
    height: 12px;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(50%,50%);
    -webkit-transform: translate(50%,50%);
}

.processItem>li>span {
    display: block;
}

.processItem .itemName {
    font-size: 0.45334rem;
    color: #333333;
}

.processItem .processTimer {
    font-size: 0.2667rem;
    color: #999999;
}

.processItem .tips {
    margin-left: 0.6667rem;
    color: #999999;
    /*display: none;*/
}

#carParticulars .partFooter {
    width: 100%;
    height: 1.28rem;
    position: fixed;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    background: white;
    border-top: 1px solid #ccc;
}

#carParticulars .partFooter .tel {
    width: 2rem;
    flex: none;
    -webkit-flex: none;
    text-align: center;
    font-size: 0.32rem;
    display: block;
    overflow: auto;
}

#carParticulars .partFooter .tel>span {
    width: 100%;
    text-align: center;
    display: block;
    float: left;
    margin-top: 0.0667rem;
}

#carParticulars .partFooter .tel>img {
    width: 0.426rem;
    float: left;
    margin-left: 0.733rem;
    margin-top: 0.17rem;
}



/*#carParticulars .partFooter .tel>span:nth-of-type(2){
    float: left;
}*/

#carParticulars .partFooter .applyPart {
    height: 100%;
    flex: 1;
    -webkit-flex: 1;
}

#carParticulars .partFooter .applyProcess {
    height: 100%;
    flex: 1;
    -webkit-flex: 1;
}

#carParticulars .partFooter .applyProcess a {
    width: 100%;
    line-height: 1.28rem;
    background: #ed852e;
    color: white;
    font-size: 0.4rem;
    border: none;
    display: block;
    text-align: center;
}

#carParticulars .partFooter .applyPart a {
    width: 100%;
    line-height: 1.28rem;
    background: #ed852e;
    color: white;
    font-size: 0.4rem;
    border: none;
    display: block;
    text-align: center;
}

#carParticulars .partFooter .btnActive a {
    background: #ccc
}
</style>