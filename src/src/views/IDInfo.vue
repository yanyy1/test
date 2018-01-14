<template>
	<div>
		<div class="photo">
			<div v-if="isWX==true" class="photoBox" v-for="(item,index) in pics">
				<div class="idObverse boxSty">
					<div v-show="item.pic==''" class="color-ed852e textCenter classSty">
						<i class="icon iconfont icon-xiangji iconSty"></i>
						<p class="f15">{{item.text}}</p>
					</div>
					<input v-on:change="selectPic(index,$event)" name="idObverse" class="fileSty" type="file" accept="image/*">
					<img v-show="item.pic!=''" class="imgSty" v-bind:class="'imgSty'+index" v-bind:src="item.pic">
					<!-- <canvas class="canvas" v-bind:class="'canvas'+index" width="320" height="240"></canvas> -->
				</div>
			</div>

			<div v-if="!isWX==true" class="photoBox" v-for="(item,index) in pics">
				<div class="idObverse boxSty" v-on:click="appSelectPic(index,$event)">
					<div v-show="item.pic==''" class="color-ed852e textCenter classSty">
						<i class="icon iconfont icon-xiangji iconSty"></i>
						<p class="f15">{{item.text}}</p>
					</div>
					<input name="idObverse" class="fileSty" type="file" accept="image/*" style="display:none">
					<img v-show="item.pic!=''" class="imgSty" v-bind:class="'imgSty'+index" v-bind:src="item.pic">
					<!-- <canvas class="canvas" v-bind:class="'canvas'+index" width="320" height="240"></canvas> -->
				</div>
			</div>

		</div>
		<div class="nameId">
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">姓  名</span>
				<input class="inputSty" type="text" name="" readonly="" unselectable="true" onfocus="this.blur()" v-model='userPersonInfo.username'>
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">身份证号</span>
				<input class="inputSty" type="text" name="" readonly="" unselectable="true" onfocus="this.blur()" v-model='userPersonInfo.idcardnumber'>
			</div>
			<div class="color-ed852e tips f12">
				注意：姓名、身份证号为自动获取项，无需填写
			</div>
		</div>
		<div class="perInfo">
			<div class="inputBoxSty thin-border-bottom f15 selectSty">
				<span class="inputName thin-border-right">教育程度</span>
				<select class="inputSty" v-model='userPersonInfo.educationlevel'>
					<option value="">请选择</option>
					<option v-for="item in education" v-bind:value="item.value">{{item.text}}</option>
				</select>
				<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
			</div>
			<div class="inputBoxSty thin-border-bottom f15 selectSty">
				<span class="inputName thin-border-right">婚姻状况</span>
				<select class="inputSty" v-model='userPersonInfo.ismarriage'>
					<option value="">请选择</option>
					<option v-for="item in marriage" v-bind:value="item.value">{{item.text}}</option>
				</select>
				<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
			</div>
			<div class="inputBoxSty thin-border-bottom f15 selectSty">
				<span class="inputName thin-border-right">现居地址</span>
				<input class="inputSty addInput" type="text" name="" id="address" readonly="" unselectable="true" onfocus="this.blur()" v-model='userPersonInfo.city'>
				<input type="hidden" name="" id="addressVal">
				<i class="icon iconfont icon-arrowDown arrowDownSty"></i>
			</div>
			<div class="inputBoxSty thin-border-bottom f15">
				<span class="inputName thin-border-right">详细地址</span>
				<input class="inputSty" type="text" name="" v-model='userPersonInfo.address'/>
			</div>
		</div>
		<div class="btnBox">
			<button class="btnSty" v-on:click="nextStep()">下一步</button>
		</div>
		<alertModal v-if="alertData.show" v-bind:todo="alertData"></alertModal>
		<toast v-if="toastData.show" v-bind:todo="toastData"></toast>
		<loading v-if="showLoading"></loading>
	</div>
</template>
<script>
	import OSS from '../js/oss.min.js'
	import '../js/testData.js'
    import '../js/LArea.min.js'
    import '../css/LArea.min.css'
   
	export default{
		data (){
			return {
				showLoading: false,
				toastData:{
					show: false,
					text: ""
				},
				alertData: {
					show: false,
					msg: "",
				},
				education:[
					{
						text: "高中及以下",
						value: 1
					},
					{
						text: "大专",
						value: 2
					},
					{
						text: "本科",
						value: 3
					},
					{
						text: "硕士及以上",
						value: 4
					}
				],
				marriage: [
					{
						text: "未婚",
						value: 0
					},
					{
						text: "已婚",
						value: 1
					},
					{
						text: "离异",
						value: 2
					},
					{
						text: "丧偶",
						value: 3
					}
				],
				pics: [
					{
						pic: "",
						text: "身份证人像面",
					},
					{
						pic: "",
						text: "身份证国徽面",
					},
					{
						pic: "",
						text: "驾驶证人像页"
					},
					{
						pic: "",
						text: "驾驶证副页"
					}
				],
				userPersonInfo: {
					username: "",
					id: 0,
					educationlevel: "",
					ismarriage: "",
					city: "",
					address: "",
					phonenumber: this.isLogin(),
					idfront: "",
					idback: "",
					carlicencefront: "",
					carlicenceback: "",
					idcardnumber: ""
				},
			}
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
			isAllInput: function(){
				if(this.vaildNull(this.userPersonInfo.idfront)){
					this.toastData= {
						show: true,
						text: '请上传身份证人像面'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.idback)){
					this.toastData= {
						show: true,
						text: '请上传身份证国徽面'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.carlicencefront)){
					this.toastData= {
						show: true,
						text: '请上传驾驶证人像页'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.carlicenceback)){
					this.toastData= {
						show: true,
						text: '请上传驾驶证副页'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.username) || this.vaildNull(this.userPersonInfo.idcardnumber)){
					this.toastData= {
						show: true,
						text: '请上传清晰的身份证人像面'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.educationlevel)){
					this.toastData= {
						show: true,
						text: '请选择教育程度'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.ismarriage)){
					this.toastData= {
						show: true,
						text: '请选择婚姻状况'
					};
					return
				}else if(this.vaildNull(this.userPersonInfo.address)){
					this.toastData= {
						show: true,
						text: '请输入详细地址'
					};
					return
				
				}else {
					return true
				}
			},
			appSelectPic: function(index,e){
				window.scope = this;
				this.getHostApp(function(hostApp){
                    window.getPic = function(localPic,onlinePic){
						scope.pics[index].pic =  localPic;
						
				        if(index==0){
				        	scope.toastData= {
								show: true,
								text: '上传成功，正在识别身份证...'
							};
				        	scope.userPersonInfo.idfront = onlinePic;
				        	scope.$http.get(BASE_URL + 'app/v1/youTu?url='+onlinePic).then(function(res){
				        		if(res&&res.body&&res.body.success&&res.body.data.name&&res.body.data.cardId){
			        				scope.userPersonInfo.username = res.body.data.name;
			        				scope.userPersonInfo.idcardnumber = res.body.data.cardId;
				        		}else{
				        			scope.alertData.show = true;
									scope.alertData.msg = "请上传清晰的身份证人面像";
									scope.pics[index].pic =  "";
				        		}
				        	},function(res){
				        		scope.alertData.show = true;
								scope.alertData.msg = "识别身份证失败";
								scope.pics[index].pic =  "";
				        	});
				        }else if(index==1){
				        	scope.userPersonInfo.idback = onlinePic;
				        }else if(index==2){
				        	scope.userPersonInfo.carlicencefront = onlinePic;
				        }else if(index==3){
				        	scope.userPersonInfo.carlicenceback = onlinePic;
				        }
					}
					hostApp.takePhoto('getPic');
				});
			},
			selectPic: function(index,e){
				var scope = this;
				scope.pics[index].pic =  window.URL.createObjectURL(e.target.files[0]);
				var img = document.querySelector('.imgSty'+index);
				setTimeout(function(){
					// var aCanvas=document.querySelector('.canvas'+index);
					// var ctx=aCanvas.getContext('2d');
	    //             ctx.drawImage(img, 0, 0, 320, 240);
	    //             scope.pics[index].pic = aCanvas.toDataURL("image/jpg");

	    			var file = e.target.files[0];
					// 上传图片
				  	var file_name = scope.random_string(24);
				    var storeAs = 'attachments/test/' + file_name;
				    scope.showLoading = true;
				    scope.client.multipartUpload(storeAs, file).then(function (result) {
				        var url = result.res.requestUrls[0];
				        url = url.indexOf('?')>0 ? url.substring(0,url.indexOf('?')) : url;
				        scope.showLoading = false;
				        if(index==0){
				        	scope.toastData= {
								show: true,
								text: '上传成功，正在识别身份证...'
							};
							scope.userPersonInfo.idfront = url;
				        	scope.$http.get(BASE_URL + 'app/v1/youTu?url='+scope.userPersonInfo.idfront).then(function(res){
				        		if(res&&res.body&&res.body.success&&res.body.data.name&&res.body.data.cardId){
			        				scope.userPersonInfo.username = res.body.data.name;
			        				scope.userPersonInfo.idcardnumber = res.body.data.cardId;
				        		}else{
				        			scope.alertData.show = true;
									scope.alertData.msg = "请上传清晰的身份证人面像";
									scope.pics[index].pic =  "";
				        		}
				        	},function(res){
				        		scope.alertData.show = true;
								scope.alertData.msg = "请上传清晰的身份证人面像";
								scope.pics[index].pic =  "";
				        	});
				        }else if(index==1){
				        	scope.userPersonInfo.idback = url;
				        }else if(index==2){
				        	scope.userPersonInfo.carlicencefront = url;
				        }else if(index==3){
				        	scope.userPersonInfo.carlicenceback = url;
				        }
				    }).catch(function (err) {
				    	scope.showLoading = false;
				  		scope.alertData.show = true;
						scope.alertData.msg = "上传失败";
						scope.pics[index].pic =  "";
					});
		           
				},100);
			},
			nextStep: function(){
				if(this.isAllInput()){
					this.showLoading = true;
					var param = JSON.parse(JSON.stringify(this.userPersonInfo));
					param.city = param.city.replace(/,/g,"");
					this.$http.post(BASE_URL+'app/v1/user/userInfo?username='+this.isLogin(),param).then(function(res){
						this.showLoading = false;
						if(res&&res.body&&res.body.success){
							localStorage.setItem('userInfoData',JSON.stringify(this.userPersonInfo));
							var query = this.$route.query;
							this.$router.push({path: "/careerInfo",query: query});
						}else{
							this.alertData.show = true;
							this.alertData.msg = res.body.data.errorMessage;
						}
					});
				}
			},
			getUserInfo: function(){
				this.showLoading = true;
				this.$http.get(BASE_URL+'app/v1/user/userInfo?username='+this.isLogin()).then(function(res){
					this.showLoading = false;
					// this.$http.get(BASE_URL+'app/v1/user/userInfo?username=18112772982').then(function(res){
					if(res&&res.body&&res.body.success){
						if(res.body.data.userPersonInfo){
							this.userPersonInfo = res.body.data.userPersonInfo;
							this.pics[0].pic = this.userPersonInfo.idfront;
							this.pics[1].pic = this.userPersonInfo.idback;
							this.pics[2].pic = this.userPersonInfo.carlicencefront;
							this.pics[3].pic = this.userPersonInfo.carlicenceback;
						}
						// 职业信息
						if(res.body.data.occupation){
							localStorage.setItem('occupation',JSON.stringify(res.body.data.occupation));
						}
						// 联系人信息
						if(res.body.data.relative&&res.body.data.relative.length>0){
							localStorage.setItem('relatives',JSON.stringify(res.body.data.relative));
						}
					}else{
						this.alertData.show = true;
						this.alertData.msg = res.body.data.errorMessage;
					}
				});
			}
		},
		beforeCreate(){
			this.setDocumentTitle("身份信息");

		    this.client = new OSS.Wrapper({
			    region: 'oss-cn-shanghai',
			    accessKeyId: 'LTAInakjKlgqgwKN',
			    accessKeySecret: 'mCLx3ySwJdamb3U6yEkWEHbQ3jP3OD',
			    bucket: 'cheyatou'
			});
		},
		created: function(){
			var nowTime = new Date();
			var min = nowTime.getMinutes();
			if(min<10){
				min = '0' + min;
			}
			var nowStr = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate()+ " " + nowTime.getHours()+":"+min;
			localStorage.setItem("fillInTime",nowStr);

			this.getUserInfo();
		},
		mounted:function(){
		 	var area = new LArea();
		    area.init({
		        'trigger': '#address',
		        'valueTo': '#addressVal',
		        'keys': {
		            id: 'value',
		            name: 'text'
		        },
		        'type': 2,
		        'data': [provs_data, citys_data, dists_data]
		    });
		},
	}
</script>
<style scoped>
	.photo{
		padding: 10px 5px 0;
		overflow: hidden;
	}
	.photoBox{
		width: 50%;
		float: left;
		padding: 5px;
	}
	.boxSty{
		height: 100px;
		border: 1px dashed #ed852e;
		border-radius: 5px;
		position: relative;
		padding: 5px;
	}
	.classSty{
		padding-top: 15px;
	}
	.fileSty{
    	position: absolute;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    opacity: 0;
	    width: 100%;
	}
	.imgSty{
		width: 100%;
		height: 100%;
	}
	.iconSty{
		font-size: 30px;
	}
	.nameId{
		margin: 10px 10px 15px;
		border-radius: 5px;
		box-shadow: 0 0 5px #eee;
	}
	.inputBoxSty{
		height: 50px;
		padding: 13px 0 0;
	}
	.selectSty{
		position: relative;
	}
	.arrowDownSty{
		position: absolute;
		right: 20px;
	}
	.inputName{
		float: left;
		height: 25px;
		text-align: center;
		font-size: 15px;
	}
	.inputSty{
		outline: none;
		border: 0;
		font-size: 15px;
		padding-left: 15px;
		width: 68%;
	}
	select.inputSty{
		-webkit-appearance: none;
		background-color: #fff
	}
	.tips{
		height: 42px;
		line-height: 42px;
		padding-left: 20px;
	}
	.perInfo{
		margin: 0 10px 0;
		border-radius: 5px;
		box-shadow: 0 0 5px #eee;
	}
	.btnBox{
		padding: 10px;
	}
	.addInput{
		/*padding-right: 40px;*/
	}
	.canvas{
		display: none;
	}
</style>