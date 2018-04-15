import React from 'react';
import ReactDOM from 'react-dom';

import Player from 'components/Player'

import 'style.css'

const App = () => <Player />;

ReactDOM.render(<App />, document.querySelector('#container'));
