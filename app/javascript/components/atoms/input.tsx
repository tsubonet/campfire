import * as React from 'react'
import styled from 'styled-components'

const Input = ({ handleSubmit, inputRef, ...props }) => {
  return <StyledInput type="text" onKeyDown={handleSubmit} innerRef={inputRef} {...props} />
}

export default Input

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 1rem;
`
