import * as React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Room } from '../modules/room'

interface Props {
  rooms: Array<Room>
}
const GlobalNav = (props: Props) => {
  return (
    <ul>
      {props.rooms.map((room, i) => {
        return (
          <li key={i}>
            <MenuLink to={`/rooms/${room.id}`} label={room.name} />
          </li>
        )
      })}
    </ul>
  )
}

interface MenuProps {
  label: string
  to: string
  activeOnlyWhenExact?: boolean
}
const MenuLink = ({ label, to, activeOnlyWhenExact }: MenuProps) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {match ? '> ' : ''}
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
)

const mapStateToProps = ({ rooms }) => {
  return { rooms }
}

export default withRouter(connect(mapStateToProps)(GlobalNav))
