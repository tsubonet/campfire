import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RenderField from './render_field'
import '../utils/global_style'
const props = {
  input: {
    name: 'name',
    //value: 'wkk',
    onBlur: action(event),
    onChange: action(event),
    onDragStart: action(event),
    onDrop: action(event),
    onFocus: action(event),
  },
  label: 'ラベル',
  type: 'text',
  meta: {
    touched: true,
    error: true,
  },
}

storiesOf('Molecules/RenderField', module).add('デフォルト', () => <RenderField {...props} />)
