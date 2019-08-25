<template>
  <form class="phoneLoginTemplate">
    <div class="phoneInput">
      <div class="inputItem">
        <div class="areaTag">
          +86
          <!--            <span class="iconfont">&#xe615;</span>-->
        </div>
      </div>
      <input type="tel" class="inputItem phoneNum" id="phoneNum" placeholder="请输入手机号" required="required">
    </div>
    <div class="tip" id="tip1">该手机号码不存在，请重填</div>
    <div class="tip" id="tip2">{{errMsg}}</div>
    <div class="myBtn_wrapper">
      <button class="myBtn" @click="$emit('toLast')">上一步</button>
      <button class="myBtn" @click="$emit('toNext')">下一步</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "phone_login",
    methods:{
    },
    props:['errMsg']
  }
</script>

<style scoped>
  .phoneLoginTemplate{
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
    font-size: .48em;
    display: none;
    margin-left: 3.6em;
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
