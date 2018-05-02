import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatRoom from './chat_room'
import GlobalNav from './global_nav'
import Sandbox from './sandbox'

const Router = props => {
  return (
    <div>
      <GlobalNav />
      <Switch>
        <Route exact path="/" component={ChatRoom} />
        <Route exact path="/rooms/:id" component={ChatRoom} />
        <Route exact path="/sandbox" component={Sandbox} />
      </Switch>
    </div>
  )
}

export default Router
