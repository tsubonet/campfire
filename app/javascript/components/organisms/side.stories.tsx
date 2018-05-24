import * as React from 'react'
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
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 2,
      name: 'name2',
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 3,
      name: 'name3',
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 4,
      name: 'name4',
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
  ],
  loading: false,
  errors: null,
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
