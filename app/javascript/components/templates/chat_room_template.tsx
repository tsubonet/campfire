import * as React from 'react'
import styled from 'styled-components'

import CommonTemplate from '../templates/common_template'
import ChatHeader from '../organisms/chat_header'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'

import { Messages, receiveMessage, destroyMessage, fetchOldMessagesSync } from '../../modules/messages'
import { Room, Rooms, sortRoom } from '../../modules/rooms'
import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'

interface Props {
  messages: Messages
  selectedRoom: SelectedRoom
  rooms: Rooms
  match: any
  history: any
  receiveMessage(message): void
  destroyMessage(id): void
  fetchOldMessagesSync(id: number, messages: Messages): void
  selectRoomAsync(id: number, wait?: number): void
  sortRoom(room: Room): void
}

declare let App: any

class ChatRoomTemplate extends React.Component<Props, {}> {
  private inputMessageElement: HTMLTextAreaElement

  connectActionCable(roomId) {
    App.room = App.cable.subscriptions.create(
      {
        channel: 'RoomChannel',
        room_id: roomId,
      },
      {
        connected: function() {
          console.log('connected')
        },
        disconnected: function() {
          console.log('disconnected')
        },
        received: data => {
          console.log('data', data)
          if (data.action === 'destroy') {
            this.props.destroyMessage(data.message.id)
          } else {
            this.props.receiveMessage(data.message)
          }
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  componentDidMount() {
    const { match, selectRoomAsync, selectedRoom, rooms } = this.props
    const targetRoomId = match.params.id || rooms.items[0].id
    selectRoomAsync(targetRoomId, 500)
    this.connectActionCable(targetRoomId)
  }

  componentDidUpdate(prevProps) {
    const { match, selectRoomAsync } = this.props
    const targetRoomId = match.params.id
    if (prevProps.match.params.id === targetRoomId) return
    selectRoomAsync(targetRoomId)
    this.disconnectActionCable()
    this.connectActionCable(targetRoomId)
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

  _destroyMessage(item) {
    // App.room.perform('delete', item)
    const res = fetch(`/messages/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  transitEdit() {
    const { history, selectedRoom } = this.props
    history.push(`/rooms/${selectedRoom.item.id}/edit`)
  }

  render() {
    const { history, messages, selectedRoom, fetchOldMessagesSync } = this.props
    return (
      <CommonTemplate>
        {selectedRoom.loading ? (
          <Loading>loading...</Loading>
        ) : (
          <React.Fragment>
            <ChatHeader room={selectedRoom.item} transitEdit={this.transitEdit.bind(this)} />
            <MessagesList
              room={selectedRoom.item}
              messages={messages}
              fetchOldMessagesSync={fetchOldMessagesSync}
              destroyMessage={this._destroyMessage.bind(this)}
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

export default ChatRoomTemplate

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
