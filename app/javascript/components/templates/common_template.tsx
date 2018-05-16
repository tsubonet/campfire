import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Side from '../organisms/side'
import { RootState } from '../../packs/entry'
import { Rooms, postRoomAsync, postRoomReset, destroyRoomAsync } from '../../modules/rooms'
import { SelectedRoom } from '../../modules/selected_room'

interface Props {
  rooms: Rooms
  selectedRoom: SelectedRoom
  history: any
  postRoomAsync(content: string, history): void
  postRoomReset(): void
  destroyRoomAsync(id: number): void
}
interface State {
  windowH: number
}
class CommonTemplate extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      windowH: window.innerHeight,
    }
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.setState({ windowH: window.innerHeight })
      }, 1000)
    )
  }

  render() {
    const {
      rooms,
      selectedRoom,
      postRoomAsync,
      postRoomReset,
      destroyRoomAsync,
      history,
      children,
    } = this.props
    return (
      <Root style={{ height: this.state.windowH }}>
        <Side
          rooms={rooms}
          selectedRoom={selectedRoom}
          postRoomAsync={postRoomAsync}
          postRoomReset={postRoomReset}
          history={history}
          destroyRoomAsync={destroyRoomAsync}
        />
        <Main>{children}</Main>
      </Root>
    )
  }
}

const mapStateToProps = ({ rooms, selectedRoom }: RootState) => {
  return {
    rooms,
    selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRoomAsync: (name: string, history: any) => {
      dispatch(postRoomAsync(name, history))
    },
    postRoomReset: () => {
      dispatch(postRoomReset())
    },
    destroyRoomAsync(id: number) {
      dispatch(destroyRoomAsync(id))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonTemplate))

const Root = styled.div`
  display: flex;
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
  position: relative;
`
