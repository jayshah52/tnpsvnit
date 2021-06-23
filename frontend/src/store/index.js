import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
    strict: true,
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: '',
  },
  user: {
      id: 0,
      username: '',
      is_coordinator: false,
    },
  mutations: {
    initStore(state){
      if(localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        // state.user.username = localStorage.getItem('username')
        // state.user.id = localStorage.getItem('userid')
        // state.user.is_coordinator = localStorage.getItem('is_coordinator')
      }
      else {
        state.token = ''
        state.isAuthenticated = false
        state.user.username = ''
        state.user.id = 0
        state.user.is_coordinator = false
      }
    },
    setToken(state, token){
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state){
      state.token = false
      state.isAuthenticated = false
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
