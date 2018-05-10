import * as React from 'react'
import styled from 'styled-components'

const Button = ({ children, ...props }) => {
  return <StyledButton>{children}</StyledButton>
}

export default Button

const StyledButton = styled.button`
  padding: 3px 10px;
`
