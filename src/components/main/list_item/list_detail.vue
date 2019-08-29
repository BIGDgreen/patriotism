<template>
    <div class="listDetail">
      <span class="iconfont headIcon return" @click="goBack()">&#xe629;</span>
      <span class="iconfont headIcon share" @click="showCustomPopupClick()">&#xe60f;</span>
<!--------------------------------------------文章----------------------------------------------->
      <div class="article_detail" id="article_detail" v-if="type==='文章'">
        <div class="article_info_wrapper">
          <img :src=article_img alt="Loading">
          <div class="article_title">{{article_title}}</div>
          <div class="article_content">
            <div class="article_info">
              <div class="article_author">{{article_author}}</div>
              <div class="article_time">{{article_time | formatDate}}</div>
            </div>
            <div class="article_text" v-html="article_text"></div>
          </div>
        </div>
      </div>
<!-------------------------------------------------视频----------------------------------------------->
      <div class="video_detail" id="video_detail" v-else-if="type==='视频'">
        <div class="video_info_wrapper">
          <div class="video">
            <video :src=video_src alt="video" controls="controls" autoplay></video>
          </div>
          <div class="videoInfo">
            <div class="headInfo">
              <div class="video_author">{{video_author}}</div>
              <div class="video_time">{{video_time | formatDate}}</div>
            </div>
            <div class="video_title">{{video_title}}</div>
          </div>
        </div>
      </div>
        <!-------------------------------------------评论------------------------------------------->
      <div class="common_comment" id="common_comment">
        <div class="comment_title">全部评论</div>
        <div class="comment_wrapper" v-for="(commentItem,index) in comments" :key="index">
          <commentItem :likeId="'like'+index"
                       :likeNum="commentItem.like_num"
                       :userAvatarSrc="commentItem.user_avatar"
                       :userName="commentItem.user_name"
                       :commentContent="commentItem.comment_content"
                       :comment_date="commentItem.datetime | formatDate"
                       v-on:optCommentLike="optCommentLike(index)">
          </commentItem>
        </div>
        <div class="end">已经到底了(ó﹏ò｡)</div>
      </div>
<!-----------------------------------------------底部操作栏------------------------------------------>
      <div class="footer">
        <div class="commentIcon_wrapper">
          <div class="iconfont commentIcon">&#xe6ad;</div>
          <textarea class="commentInput" id="commentInput" placeholder="说点什么吧~"></textarea>
          <button class="commentBtn" @click="sendComment()">发送</button>
        </div>
        <div>
<!--          <span class="iconfont likeIcon" id="likeIcon" @click="optLike()">&#xe65c;</span>-->
<!--          <span class="likeNum" id="likeNum">{{main_like_num}}</span>-->
        </div>
      </div>
<!----------------------------------------------分享页面--------------------------------------------->
      <CustomPopup ref="CustomPopupRef">
        <div slot="PoperContent" class="PoperContentView">
          <div class="ServiceNoteTitle W100">分享到...</div>
          <vshare :vshareConfig="vshareConfig"></vshare>
        </div>
      </CustomPopup>
    </div>
</template>

<script>
  import commentItem from './comment_item'
  import CustomPopup from '../../CustomPopup/index.vue'
  //引入分享组件
  import vshare from 'vshare'
    export default {
      name: "list_detail",
      data() {
        return {
          type: "",
          like_num: 0,

          article_img: "",
          article_title: "",
          article_author: "",
          article_time: "",
          article_text: "",
          video_src: "",
          video_title: "",
          video_author: "",
          video_time: "",
          real_id: "",

          vshareConfig: {
            shareList: [
              // 此处放分享列表（ID）
              'sqq',
              'qzone',
              'weixin',
              'fbook',
              'twi',
              'copy',
            ],
            common: {
              //此处放置通用设置
              //在用户点击分享按钮时执行代码，更改配置。cmd为分享目标id，config为当前设置，返回值为更新后的设置
              onBeforeClick: function (cmd, config) {
              },
              //在用户点击分享按钮后执行代码，cmd为分享目标id。可用于统计等
              onAfterClick: function (cmd) {

              }
            },
            share: [{
              bdSize: 32,
            }]
          },

          comments: [],
          liked: [],
          comment_id: [],
          mainLiked: false,
          main_like_num: 0,
        };
      },
      components: {
        commentItem,
        CustomPopup,
        vshare,
      },
      beforeCreate() {
        window._bd_share_main = ""
      },
      mounted() {
        let article_height = $("#article_detail").height();
        console.log(article_height);
        let that = this;
        let id = sessionStorage.getItem("listId");
        this.axios.get(this.mainUrl + `/api/v1/data/info/${id}`,{
          headers:{
          'Authorization':sessionStorage.getItem('token')
          }
        })
          .then((res) => {
            console.log(res)
            this.real_id = res.data.data.actual_id;
            this.type = res.data.data.type_str;
            if (this.type === "文章") {
              //获取详细信息
              this.axios.get(this.mainUrl + `/api/v1/data/article/info/${that.real_id}`,
                {
                  headers:{
                    'Authorization':sessionStorage.getItem('token')
                  }
                }
              )
                .then((response) => {
                  console.log(response);
                  this.article_text = response.data.article_content;
                  this.article_img = response.data.article_image;
                  this.article_title = response.data.article_title;
                  this.article_author = response.data.article_author;
                  this.article_time = response.data.article_upload_time;
                }).catch((error) => {
                console.log(error)
              })
            } else if (this.type === "视频") {
              //获取视频详细信息
              this.axios.get(this.mainUrl + `/api/v1/data/video/info/${that.real_id}`,
                {
                  headers:{
                    'Authorization':sessionStorage.getItem('token')
                  }
                })
                .then((response) => {
                  console.log(response);
                  this.video_title = response.data.video_title;
                  this.video_author = response.data.video_author;
                  this.video_time = response.data.video_upload_time;
                  this.video_src = response.data.video_url;
                }).catch((error) => {
                console.log(error)
              })
            }
            //获取评论
            let params = new URLSearchParams();
            params.append("user_id", sessionStorage.getItem("userId"));
            this.axios.get(this.mainUrl + `/api/v1/data/info/${id}/comment`, {
              params: {
                'user_id': sessionStorage.getItem("userId")
              },
              headers:{
                'Authorization':sessionStorage.getItem('token')
              }
            })
              .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                  that.comments = response.data.data;
                  let comment_length = response.data.data.length || 0;
                  for (let i = 0; i < comment_length; i++) {
                    that.comment_id[i] = response.data.data[i].id;
                    that.liked[i] = response.data.data[i].like;
                  }
                } else {
                  that.$layer.alert(response.data.data.errMSg);
                }
              }).catch((error) => {
              console.log(error)
            });
          })
          .catch((err) => {
            console.log(err);
          })
      },
      updated() {
        for (let i = 0; i < this.comments.length; i++) {
          if (this.liked[i] === 1) {
            $("#like" + i).css("color", "#EA5D5C");
          } else {
            $("#like" + i).css("color", "#999999");
          }
        }
      },
      methods: {
        goBack() {
          this.$router.push({path: '/main'});
        },
        showCustomPopupClick() {
          this.$refs.CustomPopupRef.showCustom();
        },
        sendComment() {
          let that = this;
          let comment_content = $("#commentInput").val();
          if (comment_content === ""){
            this.$layer.alert("评论不能为空")
          } else {
            let id = sessionStorage.getItem("listId");

            let params = new URLSearchParams();
            params.append('comment_content', comment_content);
            params.append('user_id', sessionStorage.getItem("userId"));
            console.log(sessionStorage.getItem("userId"));
            params.append('like_num', 0);

            that.axios.post(this.mainUrl + `/api/v1/data/info/${id}/comment`, params,
              {
                headers:{
                  'Authorization':sessionStorage.getItem('token')
                }
              })
              .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                  $("#commentInput").val("");
                  //刷新当前页面
                  let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
                  that.$router.push(NewPage);
                  that.$router.go(-1);
                } else if (response.data.status === "fail") {
                  that.$layer.alert(response.data.data.errorMsg);
                }
              }).catch((err) => {
              console.log(err);
            })
          }
        },
        optCommentLike(index) {
          let that = this;
          let id = sessionStorage.getItem("listId");
          if (this.liked[index] === 1) {
            //取消点赞
            let params = new URLSearchParams();
            params.append('_method', 'PUT');
            params.append('user_id', sessionStorage.getItem('userId'));
            this.axios.post(this.mainUrl + `/api/v1/data/info/${id}/comment/${that.comment_id[index]}`, params,
              {
                headers:{
                  'Authorization':sessionStorage.getItem('token')
                }
              })
              .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                  $("#like" + index).css("color", "#999999");
                  that.comments[index].like_num--;
                  that.liked[index] = 0;
                } else if (response.data.status === "fail") {
                  that.$layer.alert(response.data.data.errorMsg);
                }
              }).catch((err) => {
              console.log(err);
            })
          } else {
            //点赞
            let params = new URLSearchParams();
            params.append('_method', 'PUT');
            params.append('user_id', sessionStorage.getItem('userId'));
            this.axios.post(this.mainUrl + `/api/v1/data/info/${id}/comment/${that.comment_id[index]}`, params,
              {
                headers:{
                  'Authorization':sessionStorage.getItem('token')
                }
              })
              .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                  console.log("#like" + index)
                  $("#like" + index).css("color", "#EA5D5C");
                  that.comments[index].like_num++;
                  that.liked[index] = 1;
                } else if (response.data.status === "fail") {
                  that.$layer.alert(response.data.data.errorMsg);
                }
              }).catch((err) => {
              console.log(err);
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  @imgHeight:11em;
  @mainColor:#EA5D5C;
  .listDetail{
    background: #f6f6f6;
    font-size: 18px;
    width: 100%;
    .headIcon{
      color: white;
      position: absolute;
      top: .2em;
      z-index: 99;
      &:active{
        color: @mainColor;
      }
    }
    .return{
      font-size: 1.2em;
      left: .2em;
    }
    .share{
      font-size: 1.4em;
      right: .2em;
    }
    img{
      width: 100%;
      height: @imgHeight;
      z-index: -1;
    }
    .header{
      position: absolute;
      top: @imgHeight;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: .6em;
    }
    /****************************************文章*********************************************/
    .article_detail {
      .article_info_wrapper{
        background: white;
          .article_title {
            width: 100%;
            color: black;
            font-weight: bold;
            font-size: 1.2em;
            padding: .2em .7em;
          }

          .article_content {
            width: 90%;
            display: flex;
            flex-direction: column;
            margin: .62em auto;

            .article_info {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 14px;
              color: #999999;
            }

            .article_text {
              width: 100%;
              margin-top: .4em;
              word-break: break-all;
              font-size: 18px;
            }
          }
        }
      }
    /***************************************视频***********************************************/
    .video_detail{
      .video_info_wrapper{
        background: white;
          video{
            width: 100%;
          }
          .videoInfo{
            display: flex;
            flex-direction: column;
            width: 90%;
            margin: 0 auto;
            .headInfo{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-end;
              .video_author{
                font-weight: bold;
              }
              .video_time{
                font-size: .8em;
                color: #999999;
              }
            }
            .video_title{
              margin-top: .4em;
              font-size: 1.2em;
            }
          }
        }
      }

    /**************************************评论*************************************************/
    .common_comment{
      padding: .4em .8em;
      margin-bottom: 10%;
      background: white;
      .comment_title{
        font-weight: bold;
        color: @mainColor;
      }
      .comment_wrapper{
        width: 98%;
        margin: .2em auto;
      }
      .end{
        color: #bbbbbb;
        text-align: center;
        font-size: .68em;
        margin-bottom: .8em;
      }
    }
    /**************************************底部操作栏*************************************************/
    .footer{
      position: fixed;
      bottom: 0;
      height: 8%;
      width: 100%;
      border-top: .4px solid #cccccc;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: white;
      .commentIcon_wrapper{
        display: flex;
        flex-direction: row;
        width: 98%;
        .commentIcon{
          font-size: 1.6em;
          color: @mainColor;
          margin-right: .28em;
          margin-left: .28em;
        }
        .commentInput{
          border: 0;
          border-radius: .6em;
          padding-left: .6em;
          padding-top: .2em;
          font-size: 1em;
          background: #eeeeee;
          outline: 0;
          height: 1.8em;
          width: 74%;
          &:focus{
            box-shadow: 0 0 0 1px rgba(234,93,92,0.6);
          }
        }
        .commentBtn{
          background: @mainColor;
          color: white;
          border: none;
          border-radius: .4em;
          font-size: .86em;
          padding: .2em .6em;
          margin-left: .6em;
          outline: none;
          &:active{
            background: rgba(234,93,92,0.8);
          }
        }
      }
    }
      .likeIcon{
        color: #999999;
        font-size: 1.4em;
      }
      .likeNum{
        color: #999999;
        font-size: 1em;
      }

      @media (max-width: 330px){
        .footer{
          font-size: .7em;
        }
      }
      @media (min-width: 330px) {
        .footer {
          font-size: .8em;
        }
      }
    /********************************************分享*****************************************/
    @icon_size:2.4em;
    .icon_set{
      background-position: 0;
      background-size: @icon_size;
    }
    .PoperContentView {
      height: 12em;
      background: #FFFFFF;
      border-top-left-radius: .6em;
      border-top-right-radius: .6em;
    }
    .ServiceNoteTitle {
      height: 2em;
      border-bottom: 1px solid #EEEEEE;
      text-align: center;
      line-height: 2em;
      color: #666666;
    }

    /deep/ .bdsharebuttonbox{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 90%;
      margin: .68em auto;
      a{
        width: @icon_size;
        height: @icon_size;
      }
      .bds_sqq{
        background-image: url("../../../assets/images/icon_QQ.png");
        .icon_set();
      }
      .bds_qzone{
        background-image: url("../../../assets/images/icon_qzone.png");
        .icon_set();
      }
      .bds_weixin{
        background-image: url("../../../assets/images/icon_weixin.png");
        .icon_set();
      }
      .bds_fbook{
        background-image: url("../../../assets/images/icon_facebook.png");
        .icon_set();
      }
      .bds_twi{
        background-image: url("../../../assets/images/icon_twitter.png");
        .icon_set();
      }
      .bds_copy{
        background-image: url("../../../assets/images/icon_copy.png");
        .icon_set();
      }
    }
  }
</style>
