<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index,$event)">删除</div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number
        },
        data() {
            return {
                startX: 0,       //触摸位置
                  moveX: 0,       //滑动时的位置
                  disX: 0,       //移动距离
                  txtStyle: '',
                delWidth: 200,
                top: '',
                zIndex: 'z-index:1',
            }
        },
        methods: {
            _touchStart: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    // console.log(this.startX)
                }
            },
            _touchMove: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        ev.target.style.webkitTransform = "translate(0rem,0)";
                        ev.target.style.transform = "translate(0rem,0)";
                    }else if (this.disX > 0) {
// 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth



                        ev.target.style.webkitTransform = "translate(-" + this.disX/100 + "rem,0)";
                        ev.target.style.transform = "translate(-" + this.disX/100 + "rem,0)";
                        if (this.disX >= this.delWidth/100) {
                            ev.target.style.webkitTransform = "translate(-" + this.delWidth/100 + "rem,0)";
                            ev.target.style.transform = "translate(-" + this.delWidth/100 + "rem,0)";
                            this.zIndex = "z-index:" + 10 + "rem";
                        }

                        let arr = document.getElementsByClassName('move');
                        for(let i=0;i<arr.length;i++){
                            if(arr[i]!=ev.target){
                                arr[i].style.webkitTransform = 'translate(0rem,0)';
                                arr[i].style.transform = 'translate(0rem,0)';
                            }
                        }
                       
                    }
                }
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            deleteItem: function(index,e) {
                this.$emit('deleteItem', index);
                // e.target.style.webkitTransform = "translate(0rem,0)";
                // e.target.style.transform = "translate(0rem,0)";
                let arr = document.getElementsByClassName('move');
                    for(let i=0;i<arr.length;i++){
                            arr[i].style.webkitTransform = 'translate(0rem,0)';
                            arr[i].style.transform = 'translate(0rem,0)';
                    }
                e.stopPropagation();
            }
        }
    }
</script>

<style>
    .left-delete{
        width:100%;
        height:100%;
        position:relative;
        z-index:2;
        overflow: hidden;
    }
    .move{
        position: absolute;
        width: 100%;
        z-index: 100;
        background: #fff;
        -webkit-transition: all 0.1s;
        transition: all 0.1s;
    }
    .deleteIcon{
        width: 2rem;
        height:49px;
        position: absolute;
        right:0;
        top:0;
        z-index: 1;
        text-align: center;
        background-color: #F22929;
        color: #fff;
        font-size: 16px;
    }
</style>