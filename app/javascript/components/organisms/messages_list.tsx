import * as React from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { Messages } from '../../modules/messages'
import { Room } from '../../modules/rooms'
import Message from './message'
import Txt from '../atoms/txt'
import Time from '../atoms/time'

interface Props {
  messages: Messages
  room: Room
  fetchOldMessagesSync(id: number, messages: Messages): void
}
interface State {
  windowH: number
}
export default class MessagesList extends React.Component<Props, State> {
  private messageBox
  private savedElm

  constructor(props) {
    super(props)
    this.messageBox = React.createRef()
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

    let triggerFlag = false
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight

    this.messageBox.current.addEventListener(
      'scroll',
      debounce(async () => {
        const { messages, room } = this.props
        if (this.messageBox.current === null) return

        // console.log('this.messageBox.current.scrollHeight', this.messageBox.current.scrollHeight)
        // console.log('this.messageBox.current.scrollTop', this.messageBox.current.scrollTop)
        // console.log('this.messageBox.current.clientHeight', this.messageBox.current.clientHeight)
        // console.log('this.messageBox.current.offsetTop', this.messageBox.current.offsetTop)

        if (!messages.items.length) return
        if (!triggerFlag && messages.hasNext && this.messageBox.current.scrollTop === 0) {
          triggerFlag = true
          this.savedElm = this.messageBox.current.querySelector('ul').lastChild
          this.props.fetchOldMessagesSync(room.id, messages)
          // const scrollY = elm.getBoundingClientRect().top
          // console.log('elm.getBoundingClientRect().top', scrollY)
          // const scrollY2 = elm.scrollHeight
          // console.log('elm.scrollHeight', scrollY2)
          //const scrollY3 =
          //  this.savedElm.offsetTop - this.messageBox.current.offsetTop - this.messageBox.current.clientHeight + 24
          //console.log('elm.offsetTop', scrollY3)
          //this.messageBox.current.scrollTop = scrollY3
          //console.log('aaaaaaaaaaaaaaaaaaa')
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
    if (prevProps.messages.currentPage !== messages.currentPage) {
      const scrollY3 =
        this.savedElm.offsetTop -
        this.messageBox.current.offsetTop -
        this.messageBox.current.clientHeight +
        24
      this.messageBox.current.scrollTop = scrollY3
      return
    }
    if (prevProps.messages.loading !== messages.loading) return
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages } = this.props
    return (
      <Root innerRef={this.messageBox} style={{ height: this.state.windowH - 40 - 103 }}>
        {!messages.items.length && (
          <Txt className="center" style={{ padding: '30px 0' }}>
            メッセージはありません
          </Txt>
        )}
        {messages.loading && (
          <Txt className="center" style={{ padding: '30px 0' }}>
            loading....
          </Txt>
        )}
        {
          //messages.hasNext && <button onClick={this.fetchOldMessages.bind(this)}>前の記事を読み込む</button>
        }
        <List>
          {messages.items.map((item, i) => {
            return (
              <Message key={i} id={`_${item.id}`}>
                <Time>{item.created_at}</Time>
                <Txt>{item.content}</Txt>
              </Message>
            )
          })}
        </List>
      </Root>
    )
  }
}

const Root = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 10px;
`
const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
