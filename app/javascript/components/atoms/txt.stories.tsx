import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Txt from './txt'
import '../utils/global_style'

storiesOf('Atoms/Txt', module).add('デフォルト', () => <Txt>デフォルト</Txt>)
