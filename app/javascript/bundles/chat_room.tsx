import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from './messages_list'
import MessageForm from './message_form'
import { RootState } from '../packs/entry'
import { Messages, addMessage, setMessages } from '../modules/messages'
import { Room, setRoom } from '../modules/room'

interface Props {
  messages: Messages
  room: Room
  match: any
  dispatch: any
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
        connected: function() {
          console.log('connected')
        },
        disconnected: function() {
          console.log('disconnected')
        },
        received: data => {
          this.props.dispatch(addMessage(data.message))
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  async fetchProps(props) {
    const res = await fetch(`/rooms/${props.match.params.id}`, {
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
    if (prevProps.match.params.id === this.props.match.params.id) return
    this.fetchProps(this.props)
  }

  UNSAFE_componentWillMount() {
    this.disconnectActionCable()
  }

  render() {
    return (
      <div>
        <p>Room Name: {this.props.room.name}</p>
        <MessagesList />
        <MessageForm room={this.props.room} />
      </div>
    )
  }
}

const mapStateToProps = ({ messages, room }: RootState) => {
  return {
    messages,
    room,
  }
}

export default withRouter(connect(mapStateToProps)(ChatRoom))
