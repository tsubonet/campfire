import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './button'
import '../utils/global_style'
import { withStyle } from '../utils/decorators.js'

storiesOf('Atoms/Button', module).add('デフォルト', () =>
  withStyle({ margin: '30px' })(<Button>デフォルト</Button>)
)
