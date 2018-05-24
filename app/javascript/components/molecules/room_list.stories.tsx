import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BrowserRouter as Router } from 'react-router-dom'
import RoomList from './room_list'
import '../utils/global_style'

const items = [
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
]
storiesOf('Molecules/RoomList', module).add('デフォルト', () => (
  <Router>
    <RoomList items={items} destroyRoomAsync={action('onclick')} />
  </Router>
))
