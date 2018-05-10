import * as React from 'react'
import styled from 'styled-components'

const Txt = ({ children, ...props }) => {
  return <StyledTxt {...props}>{children}</StyledTxt>
}

export default Txt

const StyledTxt = styled.div`
  &.center {
    text-align: center;
  }
`
