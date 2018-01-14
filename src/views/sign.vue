<template>
    <div>
        <div class="packTxt f15">
            <p v-html="content.content"></p>
        </div>
        <div class="bottomBox thin-border-top">
            <div class="tips">
                <label class="checkBoxSty" for="all">
                    <input type="checkbox" name="all" id="all" v-model="checked">
                    <span></span>
                </label>

                <span>我已阅读并同意以上协议</span>
            </div>
            <a href="tel:400-098-2118" v-on:click="takePhone()">
                <button class='onlineService btn'>
                    <div class="floatLeft leftIcon">
                        <i class="icon iconfont icon-kefu"></i>
                    </div>
                    <div class="floatLeft">
                        <p class="kefu">联系客服</p>
                        <p class="shijian">9:00-18:00</p>
                    </div>
                </button>
            </a>
            <!-- <button class="bottomBtn applyRefund" v-on:click="applyRefund()">申请退款</button> -->
            <button class="bottomBtn" v-on:click="confirmSign()">确认签约</button>
        </div>
        <loading v-if="showLoading"></loading>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                content: "",
                showLoading: false,
                alertData: {
                    show: false,
                    msg: "",
                },
                checked: false,
                toastData: {
                    show: false
                }
            }
        },
        methods:{
            applyRefund: function(){
                this.$router.push({path: "/fillRefundInfo",query: this.$route.query});
            },
            confirmSign: function(){
                if(this.checked){
                    this.showLoading = true;
                    this.$http.post(BASE_URL+'app/v1/order/updateOrderContractId?orderId='+this.$route.query.orderId+'&contractId='+this.content.id,{},{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                        if(res&&res.body&&res.body.success){
                            this.$router.push({path: "/confirmSign",query: this.$route.query});
                        }else{
                            this.showLoading = false;
                            this.alertData.show = true;
                            this.alertData.msg = res.body.data.errorMessage;
                        }
                    });
                }else{
                    this.toastData.show = true;
                    this.toastData.text = "请先阅读并同意协议";
                }
            },
            getData: function(){
                this.showLoading = true;
                this.$http.get(BASE_URL+'app/v1/car/contracts?carId='+this.$route.query.carId+"&financeStages="+this.$route.query.showPrice,{headers: {access_token: localStorage.getItem('token')}}).then(function(res){
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        this.content = res.body.data;
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            }
        },
        beforeCreate:function(){
            this.setDocumentTitle("电子云签约");
        },
        created: function(){
            this.getData();
        }
    }
</script>
<style scoped>
    .topTips{
        padding: 5px 0 5px 15px;
        background-color: #f5f5f5;
        overflow: hidden;
    }
    .icon-tishi{
        margin-top: 8px;
    }
    .topTipsTxt{
        width: 90%;
    }
    @media screen and (max-width: 370px){
        .icon-tishi{
            margin-top: 17px;
        }
    }
    .packTxt{
        padding: 20px 30px 0;
        text-indent: 30px;
        line-height: 23px;
        margin-bottom: 80px;
    }
    .bottomBox{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
    }
    .btn{
        display: block;
        float: left;
        height: 50px;
        border: none;
        outline: none;
    }
    .onlineService{
        width: 28%;
        background-color: #fff;
    }
    .bottomBtn{
        float: left;
        width: 72%;
        height: 50px;
    }
    .applyRefund{
        background-color: #f5f5f5;
        color: #333;
    }
    .tips{
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        padding-left: 40px;
        background: #f7f7f7;
        border-bottom: 1px solid #e3e3e7;
    }
    .checkBoxSty{
        position: relative;
    }
    .checkBoxSty input{
        display: none;
    }
    .checkBoxSty span{
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTgxNkYyM0U3MDE1MTFFNzlCQThGNDE3QjYzMThDNEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTgxNkYyM0Y3MDE1MTFFNzlCQThGNDE3QjYzMThDNEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODE2RjIzQzcwMTUxMUU3OUJBOEY0MTdCNjMxOEM0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODE2RjIzRDcwMTUxMUU3OUJBOEY0MTdCNjMxOEM0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgJtpwQAAADESURBVHja7NmxCsIwEIDhRNydBCO4Ojr5Bpl8DsW36nM45Q3q4ti1SIVOPkG8oINblHBi4D84ulybL0eb4WpjjKammJjKAjBgwD+OaekDQghF93vvv6q3uXNYQDu5NJJOuXmD5F42cCrtcDNbbdx2PVfVtt3o7v0lNWZZ+g6rY1O81nCcEoABAwYMGDBgwIABAwYMGDDgtxjablSHnJ9r3HJ1n0x+DmkiE3qzUDZfJY+5Ilv6j+PvhoF8dIABA64rHgIMAGnALoF00xIfAAAAAElFTkSuQmCC) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -1px;
        right: 3px;
    }
    .checkBoxSty input:checked + span{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTgxNkYyM0E3MDE1MTFFNzlCQThGNDE3QjYzMThDNEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTgxNkYyM0I3MDE1MTFFNzlCQThGNDE3QjYzMThDNEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODE2RjIzODcwMTUxMUU3OUJBOEY0MTdCNjMxOEM0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODE2RjIzOTcwMTUxMUU3OUJBOEY0MTdCNjMxOEM0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoxjSOUAAAKESURBVHjaYvz//z/DUAJMDEMMjDp41MGjDqYzYMEn+aFNdkAcJVD1mKIQ9gTiZ0D8n8b4GdQuipPEXCCWpEPASkLtotjBknRMDZKjpcSIdTATnzQDb/xmBt70A4PfwczCqgw8cesYmKUNGBh+fKReOUyTgl/SkIE7YiEDI6cgw7/PLxm+rs8avA5mlbdl4AqdzcDIxs3w//d3hm9r0xj+fXo6OB3MquHDwO0/CZgeWIHVxF+GbxtyGf48Ozc4Mx2bYSwDd+AUiGOB4Pv+Hobft3dSvy1BDcBhlc/A4VAC5/86u4Th54kp9CnWmPjlGFgV7IjUxsTA6dKI4tg/948wfNtVS7vWGjrgiVkFdLQ0w+8bOxi+bSlk+P/rCw63sjJw+/QysOoEwoX+vrrB8HVdOjD9/qFfxfHvzR1oBvJg4EnYDCxPVTDUMLJyMfCEzEFx7P9v7xi+rkpg+P/zE31rum/byxn+f38PKfxFVMCOZlV1RziWQ4CBJ3IpA4uKE8KxwOLr66pEkosv6oQw0NKvm4qgzVegA9l5GLiB5SqHXSkDE68UMMmsZmCWMUHS8Z/h28Y8soovqhVrf+7uYfh5cg5yImDgsMlj4M08xMAspoGi9vv+Lobft3YMfOPn+4EOYKhdRE27LOwofHDxdXwK1YtJ8iqOv78YvgHbAP9/YM9Efx4cY/i2p35wNS//fXzE8G1rGaZfQMXX2lSwpwZde/j3za3AqF+MWnytSaFK8UWzqvnbnkZgY1ySgUlcm+HbugyGfx8eDty4BHHp+SfDl9WJo326EeXg53R0zwtqODiFGIOoAECNjWRqZLptdB79wQsYRydlRh086uBRBw8vBwMEGAByn98lS0hipwAAAABJRU5ErkJggg==);
    }
    .leftIcon{
        height: 100%;
        padding: 0 0.24rem;
        line-height: 50px;
    }
    .kefu{
        margin-top: 10px;
        margin-bottom: 2px;
        font-size: 0.2933rem;
        text-align: left;
    }
    .shijian{
        font-size: 0.2667rem;
        text-align: left;
    }
    .icon{
        font-size: 0.4267rem;
    }
</style>