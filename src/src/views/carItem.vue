<template>
<section id="carItem" @click="target">
    <div class="funds">
            <div class="fundsPic"><!-- <span><img :src="infoObj.url" /></span> --><img :src="infoObj.url" /></div>
            <div class="fundsInfo">
                <p>{{ infoObj.brandTopName }} {{infoObj.brandSecondName}}</p>
                <div class="carModel">{{infoObj.type}}</div>
                <div class="nper">金融方案: <span>{{financeId}}期</span></div>
                <div class="firstPayment">首付<span>{{downPayment}}元</span></div>
                <div class="monthPayment">月供<span>{{mouthPayment}}元</span></div>
            </div>
        </div>
</section>
</template>
<script>
export default{
    props:["infoObj","financeId",'downPayment','mouthPayment'],
    methods:{
        target:function(){
            this.$emit("target");
        }
    }
}
</script>
<style>
#carItem{
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;
}
    #carItem .funds{
        width: 100%;
        height: auto;
        display: flex;
        display: -webkit-flex;
        margin-top: 0;
        color: #333333;
        /*padding-top:0.5rem;*/
        /*border-bottom:1px solid #eee;*/
        overflow:auto;
    }
    #carItem .fundsPic{
        /*width: 54%;*/
        width: 5.413rem;
        height: auto;
        flex: none;
        -webkit-flex:none;
    }
   /* #carItem .fundsPic>span{
        display: block;
        width: 4.3867rem;
        height: auto;
        margin: 0 auto;
        margin-top: 1rem;
    }
    #carItem .fundsPic>span>img{
        width: 100%;
    }*/
    #carItem .fundsPic>img{
        width: 100%;
    }
    #carItem .fundsInfo{
        /*width: auto;*/
        flex: 1;
        -webkit-flex:1;
        /*width: 46%;*/
        height: auto;
    }
    #carItem .fundsInfo>p{
        font-size: 0.4534rem;
        /*margin-top: 0.5rem;*/
        color: #333333;
    }
    #carItem .carModel,#carItem .nper{
        font-size: 0.32rem;
        margin-top: 0.15rem;
        /*overflow-x: hidden;*/
    }
    #carItem .firstPayment,#carItem .monthPayment{
        margin-right: 1.2534rem;
        color: #fe8255;
        font-size: 0.42rem;
        margin-top: 0.15rem;
    }
    .firstPayment>span:last-child,.monthPayment>span:last-child{
        float: right;
    }
    /*#carItem */
</style>