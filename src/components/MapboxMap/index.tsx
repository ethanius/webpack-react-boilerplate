import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';
import { IProvider } from '~/lib/smap/provider';
import { Point, Coords, Viewport } from '~/lib/smap/model/types';
import mapboxgl from 'mapbox-gl';
import { TILES_BASE } from '~/services/types';

import './index.less';

interface IProps {
	map: SMap;
}

interface IState {
	viewport: Viewport;
}

class MapboxMap extends React.Component<IProps, IState> implements IProvider {
	protected sMap: SMap;

	protected mapbox: any;

	protected mapRef = React.createRef<HTMLDivElement>();

	static displayName = 'MapboxMap';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.state = {
			viewport: props.map.viewport,
		};

		this.setSMap(props.map);

		this.mapbox = null;

		this.handleMapChange = this.handleMapChange.bind(this);
	}

	componentDidMount() {
		const { zoom, center: { latitude, longitude } } = this.sMap.viewport;

		this.mapbox = new mapboxgl.Map({
			container: this.mapRef.current,
			style: {
				version: 8,
				sources: {
					base: {
						type: 'raster',
						tiles: [TILES_BASE],
						tileSize: 256,
					},
				},
				layers: [{
					id: 'base',
					type: 'raster',
					source: 'base',
					minzoom: 0,
					maxzoom: 22,
				}],
			},
			center: [longitude, latitude],
			zoom: zoom,
			interactive: false,
		});
		this.props.map.addCallback(this.handleMapChange);
	}

	componentWillUnmount() {
		if (this.mapbox) {
			this.mapbox.remove();
		}
		this.mapbox = null;
		this.props.map.removeCallback(this.handleMapChange);
	}

	render() {
		return <div className="mapboxMap" ref={this.mapRef}></div>;
	}

	setSMap(map: SMap) {
		this.sMap = map;
	}

	pointToCoords(point: Point): Coords {
		const { lat: latitude, lon: longitude } = this.mapbox.unproject(point);

		return {
			latitude,
			longitude,
		};
	}

	coordsToPoint(coords: Coords): Point {
		return this.mapbox.project({
			lon: coords.longitude,
			lat: coords.latitude,
		});
	}

	handleMapChange() {
		const viewport = this.sMap.viewport;

		if ('center' in viewport || 'zoom' in viewport) {
			this.mapbox.jumpTo({
				...'center' in viewport ? { center: [viewport.center.longitude, viewport.center.latitude] } : {},
				...'zoom' in viewport ? { zoom: viewport.zoom } : {},
			});
		}
	}
}

export default MapboxMap;
