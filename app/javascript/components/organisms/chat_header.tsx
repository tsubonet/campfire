import * as React from 'react'
import styled from 'styled-components'
import Button from '../atoms/button'
import Txt from '../atoms/txt'

const ChatHeader = ({ room, transitEdit, ...props }) => {
  return (
    <Root>
      <Txt>ルーム名: {room.name}</Txt>
      <Button onClick={transitEdit}>Edit</Button>
    </Root>
  )
}

export default ChatHeader

const Root = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`
