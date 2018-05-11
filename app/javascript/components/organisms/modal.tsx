import * as React from 'react'
import styled from 'styled-components'
import Input from '../atoms/input'
import Txt from '../atoms/txt'
import Button from '../atoms/button'

interface Props {
  closeModal: Function
  handleSubmit: Function
  inputRef: any
  isOpen: boolean
  label: string
}
const Modal = ({ closeModal, label, ...props }: Props) => {
  return (
    <Root
      onClick={_ => {
        closeModal()
      }}
    >
      <div
        className="contents"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <Txt style={{ marginBottom: 10 }}>{label}</Txt>
        <Input {...props} />
        <Button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          ×
        </Button>
      </div>
    </Root>
  )
}

export default Modal

const Root = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /*align-items: flex-start; モーダルがclientHeightより大きければ、flex-start。小さければ center  */
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  .contents {
    position: relative;
    background-color: rgb(255, 255, 255);
    width: 50%;
    /* min-height: 300px; */
    border-radius: 3px;
    padding: 50px 20px;
  }
`
