import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class GlobalNav extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.rooms.map((room, i) => {
            return (
              <a key={i} href={`/rooms/${room.id}`}>
                {room.name}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNav);
