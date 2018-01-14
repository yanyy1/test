<template>
    <section>
        <div class="shadeTips" @click="sure"></div>
        <div class="tipText">
            <div>{{tip}}</div>
            <span class="ok" @click="sure">确定</span>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    props: ["tip"],
    methods: {
        sure: function () {
            this.$emit("closeTips");
        }
    }
}
</script>
<style type="text/css">
.shadeTips {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
    border-radius: 10px;
}

.tipText {
    width: 80%;
    background: white;
    z-index: 999;
    font-size: 0.3733rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    border-radius: 10px;
    z-index: 999999;
}

.tipText>div {
    text-align: center;
    max-height: 9rem;
    min-height: 1rem;
    overflow-y: auto;
    background-color: white;
    padding: 0.6667rem 0.4rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.tipText>span {
    display: inline-block;
    width: 100%;
    line-height: 1.2rem;
    text-align: center;
    border-top: 1px solid #d8d8d8;
}
.ok{
    color: #3577cd;
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