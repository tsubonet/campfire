import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Messages, getOldMessagesAction } from '../modules/messages'
import { Room } from '../modules/room'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

interface Props {
  messages: Messages
  room: Room
  dispatch: any
}

class MessagesList extends React.Component<Props> {
  private messageBox

  constructor(props) {
    super(props)
    this.messageBox = React.createRef()
  }

  componentDidMount() {
    let triggerFlag = false
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight

    this.messageBox.current.addEventListener(
      'scroll',
      debounce(async () => {
        const { messages, room, dispatch } = this.props

        // console.log('this.messageBox.current.scrollHeight', this.messageBox.current.scrollHeight)
        // console.log('this.messageBox.current.scrollTop', this.messageBox.current.scrollTop)
        // console.log('this.messageBox.current.clientHeight', this.messageBox.current.clientHeight)
        // console.log('this.messageBox.current.offsetTop', this.messageBox.current.offsetTop)

        if (!messages.items.length) return
        if (!triggerFlag && messages.hasNext && this.messageBox.current.scrollTop === 0) {
          triggerFlag = true
          const elm = this.messageBox.current.querySelector('ul').lastChild
          dispatch(getOldMessagesAction(room.id, messages))
          // const scrollY = elm.getBoundingClientRect().top
          // console.log('elm.getBoundingClientRect().top', scrollY)
          // const scrollY2 = elm.scrollHeight
          // console.log('elm.scrollHeight', scrollY2)
          const scrollY3 = elm.offsetTop - this.messageBox.current.offsetTop - this.messageBox.current.clientHeight + 24
          //console.log('elm.offsetTop', scrollY3)
          this.messageBox.current.scrollTop = scrollY3
          console.log('aaaaaaaaaaaaaaaaaaa')
        }

        if (this.messageBox.current.scrollTop > 20) {
          triggerFlag = false
        }
      }),
      2000
    )
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props
    if (prevProps.messages.currentPage !== messages.currentPage) return
    if (prevProps.messages.loading !== messages.loading) return
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages } = this.props
    return (
      <Wrap innerRef={this.messageBox}>
        {messages.loading && <div>loading....</div>}
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
