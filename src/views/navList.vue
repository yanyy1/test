<template>
     <ul class="details">
            <router-link v-for="num in arr" :key="num.id" tag="li" :to="num.path">
                {{ num.text }}
            </router-link>
            <li><a href="tel:400-098-2118" v-on:click="takePhone()">客服热线</a></li>
            <router-link tag="li" to="/recommend" v-show="info">
                消息通知
            </router-link>
             <li @click="alertInvite" v-show="hide">推荐邀请</li>
        </ul>
</template>
<script>
export default{
    props:["arr"],
    data(){
        return {
            hide:false,
            info:true
        }
    },
    methods:{
        alertInvite:function(){
            this.$emit('alertInvite');
        }
    },
    created(){
        var username = localStorage.getItem('username');
        if (username && !this.isWX) {
            this.hide = true;
        }
        if (!this.isWX) {
            this.info = false;

        }
    }
}
</script>
<style src="../common.css"></style>
<style>
    .details{padding: 0.334rem 0;border-top: 1px solid #eee;}
    .details>li{
        text-align: center;
        padding: 0.334rem 0;
    }
</style>