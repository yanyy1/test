<template>
    <section id="billAlert" v-show="hideblock">
        <div class="content">
            <div><span><span>发票抬头</span></span><input type="text" required="required" name="title"  v-model="title" ></div>
            <div><span><span>收获地址</span></span><input type="text" required="required" name="address"  v-model="address"></div>
            <div><span><span>备注</span></span><input type="text" name="remark"  v-model="remark"></div>
            <div><button @click="cancelBill()">取消</button><button @click="applyBill">申请开票</button></div>
        </div>
    </section>
</template>
<script>
export default {
    props:["hideblock","bt","dz","bz"],
    data(){
        return{
            title:'',
            address:'',
            remark: ''
        }
    },
    watch:{
        title:function(val){
            this.$emit('InvoiceTitle',val);
        },
        address:function(val){
            this.$emit('InvoiceAddress',val);
        },
        remark:function(val){
            this.$emit('InvoiceRemark',val);
        }
    },
    methods:{
        cancelBill: function(){
            this.$emit('cancelBill');
        },
        applyBill:function(){
            this.$emit('applyBill');
            this.title = '';
            this.address = '';
            this.remark = '';
        }
    },
    computed:{
        getTitle:function(){
            return this.bt;
        },
        getAddress:function(){
            return this.dz;
        },
        getRemark:function(){
            return this.bz;
        },
        fullInfo:function(){
            this.title = this.getTitle;
            this.address = this.getAddress;
            this.remark = this.getRemark
        }
    },
     beforeCreate: function(){
        this.setDocumentTitle("发票申请");
    },
}
</script>
<style src="../common.css"></style>
<style>
    #billAlert{width: 100%;height: 100%;background: rgba(127,127,127,0.5);position: fixed;top: 0;}
    #billAlert .content{width: 100%;overflow:auto;background: white;position: fixed;bottom: 0;}
    #billAlert .content>div:not(:last-child){
        width: 100%;
        height: 1.3334rem;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
    }
    #billAlert .content>div>span{
            display: inline-block;
            width: 2.4934rem;
            text-align: center;
            flex: none;
            line-height: 0.6667rem;
    }
    #billAlert .content>div>span>span{
        display: inline-block;
        width: 100%;
        height: 0.6667rem;
        font-size: 0.454rem;
        margin-top: 0.3334rem;
        border-right: 1px solid gray;
    }
     #billAlert .content>div>input{
            line-height: 0.6667rem;
            border:none;
            outline: none;
            flex: 1;
            font-size: 0.454rem;
            text-indent: 10mm;
            color: #999;
    }
    #billAlert .content button{
        width: 50%;
        height: 1.1734rem;
        font-size: 0.4534rem;
        border:none;
        outline: none;

    }
    #billAlert .content button:nth-of-type(1){
        background: #f5f5f5;
        color: #333333;
    }
    #billAlert .content button:nth-of-type(2){
        background: #ed841f;
        color: white;
    }
</style>