import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import NavLink from '../atoms/nav_link'

interface Props {
  rooms: Array<Room>
}
const RoomList = ({ rooms }: Props) => {
  return (
    <Root>
      {rooms.map((room, idx) => {
        return (
          <Li key={idx}>
            <NavLink to={`/rooms/${room.id}`} label={room.name} />
          </Li>
        )
      })}
    </Root>
  )
}

export default RoomList

const Root = styled.ul`
  height: calc(100% - 40px);
  overflow: auto;
`
const Li = styled.li`
  border-bottom: 1px solid #ccc;
`
