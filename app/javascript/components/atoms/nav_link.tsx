import * as React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface MenuProps {
  label: string
  to: string
  activeOnlyWhenExact?: boolean
}
const NavLink = ({ label, to, activeOnlyWhenExact }: MenuProps) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match, location }) => (
      <div>
        {match || (location.pathname === '/' && to === '/rooms/1') ? '> ' : ''}
        <StyledLink to={to} className={match || (location.pathname === '/' && to === '/rooms/1') ? 'active' : ''}>
          {label}
        </StyledLink>
      </div>
    )}
  />
)

export default NavLink

const StyledLink = styled(Link)`
  color: #ccc;
  &.active {
    color: red;
  }
`
