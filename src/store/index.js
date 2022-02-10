import { createStore } from 'vuex'
export default createStore({
  state: {
    userUnionid: '' || localStorage.getItem('userUnionid'),
  },
  mutations: {
    handleUserUnionid: (state, userUnionid) => {
      state.userUnionid = userUnionid
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('userUnionid', userUnionid)
    }
  },
  actions: {
  },
  modules: {
  }
})
