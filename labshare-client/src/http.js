import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

if (process.env.NODE_ENV == 'production') {
  Vue.http.options.root = '/api/v1';
}
else {
  Vue.http.options.root = 'http://localhost:5000/api/v1';
}

function getToken() {
  console.log("getToken")
  try {
    let token = localStorage.getItem('authToken')
    let payload = JSON.parse(atob(token.split(".")[1]))
    let date = Math.round(new Date().getTime() / 1000);
    if (token && date < payload.exp) {
      return token;
    }
  }
  catch {
    console.log("invalid token")
  }
  
  localStorage.removeItem('authToken')
  return null;
}

// if token is invalid it get's deleted during initialization
getToken()

// Add JWT token to requests if we are logged in
Vue.http.interceptors.push(
  function (request) {
    let token = getToken()
    if (token) {
      request.headers['Authorization'] = 'Bearer: ' + token
      return request;  
    }
}.bind(this));