import * as React from 'react'
import styled from 'styled-components'
import { Rooms } from '../../modules/rooms'
import SideHeading from '../molecules/side_heading'
import RoomList from '../molecules/room_list'
import Modal from '../organisms/modal'
import { CSSTransition } from 'react-transition-group'

interface Props {
  rooms: Rooms
  history: any
  postRoomAsync(content: string, history): void
  postRoomReset(): void
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
    // roomsが追加されたときにモーダルを閉じる
    if (prevProps.rooms.items.length !== this.props.rooms.items.length) {
      this.closeModal()
    }
    // モーダルを開いたときにinputをフォーカスする
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
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
      this.props.postRoomAsync(content, this.props.history)
    }
  }

  destroyRoom(id) {
    alert(id)
  }

  render() {
    const { rooms } = this.props
    return (
      <Root>
        <SideHeading openModal={_ => this.openModal()} />
        <RoomList items={rooms.items} destroyRoom={id => this.destroyRoom(id)} />
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
  border-right: 1px solid #cccccc;
}
`
