import React from "react";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fetch(`/rooms/${this.props.roomId}/messages`, {
        method: "POST",
        body: JSON.stringify({ message: { content: e.target.value } }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
      });
    }
  };

  render() {
    return (
      <form>
        <label>Say something:</label>
        <br />
        <input
          onKeyDown={this.handleSubmit.bind(this)}
          type="text"
          ref={this.inputRef}
        />
      </form>
    );
  }
}
