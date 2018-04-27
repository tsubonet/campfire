import * as React from 'react'
import { Messages } from '../modules/messages'
import styled from 'styled-components'

interface Props {
  messages: Messages
  fetchOldMessages
}
class MessagesList extends React.Component<Props> {
  private messageBox

  constructor(props) {
    super(props)
    this.messageBox = React.createRef()
  }
  componentDidMount() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
    this.messageBox.current.addEventListener('scroll', () => {
      console.log(this.messageBox.current.scrollTop)
      if (this.messageBox.current.scrollTop === 0) {
        this.props.fetchOldMessages()
      }
    })
  }

  componentDidUpdate() {
    //this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages, fetchOldMessages } = this.props
    return (
      <Wrap innerRef={this.messageBox}>
        {messages.hasNext && <button onClick={fetchOldMessages}>前の記事を読み込む</button>}
        <List>
          {messages.items.map((message, i) => {
            return <li key={i}>{message.content}</li>
          })}
        </List>
      </Wrap>
    )
  }
}

export default MessagesList

const Wrap = styled.div`
  height: 100px;
  overflow-y: auto;
  border: 1px solid #ccc;
`
const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
