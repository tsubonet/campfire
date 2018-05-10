import * as React from 'react'
import styled from 'styled-components'

const Txt = ({ children, ...props }) => {
  return <StyledLoading>{children}</StyledLoading>
}

export default Txt

const StyledLoading = styled.div`
  text-align: center;
  padding: 30px 10px;
`
