import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER'
}

const state = {
  isAuthenticated:false,
  user:{}
}
const getters = {
  isAuthenticated:state => state.isAuthenticated,
  user:state => state.user
}

const mutations = {
  //设置方法 挂载到自定义类型上
  [types.SET_AUTHENTICATED](state , isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },

  [types.SET_USER](state , user){
    if(user) state.user = user
    else state.user = {}
  }
}
const actions = {
  //异步操作的actions
  setAuthenticated:({commit} , isAuthenticated) =>{
    commit(types.SET_AUTHENTICATED , isAuthenticated)
  },
  setUser:({commit} , user)=>{
    commit(types.SET_USER , user)
  },
  clearCurrentState:({commit}) =>{
    commit(types.SET_AUTHENTICATED , false)
    commit(types.SET_USER , null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
