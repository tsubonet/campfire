import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Side from '../organisms/side'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'

import { Messages, receiveMessage, fetchOldMessagesSync } from '../../modules/messages'
import { Room, Rooms, postRoomAsync, postRoomReset, sortRoom } from '../../modules/rooms'
import { SelectedRoom, setRoomAsync } from '../../modules/selected_room'

interface Props {
  messages: Messages
  selectedRoom: SelectedRoom
  rooms: Rooms
  match: any
  history: any
  receiveMessage(message): void
  fetchOldMessagesSync(id: number, messages: Messages): void
  setRoomAsync(id: number, wait?: number): void
  postRoomAsync(content: string, history): void
  postRoomReset(): void
  sortRoom(room: Room): void
}
interface State {
  windowH: number
}
declare let App: any

class ChatRoomPage extends React.Component<Props, State> {
  private inputMessageElement: HTMLTextAreaElement

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
          this.props.receiveMessage(data.message)
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.props.setRoomAsync(this.props.match.params.id || 1, 500)

    this.connectActionCable(this.props.selectedRoom.item.id)
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
    const { selectedRoom, sortRoom } = this.props
    if (e.keyCode === 13) {
      e.preventDefault()
      const content = this.inputMessageElement.value
      if (content === '') return
      this.inputMessageElement.value = ''
      this.inputMessageElement.focus()
      const response = await fetch(`/rooms/${selectedRoom.item.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: { content } }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      sortRoom(selectedRoom.item)
    }
  }

  render() {
    const {
      rooms,
      messages,
      selectedRoom,
      postRoomAsync,
      postRoomReset,
      fetchOldMessagesSync,
    } = this.props
    return (
      <Root style={{ height: this.state.windowH }}>
        <Side
          rooms={rooms}
          postRoomAsync={postRoomAsync}
          postRoomReset={postRoomReset}
          history={this.props.history}
        />
        <Main>
          {selectedRoom.loading ? (
            <Loading>loading...</Loading>
          ) : (
            <React.Fragment>
              <RoomName>ルーム名: {selectedRoom.item.name}</RoomName>
              <MessagesList
                room={selectedRoom.item}
                messages={messages}
                fetchOldMessagesSync={fetchOldMessagesSync}
              />
              <MessageForm
                room={selectedRoom.item}
                handleSubmit={this.postMessage.bind(this)}
                inputRef={el => (this.inputMessageElement = el)}
              />
            </React.Fragment>
          )}
        </Main>
      </Root>
    )
  }
}

const mapStateToProps = ({ messages, rooms, selectedRoom }: RootState) => {
  return {
    messages,
    rooms,
    selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRoomAsync: (id: number, wait: number) => {
      dispatch(setRoomAsync(id, wait))
    },
    postRoomAsync: (name: string, history: any) => {
      dispatch(postRoomAsync(name, history))
    },
    postRoomReset: () => {
      dispatch(postRoomReset())
    },
    sortRoom: (room: Room) => {
      dispatch(sortRoom(room))
    },
    fetchOldMessagesSync: (id: number, messages: Messages) => {
      dispatch(fetchOldMessagesSync(id, messages))
    },
    receiveMessage: (message: string) => {
      dispatch(receiveMessage(message))
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
  position: relative;
`
const RoomName = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  height: 40px;
  font-weight: bold;
`
const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
