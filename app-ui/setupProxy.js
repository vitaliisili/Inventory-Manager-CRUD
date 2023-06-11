const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhfsdfsdeost:8000',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );
};