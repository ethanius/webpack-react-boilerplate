import React from 'react';

import { map } from '~/services/map';
import TextMap from '~/components/TextMap';
import ControlPanel from '~/components/ControlPanel';

import './index.less';

const Home = () => <div className="home">
	<TextMap map={map} />
	<ControlPanel map={map} />
</div>;

export default Home;
