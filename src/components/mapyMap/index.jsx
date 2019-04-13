import React, { Component } from 'react';

const DEFAULT_ZOOM = 15;
// eslint-disable-next-line no-magic-numbers
const DEFAULT_CENTER = [14.41790, 50.12655];

class MapyMap extends Component {
	constructor(props) {
		super(props);

		this.map = null;
	}

	componentDidMount() {
		const center = SMap.Coords.fromWGS84(...DEFAULT_CENTER);

		this.map = new SMap(this.mapRef, center, DEFAULT_ZOOM);
		this.map.addDefaultLayer(SMap.DEF_BASE).enable();
	}

	componentWillUnmount() {
		this.map.$destructor();
	}

	render() {
		const props = this.props;

		// eslint-disable-next-line no-return-assign
		return <div {...props} ref={ref => this.mapRef = ref}></div>;
	}
}

export default MapyMap;
