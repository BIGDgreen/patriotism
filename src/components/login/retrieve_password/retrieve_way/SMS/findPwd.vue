<template>
    <div class="SMSFindPwd">
      <div class="head"><step></step></div>
      <div class="content">
        <getVerify secondBtnName="下一步" v-on:goNextStep="goNext" v-on:getNewCode="getCode"></getVerify>
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
        getCode() {
          //重新发送验证码
          let that = this;
          let params = new URLSearchParams();
          console.log(this.$route.params.phone);
          params.append('tel',this.$route.params.phone);
          params.append('action','reset');
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
        goNext() {
          let that = this;
          // let params = new URLSearchParams();
          let phone = this.$route.params.phone;
          // console.log(phone);
          let code = $('#simpleInput1').val();
          // console.log(code);
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
              // console.log(res);
              sessionStorage.setItem('sms_key',res.data);
              if (res.status === 'success') {
                this.$router.push({name:'SMS_resetPwd',params:{
                    tel:phone
                  }});
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
          @media (min-width: 360px){
            input {
              top: 21%;
            };
          }
          // 六个span的样式
          .spanWrapper {
            top: 25%;
          }
          @media (min-width: 360px){
            .spanWrapper {
              top: 21%;
            };
          }
        }
      }
    }
  }
</style>
