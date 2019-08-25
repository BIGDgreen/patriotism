<template>
    <div class="EmailFindPwd">
      <div class="head">
        <div><step></step></div>
      </div>

      <div class="tip">
        请前往邮箱查看！
      </div>
    </div>
</template>

<script>
  import step from '../../retrieve_step_head'
    export default {
      name: "findPwd",
      components:{
          step
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .EmailFindPwd{
    font-size: .68em;
    .tip{
      font-size: .6em;
      text-align: center;
      margin-top: 2em;
    }
  }

  .head {
    /deep/ .step3 {
      color: @mainColor;
    }
  }
</style>
