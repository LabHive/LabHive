var path = require("path");

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();

    config.plugin('define').tap((def) => {
      def[0]['process.env']['ENABLE_DEV'] = process.env.ENABLE_DEV
      return def
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        views: path.resolve(__dirname, "src/views")
      }
    }
  }
};
