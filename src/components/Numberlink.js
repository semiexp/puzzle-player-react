import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGridHandlingSVGContainer from 'components/LineGridHandlingSVGContainer'
import LineGrid from 'logic/LineGrid'

export default class Numberlink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const lineGrid = new LineGrid();

        return (
            <LineGridHandlingSVGContainer
                margin={2}
                segmentWidth={3}
                segmentLength={20}
                lineGrid={lineGrid}
                onChange={() => {}}>
            </LineGridHandlingSVGContainer>
        );
    }
}

Numberlink.propTypes = {

}
