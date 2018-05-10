import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import NavLink from '../atoms/nav_link'

interface Props {
  rooms: Array<Room>
}
const RoomList = ({ rooms }: Props) => {
  return (
    <ul>
      {rooms.map((room, idx) => {
        return (
          <NavList key={idx}>
            <NavLink to={`/rooms/${room.id}`} label={room.name} />
          </NavList>
        )
      })}
    </ul>
  )
}

export default RoomList

const NavList = styled.li`
  border-bottom: 1px solid #ccc;
`
