import * as React from 'react'
import styled from 'styled-components'
import { Rooms } from '../../modules/rooms'
import SideHeading from '../molecules/side_heading'
import RoomList from '../molecules/room_list'
import Modal from '../organisms/modal'
import { CSSTransition } from 'react-transition-group'

interface Props {
  rooms: Rooms
  postRoomAsync(content: string): void
  postRoomReset(): void
  destroyRoomAsync(id: number): void
}
interface State {
  isOpen: boolean
}
class Side extends React.Component<Props, State> {
  private inputRoomElement: HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // roomsが追加されたとき
    if (prevProps.rooms.items.length < this.props.rooms.items.length) {
      // モーダルを閉じる
      if (prevState.isOpen) {
        this.closeModal()
      }
    }

    // モーダルを開いたとき
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      // inputをフォーカスする
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
    this.props.postRoomReset()
  }

  postRoom(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const content = this.inputRoomElement.value
      this.props.postRoomAsync(content)
    }
  }

  render() {
    const { rooms, destroyRoomAsync } = this.props
    return (
      <Root>
        <SideHeading openModal={_ => this.openModal()} />
        <RoomList items={rooms.items} destroyRoomAsync={destroyRoomAsync} />
        <CSSTransition
          in={this.state.isOpen}
          timeout={300}
          classNames="fade"
          unmountOnExit
          onEntered={() => {
            console.log('entered')
          }}
          onExited={() => {
            console.log('exited')
          }}
        >
          <Modal
            loading={rooms.loading}
            errors={rooms.errors}
            label="ルーム名を入力してください"
            closeModal={_ => this.closeModal()}
            isOpen={this.state.isOpen}
            handleSubmit={this.postRoom.bind(this)}
            inputRef={el => (this.inputRoomElement = el)}
          />
        </CSSTransition>
      </Root>
    )
  }
}

export default Side

const Root = styled.div`
  width: 200px;
  background: #f2f2f2;
  border-right: 1px solid #ccc;
`
