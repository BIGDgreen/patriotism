<template>
  <div class="registerStepHead">
    <div class="title">注册</div>
    <div class="registerStep">
      <div class="step step1">选择注册方式</div>
      <span> > </span>
      <div class="step step2">填写信息</div>
      <span> > </span>
      <div class="step step3">验证</div>
      <span> > </span>
      <div class="step step4">设置账户</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "register_step_head"
    }
</script>

<style scoped>
  .registerStepHead{
    font-size: .72em;
  }

  .title{
    text-align: center;
    font-weight: bold;
    background: white;
    letter-spacing: .4em;
    color: #EA5D5C;
    margin-top: .2em;
    font-size: .9em;
  }

  .registerStep{
    font-size: .64em;
    padding-top: .3em;
    padding-bottom: .3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
  }
</style>
