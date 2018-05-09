import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessagesList from '../organisms/messages_list'
import MessageForm from '../organisms/message_form'
import { RootState } from '../../packs/entry'
import { Messages, addMessage } from '../../modules/messages'
import { Room, setRoomAsync } from '../../modules/room'
import GlobalNav from '../organisms/global_nav'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

interface Props {
  messages: Messages
  room: Room
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
        <StyledGlobalNav />
        <Main>
          <div>
            <p>Room Name: {this.props.room.name}</p>
            <MessagesList />
            <MessageForm room={this.props.room} />
          </div>
        </Main>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ messages, room }: RootState) => {
  return {
    messages,
    room,
  }
}

export default withRouter(connect(mapStateToProps)(ChatRoomPage))

const Wrapper = styled.div`
  display: flex;
`
const StyledGlobalNav = styled(GlobalNav)`
  width: 200px;
  background: #f2f2f2;
}
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
  padding: 10px;
`
