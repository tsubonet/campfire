import * as React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  label: string
  to: string
  activeOnlyWhenExact?: boolean
}
const NavLink = ({ label, to, activeOnlyWhenExact }: Props) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match, location }) => (
      <StyledLink to={to} className={match || (location.pathname === '/' && to === '/rooms/1') ? 'active' : ''}>
        {label}
      </StyledLink>
    )}
  />
)

export default NavLink

const StyledLink = styled(Link)`
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
`
