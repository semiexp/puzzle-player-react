import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RichButton from 'components/RichButton'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onUndoAll, onUndo, onRedo, onRedoAll } = this.props;

        return (
            <div className="toolbar-container">
                <RichButton onClick={onUndoAll || (() => {})} icon='double-left-triangle' />
                <RichButton onClick={onUndo || (() => {})} icon='left-triangle' />
                <RichButton onClick={onRedo || (() => {})} icon='right-triangle' />
                <RichButton onClick={onRedoAll || (() => {})} icon='double-right-triangle' />
            </div>
        );
    }
}

Toolbar.propTypes = {
    onUndoAll: PropTypes.func,
    onUndo: PropTypes.func,
    onRedo: PropTypes.func,
    onRedoAll: PropTypes.func
};
