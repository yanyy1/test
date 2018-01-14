<template>
    <section v-if="hasInfo">
    <div v-for="(item,index) in carData">
        <carItem  :key="index" :financeId="financeIdArray[index]" :infoObj="item" v-on:target="target(index)" :downPayment="downPay[index]" :mouthPayment="monthPay[index]"></carItem>
        </div>
    </section>
</template>
<script>
import carItem from './carItem.vue'
export default {
    data() {
        return {
            carData: [],
            orderId: [],
            carId: [],
            state: [],
            hasInfo: true,
           financeIdArray:[],
            downPay:[],     //首付集合
            monthPay:[]      //月供集合

        }
    },
    methods: {
        initOrder: function () {
            var token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            this.$http.get(BASE_URL+'app/v1/order/getOrderByPhoneNumber?phoneNumber=' + username, { headers: { access_token: token } }).then((res) => {
                //根据电话号码获取订单信息
                if (res.body.data.length !== 0) {
                    this.hasInfo = true;
                    for (var i = 0; i < res.body.data.length; i++) {
                            this.carId.push(res.body.data[i].carId);
                            this.orderId.push(res.body.data[i].orderId);
                            this.state.push(res.body.data[i].state);
                            this.initCarInfo(this.carId[i]);
                    }
                     var self= this;
                    for (var i = 0; i < this.orderId.length; i++) {
                          var token = localStorage.getItem('token');
                          (function(num){
                                self.$http.get(BASE_URL+'app/v1/order/getOrderByOrderId?orderId='+self.orderId[num], { headers: { access_token: token } }).then((res)=>{
                                        self.financeIdArray.push(res.body.data.finance.stages);
                                         self.downPay.push(res.body.data.finance.downpayment);
                                        self.monthPay.push(res.body.data.finance.mouthpayment);
                                        console.log(self.financeIdArray);
                                    })

                          })(i)
                                }
                }


            })
        },
        initCarInfo: function (id) {
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/car/' + id, { headers: { access_token: token } }).then((res) => {
                //根据carId获取车辆信息
                this.carData.push(res.body.data.carItem);
            })
        },
        target: function (index) {
            var state = this.state[index];
            var orderId = this.orderId[index];
            this.$router.push({ path: "applyBill", query: {  orderId: orderId } });
        }
       
    },
    computed: {

    },
    components: {
        carItem
    },
    beforeCreate() {
        this.setDocumentTitle("发票申请");
    },
    created() {
        this.initOrder();
    }
}
</script>
<style scoped>
div {
    overflow:auto;
    border-bottom:1px solid #eee;
}


</style>