import * as React from 'react'
import styled from 'styled-components'

const Message = ({ children, ...props }) => {
  return <Root>{children}</Root>
}

export default Message

const Root = styled.li`
  border-top: 1px solid #e6e6e6;
  padding: 20px 0;
`
