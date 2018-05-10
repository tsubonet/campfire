import * as React from 'react'
import styled from 'styled-components'
import { Room } from '../../modules/room'
import Textarea from '../atoms/textarea'

interface Props {
  room: Room
}
export default class MessageForm extends React.Component<Props> {
  private inputRef

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  async handleSubmit(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const content = this.inputRef.current.value
      if (content === '') return
      this.inputRef.current.value = ''
      this.inputRef.current.focus()
      const response = await fetch(`/rooms/${this.props.room.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: { content } }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }

  render() {
    return (
      <Form>
        <textarea onKeyDown={this.handleSubmit.bind(this)} ref={this.inputRef} />
      </Form>
    )
  }
}

const Form = styled.form`
  padding: 10px;
`
