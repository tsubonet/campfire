import React from 'react'
import { storiesOf } from '@storybook/react'
import Textarea from './textarea'
import '../utils/global_style'

storiesOf('Atoms/Textarea', module).add('デフォルト', () => <Textarea />)
