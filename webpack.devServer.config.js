var config = require('./webpack.config');

var publicPath = __dirname+'/devTests/server/public';
var contentBase = __dirname+'/devTests/server/browser';
config.entry.bundle = contentBase+'/main.js'
config.output.path = publicPath
config.devServer = {
	contentBase: publicPath
,	publicPath: '/'
,	stats: {colors: true}
,	noInfo: false
,	quiet: false
,	lazy: false
}
module.exports = config;