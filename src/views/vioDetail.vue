<template>
    <div class="sty">
        <p class="title">{{data.location}}</p>
        <p class="content">{{data.reason}}</p>
        <p class="det"><span class="line">罚款{{data.count}}元</span><span>扣{{data.degree}}分</span></p>
        <p class="time">违章时间：{{data.time}}</p>
        <p class="time">违章代码：{{data.secondaryUniqueCode}}</p>
        <p class="num">处罚决定书编号：{{data.archive}}</p>
        <div class="mapBox" id="map">
            
        </div>
        <button class="btnSty" v-if="data.newStatus == 2" @click="handle()">立即办理</button>
        <button class="btnSty back" v-if="data.newStatus != 2" @click="back()">返回</button>
        <loading v-if="showLoading"></loading>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                data:{},
                showLoading: false
            }
        },
        methods:{
            handle(){
                let orderDetail = {
                    openId: JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).openid,
                    carNumber: this.$route.query.carNumber,
                    money: this.data.count,
                    serMon: this.data.cooperPoundage,
                    degree: this.data.degree,
                    num: 1,
                    uniqueCode: this.data.secondaryUniqueCode,
                    list: [this.data],
                    info: {}
                }
                localStorage.setItem('orderDetail',JSON.stringify(orderDetail));

                this.showLoading = true;
                let token = localStorage.getItem('token');
                this.$http({
                    method:'GET',
                    url: BASE_URL+"app/v1/illegal/materialCondition",
                    params: {
                        uniqueCode: this.data.secondaryUniqueCode ,
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
                        query.uniqueCode = this.data.secondaryUniqueCode;

                        this.$router.push({path: '/supInfo',query: query});
                    }else{
                        this.$router.push({path: '/vioOrder',query: this.$route.query});
                    }
                    
                }).catch((res)=>{
                    this.showLoading = false;
                    this.alertData.show = true;
                    this.alertData.msg = '系统异常';
                });
            },
            back(){
                this.$router.go(-1);
            },
            showMap(){
                let scope = this;
                
                AMap.service('AMap.Geocoder',function(){//回调函数
                    //实例化Geocoder
                    let geocoder = new AMap.Geocoder({
                        // city: "010"//城市，默认：“全国”
                    });
                    //TODO: 使用geocoder 对象完成相关功能
                    geocoder.getLocation(scope.data.location, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            //TODO:获得了有效经纬度，可以做一些展示工作
                            //比如在获得的经纬度上打上一个Marker
                            let map = new AMap.Map('map',{
                                resizeEnable: true,
                                center: [result.geocodes[0].location.lng,result.geocodes[0].location.lat],
                                zoom: 18
                            });


                            var icon = new AMap.Icon({
                                image: 'static/img/icon.png',//24px*24px
                                //icon可缺省，缺省时为默认的蓝色水滴图标，
                                size: new AMap.Size(-10, -10)
                            });

                            let marker = new AMap.Marker({
                                content: "<img class='iconImg' src='static/img/icon.png'/>",
                                position: [result.geocodes[0].location.lng,result.geocodes[0].location.lat],//marker所在的位置
                                map: map,//创建时直接赋予map属性
                            });
                        }else{
                            //获取经纬度失败
                        }
                    }); 
                })

            }
        },
        mounted(){
            this.showMap();
        },
        beforeCreate(){
            this.setDocumentTitle('违章详情');
        },
        created(){
            this.data = JSON.parse(localStorage.getItem('detailData'));
        }
    }
</script>
<style scoped>
    .sty{
        padding: 30px 15px;
        font-size: 16px;
    }
    .title{
        position: relative;
        padding-left: 8px;
        margin-bottom: 9px;
    }
    .title:before{
        position: absolute;
        content: "";
        width: 4px;
        height: 20px;
        background-color: #F59535;
        left: 0;
    }
    .content{
        color: #999;
        font-size: 13px;
        margin-bottom: 14px;
    }
    .det{
        margin-bottom: 16px;
    }
    .det span{
        color: #287EF1;
        font-size: 14px;
    }
    .det span.line{
        padding-right: 14px;
        position: relative;
    }
    .det span.line:before{
        content: "";
        position: absolute;
        width: 1px;
        height: 18px;
        background-color: #999;
        right: 0;
        top: 1px;
    }
    .det span:last-child{
        padding-left: 14px;
    }
    .time,.num{
        font-size: 12px;
        color: #999;

    }
    .num{
        margin-bottom: 29px;
    }
    .mapBox{
        width: 100%;
        height: 150px;
        border: 1px solid #e2e2e2;
        margin-bottom: 39px;
    }
    .iconImg{
        display: block;
        width: 38px;
        height: 43px;
    }
    .btnSty{
        font-size: 18px;
    }
    .btnSty.back{
        background-color: #fff;
        color: #F18B25;
        border: 1px solid #F18B25;
    }
</style>