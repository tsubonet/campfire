import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ChatRoomTemplate from '../templates/chat_room_template'
import { RootState } from '../../packs/entry'

import { Messages, receiveMessage, destroyMessage, fetchOldMessagesSync } from '../../modules/messages'
import { Room, Rooms, sortRoom } from '../../modules/rooms'
import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'

const mapStateToProps = ({ messages, rooms, selectedRoom }: RootState) => {
  return {
    rooms,
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
    destroyMessage: (id: number) => {
      dispatch(destroyMessage(id))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoomTemplate))
