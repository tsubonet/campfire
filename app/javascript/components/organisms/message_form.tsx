import * as React from 'react'
import styled from 'styled-components'
import Textarea from '../atoms/textarea'

const MessageForm = props => {
  return (
    <Form>
      <Textarea {...props} />
    </Form>
  )
}

export default MessageForm

const Form = styled.form`
  padding: 10px;
`
