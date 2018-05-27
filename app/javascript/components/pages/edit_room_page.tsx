import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import EditRoomTemplate from '../templates/edit_room_template'

import { RootState } from '../../packs/entry'

import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'
import { Room, Rooms, sortRoom } from '../../modules/rooms'

const mapStateToProps = ({ selectedRoom, rooms }: RootState) => {
  return {
    rooms,
    selectedRoom,
    initialValues: selectedRoom.item,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    selectRoomAsync: (id: number, wait: number) => {
      dispatch(selectRoomAsync(id, wait))
    },
    sortRoom: (room: Room) => {
      dispatch(sortRoom(room))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRoomTemplate))
