var path = require("path");

function resolveEnv(env) {
  const ENV = process.env[env]
  if (!ENV) return false

  if (ENV === "0" || ENV.toLocaleLowerCase() == "false") {
    return false
  }

  return true
}

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
      def[0]['process.env']['ENABLE_DEV'] = resolveEnv("ENABLE_DEV")
      def[0]['process.env']['STAGING'] = resolveEnv("STAGING")
      return def
    })

    // config
    //   .plugin('html')
    //   .tap((args) => {
    //     console.log(args)
    //     args[0].index = resolveEnv("STAGING") ? "noindex" : "index";
    //     return args;
    //   });
  },
  configureWebpack(conf) {
    
    conf.resolve.alias.assets = path.resolve(__dirname, "src/frontend/assets")
    conf.resolve.alias.components = path.resolve(__dirname, "src/frontend/components"),
    conf.resolve.alias.views = path.resolve(__dirname, "src/frontend/views"),
    conf.resolve.alias['@'] = path.resolve('src/frontend'),
    conf.resolve.alias['@lib'] = path.resolve('dist/frontend/lib')
    conf.entry.app = [
      './src/frontend/main.js'
    ]
  },
  outputDir: "dist/frontend/",
};
