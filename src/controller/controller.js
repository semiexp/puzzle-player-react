import React from 'react';
import ReactDOM from 'react-dom';

import RichButton from 'controller/button'

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <RichButton onClick={() => console.log('clicked')}>
                    button!
                </RichButton>
            </div>
        );
    }
}
