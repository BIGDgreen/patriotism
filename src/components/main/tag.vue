<template>
    <div>
      <span class="tag" @click="$emit('clickTag')" :id="tagId">{{tag}}</span>
    </div>
</template>

<script>
    export default {
      name: "tag",
      props:["tag","tagId"]
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .tag{
    color: @mainColor;
    border: 1px solid @mainColor;
    border-radius: .6em;
    font-size: .68em;
    padding: .2em .3em;
    margin-left: 1em;
  }
</style>
