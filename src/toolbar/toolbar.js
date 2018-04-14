import React from 'react';
import ReactDOM from 'react-dom';

import RichButton from 'toolbar/button'
import Icon from 'toolbar/icon'

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
