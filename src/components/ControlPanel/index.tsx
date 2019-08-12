import React from 'react';
import PropTypes from 'prop-types';
import SMap from '~/lib/smap/model/smap';

import './index.less';

interface IProps {
	map: SMap;
}

class ControlPanel extends React.Component<IProps> {
	protected sMap: SMap;

	static displayName = 'ControlPanel';

	static propTypes = {
		map: PropTypes.instanceOf(SMap),
	};

	constructor(props: IProps) {
		super(props);

		this.handleZoomIn = this.handleZoomIn.bind(this);
		this.handleZoomOut = this.handleZoomOut.bind(this);
	}

	render() {
		return <div className="controlPanel">
			<button type="button" onClick={this.handleZoomIn}>+</button>
			<button type="button" onClick={this.handleZoomOut}>-</button>
		</div>;
	}

	handleZoomIn() {
		const oldViewport = this.props.map.viewport;

		this.props.map.viewport = {
			...oldViewport,
			zoom: oldViewport.zoom + 1,
		};
	}

	handleZoomOut() {
		const oldViewport = this.props.map.viewport;

		this.props.map.viewport = {
			...oldViewport,
			zoom: oldViewport.zoom - 1,
		};
	}
}

export default ControlPanel;
