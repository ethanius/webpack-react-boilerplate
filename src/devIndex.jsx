import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import '@babel/polyfill';
import App from './App';

import './index.less';

const AppWithHot = hot(module)(App);

ReactDOM.render(<AppWithHot />, document.getElementById('app'));
