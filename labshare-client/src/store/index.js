import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    token: localStorage.getItem('authToken'),
    listData: null,
    error: {
      state: false,
      description: null
    }
  },
  mutations: {
    auth_success(state, token) {
      state.token = token
    },
    logout (state) {
      state.token = null
    },
    setData (state, payload) {
      state.listData = payload;
    },
    setError(state, description) {
      state.error.state = true
      state.error.description = description
    },
    clearError(state) {
      state.error.state = false
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
      return !!state.token
    },
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        Vue.http.post('login', { email: user.email, password: user.password })
          .then(response => {
            let token = response.body.sessionToken
            localStorage.setItem('authToken', token)
            commit('auth_success', token)
            resolve(response)
          }, error => {
            console.log(error)
            commit('logout')
            localStorage.removeItem('authToken')
            reject(error)
          });
        })
    },
    logout ({ commit }) {
      commit('logout')
      localStorage.removeItem('authToken')
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
