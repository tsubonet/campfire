import * as React from 'react'
import styled from 'styled-components'

const Message = ({ children, ...props }) => {
  return <li>{children}</li>
}

export default Message
