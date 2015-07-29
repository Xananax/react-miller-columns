var webpack = require('webpack')
var webpackConfig = require('../../../webpack.devServer.config')
var webpackDevServer = require('webpack-dev-server')
var compiler = webpack(webpackConfig);
var webpackDevServerOptions = webpackConfig.devServer
var webpackDevMiddleWare = new webpackDevServer(compiler, webpackDevServerOptions).app;

module.exports = function(app){
	app.use(webpackDevMiddleWare);
}