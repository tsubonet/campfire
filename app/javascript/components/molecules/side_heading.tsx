import * as React from 'react'
import styled from 'styled-components'
import Button from '../atoms/button'

interface Props {
  openModal: Function
}
interface State {
  isOpen: boolean
}

const SideHeading = ({ openModal }: Props) => {
  return (
    <Root>
      <Button onClick={openModal}>+</Button>
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
