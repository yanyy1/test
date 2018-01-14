<template>
<section id="oneKeyBill">
    <p class="common"><input type="checkbox" name="" v-model="allSelect" ><i class="iconfont icon-yuanquan"></i><span>全选</span></p>
    <ul>
        <li v-for="(item,index) in listes" class="common"><input type="checkbox" name="" :id="index" @click="select(index)" v-model="item.checked"><i class="iconfont icon-yuanquan"></i><span>{{ item.name}}:<span>{{ item.number}}元</span></span><span></span></li>
    </ul>
    <button  @click="openBill">申请开票</button>
    <billAlert :hideblock="showDown" v-on:cancelBill="hideAlert"></billAlert>
</section>

</template>
<script>
import billAlert from './billAlert.vue'
export default{
    data(){
        return{
            // allSelect: [],
            listes:[
               {checked: "true",name: "定金发票", number: "4999"},
               {checked: "true",name: "第一期月供发票", number: "1598"},
               {checked: "true",name: "第二期月供发票", number: "1598"},
               {checked: "true",name: "第三期月供发票", number: "1598"},
            ],
            showDown:false
        }
    },
    methods:{
        select(index){
            var  oneKey = document.getElementById('oneKeyBill');
            var  oUl = oneKey.getElementsByTagName('ul')[0];
            var  oLi = oUl.getElementsByTagName('li');
            if (this.listes[index].checked) {
               oLi[index].childNodes[1].style.color = "gray";
            }else{
                oLi[index].childNodes[1].style.color = "orange";
            }
        },
         hideAlert: function(){
            this.showDown = !this.showDown;
        },
        openBill: function(){
            this.showDown = !this.showDown;
        }
    },
    computed:{
        allSelect(event){
            var ev = event || window.event;
            var target = ev.target;
            console.log(target);
        }
    },
    components:{
        billAlert
    }
}
</script>
<style src="../common.css"></style>
<style>
#oneKeyBill{font-size: 0.4rem;}
#oneKeyBill .common{padding: 0 0.4rem;line-height: 1.334rem;position: relative;border-bottom: 1px solid gray;}
#oneKeyBill .common>input[type="checkbox"]{width: 0.4rem;height: 0.4rem;z-index: 9999;position: absolute;top: 0.467rem;opacity: 0;}
#oneKeyBill .common .icon-yuanquan{font-size: 0.6rem;left: 0.4rem;z-index: -1;position: absolute;color: orange;}
#oneKeyBill .common >span{margin-left: 0.7rem;}
#oneKeyBill .common >span>span{margin-left: 0.2rem;}
#oneKeyBill>button{width: 100%;height: 1.1734rem;position: fixed;bottom: 0;font-size: 0.4rem;color: white;background: #ed841f;border:none;outline: none;}
</style>