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
  errors?: Array<string>
  loading: boolean
}
const Modal = ({ closeModal, label, errors, loading, ...props }: Props) => {
  return (
    <Root
      onClick={_ => {
        closeModal()
      }}
    >
      <Contents
        className="modal-contents"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {loading && (
          <Txt className="center" style={{ marginBottom: 10 }}>
            loading....
          </Txt>
        )}
        {(() => {
          if (errors) {
            return errors.map((error, i) => {
              return (
                <Txt key={i} style={{ color: 'red', marginBottom: 10 }}>
                  {error}
                </Txt>
              )
            })
          }
        })()}
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
      </Contents>
    </Root>
  )
}

export default Modal

const Root = styled.div`
  cursor: pointer;
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
`

const Contents = styled.div`
  cursor: default;
  position: relative;
  background-color: rgb(255, 255, 255);
  width: 50%;
  /* min-height: 300px; */
  border-radius: 3px;
  padding: 50px 20px;
`
