<template>
  <div class="mainPage">
    <div v-if="isLogin" id="loginedPage">
    <!------------------------------------------- 搜索栏 ------------------------------------------------->
      <div class="search_wrapper">
        <span class="title">爱之国</span>
        <span class="searchIcon iconfont">&#xe62d;</span>
        <input type="search" class="search_input" id="filter" @keyup="filter()">
        <div class="tagSearch">
          <span class="menuIcon iconfont" @click="tagSearch()">&#xe64f;</span>
          <div class="sort_text">分类</div>
        </div>
      </div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div>
          <!----------------------------------------- 轮播图 --------------------------------------------------->
          <div  class="headSwiper">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(slideItem,index) in slideItems" class="swiperItem" :key="index">
                <img :src="slideItem.linkUrl" alt="swiper" @click="slide_forMore(index)">
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </div>
          <!----------------------------------------- 列表 --------------------------------------------------->
          <div class="lists" v-for="(list,index) in dataList" :key="index">
            <listItem :img_src="list.image"
                      :list_title="list.title"
                      :list_type="list.type_str"
                      :list_tags="list.tags"
                      :list_author="list.author"
                      :list_time="list.upload_time | formatDate"
                      v-on:toDetail="forMore(index)">
            </listItem>
          </div>
        </div>
      </mescroll-vue>
    </div>
    <div v-else-if="!isLogin" class="noLoginWrapper">
      还未登录/注册，请先
      <router-link to="/">登录/注册</router-link>
    </div>
  </div>
</template>


<script>
  //引入轮播图
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  //引入列表组件
  import listItem from './list_item/list_item'
  //引入上拉加载、下拉刷新组件
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    name: "mainPage",
    components: {
      swiper,
      swiperSlide,
      listItem,
      MescrollVue
    },
    computed:{
      isLogin(){
        return  sessionStorage.getItem("isLogin");
      }
    },
    updated(){
      if(this.$route.params.selectedTags){
        let tags = this.$route.params.selectedTags;
        $('.list_item').each(function () {
          for (let i = 0 ; i < tags.length ; i++){
            if (tags.indexOf("文章") > -1 && tags.indexOf("视频") <= -1 ){
              //有文章没视频
              $(this).toggle(tags.length < 1 || ($(this).data('model').indexOf("文章") > -1 && $(this).data('model').indexOf(tags[i]) > -1));
            } else if (tags.indexOf("文章") <= -1 && tags.indexOf("视频") > -1 ) {
              //有视频没文章
              $(this).toggle(tags.length < 1 || ($(this).data('model').indexOf("视频") > -1 && $(this).data('model').indexOf(tags[i]) > -1));
            }else {
              //有视频有文章或都没有,根据标签搜索,有其中一个标签即可
              $(this).toggle(tags.length < 1 || $(this).data('model').indexOf(tags[i]) > -1);
              if ($(this).data('model').indexOf(tags[i]) > -1) {
                break;
              }
            }
          }
        })
      }
    },
    data() {
      return {
        listId:[],
        mescroll: null, // mescroll实例对象
        mescrollDown:{},
        mescrollUp: {
          callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
          page: {
            num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 8 // 每页数据的数量
          },
          noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          toTop: {
            src: '../../../assets/images/toTop.png', // 回到顶部按钮的图片路径,支持网络图
            toTop:1000
          },
          empty: {
            // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
            warpId: 'loginedPage', // 父布局的id;
            icon: '../../../assets/images/empty.png', // 图标,支持网络图
            tip: '暂无相关数据~', // 提示
          },
          lazyLoad: {
            use: true // 是否开启懒加载,默认false
          }
        },
        slideItems: [
          {linkUrl: 'http://dingyue.ws.126.net/2019/02/18/f8e9450d084643f88ccbc2ea19a18c6b.png?imageView&thumbnail=750x0&quality=85&type=png&interlace=1'},
          {linkUrl: 'https://pic3.zhimg.com/c29c5ef78e24e223249a02d7d1290dc1_1200x500.jpg'},
        ],
        dataList: [],
        swiperOption: {
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          }
        }
      };
    },
    beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {
        // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
      })
    },
    beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
      next()
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        // 模拟联网
        this.getListDataFromNet(this.pdType, page.num, page.size, (arr) => {
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = []
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        }, () => {
          // 联网异常,隐藏上拉和下拉的加载进度
          mescroll.endErr()
        })
      },
      getListDataFromNet(pdType, pageNum, pageSize, successCallback, errorCallback) {
        let that = this;
        this.axios.get(this.mainUrl+"/api/v1/data/lists",{
          params: {
            num: that.mescrollUp.page.num, //页码
            size: that.mescrollUp.page.size //每页长度
          }
        }).then((response)=> {
          console.log(response)
          let data_lists = response.data.data.data_lists;
          for(let i = 0; i < data_lists.length; i++){
            that.listId[i] = data_lists[i].id;
          }
          that.dataList = data_lists;
        // 回调
         successCallback(listData)
        }).catch((e)=> {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          errorCallback&&errorCallback()
        })
      },

      //搜索
      filter() {
        let keyword = $('#filter').val().toLowerCase();
        if (keyword === ""){
          $('.list_item').each(function () {
            $(this).show();
          })
        }
        $('.list_item').each(function () {
          $(this).toggle(keyword.length < 1 || $(this).data('model').toLowerCase().indexOf(keyword) > -1);
        })
      },

      slide_forMore(index) {
        this.$router.push({});
      },
      forMore(index) {
        let that = this;
        sessionStorage.setItem("listId",this.listId[index])
        this.$router.push(
          {
            name: "listDetail",
            params: {
              listId: that.listId[index],
              info: that.dataList[index]
            }
          });
      },
      tagSearch() {
        this.$router.push({path: "/main/tagSearch"});
      }
    }
  }
</script>

<style lang="less" scoped>
  @mainColor:#F76968;
  .mainPage{
    font-size: .68em;
    margin: 0 auto;
    .search_wrapper{
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      height: 1.6em;
      background-color: @mainColor;
      padding-top: .32em;
      padding-bottom: .32em;
      .title{
        font-size: .6em;
        color: white;
        margin-left: .4em;
      }
      .searchIcon{
        border: none;
        background-color: white;
        border-bottom-left-radius: .8em;
        border-top-left-radius: .8em;
        margin-left: .6em;
        color: #cccccc;
        padding-left: .4em;
        padding-top: .3em;
      }
      input{
        font-size: .6em;
        padding:.2em;
        width: 60%;
        border: none;
        border-bottom-right-radius: .8em;
        border-top-right-radius: .8em;
        outline: none;
      }
      .tagSearch{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: .2em;
        margin-top: .2em;
        color: white;
        .menuIcon{
          font-size: .6em;
          &:active{
            color: #e0e0e0;
          }
        }
        .sort_text{
          font-size: .36em;
        }
      }
    }
    .headSwiper{
      width: 100%;
      height: 26%;
      z-index: -1;
      img{
        width: 100%;
        height: 6em;
      }
      /deep/ .swiper-pagination-bullet-active{
        background-color: @mainColor;
      }
    }

    .noLoginWrapper{
      font-size: .6em;
      margin-top: 10em;
      margin-left: 1em;
    }

    .mescroll {
      position: fixed;
      padding-bottom: 1rem;
      top: 1.6em;
      bottom: 0;
      height: auto;
    }
  }
</style>
