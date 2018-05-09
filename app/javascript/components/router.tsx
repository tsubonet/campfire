import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import GlobalNav from './organisms/global_nav'
import ChatRoom from './pages/chat_room'
import Sandbox from './pages/sandbox'

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
