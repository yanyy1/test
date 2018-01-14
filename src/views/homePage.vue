<template>
    <div class="bodyBox">
    	<div v-if="isWX==true" class="searchBox search thin-border-bottom">
    		<router-link class="cityBg" to="/selectCity"><span class="city">{{city}}</span><span class="cityArrow"></span></router-link>
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
                            <img class="itemPic" v-bind:src="i.url" />
                            <p class="itemName">{{i.brandTopName}}{{i.brandSecondName}}</p>
                            <p class="itemType">{{i.type}}</p>
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
                <el-button class="center" type="warning" @click.native="search()">查看更多</el-button>
            </div>
            <img class="bottPic" src="static/img/bottom.png"/>
            <img class="botPic" src="static/img/bot.png"/>
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
    var city=''
    export default{
        data (){
            return {
            	isSelect:false,
            	city:city,
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
                    loopAdditionalSlides: 0,
                    loop: true,
                    // pagination : '.swiper-pagination',
                }  
            }
        },
        methods: {
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
            //城市
            get_ip:function(cb) {
            	var script = document.createElement("script"),
			        s  = document.getElementsByTagName("script")[0];
			    script.src = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=jsonp";
			    s.parentNode.insertBefore(script, s);
			    var it = setInterval(function () {
			    	if (!!remote_ip_info) {
			            cb(remote_ip_info);
			            remote_ip_info = null;
			            clearInterval(it);
			            it = null;
			        }
			    }, 100);
			},
			// 获取banner
            getBanner: function(fn){
                this.$http.get(BASE_URL + 'app/v1/banners').then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.flags.a = res.body.data;
                        this.swiperOption.loopAdditionalSlides = res.body.data.length;
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
        	 var _this=this;
            this.showLoading = true;
            this.getBanner(this.render);
            this.getDataList(this.render);
            var isSelect=localStorage.getItem('isSelect');
            if(this.isSelect==false&&isSelect==undefined){
            	this.get_ip(function (info) {
					_this.city=info.city;
					localStorage.setItem("city",_this.city);    
				    return info.city;
				});
            }
            if(isSelect){
            	this.city=localStorage.city;
            	console.log(city)
            }
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
	.center{
		width: 80%;
		margin: 10px auto;
    	display: block;
	}
	.city{
		text-overflow: ellipsis;
		white-space: nowrap;
	    overflow: hidden;
	    max-width: 60px;
		position: relative;
    	margin-left: 10px;
	    float: left;
	    display: inline-block;
	    line-height: 44px;
	    font-size: 12px;
    }
    .search{
    	height: 44px;
        z-index: 889;
        background-color: #fff;
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
    }
    .searchModal{
    	margin-right: 1.2rem;
    	margin-top: 7px;
    	float: right;
	    width: 5.334rem;
	    height: 0.8rem;
	    border-radius: 0.08rem;
	    background-color: #f5f5f5;
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
        right: -1rem;
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
    #container{
        padding-bottom: 0.6rem;
    }
    .searchBox + #container {
        margin-top: 44px;
    }
    .activePic{
        display: block;
        width: 100%;
        height: 4.2667rem;
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
        height: 6.65rem;
    }
    .listItem div{
        box-shadow: 0 0 0.2rem #eee;
        padding-top: 0.32rem;
            border-radius: 0.107rem;
    }
    .itemName{
        padding-left: 0.32rem;
        padding-right: 0.32rem;
        font-size: 0.4267rem;
        height: 0.667rem;
        line-height: 0.667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
        color: rgb(51,51,51);
        margin-top: 0.5rem;
    }
    .itemType{
        padding-left: 0.32rem;
        padding-right: 0.32rem;
        font-size: 0.32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.05rem;
        color: rgb(102,102,102);
    }
    .itemPic{
        display: block;
        width: 100%;
        height: 2.698rem;
    }
    .itemPay{
        font-size: 0.3733rem;
        margin: 0 0.32rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #666;
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
    .botPic{
        display: block;
        width: 100%;
    }
    .bottPic{
        display: block;
        width: 100%;
        margin-bottom: 0.5rem
    }
    .cityBg{
    	position: relative;
	    display: inline-block;
	    width: 85px;
    }
    .cityArrow{
    	right: 0;
	    top: 22px;
	    transform: rotate(-45deg);
	    height: 8px;
	    width: 8px;
	    position: absolute;
	    border-right: 1px solid #666;
	    border-top: 1px solid #666;
	    display: inline-block;
    }
</style>