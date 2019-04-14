import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapyLayer extends Component {
	constructor(props) {
		super(props);

		this.layer = null;
	}

	render() {
		const { type, ...props } = this.props;

		return <div {...props}></div>;
	}
}

MapyLayer.defaultProps = {
};

MapyLayer.propTypes = {
	type: PropTypes.string.isRequired,
};

export default MapyLayer;
