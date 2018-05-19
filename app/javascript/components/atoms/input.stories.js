import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from './input'
import '../utils/global_style'

storiesOf('Atoms/Input', module).add('デフォルト', () => <Input />)
