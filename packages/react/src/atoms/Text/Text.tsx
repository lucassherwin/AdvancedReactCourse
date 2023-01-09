import React from 'react'
import { FontSize } from '@Project1/foundation'

export interface TextProps {
  size?: keyof typeof FontSize
  children: any
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const className = `dse-text dse-text dse-text-${size}`

  return <p className={className}>{children}</p>
}

export default Text
