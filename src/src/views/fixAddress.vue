<template>
    <div>
        <div class="defaultAddress">
            <div class="labelSty default">
                <div class="floatLeft f15">默认地址</div>
                <div class="floatRight">
                    <span class="f15 color-999" v-on:click="moreAddress()">更多地址</span>
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>
            <div class="labelSty mgb-10">
                <div class="floatLeft f15 color-999">收货人：{{address.consignee}}</div>
                <div class="floatRight f15 color-999">{{address.phone}}</div>
            </div>
            <div class="f15 color-999 labelSty mgb-10">地址：{{address.address}}</div>
            <div class="addRessTip color-ed852e f12 thin-border-top">注意：默认地址为银来融资租赁（上海）有限公司所在地，使用默认地址需要您到公司所在地提车</div>
        </div>
        <div class="btnBox defaultBtn">
            <button class="btnSty" v-on:click="useDefault()">使用自提地址</button>
        </div>
        <div class="newAddress">
            <div class="inputBoxSty thin-border-bottom f15">
                <span class="inputName thin-border-right">收货人</span>
                <input class="inputSty" type="text" name="" v-model="newAddress.name">
            </div>
            <div class="inputBoxSty f15 thin-border-bottom">
                <span class="inputName thin-border-right">手机号码</span>
                <input class="validCode inputSty" type="tel" name="" v-model="newAddress.phone" maxlength="11" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')">
            </div>
            <div class="inputBoxSty f15 thin-border-bottom">
                <span class="inputName thin-border-right">现居地址</span>
                <input id="address" class="validCode inputSty" type="text" name="" readonly="" unselectable="true" onfocus="this.blur()" v-model="newAddress.proCity">
                <input id="addressVal" type="hidden" name="">
            </div>
            <div class="inputBoxSty f15">
                <span class="inputName thin-border-right">详细地址</span>
                <input class="validCode inputSty" type="text" name="" v-model='newAddress.fullAddress'>
            </div>
        </div>
        <div class="btnBox">
            <button class="btnSty" v-on:click="useNewAddress()">使用现居地址</button>
        </div>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
    </div>
</template>
<script>
    import '../js/testData.js'
    import '../js/LArea.min.js'
    import '../css/LArea.min.css'
    export default{
        data(){
            return {
                address:{},
                newAddress: {
                    consignee: "",
                    name: '',
                    phone: "",
                    address: "",
                    fullAddress: "",
                    proCity: ""
                },
                toastData:{
                    show: false,
                    text: ""
                },
                alertData: {
                    show: false,
                    msg: "",
                },
            }
        },
        methods: {
            useDefault: function(){
                localStorage.setItem('address',JSON.stringify(this.address));
                this.$router.back();
            },
            isAllInput: function(){
                if(this.vaildNull(this.newAddress.name)){
                    this.toastData= {
                        show: true,
                        text: '请输入收货人'
                    };
                    return
                }else if(this.vaildNull(this.newAddress.phone)){
                    this.toastData= {
                        show: true,
                        text: '请输入手机号码'
                    };
                    return
                }else if(this.newAddress.phone.length!=11){
                    this.toastData= {
                        show: true,
                        text: '请输入正确手机号码'
                    };
                    return
                }else if(this.vaildNull(this.newAddress.proCity)){
                    this.toastData= {
                        show: true,
                        text: '请选择现居地址'
                    };
                    return
                }else if(this.vaildNull(this.newAddress.fullAddress)){
                    this.toastData= {
                        show: true,
                        text: '请输入详细地址'
                    };
                    return
                }else {
                    return true
                }
            },
            moreAddress: function(){
                this.$router.push({path: 'selectAddress'})
            },
            useNewAddress:function(){
                if(this.isAllInput()){
                    this.newAddress.address = this.newAddress.proCity.replace(/,/g,"") + this.newAddress.fullAddress;
                    this.newAddress.consignee = this.newAddress.name + " " + this.newAddress.phone; 
                    localStorage.setItem('address',JSON.stringify(this.newAddress));
                    localStorage.setItem('newAddress',JSON.stringify(this.newAddress));
                    this.$router.back()
                }
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("修改地址");
        },
        created: function(){
            this.$http.get(BASE_URL + 'app/v1/address',{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                var scope = this;
                if(res&&res.body&&res.body.success){
                    res.body.data.forEach(function(e){
                        if(e.isDefault){
                            scope.address = e;
                        }
                    });
                }else{
                    this.alertData.show = true;
                    this.alertData.msg = "获取地址信息失败";
                }
            },function(res){
                this.alertData.show = true;
                this.alertData.msg = "获取地址信息失败";
            });
            if(localStorage.getItem('newAddress') && localStorage.getItem('newAddress')!=undefined){
                this.newAddress = JSON.parse(localStorage.getItem('newAddress'));
            }
            
        },
        mounted: function(){
            var area = new LArea();
            area.init({
                'trigger': '#address',
                'valueTo': '#addressVal',
                'keys': {
                    id: 'value',
                    name: 'text'
                },
                'type': 2,
                'data': [provs_data, citys_data, dists_data]
            });
        }
    }
</script>
<style scoped>
    .defaultAddress{
        margin: 15px 10px 15px;
        border-radius: 5px;
        box-shadow: 0 0 5px #dcdcdc;
    }
    .labelSty{
        padding: 0 20px;
        overflow: hidden;
    }
    .default{
        padding: 15px 20px;
        font-size: 14px;
    }
    .addRessTip{
        padding: 9px 20px 0;
    }

    .inputBoxSty{
        height: 50px;
        padding: 13px 0 0;
    }
    .inputName{
        float: left;
        height: 25px;
        text-align: center;
        width: 30%;
        font-size: 15px;
    }
    .inputSty{
        outline: none;
        border: 0;
        font-size: 15px;
        padding-left: 15px;
        padding-right: 15px;
        width: 70%;
    }
    .newAddress{
        margin: 0 10px 15px;
        border-radius: 5px;
        box-shadow: 0 0 5px #dcdcdc;
    }
    .btnBox{
        padding: 0 10px;
    }
    .defaultBtn{
        margin-bottom: 15px;
        font-size: 14px;
    }
</style>