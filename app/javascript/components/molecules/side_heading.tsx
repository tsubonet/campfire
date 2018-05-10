import * as React from 'react'
import styled from 'styled-components'
import Button from '../atoms/button'

const SideHeading = () => {
  return (
    <Root>
      <Button>+</Button>
    </Root>
  )
}

export default SideHeading

const Root = styled.div`
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  text-align: right;
}
`
