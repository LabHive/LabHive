import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

if (process.env.NODE_ENV == 'production') {
  Vue.http.options.root = '/api/v1';
}
else {
  Vue.http.options.root = 'http://localhost:5000/api/v1';
}

// Add JWT token to requests if we are logged in
Vue.http.interceptors.push(
  function (request) {
    if(localStorage.getItem('authToken')) {
      request.headers['Authorization'] = 'Bearer: ' + localStorage.getItem('authToken')
      return request;
    }
}.bind(this));