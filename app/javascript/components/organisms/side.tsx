import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import SideHeading from '../molecules/side_heading'
import RoomList from '../molecules/room_list'

interface Props {
  rooms: Array<Room>
}
const Side = (props: Props) => {
  return (
    <Root>
      <SideHeading />
      <RoomList {...props} />
    </Root>
  )
}

export default Side

const Root = styled.div`
  width: 200px;
  background: #f2f2f2;
  border-right: 1px solid #cccccc;
}
`
