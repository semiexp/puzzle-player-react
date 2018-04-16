import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import LineGridHandlingSVGContainer from 'components/LineGridHandlingSVGContainer'
import SVGLineGrid from 'components/SVGLineGrid'

import LineGrid from 'logic/LineGrid'

export default class Numberlink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lineGrid: new LineGrid()
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(x, y, s) {
        this.setState( {
            lineGrid: this.state.lineGrid.setSegment(x, y, s)
        });
    }

    render() {
        const { lineGrid } = this.state;

        return (
            <LineGridHandlingSVGContainer
                margin={2}
                gridLineWidth={1}
                cellSize={40}
                lineGrid={lineGrid}
                onChange={this.onChange}>
                <SVGLineGrid   
                    offsetX={2}
                    offsetY={2}
                    gridLineWidth={1}
                    answerLineWidth={5}
                    cellSize={40}
                    lineGrid={lineGrid}
                    blankXSize={5}
                    />
            </LineGridHandlingSVGContainer>
        );
    }
}

Numberlink.propTypes = {

}
