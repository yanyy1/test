<template>
    <div>
        <div class="carDetail thin-border-bottom">
            <img class="detailImg" :src="detailData.url">
            <div class="floatLeft carDetailInfo">
                <p class="f17 mgb-8">{{detailData.brandTopName}}{{detailData.brandSecondName}}</p>
                <p class="f12 mgb-8 ellipsis">{{detailData.type}}</p>
                <p class="f12 color-999 mgb-8">厂商指导价：{{detailData.factoryPrice}}万</p>
                <p class="f12 color-fe8255">首付<span class="f15">{{detailData.downPayment}}</span>元 月供<span class="f15">{{detailData.mouthPayment}}</span>元</p>
            </div>
        </div>
        <div class="address thin-border-bottom">
            <router-link to="/fixAddress">
                <i class="icon iconfont icon-dizhi"></i>
                <div v-if="emptyAddress">
                    <div class="f15 addAddress">请添加收货地址</div>
                </div>
                <div v-if="!emptyAddress">
                    <div class="mgb-8">
                        <div class="f15">收货人：{{address.consignee}}</div>
                        <!-- <div class="f15">{{address.phone}}</div> -->
                    </div>
                    <div class="f15">收货地址：{{address.address}}</div>
                </div>
                <i class="icon iconfont icon-jiantou"></i>
            </router-link>
        </div>
        <div class=" terms thin-border-bottom">
            <div class="floatLeft">
                <div class="f15 mgb-10">金融方案</div>
                <p class="f12" style="color: #ff4256">首付含购置税 首年保险 上牌费</p>
            </div>
            <div class="floatRight">
                <label v-for="(item,index) in priceData" v-bind:for="'stages'+item.stages" :key="index">
                    <input type="radio" name="stages" class="radioSty" @change="selectStage()" v-bind:value="item.stages" v-bind:id="'stages'+item.stages"  v-model='showPrice'>
                    <i class="icon iconfont icon-radio"></i>
                    <span>{{item.stages}}期</span>
                </label>
            </div>  
        </div>
        <div v-for="(item,index) in priceData" v-if="showPrice==item.stages" :key="index">
            <div class="firstPay thin-border-bottom">
                <div class="floatLeft f15">首付款</div>
                <div class="floatRight f12"><span class="color-fe8255 f17">{{item.downpayment}}</span>元</div>
            </div>
            <div class="monPay thin-border-bottom">
                <div class="floatLeft f15">月供</div>
                <div class="floatRight f12"><span class="color-fe8255 f17">{{item.mouthpayment}}</span>元</div>
            </div>
        </div>
            
        <div class="inviteCode thin-border-bottom">
            <div class="floatLeft f15">邀请码</div>
            <div class="floatRight"><input class="inputSty f15" type="text" name="" placeholder="输入邀请码" v-model="inviteCode" @change="judgeCode(inviteCode)"></div>
        </div>
        <div class="remark">
            <div class="floatLeft f15">备注</div>
            <div class="floatRight"><input class="inputSty f15" type="text" name="" placeholder="请输入" v-model="remark"></div>
        </div>
        <!-- <div class="pack">
            <div class="f15 mgb-8">定金支付条约</div>
            <div class="color-999">中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国</div>
        </div> -->
        <div class="payBond thin-border-top">
            <div class="bond f15">支付定金：
                <span class="totalFee color-fe8255" v-for="(item,index) in priceData" v-if="showPrice==item.stages" :key="index">
                    {{item.foregift}}
                </span>
                <span class="f12">元</span>
            </div>
            <button class="bondBtn f15" v-on:click="payDeposit()">支付定金</button>
        </div>

        <div v-if="payData.showPayWays">
            <div class="mask" v-on:click="hidePayWays()"></div>
            <div class="payWaysBox">
                <div class="title thin-border-bottom">选择付款方式</div>
                <div v-for="(item,index) in blanks" class="thin-border-bottom blankPay" :key="index">
                    <span class="floatLeft">{{item.name}}</span>
                    <i class="icon iconfont icon-jiantou"></i>
                    <span class="floatRight mgr-10">{{item.cardNum}}</span>
                </div>
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

        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
        <loading v-if="showLoading"></loading>
        <confirmModal v-if="confirmData.show" v-bind:todo="confirmData"></confirmModal>
    </div>
</template>
<script scoped>
    import '../css/common.css'
    export default{
        data(){
            return {
                blanks: [],
                priceData: [],

                detailData: {},
                
                payData:{
                    showPayWays: false
                },
                address: {},
                emptyAddress: true,
                showPrice: "",
                inviteCode: "",
                remark: "",
                toastData:{
                    show: false,
                    text: ""
                },
                alertData: {
                    show: false,
                    msg: "",
                },
                showLoading: false,
                confirmData: {
                    show: false,
                    msg: "",
                },
                financeId: ""
            }
        },
        methods: {
            selectStage: function(){
                var scope = this;
                scope.priceData.forEach(function(e){
                    if(e.stages == scope.showPrice){
                        scope.financeId = e.id;
                    }
                });
            },
            judgeCode:function(val){
            	if(val!=""){
            		var paramStr = '?popularizedCode=' + encodeURIComponent(this.inviteCode);
            		this.$http.post(BASE_URL + 'app/v1/order/popularizedCode'+paramStr,{},{headers: {access_token: localStorage.getItem("token")}}).then(function(res){
	            		if(res.status==200){
							if(res.data.success==true){
								
							}else{
								this.$message.error(res.data.data.errorMessage);
							}
						}
            		})
            	}
            	
            	
            },
            hidePayWays: function(){
                this.payData.showPayWays = false;
            },
            // 添加支付信息记录
            addPayInfo: function(d,money,orderId,type,payChannel,payType){
                var paramStr = '?orderId=' + orderId + '&type='+type+'&payChannel='+payChannel+'&payType='+payType+'&receiptNumber='+d+'&money='+money;
                this.$http.get(BASE_URL+'app/v1/order/insertPaymentRecord'+paramStr,{headers: {access_token: localStorage.getItem("token")}}).then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.createOrder(res.body.data);
                    }else{
                        this.showLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },
            createOrder: function(d){
                var address = this.address.address;
                if(localStorage.getItem('address')!=undefined&&localStorage.getItem('newAddress')!=undefined&&localStorage.getItem('address') == localStorage.getItem('newAddress')){
                    address = "收货人："+this.address.name+",手机号码："+this.address.phone+",现居地址："+this.address.proCity.replace(/,/g,"")+",详细地址："+this.address.fullAddress;
                }
                var paraStr = '?carId='+this.$route.params.id+'&financeId='+this.financeId+'&forfeitId='+d+'&deliveryAddress='+address;
                if(this.inviteCode){
                	paraStr += '&popularizedCode='+encodeURIComponent(this.inviteCode);
                }
                if(this.remark){
                    paraStr += '&remark='+this.remark;
                }
                this.$http.get(BASE_URL + 'app/v1/order/createOrder'+paraStr,{headers: {access_token: localStorage.getItem("token")}}).then(function(res){
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        var orderId = res.body.data;
                        this.$router.push({path: '/paySuccess',query:{orderId: orderId,carId: this.$route.params.id,showPrice: this.showPrice}});
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },
            aliPay: function(){
                this.showLoading = true
                window.scope = this;
                var total_fee = parseFloat(document.querySelector('.totalFee').innerHTML.trim()).toFixed(2);
                var out_trade_no = scope.isLogin()+new Date().getTime();
                var param = "?type=0&financeId="+this.financeId+"&earlyPayApplyId=0&subject="+"车丫头"+"&body="+"定金"+"&total_fee="+total_fee+"&out_trade_no="+out_trade_no+"&return_url="+location.href;
                this.$http.post(BASE_URL+'app/v1/zfb/pay'+param,{},{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        window.success = function(id){
                            scope.payData.showPayWays = false;
                            scope.payData.showPayWays = false;
                            scope.addPayInfo(res.body.data.orderNo,total_fee,out_trade_no,0,2,1);
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
                        this.alertData.msg = "获取支付宝信息失败";
                    }
                });
            },
            wxAppPay: function(){
                this.showLoading = true;
                window.scope = this;
                var totalFee = document.querySelector('.totalFee').innerHTML.trim() * 100;
                var outTradeNo = scope.isLogin()+new Date().getTime();
                var param = "?type=0&body="+"定金"+"&financeId="+this.financeId+"&earlyPayApplyId=0";
                this.$http.post(BASE_URL+'app/v1/wechatapp/pay'+param,{},{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                        this.showLoading = false;
                        if(res&&res.body&&res.body.success){
                            window.success = function(id){
                                scope.payData.showPayWays = false;
                                scope.addPayInfo(res.body.data.outTradeNo,totalFee/100,outTradeNo,0,3,1);
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
                            this.alertData.msg = "获取微信信息失败";
                        }
                    }
                );
            },
            payDeposit: function(){
                if(this.address.address){// 判断地址
                    if(this.inviteCode){ // 填写推广码 验证
                        this.showLoading = true;
                        this.$http.post(BASE_URL+'app/v1/order/popularizedCode?popularizedCode='+encodeURIComponent(this.inviteCode),{},{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                            if(res&&res.body&&res.body.success){// 推广码 验证
                                var paraStr = "?phoneNumber=" + this.isLogin() + "&status=1"
                                this.$http.get(BASE_URL + 'app/v1/order/getOrderByPhoneNumberAndStatus'+paraStr,{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                                    this.showLoading = false;
                                    if(res&&res.body&&res.body.success){// 判断重复订单
                                        if(res.body.data.length>0){
                                            this.confirmData.show = true;
                                            this.confirmData.msg = "您有未完成的订单，是否去查看？";
                                            var data = res.body.data[0];
                                            this.confirmData.confirm = function(scope){
                                                scope.$router.push({path: '/carParticulars',query: {orderId: data.orderId,carId: data.carId,state: data.state}});
                                            }
                                        }else{
                                            if(this.isWX){
                                                this.wxPay();
                                            }else{
                                                this.payData.showPayWays = true;
                                            }
                                        }
                                    }else{
                                        this.alertData.show = true;
                                        this.alertData.msg = res.body.data.errorMessage;
                                    }
                                });
                            }else{
                                this.showLoading = false;
                                this.alertData.show = true;
                                this.alertData.msg = res.body.data.errorMessage;
                            }
                        });
                    }else{// 不填写推广码 不验证
                        this.showLoading = true;
                        var paraStr = "?phoneNumber=" + this.isLogin() + "&status=1"
                        this.$http.get(BASE_URL + 'app/v1/order/getOrderByPhoneNumberAndStatus'+paraStr,{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                            this.showLoading = false;
                            if(res&&res.body&&res.body.success){
                                if(res.body.data.length>0){
                                    this.confirmData.show = true;
                                    this.confirmData.msg = "您有未完成的订单，是否去查看？";
                                    var data = res.body.data[0];
                                    this.confirmData.confirm = function(scope){
                                        scope.$router.push({path: '/carParticulars',query: {orderId: data.orderId,carId: data.carId,state: data.state}});
                                    }
                                }else{
                                    if(this.isWX){
                                        this.wxPay();
                                    }else{
                                        this.payData.showPayWays = true;
                                    }
                                }
                            }else{
                                this.alertData.show = true;
                                this.alertData.msg = res.body.data.errorMessage;
                            }
                        });
                    }

                }else{
                    this.toastData.show = true;
                    this.toastData.text = "请选择地址"
                }
            },
            wxPay: function(){
                if(this.address.address){
                    var scope = this;
                    var openId = '';
                    if(localStorage.getItem('userInfo') && localStorage.getItem('userInfo')!= undefined){
                        openId = JSON.parse(localStorage.getItem('userInfo')).openid;
                    }
                    var orderId = scope.isLogin()+new Date().getTime();

                    var payData = {
                        // payInfo参数
                        outTradeNo: orderId,
                        body: '定金',
                        totalFee: document.querySelector('.totalFee').innerHTML.trim()*100,
                        openid: openId,
                        // createorder 参数
                        carId: this.$route.params.id,
                        financeId: this.financeId,
                        showPrice: this.showPrice,
                        inviteCode: encodeURIComponent(this.inviteCode),
                        remark: this.remark,
                        
                        type: 0,// 支付款项的类型 0定金 1 首付款 2 尾款 3提前还款
                    }

                    localStorage.setItem('payData',JSON.stringify(payData));
                    location.href = location.origin + location.pathname + 'pay.html?v=' + new Date().getTime();
                }else{
                    this.toastData.show = true;
                    this.toastData.text = "请选择地址"
                }
            },
            
        },
        beforeCreate: function(){
            this.setDocumentTitle("确认订单");
        },
        created: function(){
            this.showLoading = true;
            if(localStorage.getItem('address') && localStorage.getItem('address')!='undefined'){
                this.address = JSON.parse(localStorage.getItem('address'))
            }
            for(var key in this.address){
                this.emptyAddress = false;
            }

            this.$http.get(BASE_URL+'app/v1/applyForCar/'+this.$route.params.id).then(function(res){
                this.showLoading = false;
                if(res&&res.body&&res.body.success){
                    this.detailData = res.body.data.car;
                    this.priceData = res.body.data.financeList;
                    if(this.priceData.length == 1){
                        this.showPrice = this.priceData[0].stages;
                        this.financeId = this.priceData[0].id
                    }else if(this.priceData.length > 1){
                        var scope = this;
                        scope.showPrice = 36;
                        scope.priceData.forEach(function(e){
                            if(e.stages == 36){
                                scope.financeId = e.id;
                            }
                        });
                    }
                }
            });
        },
    }
</script>
<style scoped>
	.carDetail{
        padding: 15px 0;
        overflow: hidden;
    }
    .detailImg{
        display: block;
        width: 43%;
        float: left;
        margin-right: 15px;
    }
    .mgb-8{
        margin-bottom: 8px;
    }
    .mgb-5{
        margin-bottom: 5px;
    }
    .address{
        min-height: 75px;
        padding: 10px 45px;
        position: relative;
    }
    .addAddress{
        line-height: 55px;
    }
    .address .icon-dizhi{
        position: absolute;
        left: 20px;
        top: 30px;
    }
    .address .icon-jiantou{
        position: absolute;
        right: 19px;
        top: 30px;
    }
    .terms{
        padding: 10px 20px;
        overflow: hidden;
    }
    .tips{
        width: 190px;
    }
    .firstPay,.monPay,.inviteCode,.remark{
        height: 50px;
        line-height: 30px;
        padding: 10px 20px;
        font-size: 14px;
    }
    .inviteCode input,.remark input{
        text-align: right;
        outline: none;
        border: 0;
    }
    .remark{
        margin-bottom: 50px;
    }
    .payBond{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        text-align: center;
        z-index: 9999;
    }
    .bond{
        width: 60%;
        float: left;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        text-align: left;
        padding-left: 20px;
    }
    .bondBtn{
        width: 40%;
        float: left;
        background-color: #ed8521;
        border: 0;
        outline: none;
        height: 50px;
        color: #fff;
    }
    label{
        display: block;
        font-size: 14px;
    }
    label:first-child{
        margin-bottom: 16px;
        margin-top: 8px;
    }
    .radioSty{
        display: none;
    }
    .icon-radio{
        color: #dcdcdc;
    }
    .radioSty:checked + .icon-radio{
        color: #09bb04;
    }

    .mask{
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