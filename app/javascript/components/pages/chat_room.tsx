import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Side from '../organisms/side'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'

import { Messages, addMessage, getOldMessagesSync } from '../../modules/messages'
import { Room, setRoomAsync } from '../../modules/room'
import { postRoomAsync } from '../../modules/rooms'

interface Props {
  messages: Messages
  room: Room
  rooms: Array<Room>
  match: any
  addMessage(message): void
  setRoomAsync(id: number): void
  postRoomAsync(content: string): void
  getOldMessagesSync(id: number, messages: Messages): void
}
interface State {
  windowH: number
}
declare let App: any

class ChatRoomPage extends React.Component<Props, State> {
  private inputMessageElement

  constructor(props) {
    super(props)
    this.state = {
      windowH: window.innerHeight,
    }
  }

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
          this.props.addMessage(data.message)
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  componentDidMount() {
    this.connectActionCable(this.props.room.id)
    window.addEventListener(
      'resize',
      debounce(() => {
        this.setState({ windowH: window.innerHeight })
      }, 1000)
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return
    this.props.setRoomAsync(this.props.match.params.id)
    this.disconnectActionCable()
    this.connectActionCable(this.props.match.params.id)
  }

  UNSAFE_componentWillMount() {
    this.disconnectActionCable()
  }

  async postMessage(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const content = this.inputMessageElement.value
      if (content === '') return
      this.inputMessageElement.value = ''
      this.inputMessageElement.focus()
      const response = await fetch(`/rooms/${this.props.room.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: { content } }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }

  render() {
    return (
      <Root style={{ height: this.state.windowH }}>
        <Side rooms={this.props.rooms} postRoomAsync={this.props.postRoomAsync} />
        <Main>
          <RoomName>ルーム名: {this.props.room.name}</RoomName>
          <MessagesList
            room={this.props.room}
            messages={this.props.messages}
            getOldMessagesSync={this.props.getOldMessagesSync}
          />
          <MessageForm
            room={this.props.room}
            handleSubmit={this.postMessage.bind(this)}
            inputRef={el => (this.inputMessageElement = el)}
          />
        </Main>
      </Root>
    )
  }
}

const mapStateToProps = ({ messages, room, rooms }: RootState) => {
  return {
    messages,
    room,
    rooms,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRoomAsync: (id: number) => {
      dispatch(setRoomAsync(id))
    },
    getOldMessagesSync: (id: number, messages: Messages) => {
      dispatch(getOldMessagesSync(id, messages))
    },
    postRoomAsync: (name: string) => {
      dispatch(postRoomAsync(name))
    },
    addMessage: (message: string) => {
      dispatch(addMessage(message))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage))

const Root = styled.div`
  display: flex;
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
`
const RoomName = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  height: 40px;
  font-weight: bold;
`
