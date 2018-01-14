<template>
<section id="repayMent">
 <ul id="repay" v-if="hasInfo">
        <li v-for="(item,index) in repayDataes" :key="index">
            <div class="repayTimer">
                <span>{{ item.payDate }} <em>{{ item.hourSecond }}</em></span>
                <!--<span>{{ item.hms }}</span>-->
            </div>
            <span class="repayAmount">{{ item.money }}元</span>
            <p>还款方式:
                <span>{{ item.payType }}</span>
            </p>
        </li>
        <!--  <li class="repayContent">
                    <div class="repayTimer"><span>2017年6月7日</span><span>12:00</span></div>
                    <span class="repayAmount">1598元</span>
                    <p>还款方式:<span>工商银行卡</span></p>
                </li> -->
    </ul>
    <p v-show="alertTips">暂无还款记录</p>
</section>
   
   
</template>
<script >
import moment from 'moment'
export default {
    data() {
        return {
            repayDataes: [],
            orderId: '',
            hasInfo: false,
            alertTips: true
        }
    },
    methods: {
        initUnPay() {
            this.orderId = this.$route.params.id;
            var token = localStorage.getItem('token');

            // this.$route.params.id
            this.$http.get(BASE_URL+'app/v1/order/getOrderMonthPaymentList?orderId=' + this.orderId, { headers: { access_token: token } }).then((res) => {
                if (res.body.data.length !== 0) {
                    this.alertTips = false;
                    var Data = res.body.data;
                    for (var i = 0; i < Data.length; i++) {
                        var time = moment(Data[i].payDate).format("YYYY-MM-DD   HH:mm").split('-');
                        var year = time[0]+"年";
                        var month = time[1]+ "月";
                        var day = time[2].split(' ')[0]+"日";
                        var hourSecond = time[2].split(' ')[3];
                        console.log(hourSecond);
                        Data[i].payDate = year+month+day;
                        Data[i].hourSecond = hourSecond;
                        if (Data[i].payChannel == 1) {
                            Data[i].payType = "现金"
                        } else if (Data[i].payChannel == 2) {
                            Data[i].payType = "支付宝"
                        } else if (Data[i].payChannel == 3) {
                            Data[i].payType = "微信"
                        } else if (Data[i].payChannel == 4) {
                            Data[i].payChannel = "银行卡"
                        }

                    }
                    this.hasInfo = true;
                    this.repayDataes = Data;

                }


            })

        }
    },
    beforeCreate: function(){
            this.setDocumentTitle("还款记录");
        },
    created() {
        this.initUnPay();
    }
}
</script>

<style src="../common.css"></style>
<style>
#repayMent>p{
    width: 100%;
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    --webkit-transform: -webkit-translateY(-50%);
    font-size: 0.5rem;
}
#repay {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}

#repay>li {
    margin: 0 0.334rem;
    padding-top: 0.5334rem;
    box-shadow: 0 0 20px #ccc;
    -webkit-box-shadow: 0 0 20px #ccc;
    border-radius: 10px;
}

#repay>li:not(:first-child) {
    margin-top: 0.4rem
}

#repay>li .repayTimer {
    font-size: 0.32rem;
    color: #999999;
    margin-bottom: 0.4rem;
    text-align: center;
}
#repay>li .repayTimer >span>em{
    font-style: normal;
    margin-left: 0.48rem;
}
#repay>li .repayAmount {
    width: 100%;
    font-size: 0.64rem;
    text-align: center;
    display: block;
}

#repay>li p {
    text-align: center;
    line-height: 1.28rem;
    margin-top: 0.5334rem;
    border-top: 1px solid #ccc;
    color: #333333;
    font-size: 0.4rem;
}

#repay>li p>span {
    color: #999999;
}
</style>