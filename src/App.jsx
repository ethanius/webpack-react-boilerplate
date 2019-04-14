/* eslint-disable no-magic-numbers */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import MapyMap from './components/mapyMap';
import MapyLayer from './components/mapyLayer';
import MapyMarker from './components/mapyMarker';

const App = () => (
	<div>
		<MapyMap style={{ width: '600px', height: '600px' }} center={[14.2293256, 50.0172152]} zoom={16}>
			<MapyLayer type="default" name={SMap.DEF_BASE} />
			<MapyLayer type="marker">
				<MapyMarker coords={[14.2293256, 50.0172152]} />
			</MapyLayer>
		</MapyMap>
	</div>
);

export default hot(App);
