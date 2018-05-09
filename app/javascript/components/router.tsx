import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import GlobalNav from './organisms/global_nav'
import ChatRoom from './pages/chat_room'
import Sandbox from './pages/sandbox'
import './utils/global_style'
import styled from 'styled-components'

const Router = props => {
  return (
    <Wrapper>
      <GlobalNav />
      <Switch>
        <Route exact path="/" component={ChatRoom} />
        <Route exact path="/rooms/:id" component={ChatRoom} />
        <Route exact path="/sandbox" component={Sandbox} />
      </Switch>
    </Wrapper>
  )
}

export default Router

const Wrapper = styled.div`
  display: flex;
  & > *:first-child {
    width: 100px;
    background: #999;
    padding: 10px;
  }
  & > *:last-child {
    width: calc(100% - 100px);
    background: #eee;
    padding: 10px;
  }
`
// const StyledLink = styled(Link)`
//   color: #ccc;
//   &.active {
//     color: red;
//   }
// `
