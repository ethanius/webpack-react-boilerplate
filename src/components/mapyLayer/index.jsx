import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContext from '../../contexts/mapyMap';

class MapyLayer extends Component {
	constructor(props) {
		super(props);

		this.layer = null;
	}

	componentDidMount() {
		const context = this.context;

		if (context.map) {
			this.layer = new SMap.Layer.Tile(undefined, this.props.source);
			context.map.addLayer(this.layer);
			this.layer.enable();
		}
	}

	componentWillUnmount() {
		const context = this.context;

		if (context.map && this.layer) {
			context.map.removeLayer(this.layer);
			this.layer.$destructor();
			this.layer = null;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return null;
	}
}

MapyLayer.contextType = MapContext;

MapyLayer.propTypes = {
	map: PropTypes.instanceOf(SMap),
	source: PropTypes.string.isRequired,
};

const ConnectedMapyLayer = props => (
	<MapContext.Consumer>
		{({ map }) => map
			? <MapyLayer
				{...props}
				map={map}
			/>
			: null
		}
	</MapContext.Consumer>
);

export default ConnectedMapyLayer;
