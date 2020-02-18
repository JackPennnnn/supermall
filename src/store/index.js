import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex)

const state = {
  //购物车列表
  cartList:[]
}

const store = new Vuex.Store({
  state:state,
  mutations: mutations,
  actions:actions,
  getters:getters
})

export default store
