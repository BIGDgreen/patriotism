<template>
    <div class="resetPwd">
      <div class="head"><step></step></div>
      <div>
        <div class="input_wrapper">
          <div class="newPwd">
            <div class="tag">重置密码：</div>
            <input class="inputItem" id="firstPwd" type="password" required>
          </div>
          <div class="newPwd">
            <div class="tag">再次输入：</div>
            <input class="inputItem" id="secondPwd" type="password" required>
          </div>
        </div>
        <div id="warn">两次密码输入不一致!</div>
        <button class="myBtn" @click="finish()">完成</button>
      </div>
    </div>
</template>

<script>
  import step from '../retrieve_step_head'
    export default {
      name: "resetPwd",
      components:{
          step
      },
      methods:{
        finish(){
          let firstVaule = $('#firstPwd').val();
          let secondVaule = $('#secondPwd').val();
          if(firstVaule!==secondVaule){
            $('#warn').css('display','block');
          } else {
            console.log("tel",this.$route.params.tel);
            // alert("11");
            // 发送请求
            let params = new URLSearchParams();
            params.append('password',secondVaule);
            params.append('sms_key',sessionStorage.getItem('sms_key'));
            params.append('tel',this.$route.params.tel);
            this.axios.post(this.commonUrl+'/api/v1.0/user/resetPassword',params)
              .then((res) => {
                // console.log(res);
                this.$router.push({path: '/'});
              })
              .catch((err) => {
                console.log(err);
              })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .resetPwd{
    font-size: .68em;
    width: 90%;
    margin: 0 auto;
    .input_wrapper{
      font-size: .4em;
      .newPwd{
        display: flex;
        flex-direction: row;
        justify-content: center;
        .tag{
          font-size: 1.32em;
          margin-top: 14px;
        }
        .inputItem{
          width: 70%;
          font-size: 1.1em;
          padding-left: .4em;
        }
      }
    }

    #warn{
      display: none;
      color: red;
      font-size: .4em;
      text-align: center;
    }
  }

  .head {
    /deep/ .step4 {
      color: @mainColor;
    }
  }
</style>
