import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContext from '../../contexts/mapyMap';

class MapyLayer extends Component {
	componentDidMount() {
		const context = this.context;

		if (context.map) {
			context.map.addDefaultLayer(this.props.name).enable();
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return null;
	}
}

MapyLayer.contextType = MapContext;

MapyLayer.propTypes = {
	map: PropTypes.any,
	name: PropTypes.any,
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
