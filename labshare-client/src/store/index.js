import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('authToken'),
    profile: {},
    fetcingProfile: false,
    searchAttributes: {
      search_type: null,
      page: 1,
      filters: []
    },
    searchResults: [],
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
    profile_fetch(state, profile){
      state.profile = profile
    },
    setSearchResults (state, results) {
      state.searchResults = results;
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
    searchResults: state => {
      return state.searchResults
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
          }, response => {
            commit('logout')
            localStorage.removeItem('authToken')
            reject(response)
          });
      })
    },
    logout ({ commit }) {
      commit('logout')
      localStorage.removeItem('authToken')
    },
    getProfile({commit}){
      return new Promise((resolve, reject) => {
        Vue.http.get('profile')
          .then(response => {
            let profile = response.body.data
            commit('profile_fetch', profile)
            resolve()
          }, response => {
            console.log(response)
            reject(response)
          });
      })
    },
    getSearchResults({ commit, state }) {
      let role = state.profile.role
      Vue.http.get('search', { params: { role: role, filter: state.searchAttributes.filters }})
      .then(success => {
        commit('setSearchResults', success.body);
      },
      error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})