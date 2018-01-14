<template>
    <div class="bodyBox">
        <div v-if='showDown' class="downEntry">
            <div class="downClose" @click="close()"><img src="static/img/close.png"></div>
            <div class="downImg"><img src="static/img/downLogo.png"></div>
            <div class="downText">下载App查看更多车型</div>
            <button class="downBtn" @click="down()">立即下载</button>
        </div>
        <div v-if="isWX==true" class="searchBox search thin-border-bottom">
            <div class="searchModal">
                <form action="javascript:return true;" v-on:search="search()">
                    <div class="iconBox">
                        <i class="icon iconfont icon-search searchIcon"></i>
                    </div>
                    <input class="searchInput" type="search" name="" placeholder="搜索你想要的车型" v-model="searchData.condition">
                </form>
                <div class="msgBox">
                    <router-link to="/recommend"><img class="msgIcon" src="static/img/msgIcon.png"></router-link>
                </div>
            </div>
        </div>
        <div id="container">
            <div class="topLoading"></div>
            <div class="swiperBanner thin-border-bottom">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in bannerData" v-bind:key="index">
                        <router-link v-bind:to="'/activeDetail/'+item.id">
                            <img class="activePic" v-bind:src="item.url"/>
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
                
            <div class="hotCar">
                <p class="hotTitle">热门车型</p>
                <ul class="hotCarList">
                    <li class="listItem" v-for="i in hotCarList" v-on:click="toDetail(i.id)">
                        <div>
                            <p class="itemName">{{i.brandTopName}}{{i.brandSecondName}}</p>
                            <p class="itemType">{{i.type}}</p>
                            <img class="itemPic" v-bind:src="i.url" />
                            <p class="itemPay">首付
                                <span class="floatRight">
                                    <span class="color-ed852e mgr-133">{{i.downPayment}}</span>元
                                </span>
                            </p>
                            <p class="itemPay monPaySty">月供
                                <span class="floatRight">
                                    <span class="color-ed852e mgr-133">{{i.mouthPayment}}</span>元
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <bottomNav v-bind:todo="active"></bottomNav>
        <loading v-if="showLoading"></loading>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import bottomNav from "../components/bottomNav.vue"
    import slide from '../js/scroll.js'
    import '../css/swiper.css'
    export default{
        
        data (){
            return {
                showDown: true,
                searchData:{
                    condition: ""
                },
                active: {
                    path: this.$route.path,
                    name: this.$route.name,
                },
                bannerData: {},
                hotCarList: [],
                flags: {
                    a: "",
                    b: ""
                },
                showLoading: false,
                alertData: {
                    show: false,
                    msg: "",
                },

                swiperOption: {  
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loop: true
                }  
            }
        },
        methods: {
            close: function(){
                this.showDown = false
            },
            down: function(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    location.href = "http://itunes.apple.com/gb/app/yi-dong-cai-bian/id1260453607?mt=1260453607";
                }
                if(isiOS){
                    location.href = "http://itunes.apple.com/gb/app/yi-dong-cai-bian/id1260453607?mt=1260453607";
                }
            },
            toDetail: function(id){
                this.$router.push({path: 'carDetail/'+id});
            },
            search:function(){
                if(this.isWX && document.querySelector(".searchInput")){
                    document.querySelector(".searchInput").blur();
                }
                localStorage.setItem("condition",this.searchData.condition);
                this.$router.push({path: "/carList"});
            },
            // 获取banner
            getBanner: function(fn){
                this.$http.get(BASE_URL + 'app/v1/banners').then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.flags.a = res.body.data;
                        fn && fn();
                    }
                },function(){
                    this.showLoading = false;
                    this.alertData.show = true;
                    this.alertData.msg = "系统已经睡着了，请耐心等待";
                });
            },
            // 获取热门车型
            getDataList(fn){
                this.$http.get(BASE_URL + 'app/v1/hotCars?pageSize=99999').then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.flags.b = res.body.data.list;
                        // this.render();
                        fn && fn();
                    }
                },function(){
                    this.showLoading = false;
                    this.alertData.show = true;
                    this.alertData.msg = "系统已经睡着了，请耐心等待";
                });
            },
            // 渲染数据
            render: function(fn){
                if(this.flags.a&&this.flags.b){
                    this.bannerData = this.flags.a;
                    this.hotCarList = this.flags.b;
                    this.showLoading = false;
                    fn && fn()
                }
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("车丫头");
        },
        created: function(){
            this.showLoading = true;
            this.getBanner(this.render);
            this.getDataList(this.render);

            if(!this.isWX){
                window.scope = this;
                window.toList = function(){
                    scope.$router.push({path: "carList"});
                }
            }
            
        },
        mounted: function(){
            var scope = this;

            slide({container:"#container",next: function (e) {
                //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
                var that = this;
                setTimeout(function () {
                    scope.showLoading = true;
                    scope.getBanner(scope.render(that.back.call()));
                    scope.getDataList(scope.render(that.back.call()));
                }, 500);
            }});
            setTimeout(function(){
                document.body.scrollTop=1;
            },1)
        },
        components: {
            bottomNav,
            swiper,
            swiperSlide,
        }
    }
</script>
<style scoped>
    .search{
        height: 44px;
        padding-top: 0.187rem;
        z-index: 889;
        background-color: #fff;
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
    }
    .searchModal{
        width: 5.334rem;
        height: 0.8rem;
        border-radius: 0.08rem;
        background-color: #f5f5f5;
        margin: 0 auto;
        position: relative;
    }
    .iconBox{
        top: 50%;
        left: 0.7rem;
        font-size: 0.4rem;
        position: absolute;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }
    .msgBox{
        width: 0.6rem;
        top: 50%;
        right: -1.8rem;
        font-size: 0.4rem;
        position: absolute;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }
    .searchIcon{
        color: #999;
        font-size: 0.4rem;
    }
    .searchInput{
        outline: none;
        border: 0;
        width: 4rem;
        height: 0.8rem;
        background-color: #f5f5f5;
        position: absolute;
        font-size: 0.373rem;
        left: 1.333rem;
        line-height: 0.8rem;
    }
    .searchBox + #container {
        margin-top: 44px;
    }
    .activePic{
        display: block;
        width: 100%;
    }
    .hotCar{
        padding: 0.4rem 0.2rem;
    }
    .hotTitle{
        text-align: center;
        font-size: 0.453rem;
        margin-bottom: 0.267rem;
    }
    .listItem{
        padding: 0.2rem;
        float: left;
        width: 50%;
        height: 6.111rem;
    }
    .listItem div{
        box-shadow: 0 0 0.2rem #eee;
        padding-top: 0.32rem;
            border-radius: 0.107rem;
    }
    .itemName{
        padding-left: 0.267rem;
        padding-right: 0.267rem;
        font-size: 0.4rem;
        height: 0.667rem;
        line-height: 0.667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
    }
    .itemType{
        padding-left: 0.267rem;
        padding-right: 0.267rem;
        font-size: 0.32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .itemPic{
        display: block;
        width: 100%;
        height: 2.698rem;
    }
    .itemPay{
        font-size: 0.4rem;
        margin: 0 0.4rem;
        height: 0.8rem;
        line-height: 0.8rem
    }
    .hotCarList{
        overflow: hidden;
    }
    .bodyBox{
        position: relative;
    }
    .monPaySty{
        border-top: 1px solid #999;
    }
    .msgIcon{
        display: block;
        width: 100%;
    }
    .mgr-133{
        margin-right: 0.133rem;
        font-weight: bold;
    }

    .downEntry{
        width: 100%;
        height: 47px;
        z-index: 99999;
        background: rgba(255,255,255,0.9);
        position: fixed;
        top: 0;
        padding: 0 12px 0 0;
    }
    .downBtn{
        width: 83px;
        height: 27px;
        border: none;
        outline: none;
        background: #ef851c;
        color: #fff;
        font-size: 17px;
        border-radius: 4px;
        text-align: center;
        float: right;
        margin-top: 10px;
    }
    .downText{
        font-size: 17px;
        color: #ef851c;
        float: left;
        margin-top: 11px;
    }
    .downImg{
        float: left;
        width: 30px;
        height: 30px;
        margin: 10px 10px 0 0;
    }
    .downImg img{
        display: block;
        width: 30px;
    }
    .downClose {
        float: left;
        width: 44px;
        height: 47px;
    }
    .downClose img{
        display: block;
        width: 14px;
        margin: 16px auto 0;
    }
</style>