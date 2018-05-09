import * as React from 'react'
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

export default GlobalNav

const NavList = styled.li`
  border-bottom: 1px solid #ccc;
`
