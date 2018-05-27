import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Side from '../organisms/side'
import { RootState } from '../../packs/entry'
import { Rooms, postRoomAsync, postRoomReset, destroyRoomAsync } from '../../modules/rooms'

interface Props {
  rooms: Rooms
  postRoomAsync(content: string): void
  postRoomReset(): void
  destroyRoomAsync(id: number): void
}

interface State {
  windowH: number
}
const FoundationHOC = WrappedComponent => {
  class Foundation extends React.Component<Props, State> {
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
      const { rooms, postRoomAsync, postRoomReset, destroyRoomAsync, children } = this.props
      return (
        <Root style={{ height: this.state.windowH }}>
          <Side
            rooms={rooms}
            postRoomAsync={postRoomAsync}
            postRoomReset={postRoomReset}
            destroyRoomAsync={destroyRoomAsync}
          />
          <Main>
            <WrappedComponent {...this.props} />
          </Main>
        </Root>
      )
    }
  }
  const mapStateToProps = ({ rooms }: RootState) => {
    return {
      rooms,
    }
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      postRoomAsync: (name: string) => {
        dispatch(postRoomAsync(name, props.history))
      },
      postRoomReset: () => {
        dispatch(postRoomReset())
      },
      destroyRoomAsync(id: number) {
        dispatch(destroyRoomAsync(id, props.history))
      },
    }
  }
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Foundation))
}

export default FoundationHOC

const Root = styled.div`
  display: flex;
`
const Main = styled.div`
  width: calc(100% - 200px);
  background: #fff;
  position: relative;
`
