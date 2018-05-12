import React from 'react';
import ReactDOM from 'react-dom';

export default class Puzzle extends React.Component {
    constructor(props) {
        super(props);
    }

    undo() {
        const nextField = this.state.field.undo();
        this.setState({
            field: nextField,
            isSolved: nextField.checkAnswer()
        });
    }
    redo() {
        const nextField = this.state.field.redo();
        this.setState({
            field: nextField,
            isSolved: nextField.checkAnswer()
        });
    }
    undoAll() {
        const nextField = this.state.field.undoAll();
        this.setState({
            field: nextField,
            isSolved: nextField.checkAnswer()
        });
    }
    redoAll() {
        const nextField = this.state.field.redoAll();
        this.setState({
            field: nextField,
            isSolved: nextField.checkAnswer()
        });
    }
}
