import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    isAuthenticated: false,
    listData: null
  },
  mutations: {
    setSession (state, payload) {
      state.session = payload
    },
    login (state) {
      state.isAuthenticated = true;
    },
    logout (state) {
      state.isAuthenticated = false;
    }
  },
  getters: {
    session: state => {
      return state.session
    },
    listData: state => {
      return state.listData
    },
    authenticated: state => {
      return state.isAuthenticated
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('setSession', payload);
      commit('login');
    },
    logout ({ commit }, payload) {
      commit('setSession', payload);
      commit('logout');
    },
    getListData({ Vue }) {
      Vue.$http.get('profile')
      .then(success => {
        console.log(success.body)
      },
      error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
