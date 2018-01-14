<!--<template>
	<div class="carList">
        <div class="topLoading"></div>
        <div class="carListItem border-bottom" v-for="item in dataList" v-on:click="toDetail(item.id)">
            <div class="imgBox">
                <img class="itemImg" v-bind:src="item.url">
            </div>
            <div class="floatLeft carInfo">
                <p class="r17 mgb-8">{{item.brandTopName}}{{item.brandSecondName}}</p>
                <p class="r12 mgb-8">{{item.type}}</p>
                <p class="r12 color-999 mgb-8">厂商指导价：{{item.factoryPrice}}万起</p>
                <p class="r12 color-fe8255">首付<span class="r15">{{item.downPayment}}</span>元 月供<span class="r15">{{item.mouthPayment}}</span>元</p>
            </div>
        </div>
    </div>
    <div class="zero" v-if="dataList.length==0 && !firstSeatch">
    	<span class="statusTxt">还没有收藏的车辆</span>
    	<router-link class="statusBtn" v-if="isWX" to="/carList"><el-button type="warning">去逛逛</el-button></router-link>
    </div>
</template>
<script>
export default {

  data () {
    return {
      dataList:[
      	{}
      ]
    }
  },
  methods:{

  },
  created(){

  },
   beforeCreate(){
        this.setDocumentTitle("车辆收藏");
    },
  
}
</script>

<style src="../common.css"></style>
<style scoped >
	.zero{
		text-align: center;
	}
    .statusTxt{
    	margin-top: 40%;
    	text-align: center;
	    display: block;
	    font-size: .6rem;
    }
    
</style>-->