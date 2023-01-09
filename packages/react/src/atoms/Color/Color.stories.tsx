import React from 'react'
import Color from './Color'
import { text, select } from '@storybook/addon-knobs'

import '@Project1/scss/lib/Utilities.css'

import { Spacing } from '@Project1/foundation'

export default {
  title: 'Color'
}

export const Common = () => <Color hexCode={text('hexCode', 'pink')} />

export const CustomDimensions = () => (
  <Color
    hexCode={text('hexCode', 'pink')}
    width={select('width', Object.values(Spacing), 'xxl')}
    height={select('height', Object.values(Spacing), 'xxl')}
  />
)