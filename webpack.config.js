const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	"mode": "development",
	"context": path.resolve(__dirname),
	"devtool": "eval-source-map",
	"stats": {
		"hash": false,
		"chunks": false,
		"modules": false,
		"source": false,
		"reasons": false,
		"version": false,
		"timings": true,
		"children": false,
		"publicPath": false,
		"errorDetails": false
	},
	"node": {
		"setImmediate": false
	},
	"output": {
		"publicPath": "/",
		"path": path.resolve(__dirname, "dist"),
		"filename": "js/[name]-[contenthash].js",
		"chunkFilename": "js/[name]-[contenthash].js"
	},
	"resolve": {
		"alias": {
			'vue$': 'vue/dist/vue.esm.js'
		},
		"symlinks": false,
		"extensions": [
			".js",
			".jsx",
			".ts",
			".tsx",
			".json",
			".vue"
		]
	},
	"devServer": {
		"quiet": true,
		"noInfo": true,
		"overlay": true,
		"compress": true,
		"host": "localhost",
		"historyApiFallback": true,
		"contentBase": path.resolve(__dirname),
		"watchOptions": {
			"ignored": []
		},
		"headers": {
			"Access-Control-Allow-Origin": "*"
		},
		"open": true
	},
	"module": {
		"rules": [
			{
				"test": /\.ts$/,
				"use": [
					{
						"loader": "ts-loader"
					}
				]
			},
			{
				"test": /\.scss$/,
				"use": [
					{
						"loader": "style-loader"
					},
					{
						"loader": "css-loader",
						"options": {
							"sourceMap": true,
							"importLoaders": 4
						}
					},
					{
						"loader": "resolve-url-loader",
						"options": {
							"sourceMap": true
						}
					},
					{
						"loader": "sass-loader",
						"options": {
							"sourceMap": true,
							"implementation": require('sass')
						}
					}
				]
			},
			{
				"test": /\.woff|.woff2$/,
				"use": [
					{
						"loader": "file-loader",
						"options": {
							"limit": 4096,
							"name": "fonts/[name]-[hash:8].[ext]"
						}
					}
				]
			},
			{
				"test": /\.vue$/,
				"use": [
					{
						"loader": "vue-loader"
					}
				]
			}
		]
	},
	"plugins": [
		new HtmlWepackPlugin({
			template: path.resolve(__dirname, './app/index.html')
		}),
		new VueLoaderPlugin()
	],
	"entry": {
		"resources/app": [
			path.resolve(__dirname, "app/app.ts"),
			path.resolve(__dirname, "app/styles/index.scss")
		]
	}
}