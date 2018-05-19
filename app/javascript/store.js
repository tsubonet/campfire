import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import epics from './epics'

import selectedRoom, { SelectedRoom } from './modules/selected_room'
import rooms, { Rooms } from './modules/rooms'
import messages, { Messages } from './modules/messages'

export const rootReducer = combineReducers({
  messages,
  rooms,
  selectedRoom,
  form: formReducer,
  router: routerReducer,
})

export default function configureStore(initialState) {
  const middlewares = [routerMiddleware(history), thunk, createEpicMiddleware(epics)]
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }

  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
