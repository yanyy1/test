<template>
    <div class="set">
        <div class="listSty"  @click="account">
            <div class="floatLeft">
                <span>账号管理</span>
            </div>
            <div class="floatRight">
                <i class="icon iconfont icon-jiantou"></i>
            </div>
        </div>
        <div v-if="backLogin" class="back" @click="back">退出登录</div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                backLogin: true
            }
        },
        methods: {
            account(){
                this.$router.push({path: '/account'});
            },
            back:function(){
                if(localStorage.getItem('username')){
                    localStorage.removeItem('username');
                    localStorage.removeItem('token');
                }
                this.$router.push({path: 'me'});
            },
        },
        beforeCreate: function(){
            this.setDocumentTitle("设置");
        },
        created(){
            if(!this.isLogin()){
                this.backLogin = false;
            }else{
                this.backLogin = true;
            }
        }
    }
</script>
<style scoped>
.set{
  /*  position: relative;
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
    .back{
        line-height: 1.1733rem;
        height: 1.1733rem;
        text-align: center;
        background-color: #fff;
        color: #F69638;
        font-size: 0.4267rem;
    }
</style>