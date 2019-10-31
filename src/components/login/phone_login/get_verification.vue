<template>
    <div class="getVerify">
     <phoneVerify secondBtnName="快捷登录" v-on:goNextStep="quickLogin" v-on:getNewCode="getCode" method="login"></phoneVerify>
    </div>
</template>

<script>
  import phoneVerify from '../../phoneVerify_template'
    export default {
      name: "get_verification",
      data(){
        return{
        };
      },
      components:{
        phoneVerify
      },
      methods:{
        getCode() {
          //重新发送验证码
          let that = this;
          let params = new URLSearchParams();
          console.log(this.phoneNum);
          params.append('tel',this.$route.params.phone);
          params.append('action','login');
          console.log(params);
          this.axios.post(this.commonUrl+'/api/v1.0/sys/sms/send',params)
            .then(function (res) {
              if(res.data.status==='success'){
                that.timeOut = false;
                that.countDownTime = 60;
                that.countDown();
              }else{
                console.log(res.data.data.errorMsg);
                // alert(res.data.data.errorMsg);
              }
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            })
        },
        quickLogin(){
          let params = new URLSearchParams();
          let phone = this.$route.params.phone;
          let code = $("#simpleInput1").val();
          let that = this;
          params.append('tel',phone);
          params.append('code',code);
          this.axios.post(this.commonUrl+'/api/v1.0/user/login/sms',params)
            .then(function (res) {
                that.$router.push({path:'/main'});
                console.log(res);
            })
            .catch(function (err) {
              that.$layer.alert('用户名或验证码错误');
              console.log(err);
            })
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
