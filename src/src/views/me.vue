<template>
    <section id="mine">
        <div class="head" :class="{app:!isWX}">
            <router-link v-if="isWX" to="/recommend"><img class="msg" src="static/img/msg.png"></router-link>
            <img  :src="stateImg"  @click="login"/>
            <p class="login">{{state}}</p>
        </div>
        <div class="modBox flex">
            <div class="flex_1">
                <img src="static/img/jijin.png" @click="jijin"/>
                <p>银来基金会</p>
            </div>
            <div class="flex_1 line">
                <img src="static/img/myorder.png" @click="myOrder"/>
                <p>我的订单</p>
            </div>
            <div class="flex_1">
                <img src="static/img/myorder.png" @click="applyBill"/>
                <p>发票申请</p>
            </div>
        </div>
		<div class="authen listSty"  @click="toPersonData">
            <div class="floatLeft">
                <img src="static/img/myauth.png"/>
                <span>我的认证</span>
            </div>
            <div class="floatRight">
                <span class="auth">{{authText}}</span>
                <i class="icon iconfont icon-jiantou"></i>
            </div>
        </div>
        
        <div class="midBox">
            <div class=" listSty thin-border-bottom"  @click="alertInvite">
                <div class="floatLeft">
                    <img src="static/img/invite.png"/>
                    <span>推荐邀请</span>
                </div>
                <div class="floatRight">
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>

            <div class=" listSty thin-border-bottom"  @click="help">
                <div class="floatLeft">
                    <img src="static/img/help.png"/>
                    <span>帮助中心</span>
                </div>
                <div class="floatRight">
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>
            <div class=" listSty thin-border-bottom"  @click="carCollect">
                <div class="floatLeft">
                    <img src="static/img/help.png"/>
                    <span>收藏车辆</span>
                </div>
                <div class="floatRight">
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>
            <a href="tel:400-098-2118" v-on:click="takePhone()">
                <div class=" listSty"  @click="">
                    <div class="floatLeft">
                        <img src="static/img/tel.png"/>
                        <span>客服热线</span>
                    </div>
                    <div class="floatRight">
                        <span class="tel">400-098-2118</span>
                        <i class="icon iconfont icon-jiantou"></i>
                    </div>
                </div>
            </a>
        </div>

        <div class="botBox">
            <div class=" listSty thin-border-bottom"  @click="notice">
                <div class="floatLeft">
                    <img src="static/img/guanfang.png"/>
                    <span>官方公告</span>
                </div>
                <div class="floatRight">
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>

            <div class=" listSty thin-border-bottom"  @click="aboutUs">
                <div class="floatLeft">
                    <img src="static/img/about.png"/>
                    <span>关于我们</span>
                </div>
                <div class="floatRight">
                    <i class="icon iconfont icon-jiantou"></i>
                </div>
            </div>
        </div>
        <div class="set listSty"  @click="set">
            <div class="floatLeft">
                <img src="static/img/set.png"/>
                <span>设置</span>
            </div>
            <div class="floatRight">
                <i class="icon iconfont icon-jiantou"></i>
            </div>
        </div>


         <!-- <span  v-show="backLogin" @click="back" class="back">退出登录</span>  -->
        <bottomNav v-bind:todo="active"></bottomNav>
        <div v-show="isClick" class="shadeInvite" @click="sure"></div>
        <div class="jiathis_style_32x32 InviteText" v-on:closeSharp="closeSharp" v-show="isClick">
        	<div class="inviteInfo">
                <span class="InviteNum">我的邀请码:<em>{{shareNumber}}</em></span>
                <span class="InviteRule" @click="toRules">活动规则<i class="iconfont icon-gengduo"></i></span>
           	</div>
        	<div class="shareType">
				<a class="jiathis_button_qzone"><span class="q_text">空间</span></a>
				<a class="jiathis_button_tsina"><span class="q_text">微博</span></a>
				<a class="jiathis_button_cqq"><span class="q_text">QQ</span></a>
				<a class="jiathis_button_weixin"><span class="q_text">微信</span></a>
			</div>
			<span  class="btnCancel" @click="sure">取消</span>
		</div>
        
    </section>
</template>
<script>

import bottomNav from "../components/bottomNav.vue"
import '../../static/css/jia.css'
export default{
    data(){
        return{
            state:'请登录',
            stateImg: 'static/img/newnologin.png',
            active: {
                    path: this.$route.path,
                    name: this.$route.name,
                },
            isClick:false,
            hideShare:false,
            shareNumber:'',
            isAuth:false,
            authText:'立即认证',
            authStatus: false,
            authActive: 'authActive',
            authNumber:''

        }
    },
	mounted () {
      this.init()
    },
    methods:{
    	init: function () {
    		let url = 'http://v3.jiathis.com/code/jia.js'
	        let script = document.createElement('script')
	        script.setAttribute('src', url)
	        document.getElementsByTagName('head')[0].appendChild(script)
	     },
    	sure: function () {
            this.isClick=false
        },
        set(){
            if(this.isLogin()){
                this.$router.push({path: '/set'});
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
        aboutUs(){
            this.$router.push({path: '/aboutUs'});
        },
        notice(){
            this.$router.push({path: '/notice'});
        },
        help(){
            if(this.isLogin()){
                this.$router.push({path: '/helpCenter'});
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
        carCollect(){
        	if(this.isLogin()){
                this.$router.push({path: '/carCollect'});
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
        jijin(){
            if(this.isLogin()){
                this.$router.push({path: '/carService/ylFoundation'});
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
        getPath: function(){
            return this.isWX ? '/login' : '/loginPage'
        },
        login:function(){
            if(this.isLogin()){
                
                this.$router.push({path: '/personEdit'})
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
         myOrder:function(){
            if(this.isLogin()){
                
                this.$router.push({path: '/myOrder'})
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
         applyBill:function(){
            if(this.isLogin()){
                
                this.$router.push({path: '/billList'})
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
        initInfo:function(){
            
            if(this.isLogin()){
                this.state = this.isLogin();
                this.stateImg = "static/img/newlogin.png";
            }
            var username = localStorage.getItem('username');
            var token = localStorage.getItem('token');
            this.$http.get(BASE_URL+'app/v1/user/userInfo?username='+username,{headers:{access_token:token}}).then((res)=>{
                if (res.body.success) {
                    this.shareNumber = res.body.data.user.popularizecode;
                }
            }).then(()=>{
                this.initAuth();
            })
        },
        initAuth:function(){
                if (!localStorage.getItem('username')) {
            }else{
                this.isAuth = true;
                var token = localStorage.getItem('token');
                var username = localStorage.getItem('username');
                this.$http({
                    method: "POST",
                    url: BASE_URL+"app/v1/user/auditResult",
                    params: {
                        username: username
                    },
                    headers:{access_token: token}
                }).then((res)=>{
                    this.authNumber = res.body.data.status;
                    if (this.authNumber == 2) {
                        this.authText = "已认证";
                        this.authStatus = true;
                    }else if(this.authNumber == 1){
                        this.authText = "审核中";
                        this.authStatus = true;
                    }
                }, (err)=>{})
            }
        },
        toPersonData:function(){
            if(this.isLogin()){
                if (this.authNumber !== 2) {
                    this.$router.push({path:'/IDinfo'});
                }
                if (this.authNumber == 1) {
                    this.$router.push({path:'/submitSuccess'});
                }
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
                
        },
        
        alertInvite:function(){
            if(this.isLogin()){
            	this.isClick=true;
                this.hideShare = true;
            }else{
                this.$router.push({path:this.getPath(),query:{pathName:'me'}});
            }
        },
         toRules:function(){
             this.$router.push({path: '/activeRules'});
        },
        closeSharp:function(){
            this.hideShare = false;
        }
    },
     components:{
        bottomNav
    },

    beforeCreate: function(){
       
        this.setDocumentTitle("我的");
    },
    created(){
        this.initInfo();
    }
}
</script>

<style scoped>
    #mine{
        /*position: relative;
    top: -1px;*/
        padding-bottom: 1.4rem; 
        color: #333333;
        font-size: 0.4534rem;
        background-color: #F5F4F9;
    }
    .head{
        height: 3.627rem;
        background: -webkit-linear-gradient(top, #F8AF67 , #EE851F);
        background: linear-gradient(to bottom, #F8AF67,#EE851F);
        text-align: center;
        padding-top: 0.4rem;
        margin-bottom: 0.2667rem;
        position: relative;
    }
    .app.head{
        position: fixed;
        width: 100%;
        top: -1px;
    }
    .app + .modBox{
        padding-top: 3.893rem;
    }
    .head img{
        width: 2.08rem;
        height: 2.08rem;
    }
    .head img.msg{
        position: absolute;
        right: 0.4rem;
        top: 0.4rem;
        width: 0.5867rem;
        height: 0.5867rem;
    }
    .head .login{
        color: #fff;
    }
    .modBox{
        text-align: center;
        
        margin-bottom: 0.2667rem;
        font-size: 0.4267rem;
    }
    .line{
        border-left: 1px solid #E7E7E7;
        border-right: 1px solid #E7E7E7;
    }
    .modBox div{
        padding-top: 0.32rem;
        padding-bottom: 0.32rem;
        background-color: #fff;
    }
    .modBox div img{
        width: 0.8rem;
        height: 0.8rem;
    }
    .listSty{
        background-color: #fff;
        height: 1.1733rem;
        position: relative;
        line-height: 1.1733rem;
        padding: 0 0.4rem;
        overflow: hidden;
    }

    .listSty div img{
        width: 0.64rem;
        height: 0.64rem;
        position: relative;
        top: 0.145rem;
    }
    .authen{
        margin-bottom: 0.2667rem;
    }
    .auth{
        color: #EF851C;
        font-size: 0.3733rem;
    }
    .tel{
        color: #999;
        font-size: 0.3733rem;
    }
    .icon{
        font-weight: bold;
        color: #878787;
    }
    .midBox,.botBox{
        margin-bottom: 0.2667rem;
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
</style>