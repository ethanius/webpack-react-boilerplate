module.exports = api => {
	api.cache.using(() => process.env.NODE_ENV);

	const presets = [
		[
			'@babel/preset-env',
			{
				modules: false,
			},
		],
		'@babel/preset-react',
	];
	const plugins = [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
	];

	if (api.env('production')) {
		plugins.push(['transform-react-remove-prop-types', {
			removeImport: true,
		}]);
	} else {
		plugins.push('react-hot-loader/babel');
	}
	/*
	if (process.env.NODE_ENV !== 'production') {
		plugins.push('react-hot-loader/babel');
	}
	*/

	return {
		presets,
		plugins,
	};
};
