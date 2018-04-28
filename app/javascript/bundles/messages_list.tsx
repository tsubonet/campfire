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
    const { messages, match, dispatch } = this.props
    if (!messages.hasNext) return
    const res = await fetch(`/rooms/${match.params.id}/messages/old/?page=${messages.currentPage + 1}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    dispatch(getOldMessages(json.messages))
  }

  componentDidMount() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
    this.messageBox.current.addEventListener('scroll', () => {
      if (!this.props.messages.items.length) return
      if (this.messageBox.current.scrollTop === 0) {
        this.fetchOldMessages()
        //const list = Array.from(this.messageBox.current.querySelectorAll('ul').lastChild)
        console.log(this.messageBox.current.querySelector('ul').lastChild)
        this.messageBox.current.querySelector('ul').lastChild.scrollIntoView()
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.currentPage !== this.props.messages.currentPage) return
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight
  }

  render() {
    const { messages, fetchOldMessages } = this.props
    return (
      <Wrap innerRef={this.messageBox}>
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
