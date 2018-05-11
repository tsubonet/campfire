import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import SideHeading from '../molecules/side_heading'
import RoomList from '../molecules/room_list'
import Modal from '../organisms/modal'

interface Props {
  rooms: Array<Room>
  history: any
  postRoomAsync(content: string, history): void
}
interface State {
  isOpen: boolean
}
class Side extends React.Component<Props, State> {
  private inputRoomElement

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen === this.state.isOpen) return
    if (this.state.isOpen) {
      this.inputRoomElement.focus()
    }
  }

  openModal() {
    this.setState(prev => {
      return { isOpen: true }
    })
  }

  closeModal() {
    this.setState(prev => {
      return { isOpen: false }
    })
  }

  postRoom(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const content = this.inputRoomElement.value
      if (content === '') return
      this.props.postRoomAsync(content, this.props.history)
      this.closeModal()
    }
  }

  render() {
    return (
      <Root>
        <SideHeading openModal={_ => this.openModal()} />
        <RoomList rooms={this.props.rooms} />
        {this.state.isOpen && (
          <Modal
            label="ルーム名を入力してください"
            closeModal={_ => this.closeModal()}
            isOpen={this.state.isOpen}
            handleSubmit={this.postRoom.bind(this)}
            inputRef={el => (this.inputRoomElement = el)}
          />
        )}
      </Root>
    )
  }
}

export default Side

const Root = styled.div`
  width: 200px;
  background: #f2f2f2;
  border-right: 1px solid #cccccc;
}
`
