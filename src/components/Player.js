import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Toolbar from 'components/Toolbar'
import Numberlink from 'components/Numberlink'
import NumberlinkProblem from 'logic/NumberlinkProblem'

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

    render() {
        return (
            <div className='puzzle-container-wrapper'>
                <div className='puzzle-container'>
                    <Toolbar
                        onUndoAll={() => {this.puzzleRef.current.undoAll()}}
                        onUndo={() => {this.puzzleRef.current.undo()}}
                        onRedo={() => {this.puzzleRef.current.redo()}}
                        onRedoAll={() => {this.puzzleRef.current.redoAll()}}/>

                    <Numberlink problem={this.state.problem} ref={this.puzzleRef}/>
                </div>
            </div>
        );
    }
}

Player.propTypes = {

};
