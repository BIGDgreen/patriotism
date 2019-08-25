<template>
    <div class="SMSFindPwd">
      <div class="head"><step></step></div>
      <div class="content">
        <getVerify secondBtnName="下一步" v-on:goNextStep="goNext"></getVerify>
      </div>
    </div>
</template>

<script>
  import step from '../../retrieve_step_head'
  import getVerify from '../../../../phoneVerify_template'
    export default {
      name: "findPwd",
      components:{
        getVerify,
        step
      },
      methods:{
        goNext() {
          let that = this;
          // let params = new URLSearchParams();
          let phone = this.$route.params.phone;
          console.log(phone);
          let code = $('#simpleInput1').val();
          console.log(code);
          // params.append('tel',phone);
          // params.append('code',code);
          $.ajax({
            url: this.commonUrl + '/api/v1.0/sys/sms/validate',
            async: true,
            type: "POST",
            data: {
              _method: "PUT",
              tel: phone,
              code: code
            },
            dataType: "json",
            success: (res) => {
              console.log(res.data);
              if (res.status === 'success') {
                this.$router.push({path:'/retrievePwd/SMS/findPwd/:phone/resetPwd'});
                // that.$router.push({name: "SMS_setUserInfo", params: {phone: phone, sms_key: res.data}})
              } else {
                console.log(res.data.errorMsg);
                that.$layer.alert(res.data.errorMsg);
              }
            }, error: (err) => {
              console.log(err);
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .SMSFindPwd{
    font-size: .68em;
  }

  .head {
    /deep/ .step3 {
      color: @mainColor;
    }
  }

  .content {
    /deep/ .getVerify {
      font-size: .56em;
      .countDownWrapper{
        font-size: .7em;
      }
      .inputWrapper {
        .input-box {
          input {
            top: 24%;
          }
          // 六个span的样式
          .spanWrapper {
            top: 25%;
          }
        }
      }
    }
  }
</style>
