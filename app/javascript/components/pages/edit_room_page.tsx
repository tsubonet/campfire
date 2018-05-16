import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import CommonTemplate from '../templates/common_template'
import ChatHeader from '../organisms/chat_header'
import { RootState } from '../../packs/entry'

import { SelectedRoom, selectRoomAsync } from '../../modules/selected_room'

interface Props {
  selectedRoom: SelectedRoom
  match: any
  history: any
  selectRoomAsync(id: number, wait?: number): void
}

class EditRoomPage extends React.Component<Props, {}> {
  componentDidMount() {
    const { match, selectRoomAsync, selectedRoom } = this.props
    const targetRoomId = match.params.id || 1
    selectRoomAsync(targetRoomId)
  }

  componentDidUpdate(prevProps) {
    const { match, selectRoomAsync } = this.props
    const targetRoomId = match.params.id
    if (prevProps.match.params.id === targetRoomId) return
    selectRoomAsync(targetRoomId)
  }

  render() {
    const { selectedRoom, history } = this.props
    return (
      <CommonTemplate>
        {selectedRoom.loading ? (
          <Loading>loading...</Loading>
        ) : (
          <React.Fragment>
            <ChatHeader room={selectedRoom.item} history={history} />
          </React.Fragment>
        )}
      </CommonTemplate>
    )
  }
}

const mapStateToProps = ({ selectedRoom }: RootState) => {
  return {
    selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRoomAsync: (id: number, wait: number) => {
      dispatch(selectRoomAsync(id, wait))
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
