<template>
  <div class="setUserInfo">
    <div v-if="show">
      <div class="head"><step></step></div>
      <div class="inputContent">
        <div class="inputList">
          <p class="title">邮&nbsp;&nbsp;&nbsp;箱：{{Email}}</p>
        </div>
        <div class="inputList">
          <p class="title">昵&nbsp;&nbsp;&nbsp;称：</p>
          <input type="text" class="inputItem" id="userName">
        </div>
        <div class="inputList">
          <p class="title">密&nbsp;&nbsp;&nbsp;码：</p>
          <input type="password" class="inputItem" id="password">
        </div>
      </div>
      <div class="button_wrapper">
        <button class="myBtn" @click="goBack()">返回注册</button>
        <button class="myBtn" @click="finish()">完成</button>
      </div>
    </div>
    <div v-else-if="!show" class="error">
      Error
      <button class="myBtn" @click="goBack()">返回注册</button>
    </div>
  </div>
</template>

<script>
  import step from '../../register_step_head'
  export default {
    name: "setUserInfo",
    components:{
      step
    },
    data(){
      return{
        Email:"",
        show:false,
        key:""
      }
    },
    mounted(){
      this.Email = this.$route.params.email;
      let code = this.$route.params.email_key;
      let that = this;
      let params = new URLSearchParams();
      params.append('address',this.Email);
      params.append('code',code);
      this.axios.post(this.commonUrl+'/api/v1.0/sys/email/validate',params)
        .then((res)=>{
          console.log(res)
          if(res.data.status === "success"){
            that.show = true;
            that.key = res.data.data;
          }else{
            that.show = false;
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    methods:{
      goBack(){
        this.$router.push({path:'/register'})
      },
      finish(){
        let that = this;
        let username = $('#userName').val();
        let password = $('#password').val();
        let email = this.$route.params.email;
        let key =  this.key;
        let params = new URLSearchParams();
        params.append('email',email);
        params.append('display_name',username);
        params.append('password',password);
        params.append('sms_key',key);
        this.axios.post(this.commonUrl+'/api/v1.0/user/register/email',params)
          .then((res)=>{
            console.log(res)
            if(res.data.status === "success"){
              that.$layer.alert(res.data.data);
              setTimeout(()=>{ this.$router.push({path:'/'})},1500);
            }else{
              that.$layer.alert(res.data.data.errorMsg);
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .setUserInfo{
    font-size: .68em;
    /deep/ .registerStep{
      .step4{
        color: @mainColor;
      }
    }
    .inputContent{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 90%;
      margin: 0 auto;
      .inputList{
        display: flex;
        flex-direction: row;
        .title{
          font-size: .6em;
        }
        .inputItem{
          width: 76%;
          padding-left: .6em;
        }
      }
    }
    .button_wrapper{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .myBtn{
        width: 38%;
      }
    }
    .error{
      width: 90%;
      margin: 0 auto;
    }
  }
</style>
