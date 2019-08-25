<template>
  <div class="register_wrapper">
    <div class="register">
      <div class="head">
        <div><step></step></div>
      </div>
      <div class="verifyMean">

        <router-link to="./register/SMS" class="verifyBtn_wrapper">
            <button class="verifyBtn SMS">
              手机注册
              <span class="arrow"> > </span>
            </button>
        </router-link>

        <router-link to="./register/Email" class="verifyBtn_wrapper">
          <button class="verifyBtn Email">
            邮箱注册
            <span class="arrow"> > </span>
          </button>
        </router-link>
      </div>
    </div>
    <div class="return_login">
      <button class="myBtn" @click="returnLogin()">返回登录页面</button>
    </div>
  </div>
</template>

<script>
  import step from './register_step_head'
    export default {
      name: "register",
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

  .register_wrapper{
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

  @media (max-width: 340px){
  }
  /****************************** >680px 平板  ************************************/
  @media (min-width: 680px){
    .register_wrapper{
      width: 100%;
      background-image: url("../login/login_main/css/images/cover.jpg");
      font-size: .8em;
      .register{
        width: 48%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid #eeeeee;
        border-radius: .2em;
        background-color:white;
        height: 80%;
        /deep/ .registerStepHead{
          font-size: .8em;
        }
        .verifyMean{
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 10%;
          .verifyBtn{
            height: 8.8em;
            width: 7.6em;
            color: white;
            font-size: .66em;
            outline: none;
            cursor: pointer;
            padding-left: 1.4em;
          }
          .Email{
            margin-top: 74%;
            background-color: #32B67A;
            &:hover{
              background-color: rgba(50,182,122,0.8);
            }
          }
          .SMS{
            background-color: #FF6666;
            &:hover{
              background-color: rgba(255,102,102,0.8);
            }
          }
          .arrow{
            display: none;;
          }
        }
      }
    }
  }

  /*************************** 820px~992px 平板**************************************/
  @media (min-width: 820px){
  }
  /* 992px~1365px 桌面显示器*/
  @media screen and (min-width: 992px) {

  }

  /*≥ 1365px 大桌面显示器*/
  @media screen and (min-width: 1365px) {

  }

</style>
