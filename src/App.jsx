/* eslint-disable no-magic-numbers */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import MapContainer from '~/components/MapContainer';
import MapTileLayer from '~/components/MapTileLayer';

const App = () => (
	<div>
		<MapContainer
			style={{
				width: '600px',
				height: '600px',
			}}
			center={[14.2293256, 50.0172152]}
			zoom={16}
		>
			<MapTileLayer source="https://mapserver.mapy.cz/base-m/" />
			<MapTileLayer source="https://mapserver.mapy.cz/relief-m/" />
		</MapContainer>
	</div>
);

export default hot(App);
