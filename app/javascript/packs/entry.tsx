import 'babel-polyfill'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReactOnRails from 'react-on-rails'
import createHistory from 'history/createBrowserHistory'
import Router from '../bundles/router'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
// import persistState from 'redux-localstorage'
// import createSagaMiddleware from 'redux-saga'
// import mySaga from '../sagas'
import thunk from 'redux-thunk'

import messages, { Messages } from '../modules/messages'
import rooms from '../modules/rooms'
import room, { Room } from '../modules/room'

export interface RootState {
  room: Room
  rooms: Room[]
  messages: Messages
}

const history = createHistory()

const App = (props, railsContext) => {
  console.log(props)
  //const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), thunk]
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }
  const rootReducer = combineReducers({
    messages,
    rooms,
    room,
    router: routerReducer,
  })
  const enhancer = compose(
    applyMiddleware(...middlewares)
    //persistState("auth", { key: "auth" })
  )
  const store = createStore(rootReducer, props, enhancer)
  //sagaMiddleware.run(mySaga);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  )
}

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
})
