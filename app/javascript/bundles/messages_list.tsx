import * as React from 'react'
import { Messages } from '../modules/messages'
import styled from 'styled-components'

interface Props {
  messages: Messages
  fetchOldMessages
}
const MessagesList = ({ messages, fetchOldMessages }: Props) => (
  <Wrap>
    {messages.hasNext && <button onClick={fetchOldMessages}>前の記事を読み込む</button>}
    <List>
      {messages.items.map((message, i) => {
        return <li key={i}>{message.content}</li>
      })}
    </List>
  </Wrap>
)

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
