import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';

import './index.less';
import { Coords } from '~/lib/smap/model/types';

const STEP = 0.05;

interface IProps {
	map: SMap;
}

class ControlPanel extends React.Component<IProps> {
	private sMap: SMap;

	static displayName = 'ControlPanel';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.handleZoomIn = this.handleZoomIn.bind(this);
		this.handleZoomOut = this.handleZoomOut.bind(this);
		this.handleMoveUp = this.handleMoveUp.bind(this);
		this.handleMoveDown = this.handleMoveDown.bind(this);
		this.handleMoveLeft = this.handleMoveLeft.bind(this);
		this.handleMoveRight = this.handleMoveRight.bind(this);
	}

	render() {
		return <div className="controlPanel">
			<button type="button" onClick={this.handleZoomIn}>+</button>
			<button type="button" onClick={this.handleZoomOut}>-</button>
			<br />
			<button type="button" onClick={this.handleMoveUp}>⬆</button>
			<button type="button" onClick={this.handleMoveDown}>⬇</button>
			<button type="button" onClick={this.handleMoveLeft}>⬅</button>
			<button type="button" onClick={this.handleMoveRight}>➡</button>
		</div>;
	}

	private setCenter(center: Coords) {
		const oldViewport = this.props.map.viewport;

		this.props.map.viewport = {
			...oldViewport,
			center,
		};
	}

	private handleZoomIn() {
		const oldViewport = this.props.map.viewport;

		this.props.map.viewport = {
			...oldViewport,
			zoom: oldViewport.zoom + 1,
		};
	}

	private handleZoomOut() {
		const oldViewport = this.props.map.viewport;

		this.props.map.viewport = {
			...oldViewport,
			zoom: oldViewport.zoom - 1,
		};
	}

	private handleMoveUp() {
		const center = this.props.map.viewport.center;

		this.setCenter({
			...center,
			latitude: center.latitude + STEP,
		});
	}

	private handleMoveDown() {
		const center = this.props.map.viewport.center;

		this.setCenter({
			...center,
			latitude: center.latitude - STEP,
		});
	}

	private handleMoveLeft() {
		const center = this.props.map.viewport.center;

		this.setCenter({
			...center,
			longitude: center.longitude - STEP,
		});
	}

	private handleMoveRight() {
		const center = this.props.map.viewport.center;

		this.setCenter({
			...center,
			longitude: center.longitude + STEP,
		});
	}
}

export default ControlPanel;
