import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function SVGText(props) {
    const { top, left, bottom, right, value } = props;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const fontSize = (bottom - top) * 0.8;

    return (<text x={centerX} y={centerY} dominantBaseline='central' textAnchor='middle' style={{ fontSize }} className='puzzle-text'>
        {value}
    </text>);
}

SVGText.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};
