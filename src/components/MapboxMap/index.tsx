import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';

import './index.less';

const MapboxMap = ({ map, ...props }) => {
	const { title = 'baf' } = props;

	return <div className="mapboxMap">MapboxMap {title}</div>;
};

MapboxMap.displayName = 'MapboxMap';

MapboxMap.propTypes = {
	map: PropTypes.instanceOf(SMap),
	title: PropTypes.string,
};

export default MapboxMap;
