<template>
    <div class="comment_item">
      <div class="comment_head">
        <img class="userAvatar" :src="userAvatarSrc" alt="头像"
             style="height: 8%;width: 8%;border-radius: 50%">
        <div class="userName">{{userName}}</div>
      </div>
      <div class="comment_content">
        {{commentContent}}
      </div>
      <div class="comment_footer">
        <div class="comment_date">{{comment_date}}</div>
        <div class="like_wrapper" :id="likeId">
          <div class="likeNum">{{likeNum}}</div>
          <div class="iconfont likeComment" @click="$emit('optCommentLike')">&#xe65c;</div>
        </div>
      </div>
      <hr>
    </div>
</template>

<script>
    export default {
      name: "comment_item",
      props:["userAvatarSrc","userName","commentContent","likeId",'comment_date',"likeNum"],
      methods:{}
    }
</script>

<style lang="less" scoped>
.comment_item{
  width: 100%;
  .comment_head{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .4em;
    .userName{
      margin-left: .4em;
      font-size: .8em;
      color: #666;
    }
  }

  .comment_content{
    word-break: break-all;
    width: 96%;
    margin: .4em auto 0 auto;
  }

  .comment_footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #999999;
    margin-top: .5em;
    .comment_date{
      font-size: .68em;
      margin-left: .4em;
    }
    .like_wrapper{
      display: flex;
      flex-direction: row-reverse;
      .likeNum{
        font-size: .6em;
      }
    }
  }
}
</style>
