import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatRoomPage from './pages/chat_room_page'
import EditRoomPage from './pages/edit_room_page'
import SandboxPage from './pages/sandbox'
import './utils/global_style'

const Router = props => {
  return (
    <Switch>
      <Route exact path="/" component={ChatRoomPage} />
      <Route exact path="/rooms/:id" component={ChatRoomPage} />
      <Route exact path="/rooms/:id/edit" component={EditRoomPage} />
      <Route exact path="/sandbox" component={SandboxPage} />
    </Switch>
  )
}
export default Router
