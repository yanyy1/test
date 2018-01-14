<template>
    <div class="content">
        <p class="zj">请补充{{$route.query.carNumber}}车辆违章代办所需的资料</p>
        <div class="box" v-if="data.CarDriveLen">
            <span>发动机号</span>
            <input type="text" placeholder="请输入发动机号" v-model="param.CarDriveLen"/>
        </div>
        <div class="box" v-if="data.CarOwnerLen">
            <span>车主姓名</span>
            <input type="text" placeholder="请输入姓名" v-model="param.CarOwnerLen"/>
        </div>
        <div class="box" v-if="data.CarOwnerPhoneLen">
            <span>车主联系电话</span>
            <input type="text" placeholder="请输入联系电话" v-model="param.CarOwnerPhoneLen"/>
        </div>
        <div class="box" v-if="data.JashiZhengHaoLen">
            <span>办理人驾驶证号</span>
            <input type="text" placeholder="请输入驾驶证号" v-model="param.JashiZhengHaoLen"/>
        </div>
        <div class="box" v-if="data.OwnerCardLen">
            <span>车主身份证号</span>
            <input type="text" placeholder="请输入身份证号" v-model="param.OwnerCardLen"/>
        </div>
        <div class="box" v-if="data.CarCodeLen">
            <span>车架号</span>
            <input type="text" placeholder="请输入车架号" v-model="param.CarCodeLen"/>
        </div>
        <div class="box" v-if="data.DanganBianHaoLen">
            <span>驾驶证档案编号</span>
            <input type="text" placeholder="请输入编号" v-model="param.DanganBianHaoLen"/>
        </div>
        <div class="box" v-if="data.FilePhoneLen">
            <span>车管所驾驶证登记电话</span>
            <input type="text" placeholder="请输入电话" v-model="param.FilePhoneLen"/>
        </div>
        <div class="box" v-if="data.CheliangZhengShuLen">
            <span>车辆登记证书号</span>
            <input type="text" placeholder="请输入证书号" v-model="param.CheliangZhengShuLen"/>
        </div>
        <div class="box" v-if="data.TiaoXingMaLen">
            <span>驾驶证条形码编号</span>
            <input type="text" placeholder="请输入条形码编号" v-model="param.TiaoXingMaLen"/>
        </div>
        <div class="box" v-if="data.XingShiZhengHaoLen">
            <span>行驶证档案编号</span>
            <input type="text" placeholder="请输入编号" v-model="param.XingShiZhengHaoLen"/>
        </div>

        <div class="box" v-if="isWX && data.DrivingLicense">
            <span>行驶证正页</span>
            <input v-on:change="selectPic('DrivingLicense',$event)" type="file" accept="image/*" class="fileSty"/>
            <input type="text" placeholder="上传行驶证正页" v-model="param.DrivingLicense"/>
        </div>
        <div class="box" v-if="!isWX && data.DrivingLicense">
            <span>行驶证正页</span>
            <input @click="appSelectPic('DrivingLicense')" type="text" placeholder="上传行驶证正页" v-model="param.DrivingLicense"/>
        </div>


        <div class="box" v-if="isWX && data.DrivingSecondLicense">
            <span>行驶证副页</span>
            <input v-on:change="selectPic('DrivingSecondLicense',$event)" type="file" accept="image/*" class="fileSty"/>
            <input type="text" placeholder="上传行驶证副页" v-model="param.DrivingSecondLicense"/>
        </div>
        <div class="box" v-if="!isWX && data.DrivingSecondLicense">
            <span>行驶证副页</span>
            <input @click="appSelectPic('DrivingSecondLicense')" type="text" placeholder="上传行驶证副页" v-model="param.DrivingSecondLicense"/>
        </div>


        <div class="box" v-if="isWX && data.MajorViolation">
            <span>驾驶证正页</span>
            <input v-on:change="selectPic('MajorViolation',$event)" type="file" accept="image/*" class="fileSty"/>
            <input type="text" placeholder="上传驾驶证正页" v-model="param.MajorViolation"/>
        </div>
        <div class="box" v-if="!isWX && data.MajorViolation">
            <span>驾驶证正页</span>
            <input @click="appSelectPic('MajorViolation')" type="text" placeholder="上传驾驶证正页" v-model="param.MajorViolation"/>
        </div>


        <div class="box" v-if="isWX && data.MajorSecondViolation">
            <span>驾驶证副页</span>
            <input v-on:change="selectPic('MajorSecondViolation',$event)" type="file" accept="image/*" class="fileSty"/>
            <input type="text" placeholder="上传驾驶证副页" v-model="param.MajorSecondViolation"/>
        </div>
        <div class="box" v-if="!isWX && data.MajorSecondViolation">
            <span>驾驶证副页</span>
            <input @click="appSelectPic('MajorSecondViolation')" type="text" placeholder="上传驾驶证副页" v-model="param.MajorSecondViolation"/>
        </div>


        <div class="box" v-if="data.VerifyCodeLen">
            <span>车管所短信验证码</span>
            <input type="text" placeholder="请输入验证码" v-model="param.VerifyCodeLen"/>
        </div>

        <button class="btnSty" @click="save()">保存</button>
        <loading v-if="showLoading"></loading>
        <toast v-if="toastData.show" v-bind:todo="toastData"></toast>
        <alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
    </div>
</template>
<script>
import OSS from '../js/oss.min.js'
    export default{
        data(){
            return {
                data:{},
                param: {
                    CarCodeLen: '',// 车架
                    CarDriveLen: '',// 发动机号
                    CarOwnerLen: '',// 车主姓名
                    CarOwnerPhoneLen: '',// 联系电话
                    CheliangZhengShuLen: '',// 车辆登记证书号
                    DanganBianHaoLen: '',// 驾驶证档案编号
                    DrivingLicense: '',// 行驶证正页
                    DrivingSecondLicense: '',// 行驶证副页
                    FilePhoneLen: '',// 车管所驾驶证登记电话
                    JashiZhengHaoLen: '',// 办理人驾驶证号
                    MajorSecondViolation: '',// 驾驶证副页
                    MajorViolation: '',// 驾驶证正业
                    OrderId: '',// 
                    OwnerCardLen: '',// 车主身份证号
                    TiaoXingMaLen: '',// 条形码
                    VerifyCodeLen: '',// 短信验证码
                    XingShiZhengHaoLen: '',// 行驶证档案编号
                },
                showLoading: false,
                toastData:{
                    show: false,
                    text: ""
                },
                alertData: {
                    show: false,
                    msg: "",
                },
            }
        },
        methods:{
            appSelectPic: function(key){
                window.scope = this;
                this.getHostApp(function(hostApp){
                    window.getPic = function(localPic,onlinePic){
                        scope.param[key] = onlinePic;
                    }
                    hostApp.takePhoto('getPic');
                });
            },
            random_string: function(len) {
            　　len = len || 32;
            　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
            　　var maxPos = chars.length;
            　　var pwd = '';
            　　for (var i = 0; i < len; i++) {
                　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            selectPic: function(key,e){
                var scope = this;
                setTimeout(function(){
         
                    var file = e.target.files[0];
                    // 上传图片
                    var file_name = scope.random_string(24);
                    var storeAs = 'attachments/test/' + file_name;
                    scope.showLoading = true;
                    scope.client.multipartUpload(storeAs, file).then(function (result) {
                        var url = result.res.requestUrls[0];
                        url = url.indexOf('?')>0 ? url.substring(0,url.indexOf('?')) : url;
                        scope.showLoading = false;
                        
                            scope.param[key] = url;
                        
                    }).catch(function (err) {
                        scope.showLoading = false;
                        scope.alertData.show = true;
                        scope.alertData.msg = "上传失败";
                    });
                   
                },100);
            },
            save(){
                let text = ''
                if(this.data.CarCodeLen && this.vaildNull(this.param.CarCodeLen)){
                    text = '请输入车架号';
                }else if(this.data.CarDriveLen && this.vaildNull(this.param.CarDriveLen)){
                    text = '请输入发动机号';
                }else if(this.data.CarOwnerLen && this.vaildNull(this.param.CarOwnerLen)){
                    text = '请输入车主姓名';
                }else if(this.data.CarOwnerPhoneLen && this.vaildNull(this.param.CarOwnerPhoneLen)){
                    text = '请输入联系电话';
                }else if(this.data.CheliangZhengShuLen && this.vaildNull(this.param.CheliangZhengShuLen)){
                    text = '请输入车辆登记证书号';
                }else if(this.data.DanganBianHaoLen && this.vaildNull(this.param.DanganBianHaoLen)){
                    text = '请输入驾驶证档案编号';
                }else if(this.data.DrivingLicense && this.vaildNull(this.param.DrivingLicense)){
                    text = '请上传行驶证正页';
                }else if(this.data.DrivingSecondLicense && this.vaildNull(this.param.DrivingSecondLicense)){
                    text = '请上传行驶证副页';
                }else if(this.data.FilePhoneLen && this.vaildNull(this.param.FilePhoneLen)){
                    text = '请输入电话';
                }else if(this.data.JashiZhengHaoLen && this.vaildNull(this.param.JashiZhengHaoLen)){
                    text = '请输入驾驶证号';
                }else if(this.data.MajorSecondViolation && this.vaildNull(this.param.MajorSecondViolation)){
                    text = '请上传驾驶证副页';
                }else if(this.data.MajorViolation && this.vaildNull(this.param.MajorViolation)){
                    text = '请上传驾驶证正页';
                }else if(this.data.OwnerCardLen && this.vaildNull(this.param.OwnerCardLen)){
                    text = '请输入身份证号';
                }else if(this.data.TiaoXingMaLen && this.vaildNull(this.param.TiaoXingMaLen)){
                    text = '请输入条形码编号';
                }else if(this.data.VerifyCodeLen && this.vaildNull(this.param.VerifyCodeLen)){
                    text = '请输入验证码';
                }else if(this.data.XingShiZhengHaoLen && this.vaildNull(this.param.XingShiZhengHaoLen)){
                    text = '请输入编号';
                }
                if(text){
                    this.toastData= {
                        show: true,
                        text: text
                    };
                    return
                }


                let orderDetail = JSON.parse(localStorage.getItem('orderDetail'));
                orderDetail.info = this.param;
                localStorage.setItem('orderDetail',JSON.stringify(orderDetail));

                this.$router.push({path: '/vioOrder',query: this.$route.query});
            },
            getData(){
                this.showLoading = true;
                let token = localStorage.getItem('token');
                this.$http({
                    method:'GET',
                    url: BASE_URL+"app/v1/illegal/materialCondition",
                    params: {
                        uniqueCode: this.$route.query.uniqueCode ,
                    },
                    headers: {
                        access_token: token,
                    },
                }).then((res) => {
                    this.showLoading = false;
                    this.data = res.data.data;
                    
                }).catch((res)=>{
                    this.showLoading = false;
                    this.alertData.show = true;
                    this.alertData.msg = '系统异常';
                });
            }
        },
        beforeCreate(){
            this.setDocumentTitle('补充代办资料');

            this.client = new OSS.Wrapper({
                region: 'oss-cn-shanghai',
                accessKeyId: 'LTAInakjKlgqgwKN',
                accessKeySecret: 'mCLx3ySwJdamb3U6yEkWEHbQ3jP3OD',
                bucket: 'cheyatou'
            });
        },
        created(){
            this.getData();
        }
    }
</script>
<style scoped>
.content{
    background-color: #F5F4F9;
    font-size: 15px;
    min-height: 100%;
    padding-bottom: 30px;
}
.zj{
        padding: 24px 0 10px 20px;
        font-size: 13px;
    }
 .box{ 
    height:50px;
    background-color:#fff;
    padding: 0 15px;
    line-height: 50px;
    border:1px solid #f2f2f2;
    position: relative;
  }
  .box> span{
    color: #333333;
  }
  .box> input{
    float: right;
    text-align: right;
    width: 125px;
    height: 30px;
    margin-top: 10px;
    border:none;
    outline:none;
    font-size: 15px;
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
   input::-webkit-input-placeholder {
    color: #999999;
  }
  .btnSty{
    width: 92%;
    display: block;
    margin: 40px auto 0;
  }
  .box input.fileSty{
    position: absolute;
        right: 0;
        opacity: 0;
  }
</style>