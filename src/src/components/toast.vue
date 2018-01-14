<template>
    <div id="toastEle" class="toast">
        <div class="ui-toast-padding">{{todo.text}}</div>
    </div>
</template>
<script>
    export default{
        props: ['todo'],
        
        created: function(){
            var scope = this;
            setTimeout(function(){
                var toastEle = document.querySelector("#toastEle");
                toastEle.style.display = 'block';
                toastEle.style.opacity = 1;
                toastEle.style.marginTop = -Math.round(toastEle.offsetHeight / 2) + 'px';
                toastEle.style.marginLeft = -Math.round(toastEle.offsetWidth / 2) + 'px';
             },1);
            setTimeout(function () {
                toastEle.style.opacity = 0;
                setTimeout(function(){
                    scope.todo.show = false;
                },1000)
            }, 1000);
        }
    }
</script>
<style scoped>
    .toast {
        max-width: 90%;
        color: #eee;
        border-radius: 5px;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 30170;
        -webkit-box-shadow: 0 1px 10px rgba(0,0,0,.5);
        transition: opacity 1s;
        -webkit-transition: opacity 1s;
        text-align: center;
        display: none;
    }
    .toast .ui-toast-padding {
        border-radius: 5px;
        background: rgba(0,0,0,.7);
        padding: 10px 15px;
        color: #fff;
        word-break: break-all;
        font-size: 14px;
    }
</style>