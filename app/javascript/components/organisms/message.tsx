import * as React from 'react'
import styled from 'styled-components'

const Message = ({ destroyMessage, children, ...props }) => {
  return (
    <Root>
      {children}
      <button onClick={destroyMessage}>×</button>
    </Root>
  )
}

export default Message

const Root = styled.li`
  border-top: 1px solid #e6e6e6;
  padding: 10px 0 20px;
  time {
    display: block;
    font-size: 0.7rem;
    text-align: right;
    margin-bottom: 10px;
  }
`
