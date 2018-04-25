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

  async fetchProps(nextProps) {
    const res = await fetch(`/rooms/${nextProps.match.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    this.props.dispatch(setMessages(json.messages))
    this.props.dispatch(setRoom(json.room))
    this.disconnectActionCable()
    this.connectActionCable(json.room.id)
  }

  componentDidMount() {
    this.connectActionCable(this.props.room.id)
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps.match.params.id)
    console.log('this.props', this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id === this.props.match.params.id) return
    this.fetchProps(nextProps)
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
