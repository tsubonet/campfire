import * as React from 'react'
import { Room } from '../types'

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
      if (this.inputRef.current.value === '') return
      const response = await fetch(`/rooms/${this.props.room.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: { content: this.inputRef.current.value } }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this.inputRef.current.value = ''
      this.inputRef.current.focus()
    }
  }

  render() {
    return (
      <form>
        <label>Say something:</label>
        <br />
        <input onKeyDown={this.handleSubmit.bind(this)} type="text" ref={this.inputRef} />
      </form>
    )
  }
}
