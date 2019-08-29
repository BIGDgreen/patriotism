<template>
    <div class="list_item" @click="$emit('toDetail')" :data-model="list_author+list_type+list_title+list_time+listTag">
      <div class="list_img">
        <img :src=img_src alt="picture">
      </div>
      <div class="list_text_wrapper">
        <div class="list_head">
          <div class="list_title">{{list_title}}</div>
          <div class="list_type_wrapper">
            <div class="list_type">{{list_type}}</div>
            <div class="list_tag_wrapper">
              <div class="list_tag" v-for="(list_tag,index) in list_tags" :key="index">
                {{list_tag.tag_str}}&nbsp;
              </div>
            </div>
          </div>
        </div>
        <div class="list_footer_wrapper">
          <div class="list_author">{{list_author}}</div>
          <div class="list_time">{{list_time}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "list_item",
      data(){
          return{
            listTags:this.list_tags,
            listTag:""
          };
      },
      props:['img_src','list_title','list_author','list_time','list_type','list_tags'],
      mounted() {
        // let data_model = $('.list_item').attr('data-model');
         // console.log(data_model);
        if (this.listTags){
          for (let i = 0; i < this.listTags.length ; i ++){
            this.listTag += this.listTags[i].tag_str;
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .list_item{
    font-size: 20px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ccc;
    padding-top: .3em;
    padding-bottom: .3em;
    :active{
      background-color: #f4f4f4;
    }
    img{
      width: 4.6em;
      height: 3em;
      margin-left: .4em;
      position: relative;
      top:50%;
      transform:translateY(-50%);
    }
    .list_text_wrapper{
      flex-grow: 1;
      padding: .3em .4em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .list_head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .list_title{
          font-size: .82em;
          width: 78%;
        }
        .list_type_wrapper{
          display: flex;
          flex-direction: column;
          font-size: .52em;
          align-items: flex-end;
          margin-right: .3em;
          .list_type{
            color: @mainColor;
            border: 1px solid @mainColor;
            border-radius: .4em;
            padding: .1em .2em;
          }
          .list_tag_wrapper{
            display: flex;
            flex-direction: row;
            .list_tag{
              color: #999999;
              margin-top: .32em;
              margin-left: .26em;
            }
          }
        }
      }
      .list_footer_wrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        font-size: .68em;
        color: #999;
        .list_time{
          font-size: .6em;
        }
      }
    }
  }
</style>
