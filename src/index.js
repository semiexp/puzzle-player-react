import React from 'react';
import ReactDOM from 'react-dom';

import Player from 'components/Player'

import 'style.css'

function App() {
    const useGenerator = document.querySelector('#container').getAttribute("useGenerator");
    const player = <Player
        generator={useGenerator && (() => { return window.generateProblem(); })} />;
    return player;
}

ReactDOM.render(<App />, document.querySelector('#container'));
