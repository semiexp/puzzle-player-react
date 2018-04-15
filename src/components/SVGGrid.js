import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGrid from 'logic/LineGrid'

export default function SVGGrid(props) {
    const { offsetX, offsetY, rowCount, columnCount, lineWidth, cellSize } = props;

    const horizontalLineWidth = lineWidth * (columnCount + 1) + cellSize * columnCount;
    const verticalLineHeight = lineWidth * (rowCount + 1) + cellSize * rowCount;

    return (
        <g strokeWidth={0} fill='#000'>
            {
                Array(rowCount + 1).fill().map((_, i) => 
                    <rect x={offsetX} y={offsetY + (lineWidth + cellSize) * i} width={horizontalLineWidth} height={lineWidth} key={'h' + i} />
                )
            }
            {
                Array(columnCount + 1).fill().map((_, i) => 
                    <rect x={offsetX + (lineWidth + cellSize) * i} y={offsetY} width={lineWidth} height={verticalLineHeight} key={'v' + i} />
                )
            }
        </g>
    );
}

SVGGrid.propTypes = {
    offsetX: PropTypes.number.isRequired,
    offsetY: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    columnCount: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired
};
