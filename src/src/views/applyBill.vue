<template>
    <section id="applyBill">
        <ul>
            <li v-for="(bill,index) in  billes" :key="index">
                <span>{{ bill.type }} :</span>
                <span>{{ bill.money }}元</span>
                <button @click="openBill(index)" :disabled="bill.hasApply" :class="bill.hasApply?hasApply:''">{{bill.text}}</button>
            </li>
        </ul>
        <button @click="oneKey" :class="allApply?oneKeyClass:''" :disabled="allApply">一键开票</button>
        <billAlert :hideblock="showhide" v-on:cancelBill="hideAlert" v-on:applyBill="applyBill" :bt="title" :dz="address" :bz="remark" v-on:InvoiceTitle="InvoiceTitle" v-on:InvoiceAddress="InvoiceAddress" v-on:InvoiceRemark="InvoiceRemark"></billAlert>
        <Tips v-show="tipShow" v-on:closeTips="backTo" :tip="tip"></Tips>
    </section>
</template>
<script>
import billAlert from './billAlert.vue'
export default {
    data() {
        return {
            billes: [],
            showhide: false,
            title: '',          //发票抬头
            address: '',       //配送地址
            remark: '',        //用户备注
            data: [],            //发票明细
            tipShow: false,        //提示框
            tip: "暂时不能开发票",
            billStatusList: '',     //发票有状态的数据集合
            hasApply: "hasApply",    //单键还款的状态
            oneKeyClass: "oneKeyClass", //一键还款的状态
            allApply: false
        }
    },
    methods: {
        hideAlert: function () {
            this.showhide = !this.showhide;
        },
        openBill: function (index) {
            this.showhide = !this.showhide;
            this.data = [];
            this.data.push(this.billes[index]);

        },
        oneKey: function () {
            this.showhide = !this.showhide;
            this.data = [];
            for (var i = 0; i < this.billes.length; i++) {
                this.data.push(this.billes[i]);
            }
        },
        initBill: function () {
            var token = localStorage.getItem('token');
            var orderId = this.$route.query.orderId;
            this.$http({
                method: 'POST',
                url: BASE_URL+'app/v1/invoiceList',
                params: { orderId: orderId },
                headers: { access_token: token }
            }).then((res) => {
                if(res.body.data.length == 0){
                    this.allApply = true;
                }
                for (var i = 0; i < res.body.data.length; i++) {
                    if (res.body.data[i].type == 0) {
                        res.body.data[i].type = "定金发票"
                    } else if (res.body.data[i].type == 1) {
                        res.body.data[i].type = "首付款发票"
                    } else if (res.body.data[i].type == 2) {
                        res.body.data[i].type = "尾款发票"
                    } else if (res.body.data[i].type == 3) {
                        res.body.data[i].type = "提前还款发票"
                    } else if (res.body.data[i].type == 4) {
                        res.body.data[i].type = "月供发票"
                    }
                }
                this.billes = res.body.data;
                for (let i = 0; i < this.billes.length; i++) {
                    this.billes[i].hasApply = false;
                    this.billes[i].text = "开票";
                }
                if (this.billes.length == 1) {
                    this.allApply = true;
                    this.billes[0].hasApply = true;

                }
                
                if (this.billStatusList.length !== 0) {
                    for (let i = 0; i < this.billes.length; i++) {
                        for (let j = 0; j < this.billStatusList.length; j++) {
                            if (this.billes[i].id == this.billStatusList[j].paymentId) {
                                this.billes[i].hasApply = true;
                                if (this.billStatusList[j].status == 0) {
                                    this.billes[i].text = "处理中";
                                } else if (this.billStatusList[j].status == 1) {
                                    this.billes[i].text = "已开票";
                                }
                            }
                        }
                    }
                    if (this.billStatusList.length == this.billes.length) {
                        this.allApply = true;
                    }
                }



            })
        },
        InvoiceTitle: function (val) {
            this.title = val;
        },
        InvoiceAddress: function (val) {
            this.address = val;
        },
        InvoiceRemark: function (val) {
            this.remark = val;
        },
        applyBill: function () {
            var data = this.data;
            console.log(data);
            var orderId = this.$route.query.orderId.toString();
            var token = localStorage.getItem('token');
            var phoneNumber = localStorage.getItem('username');
            var title = this.title;
            var address = this.address;
            var remark = this.remark;
            var invoiceDtos = new Array();
            for (var i = 0; i < data.length; i++) {
                if (!data[i].hasApply) {
                    invoiceDtos.push({
                        "id": data[i].id,
                        "money": data[i].money,
                        "orderId": orderId
                    })
                }

            }
            if (title == "" || address == "") {
                this.tipShow = true;
                this.tip = '发票抬头或地址不能为空'
            } else {
                this.$http({
                    method: 'POST',
                    url: BASE_URL+'app/v1/invoiceApply',
                    params: {
                        invoiceTitle: title,
                        address: address,
                        remark: remark
                    },
                    headers: { access_token: token },
                    body: invoiceDtos
                }).then((res) => {
                    if (res.body.success) {
                        // alert(res.body.data.message);
                        this.showhide = !this.showhide;
                        this.tipShow = true;
                        this.tip = '申请开票成功';


                    }
                })
            }
        },
        backTo: function () {
            // this.$router.push({path: "/billList"});
            this.tipShow = false;
            this.tip = '';
            this.initBillstatus();
        },
        initBillstatus: function () {
            var orderId = this.$route.query.orderId;
            var token = localStorage.getItem('token');
            this.$http({
                method: "POST",
                url: BASE_URL+"app/v1/invoiceStatusList",
                headers: {
                    access_token: token
                },
                params: {
                    orderId: orderId
                }
            }).then((res) => {
                this.billStatusList = res.body.data;
            }).then(() => {
                this.initBill();
            })
        }
    },
    components: {
        billAlert
    },
    created() {
        this.initBillstatus();
    }
}
</script>
<style src="../common.css"></style>
<style scoped>
#applyBill {
    padding-bottom: 1.4rem;
}

#applyBill>ul {
    margin: 0 0.4rem;
    color: #333;
    font-size: 0.4rem;
}

#applyBill>ul>li {
    line-height: 1.3334rem;
}

#applyBill>ul>li>span:nth-of-type(2) {
    margin-left: 0.32rem;
}

#applyBill>ul>li>button {
    width: 2rem;
    height: 0.8rem;
    color: white;
    background: #ed841f;
    border: none;
    border-radius: 5px;
    float: right;
    font-size: 0.4rem;
    margin-top: 0.2667rem;
}

#applyBill>ul>li>.hasApply {
    background: #ccc;
}

#applyBill>button {
    width: 100%;
    line-height: 1.1734rem;
    position: fixed;
    bottom: 0;
    background: white;
    color: white;
    font-size: 0.4rem;
    border: none;
    border-top: 1px solid gray;
    background: #ed841f;
}

#applyBill>.oneKeyClass {
    background: #ccc;
}
</style>