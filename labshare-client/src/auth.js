export default {
  auth: {

    request: function (req, token) {
        this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
    },
    
    response: function (res) {
      return res.body.sessionToken;
    }
  },
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'login' },
  fetchData: { url: 'profile', method: 'GET', enabled: true }
};