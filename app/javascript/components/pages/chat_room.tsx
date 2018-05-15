import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import CommonTemplate from '../templates/common_template'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'

import { Messages, receiveMessage, fetchOldMessagesSync } from '../../modules/messages'
import { Room, sortRoom } from '../../modules/rooms'
import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'

interface Props {
  messages: Messages
  selectedRoom: SelectedRoom
  match: any
  receiveMessage(message): void
  fetchOldMessagesSync(id: number, messages: Messages): void
  selectRoomAsync(id: number, wait?: number): void
  sortRoom(room: Room): void
}

declare let App: any

class ChatRoomPage extends React.Component<Props, {}> {
  private inputMessageElement: HTMLTextAreaElement

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
    const { match, selectRoomAsync, selectedRoom } = this.props
    selectRoomAsync(match.params.id || 1, 500)
    this.connectActionCable(selectedRoom.item.id)
  }

  componentDidUpdate(prevProps) {
    const { match, selectRoomAsync } = this.props
    if (prevProps.match.params.id === match.params.id) return
    selectRoomAsync(match.params.id)
    this.disconnectActionCable()
    this.connectActionCable(match.params.id)
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
    const { messages, selectedRoom, fetchOldMessagesSync } = this.props
    return (
      <CommonTemplate>
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
      </CommonTemplate>
    )
  }
}

const mapStateToProps = ({ messages, selectedRoom }: RootState) => {
  return {
    messages,
    selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRoomAsync: (id: number, wait: number) => {
      dispatch(selectRoomAsync(id, wait))
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
