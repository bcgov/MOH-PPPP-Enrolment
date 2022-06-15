const path = require('path');

module.exports = {
  publicPath: '/pppp/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca',
        changeOrigin: true,
      },
    }
  },
  lintOnSave: true,

  // Below configuration is for use with npm link. Can be removed after common-lib-vue is working and published for vue-3
  chainWebpack: (config) => {
    if (process.env.IS_LIB_LINKED === 'true') {
      config.resolve.symlinks(false);
      config.resolve.alias.set('vue', path.resolve('./node_modules/vue'));
    }
  },
};
