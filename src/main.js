window.isWX =true;
/*window.isWX =isWx();

function isWx() { //判断微信系统
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isAndroid||isiOS){
   		return false;
   	}else{
   		return true;
   	}
}*/
//window.BASE_URL = "http://car.ycode.cn/";
//window.BASE_URL = 'http://120.55.240.208:9091/';
window.BASE_URL = 'http://192.168.1.9:9090/';//测试
//window.BASE_URL = 'http://wx.yinlailease.com:9090/';//正式
window.addEventListener('hashchange',function(){
    var gearDate = document.querySelector('.gearDate');
    if(gearDate){
        document.querySelector('body').removeChild(gearDate);
    }
    var gearArea = document.querySelector('.gearArea');
    if(gearArea){
      document.querySelector('body').removeChild(gearArea);
    }
});

import Vue from 'vue'
import VueRouter from './js/vue-router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

import toast from './components/toast.vue'
import alertModal from './components/alertModal.vue'
import confirmModal from './components/confirmModal.vue'
import loading from './components/loading.vue'
import Tips from './components/Tips.vue'
import YQTK from './components/yqtk.vue'
import codeModal from './components/codeModal.vue'
import Invite from './components/Invite.vue'
Vue.component('toast', toast);
Vue.component('alertModal', alertModal);
Vue.component('confirmModal', confirmModal);
Vue.component('loading', loading);
Vue.component('Tips', Tips);
Vue.component('codeModal', codeModal);
Vue.component('YQTK', YQTK);
Vue.component('Invite', Invite);
import './font.css'
import './common.css'
Vue.use(ElementUI)

const homePage = r => require.ensure([], () => r(require('./views/homePage.vue')), 'chunkHomePage')
const selectCity = r => require.ensure([], () => r(require('./views/selectCity.vue')), 'selectCity')
const homePage2 = r => require.ensure([], () => r(require('./views/homePage2.vue')), 'chunkHomePage2')
const carRefund = r => require.ensure([], () => r(require('./views/carRefund.vue')), 'chunkmain')
const carService = r => require.ensure([], () => r(require('./views/carService.vue')), 'chunkmain')
const me = r => require.ensure([], () => r(require('./views/me.vue')), 'chunkmain')

// 查询流程
const activeDetail = r => require.ensure([], () => r(require('./views/activeDetail.vue')), 'chunkSearch')
const carDetail = r => require.ensure([], () => r(require('./views/carDetail.vue')), 'chunkHomePage')
const login = r => require.ensure([], () => r(require('./views/login.vue')), 'chunkSearch')
const loginPage = r => require.ensure([], () => r(require('./views/loginPage.vue')), 'chunkSearch')
const carList = r => require.ensure([], () => r(require('./views/carList.vue')), 'chunkSearch')

// 下单流程
const confirmOrder = r => require.ensure([], () => r(require('./views/confirmOrder.vue')), 'chunkCreateOrder')
const fixAddress = r => require.ensure([], () => r(require('./views/fixAddress.vue')), 'chunkCreateOrder')
const selectAddress = r => require.ensure([], () => r(require('./views/selectAddress.vue')), 'chunkCreateOrder')
const paySuccess = r => require.ensure([], () => r(require('./views/paySuccess.vue')), 'chunkCreateOrder')

// 认证流程
const IDInfo = r => require.ensure([], () => r(require('./views/IDInfo.vue')), 'chunkValidID')
const careerInfo = r => require.ensure([], () => r(require('./views/careerInfo.vue')), 'chunkValid')
const relativeInfo = r => require.ensure([], () => r(require('./views/relativeInfo.vue')), 'chunkValid')
const validPhone = r => require.ensure([], () => r(require('./views/validPhone.vue')), 'chunkValid')
const submitSuccess = r => require.ensure([], () => r(require('./views/submitSuccess.vue')), 'chunkValid')

// 签约流程
const sign = r => require.ensure([], () => r(require('./views/sign.vue')), 'chunkSign')
const confirmSign = r => require.ensure([], () => r(require('./views/confirmSign.vue')), 'chunkSign')
const fillRefundInfo = r => require.ensure([], () => r(require('./views/fillRefundInfo.vue')), 'chunkSign')
const applyRefund = r => require.ensure([], () => r(require('./views/applyRefund.vue')), 'chunkSign')


// /*车主服务*/
const carInstuceBuy = r => require.ensure([], () => r(require('./views/carInstuceBuy.vue')), 'chunkService')
const serReport = r => require.ensure([], () => r(require('./views/serReport.vue')), 'chunkService')
const serRoad = r => require.ensure([], () => r(require('./views/serRoad.vue')), 'chunkService')
const serRepair = r => require.ensure([], () => r(require('./views/serRepair.vue')), 'chunkService')
const ylFoundation = r => require.ensure([], () => r(require('./views/ylFoundation.vue')), 'chunkService')
const ylApply = r => require.ensure([], () => r(require('./views/ylApply.vue')), 'chunkService')

// /*我的*/
const set = r => require.ensure([], () => r(require('./views/set.vue')), 'chunkme')
const account = r => require.ensure([], () => r(require('./views/account.vue')), 'chunkme')
const aboutUs = r => require.ensure([], () => r(require('./views/aboutUs.vue')), 'chunkme')
const notice = r => require.ensure([], () => r(require('./views/notice.vue')), 'chunkme')
const helpCenter = r => require.ensure([], () => r(require('./views/helpCenter.vue')), 'chunkme')
const hotLine = r => require.ensure([], () => r(require('./views/hotLine.vue')), 'chunkme')
const recommend = r => require.ensure([], () => r(require('./views/recommend.vue')), 'chunkme')
const noticeDetail = r => require.ensure([], () => r(require('./views/noticeDetail.vue')), 'chunkme')
const applyBill = r => require.ensure([], () => r(require('./views/applyBill.vue')), 'chunkme')
const myOrder = r => require.ensure([], () => r(require('./views/myOrder.vue')), 'chunkme')
const billAlert = r => require.ensure([], () => r(require('./views/billAlert.vue')), 'chunkme')
const personData = r => require.ensure([], () => r(require('./views/personData.vue')), 'chunkme')
const personEdit = r => require.ensure([], () => r(require('./views/personEdit.vue')), 'chunkme')
const oneKeyBill = r => require.ensure([], () => r(require('./views/oneKeyBill.vue')), 'chunkme')
const addBankCard = r => require.ensure([], () => r(require('./views/addBankCard.vue')), 'chunkme')
const billList = r => require.ensure([], () => r(require('./views/billList.vue')), 'chunkme')
const helpDetail = r => require.ensure([], () => r(require('./views/helpDetail.vue')), 'chunkme')
const seeContracts = r => require.ensure([], () => r(require('./views/seeContracts.vue')), 'chunkme')
const refundOrder = r => require.ensure([], () => r(require('./views/refundOrder.vue')), 'chunkme')
const loadOrder = r => require.ensure([], () => r(require('./views/loadOrder.vue')), 'chunkme')
const activeRules = r => require.ensure([], () => r(require('./views/activeRules.vue')), 'chunkme')
    // /*我要还款*/

const repayHistory = r => require.ensure([], () => r(require('./views/repayHistory.vue')), 'chunkBill')
const remainPayment = r => require.ensure([], () => r(require('./views/remainPayment.vue')), 'chunkBill')
const carParticulars = r => require.ensure([], () => r(require('./views/carParticulars.vue')), 'chunkBill')

const vioDetail = r => require.ensure([], () => r(require('./views/vioDetail.vue')), 'vioDetail')
const searchVio = r => require.ensure([], () => r(require('./views/searchVio.vue')), 'searchVio')
const searchVioR = r => require.ensure([], () => r(require('./views/searchVioR.vue')), 'searchVioR')
const vioList = r => require.ensure([], () => r(require('./views/vioList.vue')), 'vioList')
const supInfo = r => require.ensure([], () => r(require('./views/supInfo.vue')), 'supInfo')
const vioOrder = r => require.ensure([], () => r(require('./views/vioOrder.vue')), 'vioOrder')

// /*收藏车辆*/
const carCollect = r => require.ensure([], () => r(require('./views/carCollect.vue')), 'carCollect')
// 当前环境
Vue.prototype.isWX = window.isWX;

Vue.prototype.getWeek = function(e){
      var aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return aWeek[e];
}
Vue.prototype.dateFormat = function(date,format){
    var scope = this;
    var o = {
          "M+": date.getMonth() + 1,
          "d+": date.getDate(),
          "h+": date.getHours(),
          "m+": date.getMinutes(),
          "s+": date.getSeconds(),
          "q+": Math.floor((date.getMonth() + 3) / 3),
          "S": date.getMilliseconds(),
          "w+": scope.getWeek(date.getDay())
      };

      if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
      return format;
  }

// 设置页面title
Vue.prototype.setDocumentTitle = function(title) {
        document.querySelector('title').innerHTML = title;
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // if(isiOS){
          var time = setInterval(function() {
            if (window.HostApp) {
                clearInterval(time);
                window.HostApp.getTitle(title);
            }
          }, 10);
        // }
        
    }
    // 判空
Vue.prototype.vaildNull = function(data) {
    if (data === "" || data == undefined || data == null) {
        return true;
    }
    return false;
}
Vue.prototype.isLogin = function() {
    var username = localStorage.getItem('username');
    if (username && username != undefined && username != null) {
        return username;
    }
    return false;
}

Vue.prototype.getHostApp = function(fn) {
    var time = setInterval(function() {
        if (window.HostApp) {
            clearInterval(time);
            fn && fn(window.HostApp);
        }
    }, 10);
}

Vue.prototype.takePhone = function() {
    var time = setInterval(function() {
        if (window.HostApp) {
            clearInterval(time);
            window.HostApp.call('400-098-2118');
        }
    }, 10);
}

Vue.prototype.token = "";

Vue.use(VueRouter);
Vue.use(VueResource);
// 全局修改请求头
// Vue.http.interceptors.push(function (request, next) {
//     // 调用等待框，此处的 this 为发起请求的 component

//     next(function (response) {
//         // 消掉等待框，此处的 this 为发起请求的 component
//     })
// })



//genartor VueRouter object
const router = new VueRouter({
    routes: [
      { path: '/carService', component: carService, name: 'carService' },
      { path: '/carRefund', component: carRefund, name: 'carRefund' },
      { path: '/me', component: me, name: 'me' },
      { path: '/personEdit', component: personEdit, name: 'personEdit' },
      { path: '/carService/carInstuceBuy', component: carInstuceBuy, name: 'carInstuceBuy' },
      { path: '/carService/serReport', component: serReport, name: 'serReport' },
      { path: '/carService/serRoad', component: serRoad, name: 'serRoad' },
      { path: '/carService/serRepair', component: serRepair, name: 'serRepair' },
      { path: '/carService/ylFoundation', component: ylFoundation, name: 'ylFoundation' },
      { path: '/aboutUs', component: aboutUs, name: 'aboutUs' },
      { path: '/set', component: set, name: 'set' },
      { path: '/account', component: account, name: 'account' },
      { path: '/notice', component: notice, name: 'notice' },
      { path: '/helpCenter', component: helpCenter, name: 'helpCenter' },
      { path: '/hotLine', component: hotLine, name: 'hotLine' },
      { path: '/recommend', component: recommend, name: 'recommend' },
      { path: '/selectCity', component: selectCity, name: 'selectCity' },
      { path: '/repayHistory/:id', component: repayHistory, name: 'repayHistory' },
      { path: '/remainPayment/:id', component: remainPayment, name: 'remainPayment' },
      { path: '/carParticulars', component: carParticulars, name: 'carParticulars' },
      { path: '/noticeDetail', component: noticeDetail, name: 'noticeDetail' },
      { path: '/applyBill', component: applyBill, name: 'applyBill' },
      { path: '/helpDetail', component: helpDetail, name: 'helpDetail' },
      { path: '/seeContracts', component: seeContracts, name: 'seeContracts' },
      { path: '/refundOrder', component: refundOrder, name: 'refundOrder' },
      { path: '/loadOrder', component: loadOrder, name: 'loadOrder' },
      { path: '/activeRules', component: activeRules, name: 'activeRules' },
      { path: '/ylApply', component: ylApply, name: 'ylApply' },

      { path: '/searchVio', component: searchVio, name: 'searchVio' },
      { path: '/searchVioR', component: searchVioR, name: 'searchVioR' },
      { path: '/vioDetail', component: vioDetail, name: 'vioDetail' },
      { path: '/vioList', component: vioList, name: 'vioList' },
      { path: '/supInfo', component: supInfo, name: 'supInfo' },
      { path: '/vioOrder', component: vioOrder, name: 'vioOrder' },
      { path: '/carCollect', component: carCollect, name: 'carCollect' },

      {
          path: '/myOrder',
          component: myOrder,
          name: 'myOrder'

      },
      { path: '/billAlert', component: billAlert, name: 'billAlert' },
      { path: '/personData', component: personData, name: 'personData' },
      { path: '/oneKeyBill', component: oneKeyBill, name: 'oneKeyBill' },
      { path: '/addBankCard', component: addBankCard, name: 'addBankCard' },
      {
          path: '/billList',
          component: billList,
          name: 'billList'

      },
      {
          path: "/",
          component: homePage,
          name: '/homePage'
      },
      {
          path: "/homePage2",
          component: homePage2,
          name: 'homePage'
      },
      {
          path: "/homepage",
          component: homePage,
          // name: '/homePage'
      },
      {
          path: "/activeDetail/:id",
          component: activeDetail
      },
      {
          path: "/carList",
          component: carList
      },
      {
          path: "/carDetail/:id",
          component: carDetail
      },
      {
          path: "/login",
          component: login
      },
      {
          path: "/loginPage",
          component: loginPage
      },
      {
          path: "/confirmOrder/:id",
          component: confirmOrder
      },
      {
          path: "/fixAddress",
          component: fixAddress
      },
      {
          path: "/selectAddress",
          component: selectAddress
      },
      {
          path: "/paySuccess",
          component: paySuccess
      },
      {
          path: "/IDInfo",
          component: IDInfo
      },
      {
          path: "/relativeInfo",
          component: relativeInfo
      },
      {
          path: "/careerInfo",
          component: careerInfo
      },
      {
          path: "/validPhone",
          component: validPhone
      },
      {
          path: "/submitSuccess",
          component: submitSuccess
      },
      {
          path: "/sign",
          component: sign
      },
      {
          path: "/confirmSign",
          component: confirmSign
      },
      {
          path: "/fillRefundInfo",
          component: fillRefundInfo
      },
      {
          path: "/applyRefund",
          component: applyRefund
      }
  ]
});

//bind and render
const app = new Vue({
    router: router,
    el: '#app',
    // render: h => h(App),
    methods: {
        getUserInfo: function() {
            var param = location.hash.substr(2);
            // if(localStorage.getItem('userInfo')&&localStorage.getItem('userInfo')!=undefined){
            //   var openid = JSON.parse(localStorage.getItem('userInfo')).openid;
            //   param += ('&openid=' + openid)
            // }
            if (param.indexOf('?code=') >= 0) {
                this.$http.get(BASE_URL + 'app/v1/weChat/user' + param).then(function(res) {
                    if (res && res.body && res.body.success) {
                        var userInfo = res.body.data;
                        localStorage.setItem('userInfo', userInfo);
                    }
                });
            }
        }
    },
    created: function() {
        if (this.isWX) {
            window.wx = require('weixin-js-sdk');
            var param = {
                url: location.href.split('#')[0]
            }
            this.$http.get(BASE_URL + 'app/v1/weChat/signature', { params: param }).then(function(res) {
                if (res && res.body && res.body.success) {
                    wx.config({
                        debug: false,
                        appId: res.body.data.appid,
                        timestamp: res.body.data.timestamp,
                        nonceStr: res.body.data.nonceStr,
                        signature: res.body.data.signature,
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'hideAllNonBaseMenuItem',
                            'showMenuItems'
                        ]
                    });

                    wx.ready(function() {
                        wx.hideAllNonBaseMenuItem();

                        wx.showMenuItems({
                            menuList: [
                                'menuItem:share:appMessage',
                                'menuItem:share:timeline',
                                'menuItem:favorite'
                            ]
                        });
                        setTimeout(function() {
                            // 分享
                            var shareData = {
                                title: '车丫头',
                                desc: '邀您加入',
                                link: 'http://wx.yinlailease.com/OAuth2.html',
                                imgUrl: 'http://wx.yinlailease.com/logo.jpg'
                            }
                            wx.onMenuShareAppMessage(shareData);
                            wx.onMenuShareTimeline(shareData);
                        }, 100);
                    });
                }
            });
            this.getUserInfo();
        } else { // app端
            window.scope = this;
            window.toMsg = function() {
                window.scope.$router.push({ path: "/recommend" });
            }

            // window.pushMsg = function(id) {
            //     localStorage.setItem('pushId', id);
            // }

            var time = setInterval(function() {
              if (window.HostApp) {
                  clearInterval(time);
                  window.getId = function(id){
                    localStorage.setItem('pushId', id);
                  }
                  window.HostApp.pushMsg('getId');
              }
            }, 10);
        }
    },
});
