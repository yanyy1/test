<template>
    <div class="validPhone">
        <div class="inputBoxSty thin-border-bottom f15">
            <span class="inputName thin-border-right">手机号码</span>
            <input class="inputSty" type="text" name="" v-model="submitData.mobile" placeholder="请输入手机号码">
        </div>
        <div class="inputBoxSty thin-border-bottom f15">
            <span class="inputName thin-border-right">服务密码</span>
            <input class="inputSty" type="password" name="" v-model="submitData.password" placeholder="请输入运营商服务密码">
        </div>
        <div class="btnBox">
            <button class="btnSty" v-on:click="submit()">提交认证</button>
        </div>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
        <loading v-if="showLoading"></loading>
        <codeModal v-if="confirmData.show" v-bind:todo="confirmData"></codeModal>
        <newLoading v-if="newShowLoading"></newLoading>
    </div>
</template>
<script>
import newLoading from '../components/newLoading.vue'
    export default{
        data(){
            return {
                toastData:{
                    show: false,
                    text: ""
                },
                alertData: {
                    show: false,
                    msg: "",
                },
                submitData: {
                    mobile: "",
                    password: ""
                },
                showLoading: false,
                newShowLoading: false,
                confirmData: {
                    show: false,
                    msg: "",
                },
            }
        },
        methods:{
            isAllInput: function(){
                if(this.vaildNull(this.submitData.mobile)){
                    this.toastData= {
                        show: true,
                        text: '请输入手机号码'
                    };
                    return
                }else if(this.vaildNull(this.submitData.password)){
                    this.toastData= {
                        show: true,
                        text: '请输入服务密码'
                    };
                    return
                }else {
                    return true
                }
            },
            submit: function(){
                if(this.isAllInput()){
                    this.showLoading = true;

                    this.getToken(this.submitData.mobile,this.submitData.password);
                }
            },
            getToken: function(phone,password){
                var scope = this;
                this.showLoading = true;
                var userInfoData = JSON.parse(localStorage.getItem('userInfoData'));
                // userInfoData.idcardnumber = "341223196801153173";
                // userInfoData.username = "孙兴亮";
                var param = "?username="+this.isLogin()+"&identityCardNo="+userInfoData.idcardnumber+"&identityName="+userInfoData.username+"&mobile="+phone+"&password="+password;

                this.$http.post(BASE_URL+'app/v1/credit/token'+param).then(function(res){
                    
                    if(res&&res.body&&res.body.success){
                        var token = res.body.data;
                        scope.loopData(userInfoData.idcardnumber,phone,token);
                        
                    }else{
                        this.showLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },

            getData: function(identityCardNo,mobile,token,fn){
                var scope = this;
                var param = "?identityCardNo="+identityCardNo+"&mobile="+mobile+"&token="+token;
                this.$http.post(BASE_URL+'app/v1/credit/data'+param).then(function(res){
                    if(res&&res.body&&res.body.success){
                        if(res.body.data == "0006"){
                            this.showLoading = false;
                            fn && fn()
                            this.confirmData.show = true;
                            this.confirmData.btnMsg = "提交";
                            this.confirmData.msg = "验证码填写后提交";
                            this.confirmData.title = "验证码";
                            this.confirmData.confirm = function(code){
                                scope.newShowLoading = true;
                                scope.fillCode(identityCardNo,mobile,token,code);
                            }

                        }else if(res.body.data == "0000"){
                            scope.newShowLoading = false;
                            fn && fn()
                            this.phone();
                        }else if(res.body.data == "0100"){
                            this.showLoading = false;
                            scope.newShowLoading = true;
                        }
                    }else{
                        fn && fn()
                        this.showLoading = false;
                        this.newShowLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },
            loopData: function(idcardnumber,phone,token){
                var scope = this;
                var clearTime = function(){
                    if(time){
                        clearInterval(time);
                    }
                }
                scope.getData(idcardnumber,phone,token,clearTime)
                var time = setInterval(function(){
                    scope.getData(idcardnumber,phone,token,clearTime);
                },5000);
            },
            fillCode: function(identityCardNo,mobile,token,code){
                var scope = this;
                var param = "?token="+token+"&code="+code;

                this.$http.post(BASE_URL+'app/v1/credit/code'+param).then(function(res){
                    if(res&&res.body&&res.body.success){
                        scope.loopData(identityCardNo,mobile,token)
                    }else{
                        this.showLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            },

            phone: function(){
                var param = "?username="+this.isLogin()+"&mobile="+this.submitData.mobile+"&password="+this.submitData.password;
                this.$http.post(BASE_URL+'app/v1/user/phone'+param).then(function(res){
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        localStorage.setItem('submitData',JSON.stringify(this.submitData));
                        
                        var nowTime = new Date();
                        var min = nowTime.getMinutes();
                        if(min<10){
                            min = '0' + min;
                        }
                        var nowStr = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate()+ " " + nowTime.getHours()+":"+min;
                        localStorage.setItem('submitTime',nowStr);
                        this.$router.push({path: "/submitSuccess",query: this.$route.query});
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorCode != "6018" ? res.body.data.errorMessage : "服务密码认证失败";
                    }
                });
            },
        },
        beforeCreate:function(){
            this.setDocumentTitle("手机认证");
        },
        created: function(){
            var submitData = localStorage.getItem("submitData");
            if(submitData&&submitData!=undefined){
                this.submitData = JSON.parse(submitData);
            }
        },
        components: {newLoading}
    }
</script>
<style scoped>
    .validPhone{
        margin: 15px 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px #eee;
    }
    .validCode{
        width: 30%;
    }
    .getCode{
        padding-left: 14px;
        padding-right: 14px;
        height: 25px;
        float: right;
    }
    .btnBox{
        padding: 10px;
    }
    .inputSty{
        width: 65%;
    }
</style>