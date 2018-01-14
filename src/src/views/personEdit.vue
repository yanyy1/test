<template>
	<div>
		<div class="nameId">
			<div class="userIcon thin-border-bottom f15">
				<span class="inputName thin-border-right">头像</span>
				<span class="uploadBg">
					<el-upload
					  class="avatar-uploader"
					  :action="uplaoad.addr"
					  :data="uplaoad.upLoadData"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<img v-if="userPersonInfo.carlicencefront!=''" :src="userPersonInfo.carlicencefront" />
					<img v-if="userPersonInfo.carlicencefront==''" class="bottPic" src="static/img/eLogo.png"/>
				</span>
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">昵称</span>
				<input class="inputSty userRight" type="text" name=""  unselectable="true" v-model="userPersonInfo.username">
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">手机号</span>
				<span class="userRight default">{{userPersonInfo.phonenumber}}</span>
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">性别</span>
				<span class="userRight">
					<template>
					  <el-radio v-model="radio" label="1">男</el-radio>
					  <el-radio v-model="radio" label="2">女</el-radio>
					</template>
				</span>
			</div>
		</div>
		<div class="btnBox">
			<button class="btnSty" v-on:click="save()">保存</button>
		</div>
	</div>
</template>
<script>
	import '../css/common.css'
	import OSS from '../js/oss.min.js'
  	export default {
	    data () {
	      return {
	      	uplaoad:{
	      		addr:'',
	      	},
	      	userPersonInfo:{
	      		carlicencefront:'',
	      		phonenumber:'',
	      		username:''
	      	},
			radio: '1',
	      	 imageUrl: ''
	      };
	    },
    	methods: {
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
	    	handleAvatarSuccess(res, file) {
	    		this.imageUrl = URL.createObjectURL(file.raw);
	    	},
		    beforeAvatarUpload(file) {
		    	var self = this;
		    	var file_name = self.random_string(24);
				var storeAs = 'attachments/test/' + file_name;
				self.client.multipartUpload(storeAs, file).then(function (result) {
					var url = result.res.requestUrls[0];
					url = url.indexOf('?')>0 ? url.substring(0,url.indexOf('?')) : url;
					self.userPersonInfo.carlicencefront=url;
					self.uplaoad.addr = url;
				}).catch(function (err) {
				    	scope.showLoading = false;
				  		scope.alertData.show = true;
						scope.alertData.msg = "上传失败";
						scope.pics[index].pic =  "";
					});
			},
		    getUserInfo: function(){
				this.showLoading = true;
				this.$http.get(BASE_URL+'app/v1/user/userInfo?username='+this.isLogin()).then(function(res){
					this.showLoading = false;
					if(res&&res.body&&res.body.success){
						if(res.body.data.userPersonInfo){
							this.userPersonInfo = res.body.data.userPersonInfo;
						}
						if(res.body.data.user){
							this.user = res.body.data.user;
						}
					}else{
						this.alertData.show = true;
						this.alertData.msg = res.body.data.errorMessage;
					}
				});
			},
			save: function(){
				var param = JSON.parse(JSON.stringify(this.userPersonInfo));
				this.$http.post(BASE_URL+'app/v1/user/userInfo?username='+this.isLogin(),param).then(function(res){
					if(res&&res.body&&res.body.success){
							localStorage.setItem('userInfoData',JSON.stringify(this.userPersonInfo));
							var query = this.$route.query;
							this.$router.push({path: "/me",query: query});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
				})
			}
		},
    	beforeCreate(){
			this.client = new OSS.Wrapper({
			    region: 'oss-cn-shanghai',
			    accessKeyId: 'LTAInakjKlgqgwKN',
			    accessKeySecret: 'mCLx3ySwJdamb3U6yEkWEHbQ3jP3OD',
			    bucket: 'cheyatou'
			});
		},
    	created: function(){
			this.getUserInfo();
			
		},
  }
</script>
<style scoped="">
	.userRight{
		margin-right: 10px;
		text-align: right;
		float: right;
	}
	.default{
		color:#999
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 80px;
	    height: 80px;
	    line-height: 80px;
	    text-align: center;
	  }
	  .avatar {
	    width: 80px;
	    height: 80px;
	  }
	  .uploadBg{
	  	margin-right: 10px;
	  	height: 100px;
	  }
	  .uploadBg img{
	  	border-radius: 100%;
	    object-fit: cover;
	    top: 10px;
	    position: absolute;
	    width: 80px;
	    height: 80px;
	    z-index: -1;
	  }
	  .userIcon{
	  	display: flex;
	    justify-content: space-between;
	    line-height: 100px;
	  }
	.avatar-uploader{
		z-index: 1;
	}  
	.el-icon-plus:before {
    content: "";
	}
</style>