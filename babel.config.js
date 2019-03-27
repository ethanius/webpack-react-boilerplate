/* eslint-env amd, node */
module.exports = api => {
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

	/*
	Tohle je nevim proc vzdycky development a production do toho neumim dostat.
	Baleni ale jinak funguje, kdyz vynutim tu spravnou vetev,
	tak tam chybi pak propTypes a hot-loader.
	*/
	if (api.env('production')) {
		plugins.push(['transform-react-remove-prop-types', {
			removeImport: true,
		}]);
	} else {
		plugins.push('react-hot-loader/babel');
	}

	return {
		presets,
		plugins,
	};
};
