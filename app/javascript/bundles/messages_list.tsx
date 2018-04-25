import * as React from 'react'
import { Message } from '../types'
import styled from 'styled-components'

interface Props {
  messages: Message[]
}
const MessagesList = ({ messages }: Props) => (
  <List>
    {messages.map((message, i) => {
      return <li key={i}>{message.content}</li>
    })}
  </List>
)

export default MessagesList

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`
