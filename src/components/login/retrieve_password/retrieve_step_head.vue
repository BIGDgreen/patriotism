<template>
  <div class="retrieveStepHead">
    <div class="title">找回密码</div>
    <div class="retrieveStep">
      <div class="step step1">选择验证方式</div>
      <span> > </span>
      <div class="step step2">填写信息</div>
      <span> > </span>
      <div class="step step3">安全验证</div>
      <span> > </span>
      <div class="step step4">密码重置</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "retrieve_step_head"
    }
</script>

<style scoped>
  .retrieveStepHead{
    font-size: .68em;
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

  .retrieveStep{
    font-size: .64em;
    padding-top: .3em;
    padding-bottom: .3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
  }
</style>
