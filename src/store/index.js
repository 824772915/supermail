import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getterss";
//安装插件
Vue.use(Vuex)

//创建store对象
const state = {
    cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//挂载在vue实例上
export default store