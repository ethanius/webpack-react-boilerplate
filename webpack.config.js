/* eslint-env amd, node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = env => {
	const analyze = env && env.analyze ? [new BundleAnalyzerPlugin()] : [];

	const miniCssExtractPlugin = env && env.NODE_ENV === 'production'
		? [
			new MiniCssExtractPlugin({
				chunkFilename: '[id].css',
				filename: '[name].[contenthash].css',
			}),
		]
		: [];

	const plugins = [
		new CleanWebpackPlugin(['dist']),
		...analyze,
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		...miniCssExtractPlugin,
	];

	return {
		entry: './src/index.jsx',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: env && env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
		},
		devtool: env && env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.(js|jsx)$/u,
					exclude: /node_modules/u,
					loader: 'eslint-loader',
				},
				{
					test: /\.(js|jsx)$/u,
					use: 'babel-loader',
					exclude: /node_modules/u,
				},
				{
					test: /\.(js|jsx)?$/u,
					include: /node_modules/u,
					use: ['react-hot-loader/webpack'],
				},
				{
					test: /\.(css|less)$/u,
					use: [
						env && env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
						'postcss-loader',
						'less-loader',
					],
				},
				{
					test: /\.(png|svg|jpg|gif)$/u,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 2048,
							},
						},
					],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/u,
					use: 'file-loader',
				},
			],
		},
		resolve: {
			extensions: [
				'.js',
				'.jsx',
				'.mjs',
			],
		},
		devServer: {
			contentBase: './dist',
		},
		plugins,
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
				}),
				new OptimizeCSSAssetsPlugin({}),
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/u,
						chunks: 'initial',
						name: 'vendor',
						enforce: true,
					},
					styles: {
						name: 'styles',
						test: /\.(css|less)$/u,
						chunks: 'all',
						enforce: true,
					},
				},
			},
		},
	};
};

module.exports = config;
