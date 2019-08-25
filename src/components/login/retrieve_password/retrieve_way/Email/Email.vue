<template>
  <div class="Email">
    <div class="head">
      <div><step></step></div>
    </div>

      <form>
        <div class="inputWrapper">
          <div class="title">邮箱:</div>
          <input type="text" class="inputItem" id="email" placeholder="请填入邮箱地址" required>
        </div>
        <div id="warn">邮箱格式不正确！</div>
      </form>

      <div class="btnWrapper">
        <button class="myBtn" @click="golast()">上一步</button>
        <button class="myBtn" @click="gonext()">下一步</button>
      </div>

  </div>
</template>

<script>
  import step from '../../retrieve_step_head'
  export default {
    name: "Email",
    components:{
      step
    },
    methods:{
      golast(){
        this.$router.push({path:'/retrievePwd'});
      },
      gonext(){
        let email = $('#email').val();
        let that = this;
        const realEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(realEmail.test(email)){
          let params = new URLSearchParams();
          params.append('address',email);
          params.append('action','register');
          this.axios.post(this.commonUrl+'/api/v1.0/sys/email/send',params)
            .then(function (res) {
              if(res.data.status==='success'){
                that.$router.push({path:`/retrievePwd/Email/findPwd/${email}`})
              }else{
                that.errMsg="err："+res.data.data.errorMsg;
                $("#errMSg").css('display','block')
              }
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            })
        }else{
          $('#warn').css('display','block');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .Email{
    font-size: .68em;
    width: 90%;
    margin: 0 auto;
    .inputWrapper{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .title{
        font-size: .58em;
        width: 20%;
        margin-top: 14px;
      }
      .inputItem{
        flex-grow: 1;
        padding-left: .4em;
      }
    }

    #warn{
      font-size: .4em;
      color: red;
      margin-left: 4em;
      margin-top: .2em;
      display: none;
    }
    .btnWrapper{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .myBtn{
        width: 40%;
      }
    }

  }

  .head {
    /deep/ .step2 {
      color: @mainColor;
    }
  }
</style>
