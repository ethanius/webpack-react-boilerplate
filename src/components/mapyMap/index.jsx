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
		this.mapRef = React.createRef();
	}

	componentDidMount() {
		const center = SMap.Coords.fromWGS84(...this.props.center);

		this.map = new SMap(this.mapRef.current, center, this.props.zoom);
		this.forceUpdate();
	}

	componentWillUnmount() {
		this.map.$destructor();
	}

	componentDidUpdate() {
		this.map.setCenterZoom(SMap.Coords.fromWGS84(...this.props.center), this.props.zoom);
	}

	render() {
		const { center, zoom, ...props } = this.props;

		return <MapContext.Provider value={{ map: this.map }}>
			<div {...props} ref={this.mapRef}></div>
			{this.map ? this.props.children : null}
		</MapContext.Provider>;
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
	children: PropTypes.any,
};

export default MapyMap;
