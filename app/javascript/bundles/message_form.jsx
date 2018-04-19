import React from "react";

export default class MessageForm extends React.Component {
  handleSubmit = e => {
    if (e.keyCode === 13) {
      if (typeof App !== "undefined") {
        App.room.speak(e.target.value);
      }
      e.preventDefault();
      e.target.value = "";
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
          data-behavior="room_speaker"
        />
      </form>
    );
  }
}
