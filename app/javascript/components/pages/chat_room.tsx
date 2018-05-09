import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'
import { Messages, addMessage } from '../../modules/messages'
import { Room, setRoomAsync } from '../../modules/room'

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

  componentDidMount() {
    this.connectActionCable(this.props.room.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return
    this.props.dispatch(setRoomAsync(this.props.match.params.id))
    this.disconnectActionCable()
    this.connectActionCable(this.props.match.params.id)
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
