import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGridHandlingSVGContainer from 'components/LineGridHandlingSVGContainer'
import SVGLineGrid from 'components/SVGLineGrid'
import SVGText from 'components/SVGText'

import NumberlinkField from 'logic/NumberlinkField'
import NumberlinkProblem from 'logic/NumberlinkProblem'

export default class Numberlink extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { field: new NumberlinkField(props.problem) };

        this.onChange = this.onChange.bind(this);
    }

    onChange(x, y, s) {
        this.setState( {
            field: this.state.field.setSegment(x, y, s)
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.problem !== nextProps.problem) {
            this.setState({ field: new NumberlinkField(nextProps.problem)});
        }
    }

    render() {
        const { field } = this.state;
        const allClues = field.getAllClues();

        const margin = 2;
        const gridLineWidth = 1;
        const cellSize = 40;
        
        if (field.checkAnswer()) console.log('ok!');

        return (
            <LineGridHandlingSVGContainer
                margin={margin}
                gridLineWidth={gridLineWidth}
                cellSize={cellSize}
                lineGrid={field}
                onChange={this.onChange}>
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
