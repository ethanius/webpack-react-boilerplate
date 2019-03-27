import React, { Suspense } from 'react';

const LazyImage = React.lazy(() => import('./Image' /* webpackChunkName: "image" */));

const App = () => (
	<div>
		<h1>Hello <span>Tomato</span>!</h1>
		<Suspense fallback={<div>Loading...</div>}>
			<LazyImage src="https://s3-us-west-2.amazonaws.com/media.brothers-brick.com/wp-content/uploads/2018/12/LEGO-Creator-Expert-10264-Corner-Garage-36-1024x542.jpg" />
		</Suspense>
	</div>
);

export default App;
