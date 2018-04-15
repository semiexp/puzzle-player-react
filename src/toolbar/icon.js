import React from 'react';
import ReactDOM from 'react-dom';

export default function Icon(props) {
    switch (props.type) {
        case 'double-left-triangle':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='50,10 50,90 10,50' stroke='#000' fill='#000' />
                    <polygon points='90,10 90,90 50,50' stroke='#000' fill='#000' />
                </svg>);
        case 'left-triangle':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='70,10 70,90 30,50' stroke='#000' fill='#000' />
                </svg>);
        case 'right-triangle':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='30,10 30,90 70,50' stroke='#000' fill='#000' />
                </svg>);
        case 'double-right-triangle':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='10,10 10,90 50,50' stroke='#000' fill='#000' />
                    <polygon points='50,10 50,90 90,50' stroke='#000' fill='#000' />
                </svg>);
        case 'minus':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='10,40 90,40 90,60 10,60' stroke='#000' fill='#000' />
                </svg>);
        case 'plus':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='10,40 40,40 40,10 60,10 60,40 90,40 90,60 60,60 60,90 40,90 40,60 10,60' stroke='#000' fill='#000' />
                </svg>);
        case 'left-arrow':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='10,50 40,20 40,40 90,40 90,60 40,60 40,80' stroke='#000' fill='#000' />
                </svg>);
        case 'right-arrow':
            return (
                <svg viewBox='0 0 100 100' height='20px' width='20px'>
                    <polygon points='90,50 60,20 60,40 10,40 10,60 60,60 60,80' stroke='#000' fill='#000' />
                </svg>);
    }
}
