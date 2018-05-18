import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { SubmissionError } from 'redux-form'

import CommonTemplate from '../templates/common_template'
import ChatHeader from '../organisms/chat_header'
import EditRoomForm from '../organisms/edit_room_form'
import { RootState } from '../../packs/entry'

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

class EditRoomPage extends React.Component<Props, {}> {
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

  render() {
    const { initialValues, selectedRoom, history } = this.props
    return (
      <CommonTemplate>
        {selectedRoom.loading ? (
          <Loading>loading...</Loading>
        ) : (
          <React.Fragment>
            <ChatHeader room={selectedRoom.item} history={history} />
            <EditRoomForm onSubmit={this.submit} initialValues={initialValues} />
          </React.Fragment>
        )}
      </CommonTemplate>
    )
  }
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRoomPage))

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
