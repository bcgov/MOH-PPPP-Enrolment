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
  lintOnSave: true
};
