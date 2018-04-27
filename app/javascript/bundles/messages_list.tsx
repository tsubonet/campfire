import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Messages, getOldMessages } from '../modules/messages'
import styled from 'styled-components'

interface Props {
  messages: Messages
  fetchOldMessages
  match: any
  dispatch: any
}
class MessagesList extends React.Component<Props> {
  private messageBox

  constructor(props) {
    super(props)
    this.messageBox = React.createRef()
  }

  async fetchOldMessages() {
    const { messages, match } = this.props
    if (!messages.hasNext) return
    const res = await fetch(`/rooms/${match.params.id}/messages/old/?page=${messages.currentPage + 1}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    this.props.dispatch(getOldMessages(json.messages))
  }

  componentDidMount() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
    this.messageBox.current.addEventListener('scroll', () => {
      console.log(this.messageBox.current.scrollTop)
      if (this.messageBox.current.scrollTop === 0) {
        this.fetchOldMessages()
        //this.messageBox.current.scrollTop = 100
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) return

    //this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages, fetchOldMessages } = this.props
    return (
      <Wrap innerRef={this.messageBox}>
        {messages.hasNext && <button onClick={this.fetchOldMessages.bind(this)}>前の記事を読み込む</button>}
        <List>
          {messages.items.map((message, i) => {
            return <li key={i}>{message.content}</li>
          })}
        </List>
      </Wrap>
    )
  }
}

const mapStateToProps = ({ messages }) => {
  return {
    messages,
  }
}

export default withRouter(connect(mapStateToProps)(MessagesList))

const Wrap = styled.div`
  height: 100px;
  overflow-y: auto;
  border: 1px solid #ccc;
`
const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
