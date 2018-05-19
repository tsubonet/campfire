import * as React from 'react'
import styled from 'styled-components'
import Txt from '../atoms/txt'
import Time from '../atoms/time'

const Message = ({ destroyMessage, item, ...props }) => {
  return (
    <Root id={`_${item.id}`}>
      <Time>{item.created_at}</Time>
      <Txt>{item.content}</Txt>
      <button onClick={destroyMessage.bind(this, item)}>×</button>
    </Root>
  )
}

export default Message

const Root = styled.li`
  border-top: 1px solid #e6e6e6;
  padding: 10px 0 20px;
  position: relative;
  time {
    display: block;
    font-size: 0.7rem;
    text-align: right;
    margin-bottom: 10px;
  }
  button {
    position: absolute;
    right: 0;
    top: 35px;
  }
`
