import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter as Router } from 'react-router-dom'
import NavLink from './nav_link'
import '../utils/global_style'

storiesOf('Molecules/NavLink', module).add('デフォルト', () => (
  <Router>
    <NavLink to={`/rooms/1`} label="デフォルト" destroyRoomAsync={action('onclick')} />
  </Router>
))
