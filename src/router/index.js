import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 登录注册相关
// import login from '../components/login/login_main/login'
// import phoneVerify from '../components/login/phone_login/get_verification'
// import phoneLogin from '../components/login/phone_login/phone_login'
// import retrievePwd from '../components/login/retrieve_password/retrieve_password'
//
// import SMS_verify from '../components/login/retrieve_password/retrieve_way/SMS/SMS'
// import SMS_findPwd from '../components/login/retrieve_password/retrieve_way/SMS/findPwd'
// import SMS_resetPwd from '../components/login/retrieve_password/retrieve_way/resetPwd'
//
// import Email_verify from "../components/login/retrieve_password/retrieve_way/Email/Email"
// import Email_findPwd from '../components/login/retrieve_password/retrieve_way/Email/findPwd'
// import Email_resetPwd from '../components/login/retrieve_password/retrieve_way/resetPwd'
//
// import register from '../components/register/register'
// import Email_register from '../components/register/register_way/Email/Email'
// import EmailRegister_verify from '../components/register/register_way/Email/EmailRegister_verify'
// import Email_setUserInfo from '../components/register/register_way/Email/EmailSetUserInfo'
// import SMS_register from "../components/register/register_way/SMS/SMS"
// import SMSRegister_verify from '../components/register/register_way/SMS/SMSRegister_verify'
// import SMS_setUserInfo from '../components/register/register_way/SMS/SMSSetUserInfo'

import mainPage from '../components/main/mainPage'
import listDetail from '../components/main/list_item/list_detail'
import tagSearch from '../components/main/tagSearch'
import blank from '../components/blank'
import addInfo from '../components/AddInfo'

export default new Router({
  mode: 'history',
  routes: [
    //账号密码登录
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login
    // }
    // //手机快捷登录
    // , {
    //   path: '/phoneLogin',
    //   name: 'phoneLogin',
    //   component: phoneLogin
    // }
    // //获取并填入验证码
    // , {
    //   path: '/phoneLogin/getVerify/:phone',
    //   name: 'getVerify',
    //   component: phoneVerify
    // }
    // //找回密码
    // , {
    //   path: '/retrievePwd',
    //   name: 'retrievePwd',
    //   component: retrievePwd
    // }
    // //短信验证找回密码
    // , {
    //   path: '/retrievePwd/SMS',
    //   name: 'SMS_verify',
    //   component: SMS_verify
    // }
    // , {
    //   path: '/retrievePwd/SMS/findPwd/:phone',
    //   name: 'SMS_findPwd',
    //   component: SMS_findPwd
    // }
    // , {
    //   path: '/retrievePwd/SMS/findPwd/:phone/resetPwd',
    //   name: 'SMS_resetPwd',
    //   component: SMS_resetPwd
    // }
    // //邮箱验证找回密码
    // , {
    //   path: '/retrievePwd/Email',
    //   name: 'Email_verify',
    //   component: Email_verify
    // }
    // , {
    //   path: '/retrievePwd/Email/findPwd',
    //   name: 'Email_findPwd',
    //   component: Email_findPwd
    // }
    // , {
    //   path: '/retrievePwd/Email/findPwd/resetPwd',
    //   name: 'Email_resetPwd',
    //   component: Email_resetPwd
    // }
    // //注册
    // , {
    //   path: '/register',
    //   name: 'register',
    //   component: register
    // }
    // //邮箱注册
    // , {
    //   path: '/register/Email',
    //   name: 'Email_register',
    //   component: Email_register
    // }
    // , {
    //   path: '/register/Email/Email_verify/:email',
    //   name: 'EmailRegister_verify',
    //   component: EmailRegister_verify
    // }
    // , {
    //   path: '/register/Email/Email_verify/:email/:email_key/setUserInfo',
    //   name: 'Email_setUserInfo',
    //   component: Email_setUserInfo
    // }
    // //手机注册
    // , {
    //   path: '/register/SMS',
    //   name: 'SMSRegister_verify',
    //   component: SMS_register
    // }
    // , {
    //   path: '/register/SMS/SMS_verify/:phone',
    //   name: 'SMSRegister_verify',
    //   component: SMSRegister_verify
    // }
    // , {
    //   path: '/register/SMS/SMS_verify/:phone/:sms_key/setUserInfo',
    //   name: 'SMS_setUserInfo',
    //   component: SMS_setUserInfo
    // }
    //主页
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    }
    //详情
    , {
      path: '/main/listDetail',
      name: 'listDetail',
      component: listDetail
    }
    //标签搜索
    , {
      path: '/main/tagSearch',
      name: 'tagSearch',
      component: tagSearch,
      meta: {
        keepAlive: true
      }
    }
    ,{
      path: '/blank',
      name: 'blank',
      component: blank,
    }
    ,{
      path: '/addInfo',
      name: 'addInfo',
      component: addInfo,
    }
  ]
})
