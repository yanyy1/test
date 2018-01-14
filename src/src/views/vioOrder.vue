<template>
    <div class="content">
        <div class="serv" @click="showDetail()">
            <p class="tit">{{data.carNumber}}车辆违章代办服务</p>
            <p class="num">共办理{{data.num}}条，扣{{data.degree}}分</p>
            <i class="icon iconfont icon-jiantou"></i>
        </div>
        <div class="chufa">
            <p class="mgb-10">
                <span>罚款总额</span>
                <span class="nums">¥ {{data.money}}</span>
            </p>
            <p>
                <span>代办服务费</span>
                <span class="nums">¥ {{data.serMon}}</span>
            </p>
        </div>
        <div class="botBox">
            <div class="blt">合计 ¥ {{parseInt(data.money) + parseInt(data.serMon)}}</div>
            <div class="brt" @click="payWays()">去支付</div>
        </div>
        <div class="mask" v-if="show">
            <div class="listBox">
                <div class="it" v-for="(item,index) in data.list">
                    <div class="itTop">
                        <p>
                            <span class="add">{{item.location}}</span>
                        </p>
                        <p class="time">{{item.time}}</p>
                        <p class="reason">{{item.reason}}</p>
                        <p class="chufa1">
                            <span>罚款{{item.count}}元</span>
                            <span class="degree">扣{{item.degree}}分</span>
                            <span>服务费{{item.cooperPoundage}}元</span>
                        </p>
                    </div>
                    
                </div>
            </div>
            <img class="closeDetail" src="static/img/closeDetail.png" @click="showDetail()">
        </div>

        <div v-if="payData.showPayWays">
            <div class="payMask" v-on:click="hidePayWays()"></div>
            <div class="payWaysBox">
                <div class="title thin-border-bottom">选择付款方式</div>
                <!-- <div v-for="(item,index) in blanks" class="thin-border-bottom blankPay" :key="index">
                    <span class="floatLeft">{{item.name}}</span>
                    <i class="icon iconfont icon-jiantou"></i>
                    <span class="floatRight mgr-10">{{item.cardNum}}</span>
                </div> -->
                <div class="thin-border-bottom aliPay" @click="aliPay()">
                    <img class="logoSty" src="static/img/alipay.png">
                    <span class="floatLeft payWaySty">支付宝</span>
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
                <div class="wxPay" @click="wxAppPay()">
                    <img class="logoSty" src="static/img/wxPay.png">
                    <span class="floatLeft payWaySty">微信</span>
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
                <!-- <div class="btnBox">
                    <button class="btnSty">添加付款方式</button>
                </div> -->
            </div>
        </div>
        <loading v-if="showLoading"></loading>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                data:{},
                show: false,
                payData:{
                    showPayWays: false
                },
                payParam: {},
                alertData: {
                    show: false,
                    msg: "",
                },
                showLoading: false,
            }
        },
        methods:{
            addPayInfo: function(type){
                // let url = "";
                // if(type=1){
                //     url = BASE_URL+"app/v1/illegal/alipay/notice";
                // }else{
                //     url = BASE_URL+"app/v1/illegal/wechatapp/notice";
                // }
                // this.showLoading = true
                // this.$http({
                //     method: 'POST',
                //     url: url,
                //     headers: {
                //         access_token: localStorage.getItem('token'),
                //     },
                // }).then((res)=>{
                //     this.showLoading = false;

                    this.$router.push({path: '/vioList',query:this.$route.query});
                // });
            },
            payWays(){
                if(this.isWX){
                    this.wxPay();
                }else{
                    this.payData.showPayWays = true;
                }
            },
            hidePayWays: function(){
                this.payData.showPayWays = false;
            },
            aliPay: function(){
                this.showLoading = true
                window.scope = this;
                this.$http({
                    method: 'POST',
                    url: BASE_URL+"app/v1/illegal/alipay/pay",
                    params: this.payParam.query,
                    body: this.payParam.body,
                    headers: {
                        access_token: localStorage.getItem('token'),
                    },
                }).then((res)=>{
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        window.success = function(id){
                            scope.payData.showPayWays = false;
                            scope.addPayInfo(1);
                        }
                        window.fail = function(str){
                            scope.payData.showPayWays = false;
                            scope.alertData.show = true;
                            scope.alertData.msg = str;
                        }
                        this.getHostApp(function(hostApp){
                            hostApp.callAlipay(res.body.data.responseBody,'fail','success');
                        });
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },
            wxAppPay: function(){

                this.showLoading = true
                window.scope = this;
                this.$http({
                    method: 'POST',
                    url: BASE_URL+"app/v1/illegal/wechatapp/pay",
                    params: this.payParam.query,
                    body: this.payParam.body,
                    headers: {
                        access_token: localStorage.getItem('token'),
                    },
                }).then((res)=>{
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        window.success = function(id){
                            scope.payData.showPayWays = false;
                            scope.addPayInfo(2);
                        }
                        window.fail = function(str){
                            scope.payData.showPayWays = false;
                            scope.alertData.show = true;
                            scope.alertData.msg = str;
                        }
                        this.getHostApp(function(hostApp){
                            hostApp.callWXpay(res.body.data,'fail','success');
                        });
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },
            wxPay(){
                var payData = this.payParam;
                payData.vio = true;
                payData.url = location.href;
                localStorage.setItem('payData',JSON.stringify(payData));
                location.href = location.origin + location.pathname + 'pay.html?v=' + new Date().getTime();
            },
            showDetail(){
                this.show = !this.show;
            }
        },
        beforeCreate(){
            this.setDocumentTitle("订单确认");
        },
        created(){
            this.data = JSON.parse(localStorage.getItem('orderDetail'));
            this.payParam = {
                query:{
                    carNumber: this.data.carNumber,
                    uniqueCode: this.data.uniqueCode,
                    openid: this.data.openid || ''
                },
                body:{
                    address: "",
                    carCode: this.data.info.CarCodeLen || '',
                    carDrive: this.data.info.CarDriveLen || '',
                    cardNo: this.data.info.JashiZhengHaoLen || this.data.info.OwnerCardLen || '',
                    cheliangZhengShu: this.data.info.CheliangZhengShuLen || '',
                    driverSecondUrl: this.data.info.MajorSecondViolation || '',
                    driverUrl: this.data.info.MajorViolation || '',
                    drivingSecondUrl: this.data.info.DrivingSecondLicense || '',
                    drivingUrl: this.data.info.DrivingLicense || '',
                    fileNumber: this.data.info.DanganBianHaoLen || '',
                    filePhone: this.data.info.FilePhoneLen || '',
                    name: this.data.info.CarOwnerLen || '',
                    phone: this.data.info.CarOwnerPhoneLen || '',
                    qrcode: this.data.info.TiaoXingMaLen || '',
                    verifyCode: this.data.info.VerifyCodeLen || '',
                    xingShiZhengHao: this.data.info.XingShiZhengHaoLen || '',
                }
            }
        }
    }
</script>
<style scoped>
.content{
    min-height: 100%;
    background-color: #F5F4F9;
    padding-top: 10px;
} 
.serv{
    padding: 20px 15px 20px 20px;
    background-color: #fff;
    position: relative;
    margin-bottom: 10px;
}
.tit{
    font-size: 16px;
}
.num{
    font-size: 12px;
    color: #999;
}
.icon-jiantou{
    position: absolute;
    font-size: 14px;
    float: right;
    color: #333;
    right: 15px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.chufa{
    padding: 17px 20px;
    background-color: #fff;
    font-size: 13px;
}
.nums{
    float: right;
    color: #EE4547;
}
.botBox{
    position: fixed;
    width: 100%;
    height: 50px;
    line-height: 50px;
    bottom: 0;
    background-color: #fff;
    font-size: 16px;
}
.blt{
    padding-left: 20px;
    float: left;
}
.brt{
    background-color: #F18B25;
    float: right;
    color: #fff;
    width: 26%;
    text-align: center;
}
.mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    padding: 30px 15px 100px 15px;
}
.listBox{
    width: 100%;
    height: 100%;
    overflow: auto;
}


.it{
        overflow: hidden;
        color: #fff;
        border-bottom: 1px solid #fff;
        padding-bottom: 14px;
        margin-bottom: 30px;
    }
    .itTop{
        padding-left: 15px;
        overflow: hidden;
        position: relative;
    }
    .itTop p{
        overflow: hidden;
    }
    .itTop .add{
        display: block;
        width: 7.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        float: left;
    }
    .itTop .time{
        font-size: 12px;
        margin: 5px 0;
    }
    .itTop .reason{
        font-size: 12px;
        margin-bottom: 10px;
    }
    .chufa1 {
        font-size: 14px;
    }
    .chufa1 span.degree{
        margin-right: 13px;
        margin-left: 13px;
    }
    .closeDetail{
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        margin-left: -20px;
    }

    .payMask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99998;
    }
    .payWaysBox{
        position: fixed;
        top: 50%;
        margin-top: -75px;
        right: 12px;
        left: 12px;
        background-color: #fff;
        z-index: 99999;
        border-radius: 5px;
        
    }
    .title{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
    }
    .blankPay,.aliPay,.wxPay{
        padding: 10px 20px;
        height: 50px;
        line-height: 30px;
        position: relative;
    }
    .logoSty{
        width: 30px;
        height: 30px;
        float: left;
        margin-right: 15px;
    }
    .icon-jiantou{
        float: right;
        font-size: 14px;
    }
    .btnBox{
        padding: 80px 30px 15px;
    }
    .carDetailInfo{
        width: 51%;
    }
    .ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .payWaySty{
        font-size: 14px;
    }
</style>