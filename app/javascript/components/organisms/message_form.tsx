import * as React from 'react'
import { Room } from '../../modules/room'

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
      <form>
        <label>Say something:</label>
        <br />
        <input onKeyDown={this.handleSubmit.bind(this)} type="text" ref={this.inputRef} />
      </form>
    )
  }
}
