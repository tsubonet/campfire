import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import NavLink from '../atoms/nav_link'

interface Props {
  items: Array<Room>
}

class RoomList extends React.Component<Props> {
  private RoomListRef
  constructor(props) {
    super(props)
    this.RoomListRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.RoomListRef.current.scrollTop = 0
    }
  }

  render() {
    const { items } = this.props
    return (
      <Root innerRef={this.RoomListRef}>
        {items.map((room, idx) => {
          return (
            <Li key={idx}>
              <NavLink to={`/rooms/${room.id}`} label={room.name} />
            </Li>
          )
        })}
      </Root>
    )
  }
}

export default RoomList

const Root = styled.ul`
  height: calc(100% - 40px);
  overflow: auto;
`
const Li = styled.li`
  border-bottom: 1px solid #ccc;
`
