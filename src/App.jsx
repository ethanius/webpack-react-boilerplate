/* eslint-disable no-magic-numbers */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import MapyMap from './components/mapyMap';
import MapyLayer from './components/mapyLayer';

const App = () => (
	<div>
		<MapyMap
			style={{
				width: '600px',
				height: '600px',
			}}
			center={[14.2293256, 50.0172152]}
			zoom={16}
		>
			<MapyLayer name={SMap.DEF_BASE} />
			<MapyLayer name={SMap.DEF_RELIEF} />
		</MapyMap>
	</div>
);

export default hot(App);
