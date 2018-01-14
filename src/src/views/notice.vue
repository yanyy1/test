<template>
    <section id="notice">
        <ul class="noticeList">
            <router-link tag="li" to="/noticeDetail"><span>公告:</span><span>关于车丫头版本更新公告</span><i class="iconfont icon-gengduo"></i></router-link>
        </ul>
    </section>
</template>
<script type="text/javascript">
export default{
     beforeCreate: function(){
        this.setDocumentTitle("官方公告");
    },
}
</script>
<style src="../common.css"></style>
<style scoped>
    #notice{padding-bottom: 1.4rem;font-size: 0.4rem}
    #notice .noticeList{
        width:100%;
        overflow:auto;
    }
    #notice .noticeList>li{
        padding: 0 0.4rem;
        line-height: 1.334rem;
        border-bottom:1px solid #eee;
    }
    #notice .noticeList>li>i{
        float: right;
        font-size: 0.4rem;
        color: black;
    }
</style>