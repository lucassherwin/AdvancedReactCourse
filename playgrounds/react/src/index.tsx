import React from 'react'
import ReactDOM from 'react-dom'

import { Text, Margin, Select } from '@Project1/react'

import '@Project1/scss/lib/Utilities.css'
import '@Project1/scss/lib/Text.css'
import '@Project1/scss/lib/Margin.css'
import '@Project1/scss/lib/Select.css'
import '@Project1/scss/lib/global.css'

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

ReactDOM.render(
  <div style={{ padding: '40px' }}>
    <Select options={options} />
  </div>,
  document.querySelector('#root')
)
// renderOption={({ option, getOptionRecommendedProps }) => <p {...getOptionRecommendedProps({})}>{option.label}</p>}