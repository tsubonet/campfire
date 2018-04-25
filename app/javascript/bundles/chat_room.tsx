import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from './messages_list'
import MessageForm from './message_form'
import { Room, Message } from '../types'
import { addMessage } from '../modules/messages'

interface Props {
  messages: Message[]
  room: Room
  match
  dispatch
}
interface State {
  messages: Message[]
  room: Room
}
declare let App: any

class ChatRoom extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      room: props.room,
    }
  }

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

  componentDidMount() {
    this.connectActionCable(this.state.room.id)
  }

  componentWillReceiveProps(nextProps) {
    fetch(`/rooms/${nextProps.match.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          messages: res.messages,
          room: res.room,
        })

        if (App.room) App.cable.subscriptions.remove(App.room)
        this.connectActionCable(res.room.id)
      })
  }

  componentWillMount() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  render() {
    return (
      <div>
        <p>Room Name: {this.state.room.name}</p>
        <MessagesList messages={this.state.messages} />
        <MessageForm room={this.state.room} />
      </div>
    )
  }
}

const mapStateToProps = ({ messages, room }) => {
  return {
    messages,
    room,
  }
}

export default withRouter(connect(mapStateToProps)(ChatRoom))
