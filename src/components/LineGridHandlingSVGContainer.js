import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGrid from 'logic/LineGrid'

const NOT_CLICKING = 0;
const LEFT_CLICKING = 1;
const RIGHT_CLICKING = 2;
const OUT_OF_FIELD = { x: -1, y: -1 };
const ON_GRID_LINE = { x: -2, y: -2 };

function mouseCoord(e) {
    const boundingRect = e.currentTarget.getBoundingClientRect();

    return {
        x: e.clientX - boundingRect.left,
        y: e.clientY - boundingRect.top
    };
}
export default class LineGridHandlingSVGContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clickStatus: NOT_CLICKING,
            totalMoveDistance: 0,
            lastMousePosition: { x: -1, y: -1 },
            lastCellCoord: OUT_OF_FIELD,
            lastDifferentCellCoord: OUT_OF_FIELD,
            lastChangeApplied: false
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    getCellCoord(loc) {
        const { margin, gridLineWidth, cellSize, lineGrid } = this.props;

        const x = Math.floor((loc.x - margin) / (gridLineWidth + cellSize));
        const xr = loc.x - (gridLineWidth + cellSize) * x;
        const y = Math.floor((loc.y - margin) / (gridLineWidth + cellSize));
        const yr = loc.y - (gridLineWidth + cellSize) * y;

        if (x < 0 || y < 0 || x >= lineGrid.width || y >= lineGrid.height) {
            return OUT_OF_FIELD;
        }
        if (xr < gridLineWidth || yr < gridLineWidth) {
            return ON_GRID_LINE;
        }

        return {x: x, xr: xr, y: y, yr: yr};
    }
    onMouseDown(e) {
        const pos = mouseCoord(e);
        const cellCoord = this.getCellCoord(pos);

        this.setState({
            clickStatus: LEFT_CLICKING,
            totalMoveDistance: 0,
            lastMousePosition: pos,
            lastCellCoord: cellCoord,
            lastDifferentCellCoord: OUT_OF_FIELD,
            lastChangeApplied: false
        });

        e.preventDefault();
    }
    onMouseMove(e) {
        if (this.state.clickStatus == LEFT_CLICKING) {
            const { gridLineWidth, cellSize, lineGrid, onChange } = this.props;
            const { lastCellCoord, lastMousePosition } = this.state;
            let { lastDifferentCellCoord, lastChangeApplied } = this.state;

            const pos = mouseCoord(e);
            const cellCoord = this.getCellCoord(pos);

            if (lastCellCoord.x >= 0 && cellCoord.x >= 0 && (lastCellCoord.x != cellCoord.x || lastCellCoord.y != cellCoord.y)) {
                lastDifferentCellCoord = { x: lastCellCoord.x, y: lastCellCoord.y };
                lastChangeApplied = false;
            }

            if (!lastChangeApplied && lastDifferentCellCoord.x >= 0 && cellCoord.x >= 0 && (lastDifferentCellCoord.x != cellCoord.x || lastDifferentCellCoord.y != cellCoord.y)) {
                if (lastDifferentCellCoord.x == cellCoord.x && lastDifferentCellCoord.y == cellCoord.y - 1) {
                    if (cellCoord.yr >= gridLineWidth + cellSize / 4) {
                        lastChangeApplied = true;
                    }
                } else if (lastDifferentCellCoord.x == cellCoord.x && lastDifferentCellCoord.y == cellCoord.y + 1) {
                    if (cellCoord.yr < gridLineWidth + cellSize - cellSize / 4) {
                        lastChangeApplied = true;
                    }
                } else if (lastDifferentCellCoord.x == cellCoord.x - 1 && lastDifferentCellCoord.y == cellCoord.y) {
                    if (cellCoord.xr >= gridLineWidth + cellSize / 4) {
                        lastChangeApplied = true;
                    }
                } else if (lastDifferentCellCoord.x == cellCoord.x + 1 && lastDifferentCellCoord.y == cellCoord.y) {
                    if (cellCoord.xr < gridLineWidth + cellSize - cellSize / 4) {
                        lastChangeApplied = true;
                    }
                }
                if (lastChangeApplied) {
                    const x = lastDifferentCellCoord.x + cellCoord.x;
                    const y = lastDifferentCellCoord.y + cellCoord.y;

                    if (lineGrid.getSegment(x, y) != LineGrid.LINE) {
                        onChange(x, y, LineGrid.LINE);
                    }
                }
            }

            const totalMoveDistance = this.state.totalMoveDistance + Math.abs(lastMousePosition.x - pos.x) + Math.abs(lastMousePosition.y - pos.y);

            this.setState({
                totalMoveDistance: totalMoveDistance,
                lastMousePosition: pos,
                lastCellCoord: cellCoord === ON_GRID_LINE ? lastCellCoord : { x: cellCoord.x, y: cellCoord.y },
                lastDifferentCellCoord: lastDifferentCellCoord,
                lastChangeApplied: lastChangeApplied
            });
        }
    }
    onMouseUp(e) {
        if (this.state.clickStatus == LEFT_CLICKING) {
            this.setState({
                clickStatus: NOT_CLICKING,
                totalMoveDistance: 0,
                lastMousePosition: { x: -1, y: -1 },
                lastCellCoord: OUT_OF_FIELD,
                lastDifferentCellCoord: OUT_OF_FIELD,
                lastChangeApplied: false
            });
        }
    }

    render() {
        const { margin, gridLineWidth, cellSize, lineGrid, onChange, height, width } = this.props;

        const gridHeight = lineGrid.height;
        const gridWidth = lineGrid.width;

        const svgHeight = height || (2 * margin + cellSize * gridHeight + gridLineWidth * (gridHeight + 1));
        const svgWidth = width || (2 * margin + cellSize * gridWidth + gridLineWidth * (gridWidth + 1));
        
        return (
            <svg
                height={svgHeight}
                width={svgWidth}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseUp}>
                {this.props.children}
            </svg>
        );
    }
}

LineGridHandlingSVGContainer.propTypes = {
    margin: PropTypes.number.isRequired,
    gridLineWidth: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    lineGrid: PropTypes.instanceOf(LineGrid),
    onChange: PropTypes.func.isRequired
};
