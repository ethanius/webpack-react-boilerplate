import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapyMarker extends Component {
	constructor(props) {
		super(props);

		this.layer = null;
	}

	render() {
		const { coords, ...props } = this.props;

		return <div {...props}></div>;
	}
}

MapyMarker.defaultProps = {
};

MapyMarker.propTypes = {
	coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapyMarker;
