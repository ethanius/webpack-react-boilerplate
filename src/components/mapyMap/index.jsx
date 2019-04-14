import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContext from '../../contexts/mapyMap';

const DEFAULT_ZOOM = 15;
// eslint-disable-next-line no-magic-numbers
const DEFAULT_CENTER = [14.41790, 50.12655];

class MapyMap extends Component {
	constructor(props) {
		super(props);

		this.map = null;
	}

	componentDidMount() {
		const center = SMap.Coords.fromWGS84(...this.props.center);

		this.map = new SMap(this.mapRef, center, this.props.zoom);
		//this.map.addDefaultLayer(SMap.DEF_BASE).enable();
	}

	componentWillUnmount() {
		this.map.$destructor();
	}

	componentDidUpdate() {
		this.map.setCenterZoom(SMap.Coords.fromWGS84(...this.props.center), this.props.zoom);
	}

	render() {
		const { center, zoom, ...props } = this.props;

		// eslint-disable-next-line no-return-assign
		return <div {...props} ref={ref => this.mapRef = ref}></div>;
	}
}

MapyMap.contextType = MapContext;

MapyMap.defaultProps = {
	center: DEFAULT_CENTER,
	zoom: DEFAULT_ZOOM,
};

MapyMap.propTypes = {
	center: PropTypes.arrayOf(PropTypes.number),
	zoom: PropTypes.number,
};

export default MapyMap;
