import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGridHandlingSVGContainer from 'components/LineGridHandlingSVGContainer'
import SVGGrid from 'components/SVGGrid'

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
                <SVGGrid
                    offsetX={2}
                    offsetY={2}
                    rowCount={lineGrid.height}
                    columnCount={lineGrid.width}
                    lineWidth={3}
                    cellSize={20}
                    />
            </LineGridHandlingSVGContainer>
        );
    }
}

Numberlink.propTypes = {

}
