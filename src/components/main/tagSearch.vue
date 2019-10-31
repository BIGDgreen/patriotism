<template>
    <div class="tagSearch">
      <div class="returnBtn_wrapper">
        <span class="iconfont return_btn" v-on:click="returnMain">&#xe629;</span>
      </div>
      <div class="tagSearch_title">快速搜索</div>
      <div class="tagSearch_content">
        <div class="tagSearch_common tagSearch_type">
          <div class="tagSearch_common_title tagSearch_type_title">选择类型</div>
          <div class="tagSearch_type_content">
            <tag tag="文章" tagId="tag0" v-on:clickTag="selectTag(0)"></tag>
            <tag tag="视频" tagId="tag1" v-on:clickTag="selectTag(1)"></tag>
          </div>
        </div>
        <div class="tagSearch_common tagSearch_tag">
          <div class="tagSearch_common_title tagSearch_tag_title">选择标签</div>
          <div class="tagSearch_tag_content">
            <div v-for="(tagItem,index) in tags" :key="index" class="tagSearch_tag_wrapper">
                <tag :tag=tagItem :tagId="'tag'+(index+2)" v-on:clickTag="selectTag(index+2)"></tag>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_wrapper">
        <button class="myBtn finishBtn" @click="finish">完成</button>
      </div>
    </div>
</template>

<script>
  import tag from './tag'
    export default {
      name: "tagSearch",
      data(){
        return{
          selected:[false],
          tags:[],
          selectedTags:[],
          tagsCode:[],
          selectedCode:[]
        };
      },
      components:{
        tag
      },
      mounted() {
        // 获取标签
        this.axios.get(this.mainUrl+"/api/v1/data/tags",{
          headers:{
            'Authorization':sessionStorage.getItem('login_token')
          }
        })
          .then((response)=> {
            // console.log("标签列表",response);
            response.data.data.map((res) => {
              this.tags.push(res.str);
              this.tagsCode.push(res.code);
            });
          })
          .catch((err)=> {
            console.info(err);
          })
      },
      methods:{
        returnMain(){
          this.$router.push({path:"/main"})
        },
        selectTag(k){
          let that = this;
          if(!this.selected[k]){
            $("#tag"+k).css("color","white");
            $("#tag"+k).css("background-color","#EA5D5C");
            that.selected[k] = true;
            if (k === 0){
              that.selectedTags.push( "文章");
            }
            if (k === 1){
              that.selectedTags.push("视频");
            }
            else if ( k > 1) {
              that.selectedTags.push(that.tags[k-2]);
              that.selectedCode.push(that.tagsCode[k-2]);
            }
          }else{
            $("#tag"+k).css("color","#EA5D5C");
            $("#tag"+k).css("background-color","white");
            that.selected[k] = false;
            if ( k === 0 ){
              // that.selectedTags = that.selectedTags.replace("文章","");
              that.selectedTags.pop("文章");
            }
            if ( k === 1 ){
              // that.selectedTags =  that.selectedTags.replace("视频","");
              that.selectedTags.pop("视频");
            }
            else if ( k > 1 ) {
              // that.selectedTags = that.selectedTags.replace(this.tags[k-2],"");
              that.selectedTags.pop(that.tags[k-2]);
            }
          }
        },
        finish(){
          let that = this;
          // console.log(this.selectedTags);
          // console.log(this.selectedCode);
          this.$router.push({
            name:"mainPage",
            params:{
              selectedTags:that.selectedTags,
              selectedCode: that.selectedCode
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .tagSearch{
    font-size: 20px;
    width: 90%;
    margin: 0 auto;
    .returnBtn_wrapper{
      margin-top: .4em;
      .return_btn{
        font-size: 1.2em;
        color: #666666;
      }
    }
    .tagSearch_title{
      font-size: 1.2em;
      font-weight: bold;
    }
    .tagSearch_content{
      .tagSearch_common{
        display: flex;
        flex-direction: column;
        color: #666666;
        .tagSearch_common_title{
          margin-top: .6em;
          margin-left: .4em;
          font-size: .84em;
          }
      }

      .tagSearch_type{
        .tagSearch_type_title{
          margin-bottom: .2em;
        }
        .tagSearch_type_content{
          display: flex;
          flex-direction: row;
        }
      }

      .tagSearch_tag{
        .tagSearch_tag_content{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
         .tagSearch_tag_wrapper{
           margin-top: .4em;
         }
        }
      }
    }
    .btn_wrapper{
      width: 54%;
      margin: 1em auto;
      .finishBtn{
        font-size: .8em;

      }
    }
  }
</style>
