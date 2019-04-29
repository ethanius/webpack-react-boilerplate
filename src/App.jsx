/* eslint-disable no-magic-numbers */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import MapiContainer from '~/components/MapiContainer';
import MapiTileLayer from '~/components/MapiTileLayer';

const App = () => (
	<div>
		<MapiContainer
			style={{
				width: '600px',
				height: '600px',
			}}
			center={[14.2293256, 50.0172152]}
			zoom={16}
		>
			<MapiTileLayer source="https://mapserver.mapy.cz/base-m/" />
			<MapiTileLayer source="https://mapserver.mapy.cz/relief-m/" />
		</MapiContainer>
	</div>
);

export default hot(App);
