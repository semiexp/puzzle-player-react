import React from 'react';
import ReactDOM from 'react-dom';

import Toolbar from 'toolbar/toolbar'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='puzzle-container-wrapper'>
                <div className='puzzle-container'>
                    <Toolbar />

                    <div>
                        Puzzle contents here
                    </div>
                </div>
            </div>
        );
    }
}
