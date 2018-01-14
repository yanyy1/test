<template>
    <section id="recommend">
        <ul>
            <li v-for="(item,index) in content" :key="index">
                <span class="reLogo">
                    <img src="static/img/login.png" />
                </span>
                <span class="reInfo">{{item}}</span>
            </li>
        </ul>
        <p v-show="alertTips">暂无消息推送</p>
    </section>
</template>
<script>
export default {
    data() {
        return {
            content: [],
            alertTips:true
        }
    },
    methods: {
        initMessage: function () {
            var token = localStorage.getItem('token');
            var username = localStorage.getItem('username');
            this.$http.get(BASE_URL + 'app/v1/message?username=' + username, { headers: { access_token: token } }).then((res) => {
                if (res.body.success) {
                    
                    var data = res.body.data;
                    if(data.length>0){
                        this.alertTips = false;
                         for (var i = 0; i < data.length; i++) {
                            this.content.push(data[i].content);
                        }
                    }
                   

                }

            }).then(() => {
                var height1 = document.documentElement.offsetHeight;
                var height2 = document.documentElement.clientHeight;
                var height = height1 - height2;
                document.body.scrollTop = height;
            })
        }
    },
    beforeCreate: function () {
        this.setDocumentTitle("消息通知");
    },
    created() {

        this.initMessage();



    }
}
</script>
<style scoped>
#recommend {
    background: white;
}

#recommend>p {
    width: 100%;
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    --webkit-transform: -webkit-translateY(-50%);
    font-size: 0.5rem;
}

#recommend li {
    padding: 0.4rem 0.32rem;
    font-size: 0.4rem;
    overflow: auto;
}

#recommend .reLogo {
    width: 0.933rem;
    height: 0.933rem;
    float: left;
}

#recommend .reLogo>img {
    width: 100%;
}

#recommend .reInfo {
    width: 6rem;
    height: auto;
    display: inline-block;
    background: rgb(240, 240, 240);
    margin-left: 0.2rem;
    border-radius: 10px;
    padding: 0.2rem;
    position: relative;
    display: -moz-inline-box;
    word-wrap: break-word;
}

#recommend .reInfo:after {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: -0.4rem;
    width: 0px;
    height: 0px;
    border: 0.2rem solid transparent;
    border-right-color: rgb(240, 240, 240);
}
</style>