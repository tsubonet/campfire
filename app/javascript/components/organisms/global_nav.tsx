import * as React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Room } from '../../modules/room'
import NavLink from '../atoms/nav_link'
import styled from 'styled-components'

interface Props {
  rooms: Array<Room>
  className
}
const GlobalNav = ({ rooms, className }: Props) => {
  return (
    <ul className={className}>
      {rooms.map((room, i) => {
        return (
          <NavList key={i}>
            <NavLink to={`/rooms/${room.id}`} label={room.name} />
          </NavList>
        )
      })}
    </ul>
  )
}

const mapStateToProps = ({ rooms }) => {
  return { rooms }
}

export default withRouter(connect(mapStateToProps)(GlobalNav))

const NavList = styled.li`
  border-bottom: 1px solid #ccc;
`
