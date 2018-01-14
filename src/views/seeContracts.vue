<template>
<section>
<p>{{ title }}</p>
<div v-html="text"></div>
<!-- <div>{{wyText}}</div> -->
</section>

</template>
<script type="text/javascript">
export default{
    data(){
        return {
            title:'',
            text:'',
            wyText:''
        }
    },
    methods:{
        initContracts:function(){
             var token = localStorage.getItem('token');
             var orderId = this.$route.query.orderId;
            this.$http.get(BASE_URL+'app/v1/contracts?orderId=' + orderId, { headers: { access_token: token } }).then((res) =>{
               console.log(res);
               this.title = res.body.data.title;
               this.text = res.body.data.content;
            //    this.wyText = res.body.data.violatecontent;
            })
        }
    },
    created(){
        this.initContracts();
    }
}
</script>
<style scoped>
p{text-align: center;font-size: 17px; padding: 0.2rem 0;font-weight: bold;}
div{margin: 0 0.4rem;text-indent: 0.2rem;font-size: 15px; }
</style>