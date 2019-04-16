import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContext from '~/contexts/MapContext';

class MapTileLayer extends Component {
	constructor(props) {
		super(props);

		this.layer = null;
	}

	componentDidMount() {
		const { map } = this.context;

		if (map) {
			this.layer = new SMap.Layer.Tile(undefined, this.props.source);
			map.addLayer(this.layer);
			this.layer.enable();
		}
	}

	componentWillUnmount() {
		const { map } = this.context;

		if (map && this.layer) {
			map.removeLayer(this.layer);
			this.layer.$destructor();
			this.layer = null;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return null;
	}
}

MapTileLayer.displayName = 'MapTileLayer';

MapTileLayer.contextType = MapContext;

MapTileLayer.propTypes = {
	map: PropTypes.instanceOf(SMap),
	source: PropTypes.string.isRequired,
};

const ConnectedMapTileLayer = props => (
	<MapContext.Consumer>
		{({ map }) => map
			? <MapTileLayer
				{...props}
				map={map}
			/>
			: null
		}
	</MapContext.Consumer>
);

export default ConnectedMapTileLayer;
