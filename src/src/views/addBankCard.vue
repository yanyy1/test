<template>
    <section id="bankCard">

        <div class="cardList" v-for="(item,index) in cardData" >
            <div v-touch>
                <img src="/static/img/gsBank.png" class="cardLogo"><span class="cardType">{{item.name}}</span><span class="cardNumber">{{item.number}}</span>
            </div>
            <button class="cardDel" @click="delCard(index)">删除</button>
        </div>
        </div>
        <button class="addBank">添加银行卡</button>
    </section>
</template>
<script>

export default {

  data () {
    return {
      keyword:'',
      swipClass: '',
      cardData:[
      {name: '工商银行',number: '****2201'},
      {name: '上海银行',number: '****2201'},
      {name: '浦东银行',number: '****2201'},
      {name: '农业银行',number: '****2201'}
      ]
    }
  },
  methods:{
       delCard:function(index){
        console.log(index);
            this.cardData.splice(index,1);
       }
  },
  beforeCreate(){
  },
  created(){

  },
  components:{
  
  },
  directives: {
  touch: {
        bind : function(el) {
            var self = this;

            var startX,moveX,endX,leftX;
            var startTime,endTime;
        el.addEventListener('touchstart',function(e) {
            startTime = new Date().getTime();
            leftX = parseFloat(el.style.left.split('r')[0]);
            if (!leftX) {
               leftX =0;
            }
             startX = event.changedTouches[0].pageX;
        },false);

        el.addEventListener('touchmove',function(e) {

            moveX = event.changedTouches[0].pageX - startX;
            var absNumber = Math.abs(moveX)/75;
           
            // console.log(absNumber);
            if (moveX<0 && absNumber<=1.734 && leftX == 0) {
                el.style.left = -absNumber+'rem';
            }else if(moveX>0 && leftX !==0 &&absNumber>1.734){
                el.style.left = absNumber+'rem';
            }
        },false);

        el.addEventListener('touchend',function(e) {
            if (moveX<0) {
                el.style.left= "-1.734rem";
            }else{
                el.style.left = "0rem";
            }
        },false);

        }
    }
}

}
</script>

<style scoped>
#bankCard{width: 100%;}
#bankCard>.cardList{position: relative;width: 100%;height: 1.334rem;overflow: auto;border-bottom: 1px solid red;font-size: 0.4rem;}
    #bankCard>.cardList>div{
        width: 100%;
        line-height: 1.334rem;
        z-index: 999;
        background: white;
        position: absolute;
        left: 0;
        top: 0;
        -webkit-transition:all 0.3s linear;transition:all 0.1s linear;
    }
    #bankCard .cardLogo{float: left;margin-top: 0.3066rem;margin-left: 0.4rem}
    #bankCard .cardType{margin-left: 0.4rem;color: #333333;}
    #bankCard .cardNumber{float: right;font-size: 24px;margin-right: 0.4rem;color: #999999;}
    #bankCard .cardDel{width: 1.734rem;line-height: 1.334rem;background: red;color: white;font-size: 0.4534rem;position: absolute;right: 0;top: 0;border:none;z-index:1;}
    #bankCard .addBank{width: 9.334rem;height: 1.0667rem;display: block;margin: 0 0.333rem;background: #ed852e;color: white;position: fixed;bottom: 0.3rem;font-size: 0.456rem;border-radius: 10px;border:none;}
</style>