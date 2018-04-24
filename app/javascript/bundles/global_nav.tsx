import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

interface Props {
  rooms
}
const GlobalNav = (props: Props) => {
  return (
    <div>
      {props.rooms.map((room, i) => {
        return (
          <Link key={i} to={`/rooms/${room.id}`}>
            {room.name}
          </Link>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ rooms }) => {
  return { rooms }
}

export default connect(mapStateToProps)(GlobalNav)
