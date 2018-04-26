import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from './messages_list'
import MessageForm from './message_form'
import { RootState } from '../packs/entry'
import { Messages, addMessage, setMessages, getOldMessages } from '../modules/messages'
import { Room, setRoom } from '../modules/room'

interface Props {
  messages: Messages
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

  async fetchProps(props) {
    const res = await fetch(`/rooms/${props.match.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    console.log(json)
    this.props.dispatch(setMessages(json.messages))
    this.props.dispatch(setRoom(json.room))
    this.disconnectActionCable()
    this.connectActionCable(json.room.id)
  }

  async fetchOldMessages() {
    const res = await fetch(
      `/rooms/${this.props.match.params.id}/messages/old/?page=${this.props.messages.currentPage + 1}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const json = await res.json()
    this.props.dispatch(getOldMessages(json.messages))
  }

  componentDidMount() {
    console.log(this.props)
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
        {this.props.messages.hasNext && <button onClick={this.fetchOldMessages.bind(this)}>前の記事を読み込む</button>}
        <MessagesList messages={this.props.messages} />
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
