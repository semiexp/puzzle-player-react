import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RichButton from 'components/RichButton'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="toolbar-container">
                <RichButton onClick={() => console.log('clicked 1')} icon='left-triangle' />
                <RichButton onClick={() => console.log('clicked 2')} icon='right-triangle' />
            </div>
        );
    }
}

Toolbar.propTypes = {

};
