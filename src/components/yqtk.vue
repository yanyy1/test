<template>
    <section>
        <div class="shadeYqtk" @click="sure"></div>
        <div class="yqText">
            <p>什么是逾期赔偿条令</p>
            <div>{{tip}}</div>
            <span @click="sure">知道啦</span>
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
.shadeYqtk {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
    border-radius: 10px;
}

.yqText {
    width: 60%;
    background: white;
    z-index: 999;
    font-size: 0.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    border-radius: 10px;
    opacity: 0;
    -webkit-animation: moveDown 0.3s linear;
    animation: moveDown 0.3s linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    z-index: 999999;
}

.yqText>p {
    font-size: 0.4rem;
    text-align: center;
    padding: 0.2rem 0;
    border-bottom: 2px solid #d8d8d8;
    font-weight: bold;
    margin-bottom: 0.4rem;
}

.yqText>div {
    text-align: center;
    max-height: 6rem;
    min-height: 1rem;
    overflow-y: auto;
    background-color: white;
    padding: 0 0.4rem;
    text-indent: 10mm;
    font-size: 0.4rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.yqText>span {
    display: inline-block;
    width: 100%;
    line-height: 1.2rem;
    text-align: center;
    color: #ed852e;
    border-top: 1px solid #d8d8d8;
}

@keyframes moveDown {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes moveDown {
     from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-moz-keyframes moveDown {
     from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-ms-keyframes moveDown {
     from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>