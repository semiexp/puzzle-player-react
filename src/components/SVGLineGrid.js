import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import SVGGrid from 'components/SVGGrid'

import LineGrid from 'logic/LineGrid'

export default function SVGLineGrid(props) {
    const { lineGrid, offsetX, offsetY, gridLineWidth, cellSize, answerLineWidth, blankXSize } = props;

    let horizontalLines = [];
    let verticalLines = [];
    let blankCenter = [];

    for (let y = 0; y < lineGrid.height * 2 - 1; ++y) {
        for (let x = 0; x < lineGrid.width * 2 - 1; ++x) {
            if (y % 2 == 0 && x % 2 == 1) {
                const segmentState = lineGrid.getSegment(x, y);
                if (segmentState == LineGrid.LINE) {
                    horizontalLines.push({ x: x, y: y });
                } else if (segmentState == LineGrid.BLANK) {
                    blankCenter.push({ 
                        x: offsetX + gridLineWidth / 2 + (gridLineWidth + cellSize) * (x + 1) / 2,
                        y: offsetY + gridLineWidth / 2 + cellSize / 2 + (gridLineWidth + cellSize) * y / 2
                    });
                }
            } else if (y % 2 == 1 && x % 2 == 0) {
                const segmentState = lineGrid.getSegment(x, y);
                if (lineGrid.getSegment(x, y) == LineGrid.LINE) {
                    verticalLines.push({ x: x, y: y });
                } else if (segmentState == LineGrid.BLANK) {
                    blankCenter.push({ 
                        x: offsetX + gridLineWidth / 2 + cellSize / 2 + (gridLineWidth + cellSize) * x / 2,
                        y: offsetY + gridLineWidth / 2 + (gridLineWidth + cellSize) * (y + 1) / 2
                    });
                }
            }
        }
    }

    return (<g>
        <SVGGrid
            offsetX={offsetX}
            offsetY={offsetY}
            rowCount={lineGrid.height}
            columnCount={lineGrid.width}
            lineWidth={gridLineWidth}
            cellSize={cellSize}
            />

        <g strokeWidth={0} fill='#e88'>
        {
            horizontalLines.map((p) =>
                <rect
                    x={offsetX + gridLineWidth + cellSize / 2 + (gridLineWidth + cellSize) * (p.x - 1) / 2 - answerLineWidth / 2}
                    y={offsetY + gridLineWidth + cellSize / 2 + (gridLineWidth + cellSize) * p.y / 2 - answerLineWidth / 2}
                    width={gridLineWidth + cellSize + answerLineWidth}
                    height={answerLineWidth} 
                    key={p.x + "," + p.y} />)
        }
        {
            verticalLines.map((p) =>
                <rect
                    x={offsetX + gridLineWidth + cellSize / 2 + (gridLineWidth + cellSize) * p.x / 2 - answerLineWidth / 2}
                    y={offsetY + gridLineWidth + cellSize / 2 + (gridLineWidth + cellSize) * (p.y - 1) / 2 - answerLineWidth / 2}
                    width={answerLineWidth} 
                    height={gridLineWidth + cellSize + answerLineWidth}
                    key={p.x + "," + p.y} />)
        }
        </g>
        <g strokeWidth={2} stroke='black'>
        {
            blankCenter.map((p) => [
                <line x1={p.x - blankXSize} y1={p.y - blankXSize} x2={p.x + blankXSize} y2={p.y + blankXSize} key={p.x + "," + p.y + "a"} />,
                <line x1={p.x + blankXSize} y1={p.y - blankXSize} x2={p.x - blankXSize} y2={p.y + blankXSize} key={p.x + "," + p.y + "b"} />,
            ])
        }
        </g>
    </g>);
}

SVGLineGrid.propTypes = {
    lineGrid: PropTypes.instanceOf(LineGrid),
    offsetX: PropTypes.number.isRequired,
    offsetY: PropTypes.number.isRequired,
    gridLineWidth: PropTypes.number.isRequired,
    answerLineWidth: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
    blankXSize: PropTypes.number.isRequired
};
