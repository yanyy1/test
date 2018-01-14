<template>
    <section id="help">
        <ul class="helpList">
            <router-link tag="li" to="/helpDetail"><span>帮助:</span><span>关于车丫头帮助公告</span><i class="iconfont icon-gengduo"></i></router-link>
        </ul>
    </section>
</template>
<script type="text/javascript">
export default{
     beforeCreate: function(){
        this.setDocumentTitle("帮助中心");
    },
}
</script>
<style src="../common.css"></style>
<style scoped>
    #help{padding-bottom: 1.4rem;font-size: 0.4rem}
    #help .helpList{
          width:100%;
        overflow:auto;
    }
    #help .helpList>li{
       padding: 0 0.4rem;
        line-height: 1.334rem;
        border-bottom:1px solid #eee;
    }
    #help .helpList>li>i{
        float: right;
        font-size: 0.4rem;
        color: black;
    }
</style>