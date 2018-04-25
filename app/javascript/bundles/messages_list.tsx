import * as React from 'react'
import { Message } from '../types'

interface Props {
  messages: Message[]
}
const MessagesList = ({ messages }: Props) => (
  <ul>
    {messages.map((message, i) => {
      return <li key={i}>{message.content}</li>
    })}
  </ul>
)

export default MessagesList
