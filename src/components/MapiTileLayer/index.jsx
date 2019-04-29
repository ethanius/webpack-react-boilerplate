import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapiContext from '~/contexts/MapiContext';

class MapiTileLayer extends Component {
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

	componentDidUpdate(prevProps) {
		if (prevProps.source !== this.props.source) {
			this.layer.setURL(this.props.source);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return null;
	}
}

MapiTileLayer.displayName = 'MapiTileLayer';

MapiTileLayer.contextType = MapiContext;

MapiTileLayer.propTypes = {
	map: PropTypes.instanceOf(SMap),
	source: PropTypes.string.isRequired,
};

const ConnectedMapiTileLayer = props => (
	<MapiContext.Consumer>
		{({ map }) => map
			? <MapiTileLayer
				{...props}
				map={map}
			/>
			: null
		}
	</MapiContext.Consumer>
);

export default ConnectedMapiTileLayer;
