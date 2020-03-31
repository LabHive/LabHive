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
  },
  mutations: {
    auth_success(state, token) {
      state.token = token
      localStorage.setItem('authToken', token)
    },
    logout (state) {
      state.token = null
      state.profile = {}
      state.fetcingProfile = false
      localStorage.removeItem('authToken')
    },
    profile_fetch(state, profile){
      state.profile = profile
    },
    update_profile(state, profile){
      state.profile = profile
    },
    set_search_results (state, results) {
      state.searchResults = results;
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
            commit('auth_success', token)
            resolve(response)
          }, response => {
            commit('logout')
            reject(response)
          });
      })
    },
    logout ({ commit }) {
      commit('logout')
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
    updateProfile({commit}, newProfileData) {
      return new Promise((resolve, reject) => {
        Vue.http.post('profile', newProfileData)
        .then( () => {
          commit('update_profile', newProfileData)
          resolve()
        }, response => {
          reject(response)
        }) 
      })
    },
    getSearchResults({ commit, state }) {
      let role = state.profile.role
      Vue.http.get('search', { params: { role: role, filter: state.searchAttributes.filters }})
      .then(success => {
        commit('set_search_results', success.body);
      },
      error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})