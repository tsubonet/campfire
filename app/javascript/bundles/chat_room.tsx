import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from './messages_list'
import MessageForm from './message_form'

interface Props {
  messages
  room
  match
}
interface State {
  messages
  room
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

  updateMessages(message) {
    const messages = [...this.state.messages, message]
    this.setState({ messages })
  }

  componentDidMount() {
    App.room = App.cable.subscriptions.create(
      {
        channel: 'RoomChannel',
        room_id: this.state.room.id,
      },
      {
        connected: function() {},
        disconnected: function() {},
        received: data => {
          this.updateMessages(data.message)
        },
      }
    )
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
        App.room = App.cable.subscriptions.create(
          {
            channel: 'RoomChannel',
            room_id: res.room.id,
          },
          {
            connected: function() {},
            disconnected: function() {},
            received: data => {
              this.updateMessages(data.message)
            },
          }
        )
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

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoom))
