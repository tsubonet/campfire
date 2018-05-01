import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Messages, getOldMessagesAsync } from '../modules/messages'
import { Room } from '../modules/room'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

interface Props {
  messages: Messages
  room: Room
  dispatch: any
}
interface State {
  loading: boolean
}
class MessagesList extends React.Component<Props, State> {
  private messageBox

  constructor(props) {
    super(props)
    this.messageBox = React.createRef()
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight

    this.messageBox.current.addEventListener(
      'scroll',
      debounce(() => {
        if (!this.props.messages.items.length) return
        if (this.props.messages.hasNext && this.messageBox.current.scrollTop === 0) {
          this.setState({ loading: true })
          setTimeout(async () => {
            if (!this.props.messages.hasNext) return
            const elm = this.messageBox.current.querySelector('ul').lastChild
            console.log(elm)
            await this.props.dispatch(getOldMessagesAsync(this.props.room.id, this.props.messages))
            elm.scrollTop = elm.getBoundingClientRect().top
            this.setState({ loading: false })
          }, 2000)
        }
      }),
      1000
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.currentPage !== this.props.messages.currentPage) return
    if (this.state.loading) return
    //this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages } = this.props
    return (
      <Wrap innerRef={this.messageBox}>
        {this.state.loading && <div>loading....</div>}
        {!messages.hasNext && <div>メッセージはありません</div>}
        {
          //messages.hasNext && <button onClick={this.fetchOldMessages.bind(this)}>前の記事を読み込む</button>
        }
        <List>
          {messages.items.map((item, i) => {
            return (
              <li key={i} id={`_${item.id}`}>
                {item.content}
              </li>
            )
          })}
        </List>
      </Wrap>
    )
  }
}

const mapStateToProps = ({ messages, room }) => {
  return {
    messages,
    room,
  }
}

export default withRouter(connect(mapStateToProps)(MessagesList))

const Wrap = styled.div`
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
`
const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
