import React from 'react';
import { hot } from 'react-hot-loader/root';
import MapyMap from './components/mapyMap';

const App = () => (
	<div>
		<h1>Hello <span>Tomato</span>!</h1>
		<MapyMap style={{ width: '300px', height: '300px' }} />
	</div>
);

export default hot(App);
