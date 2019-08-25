<template>
  <div class="phoneItem_wrapper">
    <phoneLogin v-on:toNext="toNext()" v-on:toLast="toLast()" :errMsg=errorMsg></phoneLogin>
  </div>
</template>

<script>
  import $ from 'jquery'
  import phoneLogin from '../../phone_login_template'
    export default {
      name: "phone_login",
      components:{
        phoneLogin,
      },
      data(){
        return{
          errorMsg:""
        }
      },
      methods:{
        toLast(){
          this.$router.push({path:'/'});
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
              params.append('action','login');
              this.axios.post(this.commonUrl+'/api/v1.0/sys/sms/send',params)
                .then(function (res) {
                  console.log(res);
                  if(res.data.status==='success'){
                    that.$router.push({path:`/phoneLogin/getVerify/${phone}`});
                  }else{
                    that.errorMsg="err："+res.data.data.errorMsg;
                    $("#tip2").css('display','block');
                  }
                })
                .catch(function (err) {
                  console.log(err);
                })
            this.$router.push({path:`/phoneLogin/getVerify/${phone}`});
          }
        }
      }
    }
</script>

<style scoped>
  .phoneLogin{
    width: 90%;
    margin: 0 auto;
    font-size: .68em;
  }

  .phoneInput{
    display: flex;
    flex-direction: row;
    margin-top: 6%;
  }

  .areaTag{
    padding-top: .4em;
    padding-left: .4em;
  }

  .inputItem{
    width: 14%;
  }

  .phoneNum{
    flex-grow: 1;
    padding-left: .3em;
  }

  .tip{
    color: red;
    font-size: .28em;
    display: none;
  }

  .myBtn_wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .myBtn{
    width: 40%;
  }
</style>
