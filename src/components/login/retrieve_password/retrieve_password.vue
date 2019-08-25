<template>
    <div class="retrievePwd">
      <div class="head">
        <div><step></step></div>
      </div>
      <div class="verifyMean">

        <router-link to="./retrievePwd/SMS" class="verifyBtn_wrapper">
            <button class="verifyBtn SMS">
              短信验证
              <span class="arrow"> > </span>
            </button>
        </router-link>

        <router-link to="./retrievePwd/Email" class="verifyBtn_wrapper">
          <button class="verifyBtn Email">
            邮箱验证
            <span class="arrow"> > </span>
          </button>
        </router-link>
      </div>
      <div class="return_login">
        <button class="myBtn" @click="returnLogin()">返回登录页面</button>
      </div>
    </div>
</template>

<script>
  import step from './retrieve_step_head'
    export default {
      name: "retrieve_password",
      components:{
          step
      },
      methods:{
        returnLogin(){
          this.$router.push({path:"/"});
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;

  .retrievePwd{
    font-size: .68em;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;

    .head {
      /*padding-top: .1em;*/
      /deep/ .step1 {
        color: @mainColor;
      }
    }

    .verifyBtn_wrapper{
      margin-top:.4em;
      text-decoration: none;
    }

    .verifyBtn{
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: white;
      border: 0;
      padding: .4em;
      margin-top: .6em;
      &:active{
        background: #fafafa;
      }
      .arrow{
        color: #bbbbbb;
        padding-right: .3em;
        font-size: 1.4em;
      }
    }

    .return_login{
      width: 90%;
      margin: 0 auto;
    }
  }

</style>
