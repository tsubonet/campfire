import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import RoomList from '../molecules/room_list'

interface Props {
  rooms: Array<Room>
}
const Side = (props: Props) => {
  return (
    <Root>
      <Heading>
        <button>+</button>
      </Heading>
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
const Heading = styled.div`
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  text-align: right;
}
`
