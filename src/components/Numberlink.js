import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGridHandlingSVGContainer from 'components/LineGridHandlingSVGContainer'
import SVGLineGrid from 'components/SVGLineGrid'
import SVGText from 'components/SVGText'

import Puzzle from 'components/Puzzle'
import NumberlinkField from 'logic/NumberlinkField'
import NumberlinkProblem from 'logic/NumberlinkProblem'

export default class Numberlink extends Puzzle {
    constructor(props) {
        super(props);
        
        this.state = {
            field: new NumberlinkField(props.problem),
            isSolved: false
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(x, y, s) {
        let { field, isSolved } = this.state;
        if (isSolved) return;

        let nextField = field.setSegment(x, y, s);
        this.setState( {
            field: nextField,
            isSolved: nextField.checkAnswer()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.problem !== nextProps.problem) {
            this.setState({ field: new NumberlinkField(nextProps.problem)});
        }
    }

    render() {
        const { field, isSolved } = this.state;
        const allClues = field.getAllClues();

        const margin = 6;
        const gridLineWidth = 1;
        const cellSize = 40;

        const svgHeight = margin * 2 + gridLineWidth * (field.height + 1) + cellSize * field.height;
        const svgWidth = margin * 2 + gridLineWidth * (field.width + 1) + cellSize * field.width;

        return (
            <LineGridHandlingSVGContainer
                margin={margin}
                gridLineWidth={gridLineWidth}
                cellSize={cellSize}
                lineGrid={field}
                onChange={this.onChange}>
                { isSolved && <rect
                    x={3}
                    y={3}
                    height={svgHeight - 3 * 2}
                    width={svgWidth - 3 * 2}
                    strokeWidth={3}
                    stroke='#f00'
                    fill='none'/>
                }
                <SVGLineGrid
                    offsetX={margin}
                    offsetY={margin}
                    gridLineWidth={gridLineWidth}
                    answerLineWidth={5}
                    cellSize={cellSize}
                    lineGrid={field}
                    blankXSize={5}
                    />
                {
                    allClues.map((c) => <SVGText
                        top={margin + gridLineWidth * (c.y + 1) + cellSize * c.y}
                        bottom={margin + (gridLineWidth + cellSize) * (c.y + 1)}
                        left={margin + gridLineWidth * (c.x + 1) + cellSize * c.x}
                        right={margin + (gridLineWidth + cellSize) * (c.x + 1)}
                        value={c.value.toString()}
                        key={c.y + ',' + c.x}
                    />)
                }
            </LineGridHandlingSVGContainer>
        );
    }
}

Numberlink.propTypes = {
    problem: PropTypes.instanceOf(NumberlinkProblem)
}
