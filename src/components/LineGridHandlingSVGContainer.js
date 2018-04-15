import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGrid from 'logic/LineGrid'

export default class LineGridHandlingSVGContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { margin, segmentWidth, segmentLength, lineGrid, onChange } = this.props;

        const gridHeight = lineGrid.height;
        const gridWidth = lineGrid.width;

        const svgHeight = 2 * margin + segmentWidth * gridHeight + segmentLength * (gridHeight - 1);
        const svgWidth = 2 * margin + segmentWidth * gridWidth + segmentLength * (gridWidth - 1);
        
        return (
            <svg height={svgHeight} width={svgWidth}>
                {this.props.children}
            </svg>
        );
    }
}

LineGridHandlingSVGContainer.propTypes = {
    margin: PropTypes.number.isRequired,
    segmentWidth: PropTypes.number.isRequired,
    segmentLength: PropTypes.number.isRequired,
    lineGrid: PropTypes.instanceOf(LineGrid),
    onChange: PropTypes.func.isRequired
};
