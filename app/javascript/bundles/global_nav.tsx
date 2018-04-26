import * as React from 'react'
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
            <Link to={`/rooms/${room.id}`}>{room.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = ({ rooms }) => {
  return { rooms }
}

export default connect(mapStateToProps)(GlobalNav)
