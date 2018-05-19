import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter as Router } from 'react-router-dom'
import SideHeading from './side_heading'
import '../utils/global_style'

storiesOf('Molecules/SideHeading', module).add('デフォルト', () => (
  <Router>
    <SideHeading openModal={action('onclick')} />
  </Router>
))
