import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MessagesList from "./messages_list";
import MessageForm from "./message_form";

class ChatRoom extends React.Component {
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

  componentWillMount() {
    if (App.room) App.cable.subscriptions.remove(App.room);
  }

  render() {
    return (
      <div>
        <p>Room Name: {this.props.room.name}</p>
        <MessagesList messages={this.state.messages} />
        <MessageForm roomId={this.state.roomId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    room: state.room
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
);