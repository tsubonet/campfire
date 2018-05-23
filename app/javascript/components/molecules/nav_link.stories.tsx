import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../../store'
import NavLink from './nav_link'
import '../utils/global_style'

const history = createHistory()
const store = configureStore({})

storiesOf('Molecules/NavLink', module)
  .addDecorator(story => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    </Provider>
  ))
  .add('デフォルト', () => (
    <NavLink to={`/rooms/1`} label="デフォルト" destroyRoomAsync={action('onclick')} />
  ))
