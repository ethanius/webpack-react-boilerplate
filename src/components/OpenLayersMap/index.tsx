import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';
import { IProvider } from '~/lib/smap/provider';
import { Point, Coords, Viewport } from '~/lib/smap/model/types';
import { TILES_BASE } from '~/services/types';

import { transform } from 'ol/proj';
import OLMap from 'ol/Map';
import OLView from 'ol/View';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZ from 'ol/source/XYZ';
import OLGroup from 'ol/layer/Group';
import { defaults as defaultInteractions } from 'ol/interaction';

import './index.less';

interface IProps {
	map: SMap;
}

interface IState {
	viewport: Viewport;
}

export const MERCATOR = 'EPSG:3857';
export const WGS84 = 'EPSG:4326';

class OpenLayersMap extends React.Component<IProps, IState> implements IProvider {
	protected sMap: SMap;

	protected ol: any;

	protected olView: OLView;

	protected mapRef = React.createRef<HTMLDivElement>();

	static displayName = 'OpenLayersMap';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.state = {
			viewport: props.map.viewport,
		};

		this.setSMap(props.map);

		this.ol = null;
		this.olView = null;

		this.handleMapChange = this.handleMapChange.bind(this);
	}

	componentDidMount() {
		const { zoom, center: { latitude, longitude } } = this.sMap.viewport;

		this.olView = new OLView({
			center: transform([longitude, latitude], WGS84, MERCATOR),
			zoom: zoom + 1,
		});

		this.ol = new OLMap({
			layers: [
				new OLTileLayer({
					preload: Infinity,
					source: new OLXYZ({
						url: TILES_BASE,
					}),
				}),
			],
			loadTilesWhileInteracting: true,
			target: this.mapRef.current,
			view: this.olView,
			controls: [],
			interactions: defaultInteractions({
				doubleClickZoom: false,
				dragPan: false,
				mouseWheelZoom: false,
			}),
		});

		this.props.map.addCallback(this.handleMapChange);
	}

	componentWillUnmount() {
		if (this.ol) {
			this.ol.setLayerGroup(new OLGroup());
		}
		this.ol = null;
		this.props.map.removeCallback(this.handleMapChange);
	}

	render() {
		return <div className="openLayersMap" ref={this.mapRef}></div>;
	}

	setSMap(map: SMap) {
		this.sMap = map;
	}

	pointToCoords(point: Point): Coords {
		// eslint-disable-next-line no-console
		console.log(this.sMap, point);

		return {
			latitude: 0,
			longitude: 0,
		};
	}

	coordsToPoint(point: Coords): Point {
		// eslint-disable-next-line no-console
		console.log(this.sMap, point);

		return {
			x: 0,
			y: 0,
		};
	}

	handleMapChange() {
		const viewport = this.sMap.viewport;

		if ('zoom' in viewport) {
			this.olView.setZoom(viewport.zoom + 1);
		}

		if ('center' in viewport) {
			const { latitude, longitude } = viewport.center;

			this.olView.setCenter(transform([longitude, latitude], WGS84, MERCATOR));
		}
	}
}

export default OpenLayersMap;
