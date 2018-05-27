import * as React from 'react'
import styled from 'styled-components'
import { SubmissionError } from 'redux-form'

import CommonTemplate from '../templates/common_template'
import ChatHeader from '../organisms/chat_header'
import EditRoomForm from '../organisms/edit_room_form'

import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'
import { Room, Rooms, sortRoom } from '../../modules/rooms'

interface Props {
  selectedRoom: SelectedRoom
  match: any
  rooms: Rooms
  history: any
  initialValues
  selectRoomAsync(id: number, wait?: number): void
  sortRoom(room: Room): void
}

class EditRoomTemplate extends React.Component<Props, {}> {
  componentDidMount() {
    const { match, rooms, selectRoomAsync } = this.props
    const targetRoomId = match.params.id || rooms.items[0].id
    selectRoomAsync(targetRoomId)
  }

  submit = async values => {
    const res = await fetch(`/rooms/${this.props.selectedRoom.item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name: values.name }),
    })
    const json = await res.json()
    if (res.status === 200) {
      this.props.sortRoom(json.room)
      this.props.history.push(`/rooms/${this.props.selectedRoom.item.id}`)
    } else {
      throw new SubmissionError({
        name: '',
        _error: json.txt.join(''),
      })
    }
  }

  transitEdit() {
    const { history, selectedRoom } = this.props
    history.push(`/rooms/${selectedRoom.item.id}/edit`)
  }

  render() {
    const { initialValues, selectedRoom, history } = this.props
    return (
      <CommonTemplate>
        {selectedRoom.loading ? (
          <Loading>loading...</Loading>
        ) : (
          <React.Fragment>
            <ChatHeader room={selectedRoom.item} transitEdit={this.transitEdit.bind(this)} />
            <EditRoomForm onSubmit={this.submit} initialValues={initialValues} />
          </React.Fragment>
        )}
      </CommonTemplate>
    )
  }
}

export default EditRoomTemplate

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
