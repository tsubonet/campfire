import * as React from 'react'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'

const Enhance = compose(
  withState('isAppear', 'updateToggle', false),
  withHandlers({
    showButton: ({ updateToggle }) => () => {
      updateToggle(isAppear => true)
    },
    hideButton: ({ updateToggle }) => () => {
      updateToggle(isAppear => false)
    },
    destroyRoom: props => event => {
      event.preventDefault()
      event.stopPropagation()
      props.destroyRoomAsync(parseInt(props.to.replace('/rooms/', ''), 10))
    },
  })
)

interface Props {
  label: string
  to: string
  isAppear: boolean
  showButton: Function
  hideButton: Function
  destroyRoom: any
}
const NavLink = ({ label, to, isAppear, showButton, hideButton, destroyRoom }: Props) => (
  <Route
    path={to}
    children={({ match, location }) => (
      <StyledLink
        to={to}
        onMouseEnter={showButton}
        onMouseLeave={hideButton}
        className={match || (location.pathname === '/' && to === '/rooms/1') ? 'active' : ''}
      >
        {label}
        {isAppear && <button onClick={destroyRoom}>×</button>}
      </StyledLink>
    )}
  />
)

export default Enhance(NavLink)

const StyledLink = styled(Link)`
  position: relative;
  color: #1a1a1a;
  text-decoration: none;
  padding: 15px;
  display: block;
  transition: background 0.2s linear 0s;
  &.active {
    background: #ccc;
  }
  &:hover:not(.active) {
    background: #fff;
  }
  button {
    position: absolute;
    right: 10px;
  }
`
