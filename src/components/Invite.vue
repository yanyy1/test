<template>
    <section>
        <div class="shadeInvite" @click="sure"></div>
        <div class="InviteText">
           <div class="inviteInfo">
                <span v-if="shareNumber" class="InviteNum">我的邀请码:<em>{{shareNumber}}</em></span>
                <span class="InviteRule" @click="toRules">活动规则<i class="iconfont icon-gengduo"></i></span>
           </div>
           <ul class="shareType">
            <li v-for="(item,index) in shareType" @click="share(index)">
                <img :src="item.path">
                <span>{{ item.text }}</span>
            </li>
        </ul>
         <span  class="btnCancel" @click="sure">取消</span>
        </div>

       
    </section>
</template>
<script type="text/javascript">
export default {
    props: ["shareNumber"],
    data(){
        return{
            shareType:[
                {path:'static/img/weibo.png',text:'微博'},
                {path:'static/img/wechat.png',text:'微信'},
                {path:'static/img/pengyouquan.png',text:'朋友圈'},
                {path:'static/img/qq.png',text:'QQ'},
                {path:'static/img/kongjian.png',text:'空间'}
            ]
        }
    },
    methods: {
        sure: function () {
        	this.$emit("closeSharp");
        },
        share:function(id){
            this.getHostApp(function(hostApp){
                    hostApp.share(id);
                });

        },
        toRules:function(){
             this.$router.push({path: '/activeRules'});
        }
    }
}
</script>
<style type="text/css">
.shadeInvite {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
}

.InviteText {
    width: 100%;
    height: 5rem;
    background: white;
    z-index: 999;
    font-size: 0.3733rem;
    position: fixed;
    bottom: 0;
    z-index: 999999;
}
.InviteText .inviteInfo{
	margin-bottom: 0.64rem;
    line-height: 1.173rem;
    padding: 0 1rem;
    font-size: 15px;
    border-bottom: 1px solid #eee;
    overflow: auto;
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
.shareType{
    padding: 0 0.6rem;
    margin-top: 0.64rem;
    font-size: 11px;
}
.shareType>li{
    width: 20%;
    height: auto;
    text-align: center;
    float: left;
    padding: 0 0.3rem;
}
/*.shareType>li:not(:first-child){
    margin-left: 0.66rem;
}*/
.shareType>li>img{
    width: 100%;
}
.InviteText .btnCancel{
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 1.173rem;
    border-top: 1px solid  #eee;
}




/*
@keyframes  moveDown{
   from {
    opacity: 0;
    left: 50%;
    top: 0;
    transform: translate(-50%,0);
    -webkit-transform: translate(-50%,0);
   }
    to {
        opacity: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    }
}
 */
</style>