<template>
    <div class="proMask" v-if="todo.show">
        <div class="proBox">
            <div class="item" v-for="item in proList" @click="select(item)"><p>{{item}}</p><img src="static/img/pro.png"></div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['todo'],
        data(){
            return{
                proList: ['粤','苏','浙','皖','闽','鲁','豫','湘','辽','川','渝','陕','新','藏','冀','京','吉','鄂','青','宁','津','沪','黑','云']
            }
        },
        methods:{
            select(item){
                this.$emit('pro',item);
                this.todo.show = false;
            }
        }
    }
</script>
<style>
    .proMask{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .proBox{
        position: fixed;
        width: 100%;
        bottom: 0;
        font-size: 15px;
        background-color: #D8D8D8;
        overflow: hidden;
        padding: 0.1333rem 0.2rem;
    }
    .proBox .item{
        width: 1.28rem;
        height: 1.12rem;
        text-align: center;
        line-height: 1.12rem;
        float: left;
        margin: 0.16rem;
        position: relative;
    }
    .proBox .item p{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
    }
    .proBox .item img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
    }
</style>