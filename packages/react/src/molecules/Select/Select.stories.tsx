import React from 'react'
import Select from './Select'
import { withA11y } from '@storybook/addon-a11y'

// css
import '@Project1/scss/lib/Select.css'

const options = [{
  label: 'Strict Black',
  value: 'strict-black'
}, {
  label: 'Heavenly Green',
  value: 'heavenly-green'
}, {
  label: 'Sweet Pink',
  value: 'pink'
}]

export default {
  title: 'Molecules|Select',
  decorators: [withA11y]
}

export const Common = () => <Select options={options} />

export const RenderOption = () => {
  return <Select 
    options={options}
    renderOption={({ getOptionRecommendedProps, option, is_selected }) => (
      <span {...getOptionRecommendedProps()}>{option.label} {is_selected ? 'SELECTED' : ''}</span>
    )}
  />
}

export const CustomLabel = () => <Select label='Select a color' options={options} />