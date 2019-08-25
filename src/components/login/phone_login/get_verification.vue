<template>
    <div class="getVerify">
     <phoneVerify secondBtnName="快捷登录" v-on:goNextStep="quickLogin" method="login"></phoneVerify>
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
