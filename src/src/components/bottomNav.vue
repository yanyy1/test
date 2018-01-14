<template>
    <ul class="flex bottomNav thin-border-top">
        <li v-for="item in bottomNav" class="flex_1" v-bind:class="{active:todo.path==item.path||todo.name==item.path}" v-on:click="link(item.path)">
            <!-- <router-link v-bind:to="item.path"> -->
                <i class="icon iconfont  iconSty" v-bind:class="item.iconfont"></i>
                <p>{{item.text}}</p>
            <!-- </router-link> -->
        </li>
    </ul>
</template>
<script>
    export default{
        props: ["todo"],
        data (){
            return {
                bottomNav: [
                    {path: '/homePage',text: '首页',iconfont: "icon-shouye"},
                    {path: '/carService',text: '车主服务',iconfont: "icon-car"},
                    {path: '/carRefund',text: '我要还款',iconfont: "icon-huankuan"},
                    {path: '/me',text: '我的',iconfont: "icon-wo"}
                ]
            }
        },
        methods: {
            link: function(path){
                if(path == '/carRefund'){
                    if(this.isLogin()){
                        this.$router.push({path: path});
                    }else{

                        this.$router.push({path: this.isWX ? 'login' : 'loginPage',query: {pathName: 'carRefund'}});
                    }
                    return
                }
                this.$router.push({path: path});
            }
        },
        created:function(){
            // var h = window.innerHeight;
            // if(document.querySelector(".bottomNav")){
            //     window.onresize = function(){
            //         if (window.innerHeight < h) {
            //             document.querySelector(".bottomNav").style.position = "absolute";
            //         }else{
            //             document.querySelector(".bottomNav").style.position = "fixed";
            //         }
            //     };
            // }
        }
    }
</script>
<style scoped>
.bottomNav{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1.333rem;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }
  .bottomNav li p{
    font-size: 0.32rem;
    height: 0.427rem;
  }
  .iconSty{
    display: block;
    font-size: 0.72rem;
    height: 0.8rem;
    margin-bottom: 0.067rem;
  }
  .active p,.active .iconSty{
    color: #ed8521;
  }
</style>