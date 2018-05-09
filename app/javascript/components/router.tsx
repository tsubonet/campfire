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
      <StyledGlobalNav />
      <Main>
        <Switch>
          <Route exact path="/" component={ChatRoom} />
          <Route exact path="/rooms/:id" component={ChatRoom} />
          <Route exact path="/sandbox" component={Sandbox} />
        </Switch>
      </Main>
    </Wrapper>
  )
}

export default Router

const Wrapper = styled.div`
  display: flex;
`
const StyledGlobalNav = styled(GlobalNav)`
  width: 200px;
  background: #f2f2f2;
}
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
  padding: 10px;
`
// const StyledLink = styled(Link)`
//   color: #ccc;
//   &.active {
//     color: red;
//   }
// `
