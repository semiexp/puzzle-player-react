import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Toolbar from 'components/Toolbar'
import Numberlink from 'components/Numberlink'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='puzzle-container-wrapper'>
                <div className='puzzle-container'>
                    <Toolbar />

                    <Numberlink />
                </div>
            </div>
        );
    }
}

Player.propTypes = {

};
