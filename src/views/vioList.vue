<template>
    <div class="content">
        <div class="flex sta">
            <div class="flex_1" v-for="(item,index) in status" @click="selectStatus(item.id)">
                <span :class="item.id == selectId?'on':''">{{item.text}}</span>
            </div>
        </div>
        <div class="tit">
            <img src="static/img/pai.png"/><span>{{$route.query.carNumber}}</span>
            <!-- <div class="addZ">
                <img src="static/img/bj.png"/><span class="color-999">资料补充</span>
            </div> -->
        </div>
        <div class="canList">
            <div class="it" v-for="(item,index) in dataList" @click="toDetail(item)">
                <div class="itTop">
                    <p>
                        <span class="add">{{item.location}}</span>
                        <i class="icon iconfont icon-jiantou"></i>
                        <span class="biaoji can" v-if="item.newStatus==2">可办理</span>
                        <span class="biaoji ing" v-if="item.newStatus==3">办理中</span>
                        <span class="biaoji ok" v-if="item.newStatus==4">已完成</span>
                    </p>
                    <p class="time">{{item.time}}</p>
                    <p class="reason">{{item.reason}}</p>
                    <img v-if="item.str && item.select != 1" class="sel" src="static/img/nos.png" @click="sel(index,$event)">
                    <img v-if="item.str && item.select == 1" class="sel" src="static/img/sel.png" @click="sel(index,$event)">
                </div>
                <p class="chufa">
                    <span class="count">罚款{{item.count}}元</span>
                    <span>扣{{item.degree}}分</span>
                </p>
                <p v-if="item.canProcessMsg" class="canProcessMsg">{{item.canProcessMsg}}</p>
            </div>
            <p class="tip" v-if="selectId==1 && noList.length>0">以下违章不可代办，请自行前往车管所办理</p>
            <div v-if="selectId==1" class="it" v-for="(item,index) in noList"  @click="toDetail(item)">
                <div class="itTop">
                    <p>
                        <span class="add">{{item.location}}</span>
                        <i class="icon iconfont icon-jiantou"></i>
                        <span class="biaoji">不可办理</span>
                    </p>
                    <p class="time">{{item.time}}</p>
                    <p class="reason">{{item.reason}}</p>
                </div>
                <p class="chufa">
                    <span class="count">罚款{{item.count}}元</span>
                    <span>扣{{item.degree}}分</span>
                </p>
                <p v-if="item.canProcessMsg" class="canProcessMsg">{{item.canProcessMsg}}</p>
            </div>
        </div>
        <div class="botBox" v-if="selectId==1||(selectId==2&&dataList.length>0)">
            <img v-if="detail.num < detail.allNum || detail.num == 0" class="sel" src="static/img/nos.png" @click="selAll()">
            <img v-if="detail.num == detail.allNum && detail.num > 0" class="sel" src="static/img/sel.png" @click="selAll()">
            <div class="detail">
                <span class="numS"><span>{{detail.num}}</span>笔</span>
                <span class="numS mid"><span>{{detail.money}}</span>元</span>
                <span class="numS"><span>{{detail.degree}}</span>分</span>
            </div>
            <div class="btn" :class="detail.num > 0 ? 'can': ''" @click="handle()">立即办理</div>
        </div>
        <div class="noBox" v-if="showNo">
            <img class="noData" src="static/img/noData.png"/>
            <p v-if="selectId==1">该车辆暂无违章记录</p>
            <p v-if="selectId==2">该车辆暂无未办理违章</p>
            <p v-if="selectId==3">该车辆暂无办理中违章</p>
            <p v-if="selectId==4">该车辆暂无办理完违章</p>
        </div>
        
        <loading v-if="showLoading"></loading>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>

    </div>
</template>
<script>
    export default{
        data(){
            return{
                data: [],
                dataList: [],
                noList: [],
                alertData: {
                    show: false,
                    msg: "",
                },
                showLoading: false,
                status:[
                    {
                        text: '全部',
                        id: 1,
                    },
                    {
                        text: '未办理',
                        id: 2,
                    },
                    {
                        text: '办理中',
                        id: 3,
                    },
                    {
                        text: '已完成',
                        id: 4,
                    },
                ],
                selectId: 1
            }
        },
        computed:{
            showNo(){
                if(this.selectId==1){
                    if(this.dataList.length==0 && this.noList.length==0){
                        return true
                    }
                }else if(this.dataList.length==0){
                    return true
                }
                return false
            },
            detail(){
                let data = {
                    num: 0,
                    money: 0,
                    degree: 0,
                    allNum: 0,
                    uniqueCode: [],
                    cooperPoundage: 0,
                    list: []
                }
                this.dataList.forEach((e)=>{
                    if(e.newStatus == 2){
                        data.allNum ++;
                    }
                    if(e.select == 1){
                        data.num ++;
                        data.money += parseInt(e.count);
                        data.degree += parseInt(e.degree);
                        data.cooperPoundage += parseInt(e.cooperPoundage);
                        data.uniqueCode.push(e.secondaryUniqueCode );
                        data.list.push(e);
                    }
                });
                return data
            }
        },
        methods:{
            handle(){
                let orderDetail = {
                    openId: JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).openid,
                    carNumber: this.$route.query.carNumber,
                    money: this.detail.money,
                    serMon: this.detail.cooperPoundage,
                    degree: this.detail.degree,
                    num: this.detail.num,
                    uniqueCode: this.detail.uniqueCode.join(','),
                    list: this.detail.list,
                    info: {}
                }
                localStorage.setItem('orderDetail',JSON.stringify(orderDetail));
                

                if(this.detail.num > 0){
                    this.showLoading = true;
                    let token = localStorage.getItem('token');
                    this.$http({
                        method:'GET',
                        url: BASE_URL+"app/v1/illegal/materialCondition",
                        params: {
                            uniqueCode: this.detail.uniqueCode.join(','),
                        },
                        headers: {
                            access_token: token,
                        },
                    }).then((res) => {
                        this.showLoading = false;
                        let flag = 0;
                        for(let e in res.data.data){
                            if(e!='OrderId'){
                                flag += parseInt(res.data.data[e]);
                            }
                        }
                        if(flag){
                            let query = this.$route.query;
                            query.uniqueCode = this.detail.uniqueCode.join(',');

                            this.$router.push({path: '/supInfo',query: query});
                        }else{
                            this.$router.push({path: '/vioOrder',query: this.$route.query});
                        }
                        
                    }).catch((res)=>{
                        this.showLoading = false;
                        this.alertData.show = true;
                        this.alertData.msg = '系统异常';
                    });
                }
            },
            selAll(){
                let flag = this.detail.num==this.detail.allNum;
                this.dataList.forEach((e)=>{
                    if(e.newStatus == 2){
                        e.select =  flag ? 2 : 1;
                    }
                });
            },
            sel(index,e){
                e.stopPropagation();
                this.dataList[index].select = this.dataList[index].select==1 ? 2 : 1;
            },
            toDetail(e){
                localStorage.setItem('detailData',JSON.stringify(e));
                this.$router.push({path: '/vioDetail',query: this.$route.query});
            },
            getData(){
                this.showLoading = true;
                let token = localStorage.getItem('token');
                this.$http({
                    method:'GET',
                    url: BASE_URL+"app/v1/illegal/record",
                    params: {
                        carNumber: this.$route.query.carNumber,
                        carCode: this.$route.query.carCode,
                        carDriveNumber: this.$route.query.carDriveNumber,
                    },
                    headers: {
                        access_token: token,
                    },
                }).then((res) => {
                    this.showLoading = false;
                    if(res && res.data && res.data.success){
                        res.data.data.forEach((e)=>{
                            if(e.orderStatus == 0 || e.orderStatus == 1 || e.orderStatus == 5){
                                e.newStatus = 2;// 代办理
                                e.select = 1;
                                e.str = true;
                            }else if(e.orderStatus == 3 || e.orderStatus == 4){
                                e.newStatus = 3;// 办理中
                            }else if(e.orderStatus == 2 || e.orderStatus == 6){
                                e.newStatus = 4;// 完成
                            }
                            
                            if(e.canProcess != 0){
                                this.dataList.push(e);
                            }else{
                                e.newStatus = 6;// 不可办理
                                this.noList.push(e);
                            }
                        });

                        this.data = res.data.data;
                    }else{
                        this.alertData.show = true;
                        this.alertData.msg = res.body.data.errorMessage;
                    }
                }).catch((res)=>{
                    this.showLoading = false;
                    this.alertData.show = true;
                    this.alertData.msg = '系统异常';
                });
            },
            selectStatus(id){
                this.selectId = id;
                this.dataList = [];
                this.data.forEach((e)=>{
                    if(id == 1){
                        if(e.canProcess != 0){
                            this.dataList.push(e);
                        }
                    }else if(e.newStatus == id){
                        this.dataList.push(e);
                    }
                });
            }
        },
        beforeCreate: function(){
            this.setDocumentTitle("违章列表");
        },
        created(){
            localStorage.setItem('callUrl',location.href);
            this.getData();
        }
    }
</script>
<style scoped>
    .content{
        font-size: 14px;
        background-color: #F5F4F9;
        width: 100%;
        min-height: 100%;
        padding-bottom: 30px;
    }
    .sta{
        text-align: center;
        background-color: #fff;
    }
    .sta span{
        display: inline-block;
        height: 44px;
        line-height: 44px;
    }
    .sta span.on{
        border-bottom: 2px solid #F49435;
    }
    .tit{
        line-height: 50px;
        padding: 0 15px;
    }
    .tit img{
        display: block;
        width: 18px;
        height: 18px;
        float: left;
        margin-top: 16px;
        margin-right: 6px;
    }
    .addZ{
        float: right;
    }
    .it{
        overflow: hidden;
        padding-bottom: 30px;
        background-color: #F5F4F9;
    }
    .itTop{
        padding: 10px 15px 10px 40px;
        border-bottom: 1px solid #e1e1e1;
        background-color: #fff;
        overflow: hidden;
        position: relative;
    }
    .itTop p{
        overflow: hidden;
    }
    .itTop .add{
        display: block;
        width: 5.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        float: left;
    }
    .itTop .time{
        font-size: 12px;
        color: #999;
        margin: 5px 0;
    }
    .itTop .reason{
        font-size: 12px;
        color: #999;
    }
    .chufa {
        padding-left: 40px;
        background-color: #fff;
    }
    .chufa span{
        color: #287EF1;
        font-size: 14px;
        line-height: 40px;
    }
    .chufa span.count{
        margin-right: 13px;
    }
    .canProcessMsg{
        padding: 4px 30px 4px 40px;
        background: #FEFCED;
        font-size: 13px;
        color: #F28D28;
    }
    .tip{
        text-align: center;
        padding-bottom: 10px;
        color:  #ACB3BF;
        font-size: 13px;
        background-color: #F5F4F9;
    }
    .biaoji{
        border: 1px solid #ACB3BF;
        border-radius: 2px;
        text-align: center;
        font-size: 0.2933rem;
        padding: 0 2px;
        color: #999;
        float: right;
    }
    .biaoji.can{
        border: 1px solid #EF851C;
        color: #EF851C;
    }
    .biaoji.ing{
        border: 1px solid #EF851C;
        color: #fff;
        background-color: #EF851C;
    }
    .biaoji.ok{
        border: 1px solid #55CD43;
        color: #fff;
        background-color: #55CD43;
    }
    .icon-jiantou{
        float: right;
        font-size: 12px;
        margin-left: 10px;
        position: relative;
        top: 1px;
    }
    .sel{
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    .botBox{
        position: fixed;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        bottom: 0;
        font-size: 16px;
    }
    .detail{
        float: left;
        width: 74%;
        padding-left: 40px;
    }
    .btn{
        float: left;
        width: 26%;
        text-align: center;
        background: #C0C0C0;
        color: #fff;
    }
    .btn.can{
        background: #F18B27;
    }
    .numS{
        padding: 0 8px;
    }
    .numS.mid{
        border-left: 1px solid #d7d7d7;
        border-right: 1px solid #d7d7d7;
    }
    .numS span{
        color: #EF851C;
        margin-right: 3px;
    }
    .noBox{
        margin: 30px auto 0;
        text-align: center;
    }
    .noBox .noData{
        width: 79px;
        height: 107px;
    }
    .noBox p{
        color: #ACB3BF;
        font-size: 14px;
        margin-top: 20px;
    }
</style>