import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from './messages_list'
import MessageForm from './message_form'
import { Room, Message, StoreState } from '../types'
import { addMessage, setMessages } from '../modules/messages'
import { setRoom } from '../modules/room'

interface Props {
  messages: Message[]
  room: Room
  match
  dispatch
}
declare let App: any

class ChatRoom extends React.Component<Props> {
  connectActionCable(room_id) {
    App.room = App.cable.subscriptions.create(
      {
        channel: 'RoomChannel',
        room_id,
      },
      {
        connected: function() {},
        disconnected: function() {},
        received: data => {
          this.props.dispatch(addMessage(data.message))
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  componentDidMount() {
    this.connectActionCable(this.props.room.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id === this.props.match.params.id) return

    fetch(`/rooms/${nextProps.match.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.props.dispatch(setMessages(res.messages))
        this.props.dispatch(setRoom(res.room))

        this.disconnectActionCable()
        this.connectActionCable(res.room.id)
      })
  }

  componentWillMount() {
    this.disconnectActionCable()
  }

  render() {
    return (
      <div>
        <p>Room Name: {this.props.room.name}</p>
        <MessagesList messages={this.props.messages} />
        <MessageForm room={this.props.room} />
      </div>
    )
  }
}

const mapStateToProps = ({ messages, room }: StoreState) => {
  return {
    messages,
    room,
  }
}

export default withRouter(connect(mapStateToProps)(ChatRoom))
