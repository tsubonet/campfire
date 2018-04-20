import React from "react";
import MessagesList from "./messages_list";
import MessageForm from "./message_form";

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      roomId: props.room.id
    };
  }

  updateMessages(message) {
    const messages = [...this.state.messages, message];
    this.setState({ messages });
  }

  componentDidMount() {
    App.room = App.cable.subscriptions.create(
      {
        channel: "RoomChannel",
        room_id: this.state.roomId
      },
      {
        connected: function() {},
        disconnected: function() {},
        received: data => {
          this.updateMessages(data.message);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <MessagesList messages={this.state.messages} />
        <MessageForm roomId={this.state.roomId} />
      </div>
    );
  }
}
