<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>

<style lang="less">
  @mainColor:#F76968;
  .inputItem{
    width: 100%;
    height: 2.4em;
    margin-top: 10px;
    font-size: .5em;
    color: #444444;
    border: none;
    outline: none;
    background-color: #eeeeee;
  }
  .myBtn{
    width: 100%;
    margin-top: 20px;
    height: 2.4em;
    font-size: 0.5em;
    color: white;
    background-color: @mainColor;
    border: none;
    outline: none;

    &:disabled{
      background-color: rgba(247,105,104,0.4);
    }

    &:active{
      background-color: rgba(247,105,104,0.8);
    }

  }
</style>
