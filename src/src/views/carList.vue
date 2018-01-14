<template>
    <div>
        <div v-if="type" v-on:click="hide()" class="mask" :class="{'show':isClick,'hide':!isClick}"></div>
        <div v-if="isWX==true" class="searchBox search border-bottom">
        	<router-link class="cityBg" to="/selectCity"><span class="city">{{city}}</span><span class="cityArrow"></span></router-link>
            <div class="searchModal">
                <form action="javascript:return true;" v-on:search="search()">
                    <div class="iconBox">
                        <i class="icon iconfont icon-search searchIcon"></i>
                    </div>
                    <input class="searchInput" type="search" name="" placeholder="搜索你想要的车型" v-model="searchData.condition">
                </form>
            </div>
        </div>

        <div class="topPart">
            <div class="filterBox">
                <div class="filter flex border-bottom">
                    <div v-on:click="filterType('brand')" class="flex_1">
                        <span class="filterItemSty">品牌</span>
                    </div>
                    <div v-on:click="filterType('pay')" class="flex_1">
                        <span class="filterItemSty">筛选</span>
                    </div>
                    <div v-on:click="filterType('sort')" class="flex_1">
                        <span class="filterItemSty">排序</span>
                    </div>
                </div>
                <!-- 品牌 -->
                <div v-show="type=='brand'" class="brand filterDetail" :class="{'show':isClick,'hide':!isClick}">
                    <label class="brandBox" for="all">
                        <input type="radio" class="radioSty" id="all" name="brands" value="" v-model="searchData.brandId" v-on:change="hideMask()">
                        <div class="brandIcon all">
                            <!-- <img v-bind:src="brandAll?'/dist/all.png':'/dist/unall.png'"> -->
                            <img src="static/img/all.png">
                        </div>
                        <div class="r12">全部</div>
                    </label>
                    <label class="brandBox" v-bind:for="'radio'+item.id" v-for="item in brandData">
                        <input type="radio" class="radioSty" v-bind:id="'radio'+item.id" name="brands" v-bind:value="item.id" v-model="searchData.brandId" v-on:change="hideMask()">
                        <div class="brandIcon">
                            <img v-bind:src="item.picUrl">
                        </div>
                        <div class="r12">{{item.label}}</div>
                    </label>
                </div>
                <!-- 筛选 -->
                <div v-show="type=='pay'" class="pay filterDetail" :class="{'show':isClick,'hide':!isClick}">
                    <div class="firstPay">
                        <div class="r17 titleSty">首付款</div>
                        <div>
                            <div class="paySty" v-for="(item,index) in firstPayData" v-on:click="selectDownPay(index)">
                                <div class="region" v-bind:class="{active:item.select}">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="monPay">
                        <div class="r17 titleSty">月供</div>
                        <div>
                            <div class="paySty" v-for="(item,index) in monPayData" v-on:click="selectMonPay(index)">
                                <div class="region" v-bind:class="{active:item.select}">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 排序 -->
                <div v-show="type=='sort'" class="sort filterDetail" :class="{'show':isClick,'hide':!isClick}">
                    <label class="" v-bind:for="'sort'+index" v-for="(item,index) in sortData">
                        <input type="radio" class="radioSty" v-bind:id="'sort'+index" name="sort" v-bind:value="index" v-model="searchData.orderNo" v-on:change="hideMask()">
                        <div class="sortSty border-bottom">{{item}}</div>
                    </label>
                </div>
            </div>
        </div>
            
        <div class="carList">
            <div class="topLoading"></div>
            <div class="carListItem border-bottom" v-for="item in dataList" v-on:click="toDetail(item.id)">
                <!-- <router-link v-bind:to="'/carDetail/'+item.id" > -->
                    <div class="imgBox">
                        <img class="itemImg" v-bind:src="item.url">
                    </div>
                    <div class="floatLeft carInfo">
                        <p class="r17 mgb-8">{{item.brandTopName}}{{item.brandSecondName}}</p>
                        <p class="r12 mgb-8">{{item.type}}</p>
                        <p class="r12 color-999 mgb-8">厂商指导价：{{item.factoryPrice}}万起</p>
                        <p class="r12 color-fe8255">首付<span class="r15">{{item.downPayment}}</span>元 月供<span class="r15">{{item.mouthPayment}}</span>元</p>
                    </div>
                <!-- </router-link> -->
            </div>
            <div v-if="dataList.length==0 && !firstSeatch" class="noData r17 color-666">暂无搜索结果</div>
        </div>
        <loading v-if="showLoading"></loading>
        <!-- <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal> -->
    </div>
</template>
<script>
    import slide from '../js/scroll.js'
    var city=''
    var condition=''
    var brandId=''
   var isClick=false
    export default{
        data(){
            return{
            	isClick:false,
            	isSelect:false,
            	city:city,
                showLoading: false,
                type: "",
                brandData: [],
                conditions:{
                	condition:'',
					brandId:'',
					orderNo:'',
					downPaymentMin:'',
					downPaymentMax:'',
					mouthPaymentMin:'',
					mouthPaymentMax:''
                },
                firstPayData: [
                    {
                        name: '全部',
                        downPaymentMin: 0,
                        downPaymentMax: "",
                        select: true
                    },
                    {
                        name: '0.8W以下',
                        downPaymentMin: 0,
                        downPaymentMax: 8000,
                        select: false
                    },
                    {
                        name: '0.8W~1W',
                        downPaymentMin: 8000,
                        downPaymentMax: 10000,
                        select: false
                    },
                    {
                        name: '1W~1.2W',
                        downPaymentMin: 10000,
                        downPaymentMax: 12000,
                        select: false
                    },{
                        name: '1.2W~1.4W',
                        downPaymentMin: 12000,
                        downPaymentMax: 14000,
                        select: false
                    },{
                        name: '1.4~1.6W',
                        downPaymentMin: 14000,
                        downPaymentMax: 16000,
                        select: false
                    },{
                        name: '1.6W~1.8W',
                        downPaymentMin: 16000,
                        downPaymentMax: 18000,
                        select: false
                    },{
                        name: '1.8~2W',
                        downPaymentMin: 18000,
                        downPaymentMax: 20000,
                        select: false
                    },{
                        name: '2W以上',
                        downPaymentMin: 20000,
                        downPaymentMax: "",
                        select: false
                    }
                ],
                monPayData: [
                    {
                        name: '全部',
                        mouthPaymentMin: 0,
                        mouthPaymentMax: "",
                        select: true
                    },
                    {
                        name: '1000以内',
                        mouthPaymentMin: 0,
                        mouthPaymentMax: 1000,
                        select: false
                    },
                    {
                        name: '1000~2000',
                        mouthPaymentMin: 1000,
                        mouthPaymentMax: 2000,
                        select: false
                    },
                    {
                        name: '2000~3000',
                        mouthPaymentMin: 2000,
                        mouthPaymentMax: 3000,
                        select: false
                    },{
                        name: '3000~4000',
                        mouthPaymentMin: 3000,
                        mouthPaymentMax: 4000,
                        select: false
                    },{
                        name: '4000~5000',
                        mouthPaymentMin: 4000,
                        mouthPaymentMax: 5000,
                        select: false
                    },{
                        name: '5000~6000',
                        mouthPaymentMin: 5000,
                        mouthPaymentMax: 6000,
                        select: false
                    },{
                        name: '7000~8000',
                        mouthPaymentMin: 7000,
                        mouthPaymentMax: 8000,
                        select: false
                    },{
                        name: '8000~9000',
                        mouthPaymentMin: 8000,
                        mouthPaymentMax: 9000,
                        select: false
                    },{
                        name: '9000~10000',
                        mouthPaymentMin: 9000,
                        mouthPaymentMax: 10000,
                        select: false
                    },{
                        name: '10000以上',
                        mouthPaymentMin: 10000,
                        mouthPaymentMax: "",
                        select: false
                    }
                ],
                sortData: [
                    '默认排序','首付款降序','首付款升序','月供降序','月供升序'
                ],
                dataList: [],
                searchData: {
                    pageSize: 99999,
                    condition: condition,
                    brandId:brandId,// 品牌id
                    orderNo: 0,// 排序
                    downPaymentMin: 0,// 首付款最小值
                    downPaymentMax: "",// 首付款最大值
                    mouthPaymentMin: 0,// 月供最小值
                    mouthPaymentMax: ""// 月供最大值
                },
                firstSeatch: true,
                // alertData: {
                //  show: false,
                //  msg: "",
                // },
            }
        },
        methods:{
            toDetail: function(id){
                this.$router.push({path: 'carDetail/'+id});
            },
            search: function(){
                localStorage.setItem("condition",this.searchData.condition);
                this.getCarList();
            },
            // 选择筛选条件
            filterType: function(str){
            	this.type = str;
            	if(this.isClick){
               		this.isClick=false
               	}else{
               		this.isClick=true
               }
               
            },
            // 关闭遮罩
            hide: function(){
                this.type = "";
            },
            hideMask: function(){
                this.type = "";
                this.getCarList();
                this.isClick=false
            },
            // 获取品牌信息
            getBrandData: function(){
                this.$http.get(BASE_URL + 'app/v1/brands').then(function(res){
                    if(res&&res.body&&res.body.success){
                        this.brandData = res.body.data;
                        this.firstSeatch = false;
                    }
                });
            },
            // 获取车次列表
            getCarList: function(fn){
                var scope = this;
                scope.hide();
                if(this.isWX && document.querySelector(".searchInput")){
                    document.querySelector(".searchInput").blur();
                }
                this.showLoading = true;
                localStorage.setItem("conditions",JSON.stringify(this.searchData));
                this.$http.get(BASE_URL + 'app/v1/getCarsByCondition',{params: this.searchData}).then(function(res){
                	this.showLoading = false;
                    if(res&&res.body&&res.body.success){
                        scope.dataList = [];
                        var dataLists = res.body.data.list;
                        scope.dataList=dataLists
                        slide({container:".carList",next: function (e) {
                			var that = this;
			                setTimeout(function () {
			                    scope.getCarList(that.back.call());
			                }, 500);
			            }});
                        fn && fn()
                    }
                });
            },
            // 选择首付金额
            selectDownPay: function(index){
                if(!this.firstPayData[index].select){
                    this.firstPayData.forEach(function(e){
                        e.select = false;
                    });
                    this.firstPayData[index].select = true;
                    this.searchData.downPaymentMin = this.firstPayData[index].downPaymentMin;
                    this.searchData.downPaymentMax = this.firstPayData[index].downPaymentMax;
                    this.hideMask();
                }
                this.isClick=false;
            },
            // 选择月供金额
            selectMonPay: function(index){
                if(!this.monPayData[index].select){
                    this.monPayData.forEach(function(e){
                        e.select = false;
                    });
                    this.monPayData[index].select = true;
                    this.searchData.mouthPaymentMin = this.monPayData[index].mouthPaymentMin;
                    this.searchData.mouthPaymentMax = this.monPayData[index].mouthPaymentMax;
                    this.hideMask();
                }
                this.isClick=false;
            },
        },
        beforeCreate(){
            this.setDocumentTitle("查看车型");
        },
        created: function(){
            this.getBrandData();
            this.searchData = JSON.parse(localStorage.getItem('conditions'));
            if(this.isWX){
                this.searchData.condition = localStorage.getItem("condition");
            }else{
                window.scope = this;
                window.getCondition = function(condition){
                    window.scope.searchData.condition = condition;
                    window.scope.getCarList();
                }
            }
            this.getCarList();
            this.city=localStorage.city;
        },
        mounted: function(){
            var scope = this;
            slide({container:".carList",next: function (e) {
                //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
                var that = this;
                setTimeout(function () {
                    scope.getCarList(that.back.call());
                }, 500);
            }});
        },
    }
</script>
<style scoped>
    .search{
        height: 44px;
        z-index: 889;
        background-color: #fff;
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
    }
    .searchModal{
    	margin-right: 50px;
	    margin-top:10px;
	    float: right;
	    width: 5.334rem;
	    height: 0.8rem;
	    border-radius: 0.08rem;
	    background-color: #f5f5f5;
	    position: relative;
    }
    .iconBox{
        top: 50%;
        left: 0.7rem;
        font-size: 0.4rem;
        position: absolute;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }
    .msgBox{
        width: 0.6rem;
        top: 50%;
        right: -1.8rem;
        font-size: 0.4rem;
        position: absolute;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
    }
    .searchIcon{
        color: #999;
        font-size: 0.4rem;
    }
    .searchInput{
        outline: none;
        border: 0;
        width: 4rem;
        height: 0.8rem;
        background-color: #f5f5f5;
        position: absolute;
        font-size: 0.373rem;
        left: 1.333rem;
        line-height: 0.8rem;
    }
    .topPart{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99999;
    }
    .searchBox + .topPart{
        top: 1.173rem;
    }
    .filterBox{
        position: relative;
        background-color: #fff;
        z-index: 889;
    }
    .filter{
        height: 44px;
        line-height: 1.173rem;
        padding: 0 0.533rem;
        text-align: center;
        font-size: 0.4rem;
    }
    .filterItemSty{
        position: relative;
    }
    .filterItemSty:before{
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: 0.16rem solid transparent;
        border-top-color: #333;
        top: 0.2rem;
        right: -0.45rem;
    }
    .filterItemSty:after{
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: 0.16rem solid transparent;
        border-top-color: #fff;
        top: 0.15rem;
        right: -0.45rem;
    }
    .filterDetail{
        position: absolute;
        background-color: #fff;
        width: 100%;
        z-index: 889;
        top: 1.173rem;
    }
    @media screen and (max-height: 12.8rem){
        .filterDetail{
            max-height: 8.533rem;
            overflow: scroll;
        }
    }
    .brand{
        padding: 0.173rem 0.667rem;
    }
    .brandBox{
        width: 20%;
        float: left;
        text-align: center;
        padding: 0.133rem;
    }
    .brandIcon.active{
        border: 0.053rem solid #ed852e;
    }
    .brandIcon{
        width: 1.067rem;
        height: 1.067rem;
        border-radius: 50%;
        border: 0.027rem solid #e1e1e1;
        margin: 0 auto 0.133rem;
    }
    .radioSty{
        display: none;
    }
    .radioSty:checked + .brandIcon{
        border: 0.053rem solid #ed852e;
    }
    
    .brandIcon img{
        display: block;
        width: 0.7rem;
        margin: 0.14rem auto 0;
    }
    .pay{
        padding: 0 0.4rem 0.4rem;
    }
    .firstPay,.monPay{
        overflow: hidden;
    }
    .titleSty{
        height: 1.333rem;
        line-height: 1.333rem;
        padding-left: 0.15rem;
    }
    .paySty{
        width: 33.3%;
        float: left;
        padding: 0.133rem;
        text-align: center;
    }
    .region{
        border-radius: 0.133rem;
        border: 0.027rem solid #eee;
        height: 0.907rem;
        line-height: 0.907rem;
        font-size: 0.347rem;
    }
    .region.active{
        background-color: #ed852e;
        color: #fff;
    }
    .sortSty{
        height: 1.173rem;
        line-height: 1.173rem;
        text-align: center;
        font-size: 0.4rem;
    }
    .radioSty:checked + .sortSty{
        color: #ed852e;
    }
    .carList{
        margin-top: 44px;
    }
    .topLoading{
        height: 44px;
    }
    .searchBox + .topPart + .carList{
        margin-top: 88px;
    }
    .carListItem{
        padding: 0.4rem;
        overflow: hidden;
    }
    .imgBox{
        width: 45%;
        float: left;
        padding-right: 0.4rem;
        height: 2.267rem;
    }
    .itemImg{
        display: block;
        width: 100%;
    }
    .mgb-8{
        margin-bottom: 0.1rem;
    }
    .noData{
        text-align: center;
        margin-top: 5.867rem;
    }
    .carInfo{
        width: 55%;
    }
    .r12{
        font-size: 0.32rem;
    }
    .r17{
        font-size: 0.453rem;
    }
    .r15{
        font-size: 0.4rem;
    }
    .border-bottom{
        border-bottom: 1px solid #eee;
    }
    .cityBg{
    	position: relative;
	    display: inline-block;
	    width: 85px;
    }
    .city{
		text-overflow: ellipsis;
		white-space: nowrap;
	    overflow: hidden;
	    max-width: 60px;
		position: relative;
    	margin-left: 10px;
	    float: left;
	    display: inline-block;
	    line-height: 44px;
	    font-size: 12px;
    }
    .cityArrow{
    	right: 0;
	    top: 22px;
	    transform: rotate(-45deg);
	    height: 8px;
	    width: 8px;
	    position: absolute;
	    border-right: 1px solid #666;
	    border-top: 1px solid #666;
	    display: inline-block;
    }
    .hide{
    	display: none;
    }
</style>