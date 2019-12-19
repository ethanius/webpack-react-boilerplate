import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';

const LazyImage = React.lazy(() => import('./Image' /* webpackChunkName: "image" */));

const App = () => {
	const name: string = 'Tomato';

	return (
		<div>
			<h1>Hello <span>{name}</span>!</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<LazyImage src="https://satyr.io/1200x16:9" />
			</Suspense>
		</div>
	);
};

export default hot(App);
