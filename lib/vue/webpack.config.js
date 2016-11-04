var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},
	vue: {
		loaders: {
			scss: 'style!css!sass'
		}
	}
}
