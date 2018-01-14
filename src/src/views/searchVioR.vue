<template>
    <div class="content">
        <p class="zj">您最近查询的车辆信息：</p>
            <div @click="toList(item)" v-for="(item,index) in history" class="history">
                <left-slider :index="index" @deleteItem="deleteItem(index)" >
                    {{item.carNumber}}
                    <i class="icon iconfont icon-jiantou"></i>
                </left-slider>
            </div>

      <!--   <div class="history" v-for="item in history" @click="toList(item)">
            {{item.carNumber}}
            <i class="icon iconfont icon-jiantou"></i>
        </div> -->
        <div class="search" @click="toSearch()">
            查询新车辆
            <i class="icon iconfont icon-jiantou"></i>
        </div>
        <confirmModal v-if="confirmData.show" v-bind:todo="confirmData"></confirmModal>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
    </div>
</template>
<script>
import leftSlider from "../components/leftSlider.vue"
    export default{
        data(){
            return{
                history: [],
                confirmData: {
                    show: false,
                    msg: "",
                },
                toastData:{
                    show: false,
                    text: ""
                },
            }
        },
        methods:{
            deleteItem: function(index) {
                this.confirmData.msg = '你要删除这辆车的违章信息吗';
                this.confirmData.show = true;
                this.confirmData.confirm = (scope)=>{
                    this.history.splice(index,1);
                    localStorage.setItem('history',JSON.stringify(this.history));
                    this.toastData.text = "删除成功";
                    this.toastData.show = true;
                    if(this.history.length==0){
                        this.$router.push({path: 'searchVio'});
                    }
                }
            },
            toSearch(){
                this.$router.push({path: '/searchVio'});
            },
            toList(e){
                this.$router.push({path: '/vioList',query: e});
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("违章查询");
        },
        created(){
            this.history = JSON.parse(localStorage.getItem('history')).reverse();
        },
        components:{
            leftSlider,
        }
    }
</script>
<style scoped>
.content{
    width: 100%;
    height: 100%;
    background-color: #F5F4F9;
    font-size: 16px;
}
    .zj{
        padding: 24px 0 10px 20px;
    }
    .history{
        background-color: #fff;
        padding-left: 15px;
        line-height: 49px;
        height: 50px;
        border-bottom: 1px solid #F3F3F3;
    }
    .icon-jiantou{
        font-size: 16px;
        float: right;
        color: #333;
        margin-right: 15px;
        -webkit-transform: translate(0,0) !important;
        transform: translate(0,0) !important;
    }
    .search{
        background-color: #fff;
        padding-left: 15px;
        line-height: 50px;
        color: #F08922;
    }
</style>