import React from 'react';
import ReactDOM from 'react-dom';

import 'style.css'

export default class RichButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
            mouseOver: false,
            timer: null
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseEnter() {
        this.setState({ mouseOver: true });
    }
    onMouseLeave() {
        this.setState({ click: false, mouseOver: false });
    }
    onMouseDown() {
        this.setState({ click: true });

        if (this.props.onClick) this.props.onClick();
    }
    onMouseUp() {
        this.setState({ click: false });
    }

    render() {
        let className = "controller-button";
        if (this.state.click) {
            className += " controller-button-clicked";
        } else if (this.state.mouseOver) {
            className += " controller-button-active";
        } else {
            className += " controller-button-inactive"
        }
        return (
            <div
                className={className}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                {this.props.children}
            </div>
        );
    }
}
