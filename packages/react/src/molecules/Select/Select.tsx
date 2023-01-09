import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react'
import Text from '../../atoms/Text'

// const KEY_CODES = {
//   ENTER: 13,
//   SPACE: 32,
//   DOWN_ARROW: 40
// }

interface SelectOption {
  label: string
  value: string
}

interface RenderOptionProps {
  is_selected: boolean
  option: SelectOption
  getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options?: SelectOption[]
  label?: string
  renderOption: (props: RenderOptionProps) => React.ReactNode
}

const getNextOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0
  }

  if (currentIndex === options.length - 1) { // last
    return 0
  }

  return currentIndex + 1
}

const getPreviousOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0
  }

  if (currentIndex === 0) {
    return options.length - 1
  }

  return currentIndex - 1
}

const Select: React.FunctionComponent<SelectProps> = ({ options = [], label = 'Please select an option', onOptionSelected: handler, renderOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [overlayTop, setOverlayTop] = useState<number|''>(0)
  const [selectedIndex, setSelectedIndex] = useState<null|number>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<null|number>(null)
  const [optionRefs, setOptionsRefs] = useState<React.RefObject<HTMLLIElement>[]>([])

  const labelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
  }, [labelRef.current?.offsetHeight])

  useEffect(() => {
    setOptionsRefs(options.map(_ => createRef<HTMLLIElement>()))
  }, [options.length])

  useEffect(() => {
    const ref = highlightedIndex !== null && isOpen ? optionRefs[highlightedIndex] : null

    if (ref && ref.current) {
      ref.current.focus()
    }
  }, [isOpen, highlightedIndex])

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex)
    }

    setSelectedIndex(optionIndex)
    setIsOpen(false)
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen)
  }

  const selectedOption = selectedIndex !== null ? options[selectedIndex] : null

  const highlightOption = (optionIndex: number|null) => {
    setHighlightedIndex(optionIndex)
  }

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault()

    // if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
    if (['Enter', 'ArrowDown', ' '].includes(event.key)) {
      setIsOpen(true)

      highlightOption(0)
    }
  }

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault()

    if (event.key === 'Escape') {
      setIsOpen(false)
    }

    if (event.key === 'ArrowDown') {
      highlightOption(getNextOptionIndex(highlightedIndex, options))
    }

    if (event.key === 'ArrowUp') {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options))
    }

    if (event.key === 'Enter') {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!)
    }
  }

  return (
    <div className='dse-select' aria-haspopup={true} aria-expanded={isOpen ? true : undefined} aria-controls='dse-select-list'>
      <button data-testid='dse-select-button' className='dse-select__label' onClick={() => onLabelClick()} ref={labelRef} onKeyDown={onButtonKeyDown}>
        <Text>{selectedOption === null ? label : selectedOption?.label}</Text>
        <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`} width='1rem' height='1rem' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      <ul id='dse-select-list' role='menu' className={`dse-select__overlay ${isOpen ? 'dse-select__overlay--open' : ''}`} style={{ top: overlayTop }}>
        {
          options.map((option, optionIndex) => {
            const is_selected = selectedIndex === optionIndex

            const ref = optionRefs[optionIndex]

            const is_highlighted = highlightedIndex === optionIndex

            const renderOptionProps = {
              option,
              is_selected,
              getOptionRecommendedProps: (overrideProps = {}) => {return {
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
              }}
            }

            if (renderOption) {
              return renderOption(renderOptionProps)
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {is_selected ? (
                  <svg width='1rem' height='1rem' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : null}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Select