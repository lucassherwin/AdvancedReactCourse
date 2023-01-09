import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === options.length - 1) { // last
        return 0;
    }
    return currentIndex + 1;
};
const getPreviousOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return options.length - 1;
    }
    return currentIndex - 1;
};
const Select = ({ options = [], label = 'Please select an option', onOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [overlayTop, setOverlayTop] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [optionRefs, setOptionsRefs] = useState([]);
    const labelRef = useRef(null);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    useEffect(() => {
        setOptionsRefs(options.map(_ => createRef()));
    }, [options.length]);
    useEffect(() => {
        const ref = highlightedIndex !== null && isOpen ? optionRefs[highlightedIndex] : null;
        if (ref && ref.current) {
            ref.current.focus();
        }
    }, [isOpen, highlightedIndex]);
    const onOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;
    const highlightOption = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        // if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
        if (['Enter', 'ArrowDown', ' '].includes(event.key)) {
            setIsOpen(true);
            highlightOption(0);
        }
    };
    const onOptionKeyDown = (event) => {
        event.preventDefault();
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
        if (event.key === 'ArrowDown') {
            highlightOption(getNextOptionIndex(highlightedIndex, options));
        }
        if (event.key === 'ArrowUp') {
            highlightOption(getPreviousOptionIndex(highlightedIndex, options));
        }
        if (event.key === 'Enter') {
            onOptionSelected(options[highlightedIndex], highlightedIndex);
        }
    };
    return (React.createElement("div", { className: 'dse-select', "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, "aria-controls": 'dse-select-list' },
        React.createElement("button", { className: 'dse-select__label', onClick: () => onLabelClick(), ref: labelRef, onKeyDown: onButtonKeyDown },
            React.createElement(Text, null, selectedOption === null ? label : selectedOption?.label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`, width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React.createElement("ul", { id: 'dse-select-list', role: 'menu', className: 'dse-select__overlay', style: { top: overlayTop } }, options.map((option, optionIndex) => {
            const is_selected = selectedIndex === optionIndex;
            const ref = optionRefs[optionIndex];
            const is_highlighted = highlightedIndex === optionIndex;
            const renderOptionProps = {
                option,
                is_selected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        role: 'menuitemradio',
                        'aria-label': option.label,
                        'aria-checked': is_selected ? true : undefined,
                        tabIndex: is_highlighted ? -1 : 0,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        onKeyDown: onOptionKeyDown,
                        className: `dse-select__option
                      ${is_selected ? 'dse-select__option--selected' : ''}
                      ${is_highlighted ? 'dse-select__option--highlighted' : ''}
                    `,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps
                    };
                }
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                is_selected ? (React.createElement("svg", { width: '1rem', height: '1rem', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))) : null));
        }))) : null));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
