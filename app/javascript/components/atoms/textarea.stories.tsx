import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Textarea from './textarea'
import '../utils/global_style'

storiesOf('Atoms/Textarea', module).add('デフォルト', () => (
  <Textarea handleSubmit={action('onKeyDown')} inputRef={''} />
))
