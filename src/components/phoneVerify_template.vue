<template>
  <div class="getVerify">
    <div v-if="!timeOut">
      <div class="infoTitle">
        验证码已发送至
        <span class="phoneNum">{{phoneNum}}</span>
      </div>
      <div class="countDownWrapper">
        <span class="countDown">{{countDownTime}}s</span>
        后可重新获取
      </div>
    </div>
    <!---------------------------------重新获取验证码---------------------------------->
    <div class="newCodeWrapper" v-if="timeOut">
      <button class="newCodeBtn" @click="getNewCode(method)">重新获取验证码</button>
    </div>
    <!------------------------------------验证码-------------------------------------->
    <div class="inputWrapper">
      <div class="input-box">
        <form>
          <input id="simpleInput1" v-model.trim="simpleInput1" type="number" autofocus value="" required>
        </form>
        <label class="simple-input-content" for="simpleInput1">
          <div class="spanWrapper">
            <span class="highlight">{{simpleInput1.slice(0,1)}}</span>
            <span :class="simpleInput1.length > 1?'highlight':''">{{simpleInput1.slice(1,2)}}</span>
            <span :class="simpleInput1.length > 2?'highlight':''">{{simpleInput1.slice(2,3)}}</span>
            <span :class="simpleInput1.length > 3?'highlight':''">{{simpleInput1.slice(3,4)}}</span>
            <span :class="simpleInput1.length > 4?'highlight':''">{{simpleInput1.slice(4,5)}}</span>
            <span :class="simpleInput1.length > 5?'highlight':''">{{simpleInput1.slice(5,6)}}</span>
          </div>
        </label>
      </div>
    </div>
    <!------------------------------------------------------------------------------------>
    <div class="noCodeWrapper"><span class="noCode" @click=showLayer()>收不到验证码？</span></div>
    <div class="phoneLoginBtn">
      <button class="myBtn" @click=goLastStep()>上一步</button>
      <button class="myBtn" @click="$emit('goNextStep')">{{secondBtnName}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "get_verification",
    data(){
      return{
        phoneNum:"",
        countDownTime: 60,
        timeOut:false,
        simpleInput0: '',
        simpleInput1: '',
        input0: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
      };
    },
    props:['secondBtnName','method'],
    mounted(){
      this.phoneNum = this.$route.params.phone;
      this.countDown();
    },
    methods: {
      /*****************************倒计时**********************************/
      countDown(){
        let clock = window.setInterval(()=>{
          this.countDownTime--;
          if(this.countDownTime < 0){
            window.clearInterval(clock);
            this.countDownTime = 0;
            this.timeOut = true;
          }
        },1000)
      },
      /*****************************验证码输入框**********************************/
      deleteValue: (inputValue, previousItem)=>{ // 键盘按下时$event，当前input，上一个input
        console.log(this[inputValue], this[previousItem])
        if (this[inputValue].length > 0) { // 当前有值，清空之
          this[inputValue] = ''
        } else { // 当前没有值，光标跳转到上一个input，并清空该input值
          this.$nextTick(() => {
            this.$refs[previousItem].focus()
            this[previousItem] = ''
            this[inputValue] = ''
          })
        }
      },
      changeValue:(e, inputValue, nextItem)=>{ // 键盘抬起时$event，当前input，下一个input
        console.log(e.keyCode, this[inputValue], this[nextItem])
        if (e.keyCode !== 8) {
          this.$nextTick(() => {
            this.$refs[nextItem].focus() // 截取当前值最后一位，跳到下一个input
            this[inputValue] = (this[inputValue]).toString().slice(-1)
          })
        }
      },
      getNewCode(myMethod){
        //重新发送验证码
        let that = this;
        let params = new URLSearchParams();
        console.log(this.phoneNum)
        params.append('tel',this.$route.params.phone);
        params.append('action',myMethod);
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
      /*****************************弹出框**********************************/
      showLayer(){
        let _this = this;
        _this.$layer.alert("信息将以短信的形式发送，请注意查收。");
      },
      goLastStep(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .getVerify{
    font-size: 16px;
    width: 90%;
    margin: 0 auto;
  }

  .infoTitle{
    margin-top: 6%;
  }

  .phoneNum{
    font-weight: bold;
  }

  .countDownWrapper{
    font-size: .68em;
    margin-top: 2%;
    .countDown{
      font-weight: bolder;
    }
  }

  .inputNumWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .numItem {
      width: 14%;
      padding: .4em .2em;
      font-size: 20px;
      text-align: center;
    }
  }
  /***********************************验证码**********************************/
  //重新获取验证码
  .newCodeWrapper{
    margin-top: 10%;
    text-align: center;
    .newCodeBtn{
      height: 2.2em;
      font-size: .68em;
      outline: none;
      border: 1px solid @mainColor;
      border-radius: .5em;
      background: white;
    }
    .newCodeBtn:hover{background: rgba(247,105,104,0.3);}
  }

  /***********************************验证码输入框*************************/
  @top:18%;
  .inputWrapper {
    .input-box {
      min-height: 4em;
      width: 100%;
      display: inline-block;
      box-sizing: border-box;
      input {
        vertical-align: middle;
        margin-top: 0;
        border:0;
        position: absolute;
        top:@top;
        z-index: -1;
        appearance: none;
        outline: none;
        background: none;
      }
      & + .input-box {
        /*margin-top: 20px;*/
      }
      // 六个span的样式
      .spanWrapper {
        width: 90%;
        position: absolute;
        top: @top;
        right: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .simple-input-content {
        /*label {*/
        /*  padding: 20px;*/
        /*}*/

        span {
          border: 1px solid silver;
          display: inline-block;
          height: 2em;
          width: 2.3em;
          text-align: center;
          line-height: 2em;

          &.highlight {
            border-color: @mainColor;
          }
        }
      }

      //去掉input[type=number]浏览器默认的icon显示
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button { // chrome
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
      }
      input{ // 火狐
        -moz-appearance:textfield;
      }
    }
  }
  /**********************************************************************/
  .noCodeWrapper{
    width: 100%;
    text-align: center;
    margin-top: 1em;
    .noCode{
      font-size: .68em;
      font-weight: bold;
      color: @mainColor;
    }
  }

  @media(min-height: 700px){
    .noCodeWrapper{
      margin-top: 2em;
    }
  }

  .phoneLoginBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 1.6em;
    .myBtn{
      width: 40%;
    }
  }


</style>
