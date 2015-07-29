var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var minimize = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
});

module.exports = {
	context: __dirname
,	entry: {
		//bundle: ["webpack/hot/dev-server", "./src/browser.js"]
		bundle: __dirname+"/src/index.js"
	}
,	output: {
		path: __dirname + "/dist"
	,	publicPath: "/"
	,	filename: "[name].js"
	}
,	resolve: {
		extensions: ['','.js','.jsx','.styl']
	}
,	plugins:[
		new ExtractTextPlugin("[name].css")
	//,	minimize
	]
,	module: {
		loaders: [
			{
				test: /\.js$/
			,	exclude: /node_modules/
			,	loader: "babel-loader"
			,	query: {
					optional: [
						"es7.decorators"
					,	"es7.classProperties"
					]
				}
			}
		,	{
				test: /\.styl$/
			,	loader: ExtractTextPlugin.extract("style-loader",'!css-loader!stylus-loader')
			}
		]
	}
,	devtool:"#source-map"
}