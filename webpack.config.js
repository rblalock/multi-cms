module.exports = {
	entry: './src/cms/index.jsx',
	output: {
		path: './dist/assets/js/',
		publicPath: '/assets/js/',
		filename: 'build.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'react-hot'
			},
			{
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
} else {
	module.exports.devtool = '#source-map'
}