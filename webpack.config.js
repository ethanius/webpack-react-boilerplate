/* eslint-env amd, node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = env => {
	const production = env && env.NODE_ENV === 'production';
	const analyze = env && env.analyze ? [new BundleAnalyzerPlugin()] : [];
	const miniCssExtractPlugin = production
		? [
			new MiniCssExtractPlugin({
				chunkFilename: '[id].css',
				filename: '[name].[contenthash].css',
			}),
		]
		: [];
	const compression = production
		? [
			new CompressionPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.js$|\.css$|\.html$/u,
				minRatio: 1,
			}),
			new CompressionPlugin({
				filename: '[path].br[query]',
				algorithm: 'brotliCompress',
				test: /\.(js|css|html|svg)$/u,
				compressionOptions: { level: 11 },
				minRatio: 1,
			}),
		]
		: [];
	const plugins = [
		new CleanWebpackPlugin(),
		new StyleLintPlugin({
			syntax: 'less',
			files: '**/*.(le|c)ss',
		}),
		...analyze,
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		...miniCssExtractPlugin,
		...compression,
	];

	return {
		entry: [
			// je treba manualne pridat pro podporu import() v IE11
			'core-js/modules/es.array.iterator',
			'./src/index.tsx',
		],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: production ? '[name].[contenthash].js' : '[name].js',
		},
		devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.(ts|js)x?$/u,
					exclude: /node_modules/u,
					loader: 'eslint-loader',
				},
				{
					test: /\.(ts|js)x?$/u,
					exclude: /node_modules/u,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
										useBuiltIns: 'usage',
										corejs: '3',
									},
								],
								'@babel/preset-typescript',
								'@babel/preset-react',
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/plugin-syntax-dynamic-import',
								production
									? ['transform-react-remove-prop-types', {
										removeImport: true,
									}]
									: 'react-hot-loader/babel',
							],
						},
					},
				},
				...production
					? []
					: [{
						test: /\.(ts|js)x?$/u,
						include: /node_modules/u,
						use: ['react-hot-loader/webpack'],
					}],
				{
					test: /\.(css|less)$/u,
					use: [
						production ? MiniCssExtractPlugin.loader : 'style-loader',
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
				'.ts',
				'.tsx',
				'.js',
				'.jsx',
				'.mjs',
			],
			alias: {
				'~': path.resolve(__dirname, 'src/'),
			},
		},
		devServer: {
			contentBase: './dist',
		},
		plugins,
		optimization: {
			minimizer: [
				new TerserPlugin({
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
				},
			},
		},
	};
};

module.exports = config;
