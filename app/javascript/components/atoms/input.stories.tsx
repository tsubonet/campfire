import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'
import '../utils/global_style'

storiesOf('Atoms/Input', module).add('デフォルト', () => (
  <Input handleSubmit={action('onKeyDown')} inputRef={''} />
))
