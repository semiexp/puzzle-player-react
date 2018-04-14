import React from 'react';
import ReactDOM from 'react-dom';

import Toolbar from 'toolbar/toolbar'

import 'style.css'

const App = () => <Toolbar />;

ReactDOM.render(<App />, document.querySelector('#container'));
