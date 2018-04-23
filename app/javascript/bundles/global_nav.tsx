import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class GlobalNav extends React.Component {
  render() {
    return (
      <div>
        {this.props.rooms.map((room, i) => {
          return (
            <Link key={i} to={`/rooms/${room.id}`}>
              {room.name}
            </Link>
          );
        })}
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
