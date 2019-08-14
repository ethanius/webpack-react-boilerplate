import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';

import './index.less';
import { Coords } from '~/lib/smap/model/types';

const STEP = 0.05;
const ZOOM_ANIMATION_STEP = 0.01;
const MIN_ZOOM = 2;
const MAX_ZOOM = 18;

interface IProps {
	map: SMap;
}

class ControlPanel extends React.Component<IProps> {
	private sMap: SMap;

	private zoomAnimationRequest: number;

	private zoomIn: boolean = true;

	static displayName = 'ControlPanel';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.sMap = props.map;

		this.handleZoomIn = this.handleZoomIn.bind(this);
		this.handleZoomOut = this.handleZoomOut.bind(this);
		this.handleMoveUp = this.handleMoveUp.bind(this);
		this.handleMoveDown = this.handleMoveDown.bind(this);
		this.handleMoveLeft = this.handleMoveLeft.bind(this);
		this.handleMoveRight = this.handleMoveRight.bind(this);
		this.toggleZoomAnimation = this.toggleZoomAnimation.bind(this);
		this.animationStep = this.animationStep.bind(this);
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
			<br />
			<button type="button" onClick={this.toggleZoomAnimation}>Bounce</button>
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

	private toggleZoomAnimation() {
		if (this.zoomAnimationRequest) {
			cancelAnimationFrame(this.zoomAnimationRequest);
			this.zoomAnimationRequest = undefined;
		} else {
			this.zoomAnimationRequest = requestAnimationFrame(this.animationStep);
		}
	}

	private animationStep() {
		const viewport = this.sMap.viewport;

		if (viewport.zoom >= MAX_ZOOM) {
			this.zoomIn = false;
		}

		if (viewport.zoom <= MIN_ZOOM) {
			this.zoomIn = true;
		}

		this.sMap.viewport = {
			...viewport,
			zoom: this.zoomIn ? viewport.zoom + ZOOM_ANIMATION_STEP : viewport.zoom - ZOOM_ANIMATION_STEP,
		};

		this.zoomAnimationRequest = requestAnimationFrame(this.animationStep);
	}
}

export default ControlPanel;
