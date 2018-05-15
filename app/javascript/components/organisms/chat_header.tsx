import * as React from 'react'
import styled from 'styled-components'
import Button from '../atoms/button'
import Txt from '../atoms/txt'

const ChatHeader = ({ room, history, ...props }) => {
  return (
    <Root>
      <Txt>ルーム名: {room.name}</Txt>
      <Button
        onClick={_ => {
          history.push(`/rooms/${room.id}/edit`)
        }}
      >
        Edit
      </Button>
    </Root>
  )
}

export default ChatHeader

const Root = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`
