import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import App from '~/App';

import './index.less';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5pdXMiLCJhIjoiY2p6YXk1dmpoMDBjdDNjcnJyY3d0bzh4OSJ9.Z-MN9ebjnifXGebA2r7IpA';

ReactDOM.render(<App />, document.getElementById('app'));
