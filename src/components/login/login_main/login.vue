<template>
    <div class="login">
<!--      <div class="cover">-->
<!--        <img class="coverImg" src="./css/images/cover.png">-->
<!--      </div>-->
<!--      登录信息      -->
      <div class="infoWrapper">
        <div class="loginWrapper">
        <div class="username">
          <input class="inputItem" id="username" type="text" placeholder="邮箱/手机号" autofocus>
        </div>
        <div class="passwordWrapper">
          <div class="pwTextWrapper">
            <input class="inputItem password" id="password" type="password" placeholder="密码"></div>
            <button class="viewPassword" @click="switchView()">
              <span class="iconfont icon-close-eye" id="viewPwdIcon"></span>
            </button>
        </div>
  <!--     登录按钮       -->
        <div>
          <button class="myBtn login_btn" @click="login()">登录</button>
        </div>
      </div>

      <div class="footer">
        <router-link to="/phoneLogin" class="phoneLogin footerItem">
          <p class="phoneLogin">手机快捷登录</p>
        </router-link>
        <router-link to="/register" class="register footerItem">
          <p class="register">没有账号？点击注册</p>
        </router-link>
        <router-link to="/retrievePwd" class="footerItem">
          <p class="forgetPassword">忘记密码?</p>
        </router-link>
      </div>
<!--     第三方登录      -->
      <div class="otherLoginWays">
        <div class="otherWayTextWrapper">
          <div class="otherWayText">第三方登录</div>
        </div>
        <div class="icons">
          <span class="weixinIcon iconfont">&#xe73b;</span>
          <span class="qqIcon iconfont">&#xe65e;</span>
          <span class="weiboIcon iconfont">&#xe73c;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: "login",
      data(){
        return {};
      },

      // beforeRouteEnter:(to,from,next) => {
      //   next(vm => {
      //     vm.$store.dispatch("setUser",null);
      //   })
      // },

      methods:{
        //密码是否可见
        switchView:() => {
          this.viewPwd = !this.viewPwd;
          if(!this.viewPwd){
            //切换图标
            $('#viewPwdIcon').addClass("icon-close-eye");
            $('#viewPwdIcon').removeClass("icon-ai-eye");
            //隐藏密码
            $('#password').attr("type","password");
          }else{
            $('#viewPwdIcon').removeClass("icon-close-eye");
            $('#viewPwdIcon').addClass("icon-ai-eye");

            $('#password').attr("type","text");
          }
        },

        //登录
        login(){
          let that = this;
          let password = $('#password').val();
          let username = $('#username').val();
          let params = new URLSearchParams();
          const realEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          const realPhone = /^1[3456789]\d{9}$/;
          params.append('username',username);
          params.append('password',password);

          let forIdParams = new URLSearchParams();
          forIdParams.append('username',username);

          if(password !== "" && username !== "" && realPhone.test(username)){
            console.log('phone');
            this.axios.post(this.commonUrl+'/api/v1.0/user/login/tel',params)
              .then(function(res){
                console.log(res)
                //存储登录状态
                sessionStorage.setItem("isLogin",res.data.authenticated);
                console.log(sessionStorage.getItem("isLogin"));

                //发送请求,根据username获取user_id
                that.axios.post(that.commonUrl+'/api/v1.0/user/user',forIdParams)
                  .then((res)=>{
                    console.log(res);
                    sessionStorage.setItem("userId",res.data.data.id);
                    console.log(sessionStorage.getItem("userId"));
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
                // sessionStorage.setItem("userToken",res.data)
                // this.$store.dispatch("setUser" ,res.data.principal.username)
                // this.$store.dispatch("setToken",res.data)
                // console.log(this.$store.state.isLogin)
                that.$layer.alert('登录成功');
                setTimeout(()=>{
                  that.$router.push({path:'/main'})
                },3000);
              })
              .catch(function(err){
                that.$layer.alert('用户名或密码错误');
              });
          }if(password!=="" && username!=="" && realEmail.test(username)){
            console.log('email')
            that.axios.post(this.commonUrl+'/api/v1.0/user/login/tel',params)
              .then((res)=>{
                console.log(res)
                forIdParams.append('username',res.data.principal.username);
                this.axios.post(this.commonUrl+'/api/v1.0/user/user',forIdParams)
                  .then((res)=>{
                    console.log(res);
                    // sessionStorage.setItem("userId",res.data.principal.user_id);
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
                that.$layer.alert('登录成功');
                setTimeout(()=>{ this.$router.push({path:'/main'})},2000);
              })
              .catch((err)=>{
                that.$layer.alert('用户名或密码错误');
              })
          }else if (password === "" || username === "" || password === null || username === null) {
            that.$layer.alert('用户名和密码不能为空');
          }
        }
      }
    }
</script>

<style scoped>
  @import "css/login.css";
</style>
