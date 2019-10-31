import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo: {},
    userId: '',
  },
  getters: {
    userInfo(state){
      return state.userInfo
    },
    userId(state){
      return state.userId
    },
  },
  mutations: {
    SET_USERINFO(state,userInfo){
      // console.log("调用SET_USERINFO");
      state.userInfo = userInfo;
    },
    SET_USERID(state,userId){
      state.userId = userId;
    },
  },
  actions: {

  }
})

export default store
