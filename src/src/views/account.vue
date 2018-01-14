<template>
    <div class="set">
        <div class="authen listSty">
            <div class="floatLeft">
                <img src="static/img/phone.png"/>
                <span>手机号</span>
            </div>
            <div class="floatRight">
                <span class="tel">{{authText}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                authText: this.isLogin()
            }
        },
        methods: {

        },
        beforeCreate: function(){
            this.setDocumentTitle("账号管理");
        },
    }
</script>
<style scoped>
.set{
 /*   position: relative;
    top: -1px;*/
    width: 100%;
    height: 100%;
    background-color: #F5F4F9;
    padding-top: 0.5333rem;
}
    .listSty{
        background-color: #fff;
        height: 1.1733rem;
        position: relative;
        line-height: 1.1733rem;
        padding: 0 0.4rem;
        overflow: hidden;
        font-size: 0.4267rem;
        margin-bottom: 1.0667rem;
    }

    .listSty div img{
        width: 0.64rem;
        height: 0.64rem;
        position: relative;
        top: 0.145rem;
    }
    .tel{
        color: #999;
        font-size: 0.3733rem;
    }
    .icon{
        font-weight: bold;
        color: #878787;
    }

    .tel{
        color: #333;
        font-size: 0.3733rem;
    }
</style>