import * as React from 'react'
import styled from 'styled-components'

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button

const StyledButton = styled.button`
  padding: 3px 10px;
  cursor: pointer;
`
