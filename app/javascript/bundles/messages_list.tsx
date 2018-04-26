import * as React from 'react'
import { Messages } from '../types'
import styled from 'styled-components'

interface Props {
  messages: Messages
}
const MessagesList = ({ messages }: Props) => (
  <List>
    {messages.items.map((message, i) => {
      return <li key={i}>{message.content}</li>
    })}
  </List>
)

export default MessagesList

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
