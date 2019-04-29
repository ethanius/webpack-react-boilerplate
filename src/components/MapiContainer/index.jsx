import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapiContext from '~/contexts/MapiContext';

const DEFAULT_ZOOM = 15;
// eslint-disable-next-line no-magic-numbers
const DEFAULT_CENTER = [14.41790, 50.12655];

class MapiContainer extends Component {
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

		return <MapiContext.Provider value={{ map: this.map }}>
			<div {...props} ref={this.mapRef}></div>
		</MapiContext.Provider>;
	}
}

MapiContainer.displayName = 'MapiContainer';

MapiContainer.contextType = MapiContext;

MapiContainer.defaultProps = {
	center: DEFAULT_CENTER,
	zoom: DEFAULT_ZOOM,
};

MapiContainer.propTypes = {
	center: PropTypes.arrayOf(PropTypes.number),
	zoom: PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default MapiContainer;
