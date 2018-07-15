import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Toolbar from 'components/Toolbar'
import Numberlink from 'components/Numberlink'
import NumberlinkProblem from 'logic/NumberlinkProblem'
import RichButton from 'components/RichButton'

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.puzzleRef = React.createRef();

        this.state = { problem: new NumberlinkProblem(4, 3) };
        this.state.problem.setClue(0, 0, 1);
        this.state.problem.setClue(0, 2, 1);
        this.state.problem.setClue(2, 0, 2);
        this.state.problem.setClue(2, 2, 2);
    }

    generateProblem() {
        const problem = this.props.generator();
        if (problem) {
            const { height, width, board } = problem;
            const internalProblem = new NumberlinkProblem(height, width);

            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x) {
                    if (board[y][x] > 0) {
                        internalProblem.setClue(y, x, board[y][x]);
                    }
                }
            }

            this.setState({ problem: internalProblem });
        }
    }

    render() {
        const { generator } = this.props;

        return (
            <div className='puzzle-container-wrapper'>
                <div className='puzzle-container'>
                    <div className="toolbar-container">
                        <RichButton onClick={() => { this.puzzleRef.current.undoAll() }} icon='double-left-triangle' />
                        <RichButton onClick={() => { this.puzzleRef.current.undo() }} icon='left-triangle' />
                        <RichButton onClick={() => { this.puzzleRef.current.redo() }} icon='right-triangle' />
                        <RichButton onClick={() => { this.puzzleRef.current.redoAll() }} icon='double-right-triangle' />
                        {generator && (
                            <RichButton onClick={() => { this.generateProblem() }} icon='plus' />
                        )}
                    </div>

                    <Numberlink problem={this.state.problem} ref={this.puzzleRef} />
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    generator: PropTypes.func
};
