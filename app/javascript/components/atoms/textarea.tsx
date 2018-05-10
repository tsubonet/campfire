import * as React from 'react'
import styled from 'styled-components'

const Textarea = ({ handleSubmit, inputRef, ...props }) => {
  return <StyledTextarea onKeyDown={handleSubmit} innerRef={inputRef} />
}

export default Textarea

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 80px;
`
