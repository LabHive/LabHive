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
    },
    setData (state, payload) {
      state.listData = payload;
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
    getListData({ Vue, commit }) {
      Vue.$http.get('search', {role: "lab"})
      .then(success => {
        commit('setData', success.body);
        console.log("search" + success.body)
      },
      error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
