var path = require("path");

module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
            'assets': path.resolve(__dirname, 'src/assets'),
            'components': path.resolve(__dirname, 'src/components'),
            'views': path.resolve(__dirname, 'src/views')
        }
      }
    }
  }