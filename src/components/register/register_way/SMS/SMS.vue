<template>
    <div class="SMS">
      <div class="head">
        <div><step></step></div>
      </div>

      <div class="phoneItem_wrapper">
        <phoneLogin v-on:toNext="toNext()" v-on:toLast="toLast()" :errMsg="errorMsg"></phoneLogin>
      </div>

    </div>
</template>

<script>
  import step from '../../register_step_head'
  import phoneLogin from '../../../phone_login_template'
    export default {
      name: "SMS",
      data(){
        return{
          errorMsg:""
        }
      },
      components:{
        step,
        phoneLogin
      },
      methods:{
        toLast(){
          this.$router.push({path:'/register'});
        }
        ,toNext(){
          let phone = $("#phoneNum").val();
          let that = this;
          if(!(/^1[3456789]\d{9}$/.test(phone))){
            $('#tip1').css('display','block');
            return false;
          }else {
            let params = new URLSearchParams();
            params.append('tel',phone);
            params.append('action','register');
            this.axios.post(this.commonUrl+'/api/v1.0/sys/sms/send',params)
              .then(function (res) {
                if(res.data.status==='success'){
                  that.$router.push({path:`/register/SMS/SMS_verify/${phone}`});
                }else{
                  that.errorMsg="err："+res.data.data.errorMsg;
                  $("#tip2").css('display','block');
                }
                console.log(res);
              })
              .catch(function (err) {
              console.log(err);
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .SMS{
    font-size: .68em;
    margin: 0 auto;
  }

  .head {
    /deep/ .step2 {
      color: @mainColor;
    }
  }

  .phoneItem_wrapper{
    /deep/ .phoneLoginTemplate{
      font-size: 1em;
    }
  }
</style>
