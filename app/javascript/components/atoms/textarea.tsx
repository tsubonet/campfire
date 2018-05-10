import * as React from 'react'
import styled from 'styled-components'

interface Props {}
const Textarea = ({ handleSubmit, ...props }) => {
  return <StyledTextarea onKeyDown={handleSubmit} innerRef={props.inputRef} />
}

export default Textarea

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 80px;
`
