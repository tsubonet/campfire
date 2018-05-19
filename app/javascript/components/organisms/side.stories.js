import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter as Router } from 'react-router-dom'
import Side from './side'
import '../utils/global_style'

const rooms = {
  items: [
    {
      id: 1,
      name: 'name1',
    },
    {
      id: 2,
      name: 'name2',
    },
    {
      id: 3,
      name: 'name3',
    },
    {
      id: 4,
      name: 'name4',
    },
  ],
}
storiesOf('Organisms/Side', module).add('デフォルト', () => (
  <Router>
    <Side
      rooms={rooms}
      postRoomAsync={action('click')}
      postRoomReset={action('click')}
      destroyRoomAsync={action('click')}
    />
  </Router>
))
