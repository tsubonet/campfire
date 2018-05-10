import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Side from '../organisms/side'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'
import { Messages, addMessage } from '../../modules/messages'
import { Room, setRoomAsync } from '../../modules/room'

interface Props {
  messages: Messages
  room: Room
  rooms: Array<Room>
  match: any
  dispatch: any
}
interface State {
  windowH
}
declare let App: any

class ChatRoomPage extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      windowH: window.innerHeight,
    }
  }
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
          this.props.dispatch(addMessage(data.message))
        },
      }
    )
  }

  disconnectActionCable() {
    if (App.room) App.cable.subscriptions.remove(App.room)
  }

  componentDidMount() {
    this.connectActionCable(this.props.room.id)
    window.addEventListener(
      'resize',
      debounce(() => {
        this.setState({ windowH: window.innerHeight })
      }, 1000)
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return
    this.props.dispatch(setRoomAsync(this.props.match.params.id))
    this.disconnectActionCable()
    this.connectActionCable(this.props.match.params.id)
  }

  UNSAFE_componentWillMount() {
    this.disconnectActionCable()
  }

  render() {
    return (
      <Wrapper style={{ height: this.state.windowH }}>
        <Side rooms={this.props.rooms} />
        <Main>
          <RoomName>ルーム名: {this.props.room.name}</RoomName>
          <MessagesList room={this.props.room} messages={this.props.messages} dispatch={this.props.dispatch} />
          <MessageForm room={this.props.room} />
        </Main>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ messages, room, rooms }: RootState) => {
  return {
    messages,
    room,
    rooms,
  }
}

export default withRouter(connect(mapStateToProps)(ChatRoomPage))

const Wrapper = styled.div`
  display: flex;
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
`
const RoomName = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  height: 40px;
  font-weight: bold;
`
