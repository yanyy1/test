<template>
	<div class="pd">
		<div v-if="isWX==true">
		<span class="topCollect" id="myDIV" @click="collectClick()"><img class="bottPic" src="static/img/about.png"/></span>
    	<span class="topShare" @click="shareClick()"><img class="bottPic" src="static/img/share.png"/></span>
        <div>
            <div class="topBox">
                <img v-if="false&&!isWX" @click="alertInvite()" class="share" src="static/img/share.png">
                <div class="swiperBanner">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in carPicture" v-bind:key="index">
                            <img class="detailImg" v-bind:src="item.url"/>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
                
            <div class="thin-border-top carInfo">
                <p class="mgb-6 f17">{{detailData.brandTopName}}{{detailData.brandSecondName}}</p>
                <p class="color-999 f12">厂商指导价：{{detailData.factoryPrice}}万</p>
            </div>
            <div class="thin-border-top carInfo flex">
                <div class="flex_1 part">
                	<el-select v-model="value" placeholder="请选择" class="f17 mgb-10">
					    <el-option
					      v-for="item in carPicture"
					      :value="item.id"
					      @click.native="setStage(item.sequence)"
					      >
					    </el-option>
					  </el-select>
                	
                	
                    <!--<p >{{detailData.stages}}</p>-->
                    <p class="f12" style="color: #ff4256">首付含购置税 首年保险</p>
                    <p class="f12" style="color: #ff4256">上牌费</p>
                </div>
                <div class="flex_1 color-ed852e f15 textRight part">
                    <p class="classSty">
                        <span >首付</span>
                        <span class="moneySty">{{price}}元</span>
                    </p>
                    <p>
                        <span >月供</span>
                        <span class="moneySty">{{detailData.mouthPayment}}元</span>
                    </p>
                </div>
            </div>
        </div>
        </div>
        <div class="separate"></div>
        <div :class="{'fixed': !isWX}">
        <div class="tab flex f15 color-999">
            <div class="tabItem flex_1" @click="showTab(1)" v-bind:class="{active:showFlag==1}">车辆介绍</div>
            <div class="tabItem flex_1" @click="showTab(2)" v-bind:class="{active:showFlag==2}">详细配置</div>
            <div class="tabItem flex_1" @click="showTab(3)" v-bind:class="{active:showFlag==3}">购车流程</div>
        </div>
        </div>
        <div class="intro carInfo" v-show='showFlag==1' :class="{'app': !isWX}">
            <p class="baseCon">
                <span>基本配置</span>
            </p>
            <ul>
                <li>
                    <span class="configName">车身结构</span>
                    <span class="configContent">{{detailData.carStructrue}}</span>
                </li>
                <li>
                    <span class="configName">长/宽/高</span>
                    <span class="configContent">{{carExtended.longAndWide}}</span>
                </li>
                <li>
                    <span class="configName">发动机</span>
                    <span class="configContent">{{detailData.engine}}</span>
                </li>
                <li>
                    <span class="configName">变速箱</span>
                    <span class="configContent">{{detailData.gearbox}}</span>
                </li>
                <li>
                    <span class="configName">驱动方式</span>
                    <span class="configContent">{{carExtended.driveMode}}</span>
                </li>
                <li>
                    <span class="configName">燃料形式</span>
                    <span class="configContent">{{carExtended.fuelForm}}</span>
                </li>
                <li>
                    <span class="configName">综合耗油</span>
                    <span class="configContent">{{carExtended.fuelConsumption}}</span>
                </li>
                <li>
                    <span class="configName">车辆颜色</span>
                    <span class="configContent">{{carExtended.carColour}}</span>
                </li>
                <li>
                    <span class="configName">保修</span>
                    <span class="configContent">{{carExtended.warranty}}</span>
                </li>
                <li>
                    <span class="configName">最高时速</span>
                    <span class="configContent">{{carExtended.mostRate}}</span>
                </li>
                
                
            </ul>
            <p class="baseCon">
                <span>车型亮点</span>
            </p>
            <div class="introDetail" v-html="carExtended.details"></div>
        </div>
        <div class="carConfigure thin-border-top" v-show='showFlag==2' :class="{'app': !isWX}">
            <div class="tips">
                <div class="flex rightBox">
                    <div class="flex_1">
                        <span class="cir"></span>
                        标配
                    </div>
                    <div class="flex_1">
                        <span class="cir2"></span>
                        选配
                    </div>
                    <div class="flex_1">
                        <span class="gang">-</span>
                        无
                    </div>
                </div>
            </div>
            <div class="introDetail" v-html="carExtended.carConf"></div>
        </div>
        <div class="thin-border-top carInfo applyProcess" v-show="showFlag==3" :class="{'app': !isWX}">
            <ul>
                <li v-for="item in scheduleData">
                    <i class="icon iconfont icon-jindudian schedulePoint"></i>
                    <p class="f15">{{item}}</p>
                </li>
            </ul>
        </div>
        <div v-if="isWX==true">
        <div class="viewDetailBtn thin-border-top">
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
            <button class='viewDetail btn' v-on:click="submitBtn">车辆申请</button>
        </div>
        </div>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
        <loading v-if="showLoading"></loading>
        <div v-show="isClick" class="shadeInvite" @click="sure"></div>
    <div class="jiathis_style_32x32 InviteText" v-on:closeSharp="closeSharp" v-show="isClick">
    	<div class="shareType">
			<a class="jiathis_button_qzone"><span class="q_text">空间</span></a>
			<a class="jiathis_button_tsina"><span class="q_text">微博</span></a>
			<a class="jiathis_button_cqq"><span class="q_text">QQ</span></a>
			<a class="jiathis_button_weixin"><span class="q_text">微信</span></a>
		</div>
		<span  class="btnCancel" @click="sure">取消</span>
	</div>
	<div id="collect" class="collectPop">
		<span class="collectPopImg"><img src="static/img/about.png"/></span>
		{{collect.status}}
	</div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import '../css/swiper.css'
import '../css/common.css'
import '../../static/css/jia.css'
    export default{
        data(){
            return {
            	collect:{
            		status:''
            	},
            	collectInfo:{
            		id:'',
            		isCollect:''
            	},
                shareNumber: '',
                hideShare: false,
                showFlag: 1,
                price:0,
                isClick:false,
                carPicture: [],
                detailData: {},
                carExtended: {},
                alertData: {
                    show: false,
                    msg: "",
                },
                scheduleData: ["定金支付成功","填写认证信息","签署条约","等待发货","车辆发货","支付首付款、线下取车","每月月供","完成订单"],
                swiperOption: {
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loopAdditionalSlides: 0,
                    loop: true
                },
                value: 2221
            }
        },
        methods: {
        	init: function () {
        		let url = 'http://v3.jiathis.com/code/jia.js'
		        let script = document.createElement('script')
		        script.setAttribute('src', url)
		        document.getElementsByTagName('head')[0].appendChild(script)
		     },
		     shareClick:function(){
		     	this.isClick=true
		     },
		     collectClick:function(){
		     	this.$http.get(BASE_URL+'app/v1/applyForCar/'+this.$route.params.id).then(function(res){
		     		if(res&&res.body&&res.body.success){
		     			if(this.isLogin()){
		     				if(this.collectInfo.isCollect==false){
		     					this.collectInfo.isCollect=true;
		     					this.collectInfo.id=this.$route.params.id
		     					/*var param = JSON.parse(JSON.stringify(this.collectInfo));*/
		     					localStorage.setItem('collectInfo',JSON.stringify(this.collectInfo));
		     					this.collect.status="收藏成功";
		     				}else{
		     					this.collectInfo.isCollect=false;
		     					this.collectInfo.id=this.$route.params.id
		     					localStorage.setItem('collectInfo',JSON.stringify(this.collectInfo));
		     					this.collect.status="取消收藏"
		     				}
	     					document.getElementById("collect").classList.add("show");
	     					setTimeout(function(){
		     					document.getElementById("collect").classList.remove("show");
    						},3000)
		     				}else{// 微信环境
                                    this.$router.push({path: '/login',query:{pathName:'/carDetail/'+this.$route.params.id}});
                                }
		     		}
		     		
		     	})
		     },
        	sure: function () {
            	this.isClick=false
        	},
            closeSharp:function(){
                this.hideShare = false;
            },
            setStage(value){
            	this.price=value;
            },
            showTab(n){
                this.showFlag = n;
            },
            submitBtn(){
                if(this.$route.query.isShare){
                    var u = navigator.userAgent;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    // if(isAndroid){
                    //     location.href = "http://wx.yinlailease.com/version/1.1/cyt.apk";
                    // }
                    // if(isiOS){
                    //     // location.href = "http://itunes.apple.com/gb/app/yi-dong-cai-bian/id1260453607?mt=1260453607";
                    //     location.href = "https://itunes.apple.com/app/id1260453607";
                    // }
                    location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cheyilai.ycode.cn.cheyilai";
                }else{
                    this.$http.get(BASE_URL+'app/v1/applyForCar/'+this.$route.params.id).then(function(res){
                        if(res&&res.body&&res.body.success){
                            if(this.isLogin()){
                                this.$router.push({path: '/confirmOrder/'+this.$route.params.id});
                            }else{
                                // app环境
                                if(!this.isWX){
                                    this.$router.push({path: '/loginPage',query:{pathName:'/confirmOrder/'+this.$route.params.id}});
                                }else{// 微信环境
                                    this.$router.push({path: '/login',query:{pathName:'/confirmOrder/'+this.$route.params.id}});
                                }
                            }
                        }else{
                            this.alertData.show = true;
                            this.alertData.msg = res.body.data.errorMessage;
                        }
                    });
                }
            },
            getData(){
                var scope = this;
                scope.$http.get(BASE_URL + 'app/v1/car/'+scope.$route.params.id).then(function(res){
                    this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        scope.detailData = res.body.data.carItem;
                        scope.carPicture = res.body.data.carPicture;
                        scope.carExtended = res.body.data.carExtended;
                        scope.swiperOption.loopAdditionalSlides = res.body.data.carPicture.length;
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                });
            }
        },
        beforeCreate(){
            this.setDocumentTitle("车辆详情");
        },
        created(){
            this.showLoading = true;
            this.getData();
            document.body.scrollTop=0;
        },
        components: {
            swiper,
            swiperSlide,
        },
        mounted(){
        	this.init();
            if(!this.isWX){
                window.scope = this;
                window.callShare = function(){
                    window.scope.alertInvite();
                    let url = 'http://wx.yinlailease.com/' + location.href.substr(location.href.indexOf('#')) + '?isShare=true';
                    window.scope.getHostApp(function(hostApp){
                        hostApp.getUrl(url);
                    });
                }
            }
                
            setTimeout(function(){
                document.querySelector('.conBox').addEventListener('click',function(e){
                    var obj = e.target;
                    if(obj.tagName == 'P'){
                        console.log( )
                        if(obj.classList.contains('on')){
                            obj.classList.remove('on');
                            obj.parentNode.classList.add('conItem');
                        }else{
                            obj.classList.add('on');
                            obj.parentNode.classList.remove('conItem');
                        }
                    }
                });
            },500)
        }
    }
</script>
<style scoped>
.pd{
	position: relative;
    padding-bottom: 60px;
}
    .topBox{
    	z-index: -1;
        position: relative;
        width: 100%;
    }
    .share{
        position: absolute;
        right: 35px;
        bottom: -20px;
        width: 40px;
        z-index: 100;
    }
    .detailImg,.imgSty{
        display: block;
        width: 100%;
    }
    .carInfo{
        padding: 8px 20px;
    }
    .mgb-6{
        margin-bottom: 6px;
    }
    .moneySty{
        display: inline-block;
        width: 80px;
    }
    .classSty{
        margin-top: 18px;
        margin-bottom: 6px;
    }
    .configSty{
        margin: 8px 0;
    }
    .intro ul li{
        font-size: 12px;
        min-height: 37px;
        line-height: 37px;
        border-bottom: 1px solid #eee;
    }
    .configName{
        display: inline-block;
        width: 30%;
        float: left;
    }
    .configContent{
        display: inline-block;
        width: 69%;
        color: #666;
    }
    .applyProcess,.intro{
        padding-bottom: 50px;
    }
    .carConfigure {
        padding-bottom: 1px;
    }
    .introDetail{
        font-size: 15px;
        width: 100%;
        color: #666;
        line-height: 28px;
    }
    .applyProcess ul li{
        padding-left: 40px;
        position: relative;
        height: 45px;
        line-height: 45px;
    }
    .applyProcess ul li:before{
        position: absolute;
        content: "";
        width: 1px;
        height: 33px;
        left: 13px;
        top: 29px;
        background-color: #fd9c28;
    }
    .applyProcess ul li:last-child:before{
        height: 0;
    }
    .schedulePoint{
        position: absolute;
        font-size: 28px !important;
        color: #fd9c28;
        left: 0px;
    }

    .viewDetailBtn{
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        text-align: center;
        z-index: 99999;
    }
    .btn{
        display: block;
        float: left;
        height: 50px;
        border: none;
        outline: none;
    }
    .onlineService{
        width: 38%;
        background-color: #fff;
    }
    .viewDetail{
        width: 62%;
        background-color: #ed8521;
        color: #fff;
        font-size: 17px;
    }
    .part{
        width: 50%;
    }
    .separate{
        width: 100%;
        height: 4px;
        background: #eaeaea;
    }
    .tab{
        height: 45px;
        line-height: 45px;
        text-align: center;

    }
    .tabItem{
        border-bottom: 1px solid #eee;
    }
    .tabItem.active{
        color: #ed8521;
        border-bottom: 1px solid #ed8521;
    }
    .tips{
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        color: #333;
        text-align: center;
        background: #f2f2f2;
    }
    .rightBox{
        width: 201px;
        float: right;
    }
    .cir{
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 1px solid #333;
        background: #333;
    }
    .cir2{
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 1px solid #333;
    }
    .cir,.cir2,.gang{
        margin-right: 5px;
    }
    .baseCon{
    	padding-top: 50px;
    	padding-bottom: 30px;
        font-size: 14px;
        text-align: center;
        color: #999;
    }
    .baseCon span{
        position: relative;
    }
    .baseCon span:before,.baseCon span:after{
        content: "";
        position: absolute;
        width: 48px;
        height: 1px;
        background-color: #c6c6c6;
        top: 10px;
        left: -68px;
    }
   .baseCon span:after{
        left: 74px;
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
    .topShare{
    	width: 50px;
    	position:absolute;
    	top:0;
    	right: 0;
    }
    .topCollect{
    	width: 50px;
    	position:absolute;
    	top:0;
    	right: 50px;
    }
    .topShare img{
    	width: 50px;
    }
    .InviteText .inviteInfo>.InviteNum{
    	float: left;
	}
	.InviteText .inviteInfo>.InviteNum>em{
	    font-style: normal;
	    color: #ed852e;
	}
	.InviteText .inviteInfo>.InviteRule{
	    float: right;
	}
	.InviteText .inviteInfo>.InviteRule>i{
	    font-size: 0.32rem;
	}
	.shareType {
		overflow: hidden;
    	text-align: center;
	    padding: 0 0.6rem;
	    margin-top: 1.64rem;
	    font-size: 11px;
	}
	.InviteText {
		padding: 10px;
	    width: 100%;
	    height: 6rem;
	    background: white;
	    z-index: 999;
	    font-size: 0.3733rem;
	    position: fixed;
	    bottom: 0;
	    z-index: 999999;
	}
	.q_text{
		font-size: .4rem;
	    margin-left: -20px;
	    width: 100px;
	    display: block;
	    margin-top: 65px;
	}
	.InviteText .btnCancel {
	    display: block;
	    width: 100%;
	    position: absolute;
	    bottom: 0;
	    text-align: center;
	    line-height: 1.173rem;
	    border-top: 1px solid #eee;
	}
	.shadeInvite {
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    background: rgba(0, 0, 0, 0.3);
	    z-index: 999999;
	}
	.collectPop{
		display: none;
		padding: 20px;
	    color: #fff;
	    text-align: center;
	    font-size: .4rem;
	    z-index: 2;
	    left: 25%;
	    background: #71717194;
	    width: 50%;
	    top: 40%;
	    position: fixed;
	}
	.show{
		display: block;
	}
	.collectPopImg{
		display: block;
	}
	.fixed{
		z-index: 1;
		width: 100%;
		background: #fff;
		position: fixed;
		top:0;
	}
	.fixed .intro{
		width: 100%;
		background: #fff;
		position: fixed;
		top:0;
	}
	.app{
		margin-top: 40px;
	}
</style>