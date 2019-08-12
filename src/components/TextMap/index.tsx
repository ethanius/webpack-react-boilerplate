import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';
import { IProvider } from '~/lib/smap/provider';
import { Point, Coords, Viewport } from '~/lib/smap/model/types';

import './index.less';

interface IProps {
	map: SMap;
}

interface IState {
	viewport: Viewport;
}

class TextMap extends React.Component<IProps, IState> implements IProvider {
	protected sMap: SMap;

	static displayName = 'TextMap';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.state = {
			viewport: props.map.viewport,
		};

		this.setSMap(props.map);

		this.handleMapChange = this.handleMapChange.bind(this);
	}

	componentDidMount() {
		this.props.map.addCallback(this.handleMapChange);
	}

	componentWillUnmount() {
		this.props.map.removeCallback(this.handleMapChange);
	}

	render() {
		const { zoom, center: { latitude, longitude } } = this.sMap.viewport;

		return <div className="textMap">
			<ul>
				<li>zoom: {zoom}</li>
				<li>longitude: {longitude}</li>
				<li>latitude: {latitude}</li>
			</ul>
		</div>;
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
		// tady by se asi volaly i dalsi veci a reagovalo na akce predane parametrem, ktere je treba delat, ale nam staci do textu stav a jeho aktualizace
		this.setState({
			viewport: this.props.map.viewport,
		});
	}
}

export default TextMap;
