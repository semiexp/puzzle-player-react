import React from 'react';
import ReactDOM from 'react-dom';

import Player from 'component/Player'

import 'style.css'

const App = () => <Player />;

ReactDOM.render(<App />, document.querySelector('#container'));
