import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
      <Link to="/sandbox">s</Link>
      {'　'}
      <Button onClick={openModal}>+</Button>
    </Root>
  )
}

export default SideHeading

const Root = styled.div`
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: right;
`
