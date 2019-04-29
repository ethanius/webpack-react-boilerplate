import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapiMarker extends Component {
	constructor(props) {
		super(props);

		this.layer = null;
	}

	render() {
		const { coords, ...props } = this.props;

		return <div {...props}></div>;
	}
}

MapiMarker.defaultProps = {
};

MapiMarker.propTypes = {
	coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapiMarker;
